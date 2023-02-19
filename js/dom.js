//load localization
function include (url, fn) {
  var e = document.createElement("script");
  e.onload = fn;
  e.src = url;
  e.async=true;
  document.getElementsByTagName("head")[0].appendChild(e);
};
include('localisation.js',function(){
  loadStartLocale();
});
    function localeCallback(returnLanguage) {
		if (returnLanguage==='en-US') {
			document.getElementById("selectLng").selectedIndex=0;
		}
		if (returnLanguage==='ru-RU') {
			document.getElementById("selectLng").selectedIndex=1;
		}
		if (returnLanguage==='de-DE') {
			document.getElementById("selectLng").selectedIndex=2;
		}
		if (returnLanguage==='eo') {
			document.getElementById("selectLng").selectedIndex=3;
		}
		if (returnLanguage==='fr-FR') {
			document.getElementById("selectLng").selectedIndex=4;
		}
		if (returnLanguage==='fi-FI') {
			document.getElementById("selectLng").selectedIndex=5;
		}
		document.getElementById("buttonPutOutFire").innerText    = localeStrings[53];
		document.getElementById("buttonDeathPenalty").innerText  = localeStrings[54];
		document.getElementById("saveGameButton").innerText      = locObj.locSaveGame.txt;
		document.getElementById("loadGameButton").innerText      = locObj.locLoadGame.txt;
		document.getElementById("tabCity").innerText             = localeStrings[46];
		//document.getElementById("tabExplore").innerText          = localeStrings[47];
		document.getElementById("tabSettings").innerText         = localeStrings[48];
		//document.getElementById("tabGarrison").innerText         = localeStrings[49];
		document.getElementById("btnOpenTabBuilding").innerText  = localeStrings[50];
		document.getElementById("tabAbout").innerText            = localeStrings[51];
		document.getElementById("tabDiscord").innerText          = localeStrings[52];
		document.getElementById("labelSettings").innerText       = localeStrings[66];
		document.getElementById("labelSettings").innerText       = localeStrings[66];
		document.getElementById("buttonExportGame").innerText    = localeStrings[67];
		document.getElementById("buttonImportGame").innerText    = localeStrings[68];
		document.getElementById("labelAutosave").innerText       = localeStrings[69];
		document.getElementById("labelGarrison").innerText       = localeStrings[91];
		document.getElementById("buttonFireGuard").innerText     = localeStrings[92];
		document.getElementById("buttonHireGuard").innerText     = localeStrings[93];
		//document.getElementById("labelBuilding").innerText       = localeStrings[106];
		document.getElementById("lblAboutGame").innerHTML        = localeStrings[131].replace("%arg1",config.treasuryGuardPriceHire).replace("%arg2",config.treasuryGuardPricePayroll);
		document.getElementById("lblTabPop").innerText           = localeStrings[161];
		document.getElementById("lblTabGold").innerText          = localeStrings[164];
		document.getElementById("btnColorMode").innerText        = localeStrings[70];
		document.getElementById("lblTabInn").innerText           = localeStrings[181];
		document.getElementById("lblUpkeepSrc").innerText        = localeStrings[279];
		document.getElementById("selectUpkeepSrc")[0].text       = localeStrings[284];
		document.getElementById("selectUpkeepSrc")[1].text       = localeStrings[285];
		document.getElementById("btnColorMode").innerText        = localeStrings[70];
		document.getElementById("btnDismissHero").innerText      = localeStrings[217];
		//document.getElementById("btnAutocampaign").innerText     = localeStrings[218];
		document.getElementById("btnAutocampaignJournal").innerText  = localeStrings[220];
		document.getElementById("btnTowngate").innerText         = localeStrings[221];
		document.getElementById("btnLeaveCity").innerText        = localeStrings[222];
		document.getElementById("btnGenerateMap").innerText      = localeStrings[223];

		document.getElementById("btnAutobattlesList").innerText  = locObj.autobattle_journal_btn.txt;

		document.getElementById("lblOption").innerText           = localeStrings[71];
		document.getElementById("lblOn").innerText               = localeStrings[72];
		document.getElementById("lblOff").innerText              = localeStrings[73];
		document.getElementById("lblSfxAll").innerText           = localeStrings[74];
		document.getElementById("lblSfxEvt").innerText           = localeStrings[75];
		document.getElementById("lblSfxEvtAR").innerText         = localeStrings[76];
		document.getElementById("lblMscAll").innerText           = localeStrings[77];
		document.getElementById("lblMscScr").innerText           = localeStrings[78];
		document.getElementById("btnToGeneralSettings").innerText= localeStrings[79];

		document.getElementById("btnToInn").innerText            = localeStrings[79];
		document.getElementById("btnToInn1").innerText           = localeStrings[79];

		document.getElementById("lblSoundMenu").innerText        = localeStrings[80];
		document.getElementById("btnSoundSettings").innerText    = localeStrings[81];
		document.getElementById("lblStnMobileUI").innerText      = localeStrings[82];
		document.getElementById("lblStnEventLogSize").innerText  = localeStrings[83];
		document.getElementById("lblStnLines").innerText         = localeStrings[84];
		/*
		document.getElementById("lblTroopsHiring").innerText     = localeStrings[94];
		document.getElementById("btnHireSergeant").innerHTML     = localeStrings[97].replace("%arg1",config.sergeantHiring);
		document.getElementById("btnHireTurkopol").innerHTML     = localeStrings[98].replace("%arg1",config.turkopolHiring);
		document.getElementById("btnHireKnight").innerHTML       = localeStrings[99].replace("%arg1",config.knightHiring);
		document.getElementById("lblTabHiringTroopsSergeantsGarrison").innerText       = localeStrings[100];
		document.getElementById("lblTabHiringTroopsTurkopolsGarrison").innerText       = localeStrings[101];
		document.getElementById("lblTabHiringTroopsKnightsGarrison").innerText         = localeStrings[102];
		document.getElementById("lblTabHiringTroopsSergeantsHeroSquad").innerText      = localeStrings[100];
		document.getElementById("lblTabHiringTroopsTurkopolsHeroSquad").innerText      = localeStrings[101];
		document.getElementById("lblTabHiringTroopsKnightsHeroSquad").innerText        = localeStrings[102];
		document.getElementById("lblTabHiringTroopsKnightsHeroSquad").innerText        = localeStrings[102];
		*/
		document.getElementById("lblGoodsForSale").innerText     = localeStrings[260];

		//document.getElementById("lblArtefactSellPrice").innerText= localeStrings[261];
		//document.getElementById("lblArtefactBuyPrice").innerText = localeStrings[261];
		//document.getElementById("btnBuyArtefact").innerText      = localeStrings[262];
		document.getElementById("lblGoodsForBuying").innerText   = localeStrings[263];
		//document.getElementById("btnSellArtefact").innerText     = localeStrings[264];
		document.getElementById("btnLeaveBlackmarket").innerText = localeStrings[222];
		document.getElementById("lblFirebrigade").innerText      = localeStrings[270];
		document.getElementById("lblFBOption").innerText         = localeStrings[271];
		document.getElementById("lblFBOn").innerText             = localeStrings[272];
		document.getElementById("lblFBOff").innerText            = localeStrings[273];
		document.getElementById("lblFBUpKeepPrice").innerText    = localeStrings[274];
		document.getElementById("btnPopAtStart").innerText       = localeStrings[157];
		document.getElementById("btnGoldAtStart").innerText      = localeStrings[157];
		document.getElementById("btnPopPrev").innerText          = localeStrings[158];
		document.getElementById("btnGoldPrev").innerText         = localeStrings[158];
		document.getElementById("btnPopNext").innerText          = localeStrings[159];
		document.getElementById("btnGoldNext").innerText         = localeStrings[159];
		document.getElementById("btnPopAtEnd").innerText         = localeStrings[160];
		document.getElementById("btnGoldAtEnd").innerText        = localeStrings[160];
		document.getElementById("downloadGame").innerText        = localeStrings[328];
		document.getElementById("lblLevelForHireLbl").innerText  = locObj.heroLvlLbl.txt;
		document.getElementById("spnServerStatusLabel").innerText= locObj.serverStatusSpn.txt;
        document.getElementById("spnServerStatusValue").innerText= locObj.serverStatusND.txt;
        document.getElementById("spnOnline").innerText           = locObj.online.txt;
        document.getElementById("spnOnlineValue").innerText      = locObj.onlineValueND.txt;
		if (typeof populateHeroesForHire === "function") { populateHeroesForHire() };
		//setup delay, in milliseconds, 1s=1000ms
		setTimeout(checkSaves(), 400);
		setTimeout(welcomeMsg(), 500);
		setTimeout(updateButtonCaptions(), 400);
		setTimeout(loadArtifacts(), 400);
		setTimeout(updateUI(), 400);
	}

