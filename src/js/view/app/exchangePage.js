import { el, setChildren, mount, setAttr } from "redom";
import {
  mainField,
  createTitleSection,
  createMainBtn,
  createInput,
} from "../components/mainDOMElements.js";
import { createPriceFormat } from "../components/historySection.js";
import { createExchangeDropdown } from "../components/createDropdown.js";
import { startSocketSession } from "../../controllers/webSocketRunning.js";
import makeCurrencyExchange from "../../controllers/exchangeCurrencies.js";
import { createExchangeSkeleton } from "../components/skeleton.js";

function createCurenciesList(data) {
  const list = el("ul.list-group.currencies-list", { id: "currency-list" });

  for (const element in data) {
    const unit = data[element];
    if (unit.amount) {
      const item = el(
        "li.list-group-item.exchange-block-layout.exchange-descr.ps-0"
      );
      const text = el("p.my-0.exchange-block-text", unit.code);
      const amount = el(
        "span.accounts-number.exchange-block-span",
        createPriceFormat(unit.amount)
      );

      item.append(text, amount);
      mount(list, item);
    }
  }
  return list;
}

function createMycurrenciesBlock(data) {
  const wrap = el("div.d-flex.flex-column", { id: "currency-wrap" });
  const title = createTitleSection("h3", "Your currency", "sub-title mb-4");
  const list = createCurenciesList(data);
  setChildren(wrap, [title, list]);

  return wrap;
}

function createExchangeInputs(data) {
  const topRow = el("div.row.mb-3");

  const fromTxtInner = el("div.col-sm-1.d-flex.align-items-center");
  const fromTxt = createTitleSection("p", "Из", "descr mb-0");
  const fromDropWrap = el("div.col-sm-5.px-0");
  const fromField = createExchangeDropdown(data);
  fromField.selectBtnMenu.id = "exchange-from";

  const toTxtInner = el(
    "div.col-sm-1.px-1.d-flex.align-items-center.justify-content-end"
  );
  const toTxt = createTitleSection("p", "в", "descr mb-0");
  const toDropWrap = el("div.col-sm-5.px-0");
  const toField = createExchangeDropdown(data);
  toField.selectBtnMenu.id = "exchange-to";

  const bottomRow = el("div.row");
  const amountCol = el("div.col-sm-3.d-flex.align-items-center");
  const amountTxt = createTitleSection("p", "Amount", "descr mb-0");
  const inputCol = el("div.col-sm-9.pe-0");
  const input = createInput(
    "select-descr form-control exchange-input--layout",
    "number",
    "Enter amount",
    "exchange-input"
  );
  setChildren(fromTxtInner, fromTxt);
  setChildren(fromDropWrap, fromField.selectContainer);

  setChildren(toTxtInner, toTxt);
  setChildren(toDropWrap, toField.selectContainer);

  setChildren(topRow, [fromTxtInner, fromDropWrap, toTxtInner, toDropWrap]);

  setChildren(amountCol, amountTxt);
  setChildren(inputCol, input);
  setChildren(bottomRow, [amountCol, inputCol]);

  const containerColLeft = el("div.col-sm-9");
  setChildren(containerColLeft, [topRow, bottomRow]);

  const containerColRight = el("div.col-sm-3.d-flex.justify-content-end");
  const btn = createMainBtn("btn-primary descr px-1", "submit", "Exchange");
  setAttr(btn, { disabled: true, id: "exchange-btn" });

  setChildren(containerColRight, btn);

  const container = el("form.container.px-0", { id: "exchange-form" });
  const containerRow = el("div.row");
  setChildren(containerRow, [containerColLeft, containerColRight]);
  setChildren(container, containerRow);
  return container;
}

/** creating a pair of currency names and exchange rates. Creation of HTML elements.
 * Export to function with webSockets session launch */
export function createExchangeList(data, list) {
  const currencyNaming = {};
  if (data.change == 0 && currencyNaming[data.from + data.to] !== undefined) {
    mount(list, currencyNaming[data.from + data.to]);
    return;
  }
  const changeColorDir = data.change == -1;

  const item = el(
    "li.list-group-item.ps-0.exchange-block-layout.exchange-descr.exchange__currencies--bgcolor.exchange__currencies--arrow",
    {
      class: `${changeColorDir ? "down" : "up"}`,
    }
  );

  const text = el("p.my-0.exchange-block-text", `${data.from}/${data.to}`);
  const amount = el(
    "span.accounts-number.exchange-block-span",
    createPriceFormat(data.rate)
  );

  setChildren(item, [text, amount]);
  currencyNaming[data.from + data.to] = item;

  mount(list, item);
}

/**full formation of a block with a changing exchange rate.
 * A function comes into the function with a running webSockets session,
 * in which page elements are formed. */
function createExchangeRightBlock() {
  const wrap = el("div.d-flex.flex-column.exchange__currencies--bgcolor");
  const title = createTitleSection(
    "h3",
    "Change of exchange rate in real time",
    "sub-title mb-4"
  );
  wrap.append(title, startSocketSession());

  return wrap;
}

/**creation of a currency exchange section */
export function createExchangeRateSection(data, list) {
  const container = document.getElementById("section-app");
  const main = mainField();
  const section = el("section.container.exchange-section");
  section.classList.add("hidden");
  const title = createTitleSection(
    "h2",
    "Сurrency exchange page",
    "title mb-4"
  );
  const titleExchange = createTitleSection(
    "h3",
    "Currency exchange",
    "sub-title mb-4"
  );
  const mainRow = el("div.row");

  const leftBlock = el("div.col-sm-5.me-5");
  const leftTopInner = el("div.shadow.exchange__currencies.mb-5");
  const leftDownCol = el("div.shadow.exchange__currencies", {
    id: "exchange-body",
  });
  const errorField = el("span.exchange__currencies-error.descr");
  const successField = el("span.exchange__currencies-success.descr");
  const rightBlock = el(
    "div.col-sm-6.shadow exchange__currencies exchange__currencies-layout exchange__currencies--bgcolor"
  );

  const myCurrencies = createMycurrenciesBlock(data);
  const formBlock = createExchangeInputs(list);
  const rateBlock = createExchangeRightBlock();

  setChildren(leftTopInner, myCurrencies);
  setChildren(leftDownCol, [
    titleExchange,
    formBlock,
    errorField,
    successField,
  ]);

  setChildren(leftBlock, [leftTopInner, leftDownCol]);
  setChildren(rightBlock, rateBlock);

  setChildren(mainRow, [leftBlock, rightBlock]);

  setChildren(section, [title, mainRow]);
  setChildren(main, [createExchangeSkeleton(), section]);
  setChildren(container, main);

  makeCurrencyExchange(createCurenciesList);

  return main;
}
