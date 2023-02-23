import 'cypress-html-validate/commands';

describe("validate", () => {

    it("should be validate", () => {
        cy.visit('/');

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.htmlvalidate();
    });
})