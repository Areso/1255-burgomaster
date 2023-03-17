// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('langBtn', (btnName, textName) => {
    let text;
    cy.get('#'+btnName).click();

    cy.window().then((win1) => {
        text = win1.eval('locObj.' + textName + '.txt');
        cy.get('[id="'+btnName+'"]').should('text', text);

    });
})

Cypress.Commands.add('langContentBtn', (tabName, btnName, textName) => {
    let text;
    cy.get('#'+tabName).click();

    cy.window().then((win1) => {
        text = win1.eval('locObj.' + textName + '.txt');
        cy.get('[id="'+btnName+'"]').should('text', text);

    });
})

Cypress.Commands.add('logText', (eventCommand, textName) => {
    let text;
    cy.get('#log_btn').click();

    cy.window().then((win1) => {
        win1.eval(eventCommand);
        text = win1.eval('locObj.' + textName + '.txt');
        cy.get('[id="log"]').contains(text);

    });
})