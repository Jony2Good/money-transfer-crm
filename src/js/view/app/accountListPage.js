import { el, setChildren } from "redom";
import {
  mainField,
  createTitleSection,
  createMainBtn,
} from "../components/mainDOMElements.js";
import { createSortingDropdown } from "../components/createDropdown.js";
import addNewAccount from "../../controllers/addNewAccount.js";

/**creation of an independent section with a container for cards with an account*/
export function createSection() {
  const section = el("section.container", { id: "card-section" });
  const container = el("div.row.g-5", { id: "card-body" });
  setChildren(section, container);
  return { section, container };
}

/** creating a section with a dropdown list and a button */
export function createTopSection(router) {
  const mainContainer = el("section.container.mb-5");
  const body = el("div.row.align-items-center");
  const dropWrap = el("div.col-auto.me-auto.d-flex");
  const btnWrap = el("div.col-auto.accounts-layout");
  const btn = createMainBtn(
    "btn btn-primary descr btn-accounts btn-accounts__icon btn-accounts__icon--plus",
    "button",
    "New account"
  );
  btn.setAttribute("id", "account-btn");

  const title = createTitleSection("h1", "My accounts", "title");
  const select = createSortingDropdown(router);

  setChildren(btnWrap, btn);
  setChildren(dropWrap, [title, select]);
  setChildren(body, [dropWrap, btnWrap]);
  setChildren(mainContainer, body);

  addNewAccount(btn, router);

  return mainContainer;
}
/*creating a container for cards with an invoice and a button*/
export function createAccountCard() {
  const cardContainer = el("div.col-sm-4", { id: "card-container" });
  const cardWrap = el("div.card");
  const cardBody = el(
    "div.card-body.card-body__layout.d-flex.justify-content-between.shadow"
  );
  const cardBodyLeft = el("div");
  const cardBodyRight = el("div.d-flex.align-items-end");
  const cardTransBlock = el("div.mt-3");
  const cardText = el(
    "p.card-text.reset-title.card-descr",
    "Last transaction:"
  );
  setChildren(cardTransBlock, cardText);
  setChildren(cardBodyLeft, [cardTransBlock]);
  setChildren(cardBody, [cardBodyLeft, cardBodyRight]);
  setChildren(cardWrap, cardBody);
  setChildren(cardContainer, cardWrap);

  return { cardBodyLeft, cardTransBlock, cardContainer, cardBodyRight };
}

/**creating a card title*/
function createCardTitle(data) {
  return el(
    "h5.card-title.card-title",
    `${
      data.account.substring(0, data.account.length - 11) +
      -new Date().getFullYear()
    }`
  );
}
/**creating an account balance*/
function createCardAmount(data) {
  return el(
    "span.card-text.descr.mb-3",
    `${data.balance.toLocaleString("en")} $`
  );
}

/**creating a block with the last transaction*/
function createTransaction(data, block) {
  data.transactions.forEach((obj) => {
    const date = el("time.card-text", `${getDate(obj.date)}`);
    block.append(date);
  });
}

/**formation of a string with a date */
function getDate(data) {
  const date = new Date(data);
  const transactionDate = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const correctDateFormat = date.toLocaleDateString("en", transactionDate);

  return correctDateFormat;
}
/*combining a section with cards and data from the server*/
export function makeCard(data, router) {
  const body = createAccountCard();
  const title = createCardTitle(data);
  const amount = createCardAmount(data);
  const btn = createMainBtn("btn btn-primary btn-account", "button", "Open", {
    href: `/accounts/${data.account}`,
    router: router,
  });

  createTransaction(data, body.cardTransBlock);

  body.cardBodyRight.append(btn);
  body.cardBodyLeft.prepend(title, amount);

  return body.cardContainer;
}

/**creating a page with a list of bank accounts */
export function createAccountListPage(router) {
  const topSection = createTopSection(router);
  const errorField = el("span.server-error.title");
  const main = mainField();
  main.append(errorField, topSection);

  return main;
}
