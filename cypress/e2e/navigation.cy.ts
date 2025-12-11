/// <reference types="cypress" />

describe("Navigation Tests", () => {

  it("Homepage loads", () => {
    cy.visit("/");
    cy.contains("Take Control of Your Finances").should("exist");
  });

  it("Navbar works after clicking Get Started", () => {
    cy.visit("/");

    cy.contains("Get Started").click();

    // Step 2: Confirm we are on the landing page
    cy.url().should("include", "/register");

    //because ts not visible 
    cy.scrollTo("top");


    cy.contains("About").should("exist");

    // Step 4: Test clicking About
cy.get(".navbar-center a")
  .contains("About")
  .click({ force: true });


    // Step 5: Confirm navigation
    cy.url().should("include", "/about");
  });

});
