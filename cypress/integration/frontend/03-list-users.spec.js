/// <reference types="cypress" />

describe("See user profile", () => {
  before(() => {
    cy.visit("http://localhost:4200/list");  
    const token = Cypress.env("token");
    cy.fixture("reset-interactions.json").then((config) => {
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
    cy.visit("http://localhost:4200/list");  
    const token = Cypress.env("token");
    localStorage.setItem("TOKEN", token);
    
  });

  it("should not be empty", () => {
    cy.get(".card-component-test.slick-active").should('have.length.greaterThan', 0);
  });

  it("Should like user", () => {
    cy.get(".card-component-test.slick-active").first().as("firstUser")
    cy.get("@firstUser").invoke('text').then((text) => {
      cy.get('#carousel').should('contain.text', text)
      cy.get('@firstUser').find('.ui.green.heart.icon').parent().click({'force': true})    
      cy.get('#carousel').should('not.contain.text', text)

    })
   })

  it("Should dislike user", () => {
    cy.get(".card-component-test.slick-active").first().as("firstUser")
    cy.get("@firstUser").invoke('text').then((text) => {
      cy.get('#carousel').should('contain.text', text)
      cy.get('@firstUser').find('.ui.thumbs.down.icon').parent().click({'force': true})    
      cy.get('#carousel').should('not.contain.text', text)

    })
  })

  it.only("Should open modal", () => {
    cy.get('.modal.active').should('not.exist')
    cy.get(".card-component-test.slick-active").first().find('.ui.link').click({'force': true})
    cy.get('.modal.active').should('exist')

  })


});
