describe('Checking the registration of a new user', () => {

    beforeEach(() => {
        cy.request('DELETE', 'https://navi.areso.pro:7001/api/v1.1/delete_test_users');
    })

    afterEach(() => {
        cy.request('DELETE', 'https://navi.areso.pro:7001/api/v1.1/delete_test_users');
    })

    it('Checking the registration of a new user', {
        retries: {
            runMode: 2,
            openMode: 2,
        },
    }, () => {
        cy.visit('/');

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        //close windows canvas
        cy.window().then((win) => {
            win.eval('document.getElementById("myDCanvas").classList.remove("active-modal")');
        });

        let userName = 'Autotest0000';

        cy.get('#tabSettings').click();
        cy.get('#selectLng').select('English');
        cy.get('#btnReg').click();
        cy.get('#login').type(userName);
        cy.get('#password').type('Autotest');
        cy.get('#btnRegLogin').click();
        cy.get('#log').contains('registered successfully');

        cy.get('#log').within(() => {
            cy.contains('registered successfully');
            cy.contains("you got a 'registered user' badge and 10 ambers");
            cy.contains('please, make a log-in now!');
        });

        cy.get('#buttonLoadFromCloud', { timeout: 15000 }).click();
        cy.get('#log').contains("you don't have saved game in the cloud");

        // Check
        cy.get('#autosaveImg').should('have.attr', 'src', 'resources/button_red.png');
        cy.get('#panelGoldValue').should('have.text', 30);
        cy.get('#panelPopValue').should('have.text', 6);
        cy.get('#gems').should('have.text', 10);
        cy.get('#spnServerStatusValue').should('have.text', 'Up');

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

        cy.visit('/');
        cy.reload(true);

        cy.get('#tabSettings').click();
        cy.get('#selectLng').select('English');
        cy.get('#btnLogin').click();
        cy.get('#login').type(userName);
        cy.get('#password').type('Autotest');
        cy.get('#btnRegLogin').click();
        cy.get('#log').contains('login successfull');
    });
})