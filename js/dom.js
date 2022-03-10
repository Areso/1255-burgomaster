function updateHeroStatus() {
	updateHeroStatusInn();
	updateHeroStatusHire();
}
function updateResources() {
	document.getElementById("gold").innerHTML          = game.gold;
	document.getElementById("pop").innerHTML           = game.pop;
//	document.getElementById("gems").innerHTML          = game.gems;
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
	log_dom   = document.getElementById("console_n_chat");
	chat_dom  = document.getElementById("chat");
	nick_dom  = document.getElementById("inp_nickname");
	msg_dom   = document.getElementById("msg_out");
	btn_send  = document.getElementById("btnSend");
	log_dom.style.visibility  = "hidden";
	chat_dom.style.visibility = "visible";
	nick_dom.style.visibility = "visible";
	msg_dom.style.visibility  = "visible";
	btn_send.style.visibility = "visible";
}
function openMod() {
	log_dom   = document.getElementById("console_n_chat");
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
	log_dom   = document.getElementById("console_n_chat");
	chat_dom  = document.getElementById("chat");
	nick_dom  = document.getElementById("inp_nickname");
	msg_dom   = document.getElementById("msg_out");
	btn_send  = document.getElementById("btnSend");
	log_dom.style.visibility  = "visible";
	chat_dom.style.visibility = "hidden";
	nick_dom.style.visibility = "hidden";
	msg_dom.style.visibility  = "hidden";
	btn_send.style.visibility = "hidden";
}
function checkFirebrigade() {
	document.getElementById("lblFBUpkeepPriceValue").innerHTML = game.fireGuardUpkeep();
	openTab(null, 'tabFirebrigade');
}
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
	if (game.buildLevelGallows === config.maxLevelGallows) {
		document.getElementById("buttonBldGallows").setAttribute("style", "display:none");
	}
	if (game.buildLevelFountain === config.maxLevelFountain) {
		document.getElementById("buttonBldFountain").setAttribute("style", "display:none");
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
	if (game.buildLevelFountain > 0) {
		document.getElementById("buttonBldGallows").setAttribute("style", "display:none");
	}
	if (game.buildLevelGallows === 0) {
		document.getElementById("buttonDeathPenalty").style.display="none";
	}
	if (game.buildLevelGallows > 0) {
		document.getElementById("buttonBldFountain").setAttribute("style", "display:none");
		document.getElementById("buttonDeathPenalty").setAttribute("style", "top:430px; left: 20px");
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
