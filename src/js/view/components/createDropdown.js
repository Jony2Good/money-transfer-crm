import renderListAccounts from "../../controllers/render.js";
import { el, setChildren, mount } from "redom";
/**
 * формирование выпадающего списка "Сортировка" для фильтрации счетов
 * @returns Dom-element
 */
export function createSortingDropdown(router) {
  const activeClass = "select__list--active";
  const selectList = el("ul.select__list.list-reset.shadow");
  const selectByNumber = el(
    "li.select__item.select-descr",
    { "data-sort": "byNumber" },
    "By number"
  );
  const selectByBalance = el(
    "li.select__item.select-descr",
    { "data-sort": "byBalance" },
    "By balance"
  );
  const selectByTrans = el(
    "li.select__item.select-descr",
    { "data-sort": "byLastTransaction" },
    "By last transaction"
  );
  setChildren(selectList, [selectByNumber, selectByBalance, selectByTrans]);
  const selectBtnMenu = el(
    "button.select__name.select-descr",
    "Selected elements"
  );
  const selectBody = el("div.select__type");
  setChildren(selectBody, [selectBtnMenu, selectList]);
  const selectContainer = el("div.select.ms-5.align-self-center");
  setChildren(selectContainer, selectBody);

  //кнопка со списком----------------------------------
  selectBtnMenu.addEventListener("click", (e) => {
    e.preventDefault();
    selectList.classList.toggle(activeClass);
    selectBtnMenu.classList.toggle(activeClass);
  });
  selectBody.addEventListener("mouseleave", () => {
    selectList.classList.remove(activeClass);
    selectBtnMenu.classList.remove(activeClass);
  });

  const itemArr = [selectByNumber, selectByBalance, selectByTrans];
  //проходясь по каждому элементу массива вызывается функция
  //при клике на элемент списка он попадает в кнопку selectBtnMenu
  for (const item of itemArr) {
    item.addEventListener("click", (e) => {
      selectBtnMenu.textContent = e.target.textContent;
      selectList.classList.remove(activeClass);
      selectBtnMenu.classList.remove(activeClass);

      itemArr.forEach((elem) => elem.classList.remove("check-img"));
      e.target.classList.add("check-img");

      /**происходит клик по элементу в списке select
       * в поле кнопки попадает выбранный элемент
       * в функцию передается событие клика и дата атрибут
       * по которому происходит сортировка
       */
      renderListAccounts(e, router);
    });
  }

  return selectContainer;
}

export function createExchangeDropdown(data) {
  const activeClass = "select__list--active";
  const selectList = el(
    "ul.select__list.list-reset.exchange-list-layout.shadow"
  );
  try {
    data.forEach((item) => {
      const itemList = el(
        "li.select__item.select-descr.select__item--layout",
        item
      );
      mount(selectList, itemList);
      itemList.addEventListener("click", (e) => {
        selectBtnMenu.textContent = e.target.textContent;
        selectList.classList.remove(activeClass);
        selectBtnMenu.classList.remove(activeClass);
      });
    });
  } catch (error) {
    console.log(error.stack);
  }

  const selectBtnMenu = el(
    "button.select-descr.exchange-select__type.text-muted",
    "Currency"
  );
  const selectBody = el("div.select__type");
  setChildren(selectBody, [selectBtnMenu, selectList]);
  const selectContainer = el("div.select.exchange-select.justify-content-end");
  setChildren(selectContainer, selectBody);

  //кнопка со списком----------------------------------
  selectBtnMenu.addEventListener("click", (e) => {
    e.preventDefault();
    selectList.classList.toggle(activeClass);
    selectBtnMenu.classList.toggle(activeClass);
    selectList.classList.add("active-scroll");
  });
  selectBody.addEventListener("mouseleave", () => {
    selectList.classList.remove(activeClass);
    selectBtnMenu.classList.remove(activeClass);
    selectList.classList.remove("active-scroll");
  });

  return { selectContainer, selectBtnMenu };
}
