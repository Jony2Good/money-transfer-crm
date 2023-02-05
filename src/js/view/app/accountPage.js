import { el, setChildren, setAttr } from "redom";
import {
  mainField,
  createTitleSection,
  createMainBtn,
  createInput,
} from "../components/mainDOMElements.js";
import { checkInputsValue } from "../utils/checkValidation.js";
import getMonthsBalances from "../utils/createChartMounths.js";
import createChart from "../utils/createChart.js";
import { autocomplete } from "../utils/autocomplete.js";
import sendAccountTransfer from "../../controllers/sendTransfer.js";
import { createHistorySection } from "../components/historySection.js";
import { createOneAccountSkeleton } from "../components/skeleton.js";

function createAccountTitleSection(data, router) {
  const topTitleContainer = el("section.container.mb-5");
  const body = el("div.row");
  const title = createTitleSection("h2", "View personal account", "title mb-4");
  const accountNumber = el(
    "div.align-self-start",
    el("span.account-descr", `№ ${data.account}`)
  );
  const titleWrap = el("div.col-auto.me-auto.d-flex.flex-column");
  const btn = createMainBtn(
    "btn-primary mb-4 descr btn-accounts btn-accounts__icon btn-accounts__icon--arrow",
    "button",
    "Go back",
    {
      href: "/accounts",
      router: router,
    }
  );
  const btnWrap = el("div.col-auto.accounts-layout");
  const balanceWrap = el("div.d-flex.justify-content-between", [
    el("span.accounts-balance", "Balance"),
    el("span.accounts-number", `${data.balance} $`),
  ]);
  setChildren(titleWrap, [title, accountNumber]);
  setChildren(btnWrap, [btn, balanceWrap]);
  setChildren(body, [titleWrap, btnWrap]);
  setChildren(topTitleContainer, body);

  return topTitleContainer;
}

function createInputAccount() {
  const inputWrap = el("div.row.mb-3");
  const inputTitle = el(
    "span.col-sm-5.col-form-label.descr",
    "Beneficiary's account number"
  );
  const inputBody = el("div.col-sm-7.d-flex.justify-content-end.select__type");
  const inputNumber = createInput(
    "account-input select-descr form-control",
    "number",
    "Enter account number",
    "numAcc"
  );
  setAttr(inputNumber, { autocomplete: "off" });

  const transfersList = localStorage.getItem("transfers")
    ? localStorage.getItem("transfers").split(" ")
    : [];

  autocomplete(inputNumber, transfersList);

  setChildren(inputBody, inputNumber);
  setChildren(inputWrap, [inputTitle, inputBody]);

  return { inputWrap, inputNumber };
}

function createInputAmount() {
  const inputWrap = el("div.row.mb-3");
  const inputBody = el("div.col-sm-7.d-flex.justify-content-end");
  const label = el(
    "label.col-sm-5.col-form-label.descr",
    { for: "transferAmount" },
    "Transfer amount"
  );
  const inputAmount = createInput(
    "account-input select-descr form-control",
    "number",
    "Enter transfer amount",
    "transferAmount"
  );
  setAttr(inputAmount, { autocomplete: "off" });

  setChildren(inputBody, inputAmount);
  setChildren(inputWrap, [label, inputBody]);

  return { inputWrap, inputAmount };
}

function createLeftBlock() {
  const colLeft = el("div.col-6.bg-light.bg-gradient.shadow.transfer-account");
  const titleLeft = createTitleSection(
    "h3",
    "Create a new translation",
    "title mb-3 accounts-balance"
  );
  const successSpan = el(
    "span.success-field.descr.success-field--layout.text-success.accounts-balance.success-field--account"
  );
  const form = el("form", { id: "account-form" });
  const inputAccount = createInputAccount();
  const inputAmount = createInputAmount();
  const btnBody = el("div.row");
  const errorBody = el(
    "div.col-sm-5.error-account",
    el("span.error-field.error-account--layout.descr")
  );
  const btnWrap = el(
    "div.col-sm-7.ps-0.d-flex.justify-content-start.align-items-center"
  );
  const btn = createMainBtn(
    "btn-primary descr btn-accounts btn-accounts__icon btn-accounts__icon--mail",
    "submit",
    "Send"
  );
  setAttr(btn, {
    disabled: "disabled",
  });

  setChildren(btnWrap, btn);
  setChildren(btnBody, [errorBody, btnWrap]);
  setChildren(form, [inputAccount.inputWrap, inputAmount.inputWrap, btnBody]);
  setChildren(colLeft, [titleLeft, successSpan, form]);

  checkInputsValue(
    inputAccount.inputNumber,
    inputAmount.inputAmount,
    btn,
    "Data entry error"
  );

  return { btn, inputAccount, inputAmount, form, colLeft };
}

function createRightBlock() {
  const colRight = el("div.col-6.bg-body.shadow.balance-field");
  const titleRight = createTitleSection(
    "h3",
    "Account balance dynamics",
    "title mb-1 accounts-balance"
  );
  const canvas = el("canvas", { id: "chart" });
  const body = el("div.chart-field", canvas);
  setChildren(colRight, [titleRight, body]);

  return { canvas, colRight };
}

function createMiddleSection(data) {
  const middleContainer = el("section.container.middle-section.mb-5");
  const row = el("div.row.justify-content-between");

  const left = createLeftBlock();
  const right = createRightBlock();
  const [months, balances] = getMonthsBalances(
    data.transactions,
    data.account,
    data.balance,
    6
  );
  createChart(right.canvas, months, balances);

  setChildren(row, [left.colLeft, right.colRight]);
  setChildren(middleContainer, row);

  return middleContainer;
}

export function createOneAccount(data, id, router) {
  const container = document.getElementById("section-app");

  const main = mainField();
  const topSection = createAccountTitleSection(data, router);

  const midleSection = createMiddleSection(data);
  const historyTransferSection = createHistorySection(data, 10);
  midleSection.classList.add("hidden");
  historyTransferSection.classList.add("hidden");

  setChildren(main, [
    topSection,
    createOneAccountSkeleton(),
    midleSection,
    historyTransferSection,
  ]);

  setChildren(container, main);

  const blockWithBalance = document.querySelector(".balance-field");
  const blockWithHistory = document.querySelector(".table-history");

  [blockWithBalance, blockWithHistory].forEach((item) =>
    item.addEventListener("click", () => {
      router.navigate(`/accounts/${id}/history`);
    })
  );
  sendAccountTransfer(id, router, createOneAccount);

  return main;
}
