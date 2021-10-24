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
