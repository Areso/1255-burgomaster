import 'cypress-html-validate/commands';

describe("validate", () => {

  it("should be validate", () => {
    cy.visit('/');

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.htmlvalidate(
      {
        extends: ["html-validate:recommended"],
        rules: {
          'require-sri': 'off',
          'script-type': 'off',
          'wcag/h30': 'off',
          'wcag/h37': 'off',
          'heading-level': 'off',
          'element-permitted-content': 'off',
          'input-missing-label': 'off',
          'no-deprecated-attr': 'off',
          'element-permitted-content': 'off',
          'attribute-allowed-values': 'off',
          'element-name': 'off'
        }
      }
    );
  });
})