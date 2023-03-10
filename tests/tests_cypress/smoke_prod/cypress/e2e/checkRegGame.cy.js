describe('Verification of authorization and loading of the save', () => {

    it('Verification of authorization and loading of the save', () => {
        cy.visit('/');

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        //close windows canvas
        cy.window().then((win) => {
            win.eval('document.getElementById("myDCanvas").classList.remove("active-modal")');
        });

        cy.get('#tabSettings').click();
        cy.get('#selectLng').select('English');
        cy.get('#btnReg').click();
        cy.get('#login').type('Autotest' + Math.floor(Math.random() * 10000));
        cy.get('#password').type('Autotest');
        cy.get('#btnRegLogin').click();
        cy.get('#log').contains('registered successfully');

        cy.get('#log').within(() => {
            cy.contains('registered successfully');
            cy.contains("you got a 'registered user' badge and 10 ambers");
            cy.contains('please, make a log-in now!');
        });

        cy.get('#buttonLoadFromCloud', { timeout: 9000 }).click();
        cy.get('#log').contains('error from server. Are you logged in? Is server up?');

        // Check
        cy.get('#autosaveImg').should('have.attr', 'src', 'resources/button_red.png');
        cy.get('#panelGoldValue').should("have.text", 30);
        cy.get('#panelPopValue').should("have.text", 6);
        cy.get('#gems').should("have.text", 10);
        cy.get('#spnServerStatusValue').should("have.text", "Up");

        cy.window().its('game.year').should('equal', 1255);
        cy.window().its('game.season').should('equal', 2);
        cy.window().its('game.food').should('equal', 20);
        cy.window().its('game.treasuryGuard').should('equal', 0);
        cy.window().its('game.happiness').should('equal', 80);
        cy.window().its('game.fire').should('equal', 0);
        cy.window().its('game.fireSteps').should('equal', 0);
        cy.window().its('game.fireGuard').should('equal', 0);
        cy.window().its('game.hero').should('equal', 0);

        // checking available buildings
        cy.get('#btnOpenTabBuilding').click();

        cy.get('#homes')
            .should('have.text', 'Build Homelvl 12 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#defence')
            .should('have.text', 'Build Walllvl 12 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#treasury')
            .should('have.text', 'Build Treasurylvl 120 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#buttonBldGallows')
            .should('have.text', 'Build Gallowslvl 150 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#buttonBldFountain')
            .should('have.text', 'Build Fountainlvl 150 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#buttonBldStash')
            .should('have.text', 'Build Stashlvl 150 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#buttonBldStable')
            .should('have.text', 'Build Stablelvl 150 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#buttonBldArchery')
            .should('have.text', 'Build Archery rangelvl 150 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#buttonBldInn')
            .should('have.text', 'Build Innlvl 120 gold')
            .and('have.class', 'btn is-tutorial');
        cy.get('#buttonBuildUniversity')
            .should('have.text', 'Build university200 gold')
            .and('have.class', 'btn is-tutorial');

        cy.get('#chat_btn').click();
        cy.get('#log_btn').click();

        cy.get('#log').within(() => {
            cy.contains('Hello player in this incremental game!');
            cy.contains('Your task is simple - manage the city as mayor of the city!');
            cy.contains('Citizen will pay taxes each season (30 secs) and population will grow each season');
        });
    });
})