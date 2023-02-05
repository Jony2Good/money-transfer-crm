/// <reference types="cypress" />
/* eslint-disable no-undef */
/* eslint-disable jest/expect-expect */

describe("Тесты функционала сайта Coin.", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('input[name="login"]').type("developer");
    cy.get('input[name="password"]').type("skillbox");
    cy.get(".entry_form").click();
    cy.get(".entry_btn").click();
  });

  it("Войти в онлайн-банк по логину developer и паролю skillbox", () => {
    cy.contains("Ваши счета").should("be.visible");
    cy.location("pathname").should("eq", "/accounts");
    cy.get(
      "#card-section #card-body #card-container:first-child .card .card-body div:first-child h5"
    ).should("have.text", "7421304147747742023");
  });

  it("Открыть карту с банкоматами", () => {
    cy.contains("Банкоматы").click();
    cy.location("pathname").should("eq", "/banks");
    cy.contains("Карта банкоматов").should("be.visible");
    cy.get("ymaps").should("be.visible");
  });

  it("Проверка возможности перевести сумму со счёта на счёт", () => {
    cy.get(
      "#card-section #card-body #card-container:first-child .card .card-body .d-flex .btn-account"
    ).click();
    cy.get(".btn-account").eq(0).click();
    cy.get("#numAcc").type("74213041477477406320783754");
    cy.get("#transferAmount").focus().type("0");
    cy.get("#account-form").click();
    cy.get(".success-field").should("have.text", "Money transfer completed");
  });

  it("Показать ошибку при переводе средств на несуществующий счет", () => {
    cy.get("#numAcc").type("76026{enter}");
    cy.get("#transferAmount").type("100{enter}");
    cy.get("form").click();
    cy.get(".btn-accounts__icon--mail").click();
    cy.get("#numAcc").should("have.class", "is-invalid");
    cy.get(".error-field").should("be.visible");
  });

  it("Добавить счет", () => {
    cy.get(".btn-accounts").click();
  });

  it("Открыть историю баланса", () => {
    cy.contains("Открыть").click();
    cy.get("canvas").click();
    cy.wait(8000);
    cy.contains("История баланса").should("be.visible");
  });

  it("Открыть страницу с валютным обменом", () => {
    cy.contains("Валюта").click();
    cy.wait(15000);
    cy.contains("Валютный обмен").should("be.visible");
    cy.go("back");
  });
});
