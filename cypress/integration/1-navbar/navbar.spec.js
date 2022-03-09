/// <reference types="cypress" />

describe('NavBar Checks', () => {
  let data1;
  let url =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://lolaadeoti.vercel.app/';
  before(() => {
    cy.fixture('navbar/1-navbar').then(function (data) {
      data1 = data;
      return data1;
    });
  });
  beforeEach(() => {
    cy.visit(url);
  });
  it('Navbar check for all buttons', () => {
    // for(const [key, value] of Object.entries(data1)){
    //   cy.get(`a`).contains(key)
    // }
    // *Four Nav Links
    cy.get(`div[data-name="large-links"] > a`).should('have.length', 4);

    // *Navbar container
    cy.get(`div[data-name="large-screen"]`).should('be.visible');

    // *Navbar Logo
    cy.get(`div[data-name='large-screen']`)
      .find(`img[alt="lola-adeoti"]`)
      .should('be.visible');

    // *Currency Selector
    cy.get(`div[data-name='large-screen']`)
      .find(`.chakra-select`)
      .should('be.visible');

    // *Profile Icon Button
    cy.get(`div[data-name='large-screen']`)
      .find(`button[aria-label="Profile Menu"]`)
      .should('be.visible');

    // *Cart Icon
    cy.get(`div[data-name='large-screen']`)
      .find(`button[aria-label="Shopping Cart"]`)
      .should('be.visible');
  });
});
