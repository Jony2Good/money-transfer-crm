import { el, setChildren, mount } from "redom";
import { createTitleSection } from "../components/mainDOMElements.js";
import createPagination from "./createPagination.js";

export function createHistorySection(data, count, pagination = false) {
  const historyContainer = el("section.container.table-section.enable-cursor");
  const body = el("div.col-sm-12.bg-light.bg-gradient.shadow.table-history");
  const title = createTitleSection(
    "h3",
    "Transfer amount history",
    "title mb-3 accounts-balance"
  );
  const table = el("table.table.text-light.table-responsive.");
  const thead = el(
    "thead.bg-primary.table-layout",
    el("tr", [
      el("th.table-radius-left.ms-3", { scope: "col" }, "Sender's account"),
      el("th", { scope: "col" }, "Beneficiary's account"),
      el("th", { scope: "col" }, "Transfer amount"),
      el("th.table-radius-right", { scope: "col" }, "Date"),
    ])
  );

  const tbody = el("tbody.text-dark");
  const [transactions, account] = [data.transactions, data.account];
  const list = transactions
    .slice(-count)
    .map((arr) => renderTransfers(arr, account));

  setChildren(tbody, list);
  setChildren(table, [thead, tbody]);
  setChildren(body, [title, table]);
  setChildren(historyContainer, body);

  if (pagination && transactions.length > 25) {
    const paginationBlock = createPagination(
      Math.ceil(transactions.length / count),
      transactions,
      account
    );
    mount(historyContainer, paginationBlock);
  }

  return historyContainer;
}

export function renderTransfers(trans, account) {
  const flag = trans.to === account;
  const trBody = el("tr");
  const thFrom = el("th.history-descr", { scope: "row" }, `${trans.from}`);
  const tdTo = el("td.history-descr", `${trans.to}`);
  const amount = el(
    "td",
    (flag ? "+" : "-") + `${createPriceFormat(trans.amount)} $`,
    { class: flag ? "text-success" : "text-danger" }
  );
  const date = el("td", formatDate(trans.date));

  setChildren(trBody, [thFrom, tdTo, amount, date]);

  return trBody;
}

export function createPriceFormat(number) {
  return new Intl.NumberFormat("en-En").format(number);
}

function formatDate(dateStr) {
  return new Date(dateStr)
    .toLocaleDateString("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");
}
