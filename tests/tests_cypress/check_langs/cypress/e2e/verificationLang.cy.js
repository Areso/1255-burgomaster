
describe('Verification lang', () => {
    const LANG = '"en-US"';

    const CITY = 'tabCity';
    const BUILDING = 'btnOpenTabBuilding';
    const SETTINGS = 'tabSettings';
    const ABOUT = 'tabAbout';
    const DISCORD = 'tabDiscord';

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
            win.eval('loadLocale(' + LANG + ')');
        });
    })

    it('Locale ' + LANG + '. Verification welcome text in log', () => {
        cy.logText('', 'welcome0');
        cy.logText('', 'welcome1');
        cy.logText('', 'welcome2');        
    })

    it('Locale ' + LANG + '. Verification feature Fire', () => {
        cy.get('#log_btn').click();

        cy.window().then((win) => {
            win.eval('game.year=1261');
        });

        cy.logText('game.startFire(autotest=true)', 'fireInCity');
        cy.langContentBtn(CITY, 'buttonPutOutFire', 'btnPutOutTheFire');
        cy.logText('game.putOutFireUI()', 'fireEndedByFireservice');
    });

    it('Locale ' + LANG + '. Verification button saveGameButton', () => {
        cy.langContentBtn(CITY, 'saveGameButton', 'locSaveGame');
     });

    it('Locale ' + LANG + '. Verification button loadGameButton', () => {
        cy.langContentBtn(CITY, 'loadGameButton', 'locLoadGame');
    });

    it('Locale ' + LANG + '. Verification button tabCity', () => {
        cy.langBtn(CITY, 'tabCity');
    });
    it('Locale ' + LANG + '. Verification button btnOpenTabBuilding', () => {
        cy.langBtn(BUILDING, 'tabBuilding');
    });

    it('Locale ' + LANG + '. Verification button tabSettings', () => {
        cy.langBtn(SETTINGS, 'tabSettings');
    });

    it('Locale ' + LANG + '. Verification button tabAbout', () => {
        cy.langBtn(ABOUT, 'tabHowToPlay');
    });

    it('Locale ' + LANG + '. Verification button tabDiscord', () => {
        cy.langBtn(DISCORD, 'tabDiscord');
    });

    it('Locale ' + LANG + '. Verification button labelSettings', () => {
        cy.langContentBtn(SETTINGS, 'labelSettings', 'tabSettings');
    });

    it('Locale ' + LANG + '. Verification button buttonExportGame', () => {
        cy.langContentBtn(SETTINGS, 'buttonExportGame', 'tabSettingsBtnExportGame');
    });

    it('Locale ' + LANG + '. Verification button buttonImportGame', () => {
        cy.langContentBtn(SETTINGS, 'buttonImportGame', 'tabSettingsBtnImportGame');
    });

    it('Locale ' + LANG + '. Verification label labelAutosave', () => {
        cy.langContentBtn(SETTINGS, 'labelAutosave', 'tabSettingsLblAutosave');
    });

    it('Locale ' + LANG + '. Verification label labelGarrison', () => {
        cy.langContentBtn(CITY, 'labelGarrison', 'lblGarrison');
    });

    it('Locale ' + LANG + '. Verification button buttonFireGuard', () => {
        cy.langContentBtn(CITY, 'buttonFireGuard', 'btnFire');
    });

    it('Locale ' + LANG + '. Verification button buttonFireGuard', () => {
        cy.langContentBtn(CITY, 'buttonHireGuard', 'btnHire');
    });

    // разобраться, возможно сменить блок, проверяем форматированный текст
    it.skip('!!!!!!!!!!!!!!!!!!!!!!!!!! Locale ' + LANG + '. Verification label lblAboutGame', () => {
        let text;
        cy.get('#' + ABOUT).click();

        cy.window().then((win1) => {
            text = win1.eval('locObj.tabHowToPlayText.replace("%arg1",config.treasuryGuardPriceHire).replace("%arg2",config.treasuryGuardPricePayroll)');
            //  cy.get('[id="' + lblAboutGame + '"]').then(() => {
            // console.log("=====> " + text);
            cy.get('#lblAboutGame').then(() => {
                //    cy.get('[id="' + aboutGameWrapper + '"]').then(() => {

                cy.contains(text);
            })

        });

    });

    it('Locale ' + LANG + '. Verification label lblTabGold', () => {
        cy.langContentBtn(CITY, 'lblTabGold', 'tabGoldHistory');
    });

    it('Locale ' + LANG + '. Verification label lblTabPop', () => {
        cy.langContentBtn(CITY, 'lblTabPop', 'tabPopHistory');
    });

    it('Locale ' + LANG + '. Verification label lblTabInn', () => {
        cy.langContentBtn(CITY, 'lblTabInn', 'tabInnWelcome');
    });

    it('Locale ' + LANG + '. Verification label lblUpkeepSrc', () => {
        cy.langContentBtn(SETTINGS, 'lblUpkeepSrc', 'heroTroopsUpkeepSource');
    });

    it('Locale ' + LANG + '. Verification label btnColorMode', () => {
        cy.langContentBtn(SETTINGS, 'btnColorMode', 'tabSettingsBtnChangeColorMode');
    });

    it.skip('!!!!!!!!!!!!!!!Locale ' + LANG + '.  label selectUpkeepSrc[0]', () => {
        cy.langContentBtn(CITY, 'selectUpkeepSrc[0]', 'heroTroopsUpkeepSrcHeroPurse');
    });

    it.skip('!!!!!!!!!!!!!!!Locale ' + LANG + '.  label selectUpkeepSrc[1]', () => {
        cy.langContentBtn(CITY, 'selectUpkeepSrc[1]', 'heroTroopsUpkeepSrcTreasury');
    });

    it('Locale ' + LANG + '. Verification button btnDismissHero', () => {
        cy.langContentBtn(CITY, 'btnDismissHero', 'btnDismissHero');
    });

    it('Locale ' + LANG + '. Verification button btnAutocampaignJournal', () => {
        cy.langContentBtn(CITY, 'btnAutocampaignJournal', 'btnAutocampaignOpenJournal');
    });

    it('Locale ' + LANG + '. Verification button btnTowngate', () => {
        cy.langContentBtn(CITY, 'btnTowngate', 'btnUseTowngateScroll');
    });

    it('Locale ' + LANG + '. Verification button btnLeaveCity', () => {
        cy.langContentBtn(CITY, 'btnLeaveCity', 'btnGoToAdvenureMap');
    });
    it('Locale ' + LANG + '. Verification button btnGenerateMap', () => {
        cy.langContentBtn(CITY, 'btnGenerateMap', 'btnRegenerateMap');
    });

    it('Locale ' + LANG + '. Verification button btnAutobattlesList', () => {
        cy.langContentBtn(CITY, 'btnAutobattlesList', 'autobattle_journal_btn');
    });

    it('Locale ' + LANG + '. Verification label lblOption', () => {
        cy.langContentBtn(SETTINGS, 'lblOption', 'tabSoundSettingsLblOption');
    });

    it('Locale ' + LANG + '. Verification label lblOn', () => {
        cy.langContentBtn(SETTINGS, 'lblOn', 'on');
    });

    it('Locale ' + LANG + '. Verification label lblOff', () => {
        cy.langContentBtn(SETTINGS, 'lblOff', 'off');
    });

    it('Locale ' + LANG + '. Verification label lblSfxAll', () => {
        cy.langContentBtn(SETTINGS, 'lblSfxAll', 'tabSoundSettingsLblAllSoundEffects');
    });

    it('Locale ' + LANG + '. Verification label lblSfxEvt', () => {
        cy.langContentBtn(SETTINGS, 'lblSfxEvt', 'tabSoundSettingsLblAllEventsEffects');
    });

    it('Locale ' + LANG + '. Verification label lblSfxEvtAR', () => {
        cy.langContentBtn(SETTINGS, 'lblSfxEvtAR', 'tabSoundSettingsLblEffectsAR');
    });

    it('Locale ' + LANG + '. Verification label lblMscAll', () => {
        cy.langContentBtn(SETTINGS, 'lblMscAll', 'tabSoundSettingsAllMusic');
    });

    it('Locale ' + LANG + '. Verification label lblMscScr', () => {
        cy.langContentBtn(SETTINGS, 'lblMscScr', 'tabSoundSettingsScMusic');
    });

    it('Locale ' + LANG + '. Verification button btnToGeneralSettings', () => {
        cy.langContentBtn(CITY, 'btnToGeneralSettings', 'btnBack');
    });

    it('Locale ' + LANG + '. Verification button btnToInn', () => {
        cy.langContentBtn(CITY, 'btnToInn', 'btnBack');
    });

    it('Locale ' + LANG + '. Verification button btnToInn1', () => {
        cy.langContentBtn(CITY, 'btnToInn1', 'btnBack');
    });

    it('Locale ' + LANG + '. Verification label lblSoundMenu', () => {
        cy.langContentBtn(SETTINGS, 'lblSoundMenu', 'lblSoundMenu');
    });

    it('Locale ' + LANG + '. Verification button btnSoundSettings', () => {
        cy.langContentBtn(CITY, 'btnSoundSettings', 'tabSettingsBtnOpenSoundSettings');
    });

    it('Locale ' + LANG + '. Verification label lblStnMobileUI', () => {
        cy.langContentBtn(SETTINGS, 'lblStnMobileUI', 'tabSettingsLblMobileUI');
    });

    it('Locale ' + LANG + '. Verification label lblStnEventLogSize', () => {
        cy.langContentBtn(SETTINGS, 'lblStnEventLogSize', 'tabSettingsLblLogSize');
    });

    it('Locale ' + LANG + '. Verification label lblStnLines', () => {
        cy.langContentBtn(SETTINGS, 'lblStnLines', 'tabSettingsLblLines');
    });

    it('Locale ' + LANG + '. Verification label lblGoodsForSale', () => {
        cy.langContentBtn(SETTINGS, 'lblGoodsForSale', 'lblGoodForSale');
    });

    it('Locale ' + LANG + '. Verification label lblGoodsForBuying', () => {
        cy.langContentBtn(SETTINGS, 'lblGoodsForBuying', 'lblHeroGoodsFoSale');
    });

    it('Locale ' + LANG + '. Verification button btnLeaveBlackmarket', () => {
        cy.langContentBtn(CITY, 'btnLeaveBlackmarket', 'btnGoToAdvenureMap');
    });

    it('Locale ' + LANG + '. Verification label lblFirebrigade', () => {
        cy.langContentBtn(SETTINGS, 'lblFirebrigade', 'lblFirebrigade');
    });

    it('Locale ' + LANG + '. Verification label lblFBOption', () => {
        cy.langContentBtn(SETTINGS, 'lblFBOption', 'lblFireServiceStatus');
    });

    it('Locale ' + LANG + '. Verification label lblFBOn', () => {
        cy.langContentBtn(SETTINGS, 'lblFBOn', 'onDuty');
    });

    it('Locale ' + LANG + '. Verification label lblFBOff', () => {
        cy.langContentBtn(SETTINGS, 'lblFBOff', 'offDuty');
    });

    it('Locale ' + LANG + '. Verification label lblFBUpKeepPrice', () => {
        cy.langContentBtn(SETTINGS, 'lblFBUpKeepPrice', 'lblFirebrigadeUpkeep');
    });

    it('Locale ' + LANG + '. Verification button btnPopAtStart', () => {
        cy.langContentBtn(CITY, 'btnPopAtStart', 'paginationStart');
    });

    it('Locale ' + LANG + '. Verification button btnGoldAtStart', () => {
        cy.langContentBtn(CITY, 'btnGoldAtStart', 'paginationStart');
    });

    it('Locale ' + LANG + '. Verification button btnPopPrev', () => {
        cy.langContentBtn(CITY, 'btnPopPrev', 'paginationPrevious');
    });

    it('Locale ' + LANG + '. Verification button btnGoldPrev', () => {
        cy.langContentBtn(CITY, 'btnGoldPrev', 'paginationPrevious');
    });

    it('Locale ' + LANG + '. Verification button btnPopNext', () => {
        cy.langContentBtn(CITY, 'btnPopNext', 'paginationNext');
    });

    it('Locale ' + LANG + '. Verification button btnGoldNext', () => {
        cy.langContentBtn(CITY, 'btnGoldNext', 'paginationNext');
    });

    it('Locale ' + LANG + '. Verification button btnPopAtEnd', () => {
        cy.langContentBtn(CITY, 'btnPopAtEnd', 'paginationCurrent');
    });

    it('Locale ' + LANG + '. Verification button btnGoldAtEnd', () => {
        cy.langContentBtn(CITY, 'btnGoldAtEnd', 'paginationCurrent');
    });

    it.skip('&&&&&&&&&&&&&&&&Locale ' + LANG + '. Verification button downloadGame', () => {
        cy.langContentBtn(CITY, 'downloadGame', 'localeStrings[328]');
    });

    it('Locale ' + LANG + '. Verification label lblLevelForHireLbl', () => {
        cy.langContentBtn(SETTINGS, 'lblLevelForHireLbl', 'heroLvlLbl');
    });

    it('Locale ' + LANG + '. Verification button spnServerStatusLabel', () => {
        cy.langContentBtn(CITY, 'spnServerStatusLabel', 'serverStatusSpn');
    });

    it('Locale ' + LANG + '. Verification button spnServerStatusValue', () => {
        cy.langContentBtn(CITY, 'spnServerStatusValue', 'serverStatusND');
    });

    it('Locale ' + LANG + '. Verification button spnOnline', () => {
        cy.langContentBtn(CITY, 'spnOnline', 'online');
    });

    it('Locale ' + LANG + '. Verification button spnOnlineValue', () => {
        cy.langContentBtn(CITY, 'spnOnlineValue', 'onlineValueND');
    });


    // 68 / 7
    // ------------------("buttonPutOutFire").innerText    = locObj.btnPutOutTheFire.txt;
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
    // ------------------("buttonImportGame").innerText    = locObj.tabSettingsBtnImportGame.txt;
    // ------------------("labelAutosave").innerText       = locObj.tabSettingsLblAutosave.txt;
    // ------------------("labelGarrison").innerText       = locObj.lblGarrison.txt;
    // ------------------("buttonFireGuard").innerText     = locObj.btnFire.txt;
    // ------------------("buttonHireGuard").innerText     = locObj.btnHire.txt;
    // -????????---------("lblAboutGame").innerHTML        = locObj.tabHowToPlayText.replace("%arg1",config.treasuryGuardPriceHire).replace("%arg2",config.treasuryGuardPricePayroll);
    // ------------------("lblTabPop").innerText           = locObj.tabPopHistory.txt;
    // ------------------("lblTabGold").innerText          = locObj.tabGoldHistory.txt;
    // ------------------("btnColorMode").innerText        = locObj.tabSettingsBtnChangeColorMode.txt;
    // ------------------("lblTabInn").innerText           = locObj.tabInnWelcome.txt;
    // ------------------("lblUpkeepSrc").innerText        = locObj.heroTroopsUpkeepSource.txt;
    // -????????---------("selectUpkeepSrc")[0].text       = locObj.heroTroopsUpkeepSrcHeroPurse.txt;
    // -????????---------("selectUpkeepSrc")[1].text       = locObj.heroTroopsUpkeepSrcTreasury.txt;
    // 	-----------------("btnDismissHero").innerText      = locObj.btnDismissHero.txt;
    // 	-----------------("btnAutocampaignJournal").innerText  = locObj.btnAutocampaignOpenJournal.txt;
    // 	-----------------("btnTowngate").innerText         = locObj.btnUseTowngateScroll.txt;
    // 	-----------------("btnLeaveCity").innerText        = locObj.btnGoToAdvenureMap.txt;
    // 	-----------------("btnGenerateMap").innerText      = locObj.btnRegenerateMap.txt;
    // 	-----------------("btnAutobattlesList").innerText  = locObj.autobattle_journal_btn.txt;
    // 	-----------------("lblOption").innerText           = locObj.tabSoundSettingsLblOption.txt;
    // 	-----------------("lblOn").innerText               = locObj.on.txt;
    // 	-----------------("lblOff").innerText              = locObj.off.txt;
    // 	-----------------("lblSfxAll").innerText           = locObj.tabSoundSettingsLblAllSoundEffects.txt;
    // 	-----------------("lblSfxEvt").innerText           = locObj.tabSoundSettingsLblAllEventsEffects.txt;
    // 	-----------------("lblSfxEvtAR").innerText         = locObj.tabSoundSettingsLblEffectsAR.txt;
    // 	-----------------("lblMscAll").innerText           = locObj.tabSoundSettingsAllMusic.txt;
    // 	-----------------("lblMscScr").innerText           = locObj.tabSoundSettingsScMusic.txt;
    // 	-----------------("btnToGeneralSettings").innerText= locObj.btnBack.txt;
    // 	-----------------("btnToInn").innerText            = locObj.btnBack.txt;
    // 	-----------------("btnToInn1").innerText           = locObj.btnBack.txt;
    // 	-----------------("lblSoundMenu").innerText        = locObj.lblSoundMenu.txt;
    // 	-----------------("btnSoundSettings").innerText    = locObj.tabSettingsBtnOpenSoundSettings.txt;
    // 	-----------------("lblStnMobileUI").innerText      = locObj.tabSettingsLblMobileUI.txt;
    // 	-----------------("lblStnEventLogSize").innerText  = locObj.tabSettingsLblLogSize.txt;
    // 	-----------------("lblStnLines").innerText         = locObj.tabSettingsLblLines.txt;
    // 	-----------------("lblGoodsForSale").innerText     = locObj.lblGoodForSale.txt;
    // 	-----------------("lblGoodsForBuying").innerText   = locObj.lblHeroGoodsFoSale.txt;
    // 	-----------------("btnLeaveBlackmarket").innerText = locObj.btnGoToAdvenureMap.txt;
    // 	-----------------("lblFirebrigade").innerText      = locObj.lblFirebrigade.txt;
    // 	-----------------("lblFBOption").innerText         = locObj.lblFireServiceStatus.txt;
    // 	-----------------("lblFBOn").innerText             = locObj.onDuty.txt;
    // 	-----------------("lblFBOff").innerText            = locObj.offDuty.txt;
    // 	-----------------("lblFBUpKeepPrice").innerText    = locObj.lblFirebrigadeUpkeep.txt;
    // 	-----------------("btnPopAtStart").innerText       = locObj.paginationStart.txt;
    // 	-----------------("btnGoldAtStart").innerText      = locObj.paginationStart.txt;
    // 	-----------------("btnPopPrev").innerText          = locObj.paginationPrevious.txt;
    // 	-----------------("btnGoldPrev").innerText         = locObj.paginationPrevious.txt;
    // 	-----------------("btnPopNext").innerText          = locObj.paginationNext.txt;
    // 	-----------------("btnGoldNext").innerText         = locObj.paginationNext.txt;
    // 	-----------------("btnPopAtEnd").innerText         = locObj.paginationCurrent.txt;
    // 	-----------------("btnGoldAtEnd").innerText        = locObj.paginationCurrent.txt;
    // 	--???????--------("downloadGame").innerText        = localeStrings[328];
    // 	-----------------("lblLevelForHireLbl").innerText  = locObj.heroLvlLbl.txt;
    // 	-----------------("spnServerStatusLabel").innerText= locObj.serverStatusSpn.txt;
    //  -----------------("spnServerStatusValue").innerText= locObj.serverStatusND.txt;
    //  -----------------("spnOnline").innerText           = locObj.online.txt;
    //  -----------------("spnOnlineValue").innerText      = locObj.onlineValueND.txt;




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