describe('City', () => {

    it('should be button City', () => {
        cy.visit('/');

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        //close windows canvas

        cy.window().then((win) => {
            win.eval('document.getElementById("myDCanvas").classList.remove("active-modal")');
        });

        cy.get('#menu-panel').within(() => {
            cy.get('#tabCity').click();
            cy.get('#tabCity').should('have.class','tab-link active');
            cy.get('#btnOpenTabBuilding').should('have.class','tab-link');
            cy.get('#tabSettings').should('have.class','tab-link');
            cy.get('#tabAbout').should('have.class','tab-link');
            cy.get('#tabDiscord').should('have.class','tab-link');
            cy.get('#lblEventCountdownValue').should('have.class','tab-link');
            cy.get('#_blank').should('have.href','https://www.patreon.com/bePatron?u=7838459');
        });
        cy.get('#resource-panel').within(() => {

        });
        cy.get('#content-panel').within(() => {
            cy.get('#main').within(() => {

            });
        });
        cy.get('#info-panel').within(() => {
            cy.get('#info-panel__actions').within(() => {

            });

        });

    });
})