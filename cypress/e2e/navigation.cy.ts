describe("Navigation Tests", () => {
  it("Homepage loads", () => {
    cy.visit("/");
    cy.contains("Welcome").should("exist");
  });

  it("Navbar works", () => {
    cy.contains("About").click();
    cy.url().should("include", "/about");
  });
});
