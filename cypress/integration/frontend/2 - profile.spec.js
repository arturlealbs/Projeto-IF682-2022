/// <reference types="cypress" />

describe("See user profile", () => {
    before(() => {
        const token = Cypress.env("token");
        cy.fixture("update-user.json").then((config) => {
            cy.request({
                method: "POST",
                url: "http://localhost:3000/graphql",
                body: config,
                headers: {
                    authorization: token, 
                }
            });
        });
    })

    beforeEach(() => {
        cy.visit("http://localhost:4200/");
        const token = Cypress.env("token");
        localStorage.setItem("TOKEN", token);
    })

    it('should open profile', () => {
        cy.get("#profile-link").click();
        cy.url().should("include", "/profile");
    })

    it("should see profile infos", () => {
        cy.get("#profile-link").click();
        cy.fixture("update-user.json").then((config) => {
            const infos = config.variables.newUser;
            cy.get("#general-infos").should("contains.text", infos.birthDate);
            cy.get(".presentation").should("contains.text", infos.firstName);
            cy.get(".presentation").should("contains.text", infos.lastName);
        })
    })

    it("should edit profile", () => {
        cy.get("#profile-link").click();
        cy.get("#edit-profile").click();
        
        cy.get("[name=firstName]").clear().type("Usuário");
        cy.get("[name=lastName]").clear().type("Modificado");
        cy.get("button[type='submit']").click();

        cy.get(".btn-close").click();
        cy.get(".presentation").should("contains.text", "Usuário Modificado");
    })

    it("should see the alert", () => {
        cy.get("#profile-link").click();
        cy.get("#edit-profile").click();
        
        cy.get("[name=birthDate]").clear({force:true});
        cy.get("button[type='submit']").click();

        cy.get(".alert.showAlert")
          .should("contains.text", "A data de nascimento é obrigatória");
    })

    it("should see the message of updated profile", () => {
        cy.get("#profile-link").click();
        cy.get("#edit-profile").click();
        cy.get("button[type='submit']").click();
        cy.get("#popup").should("contains.text", "Perfil atualizado!")
    })


})