//let curHeroForHire = 0;
//for every hero class, see populate heroes
let startHeroPortraitId = [];
let endHeroPortraitId = [];
let curHeroPortraitId = [];

function updateHeroStatusInn() {
	if ( game.heroExists()) {
		var lblHeroClass    = locObj.heroClasses.txt[game.myhero.class];
		var HTMLofHeroStats = locObj.lblClass.txt+": "+lblHeroClass+" | ";
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

		var heroActivity = locObj.lblHeroLocation.txt;

		if (game.myhero.status===0){
			let rnd = Math.floor(Math.random() * locObj.heroActivitiesInTown.txt.length);
			heroActivity = heroActivity.replace("%arg1", locObj.heroActivitiesInTown.txt[rnd]);
			heroActivity = heroActivity.replace("%arg2", locObj.heroInTown.txt);
			heroStatusNeedsUpdate = false;
			document.getElementById("btnAutocampaign").innerText=locObj.btnAutocampaignSendHero.txt;
			document.getElementById("btnAutocampaign").style.visibility="visible";
			document.getElementById("btnAutocampaign").disabled = false;
			document.getElementById("btnAutocampaign").style.visibility="visible";
			document.getElementById("btnAutocampaignJournal").style.visibility="visible";
			document.getElementById("btnLeaveCity").style.visibility="visible";
			document.getElementById("btnTowngate").style.visibility="hidden";
			document.getElementById("grid-hero").style.display="block";
		}
		if (game.myhero.status===1){
			let rnd = Math.floor(Math.random() * locObj.heroActivitiesInAutocampaign.txt.length);
			//if hero is not marching back
			if (game.myhero.aCampaignBackward !== 1){
			  //then rnd===0 ("marching back") is not available. Rolling dices again!
			  while (rnd === 0) {
			    rnd = Math.floor(Math.random() * locObj.heroActivitiesInAutocampaign.txt.length);
			  }
			}
			heroActivity = heroActivity.replace("%arg1", locObj.heroActivitiesInAutocampaign.txt[rnd]);
			heroActivity = heroActivity.replace("%arg2", locObj.heroInAutocampaign.txt);
			heroStatusNeedsUpdate = false;
			document.getElementById("btnAutocampaign").innerText=locObj.btnAutocampaignWithdrawHero.txt;
			document.getElementById("btnAutocampaign").style.visibility="visible";
			document.getElementById("btnAutocampaignJournal").style.visibility="visible";
			document.getElementById("btnLeaveCity").style.visibility="hidden";
			document.getElementById("btnTowngate").style.visibility="visible"
		}
		if (game.myhero.status===2){
			var rnd = Math.floor(Math.random() * locObj.heroActivitiesOnAdventureMap.txt.length);
			heroActivity = heroActivity.replace("%arg1", locObj.heroActivitiesOnAdventureMap.txt[rnd]);
			heroActivity = heroActivity.replace("%arg2", locObj.heroOnAdventureMap.txt);
			heroStatusNeedsUpdate = false;
			document.getElementById("btnAutocampaign").style.visibility="hidden";
			document.getElementById("btnAutocampaignJournal").style.visibility="hidden";
			document.getElementById("btnLeaveCity").style.visibility="visible";
			document.getElementById("btnTowngate").style.visibility="hidden";
		}
		if (heroStatusNeedsUpdate === true) {
			game.myhero.status = 0;
		}
		HTMLofHeroStats    += locObj.heroStatLevel.txt+": "+game.myhero.level+"<br>";
		HTMLofHeroStats    += locObj.heroCurrentExp.txt     +": "+game.myhero.exp+" | ";
		HTMLofHeroStats    += locObj.heroNextLvlExp.txt     +": "+game.heroNextLvlExpLimit()+"<br>";
		HTMLofHeroStats    += locObj.heroStatAtk.txt        +": "+game.myhero.atk+" | ";
		HTMLofHeroStats    += locObj.heroStatDef.txt        +": "+game.myhero.def+"<br>";
		HTMLofHeroStats    += locObj.heroStatInt.txt        +": "+game.myhero.int+"<br>";
		HTMLofHeroStats    += locObj.heroStatMP.txt         +": "+game.myhero.cmana+"/"+game.myhero.mana+" | ";
		HTMLofHeroStats    += locObj.heroStatSpellpower.txt +": "+game.myhero.mpow+"<br>";
		HTMLofHeroStats    += heroActivity+"<br>";
		if (game.myhero.status===1) {
			HTMLofHeroStats    += locObj.lblDistanceFromTown.txt+": "+game.myhero.aCampaignLong+"<br>";
			if (game.myhero.aCampaignForward === 1) {
				HTMLofHeroStats += locObj.lblDirection.txt + locObj.directionFromTown.txt + "<br>";
			} else {
				HTMLofHeroStats += locObj.lblDirection.txt + locObj.directionToTown.txt + "<br>";
			}
			HTMLofHeroStats    += locObj.goldInHerosPurse.txt+": "+game.myhero.gold+"<br>";
		}
		var heroStatsElem = document.getElementById("heroStats");
		heroStatsElem.innerHTML = HTMLofHeroStats;
		var equipmentTitleElem = document.createElement("div");
		var equipmentListElem = document.createElement("div");
		equipmentListElem.setAttribute("id", "heroEquipment");
		equipmentTitleElem.innerText = locObj.equipmentTitle.txt;
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
function heroForHire(heroClass, level, heroStats, heroCurve, heroLearnCurve, image, portrait_id) {
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
	this.portrait_id     = portrait_id;
}
function populateHeroesForHire(){
    heroesForHire = [];
	knight_portraits = [1,2,3,4,5,6,7,8,9,10];
	monk_portraits = [1,2,3,4,5,6,7,8,9,10];
	knight = new heroForHire(locObj.heroClassKnight.txt, 1, [2,2,0,0], [60,40,0,0],
							locObj.knightLearnCurve.txt, 'hero-knight.png', 1);
	monk   = new heroForHire(locObj.heroClassMonk.txt, 1, [0,0,2,2], [45,55,0,0],
							locObj.monkLearnCurve.txt, 'hero-monk.png', 1);
	heroesForHire.push(knight);
	startHeroPortraitId.push(1);
	endHeroPortraitId.push(10);
	curHeroPortraitId.push(1);
	heroesForHire.push(monk);
	startHeroPortraitId.push(1);
	endHeroPortraitId.push(10);
	curHeroPortraitId.push(1);
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
	document.getElementById("lblClassForHire").innerText    = heroesForHire[heroClassId].heroClassLbl;
	document.getElementById("lblSpeciality").innerText      = heroesForHire[heroClassId].heroLearnCurve;
	if (curHeroPortraitId[heroClassId]+1<endHeroPortraitId[heroClassId]) {
		curHeroPortraitId[heroClassId] += 1;
	} else {
		curHeroPortraitId[heroClassId] = startHeroPortraitId[heroClassId];
	}
	heroesForHire[heroClassId].portrait_id = curHeroPortraitId[heroClassId];
	heroImg = document.getElementById("imgHeroForHire")
	heroImg.src = 'resources/heroes/'+heroesForHire[heroClassId].portrait_id+".png";
	document.getElementById("lblLevelForHire").innerText    = heroesForHire[heroClassId].level;
	theStats    = locObj.heroStatsAtkLbl.txt  +": " + heroesForHire[heroClassId]["atk"]+"; ";
	theStats   += locObj.heroStatsDefLbl.txt  +": " + heroesForHire[heroClassId]["def"]+" ";
	theStats   += "<br>"
	theStats   += locObj.heroStatsMpowLbl.txt +": " + heroesForHire[heroClassId]["mpow"]+"; ";
	theStats   += locObj.heroStatsIntLbl.txt  +": " + heroesForHire[heroClassId]["int"]+" ";
	document.getElementById("lblPrimaryStats").innerHTML    = theStats;
}
