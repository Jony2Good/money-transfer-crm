import { makeCard } from "../view/app/accountListPage.js";
import createNewAccount from "../model/api/postAccount.js";

export default function addNewAccount(btn, router) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    createNewAccount().then((res) => {
      const card = makeCard(res, router);
      document.getElementById("card-body").prepend(card);
    });
  });
}
