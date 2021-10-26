function updateGarrisonStatus() {
	
}
function updateHeroStatus() {
	updateHeroStatusInn();
	updateHeroStatusHire();
}
function updateResources() {
	document.getElementById("gold").innerHTML          = game.gold;
	document.getElementById("pop").innerHTML           = game.pop;
	document.getElementById("gems").innerHTML          = game.gems;
	document.getElementById("treasuryGuard").innerHTML = game.treasuryGuard;
}
