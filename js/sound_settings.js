function setupAudioUI() {
	if (game.sfx_all===1){
		document.getElementById("sfx_on").checked  = true;
		document.getElementById("sfx_off").checked = false;
	} else {
		document.getElementById("sfx_on").checked  = false;
		document.getElementById("sfx_off").checked = true;
	}
	if (game.sfx_events===1){
		document.getElementById("sfx_events_on").checked  = true;
		document.getElementById("sfx_events_off").checked = false;
	} else {
		document.getElementById("sfx_events_on").checked  = false;
		document.getElementById("sfx_events_off").checked = true;
	}
	if (game.sfx_actions===1){
		document.getElementById("sfx_actions_on").checked  = true;
		document.getElementById("sfx_actions_off").checked = false;
	} else {
		document.getElementById("sfx_actions_on").checked  = false;
		document.getElementById("sfx_actions_off").checked = true;
	}
	if (game.music_all===1){
		document.getElementById("music_on").checked  = true;
		document.getElementById("music_off").checked = false;
	} else {
		document.getElementById("music_on").checked  = false;
		document.getElementById("music_off").checked = true;
	}
	if (game.music_scripts===1){
		document.getElementById("music_scripts_on").checked  = true;
		document.getElementById("music_scripts_off").checked = false;
	} else {
		document.getElementById("music_scripts_on").checked  = false;
		document.getElementById("music_scripts_off").checked = true;
	}
}
