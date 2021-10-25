function selectObj (myobject) {
	const matches = document.querySelectorAll("img.unit-img");
	for (mi=0;mi<matches.length;mi++){
		matches[mi].style.background="black";
	}
	infoblock = document.getElementById("grid-info"); 
	if (myobject.id==="imgHiringScreenSergeantToHire") {
		document.getElementById("imgHiringScreenSergeantToHire").style.background="yellow";
		infoblock.innerHTML  = localeStrings[308].replace("%arg1", config.sergeantHiring).replace("%arg2", config.sergeantUpkeep);
		infoblock.innerHTML += '<div class="unit-info">\
								<p>Atk.: <span id="sergeantsAttack">5</span></p>\
								<p>Def.: <span id="sergeantsDefence">8</span></p>\
								<p>Dmg: 3-4</p>\
								<p>HP: <span id="sergeantsHealth">15</span></p></div>';
		infoblock.innerHTML += '<input type="range" id="hireNumberRange" value="1" min="1" max="100"\
								oninput="hireNumberValue.value = this.value">';
		infoblock.innerHTML += '<input type="text"  id="hireNumberValue" value="1"><br>';
		infoblock.innerHTML += '<button onclick="game.hireUnits()">Hire</button>';
	}
	if (myobject.id==="imgHiringScreenTurkopolToHire") {
		document.getElementById("imgHiringScreenTurkopolToHire").style.background="yellow";
		infoblock.innerHTML  = localeStrings[309].replace("%arg1", config.sergeantHiring).replace("%arg2", config.sergeantUpkeep);
		infoblock.innerHTML += '<div class="unit-info">\
								<p>Atk.: <span id="turkopolsAttack">5</span></p>\
								<p>Def.: <span id="turkopolsDefence">5</span></p>\
								<p>Dmg: 2-3</p>\
								<p>HP: <span id="turkopolsHealth">12</span></p></div>';
		if (game.buildLevelArchery>0){
			infoblock.innerHTML += '<input type="range" id="hireNumberRange" value="1" min="1" max="100"\
									oninput="hireNumberValue.value = this.value">';
			infoblock.innerHTML += '<input type="text"  id="hireNumberValue" value="1"><br>';
			infoblock.innerHTML += '<button onclick="game.hireUnits()">Hire</button>';
		} else {
			msg = "<b>%arg1</b>";
			infoblock.innerHTML += msg.replace("%arg1", localeStrings[317]);
		}
	}
	if (myobject.id==="imgHiringScreenKnightToHire") {
		document.getElementById("imgHiringScreenKnightToHire").style.background="yellow";
		infoblock.innerHTML  = localeStrings[310].replace("%arg1", config.sergeantHiring).replace("%arg2", config.sergeantUpkeep);
		infoblock.innerHTML += '<div class="unit-info">\
								<p>Atk.: <span id="knightsAttack">10</span></p>\
								<p>Def.: <span id="knightsDefence">9</span></p>\
								<p>Dmg: 5-10</p>\
								<p>HP: <span id="knightsHealth">20</span></p></div>';
		if (game.buildLevelStables>1){
			infoblock.innerHTML += '<input type="range" id="hireNumberRange" value="1" min="1" max="100"\
									oninput="hireNumberValue.value = this.value">';
			infoblock.innerHTML += '<input type="text"  id="hireNumberValue" value="1"><br>';
			infoblock.innerHTML += '<button onclick="game.hireUnits()">Hire</button>';
		} else {
			msg = "<b>%arg1</b>";
			msg = msg.replace("%arg1",localeStrings[318].replace("%arg1", 2));
			infoblock.innerHTML += msg;
		}
	}
}
function hoverOutObj(myobject) {
	if (myobject.id==="imgHiringScreenSergeantToHire") {
		document.getElementById("imgHiringScreenSergeantToHire").style.transform="scale(1.0)";
	}
	if (myobject.id==="imgHiringScreenTurkopolToHire") {
		document.getElementById("imgHiringScreenTurkopolToHire").style.transform="scale(1.0)";
	}
	if (myobject.id==="imgHiringScreenKnightToHire") {
		document.getElementById("imgHiringScreenKnightToHire").style.transform="scale(1.0)";
	}
}
function hoverInObj(myobject) {
	if (myobject.id==="imgHiringScreenSergeantToHire") {
		//document.getElementById("grid-info").innerHTML=localeStrings[308].replace("%arg1", config.sergeantHiring).replace("%arg2", config.sergeantUpkeep);
		document.getElementById("imgHiringScreenSergeantToHire").style.transform="scale(1.1)";
	}
	if (myobject.id==="imgHiringScreenTurkopolToHire") {
		//document.getElementById("grid-info").innerHTML=localeStrings[309].replace("%arg1", config.turkopolHiring).replace("%arg2", config.turkopolUpkeep);
		document.getElementById("imgHiringScreenTurkopolToHire").style.transform="scale(1.1)";
	}
	if (myobject.id==="imgHiringScreenKnightToHire") {
		//document.getElementById("grid-info").innerHTML=localeStrings[310].replace("%arg1", config.knightHiring).replace("%arg2", config.knightUpkeep);
		document.getElementById("imgHiringScreenKnightToHire").style.transform="scale(1.1)";
	}
}
function updateGarrisonStatus() {
	
}
function updateHeroStatus() {
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
			if (game.myhero.class===0) {
				document.getElementById("imgHeroInHiringScreenKnight2").style.display="block";
				document.getElementById("imgHeroInHiringScreenMonk2").style.display="none";
			} else {
				document.getElementById("imgHeroInHiringScreenKnight2").style.display="none";
				document.getElementById("imgHeroInHiringScreenMonk2").style.display="block";
			}
			if (game.myhero.sergeants>0) {
				document.getElementById("grid-hero1").style.display="block";
				document.getElementById("grid-hero1v").style.display="block";
			} else {
				document.getElementById("grid-hero1").style.display="none";
				document.getElementById("grid-hero1v").style.display="none";
			}
			if (game.myhero.turkopols>0) {
				document.getElementById("grid-hero2").style.display="block";
				document.getElementById("grid-hero2v").style.display="block";
			} else {
				document.getElementById("grid-hero2").style.display="none";
				document.getElementById("grid-hero2v").style.display="none";
			}
			if (game.myhero.knights>0) {
				document.getElementById("grid-hero3").style.display="block";
				document.getElementById("grid-hero3v").style.display="block";
			} else {
				document.getElementById("grid-hero3").style.display="none";
				document.getElementById("grid-hero3v").style.display="none";
			}
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

			document.getElementById("imgHeroInHiringScreenKnight2").style.display="none";
			document.getElementById("imgHeroInHiringScreenMonk2").style.display="none";
			document.getElementById("grid-hero1").style.display="none";
			document.getElementById("grid-hero1v").style.display="none";
			document.getElementById("grid-hero2").style.display="none";
			document.getElementById("grid-hero2v").style.display="none";
			document.getElementById("grid-hero3").style.display="none";
			document.getElementById("grid-hero3v").style.display="none";
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

			document.getElementById("imgHeroInHiringScreenKnight2").style.display="none";
			document.getElementById("imgHeroInHiringScreenMonk2").style.display="none";
			document.getElementById("grid-hero1").style.display="none";
			document.getElementById("grid-hero1v").style.display="none";
			document.getElementById("grid-hero2").style.display="none";
			document.getElementById("grid-hero2v").style.display="none";
			document.getElementById("grid-hero3").style.display="none";
			document.getElementById("grid-hero3v").style.display="none";
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
		document.getElementById("imgHeroInHiringScreenKnight2").style.display="none";
		document.getElementById("imgHeroInHiringScreenMonk2").style.display="none";
	}
}
function updateUnitsStats() {
	document.getElementById("sergeantsAttack").innerText = sergeantsData.attack;
	document.getElementById("sergeantsDefence").innerText = sergeantsData.defence;
	document.getElementById("sergeantsHealth").innerText = sergeantsData.health;
	document.getElementById("turkopolsAttack").innerText = turkopolsData.attack;
	document.getElementById("turkopolsDefence").innerText = turkopolsData.defence;
	document.getElementById("turkopolsHealth").innerText = turkopolsData.health;
	document.getElementById("knightsAttack").innerText = knightsData.attack;
	document.getElementById("knightsDefence").innerText = knightsData.defence;
	document.getElementById("knightsHealth").innerText = knightsData.health;
}
function updateTroopsNumbers() {
	document.getElementById("lblGarnisonSergeants").innerHTML  = game.sergeants;
	document.getElementById("lblGarnisonTurkopols").innerHTML  = game.turkopols;
	document.getElementById("lblGarnisonKnights").innerHTML    = game.knights;
	if (game.heroExists() === true) {
		document.getElementById("lblHeroSergeants").innerHTML = game.myhero.sergeants;
		document.getElementById("lblHeroTurkopols").innerHTML = game.myhero.turkopols;
		document.getElementById("lblHeroKnights").innerHTML = game.myhero.knights;
	}
}
function updateResources() {
	document.getElementById("gold").innerHTML          = game.gold;
	// document.getElementById("gold_bm").innerHTML       = game.gold;
	// document.getElementById("gold_bt").innerHTML       = game.gold;
	document.getElementById("pop").innerHTML           = game.pop;
	document.getElementById("gems").innerHTML          = game.gems;
	document.getElementById("treasuryGuard").innerHTML = game.treasuryGuard;
}
