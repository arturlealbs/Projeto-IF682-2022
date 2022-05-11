/// <reference types="cypress" />

describe("Register new user", () => {
    before(() => {

    })

    beforeEach(() => {
        cy.visit("http://localhost:4200/");
    })

    it("should logout", () => {
        const token = Cypress.env("token");
        localStorage.setItem("TOKEN", token);
        cy.get("#login-link").click().then(() => {
            expect(localStorage.getItem('TOKEN')).to.be.null;
        });
        cy.url().should("include", "/login");
    })

    it('should cannot go to profile on logout', () => {
        cy.get("#profile-link").click();
        cy.url().should("not.include", "/profile");
    })

    it('should register profile', () => {
        const email = Cypress.env("LoginEmail");
        cy.visit("http://localhost:4200/signin");
        
        const username = "Usuário Teste";
        const firstName = "Usuário";
        const lastName = "Usuário";
        const other = "Teste";
        const birthDate = "01/01/2000";

        cy.get("input[name=email]").type(email, { force: true });
        cy.get("input[name=username]").type(username);
        cy.get("input[name=firstName]").type(firstName);
        cy.get("input[name=lastName]").type(lastName);
        cy.get("input[name=city]").type(other);
        cy.get("input[name=state]").type(other);
        cy.get("input[name=address]").type(other);
        cy.get("input[name=birthDate]").type(birthDate);
        
        cy.intercept("POST", "http://localhost:3000/graphql").as("register");
        cy.get("button[type=submit]").click();
        cy.wait("@register").should(({ request }) => {
            const userPayload = request.body.variables.user
            expect(userPayload.email).to.include(email);
            expect(userPayload.username).to.include(username);
            expect(userPayload.firstName).to.include(firstName);
            expect(userPayload.lastName).to.include(lastName);
            expect(userPayload.city).to.include(other);
            expect(userPayload.state).to.include(other);
            expect(userPayload.address).to.include(other);
            expect(userPayload.birthDate).to.include(birthDate);
        })
    })

    it('should login', () => {
        const token = Cypress.env("token");
        localStorage.setItem("TOKEN", token);
        cy.visit("http://localhost:4200/profile").then(() => {
            cy.url().should("include", "/profile");
        });
    })
})