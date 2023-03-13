describe('Discord', () => {

    it('should be buttons in  window Discord', () => {
        cy.visit('/');

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        //close windows canvas

        cy.window().then((win) => {
            win.eval('document.getElementById("myDCanvas").classList.remove("active-modal")');
        });

        cy.get('.menu-panel').within(() => {
            cy.get('#tabCity').should('have.class', 'tab-link');
            cy.get('#tabBuilding').should('have.class', 'tab-link');
            cy.get('#tabSettings').should('have.class', 'tab-link');
            cy.get('#tabAbout').should('have.class', 'tab-link');
            cy.get('#tabDiscord').click();
            cy.get('#tabDiscord').should('have.class', 'tab-link active');
            cy.get('#lblEventCountdownValue');
        });

        cy.get('.resource-panel').within(() => {
            cy.get('.gold-val').within(() => {
                cy.get('#gold_img_bt').should('have.class', 'resource-icon')
                //  cy.get('#gold').should('have.style','display:none')
                cy.get('#panelGoldValue').contains(/\d+/);
            });
            cy.get('.population-val').within(() => {
                cy.get('#pop_img').should('have.class', 'resource-icon')
                cy.get('#panelPopValue').contains(/\d+/);
            });
            cy.get('.gems-val').within(() => {
                cy.get('#gems_img').should('have.class', 'resource-icon')
                cy.get('#gems').contains(/\d+/);
            });
            cy.get('.time-val').within(() => {
                cy.get('.resource-icon');
                cy.get('#dcounter').contains(/\d+/);
            });
            cy.get('.server-val').within(() => {
                cy.get('#spnServerStatusLabel');
                cy.get('#spnServerStatusValue');
            });
            cy.get('.event-val').within(() => {
                cy.get('#event-label');
                cy.get('#event-value');
            });
        });

        cy.get('.content-panel').within(() => {
            cy.get('#discord').should('have.class', 'tab active')
            // Docs Cypress https://docs.cypress.io/api/commands/origin#Other-limitations
            // It cannot run commands inside an <iframe> element
            //However, <iframe> support is on our roadmap for inclusion in a future version of Cypress.
        });

        cy.get('.info-panel').within(() => {
            cy.get('.info-panel__actions').within(() => {
                cy.get('#log_btn').should('have.class', 'btn');
                cy.get('#chat_btn').should('have.class', 'btn');
                cy.get('#chat_btn').should('have.class', 'btn');
                cy.get('#lbl_online').within(() => {
                    cy.get('#spnOnline');
                    cy.get('#spnOnlineValue');
                });
            });
            cy.get('#log').should('have.class', 'info-panel__history');
        });
    });
})