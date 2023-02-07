import { setChildren } from "redom";
import sendTransfer from "../model/api/postTransfer.js";
import {
  createErrorMSg,
  createSuccessMSg,
} from "../view/components/mainDOMElements.js";
import { hideSkeleton } from "../view/components/skeleton.js";

export default function sendAccountTransfer(id, router, createOneAccount) {
  const form = document.getElementById("account-form");
  const inputAccount = document.getElementById("numAcc");
  const inputAmount = document.getElementById("transferAmount");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputAccount.value == id) {
      createErrorMSg("Accounts are the same").style.visibility = "visible";
      return;
    }
    sendTransfer(
      id,
      inputAccount.value,
      inputAmount.value.replace(",", "."),
      sessionStorage.getItem("token")
    )
      .then((res) => {
        if (res.payload !== null) {
          const transfersItem = localStorage.getItem("transfers");
          if (transfersItem) {
            const transfers = transfersItem.split(" ");
            transfers.push(inputAccount.value);

            localStorage.setItem(
              "transfers",
              Array.from(new Set(transfers)).join(" ")
            );
          } else {
            localStorage.setItem("transfers", inputAccount.value);
          }
          const container = document.getElementById("section-app");
          const navbar = document.querySelector(".navbar");
          const renderAcc = createOneAccount(res.payload, id, router);
          setChildren(container, [navbar, renderAcc]);

          createSuccessMSg("Money transfer completed").style.visibility =
            "visible";
          setTimeout(() => {
            createSuccessMSg("Money transfer completed").style.visibility =
              "hidden";
          }, 3000);
        } else {
          switch (res.error) {
            case "Invalid account to":
              createErrorMSg(res.error).style.visibility = "visible";
              break;
            case `Invalid amount`:
              createErrorMSg(res.error).style.visibility = "visible";

              break;
            case `Overdraft prevented`:
              createErrorMSg(res.error).style.visibility = "visible";
              break;
          }
        }
      })
      .finally(() => {
        [
          document.querySelector(".middle-section"),
          document.querySelector(".table-section"),
        ].forEach((item) => item.classList.remove("hidden"));
        hideSkeleton(document.querySelector(".skeleton-section"));
      });
  });
}
