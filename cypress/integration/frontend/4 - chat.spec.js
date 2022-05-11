/// <reference types="cypress" />

describe("Can chat with another person", () => {
    beforeEach(() => {
        const token = Cypress.env("token");
        localStorage.setItem("TOKEN", token);
        cy.visit("http://localhost:4200/chats/");
    })

    it('should open contact', () => {
        cy.get(".contacts .item:nth-child(1)").click().then(() => {
            cy.get("#contact-name").should('be.visible');
        });
    })
    
    it('should be able to write a message', () => {
        cy.get(".contacts .item:nth-child(1)").click().then(() => {
            cy.get("#message-field").type('Test message')
            cy.get("#send-button").click()

            cy.get(".messages .item").should('have.length', 1)
        });
    })
})

describe('Can block another person', () => {
    beforeEach(() => {
        const token = Cypress.env("token");
        localStorage.setItem("TOKEN", token);
        cy.visit("http://localhost:4200/chats/");
        cy.get(".contacts .item:nth-child(1)").click();
        cy.get(".contacts .item:nth-child(1)").click();
    })

    it('should be able to block a contact', () => {
        cy.get("#block-btn").click()
        cy.get(".modal-body > :nth-child(2)").click()
        cy.get(".modal-body > :nth-child(2)").click().should('be.not.visible');
    })
    
    it('should see a message of blocked contact', () => {
        cy.get(".preview .description").should(
            'contains.text', 'Este usuário está bloqueado!');
    })
    
    it('should be able to unblock a contact', () => {
        cy.get("#unblock-btn").click()
        cy.visit("http://localhost:4200/chats/");
        cy.get(".contacts .item:nth-child(1)").click()
        cy.get(".contacts .item:nth-child(1)").click()

        cy.get(".messages .item").should('have.length', 0);
        cy.get(".preview .description").should('not.exist');
        cy.get("#message-field").type('Trying to send message');
        cy.get("#send-button").click();
        cy.get(".messages .item").should('have.length', 1);
    })
})