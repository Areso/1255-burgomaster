describe('Building', () => {

    it('should be buttons in  window Building', () => {
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
            cy.get('#TabBuilding').click();
            cy.get('#TabBuilding').should('have.class', 'tab-link active');
            cy.get('#tabSettings').should('have.class', 'tab-link');
            cy.get('#tabAbout').should('have.class', 'tab-link');
            cy.get('#tabDiscord').should('have.class', 'tab-link');
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
            cy.get('.building-wrapper').within(() => {
                cy.get('.building-list').within(() => {
                    cy.get('#home_img').should('have.attr', 'alt', 'home_as.png');
                    cy.get('#homes').should('have.class', 'btn');

                    cy.get('#defences_img').should('have.attr', 'alt', 'wallsf_as2.png');
                    cy.get('#defence').should('have.class', 'btn');

                    cy.get('#treasury_img').should('have.attr', 'alt', 'treasury_as.png');
                    cy.get('#treasury').should('have.class', 'btn'); //btn is-tutorial

                    cy.get('#gallows_img').should('have.attr', 'alt', 'gallows.png');
                    cy.get('#buttonBldGallows').should('have.class', 'btn');//name, btn is-tutorial

                    cy.get('#fountain_img').should('have.attr', 'alt', 'fountain.png');
                    cy.get('#buttonBldFountain').should('have.class', 'btn');//name, btn is-tutorial

                    cy.get('#moneystash_img').should('have.attr', 'alt', 'trapdoor.png');
                    cy.get('#buttonBldStash').should('have.class', 'btn');//name, btn is-tutorial

                    cy.get('#stable_img').should('have.attr', 'alt', 'stable.png');
                    cy.get('#buttonBldStable').should('have.class', 'btn'); //name, btn is-tutorial

                    cy.get('#archery_img').should('have.attr', 'alt', 'archery_range.png');
                    cy.get('#buttonBldArchery').should('have.class', 'btn');//name, btn is-tutorial

                    cy.get('#inn_img').should('have.attr', 'alt', 'tavern.png');
                    cy.get('#buttonBldInn').should('have.class', 'btn');//name, btn is-tutorial

                    cy.get('#university_img').should('have.attr', 'src', './resources/university2.png');
                    cy.get('#buttonBuildUniversity').should('have.class', 'btn');//name,alt, btn is-tutorial
                });
            });
            cy.get('#lblBuildHelp').should('have.class', 'building-description');
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