//DOM Components
function checkSaves() {
  if (localStorage.getItem('game')!==null) {
    document.getElementById("loadGameButton").style.display = "block";
  } else {
    if (game.isTutorialState && !game.tips.includes("tutorial0-welcome0")){
      game.tips.push("tutorial0-welcome0");
      showModal(0, '', disableTutorial, locObj.tutorial0_w0.txt, locObj.okay.txt, locObj.skipTutorial.txt)
    }
  }
}
function updateHeroStatus() {
	updateHeroStatusInn();
	updateHeroStatusHire();
}
function updateResources() {
	document.getElementById("gold").innerHTML          = game.gold;
	document.getElementById("pop").innerHTML           = game.pop;
	document.getElementById("treasuryGuard").innerHTML = game.treasuryGuard;
}
function setReg(){
	reglogin = "reg";
	document.getElementById("emailLine").style.display = "block";
	document.getElementById("btnRegLogin").innerText   = "Register";
};
function setLogin(){
	reglogin = "login";
	document.getElementById("emailLine").style.display = "none";
	document.getElementById("btnRegLogin").innerText   = "Login";
};
function openChat() {
	var log_dom   = document.getElementById("log");
	var chat_dom  = document.getElementById("chat");
	var chat_form_dom  = document.getElementById("chatForm");
	log_dom.style.display  = "none";
	chat_dom.style.display = "block";
	chat_form_dom.style.visibility = "visible";
}
function openMod() {
	log_dom   = document.getElementById("log");
	chat_dom  = document.getElementById("chat");
	nick_dom  = document.getElementById("inp_nickname");
	msg_dom   = document.getElementById("msg_out");
	btn_send  = document.getElementById("btnSend");
	mod_area  = document.getElementById("moderation_area");
	log_dom.style.visibility  = "hidden";
	mod_area.style.visibility = "visible";
	chat_dom.style.visibility = "hidden";
	nick_dom.style.visibility = "hidden";
	msg_dom.style.visibility  = "hidden";
	btn_send.style.visibility = "hidden";
}
function openLog() {
	var log_dom   = document.getElementById("log");
	var chat_dom  = document.getElementById("chat");
	var chat_form_dom  = document.getElementById("chatForm");

	log_dom.style.display  = "block";
	chat_dom.style.display = "none";
	chat_form_dom.style.visibility = "hidden";
}
function checkFirebrigade() {
	document.getElementById("lblFBUpkeepPriceValue").innerHTML = game.fireGuardUpkeep();
	openTab(null, 'tabFirebrigade');
}
function updateButtonCaptions2(){};
function updateButtonCaptions(){
	nextLvlHome           = game.buildLevelH*1+1;
	nextLvlPriceHome      = Math.pow(config.costHome,(game.buildLevelH*1+1));
	document.getElementById("homes").innerHTML=localeStrings[107].replace("%arg1",nextLvlHome).replace("%arg2",nextLvlPriceHome);
	nextLvlTreasury       = game.buildLevelTreasury*1+1;
	nextLvlPriceTreasury  = Math.pow(config.costTreasury,(game.buildLevelTreasury*1+1));
	document.getElementById("treasury").innerHTML=localeStrings[110].replace("%arg1",nextLvlTreasury).replace("%arg2",nextLvlPriceTreasury);
	nextLvlGallows        = game.buildLevelGallows*1+1;
	nextLvlPriceGallows   = Math.pow(config.costGallows,(game.buildLevelGallows*1+1));
	document.getElementById("buttonBldGallows").innerHTML=localeStrings[111].replace("%arg1",nextLvlGallows).replace("%arg2",nextLvlPriceGallows);
	nextLvlFountain       = game.buildLevelFountain*1+1;
	nextLvlPriceFountain  = Math.pow(config.costFountain,(game.buildLevelFountain*1+1));
	document.getElementById("buttonBldFountain").innerHTML=localeStrings[112].replace("%arg1",nextLvlFountain).replace("%arg2",nextLvlPriceFountain);
	nextLvlStash          = game.buildLevelStash*1+1;
	nextLvlPriceStash     = Math.pow(config.costStash,(game.buildLevelStash*1+1));
	document.getElementById("buttonBldStash").innerHTML=localeStrings[113].replace("%arg1",nextLvlStash).replace("%arg2",nextLvlPriceStash);
	nextLvlInn            = game.buildLevelInn*1+1;
	nextLvlPriceInn       = Math.pow(config.costInn,(game.buildLevelInn*1+1));
	document.getElementById("buttonBldInn").innerHTML=localeStrings[114].replace("%arg1",nextLvlInn).replace("%arg2",nextLvlPriceInn);
	nextLvlStable         = game.buildLevelStable*1+1;
	nextLvlPriceStable    = Math.pow(config.costStable,(game.buildLevelStable*1+1));
	document.getElementById("buttonBldStable").innerHTML=localeStrings[115].replace("%arg1",nextLvlStable).replace("%arg2",nextLvlPriceStable);
	nextLvlArchery         = game.buildLevelArchery*1+1;
	nextLvlPriceArchery    = Math.pow(config.costArchery,(game.buildLevelArchery*1+1));
	document.getElementById("buttonBldArchery").innerHTML=localeStrings[116].replace("%arg1",nextLvlArchery).replace("%arg2",nextLvlPriceArchery);
	nextLvlPriceUniversity = config.bldUniversityCost;
	document.getElementById("buttonBuildUniversity").innerHTML=locObj.bldUniversityButton.txt.replace("%arg2",nextLvlPriceUniversity);
	if (game.buildLevelD === 0) {
		document.getElementById("defence").innerHTML=localeStrings[108].replace("%arg1",game.buildLevelD+1).replace("%arg2",config.costWall);
		var towerClick = "game.Build("+"\'Wall\'"+")";
		document.getElementById("defence").setAttribute("onclick", towerClick);
	}
	if (game.buildLevelD === 1) {
		document.getElementById("defence").innerHTML=localeStrings[109].replace("%arg1",game.buildLevelD+1).replace("%arg2",config.costTower);
		var towerClick = "game.Build("+"\'Tower\'"+")";
		document.getElementById("defence").setAttribute("onclick", towerClick);
	}
	if (game.buildLevelD === 2) {
		document.getElementById("defence").innerHTML=localeStrings[117].replace("%arg1",game.buildLevelD+1).replace("%arg2",config.costCastle);
		var towerClick = "game.Build("+"\'Castle\'"+")";
		document.getElementById("defence").setAttribute("onclick", towerClick);
	}
	if (game.buildLevelD === 3) {
		document.getElementById("defence").setAttribute("style", "display:none");
	}
	if (game.buildLevelH === config.maxLevelHome) {
		document.getElementById("homes").setAttribute("style", "display:none");
	}
	if (game.buildLevelInn === config.maxLevelInn) {
		document.getElementById("buttonBldInn").setAttribute("style", "display:none");
	}
	if (game.buildLevelStable === config.maxLevelStable) {
		document.getElementById("buttonBldStable").setAttribute("style", "display:none");
	}
	if (game.buildLevelArchery === config.maxLevelArchery) {
		document.getElementById("buttonBldArchery").setAttribute("style", "display:none");
	}
	if (game.buildLevelUniversity === config.maxLevelUniversity) {
		document.getElementById("buttonBuildUniversity").setAttribute("style", "display:none");
	}
	if (game.buildLevelFountain ===0 && game.buildLevelGallows ==0){
	    document.getElementById("buttonBldFountain").style.display = 'block';
	    document.getElementById("buttonBldGallows").style.display  = 'block';
	}
	if (game.buildLevelFountain > 0) {
		document.getElementById("buttonBldGallows").setAttribute("style", "display:none");
	    if (game.buildLevelFountain === config.maxLevelFountain) {
		    document.getElementById("buttonBldFountain").setAttribute("style", "display:none");
	    } else {
		    document.getElementById("buttonBldFountain").style.display = 'block';
		}
	}
	if (game.buildLevelGallows > 0) {
		document.getElementById("buttonBldFountain").setAttribute("style", "display:none");
		if (game.buildLevelGallows === config.maxLevelGallows) {
		    document.getElementById("buttonBldGallows").setAttribute("style", "display:none");
	    } else {
		    document.getElementById("buttonBldGallows").style.display = 'block';
		}
		document.getElementById("buttonDeathPenalty").style.display = 'block';
	}
	document.getElementById("btnHireHero").innerHTML         = localeStrings[182].replace("%arg1",game.buildLevelInn).replace("%arg2",config.costHero);
}
function dynamicCellsSetStyle() {
	if (game.nightMode === true){
		var dynElementsDay = document.getElementsByClassName('dynamicCellsDay');
		while(dynElementsDay.length) {
			dynElementsDay[0].className = 'dynamicCellsNight';
		}
		var dynElements = document.getElementsByClassName('dynamicCells');
		while(dynElements.length) {
			dynElements[0].className = 'dynamicCellsNight';
		}
	} else {
		var dynElementsNight = document.getElementsByClassName('dynamicCellsNight');
		while(dynElementsNight.length) {
			dynElementsNight[0].className = 'dynamicCellsDay';
		}
		var dynElements = document.getElementsByClassName('dynamicCells');
		while(dynElements.length) {
			dynElements[0].className = 'dynamicCellsDay';
		}
	}
}
function setupFirebrigadeUI () {
	if (game.fireGuard === 1) {
		document.getElementById("fb_on").checked = true;
	} else {
		document.getElementById("fb_off").checked = true;
	}
}
