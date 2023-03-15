describe('Verification lang', () => {

    beforeEach(() => {
        cy.visit('/')

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        //close windows canvas
        cy.window().then((win) => {
            win.eval('document.getElementById("myDCanvas").classList.remove("active-modal")');
        });

        cy.window().then((win) => {
            win.eval('loadLocale("en-US")');
        });
    })

    it('Verification lang', () => {
        let welcome0;
        let errGetSaveEndpoint;

        cy.get('#tabSettings').click();
        cy.get('#buttonLoadFromCloud', { timeout: 9000 }).click();

        cy.get('#log_btn').click();

        cy.window().then((win) => {
            welcome0 = win.eval('locObj.welcome0.txt');
            errGetSaveEndpoint = win.eval('locObj.errGetSaveEndpoint.txt');
        });

        cy.get('#log').within(() => {

            cy.contains(welcome0);
            cy.contains(errGetSaveEndpoint);
        });
    })

    it.skip('Verification lang Fire', () => {

        let fireInCity;
        let buttonPutOutFire;

        cy.window().then((win) => {
            // win.eval('loadLocale("en-US")');
            // win.eval('game.putOutFireUI()');
            win.eval('game.buildLevelH=3');
            win.eval('game.buildLevelD=2');
            win.eval('game.ticks=3');
            win.eval("game.Build('Home')");
            win.eval('game.startFire()');
            win.eval('game.putOutFireUI()');
        });

        // cy.get('#chat_btn').click();
        cy.get('#log_btn').click();

        cy.window().then((win) => {
            fireInCity = win.eval('locObj.fireInCity.txt');
            buttonPutOutFire = win.eval('locObj.btnPutOutTheFire.txt');
        });

        cy.window().then((win) => {
            // win.eval('game.startFire()');
            // win.eval('game.putOutFireUI()');
        });

        cy.get('#log').within(() => {
            cy.contains(buttonPutOutFire);
            cy.contains(buttonPutOutFire);
        });
    });

    it.skip('Verification lang save/loadGameButton', () => {

        let saveGameButton;
        let loadGameButton;

        // cy.window().then((win) => {
        //     win.eval('loadLocale("en-US")');
        //  win.eval('saveGameCallback()');
        //  win.eval('loadGameCallback()');
        // win.eval('game.buildLevelH=3');
        // win.eval('game.buildLevelD=2');
        // win.eval('game.ticks=3');
        // win.eval("game.Build('Home')");
        // win.eval('game.startFire()');
        // win.eval('game.putOutFireUI()');
        // });

        // cy.get('#chat_btn').click();
        cy.get('#log_btn').click();

        cy.window().then((win) => {
            saveGameButton = win.eval('locObj.locSaveGame.txt');
            loadGameButton = win.eval('locObj.locLoadGame.txt');
        });

        cy.window().then((win) => {
            win.eval('saveGameCallback()');
            win.eval('loadGameCallback()');
        });

        cy.get('#log').within(() => {
            cy.contains(saveGameButton);
            cy.contains(loadGameButton);
        });
    });

    it('Verification lang tabCity', () => {
        cy.langBtn('tabCity', 'tabCity');
    });

    it('Verification lang btnOpenTabBuilding', () => {
        cy.langBtn('btnOpenTabBuilding', 'tabBuilding');
    });

    it('Verification lang tabSettings', () => {
        cy.langBtn('tabSettings', 'tabSettings');
    });

    it('Verification lang tabAbout', () => {
        cy.langBtn('tabAbout', 'tabHowToPlay');
    });

    it('Verification lang tabDiscord', () => {
        cy.langBtn('tabDiscord', 'tabDiscord');
    });

    it('Verification lang labelSettings', () => {
        cy.langContentBtn('tabSettings', 'labelSettings', 'tabSettings');
    });

    it('Verification lang buttonExportGame', () => {
        cy.langContentBtn('tabSettings', 'buttonExportGame', 'tabSettingsBtnExportGame');
    });

    // -????????---------("buttonPutOutFire").innerText    = locObj.btnPutOutTheFire.txt;
    // document.getElementById("buttonDeathPenalty").innerText  = locObj.btnExecutePerson.txt;
    // -????????---------("saveGameButton").innerText      = locObj.locSaveGame.txt;
    // -????????---------("loadGameButton").innerText      = locObj.locLoadGame.txt;
    // ------------------("tabCity").innerText             = locObj.tabCity.txt;
    // ------------------("tabSettings").innerText         = locObj.tabSettings.txt;
    // ------------------("btnOpenTabBuilding").innerText  = locObj.tabBuilding.txt;
    // ------------------("tabAbout").innerText            = locObj.tabHowToPlay.txt;
    // ------------------("tabDiscord").innerText          = locObj.tabDiscord.txt;
    // ------------------("labelSettings").innerText       = locObj.tabSettings.txt;
    // ------------------("buttonExportGame").innerText    = locObj.tabSettingsBtnExportGame.txt;
    // document.getElementById("buttonImportGame").innerText    = locObj.tabSettingsBtnImportGame.txt;
    // document.getElementById("labelAutosave").innerText       = locObj.tabSettingsLblAutosave.txt;
    // document.getElementById("labelGarrison").innerText       = locObj.lblGarrison.txt;
    // document.getElementById("buttonFireGuard").innerText     = locObj.btnFire.txt;
    // document.getElementById("buttonHireGuard").innerText     = locObj.btnHire.txt;
    // document.getElementById("lblAboutGame").innerHTML        = locObj.tabHowToPlayText.replace("%arg1",config.treasuryGuardPriceHire).replace("%arg2",config.treasuryGuardPricePayroll);
    // document.getElementById("lblTabPop").innerText           = locObj.tabPopHistory.txt;
    // document.getElementById("lblTabGold").innerText          = locObj.tabGoldHistory.txt;
    // document.getElementById("btnColorMode").innerText        = locObj.tabSettingsBtnChangeColorMode.txt;
    // document.getElementById("lblTabInn").innerText           = locObj.tabInnWelcome.txt;
    // document.getElementById("lblUpkeepSrc").innerText        = localeStrings[279];
    // document.getElementById("selectUpkeepSrc")[0].text       = localeStrings[284];
    // document.getElementById("selectUpkeepSrc")[1].text       = localeStrings[285];
    // document.getElementById("btnDismissHero").innerText      = locObj.btnDismissHero.txt;
    // document.getElementById("btnAutocampaignJournal").innerText  = locObj.btnAutocampaignOpenJournal.txt;
    // document.getElementById("btnTowngate").innerText         = locObj.btnUseTowngateScroll.txt;
    // document.getElementById("btnLeaveCity").innerText        = locObj.btnGoToAdvenureMap.txt;
    // document.getElementById("btnGenerateMap").innerText      = locObj.btnRegenerateMap.txt;
    // document.getElementById("btnAutobattlesList").innerText  = locObj.autobattle_journal_btn.txt;
    // document.getElementById("lblOption").innerText           = locObj.tabSoundSettingsLblOption.txt;
    // document.getElementById("lblOn").innerText               = locObj.on.txt;
    // document.getElementById("lblOff").innerText              = locObj.off.txt;
    // document.getElementById("lblSfxAll").innerText           = locObj.tabSoundSettingsLblAllSoundEffects.txt;
    // document.getElementById("lblSfxEvt").innerText           = locObj.tabSoundSettingsLblAllEventsEffects.txt;
    // document.getElementById("lblSfxEvtAR").innerText         = locObj.tabSoundSettingsLblEffectsAR.txt;
    // document.getElementById("lblMscAll").innerText           = locObj.tabSoundSettingsAllMusic.txt;
    // document.getElementById("lblMscScr").innerText           = locObj.tabSoundSettingsScMusic.txt;
    // document.getElementById("btnToGeneralSettings").innerText= locObj.btnBack.txt;
    // document.getElementById("btnToInn").innerText            = locObj.btnBack.txt;
    // document.getElementById("btnToInn1").innerText           = locObj.btnBack.txt;
    // document.getElementById("lblSoundMenu").innerText        = locObj.lblSoundMenu.txt;
    // document.getElementById("btnSoundSettings").innerText    = locObj.tabSettingsBtnOpenSoundSettings.txt;
    // document.getElementById("lblStnMobileUI").innerText      = locObj.tabSettingsLblMobileUI.txt;
    // document.getElementById("lblStnEventLogSize").innerText  = locObj.tabSettingsLblLogSize.txt;
    // document.getElementById("lblStnLines").innerText         = locObj.tabSettingsLblLines.txt;
    // document.getElementById("lblGoodsForSale").innerText     = locObj.lblGoodForSale.txt;
    // document.getElementById("lblGoodsForBuying").innerText   = locObj.lblHeroGoodsFoSale.txt;
    // document.getElementById("btnLeaveBlackmarket").innerText = locObj.btnGoToAdvenureMap.txt;
    // document.getElementById("lblFirebrigade").innerText      = locObj.lblFirebrigade.txt;
    // document.getElementById("lblFBOption").innerText         = locObj.lblFireServiceStatus.txt;
    // document.getElementById("lblFBOn").innerText             = locObj.onDuty.txt;
    // document.getElementById("lblFBOff").innerText            = locObj.offDuty.txt;
    // document.getElementById("lblFBUpKeepPrice").innerText    = locObj.lblFirebrigadeUpkeep.txt;
    // document.getElementById("btnPopAtStart").innerText       = locObj.paginationStart.txt;
    // document.getElementById("btnGoldAtStart").innerText      = locObj.paginationStart.txt;
    // document.getElementById("btnPopPrev").innerText          = locObj.paginationPrevious.txt;
    // document.getElementById("btnGoldPrev").innerText         = locObj.paginationPrevious.txt;
    // document.getElementById("btnPopNext").innerText          = locObj.paginationNext.txt;
    // document.getElementById("btnGoldNext").innerText         = locObj.paginationNext.txt;
    // document.getElementById("btnPopAtEnd").innerText         = locObj.paginationCurrent.txt;
    // document.getElementById("btnGoldAtEnd").innerText        = locObj.paginationCurrent.txt;
    // document.getElementById("downloadGame").innerText        = localeStrings[328];
    // document.getElementById("lblLevelForHireLbl").innerText  = locObj.heroLvlLbl.txt;
    // document.getElementById("spnServerStatusLabel").innerText= locObj.serverStatusSpn.txt;
    // document.getElementById("spnServerStatusValue").innerText= locObj.serverStatusND.txt;
    // document.getElementById("spnOnline").innerText           = locObj.online.txt;
    // document.getElementById("spnOnlineValue").innerText      = locObj.onlineValueND.txt;





    // });
    // cy.get('#tabSettings').click();
    // cy.get('#selectLng').select('English');
    // cy.get('#btnLogin').click();
    // cy.get('#login').type('tester16');
    // cy.get('#password').type('tester16');
    // cy.get('#btnRegLogin').click();
    // cy.get('#log').contains('login successfull');
    // cy.get('#buttonLoadFromCloud', { timeout: 9000 }).click();

    // // Check
    // cy.get('#autosaveImg').should('have.attr', 'src', 'resources/button_green.png');
    // cy.get('#panelGoldValue').should("have.text", 24180);
    // cy.get('#panelPopValue').should("have.text", 648);
    // cy.get('#gems').should("have.text", 10);
    // cy.get('#spnServerStatusValue').should("have.text", "Up");

    // cy.window().its('game.year').should('equal', 1308);
    // cy.window().its('game.season').should('equal', 3);
    // cy.window().its('game.food').should('equal', 20);
    // cy.window().its('game.treasuryGuard').should('equal', 20);
    // cy.window().its('game.happiness').should('equal', 80);
    // cy.window().its('game.fire').should('equal', 0);
    // cy.window().its('game.fireSteps').should('equal', 0);
    // cy.window().its('game.fireGuard').should('equal', 0);
    // cy.window().its('game.hero').should('equal', 0);

    // // checking available buildings
    // cy.get('#btnOpenTabBuilding').click();

    // cy.get('#homes')
    //     .should('have.text', 'Build Homelvl 17131072 gold')
    //     .and('have.class', 'btn');
    // cy.get('#defence')
    //     .should('have.text', 'Build Walllvl 12 gold')
    //     .and('have.class', 'btn')
    //     .and('not.be.visible');
    // cy.get('#treasury')
    //     .should('have.text', 'Build Treasurylvl 1381920000000000000 gold')
    //     .and('have.class', 'btn');
    // cy.get('#buttonBldGallows')
    //     .should('have.text', 'Build Gallowslvl 150 gold')
    //     .and('have.class', 'btn')
    //     .and('not.be.visible'); 
    // cy.get('#buttonBldFountain')
    //     .should('have.text', 'Build Fountainlvl 3125000 gold')
    //     .and('have.class', 'btn');
    // cy.get('#buttonBldStash')
    //     .should('have.text', 'Build Stashlvl 3125000 gold')
    //     .and('have.class', 'btn');
    // cy.get('#buttonBldStable')
    //     .should('have.text', 'Build Stablelvl 3125000 gold')
    //     .and('have.class', 'btn');
    // cy.get('#buttonBldArchery')
    //     .should('have.text', 'Build Archery rangelvl 3125000 gold')
    //     .and('have.class', 'btn');
    // cy.get('#buttonBldInn')
    //     .should('have.text', 'Build Innlvl 4160000 gold')
    //     .and('have.class', 'btn');
    // cy.get('#buttonBuildUniversity')
    //     .should('have.text', 'Build university200 gold')
    //     .and('have.class', 'btn');
})