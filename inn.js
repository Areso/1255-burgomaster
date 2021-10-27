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

