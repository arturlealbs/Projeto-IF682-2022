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
    const token = Cypress.env("token");
    localStorage.setItem("TOKEN", token);
    cy.visit("http://localhost:4200/list");  
    
  });

  it("should not be empty", () => {
    cy.get(".card-component-test.slick-active").should('have.length.greaterThan', 0);
  });

  it.skip("Should dislike user", () => {
    cy.get(".card-component-test.slick-active").first().as("firstUser")
    cy.get("@firstUser").invoke('text').then((text) => {
      cy.get('#carousel').should('contain.text', text)
      cy.get('@firstUser').find('.ui.thumbs.down.icon').parent().click({'force': true})  
      cy.get('#carousel').should('not.contain.text', text)
    })
  })

  it("Should like user", () => {
    cy.get(".card-component-test.slick-active").first().as("secondUser")
    cy.get("@secondUser").invoke('text').then((text) => {
      cy.get('#carousel').should('contain.text', text)
      cy.get('@secondUser').find('.ui.green.heart.icon').parent().click({'force': true})    
      cy.get('#carousel').should('not.contain.text', text)

    })
   })

  it("Should open modal", () => {
    cy.get('.modal.active').should('not.exist')
    cy.get(".card-component-test.slick-active").first().find('.ui.link').click({'force': true})
    cy.get('.modal.active').should('exist')
  })

  it.skip("Should show a message when there is no users to like", async () => {
    let children = await cy.get(".slick-list .slick-track .slide").children();
    children.each(() => {
      cy.get(".card-component-test.slick-active .ui.green.heart.icon")
        .first().click({'force': true})
    })
    cy.get('.ui.message').should('contain.text', 'Parece que não tem ninguém por aqui :(')
  })
});
