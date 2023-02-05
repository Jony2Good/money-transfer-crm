import {
  mainField,
  createTitleSection,
  createMainBtn,
} from "../components/mainDOMElements.js";
import { el, setChildren } from "redom";
import createChart from "../utils/createChart.js";
import getMonthsBalances from "../utils/createChartMounths.js";
import { createHistorySection } from "../components/historySection.js";
import { createHistorySkeleton } from "../components/skeleton.js";

function createTopSection(data, id, router) {
  const topTitleContainer = el("section.container.mb-5");
  const body = el("div.row");
  const title = createTitleSection(
    "h2",
    "History of the selected balance account",
    "title mb-4"
  );
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
      href: `accounts/${id}`,
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

function createDinamicBlock() {
  const body = el("div.col-sm-12.bg-body.shadow.mb-5.charts-layout");
  const titleRight = createTitleSection(
    "h3",
    "Dynamics balance",
    "title mb-1 accounts-balance"
  );
  const canvasDinamic = el("canvas", { id: "chart" });
  const bodyChart = el("div.chart-field", canvasDinamic);
  setChildren(body, [titleRight, bodyChart]);

  return { canvasDinamic, body };
}

function createTransactionBlock() {
  const body = el("div.col-sm-12.bg-body.shadow.charts-layout");
  const titleRight = createTitleSection(
    "h3",
    "Ratio of incoming and outgoing transactions",
    "title mb-1 accounts-balance"
  );
  const canvasTrans = el("canvas", { id: "chart" });
  const bodyChart = el("div.chart-field", canvasTrans);
  setChildren(body, [titleRight, bodyChart]);

  return { canvasTrans, body };
}

function createMiddleSection(data) {
  const middleContainer = el("section.container.mb-5.history-section");
  const row = el("div.row");
  const balanceBlock = createDinamicBlock();
  const transferBlock = createTransactionBlock();

  const [months, balances, incomingTransfers, outingTransfers] =
    getMonthsBalances(data.transactions, data.account, data.balance, 12);

  createChart(balanceBlock.canvasDinamic, months, balances);

  createChart(transferBlock.canvasTrans, months, balances, true, {
    incoming: incomingTransfers,
    outing: outingTransfers,
  });

  setChildren(row, [balanceBlock.body, transferBlock.body]);
  setChildren(middleContainer, row);

  return middleContainer;
}

export default function createHistoryPage(data, id, router) {
  const main = mainField();
  const title = createTopSection(data, id, router);
  const middle = createMiddleSection(data);
  const historyTransferSection = createHistorySection(data, 25, true);
  [middle, historyTransferSection].forEach((item) =>
    item.classList.add("hidden")
  );
  setChildren(main, [
    title,
    createHistorySkeleton(),
    middle,
    historyTransferSection,
  ]);

  return main;
}
