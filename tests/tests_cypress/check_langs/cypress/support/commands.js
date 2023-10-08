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

    console.log("Verification text in the element " + btnName);
    cy.get('#' + btnName).click();

    cy.window().then((win1) => {
        text = win1.eval('locObj.' + textName + '.txt');
        cy.get('[id="' + btnName + '"]').should('text', text.replaceAll('\n', ''));

    });
})

Cypress.Commands.add('langContentBtn', (tabName, btnName, textName) => {
    let text;

    console.log("Verification text in the element " + btnName);
    cy.get('#' + tabName).click();

    cy.window().then((win1) => {
        text = win1.eval('locObj.' + textName + '.txt');
        cy.get('[id="' + btnName + '"]').should('text', text.replaceAll('\n', ''));
    });
})

Cypress.Commands.add('langContentHref', (tabName, elementName, textName) => {
    let text;

    console.log("Verification text and link in the element " + elementName);
    cy.get('#' + tabName).click();

    cy.window().then((win1) => {
        text = win1.eval('locObj.' + textName + '.txt');
        let text0 = text.slice(0, text.indexOf("\<a"));
        let text1 = text.slice(text.indexOf("\=\'") + 2, text.indexOf("\'\>"));
        let text2 = text.slice(text.indexOf("\'\>") + 2, text.indexOf("\<\/"));
        cy.get('[id="' + elementName + '"]').should("text", text0 + text2);
        cy.get('[id="' + elementName + '"] > a').should('have.attr', 'href', text1)
            .and("text", text2);

    });
})

Cypress.Commands.add('langContentArg', (tabName, elementName, textName, arg) => {
    let text;

    console.log("Verification text and Arument in the element " + elementName);
    cy.get('#' + tabName).click();

    cy.window().then((win1) => {
        text = win1.eval('locObj.' + textName + '.txt' + arg);
        if (arg) {
            text = win1.eval('locObj.' + textName + '.txt' + arg);

        } else {
            text = win1.eval('locObj.' + textName + '.txt');

        }
        cy.get('[id="' + elementName + '"]').should('text', text.replaceAll('\n', ''));
    });
})

Cypress.Commands.add('langLogText', (eventCommand, textName) => {
    let text;

    console.log("Verification text event command in the log " + eventCommand);
    cy.get('#log_btn').click();

    cy.window().then((win1) => {
        win1.eval(eventCommand);
        text = win1.eval('locObj.' + textName + '.txt');
        cy.get('[id="log"]').contains(text);

    });
})

Cypress.Commands.add('langListElement', (tabName, listName, elemNumber, textName) => {
    let text;

    console.log("Verification text list element " + elemNumber + " in the list " + listName);
    cy.get('#' + tabName).click();

    cy.window().then((win1) => {
        text = win1.eval('locObj.' + textName + '.txt');
        cy.get('[id="' + listName + '"] > option').should(($lis) => {
            expect($lis.eq(elemNumber)).to.contain(text);
        })
    });
})