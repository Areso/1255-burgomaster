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
