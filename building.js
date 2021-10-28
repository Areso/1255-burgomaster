function updateImagesBuildingTab() {
	//HIDING
	console.log("update images building tab");
	if (isTutorialState && !game.tips.includes("tutorial1_pop0") && game.buildLevelH===0 ){
		var tabBldElements = document.getElementsByClassName("bld_tab_house_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "visibility: hidden;"
		}
		document.getElementById("tabBuilding").style = "visibility: hidden;"
	} else {
		var tabBldElements = document.getElementsByClassName("bld_tab_house_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "";
		}
		document.getElementById("tabBuilding").style = "";
	}
	if (isTutorialState && !game.tips.includes("tutorial_defense") && game.buildLevelD===0 ){
		var tabBldElements = document.getElementsByClassName("bld_tab_defense_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "visibility: hidden;"
		}
	} else {
		if (game.buildLevelD === 3) {
			document.getElementById("defencies_img").style.visibility="visible";
		} else {
			var tabBldElements = document.getElementsByClassName("bld_tab_defense_class");
			for (tabBldElem of tabBldElements){
				tabBldElem.style = "";
			}
		}
	}
	if (isTutorialState && !game.tips.includes("tutorial_treasury") && game.buildLevelTreasury ===0 ){
		var tabBldElements = document.getElementsByClassName("bld_tab_treasury_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "visibility: hidden;"
		}
	} else {
		var tabBldElements = document.getElementsByClassName("bld_tab_treasury_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "";
		}
	}
	if (isTutorialState && !game.tips.includes("tutorial_social") && game.buildLevelFountain===0 && game.buildLevelGallows===0 ){
		var tabBldElements = document.getElementsByClassName("bld_tab_social_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "visibility: hidden;"
		}
	} else {
		var tabBldElements = document.getElementsByClassName("bld_tab_social_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "";
		}
		updateButtonCaptions();
	}
	if (isTutorialState && !game.tips.includes("tutorial_stash") && game.buildLevelStash===0){
		var tabBldElements = document.getElementsByClassName("bld_tab_stash_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "visibility: hidden;"
		}
	} else {
		var tabBldElements = document.getElementsByClassName("bld_tab_stash_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "";
		}
	}
	if (isTutorialState && !game.tips.includes("tutorial_stable") && game.buildLevelStable===0){
		var tabBldElements = document.getElementsByClassName("bld_tab_stable_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "visibility: hidden;"
		}
	} else {
		var tabBldElements = document.getElementsByClassName("bld_tab_stable_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "";
		}
	}
	if (isTutorialState && !game.tips.includes("tutorial_archery") && game.buildLevelArchery===0){
		var tabBldElements = document.getElementsByClassName("bld_tab_archery_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "visibility: hidden;"
		}
	} else {
		var tabBldElements = document.getElementsByClassName("bld_tab_archery_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "";
		}
	}
	if (isTutorialState && !game.tips.includes("tutorial_inn") && game.buildLevelInn===0){
		var tabBldElements = document.getElementsByClassName("bld_tab_inn_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "visibility: hidden;"
		}
	} else {
		var tabBldElements = document.getElementsByClassName("bld_tab_inn_class");
		for (tabBldElem of tabBldElements){
			tabBldElem.style = "";
		}
	}
	if (game.buildLevelD === 1) {
		elementText = document.getElementById("defences_img").innerHTML;
		if (elementText.indexOf("btab_w_castle.png") === -1) {
			document.getElementById("defences_img").innerHTML= '<img id="defencies_img" src="resources/btab_w_castle.png" onmouseover="game.help(this)" onclick="game.help(this)">';
		}
	}
	if (game.buildLevelD === 2) {
		elementText = document.getElementById("defences_img").innerHTML;
		if (elementText.indexOf("btab_st_castle.png") === -1) {
			document.getElementById("defences_img").innerHTML= '<img id="defencies_img" src="resources/btab_st_castle.png" onmouseover="game.help(this)" onclick="game.help(this)">';
		}
	}
	if (game.buildLevelD === 3) {
		elementText = document.getElementById("defences_img").innerHTML;
		if (elementText.indexOf("btab_st_castle.png") === -1) {
			document.getElementById("defences_img").innerHTML= '<img id="defencies_img" src="resources/btab_st_castle.png" onmouseover="game.help(this)" onclick="game.help(this)">';
		}
	}
}
