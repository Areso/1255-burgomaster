function setupAudio(typeAudio, target, dvalue) {
  if (typeAudio==='sfx') {
    if (target==='all') {
      if (dvalue===1) {
        game.sfx_all       = 1;
        game.sfx_events    = 1;
        game.sfx_actions   = 1;
      }
      if (dvalue===0) {
        game.sfx_all       = 0;
      }
   	}
    if (target==='events') {
      if (dvalue===1) {
        game.sfx_events    = 1;
        game.sfx_actions   = 1;
      }
      if (dvalue===0) {
        game.sfx_all       = 0;
        game.sfx_events    = 0;
      }
    }
    if (target==='actions') {
      if (dvalue===1) {
        game.sfx_actions   = 1;
      }
      if (dvalue===0) {
        game.sfx_all       = 0;
        game.sfx_events    = 0;
        game.sfx_actions   = 0;
      }
    }
  }
  if (typeAudio==='music') {
    if (target==='all') {
      if (dvalue===1) {
        game.music_all     = 1;
        game.music_scripts = 1;
      }
      if (dvalue===0) {
        game.music_all     = 0;
      }
    }
    if (target==='scripts') {
      if (dvalue===1) {
        game.music_scripts = 1;
      }
      if (dvalue===0) {
        game.music_all     = 0;
        game.music_scripts = 0;
      }
    }
  }
  setupAudioUI();
}
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
