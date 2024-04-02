
describe('Verification lang', () => {
    const LANG = '"ru-RU"'; // en-US, ru-RU, de-DE, eo, fr-FR, es-ES

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

    it('Locale ' + LANG + '.', () => {
        let arg = '.replace("%arg1",config.treasuryGuardPriceHire).replace("%arg2",config.treasuryGuardPricePayroll)';

        // *********************************************************************
        //     Checking the file dom.js
        // *********************************************************************

        // Verification button spnServerStatusValue
        cy.langContentBtn(CITY, 'spnServerStatusValue', 'serverStatusND');

        // Verification button spnOnlineValue
        cy.langContentBtn(CITY, 'spnOnlineValue', 'onlineValueND');

        // Verification welcome text in log
        cy.langLogText('', 'welcome0');
        cy.langLogText('', 'welcome1');
        cy.langLogText('', 'welcome2');

        //Verification feature Fire
        cy.get('#log_btn').click();

        cy.window().then((win) => {
            win.eval('game.year=1261');
        });

        cy.langLogText('game.startFire(autotest=true)', 'fireInCity');
        cy.langContentBtn(CITY, 'buttonPutOutFire', 'btnPutOutTheFire');
        cy.langLogText('game.putOutFireUI()', 'fireEndedByFireservice');

        // Verification button buttonDeathPenalty
        cy.langContentBtn(CITY, 'buttonDeathPenalty', 'btnExecutePerson');

        // Verification button saveGameButton
        cy.langContentBtn(CITY, 'saveGameButton', 'locSaveGame');

        // Verification button loadGameButton
        cy.langContentBtn(CITY, 'loadGameButton', 'locLoadGame');

        // Verification button tabCity
        cy.langBtn(CITY, 'tabCity');

        // Verification button btnOpenTabBuilding
        cy.langBtn(BUILDING, 'tabBuilding');

        // Verification button tabSettings
        cy.langBtn(SETTINGS, 'tabSettings');

        // Verification button tabAbout
        cy.langBtn(ABOUT, 'tabHowToPlay');

        // Verification button tabDiscord
        cy.langBtn(DISCORD, 'tabDiscord');

        // Verification button labelSettings
        cy.langContentBtn(SETTINGS, 'labelSettings', 'tabSettings');

        // Verification button buttonExportGame
        cy.langContentBtn(SETTINGS, 'buttonExportGame', 'tabSettingsBtnExportGame');

        // Verification button buttonImportGame
        cy.langContentBtn(SETTINGS, 'buttonImportGame', 'tabSettingsBtnImportGame');

        // Verification label labelAutosave
        cy.langContentBtn(SETTINGS, 'labelAutosave', 'tabSettingsLblAutosave');

        // Verification label labelGarrison
        cy.langContentBtn(CITY, 'labelGarrison', 'lblGarrison');

        // Verification button buttonFireGuard
        cy.langContentBtn(CITY, 'buttonFireGuard', 'btnFire');

        // Verification button buttonFireGuard
        cy.langContentBtn(CITY, 'buttonHireGuard', 'btnHire');

        // Verification label lblAboutGame
        cy.langContentBtn(ABOUT, 'lblAbout_h1', 'lblAbout_h1');
        cy.langContentBtn(ABOUT, 'lblAbout_h2', 'lblAbout_h2');
        cy.langContentHref(ABOUT, 'lblAbout_wiki', 'lblAbout_wiki');
        cy.langContentHref(ABOUT, 'lblAbout_feedback', 'lblAbout_feedback');
        cy.langContentArg(ABOUT, 'lblAbout_meh', 'lblAbout_meh', arg);
        cy.langContentBtn(ABOUT, 'lblAbout_supLang', 'lblAbout_supLang');
        cy.langContentHref(ABOUT, 'lblAbout_googleLang', 'lblAbout_googleLang');

        // Verification label lblTabGold
        cy.langContentBtn(CITY, 'lblTabGold', 'tabGoldHistory');

        // Verification label lblTabPop
        cy.langContentBtn(CITY, 'lblTabPop', 'tabPopHistory');

        // Verification label lblTabInn
        cy.langContentBtn(CITY, 'lblTabInn', 'tabInnWelcome');

        // Verification label lblUpkeepSrc
        cy.langContentBtn(SETTINGS, 'lblUpkeepSrc', 'heroTroopsUpkeepSource');

        // Verification label btnColorMode
        cy.langContentBtn(SETTINGS, 'btnColorMode', 'tabSettingsBtnChangeColorMode');

        // Verification label selectUpkeepSrc[0]
        cy.langListElement(CITY, 'selectUpkeepSrc', 0, 'heroTroopsUpkeepSrcHeroPurse');

        // Verification label selectUpkeepSrc[1]
        cy.langListElement(CITY, 'selectUpkeepSrc', 1, 'heroTroopsUpkeepSrcTreasury');

        //Verification button btnDismissHero
        cy.langContentBtn(CITY, 'btnDismissHero', 'btnDismissHero');

        // Verification button btnAutocampaignJournal
        cy.langContentBtn(CITY, 'btnAutocampaignJournal', 'btnAutocampaignOpenJournal');

        // Verification button btnTowngate
        cy.langContentBtn(CITY, 'btnTowngate', 'btnUseTowngateScroll');

        // Verification button btnLeaveCity
        cy.langContentBtn(CITY, 'btnLeaveCity', 'btnGoToAdvenureMap');

        // Verification button btnGenerateMap
        cy.langContentBtn(CITY, 'btnGenerateMap', 'btnRegenerateMap');

        // Verification button btnAutobattlesList
        cy.langContentBtn(CITY, 'btnAutobattlesList', 'autobattle_journal_btn');

        // Verification label lblOption
        cy.langContentBtn(SETTINGS, 'lblOption', 'tabSoundSettingsLblOption');

        // Verification label lblOn
        cy.langContentBtn(SETTINGS, 'lblOn', 'on');

        // Verification label lblOff
        cy.langContentBtn(SETTINGS, 'lblOff', 'off');

        // Verification label lblSfxAll
        cy.langContentBtn(SETTINGS, 'lblSfxAll', 'tabSoundSettingsLblAllSoundEffects');

        // Verification label lblSfxEvt
        cy.langContentBtn(SETTINGS, 'lblSfxEvt', 'tabSoundSettingsLblAllEventsEffects');

        // Verification label lblSfxEvtAR
        cy.langContentBtn(SETTINGS, 'lblSfxEvtAR', 'tabSoundSettingsLblEffectsAR');

        // Verification label lblMscAll
        cy.langContentBtn(SETTINGS, 'lblMscAll', 'tabSoundSettingsAllMusic');

        // Verification label lblMscScr
        cy.langContentBtn(SETTINGS, 'lblMscScr', 'tabSoundSettingsScMusic');

        // Verification button btnToGeneralSettings
        cy.langContentBtn(CITY, 'btnToGeneralSettings', 'btnBack');

        // Verification button btnToInn
        cy.langContentBtn(CITY, 'btnToInn', 'btnBack');

        // Verification button btnToInn1
        cy.langContentBtn(CITY, 'btnToInn1', 'btnBack');

        // Verification label lblSoundMenu
        cy.langContentBtn(SETTINGS, 'lblSoundMenu', 'lblSoundMenu');

        // Verification button btnSoundSettings
        cy.langContentBtn(CITY, 'btnSoundSettings', 'tabSettingsBtnOpenSoundSettings');

        // Verification label lblStnMobileUI
        cy.langContentBtn(SETTINGS, 'lblStnMobileUI', 'tabSettingsLblMobileUI');

        // Verification label lblStnEventLogSize
        cy.langContentBtn(SETTINGS, 'lblStnEventLogSize', 'tabSettingsLblLogSize');

        // Verification label lblStnLines
        cy.langContentBtn(SETTINGS, 'lblStnLines', 'tabSettingsLblLines');

        // Verification label lblGoodsForSale
        cy.langContentBtn(SETTINGS, 'lblGoodsForSale', 'lblGoodForSale');

        // Verification label lblGoodsForBuying
        cy.langContentBtn(SETTINGS, 'lblGoodsForBuying', 'lblHeroGoodsFoSale');

        // Verification button btnLeaveBlackmarket
        cy.langContentBtn(CITY, 'btnLeaveBlackmarket', 'btnGoToAdvenureMap');

        // Verification label lblFirebrigade
        cy.langContentBtn(SETTINGS, 'lblFirebrigade', 'lblFirebrigade');

        // Verification label lblFBOption
        cy.langContentBtn(SETTINGS, 'lblFBOption', 'lblFireServiceStatus');

        // Verification label lblFBOn
        cy.langContentBtn(SETTINGS, 'lblFBOn', 'onDuty');

        // Verification label lblFBOff
        cy.langContentBtn(SETTINGS, 'lblFBOff', 'offDuty');

        // Verification label lblFBUpKeepPrice
        cy.langContentBtn(SETTINGS, 'lblFBUpKeepPrice', 'lblFirebrigadeUpkeep');

        // Verification button btnPopAtStart
        cy.langContentBtn(CITY, 'btnPopAtStart', 'paginationStart');

        // Verification button btnGoldAtStart
        cy.langContentBtn(CITY, 'btnGoldAtStart', 'paginationStart');

        // Verification button btnPopPrev
        cy.langContentBtn(CITY, 'btnPopPrev', 'paginationPrevious');

        // Verification button btnGoldPrev
        cy.langContentBtn(CITY, 'btnGoldPrev', 'paginationPrevious');

        // Verification button btnPopNext
        cy.langContentBtn(CITY, 'btnPopNext', 'paginationNext');

        // Verification button btnGoldNext
        cy.langContentBtn(CITY, 'btnGoldNext', 'paginationNext');

        // Verification button btnPopAtEnd
        cy.langContentBtn(CITY, 'btnPopAtEnd', 'paginationCurrent');

        // Verification button btnGoldAtEnd
        cy.langContentBtn(CITY, 'btnGoldAtEnd', 'paginationCurrent');

        // Verification button downloadGame
        cy.langContentBtn(CITY, 'downloadGame', 'downloadGame');

        // Verification label lblLevelForHireLbl
        cy.langContentBtn(SETTINGS, 'lblLevelForHireLbl', 'heroLvlLbl');

        // Verification button spnServerStatusLabel
        cy.langContentBtn(CITY, 'spnServerStatusLabel', 'serverStatusSpn');

        // Verification button spnOnline
        cy.langContentBtn(CITY, 'spnOnline', 'online');


        // *********************************************************************
        //     Checking the file objects_artifacts.js
        // *********************************************************************

    });
})