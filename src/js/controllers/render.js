import sortList from "../view/utils/sort.js";
import { makeCard, createSection } from "../view/app/accountListPage.js";
import getAccountsList from "../model/api/getAccountsList.js";

/**
 * с сервера поступает список счетов, сортируется, формируя новый массив счетов
 * удалаяется контейнер со старым списком счетов
 * с помощью forEach создается карточка с новым списком счетов
 * сортировка происходит в зависимости от выбранного элемента в списке select
 * @param {событие клика по списку в select} event
 */
export default function renderListAccounts(event, router) {
  const data = getAccountsList(sessionStorage.getItem("token"));
  const target = event.target.dataset;

  data.then((res) => {
    const newList = sortList(res, target);
    const element = createSection();
    const section = document.getElementById("card-section");

    newList.forEach((item) => {
      section.innerHTML = "";
      const card = makeCard(item, router);
      element.container.append(card);
      section.append(element.container);
    });
  });
}
