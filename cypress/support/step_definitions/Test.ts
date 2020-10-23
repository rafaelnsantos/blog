import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';

Given(/^o visitante entra no site$/, () => {
  cy.visit('/');
});

When(/^ele clica no blog$/, () => {
  cy.get('#link-blog').click();
});

Then(/^deve acessar o blog$/, () => {
  cy.title().should('equal', 'Blog | Monx.dev');
});
