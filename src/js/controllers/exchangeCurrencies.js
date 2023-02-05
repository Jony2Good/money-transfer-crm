import { mount } from "redom";
import exchangeCurrencies from "../model/api/postCurrencies.js";
import makeUserMessages from "../view/components/userMessages.js";
import { checkExchangeField } from "../view/utils/validation.js";

export default function makeCurrencyExchange(createCurenciesList) {
  const formContainer = document.getElementById("exchange-form");
  const from = document.getElementById("exchange-from");
  const to = document.getElementById("exchange-to");
  const amount = document.getElementById("exchange-input");
  const errorField = document.querySelector(".exchange__currencies-error");
  const successField = document.querySelector(".exchange__currencies-success");
  const btn = document.getElementById("exchange-btn");

  checkExchangeField(amount, btn, errorField);

  formContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const fromCur = from.textContent;
    const toCur = to.textContent;
    if (fromCur == toCur) {
      const msg = new Error("Entered identical currencies");
      makeUserMessages(errorField, msg, "error-icon");
      return;
    }
    exchangeCurrencies(
      fromCur,
      toCur,
      amount.value.replace(",", "."),
      sessionStorage.getItem("token")
    ).then((res) => {
      if (res.payload !== null) {
        document.getElementById("currency-list").remove();
        const wrapList = document.getElementById("currency-wrap");
        const newList = createCurenciesList(res.payload);
        mount(wrapList, newList);
        amount.value = "";
        amount.classList.remove("is-valid");
        makeUserMessages(
          successField,
          "Currency exchange completed",
          "text-success"
        );
      } else {
        switch (res.error) {
          case "Overdraft prevented":
            makeUserMessages(errorField, res.error, "error-icon");
            break;
          case "Not enough currency":
            makeUserMessages(errorField, res.error, "error-icon");
            break;
        }
      }
    });
  });
}
