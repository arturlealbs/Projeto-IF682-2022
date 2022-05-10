/// <reference types="cypress" />

describe("See user profile", () => {
    beforeEach(() => {
        cy.visit("http://localhost:4200/");
        const token = Cypress.env("token");
        localStorage.setItem("TOKEN", token);
    })

    it('should open profile', () => {
        cy.get("#profile-link").click();
        cy.url().should("include", "/profile");
    })
})