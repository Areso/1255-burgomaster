
describe('Verification lang', () => {
    const LANG = '"es-ES"'; // en-US, ru-RU, de-DE, eo, fr-FR, es-ES

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
        cy.langLogText('', 'welcome0');
        cy.langLogText('', 'welcome1');
        cy.langLogText('', 'welcome2');        
    })

    it('Locale ' + LANG + '. Verification feature Fire', () => {
        cy.get('#log_btn').click();

        cy.window().then((win) => {
            win.eval('game.year=1261');
        });

        cy.langLogText('game.startFire(autotest=true)', 'fireInCity');
        cy.langContentBtn(CITY, 'buttonPutOutFire', 'btnPutOutTheFire');
        cy.langLogText('game.putOutFireUI()', 'fireEndedByFireservice');
    });

    it('Locale ' + LANG + '. Verification button buttonDeathPenalty', () => {
        cy.langContentBtn(CITY, 'buttonDeathPenalty', 'btnExecutePerson');
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

    // ожидает рефакторинга кода
    it.skip('!!!SKIP!!! Locale ' + LANG + '. Verification label lblAboutGame', () => {
        let text;
        cy.get('#' + ABOUT).click();

        cy.window().then((win1) => {
            text = win1.eval('locObj.tabHowToPlayText');//.replace("%arg1",config.treasuryGuardPriceHire).replace("%arg2",config.treasuryGuardPricePayroll)');
            cy.get('#lblAboutGame').should('text',text);
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

    it('Locale ' + LANG + '.  label selectUpkeepSrc[0]', () => {
        cy.langListElement(CITY, 'selectUpkeepSrc',0, 'heroTroopsUpkeepSrcHeroPurse');
    });

    it('Locale ' + LANG + '.  label selectUpkeepSrc[1]', () => {
        cy.langListElement(CITY, 'selectUpkeepSrc',1, 'heroTroopsUpkeepSrcTreasury');
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

    it('Locale ' + LANG + '. Verification button downloadGame', () => {
        cy.langContentBtn(CITY, 'downloadGame', 'downloadGame');
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
})