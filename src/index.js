import "./css/main.scss";
import Navigo from "navigo";
import { createEntryPage } from "./js/view/app/entryPage.js";
import { checkUserAvtorization } from "./js/view/utils/validation.js";
import { createAccountListPage } from "./js/view/app/accountListPage.js";
import { setChildren } from "redom";
import {
  createNavSection,
  headerSection,
} from "./js/view/components/mainDOMElements.js";
import createAccountsList from "./js/controllers/accountList";
import getAccount from "./js/model/api/getAccount.js";
import createHistoryPage from "./js/view/app/hisoryPage.js";
import { createOneAccount } from "./js/view/app/accountPage.js";
import makeAuthorization from "./js/controllers/authorization.js";
import { createExchangeRateSection } from "./js/view/app/exchangePage";
import getMyCurrencies from "./js/model/api/getCurrencies";
import getAllCurrencies from "./js/model/api/getAllCurrencies";
import createBanksPage from "./js/view/app/banksPage";
import { createAccountSkeleton } from "./js/view/components/skeleton";
import { hideSkeleton } from "./js/view/components/skeleton";
(() => {
  const router = new Navigo("/");
  const container = document.getElementById("section-app");

  router
    .on("/", () => {
      setChildren(container, [headerSection(), createEntryPage()]);
      checkUserAvtorization();
      makeAuthorization(router);
    })
    .on("/accounts", () => {
      if (!sessionStorage.getItem("token")) router.navigate("/");
      const accountPage = createAccountListPage(router);
      const listAccounts = createAccountsList(router);
      accountPage.append(createAccountSkeleton(), listAccounts);
      setChildren(container, [createNavSection(router, "Счета"), accountPage]);
    })

    .on("accounts/:id", ({ data: { id } }) => {
      if (!sessionStorage.getItem("token")) router.navigate("/");
      const data = getAccount(sessionStorage.getItem("token"), id);
      data
        .then((res) => {
          setChildren(container, [
            createNavSection(router, "Счета"),
            createOneAccount(res, id, router),
          ]);
        })
        .finally(() => {
          setTimeout(() => {
            [
              document.querySelector(".middle-section"),
              document.querySelector(".table-section"),
            ].forEach((item) => item.classList.remove("hidden"));
            hideSkeleton(document.querySelector(".skeleton-section"));
          }, 500);
        });
    })
    .on("accounts/:id/history", ({ data: { id } }) => {
      if (!sessionStorage.getItem("token")) router.navigate("/");
      const data = getAccount(sessionStorage.getItem("token"), id);
      data
        .then((res) => {
          setChildren(container, [
            createNavSection(router, "Счета"),
            createHistoryPage(res, id, router),
          ]);
        })
        .finally(() => {
          setTimeout(() => {
            [
              document.querySelector(".history-section"),
              document.querySelector(".table-section"),
            ].forEach((item) => item.classList.remove("hidden"));
            hideSkeleton(document.querySelector(".skeleton-section"));
          }, 500);
        });
    })
    .on("/exchange", () => {
      if (!sessionStorage.getItem("token")) router.navigate("/");
      Promise.all([
        getMyCurrencies(sessionStorage.getItem("token")),
        getAllCurrencies(sessionStorage.getItem("token")),
      ])
        .then(([my, list]) => {
          setChildren(container, [
            createNavSection(router, "Валюта"),
            createExchangeRateSection(my, list),
          ]);
        })
        .finally(() => {
          setTimeout(() => {
            document
              .querySelector(".exchange-section")
              .classList.remove("hidden");
            hideSkeleton(document.querySelector(".skeleton-section"));
          }, 500);
        });
    })
    .on("/banks", () => {
      if (!sessionStorage.getItem("token")) router.navigate("/");
      setChildren(container, [
        createNavSection(router, "Банкоматы"),
        createBanksPage(),
      ]);
    })
    .resolve();
})();
