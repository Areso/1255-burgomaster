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
