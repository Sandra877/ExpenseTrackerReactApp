describe("Admin Dashboard Tests", () => {
  beforeEach(() => {
    cy.login("sandrakihoro490@gmail.com", "Mimo200.");
    cy.visit("/admin");
  });

  it("Displays list of users", () => {
    cy.contains("Admin Dashboard").should("exist");
    cy.contains("Email").should("exist");
  });

  it("Can view user expenses", () => {
    cy.contains("Expenses").first().click();
    cy.contains("Expenses for").should("exist");
  });

  it("Can delete a user", () => {
    cy.contains("Delete").first().click();
    cy.contains(/user deleted/i).should("exist");
  });
});
