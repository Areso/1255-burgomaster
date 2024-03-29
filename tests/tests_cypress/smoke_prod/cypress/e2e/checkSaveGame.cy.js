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
        cy.get('#btnLogin').click();
        cy.get('#login').type('tester16');
        cy.get('#password').type('tester16');
        cy.get('#btnRegLogin').click();
        cy.get('#log').contains('login successfull');
        cy.get('#buttonLoadFromCloud', { timeout: 9000 }).click();

        // Check
        cy.get('#autosaveImg').should('have.attr', 'src', 'resources/button_red.png');
        cy.get('#panelGoldValue').should("have.text", 24180);
        cy.get('#panelPopValue').should("have.text", 648);
        cy.get('#gems').should("have.text", 10);
        cy.get('#spnServerStatusValue').should("have.text", "Up");

        cy.window().its('game.year').should('equal', 1308);
        cy.window().its('game.season').should('equal', 3);
        cy.window().its('game.food').should('equal', 20);
        cy.window().its('game.treasuryGuard').should('equal', 20);
        cy.window().its('game.happiness').should('equal', 80);
        cy.window().its('game.fire').should('equal', 0);
        cy.window().its('game.fireSteps').should('equal', 0);
        cy.window().its('game.fireGuard').should('equal', 0);
        cy.window().its('game.hero').should('equal', 0);

        cy.window().then((win) => {
            win.eval('dcounter_component.dcounter=1');
        });

        // checking available buildings
        cy.get('#btnOpenTabBuilding').click();

        cy.get('#homes')
            .should('have.text', 'Build Homelvl 17131072 gold')
            .and('have.class', 'btn');
        cy.get('#defence')
            .should('have.text', 'Build Walllvl 12 gold')
            .and('have.class', 'btn')
            .and('not.be.visible');
        cy.get('#treasury')
            .should('have.text', 'Build Treasurylvl 1381920000000000000 gold')
            .and('have.class', 'btn');
        cy.get('#buttonBldGallows')
            .should('have.text', 'Build Gallowslvl 150 gold')
            .and('have.class', 'btn')
            .and('not.be.visible'); 
        cy.get('#buttonBldFountain')
            .should('have.text', 'Build Fountainlvl 3125000 gold')
            .and('have.class', 'btn');
        cy.get('#buttonBldStash')
            .should('have.text', 'Build Stashlvl 3125000 gold')
            .and('have.class', 'btn');
        cy.get('#buttonBldStable')
            .should('have.text', 'Build Stablelvl 3125000 gold')
            .and('have.class', 'btn');
        cy.get('#buttonBldArchery')
            .should('have.text', 'Build Archery rangelvl 3125000 gold')
            .and('have.class', 'btn');
        cy.get('#buttonBldInn')
            .should('have.text', 'Build Innlvl 4160000 gold')
            .and('have.class', 'btn');
        cy.get('#buttonBuildUniversity')
            .should('have.text', 'Build university200 gold')
            .and('have.class', 'btn');

        cy.get('#chat_btn').click();
        cy.get('#log_btn').click();

        cy.get('#log').within(() => {
            cy.contains('Hello player in this incremental game!');
            cy.contains('Your task is simple - manage the city as mayor of the city!');
            cy.contains('Citizen will pay taxes each season (30 secs) and population will grow each season');
            cy.contains('login successfull');
            cy.contains('game loaded successfully');
        });
    });
})