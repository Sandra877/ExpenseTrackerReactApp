/// <reference types="cypress" />

// 🔹 Register user
Cypress.Commands.add("register", (email: string, password: string) => {
  cy.request("POST", `${Cypress.env("apiUrl")}/api/auth/register`, {
    email,
    password,
  });
});

// 🔹 Login user and save token in localStorage
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.request("POST", `${Cypress.env("apiUrl")}/api/auth/login`, {
    email,
    password,
  }).then((res) => {
    expect(res.status).to.eq(200);
    const token = res.body.token;

    // Make sure the next visited page already sees the token
    window.localStorage.setItem("token", token);
  });
});

// 🔹 Type declaration so TypeScript knows about cy.login & cy.register
declare global {
  namespace Cypress {
    interface Chainable {
      register(email: string, password: string): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
    }
  }
}

export {};
