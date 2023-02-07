/* eslint-disable no-undef */
/* eslint-disable jest/expect-expect */

describe("Application functionality tests Coin.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
    cy.get('input[name="login"]').type("developer");
    cy.get('input[name="password"]').type("skillbox");
    cy.get(".entry_form").click();
    cy.get(".entry_btn").click();
  });

  it("Log in to application with your username and password", () => {
    cy.contains("My accounts").should("be.visible");
    cy.location("pathname").should("eq", "/accounts");
    cy.get(
      "#card-section #card-body #card-container:first-child .card .card-body div:first-child h5"
    ).should("have.text", "742130414774774-2023");
  });

  it("Open the yandex map with ATMs", () => {
    cy.contains("ATMs").click();
    cy.location("pathname").should("eq", "/banks");
    cy.wait(3000);
    cy.contains("ATMs map").should("be.visible");
    cy.get("ymaps").should("be.visible");
  });

  it("Checking the possibility of transferring the amount from the same accounts", () => {
    cy.get(".btn-account").eq(0).click();
    cy.wait(3000);
    cy.get("#numAcc").type("74213041477477406320783754");
    cy.get("#transferAmount").focus().type("0");
    cy.get(".error-account").click();
    cy.get(".error-field").should("have.text", "Invalid account to");
  });

  it("Add account", () => {
    cy.get(".btn-accounts").click();
  });

  it("Open balance history", () => {
    cy.contains("Открыть").click();
    cy.get("canvas").click();
    cy.wait(3000);
    cy.contains("History of the selected balance account").should("be.visible");
  });

  it("Open currency exchange page", () => {
    cy.contains("Валюта").click();
    cy.wait(3000);
    cy.contains("Currency exchange").should("be.visible");
    cy.go("back");
  });
});
