function updateHeroStatusInn() {
	if ( game.heroExists() === true) {
		var lblHeroClass    = localeStrings[204][game.myhero.class];
		var lblAlignment    = game.heroAlignment("text");
		var HTMLofHeroStats = localeStrings[205]+": "+lblHeroClass+" | ";
		var heroStatusNeedsUpdate = true;
		document.getElementById("btnDismissHero").style.visibility = "visible";
		document.getElementById("btnAutocampaign").style.visibility = "visible";
		document.getElementById("btnLeaveCity").style.visibility = "visible";
		document.getElementById("hireHeroBlock").style.display = "none";
		document.getElementById("heroUpkeep").style.display = "inline";
		if (game.myhero.upkeepsrc === 0) {
			if (document.getElementById("selectUpkeepSrc").selectedIndex !==0) {
				document.getElementById("selectUpkeepSrc").selectedIndex = 0;
			}
		} else {
			if (document.getElementById("selectUpkeepSrc").selectedIndex !==1) {
				document.getElementById("selectUpkeepSrc").selectedIndex = 1;
			}
		}
		if (game.myhero.class==="knight"){
			game.myhero.class = 0;
		}
		if (game.myhero.class==="monk"){
			game.myhero.class = 1;
		}
		if (game.myhero.cmana === undefined){
			game.myhero.cmana = game.myhero.mana;
		}
		if (game.myhero.sergeants === undefined){
			game.myhero.sergeants = 0;
		}
		if (game.myhero.turkopols === undefined){
			game.myhero.turkopols = 0;
		}
		if (game.myhero.knights === undefined){
			game.myhero.knights = 0;
		}
		if (game.myhero.status===0){
			var rnd = Math.floor(Math.random() * localeStrings[210].length);
			console.log("in town, activity is "+rnd);
			var heroActivity = localeStrings[206]+localeStrings[210][rnd]+localeStrings[207];
			heroStatusNeedsUpdate = false;
			document.getElementById("btnAutocampaign").innerText=localeStrings[218];
			document.getElementById("btnAutocampaign").style.visibility="visible";
			document.getElementById("btnAutocampaign").disabled = false;
			document.getElementById("btnAutocampaign").style.visibility="visible";
			document.getElementById("btnAutocampaignJournal").style.visibility="visible";
			document.getElementById("btnLeaveCity").style.visibility="visible";
			document.getElementById("btnTowngate").style.visibility="hidden";
			document.getElementById("grid-hero").style.display="block";
		}
		if (game.myhero.status===1){
			var rnd = Math.floor(Math.random() * localeStrings[211].length);
			while (rnd===0) {
				var rnd = Math.floor(Math.random() * localeStrings[211].length);
			}
			console.log("in autocampaign, activity is "+rnd);
			var heroActivity = localeStrings[206]+localeStrings[211][rnd]+localeStrings[208];
			heroStatusNeedsUpdate = false;
			document.getElementById("btnAutocampaign").innerText=localeStrings[219];
			document.getElementById("btnAutocampaign").style.visibility="visible";
			document.getElementById("btnAutocampaignJournal").style.visibility="visible";
			document.getElementById("trHeroHiringTroops").style.visibility="collapse";
			document.getElementById("btnLeaveCity").style.visibility="hidden";
			document.getElementById("btnTowngate").style.visibility="visible"
		}
		if (game.myhero.status===2){
			var rnd = Math.floor(Math.random() * localeStrings[212].length);
			console.log("in manual ampaign, activity is "+rnd);
			var heroActivity = localeStrings[206]+localeStrings[212][rnd]+localeStrings[209];
			heroStatusNeedsUpdate = false;
			document.getElementById("btnAutocampaign").style.visibility="hidden";
			document.getElementById("btnAutocampaignJournal").style.visibility="hidden";
			document.getElementById("trHeroHiringTroops").style.visibility="collapse";
			document.getElementById("btnLeaveCity").style.visibility="visible";
			document.getElementById("btnTowngate").style.visibility="hidden";
		}
		if (heroStatusNeedsUpdate === true) {
			game.myhero.status = 0;
		}
		HTMLofHeroStats    += localeStrings[189]+": "+game.myhero.level+"<br>";
		HTMLofHeroStats    += localeStrings[197]+": "+lblAlignment+"<br>";
		HTMLofHeroStats    += localeStrings[195]+": "+game.myhero.exp+" | ";
		HTMLofHeroStats    += localeStrings[196]+": "+game.heroNextLvlExpLimit()+"<br>";
		HTMLofHeroStats    += localeStrings[190]+": "+game.myhero.atk+" | ";
		HTMLofHeroStats    += localeStrings[191]+": "+game.myhero.def+"<br>";
		HTMLofHeroStats    += localeStrings[187]+": "+game.myhero.int+"<br>";
		HTMLofHeroStats    += localeStrings[192]+": "+game.myhero.cmana+"/"+game.myhero.mana+" | ";
		HTMLofHeroStats    += localeStrings[193]+": "+game.myhero.mpow+"<br>";
		HTMLofHeroStats    += heroActivity+"<br>";
		if (game.myhero.status===1) {
			HTMLofHeroStats    += localeStrings[213]+": "+game.myhero.aCampaignLong+"<br>";
			if (game.myhero.aCampaignForward === 1) {
				HTMLofHeroStats += localeStrings[254] + localeStrings[214] + "<br>";
			} else {
				HTMLofHeroStats += localeStrings[254] + localeStrings[215] + "<br>";
			}
			HTMLofHeroStats    += localeStrings[216]+": "+game.myhero.gold+"<br>";
		}
		var heroStatsElem = document.getElementById("heroStats"); 
		heroStatsElem.innerHTML = HTMLofHeroStats;
		var equipmentTitleElem = document.createElement("div");
		var equipmentListElem = document.createElement("div");
		equipmentListElem.setAttribute("id", "heroEquipment");
		equipmentTitleElem.innerText = "Equiped:";
		heroStatsElem.appendChild(equipmentTitleElem);
		heroStatsElem.appendChild(equipmentListElem);
		for (var i = 0; i < game.myhero.inventoryWorn.length; i++) {
			var wrapper = document.getElementById('heroEquipment');
			var imgWrapperElement = document.createElement("div");
			var imgElement = document.createElement("img");
			var imgSrc = "resources/" + game.myhero.inventoryWorn[i].img;
			imgElement.setAttribute("src", imgSrc);
			imgWrapperElement.classList.add("inventory-item__wrapper-img");
			imgWrapperElement.appendChild(imgElement)
			wrapper.appendChild(imgWrapperElement);
		}
	} else {
		document.getElementById("heroStats").innerHTML = "";
		document.getElementById("hireHeroBlock").style.display = "inline";
		document.getElementById("heroUpkeep").style.display = "none";
		document.getElementById("btnDismissHero").style.visibility = "hidden";
		document.getElementById("btnAutocampaign").style.visibility = "hidden";
		document.getElementById("btnLeaveCity").style.visibility = "hidden";
		document.getElementById("btnTowngate").style.visibility = "hidden";
		document.getElementById("grid-hero").style.display="none";
	}
}
function prevHero(){
	if (curHeroForHire===0) {
		curHeroForHire = heroesForHire.length - 1;
		updateHeroAvForHire(curHeroForHire);
	} else {
		curHeroForHire = curHeroForHire - 1;
		updateHeroAvForHire(curHeroForHire);
	}
}
function nextHero(){
	if (curHeroForHire===heroesForHire.length - 1) {
		curHeroForHire = 0
		updateHeroAvForHire(curHeroForHire);
	} else {
		curHeroForHire = curHeroForHire + 1;
		updateHeroAvForHire(curHeroForHire);
	}
}
function heroForHire(heroClass, level, heroStats, heroCurve, heroLearnCurve, image) {
	this.heroClassLbl    = heroClass;
	this.heroStatsArr    = heroStats;
	this.level           = level;
	this.atk             = heroStats[0];
	this.def             = heroStats[1];
	this.mpow            = heroStats[2];
	this.int             = heroStats[3];
	this.heroCurveArr    = heroCurve;
	this.curveAtk        = heroCurve[0];
	this.curveDef        = heroCurve[1];
	this.curveMpow       = heroCurve[2];
	this.curveInt        = heroCurve[3];
	this.heroLearnCurve  = heroLearnCurve;
	this.image           = image;
}
function populateHeroesForHire(){
	heroesForHire = [];
	knight = new heroForHire(locObj.heroClassKnight.txt, 1, [2,2,0,0], [60,40,0,0],
							locObj.knightLearnCurve.txt, 'hero-knight.png');
	monk   = new heroForHire(locObj.heroClassMonk.txt, 1, [0,0,2,2], [45,55,0,0],
							locObj.monkLearnCurve.txt, 'hero-monk.png');
	heroesForHire.push(knight);
	heroesForHire.push(monk);
	for (hero of heroesForHire){
		var heroAttributesRandomizer = new WeightedRandom();
		heroAttributesRandomizer.addEntry('atk', hero.curveAtk);
		heroAttributesRandomizer.addEntry('def', hero.curveDef);
		heroAttributesRandomizer.addEntry('int', hero.curveInt);
		heroAttributesRandomizer.addEntry('mpow', hero.curveMpow);
		//console.log(heroAttributesRandomizer.entries);
		for (i=0; i<game.buildLevelInn-1;i++){
			var rndAttrName    = heroAttributesRandomizer.getRandom();
			hero[rndAttrName]++;
			hero["level"]++;
		}
	}
	updateHeroAvForHire(0);
}
function updateHeroAvForHire(heroClassId){
	console.log("heroClassId is "+heroClassId);
	document.getElementById("lblClassForHire").innerText    = heroesForHire[heroClassId].heroClassLbl;
	document.getElementById("lblSpeciality").innerText      = heroesForHire[heroClassId].heroLearnCurve;
	document.getElementById("imgHeroForHire").src           = 'resources/'+heroesForHire[heroClassId].image;
	document.getElementById("lblLevelForHire").innerText    = heroesForHire[heroClassId].level;
	theStats    = locObj.heroStatsAtkLbl.txt  +": " + heroesForHire[heroClassId]["atk"]+"; ";
	theStats   += locObj.heroStatsDefLbl.txt  +": " + heroesForHire[heroClassId]["def"]+" ";
	theStats   += "<br>"
	theStats   += locObj.heroStatsMpowLbl.txt +": " + heroesForHire[heroClassId]["mpow"]+"; ";
	theStats   += locObj.heroStatsIntLbl.txt  +": " + heroesForHire[heroClassId]["int"]+" ";
	document.getElementById("lblPrimaryStats").innerHTML    = theStats;
}
