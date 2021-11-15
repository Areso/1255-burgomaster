function gameTips() {
	if (game.ticks === 3){
		if (isTutorialState && !game.tips.includes("tutorial_defense") && !dialogShown){
			game.tips.push("tutorial_defense");
			showModal(0, '', getAck, locObj.tutorial_defense.txt, locObj.okay.txt, '')
		}
	}
	if (isTutorialState && !game.tips.includes("tutorial_treasury") && game.gold>=200 && !dialogShown){
		game.tips.push("tutorial_treasury");
		showModal(0, '', getAck, locObj.tutorial_treasury.txt, locObj.okay.txt, '')
	}
	if (isTutorialState && !game.tips.includes("tutorial_autosave") && game.ticks>=10 && !dialogShown){
		game.tips.push("tutorial_autosave");
		showModal(0, '', getAck, locObj.tutorial_autosave.txt, locObj.okay.txt, '')
	}
	if (isTutorialState && !game.tips.includes("tutorial_stable") && game.pop>=50 && !dialogShown){
		game.tips.push("tutorial_stable");
		showModal(0, '', getAck, locObj.tutorial_stable.txt, locObj.okay.txt, '')
	}
	if (isTutorialState && !game.tips.includes("tutorial_archery") && game.pop>=70 && !dialogShown){
		game.tips.push("tutorial_archery");
		showModal(0, '', getAck, locObj.tutorial_archery.txt, locObj.okay.txt, '')
	}
	if (isTutorialState && !game.tips.includes("tutorial_inn") && game.pop>=100 && !dialogShown){
		game.tips.push("tutorial_inn");
		showModal(0, '', getAck, locObj.tutorial_inn.txt, locObj.okay.txt, '')
	}
	if (isTutorialState && !game.tips.includes("tutorial_social") && game.pop>=120 && !dialogShown){
		game.tips.push("tutorial_social");
		showModal(0, '', getAck, locObj.tutorial_social.txt, locObj.okay.txt, '')
	}
}
function gameStory() {
	
}
function gameChangePath() {
	if (game.ticks % 80 === 0 && !dialogShown && (game.buildLevelFountain>0||game.buildLevelGallows>0) ){
		if (game.buildLevelFountain>0) {
			question  = locObj.deadCounselorDemolish.txt.replace("%arg1", localeStrings[142]);
			question  = question.replace("%arg2", localeStrings[141]);
		} 
		if (game.buildLevelGallows>0) {
			question  = locObj.deadCounselorDemolish.txt.replace("%arg1", localeStrings[141]);
			question  = question.replace("%arg2", localeStrings[142]);
		}
		yesAnswer = locObj.deadCounselorDemolishAnsYes.txt
		showModal(1, '', gameChangePathCallback, question, yesAnswer, localeStrings[33])
	}
}
function gameChangePathCallback() {
	if (answer === 2) {
		if (game.buildLevelFountain>0) {
			removeIndex = buildingsInTownB.indexOf('fountain');
		}
		if (game.buildLevelGallows>0) {
			removeIndex = buildingsInTownB.indexOf('gallows');
		}
		removeFromArrays(removeIndex);
		game.buildLevelFountain = 0;
		game.buildLevelGallows  = 0;
		composite();
		updateUI();
	}
}
