function updateImagesBuildingTab() {
	if (game.tips.includes('tutorial1_pop0') && game.isTutorialState) {
		document.getElementById("tabBuilding").classList.remove('is-tutorial');
	}

	if (game.tips.includes("tutorial1_pop0") && game.buildLevelH >= 0  ) {
		var tabBldElements = document.querySelectorAll('#bldHome .is-tutorial');
		for (var tabBldElem of tabBldElements){
			tabBldElem.classList.remove('is-tutorial');
		}
		var tabBuilding = document.getElementById("tabBuilding");
		if (tabBuilding.classList.contains('is-tutorial')) {
			tabBuilding.classList.remove('is-tutorial');
		}
	}

	if (game.tips.includes("tutorial_defense") && game.buildLevelD >= 0 ){
		var tabBldElements = document.querySelectorAll('#bldDefence .is-tutorial');
		for (tabBldElem of tabBldElements){
			tabBldElem.classList.remove('is-tutorial');
		}
	}

	if (game.tips.includes("tutorial_treasury") && game.buildLevelTreasury >= 0 ){
		var tabBldElements = document.querySelectorAll('#bldTreasury .is-tutorial');
		for (tabBldElem of tabBldElements){
			tabBldElem.classList.remove('is-tutorial');
		}
	}

	if (game.tips.includes("tutorial_social") && game.buildLevelFountain >= 0 && game.buildLevelGallows >= 0 ){
		var tabBldGallows = document.querySelectorAll('#bldGallows .is-tutorial');
		var tabBldFountain = document.querySelectorAll('#bldFountain .is-tutorial');

		var tabBldElements = Array.from(tabBldGallows).concat(Array.from(tabBldFountain));
		//sorry, concat not found
		// var tabBldElements = []
		// tabBldElements.push(tabBldGallows)
		// tabBldElements.push(tabBldFountain);
		for (tabBldElem of tabBldElements){
			tabBldElem.classList.remove('is-tutorial');
		}
		//sorry, tabBldElements not iterable this way.
		//doesn't work too

		// for (tabBldElem of tabBldGallows){
		// 	tabBldElem.classList.remove('is-tutorial');
		// }
		// for (tabBldElem of tabBldFountain){
		// 	tabBldElem.classList.remove('is-tutorial');
		// }
		updateButtonCaptions();
	}

	if (game.tips.includes("tutorial_stash") && game.buildLevelStash >= 0){
		var tabBldElements = document.querySelectorAll('#bldStash .is-tutorial');
		for (tabBldElem of tabBldElements){
			tabBldElem.classList.remove('is-tutorial');
		}
	}

	if (game.tips.includes("tutorial_stable") && game.buildLevelStable >= 0){
		var tabBldElements = document.querySelectorAll('#bldStable .is-tutorial');
		for (tabBldElem of tabBldElements){
			tabBldElem.classList.remove('is-tutorial');
		}
	}

	if (game.tips.includes("tutorial_archery") && game.buildLevelArchery >= 0){
		var tabBldElements = document.querySelectorAll('#bldArchery .is-tutorial');
		for (tabBldElem of tabBldElements){
			tabBldElem.classList.remove('is-tutorial');
		}
	}

	if (game.tips.includes("tutorial_inn") && game.buildLevelInn >= 0){
		var tabBldElements = document.querySelectorAll('#bldInn .is-tutorial');
		for (tabBldElem of tabBldElements){
			tabBldElem.classList.remove('is-tutorial');
		}
	}

	if (game.buildLevelD === 1) {
		var defenceImgElement = document.getElementById('defences_img');
		defenceImgElement.setAttribute('src', './resources/btab_w_castle.png');
		defenceImgElement.setAttribute('alt', 'btab_w_castle.png');
	}
	if (game.buildLevelD >= 2) {
		var defenceImgElement = document.getElementById('defences_img');
		defenceImgElement.setAttribute('src', './resources/btab_st_castle.png');
		defenceImgElement.setAttribute('alt', 'btab_st_castle.png');
}
	// if (game.buildLevelD === 3) {
	// 	var defenceImgElement = document.getElementById('defences_img');
	// 	defenceImgElement.setAttribute('src', './resources/btab_st_castle.png');
	// }
}
