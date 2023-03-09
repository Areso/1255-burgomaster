import 'cypress-html-validate/commands';
import { Attribute } from 'html-validate';

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
          "element-required-attributes": [
            "warn",
            {
              exclude: ['lang'],
            },
          ],
          'require-sri': 'warn',
          'script-type': 'warn',
          'wcag/h30': 'warn',
          'wcag/h37': 'warn',
          'heading-level': 'warn',
          'element-permitted-content': 'warn',
          'input-missing-label': 'warn',
          'no-deprecated-attr': 'warn',
          'element-permitted-content': 'warn',
          'attribute-allowed-values': 'warn',
          'element-name': 'warn',
          'attribute-boolean-style':'warn',
          'no-inline-style':'warn',
          'valid-id':'warn',
          'void-style':'warn'

        }
      },
      {
        exclude: ['lang'],
      }
    );
  });
})