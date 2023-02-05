import { el } from "redom";
import getAccountsList from "../model/api/getAccountsList";
import { makeCard } from "../view/app/accountListPage";
import { hideSkeleton } from "../view/components/skeleton";
import makeUserMessages from "../view/components/userMessages";

/**creating a list of accounts based on data received from the server */
export default function createAccountsList(router) {
  const token = sessionStorage.getItem("token");
  const accountsList = getAccountsList(token);

  const section = el("section.container", { id: "card-section" });
  const container = el("div.row.g-5", { id: "card-body" });
  try {
    accountsList
      .then((res) => {
        if (res.length == 0) {
          const errMsg = new Error("Server error, reload page!");
          makeUserMessages(
            document.querySelector(".server-error"),
            errMsg,
            "text-danger"
          );
        }
        res.forEach((item) => {
          const card = makeCard(item, router);
          container.append(card);
        });
      })
      .finally(() => hideSkeleton(document.querySelector(".skeleton-section")));
  } catch (error) {
    console.log(error);
  }
  section.append(container);
  return section;
}
