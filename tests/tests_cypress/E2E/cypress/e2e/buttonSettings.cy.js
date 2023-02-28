describe('Settings', () => {

    it('should be buttons in  window Settings', () => {
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
            cy.get('#btnOpenTabBuilding').should('have.class', 'tab-link');
            cy.get('#tabSettings').click();
            cy.get('#tabSettings').should('have.class', 'tab-link active');
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
            cy.get('#Settings').within(() => {
                cy.get('#btnReg').should('have.attr', 'onclick', 'setReg()');
                cy.get('#btnLogin').should('have.attr', 'onclick', 'setLogin()');
                cy.get('#login').should('have.attr', 'type', 'text');
                cy.get('#password').should('have.attr', 'type', 'password');
                cy.get('#email').should('have.attr', 'type', 'text');
                cy.get('#btnRegLogin').should('have.attr', 'onclick', 'remoteRegLogin()'); //cy.get('.connectors-list > li').should(($lis) => {

                cy.get('#selectLng').should('have.attr', 'onchange', 'reloadLang()');
                cy.get('#labelAutosave');
                cy.get('#autosaveImg').should('have.attr', 'onclick', 'changeAutosave()');
                cy.get('#buttonExportGame').should('have.attr', 'onclick', 'exportGame()');
                cy.get('#buttonImportGame').should('have.attr', 'onclick', 'importGame()');
                cy.get('#buttonSaveToCloud').should('have.attr', 'onclick', 'cloudQuickSave()');
                cy.get('#buttonLoadFromCloud').should('have.attr', 'onclick', 'cloudQuickLoad()');

                cy.get('#savestring').should('have.attr', 'name', 'savestring');
                cy.get('#downloadGame').should('have.attr', 'href', 'https://github.com/Areso/1255-burgomaster/archive/gh-pages.zip');

                cy.get('#btnColorMode').should('have.attr', 'onclick', 'changeColorMode()');
                cy.get('#btnSoundSettings').should('have.attr', 'onclick', `openTab(null, 'tabSettingsSound')`);

                cy.get('#cbMobileUI').should('have.attr', 'onclick', 'game.mobileUI()');
                cy.get('#inpStnEventLogSize').should('have.attr', 'onchange', 'game.setupEventLogSize()');


                cy.get('#lblStnUID').should('have.attr', 'style', 'visibility:hidden;');
                cy.get('#lblStnUIDValue').should('have.attr', 'style', 'margin-left: 20px; visibility:hidden;');
                cy.get('#lblStnAlias').should('have.attr', 'style', 'display: none');
                cy.get('#inpStnAliasValue').should('have.attr', 'style', 'display: none');
                cy.get('#patchnotes').should('have.attr', 'style', 'width:700px; height:280px; top:255px; left:40px; visibility: hidden;');
            });
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