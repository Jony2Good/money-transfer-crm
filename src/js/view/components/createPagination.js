import { el, setChildren } from "redom";
import { createMainBtn } from "./mainDOMElements.js";
import { renderTransfers } from "./historySection.js";

function openPaginationItems(itemList, start, end) {
  itemList.forEach((item) => {
    const btnText = item.children[0].textContent;
    if (btnText >= start && btnText <= end) item.classList.add("open");
    else item.classList.remove("open");
  });
}

function createPaginationArrows(itemList) {
  let start = 1;
  let end = 5;

  const pointsLeft = el("span.pagination-points.left", "...");
  const pointsRight = el("span.pagination-points.mx-1.right.open", "...");

  const icon = `<svg width="7" height="10" viewBox="0 0 7 10" fill="#9CA3AF" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 0.75L1 5L5.5 9.25" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const arrowLeft = createMainBtn("pagination-arrow left", "button");
  const arrowRight = createMainBtn("pagination-arrow d-flex right", "button");
  arrowLeft.innerHTML = icon;
  arrowRight.innerHTML = icon;

  arrowLeft.disabled = "disabled";

  arrowLeft.addEventListener("click", () => {
    arrowLeft.disabled = "";
    arrowRight.disabled = "";
    pointsLeft.classList.add("open");
    pointsRight.classList.add("open");

    if (start !== 1) {
      start -= 5;
      end -= 5;
      openPaginationItems(itemList, start, end);
    }

    if (start === 1) {
      arrowLeft.disabled = "disabled";
      pointsLeft.classList.remove("open");
    }
  });

  arrowRight.addEventListener("click", () => {
    arrowLeft.disabled = "";
    arrowRight.disabled = "";
    pointsLeft.classList.add("open");
    pointsRight.classList.add("open");

    if (end < itemList.length) {
      start += 5;
      end += 5;
      openPaginationItems(itemList, start, end);
    }
    if (end >= itemList.length) {
      arrowRight.disabled = "disabled";
      pointsRight.classList.remove("open");
    }
  });

  openPaginationItems(itemList, start, end);

  return [arrowLeft, arrowRight, pointsLeft, pointsRight];
}

export default function createPagination(count, list, account) {
  const paginationBlock = el(
    "nav.p-4.d-flex.justify-content-center.align-items-center"
  );
  const paginationList = el("ul.pagination.mb-0");
  const itemList = [];

  for (let i = 1; i <= count; i++) {
    const item = el("li.pagination-item");
    const btn = createMainBtn("pagination-btn", "button", i);

    if (i === 1) btn.classList.add("active");
    btn.addEventListener("click", () => {
      let page = btn.textContent;
      const tableBody = document.querySelector("tbody");
      const rowList = list
        .slice(-25 * page, list.length - 25 * (page - 1))
        .map((transfer) => renderTransfers(transfer, account));
      setChildren(tableBody, rowList);
      activateBtn(page);
    });

    itemList.push(item);
    setChildren(item, [btn]);
  }

  setChildren(paginationList, itemList);

  const [arrowLeft, arrowRight, pointsLeft, pointsRight] =
    createPaginationArrows(itemList);

  if (count > 6)
    setChildren(paginationBlock, [
      arrowLeft,
      pointsLeft,
      paginationList,
      pointsRight,
      arrowRight,
    ]);
  else setChildren(paginationBlock, [paginationList]);

  return paginationBlock;
}

function activateBtn(btnText) {
  const btnsList = document.querySelectorAll(".pagination-btn");
  btnsList.forEach((btn) => {
    if (btn.textContent == btnText) {
      btn.classList.add("active");
    } else btn.classList.remove("active");
  });
}
