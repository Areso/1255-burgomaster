function selectObj (myobject) {
	const matches = document.querySelectorAll("img.unit-img");
	for (mi=0;mi<matches.length;mi++){
		matches[mi].style.background="black";
	}
	if (myobject.id==="imgHiringScreenSergeantToHire") {
		document.getElementById("imgHiringScreenSergeantToHire").style.background="yellow";
	}
	if (myobject.id==="imgHiringScreenTurkopolToHire") {
		document.getElementById("imgHiringScreenTurkopolToHire").style.background="yellow";
	}
	if (myobject.id==="imgHiringScreenKnightToHire") {
		document.getElementById("imgHiringScreenKnightToHire").style.background="yellow";
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
