/// <reference types="cypress" />

describe("Expense CRUD", () => {
  const email = "kihorosandra@gmail.com";
  const password = "Mimo100.";

  let token: string;

  // Login once via API
  before(() => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/api/auth/login`,
      body: {
        email,
        password,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body.token;
    });
  });

  //  Visit page with token already set
  beforeEach(() => {
    cy.visit("/landingpage", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", token);
      },
    });
  });

  // ----------------------------------------------------
  //TEST 1 — Loads dashboard
  // ----------------------------------------------------
  it("Loads expense dashboard", () => {
    cy.contains("Your Expense Summary", { timeout: 8000 }).should("exist");
  });

  // ----------------------------------------------------
  // TEST 2 — Creates an expense
  // ----------------------------------------------------
  it("Creates an expense successfully", () => {
      cy.get('[data-cy="add-expense-form"]').within(() => {
      // Category
      cy.get("select").select("Food");

      // Amount
      cy.get('input[type="number"]').clear().type("500");

      // Date
      cy.get('input[type="date"]').type("2025-12-05");

      // Submit
      cy.contains("button", /add expense/i).click();
    });

    // Toast
    cy.contains(/expense added/i, { timeout: 6000 }).should("exist");

    // Verify expense appears
    cy.contains("Food").should("exist");
    cy.contains("500").should("exist");
  });

  // ----------------------------------------------------
  // ✔ TEST 3 — Deletes an expense
  // ----------------------------------------------------
  it("Deletes an expense", () => {
    cy.contains("Delete", { timeout: 6000 }).should("exist");

    cy.contains("Delete").first().click();

    cy.contains(/expense deleted/i, { timeout: 6000 }).should("exist");
  });
});
