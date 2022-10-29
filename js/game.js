	// 1. Выносим сюда utils функции

	function getCurrentDate() {
		if (!Date.now) {
			Date.now = function now() {
				return new Date().getTime();
			};
		} else {
			return Date.now();
		}
	}

	function getUID() {
		var rnd = Math.floor((Math.random() * 100000) + 1);
		while (rnd.toString().length < 5) {
			rnd = "0"+rnd;
		}
		return getCurrentDate().toString()+rnd;
	}

	function genNick() {
		var rnd = Math.floor((Math.random() * 10000) + 1);
		while (rnd.toString().length < 4) {
			rnd = "0"+rnd;
		}
		nickName = "Guest"+rnd;
		return nickName;
	}

	function isNil(value) {
		return value === null || value === undefined;
	}


	function include (url, fn) {
		var e = document.createElement("script");
		e.onload = fn;
		e.src = url;
		e.async=true;
		document.getElementsByTagName("head")[0].appendChild(e);
	};

	var HERO_STATUS = {
		CITY: 0,
		AUTOCAMPAIGN: 1,
		ADVENTURE_MAP: 2
	};

	Object.freeze(HERO_STATUS);


	var game = {
		gold: 30,
		gems: 0,
		pop: config.startPop,
		season: 2, //1 - Winter, 2 - Spring, 3 - Summer, 4 - Autumn
		year: 1255,
		food: 20,
		treasuryGuard: 0,
		buildLevelD: 0,
		buildLevelH: 0,
		buildLevelTreasury: 0,
		buildLevelGallows: 0,
		buildLevelFountain: 0,
		buildLevelStash: 0,
		buildLevelInn: 0,
		buildLevelStable: 0,
		buildLevelArchery: 0,
		buildLevelSmith: 0,
		buildLevelUniversity: 0,
		fire: 0,
		fireSteps: 0,
		fireGuard: 0,
		hero: 0,
		happiness: 80,
		o_autosave: 0,
		newSaveVersion: 8,
		saveVersion: "saveV1010",
		castleX: 1,
		castleY: 1,
		heroX: 1,
		heroY: 1,
		mapCreated: 0,
		myMapLand: [],
		myMapObjects: [],
		myMapRemObjects: [],
		years: [],
		pops: [],
		budgets: [],
		adv_steps: 0,
		ac_steps: 0,
		userPopAck: 0,
		userGoldAck: 0,
		userASaveAck: 0,
		blackMarketGoods: [],
		isHero: 0,//do I need this?
		cityWarehouse: [], //should the list contain objects?
		myhero: {},
		myheroArmy: {armyID: 1, units: {}},
		castellan: {},
		festival_cooldown: 0,
		sergeants: 0,
		turkopols: 0,
		knights: 0,
		active_tab: '',
		prestige: 0,
		prestige_time: [],
		isMobile: 0,
		sfx_all: 0,
		sfx_events: 0,
		sfx_actions: 0,
		music_all: 0,
		music_scripts: 0,
		log_size: 8,
		alias: "",
		UID: getUID(),
		nickname: genNick(),
		tips: [],
		story: [],
		chestCity: 0,
		ticks: 0,
		autocampaignCounter: 0,
		autocampaignBattlesCounter: 0,
		enemyHero: null,
		enemyHeroArmy: {armyID: 2, units: {}},
		enemyMaxArmyCount: 3,
		expReward: 0,
		goldReward: 0,
		difficultyModifier: 0,
		attacker: 1,
		isAutoBattle: false,
		isDefeated: false,
		nightMode: false,
		monstersOnAdvMap: [],
		techLearned: [],
		techEnabled: [],
		techDisabled: [],
		techArtillery: 0,
		role: "player",
		isTutorialState: true,
		changeUpkeepSrc : function () {
			var x         = document.getElementById("selectUpkeepSrc").selectedIndex;
			var y         = document.getElementById("selectUpkeepSrc").options;
			var upkeepSrc = parseInt(y[x].value); //y[x].id, text, index
			if (upkeepSrc === 0){
				game.myhero.upkeepsrc = 0;
			} else {
				game.myhero.upkeepsrc = 1;
			}
		},
		openLeaderboard : function () {
			game.getEventLeaderboard();
			openTab(null, 'tabEventLeaderboard');
		},
		festivalPrice : function () {
			return game.pop*config.festPrice*(game.buildLevelTreasury+1)*(game.buildLevelFountain+1);
		},
		checkTreasuryCapacity : function() {
			if(game.heroExists()) {
				if (game.gold+game.myhero.gold > game.goldLimit()) {
					postEventLog(locObj.moneyExceedsTreasury.txt, "bold");
				}
			} else {
				if (game.gold > game.goldLimit()) {
					postEventLog(locObj.moneyExceedsTreasury.txt, "bold");
				}
			}
		},
		addMoneyToTreasury : function (changeValue) {
			var gold_was      = game.gold;
			var gold_limit    = game.goldLimit();
			var gold_possible = game.gold+changeValue;
			if (gold_possible > gold_limit) {
				game.gold      = gold_limit;
				if (game.userGoldAck === 0) {
					postEventLog(locObj.buildUpgradeTreasury.txt, "bold");
					game.userGoldAck = 1;
				}
			} else {
				game.gold      = gold_possible;
				game.userGoldAck = 0;
			}
			return game.gold - gold_was;
		},
		getReward : function () {
			back_response_reward = null;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
					back_response_reward = JSON.parse(this.responseText);
					textToTab  = back_response_reward["msgToPlayer"];
					game.gems += back_response_reward["gems"];
					game.gems += back_response_reward["prize_v"];
					document.getElementById("lblEventReward").innerHTML = textToTab;
					openTab(null, "tabEventReward");
					updateUI();
				}
			};
			dataToParse = game.UID;
			xhttp.open("POST", "http://armata.ga:5000/api/v1.0/get_reward", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(dataToParse);
		},
		sendSaveToTheCloud : function (lastHope_str) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
					msg = "savegame sent to the cloud successfully";
					postEventLog(msg);
				}
			};
			dataToParse = game.UID;
			xhttp.open("POST", "http://51.68.172.115:9090/lasthope", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(lastHope_str);
		},
		updateAlias : function () {
			proposedAlias = document.getElementById("inpStnAliasValue").value;
			console.log(proposedAlias);
			back_response_alias = null;
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
					back_response_alias = JSON.parse(this.responseText);
					console.log(back_response_alias);
					if (back_response_alias["content"]===200) {
						document.getElementById("lblStnAliasResult").innerText=localeStrings[88][0];
						game.alias = document.getElementById("inpStnAliasValue").value;
					}
					if (back_response_alias["content"]===201) {
						document.getElementById("lblStnAliasResult").innerText=localeStrings[88][1];
						game.alias = document.getElementById("inpStnAliasValue").value;
					}
					if (back_response_alias["content"]===204) {
						document.getElementById("lblStnAliasResult").innerText=localeStrings[88][2];
						document.getElementById("inpStnAliasValue").value = "";
					}
					setTimeout(function(){ document.getElementById("lblStnAliasResult").innerText=""; }, 5000);
				} else {
					game.alias = document.getElementById("inpStnAliasValue").value;
				}
			};
			dataToParse = game.UID+delimiter+game.alias+delimiter+proposedAlias;
			xhttp.open("POST", "http://armata.ga:5000/api/v1.0/register_alias", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(dataToParse);
		},
		getEventHelp : function () {
			if (eventHelpMsg!==null) {
				if (flag_event_started===0){
					disabledElements.push("saveGameButton");
					disabledElements.push("loadGameButton");
					document.getElementById("saveGameButton").disabled = true;
					document.getElementById("loadGameButton").disabled = true;
					showModal(0, '', getAck, eventHelpMsg,  locObj.okay.txt, '');
				} else {
					openTab(null, 'tabEvent');
				}
			}
		},
		setupEventLogSize : function () {
			game.log_size = document.getElementById("inpStnEventLogSize").value;
			document.getElementById("log").style.height = game.log_size * 20;
		},
		mobileUI : function () {
			if (document.getElementById("cbMobileUI").checked === true) {
				game.isMobile = 1;
			} else {
				game.isMobile = 0;
			}
		},
		setupFirebrigade : function (theValue) {
			game.fireGuard = theValue;
		},
		fireGuardUpkeep : function () {
			var totalBGUpkeep = 0;
			totalBGUpkeep    += 5*(game.buildLevelD+game.buildLevelH+game.buildLevelTreasury);
			totalBGUpkeep    += 5*(game.buildLevelGallows+game.buildLevelFountain+game.buildLevelStash);
			totalBGUpkeep    += 5*(game.buildLevelInn+game.buildLevelStable+game.buildLevelArchery);
			return totalBGUpkeep;
		},
		towngate : function () {
			if (game.myhero.aCampaignBackward === 1){
				var towngateScroll = game.myhero.inventory.find(function (item) {
					if (item.id === 'artid00') { return item }
				});
				if (!isNil(towngateScroll)) {
					unequipItem(towngateScroll.uid);
					removeElementUI(towngateScroll.uid);
					game.myhero.aCampaignLong = 1;
					postEventLog(localeStrings[255], 'bold');
					updateUI();
				} else {
					postEventLog(localeStrings[256], 'bold');
				}
			} else {
				postEventLog(localeStrings[257], 'bold');
			}
		},
		artefact_sell : function () {
			var x = document.getElementById("selectGoodsFromHero").selectedIndex;
			var y = document.getElementById("selectGoodsFromHero").options;
			if (y !== -1 && x!==y ){
				var the_selling_artefact      = y[x].value; //y[x].id, text, index
				var the_selling_artefactIndex = y[x].index; //y[x].id, text, index
				buyingPrice = artefacts[the_selling_artefact].priceBuy/2;
				game.myhero.gold += buyingPrice;
				game.checkTreasuryCapacity();
				game.artefact_loss(artefacts[the_selling_artefact], "hero", the_selling_artefactIndex);
				if (artefacts[the_selling_artefact].id!=="artid00"){
					game.blackMarketGoods.push(artefacts[the_selling_artefact].id);
				}
				updateBlackMarket(null,the_selling_artefactIndex);
				msg = localeStrings[230];
				postEventLog(msg);
				updateUI();
			}
		},
		artefact_buy : function () {
			var x = document.getElementById("selectGoodsForHero").selectedIndex;
			var y = document.getElementById("selectGoodsForHero").options;
			var the_buying_artefact      = y[x].value; //y[x].id, text, index
			var the_buying_artefactIndex = y[x].index; //y[x].id, text, index
			if (game.gold>=artefacts[the_buying_artefact].priceBuy){
				game.gold = game.gold - artefacts[the_buying_artefact].priceBuy;
				game.artefact_gain(artefacts[the_buying_artefact], "hero");
				if (artefacts[the_buying_artefact].id !== "artid00"){
					game.blackMarketGoods = deleteFromArray(game.blackMarketGoods, the_buying_artefactIndex);
					updateBlackMarket(the_buying_artefactIndex,null);
				} else {
					updateBlackMarket(null,null);
				}
				msg = localeStrings[231];
				postEventLog(msg);
				updateUI();
			} else {
				postEventLog(locObj.notEnoughGold.txt, "bold");
			}
		},
		artefact_gain : function (artefact, target) {
			if (target==="hero") {
				game.myhero.inventory.push(artefact.id);
				if (game.myhero.inventoryWorn===undefined){
					game.myhero.inventoryWorn=[];
				}
				game.myhero.inventoryWorn.push(0);
			}

		},
		artefact_loss : function (artefact, target, posInInventory) {
			if (target==="hero") {
				game.myhero.inventory     = deleteFromArray(game.myhero.inventory, posInInventory);
				game.myhero.inventoryWorn = deleteFromArray(game.myhero.inventoryWorn, posInInventory);
			}
		},
		artefact_equip : function (invid, target) {
			if (target==="hero") {
				for (var i=0;i<artefacts[game.myhero.inventory[invid]].attr.length;i++){
					game.myhero[artefacts[game.myhero.inventory[invid]].attr[i]]+=artefacts[game.myhero.inventory[0]].change[i];
					game.myhero.inventoryWorn[invid]=1;
					console.log(artefacts[game.myhero.inventory[invid]].attr[i]);
				}
			}
		},
		artefact_unequip : function (invid, target) {
			if (target==="hero") {
				for (var i = 0; i < artefacts[game.myhero.inventory[invid]].attr.length; i++) {
					game.myhero[artefacts[game.myhero.inventory[invid]].attr[i]] -= artefacts[game.myhero.inventory[0]].change[i];
					game.myhero.inventoryWorn[invid] = 0;
					console.log(artefacts[game.myhero.inventory[invid]].attr[i]);
				}
			}
		},
		checkAudio : function (typeAudio, target) {
			if (typeAudio==='sfx'){
				if (target==='all'){
					if (game.sfx_all===1){
						return true;
					} else {
						return false;
					}
				}
				if (target==='events'){
					if (game.sfx_events===1){
						return true;
					} else {
						return false;
					}
				}
				if (target==='actions'){
					if (game.sfx_actions===1){
						return true;
					} else {
						return false;
					}
				}
			}
			if (typeAudio==='music'){
				if (target==='all'){
					if (game.music_all===1){
						return true;
					} else {
						return false;
					}
				}
				if (target==='scripts'){
					if (game.music_scripts===1){
						return true;
					} else {
						return false;
					}
				}
			}
		},
		//WIP
		research : function (techName) {
			if (techName==="artillery"){
				if (game.techArtillery===0) {
					if (game.gold >= config.artilleryResearchCost) {
						game.gold -= config.artilleryResearchCost;
						game.techArtillery = 1;
						postEventLog(locObj.techArtilleryResearched.txt, "BOLD");
						updateUI();
					} else {
						//WE NEED MORE MONEY
					}
				} else {
					//ALREADY LEARNED
				}
			}
		},
		setupAudio : function (typeAudio, target, dvalue) {
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
		},
		genBlackMarketGoods : function () {
      // Just simple goods generation for now. Only two artefacts per adventure map.
      game.blackMarketGoods = [];
      clearTraderUI();
      var rnd = randomFromRange(11, 16);
      // if (rnd.toString().length < 2) {
      //   rnd = "0" + rnd;
      // }
      var id = "artid" + rnd;
      addItem('trader', artefacts['artid00']);
      addItem('trader', artefacts[id]);

      // var artefactIds = ['artid00']; // Always set artid00 as default market item. Not used for now.
      // artefactIds.push(id); - Not used for now

      // console.log('%c BLACK MARKET GOODS: ', 'background: #c00; color: #fff;', game.blackMarketGoods);
		},
		generateMap : function () {
			var genMapPriceFinal = Math.pow((game.buildLevelInn+2)*(game.buildLevelTreasury+2),2)*config.genMapCostBasic/2;
			if (game.heroExists()===true) {
				if (game.myhero.status !== 2) {
					var question      = localeStrings[179];
					question          = question.replace("%arg1", genMapPriceFinal);
					showModal(1, '', game.generateMapCallback, question, locObj.yes.txt, locObj.no.txt)
				} else {
					alertMsg = localeStrings[180];
					showModal(0, '', getAck, alertMsg,  locObj.okay.txt, '');
				}
			} else {
				var question      = localeStrings[179];
				question          = question.replace("%arg1", genMapPriceFinal);
				showModal(1, '', game.generateMapCallback, question, locObj.yes.txt, locObj.no.txt)
			}
		},
		generateMapCallback : function (silent) {
			//generate landscape
			var genMapPriceFinal = Math.pow((game.buildLevelInn+2)*(game.buildLevelTreasury+2),2)*config.genMapCostBasic/2;
			if (silent===true) {
				genMap(0);
			} else {
				if (answer === 2) {
					if (game.gold >= genMapPriceFinal) {
						genMap(genMapPriceFinal);
						postEventLog(localeStrings[168]);
						updateUI();
					} else {
						alertMsg = locObj.notEnoughGold.txt;
						showModal(0, '', getAck, alertMsg,  locObj.okay.txt, '');
					}
				}
			}
		},
		checkMonsters : function () {
			//WIP
			for (index = 0; index < game.monstersOnAdvMap.length; ++index) {
				if (Math.abs(game.heroY-game.monstersOnAdvMap[index].coordy)<=1) {
					if (Math.abs(game.heroX-game.monstersOnAdvMap[index].coordx)<=1) {
						if (Math.abs(game.heroY-game.monstersOnAdvMap[index].coordy)===1&&Math.abs(game.heroX-game.monstersOnAdvMap[index].coordx)===1){
							//do nothing
						} else {
							console.log("movement a monster toward the hero");
							game.myMapRemObjects[game.heroX][game.heroY]=41;//hero tile in attacked state
							//prepare for battle!
							//generate enemy squad
							if (Object.keys(game.enemyHeroArmy.units).length === 0 && game.myhero.status !== HERO_STATUS.CITY) {
								game.generateEnemyUnitsForBattle();
							}
							game.isAutoBattle = true;
							while(game.isAutoBattle) {
								game.calcAttackPhase("AdvMap");
							}
							//suppose we win the battle
							//removing the monster from removable objects (render array)
							game.myMapRemObjects[game.monstersOnAdvMap[index].coordx][game.monstersOnAdvMap[index].coordy] = 0;
							//removing the monster object from monsters array
							game.monstersOnAdvMap.splice(index, 1);
							composite_gm();
							break;
						}
					}
				}
			}
		},
		checkCollisionWithBordersOfMap : function (changeX, changeY) {
			if (game.heroX+changeX<0){
				return true;
			}
			if (game.heroY+changeY<0){
				return true;
			}
			if (game.heroX+changeX>config.sizeMapX-1){
				return true;
			}
			if (game.heroY+changeY>config.sizeMapY-1){
				return true;
			}
			return false;
		},
		checkCollisionWithNonRemovableObstacles : function (changeX, changeY) {
			if (game.myMapObjects[game.heroX+changeX][game.heroY+changeY]===0) {
				return false;
			} else {
				if (game.myMapObjects[game.heroX+changeX][game.heroY+changeY]===10){
					return false;//we can enter the castle!
				}
				if (game.myMapObjects[game.heroX+changeX][game.heroY+changeY]===4){
					return false;//we can enter the blackmarket!
				}
				if (game.myMapObjects[game.heroX+changeX][game.heroY+changeY]===41){
					return false;//we can step over the burned blackmarket!
				}
				return true;
			}
		},
		checkColissionWithRemovableObstacles : function () {
			if (game.myMapRemObjects[game.heroX][game.heroY]===1) {
				postEventLog(localeStrings[186]+config.chestMoney);
				game.myhero.gold += config.chestMoney;
				game.checkTreasuryCapacity();
				updateUI();
			}
			if (game.myMapRemObjects[game.heroX][game.heroY]===2) {
				postEventLog(localeStrings[58][0]);
				eventItemCollected();
			}
		},
		tryHeroMovement : function (changeX, changeY) {
			if (game.checkCollisionWithBordersOfMap(changeX, changeY)===false) {
				if (game.checkCollisionWithNonRemovableObstacles(changeX, changeY)===false) {
					game.myMapRemObjects[game.heroX][game.heroY] = 0;
					game.heroX = game.heroX + changeX;
					game.heroY = game.heroY + changeY;
					game.checkColissionWithRemovableObstacles();
					game.myMapRemObjects[game.heroX][game.heroY] = 40;
					if (game.heroX===game.castleX && game.heroY===game.castleY) {
						game.cityEnter();
					}
					if (game.myMapObjects[game.heroX][game.heroY]===4) {
						if (!game.tips.includes("blackmarket")){
							game.tips.push("blackmarket");
							showModal(1, '', game.blackmarketCallback, locObj.blackmarket_dstr.txt, locObj.blackmarket_dstr_brn.txt, locObj.blackmarket_dstr_kp.txt);
						} else {
							updateUI();
							openTab(null, 'tabBlackmarket');
						}
					}
					game.checkMonsters();
					composite_gm();
					game.adv_steps += 1;
					if (game.adv_steps === 2) {
						//STORY
						if (!game.story.includes("story_two_steps")){
							game.story.push("story_two_steps");
							showModal(0, '', getAck, locObj.story2_two_steps.txt, locObj.okay.txt, '');
						}
					}
				}
			} else {
				postEventLog(locObj.borderCollide.txt, "BOLD");
			}
		},
		blackmarketCallback : function () {
			if (answer === 2) {
				//BURN THE MARKET DOWN
				game.myMapObjects[game.heroX][game.heroY]=41;//blackmarket burned down
			}
			if (answer === 3) {
				updateUI();
				openTab(null, 'tabBlackmarket');
			}
		},
		cityLeave: function () {

			if (game.heroExists()) {
				if (game.myhero.status === 0) {
					if (game.isHeroHaveTroops()) {
						var question = localeStrings[225];
						showModal(1, '', game.cityLeaveCallback, question, localeStrings[226], localeStrings[227]);
						return;
					} else {
						var alertMsg = localeStrings[228];
						showModal(0, '', getAck, alertMsg, locObj.okay.txt, '');
						return;
					}
				}

				if (game.myhero.status === 2) {
					console.log("[cityLeave]: Hero is on the adventure map, just open it!");
					openTab(null, 'Explore');
					updateUI();
					composite_gm();
				}
			}
		},
		cityLeaveCallback : function () {
			if (answer === 2) {
				game.myhero.stance = 0;
			}
			if (answer === 3) {
				game.myhero.stance = 1;
			}
			game.myhero.status = HERO_STATUS.ADVENTURE_MAP;
			game.myMapRemObjects[game.heroX][game.heroY] = 0;
			game.heroX = game.castleX;
			game.heroY = game.castleY + 1;
			game.myMapRemObjects[game.heroX][game.heroY] = 40;
			game.setEnemyRandomizerEntries('AdvMap');
			openTab(null, 'Explore');
			updateUI();
			composite_gm();
			if (!game.tips.includes("adventure_map")){
				game.tips.push("adventure_map");
				showModal(0, '', getAck, locObj.advmap.txt, locObj.okay.txt, '');
			}
		},
		cityEnter : function () {
			if (game.heroExists() && game.myhero.status === HERO_STATUS.ADVENTURE_MAP) {
				game.myhero.status = HERO_STATUS.CITY;
				game.attacker = 1; // TODO: Check problem with attacker after auto combat on adventure map
				var gold_diff = game.addMoneyToTreasury(game.myhero.gold);
				if ( gold_diff !== game.myhero.gold) {
					postEventLog(localeStrings[89].replace("%arg1", gold_diff));
				}
				game.myhero.gold = 0;
				enemyRandomizer.clearEntriesList();
				game.enemyHeroArmy.units = {};
				updateResources();
				openTab(null, 'Main');
				updateUI();
			}
		},
		/*-- New: Used for adding troops to squads on autocamp. start and after recalc of enemy troops when autobattle is over (if gamer is won the battle of course) --*/
		genUnitStack: function(unit, count, squad) {
			var stackName = unit.name;
			if (squad && squad.hasOwnProperty(stackName)) {
				squad[stackName].count += count;
				squad[stackName].stackHealth = squad[stackName].health * squad[stackName].count;
			} else {
				squad[stackName] = Object.assign({}, unit);
				Object.defineProperty(squad[stackName], 'count', {value: count, writable: true, configurable: true, enumerable: true});
				Object.defineProperty(squad[stackName], 'stackHealth', {value: squad[stackName].health * squad[stackName].count, writable: true, configurable: true, enumerable: true})
			}
		},

		setEnemyRandomizerEntries: function (campaignType) {
			game.difficultyModifier = 0.35;

			if (campaignType === 'AdvMap') {
				enemyRandomizer.addEntry(redGoblinWorker, 100.0);
				return;
			}

			if (game.myhero.stance === 0) {
				game.difficultyModifier = 1.05;
				enemyRandomizer.addEntry(banditWarrior, 35.0);
				enemyRandomizer.addEntry(banditArcher, 35.0);
				enemyRandomizer.addEntry(mercenarySpearman, 15.0);
				enemyRandomizer.addEntry(mercenarySwordsman, 15.0);
			} else {
				enemyRandomizer.addEntry(banditWarrior, 50.0);
				enemyRandomizer.addEntry(banditArcher, 50.0);
			}
		},

		generateEnemyUnitsForBattle: function() {
			game.goldReward = 0;
			game.expReward = 0;
			var myheroTotalUnits = game.myhero.turkopols + game.myhero.sergeants + game.myhero.knights;
			var enemyMaxCount = randomFromRange(myheroTotalUnits, myheroTotalUnits * 2);
			for (var i = 0; i < enemyMaxCount; i++) {
				var unit = enemyRandomizer.getRandom();
				var unitTemp = JSON.parse(JSON.stringify(unit));

				// TEMP section for Red Goblin from adventure map on hero aggressive stance
				if (unitTemp.name === redGoblinWorker.name && game.myhero.stance === 0) {
					unitTemp.health = Math.round(1.25 * unit.health);
					unitTemp.maxDmg = Math.round(1.25 * unit.maxDmg);
				}

				game.expReward += Math.round(unitTemp.health * game.difficultyModifier);
				game.goldReward += Math.round(randomFromRange(4, unitTemp.health) * game.difficultyModifier);
				game.genUnitStack(unitTemp, 1, game.enemyHeroArmy.units);
			}
			if (game.myhero.inventory.length) {
				for (var i = 0; i < game.myhero.inventory.length; i++) {
					if (game.myhero.inventory[i].id === "artid13") {
						game.goldReward = Math.round(game.goldReward * game.myhero.inventory[i].attr[0].val);
						break;
					}
				}
			}
			console.log("%c NEW ENEMY ARMY: ", "color: red;", game.enemyHeroArmy)
		},
		restoreHealth: function() {
			var myheroArmyUnits = game.myheroArmy.units;
			for (var unitKey in myheroArmyUnits) {
				myheroArmyUnits[unitKey].stackHealth = myheroArmyUnits[unitKey].health * myheroArmyUnits[unitKey].count;
			}
		},
		checkWinner: function(campaignType) {
			console.log("%c CHECKING WINNER!", "color: #333; background: red");
			if (game.attacker === 1 && !game.isAutoBattle) {
				if (campaignType === "AutoCampaign") {
					if (game.myhero.stance === 1) {
						postJournalLog(localeStrings[174]);
					} else {
						postJournalLog(localeStrings[173]);
					}
				}
				console.log("The player is the winner");
				game.myhero.gold += game.goldReward;
				game.myhero.exp += game.expReward;
				game.restoreHealth();
				game.generateEnemyUnitsForBattle();
				if (campaignType !== "AutoCampaign") {
					game.heroLvlUp("AdvMap");
					updateUI();
				}
			} else {
				if (campaignType === "AutoCampaign") {
					if (game.myhero.stance === 0) {
						postJournalLog(localeStrings[172]);
						game.heroDie();
						game.myheroArmy = {armyID: 1, units: {}};
					} else {
						game.myhero.aCampaignForward   = 0;
						game.myhero.aCampaignBackward  = 1;
						game.myheroArmy = {armyID: 1, units: {}};
						game.myhero.knights   = 0;
						game.myhero.sergeants = 0;
						game.myhero.turkopols = 0;
						game.isDefeated = true;
					}
				} else {
					if (game.myhero.stance === 0) {
						game.heroDie();
						game.myheroArmy = {armyID: 1, units: {}};
						postEventLog("The hero has been defeated", "bold");
						openTab(event, 'Main');
					} else {
						//!BUG!
						game.myheroArmy = {armyID: 1, units: {}};
						game.myhero.knights   = 0;
						game.myhero.sergeants = 0;
						game.myhero.turkopols = 0;
						game.myhero.status    = 0;
						postEventLog("The hero has been defeated, but managed out to flee from the battlefield", "bold");
						openTab(event, 'Main');
						game.isDefeated = true;
					}
				}
				console.log("The PC opponent is the Winner");
			}
		},
		calcDmg: function(attackerSquad, attackerHeroAttack, defenderSquad, defenderHeroDefence) {
			var attackVal = attackerHeroAttack + attackerSquad.attack;
			var defenceVal = defenderHeroDefence + defenderSquad.defence;
			console.log(attackVal);
			console.log(defenceVal);
			var battleDiff = attackVal - defenceVal;
			var totalDMG = 0;
			if (battleDiff >= 0) {
				if (battleDiff > 20) battleDiff = 20;
				for (var i = 0; i < attackerSquad.count; i++) {
					var randDMG = randomFromRange(attackerSquad.minDmg, attackerSquad.maxDmg) * (1 + 0.1 * battleDiff);
					console.log("RAND DMG: ", randDMG);
					totalDMG += randDMG;
				}
			} else {
				if (battleDiff < -17) battleDiff = -17;
				for (var i = 0; i < attackerSquad.count; i++) {
					var randDMG = randomFromRange(attackerSquad.minDmg, attackerSquad.maxDmg) * (1 + 0.05 * battleDiff);
					console.log("RAND DMG: ", randDMG);
					totalDMG += randDMG;
				}
			}
			console.log("TOTAL DMG test: ", totalDMG);
			return totalDMG
		},
		unitNameLoc: function (name) {
			switch (name) {
				case "sergeants": return locObj.unit_sergeants.txt;
				case "turkopols": return locObj.unit_turkopols.txt;
				case "knights": return locObj.unit_knights.txt;
				case "bandit": return locObj.unit_bandit.txt;
				case "banditArcher": return locObj.unit_bandit_archer.txt;
				case "mercenarySwordsman": return locObj.unit_merc_swordman.txt;
				case "mercenarySpearman": return locObj.unit_merc_spearman.txt;
				case "redGoblinWorker": return locObj.unit_goblin.txt;
				default: return "Unknown unit name";
			}
		},
		calcAutoBattle: function(attackerStack, attackerHeroAttack, defenderStack, defenderHeroDefence, campaignType) {
			console.log('--Attack start --');
			var startRoundStr = locObj.autobattle_journal_log_start.txt;
			var endRoundStr = locObj.autobattle_journal_log_end.txt;
			if (campaignType==="AutoCampaign") {
				postBattleLog(startRoundStr);
			}
			for (var attackerKey  in attackerStack.units) {
				if (attackerStack.units.hasOwnProperty(attackerKey)) {
					console.log('Attacker: ', attackerStack.units[attackerKey]);
					for (var defenderKey in defenderStack.units) {
						if (defenderStack.units.hasOwnProperty(defenderKey)) {
							var target = defenderStack.units[defenderKey];
							var dmg = game.calcDmg(attackerStack.units[attackerKey], attackerHeroAttack, defenderStack.units[defenderKey], defenderHeroDefence);
							console.log('DMG before round: ', dmg);
							dmg = Math.round(dmg);
							console.log(dmg);
							var attackerStr = locObj.autobattle_journal_log_dmg.txt.replace("%arg1", game.unitNameLoc(attackerStack.units[attackerKey].name)).replace("%arg2", dmg).replace("%arg3", game.unitNameLoc(target.name));
							if (dmg >= target.stackHealth) {
								console.log(`${target.name} is dying`);
								delete defenderStack.units[defenderKey];
								game.myhero[target.name] = 0;
								console.log("%c DEFENDER UNITS LIST: ", "background: purple; color: #ededed", defenderStack.units);
								attackerStr += ' '  + locObj.autobattle_journal_log_destroyed.txt.replace("%arg1", game.unitNameLoc(target.name));
								if (campaignType==="AutoCampaign") {
									postBattleLog(attackerStr);
								}
								if (isEmptyObj(defenderStack.units)) {
									game.isAutoBattle = false;
									game.checkWinner(campaignType);
									if (campaignType === "AutoCampaign") {
										game.attacker = 0;
									}
								}
							} else {
								var defenderLooses = parseInt(dmg / defenderStack.units[defenderKey].health);
								defenderStack.units[defenderKey].count -= defenderLooses;
								game.myhero[defenderKey] -= defenderLooses;
								target.stackHealth -= dmg;
								if (defenderLooses > 0) {
									attackerStr += ' ' + locObj.autobattle_journal_log_dead.txt.replace("%arg1", defenderLooses).replace("%arg2", game.unitNameLoc(target.name));
								}
								if (campaignType==="AutoCampaign") {
									postBattleLog(attackerStr);
								}
							}
						}
					}
				}
			}
			if (campaignType==="AutoCampaign") {
				postBattleLog(endRoundStr);
			}
			console.log('-- Attack turn ended --');
			console.log('-----------------------');
		},
		calcAttackPhase: function (campaignType) {
			var attackVal = 0;
			var defenceVal = 0;
			if (game.attacker === 1) {
				if (game.myhero.atk) {
					attackVal = game.myhero.atk;
				}
				if (game.enemyHero && game.enemyHero.def) {
					defenceVal = game.enemyHero.def
				}
				console.log("%cENEMY ARMY FROM MAP: ", 'color: #333; background: #fc3; padding: 6px;', game.enemyHeroArmy);
				game.calcAutoBattle(game.myheroArmy, attackVal, game.enemyHeroArmy, defenceVal, campaignType);
				game.attacker = 2;
			} else if (game.attacker === 2) {
				if (game.enemyHero && game.enemyHero.atk) {
					attackVal = game.enemyHero.atk;
				}
				if (game.myhero.def) {
					defenceVal = game.myhero.def
				}
				game.calcAutoBattle(game.enemyHeroArmy, attackVal, game.myheroArmy, defenceVal, campaignType);
				game.attacker = 1;
			}
		},
		heroDismiss: function () {
			if (game.heroExists()===true){
				if (game.isHeroHaveTroops()) {
					var question      = localeStrings[177];
					showModal(1, '', game.heroDismissCallback, question, locObj.yes.txt,  localeStrings[178]);
				} else {
					game.heroDie();
				}
			} else {
				alertMsg = localeStrings[229];
				showModal(0, '', getAck, alertMsg,  locObj.okay.txt, '');
			}
		},
		heroDismissCallback : function () {
			if (answer === 2){
				game.heroDie();
			}
		},
		hrSrgntsUpkp : function (sergeants) {
			return sergeants*config.sergeantUpkeep;
		},
		hrTrkplsUpkp : function (turkopols) {
			return turkopols*config.turkopolUpkeep;
		},
		hrKnghtsUpkp : function (knights) {
			return knights*config.knightUpkeep;
		},
		heroSquadUpkeep : function () {
			if (game.heroExists()) {
				if (game.myhero.upkeepsrc === 0) {
					var paidTurkopols = 0;
					var paidSergeants = 0;
					var paidKnights = 0;
					var UnPaidTurkopols = game.myhero.turkopols;
					var UnPaidSergeants = game.myhero.sergeants;
					var UnPaidKnights = game.myhero.knights;
					/*------------------------------------------*/
					var gold_was_purse = game.myhero.gold;
					if (game.myhero.gold >= game.hrTrkplsUpkp(UnPaidTurkopols)) {
						paidTurkopols = UnPaidTurkopols;
						UnPaidTurkopols = 0;
						game.myhero.gold -= game.hrTrkplsUpkp(paidTurkopols);
					} else {
						while (game.myhero.gold >= game.hrTrkplsUpkp(paidTurkopols + 1)) {
							paidTurkopols += 1;
							UnPaidTurkopols -= 1;
						}
						game.myhero.gold -= game.hrTrkplsUpkp(paidTurkopols);
					}
					var purse_diff = gold_was_purse - game.myhero.gold;
					if (purse_diff !== 0) {
						console.log("we paid from hero's purse to this amount of Tukropols " + paidTurkopols + " and this amount of gold " + purse_diff);
					}
					/*------------------------------------------*/
					var gold_was_treasury = game.gold;
					if (game.gold >= game.hrTrkplsUpkp(UnPaidTurkopols)) {
						game.gold -= game.hrTrkplsUpkp(UnPaidTurkopols);
						paidTurkopols += UnPaidTurkopols;
					} else {
						while (game.gold < game.hrTrkplsUpkp(UnPaidTurkopols)) {
							UnPaidTurkopols -= 1;
						}
						game.gold -= game.hrTrkplsUpkp(UnPaidTurkopols);
						paidTurkopols += UnPaidTurkopols;
						game.myhero.turkopols = paidTurkopols;
						game.myheroArmy.units[turkopolsData.name].count = paidTurkopols;
					}
					var treasury_diff = gold_was_treasury - game.gold;
					if (treasury_diff !== 0) {
						console.log("we paid from treasury to this amount of Tukropols " + UnPaidTurkopols + " and this amount of gold " + treasury_diff);
					}
					UnPaidTurkopols = 0;

					/*------------------------------------------*/
					var gold_was_purse = game.myhero.gold;
					if (game.myhero.gold >= game.hrKnghtsUpkp(UnPaidKnights)) {
						paidKnights = UnPaidKnights;
						UnPaidKnights = 0;
						game.myhero.gold -= game.hrKnghtsUpkp(paidKnights);
					} else {
						while (game.myhero.gold >= game.hrKnghtsUpkp(paidKnights + 1)) {
							paidKnights += 1;
							UnPaidKnights -= 1;
						}
						game.myhero.gold -= game.hrKnghtsUpkp(paidKnights);
					}
					var purse_diff = gold_was_purse - game.myhero.gold;
					if (purse_diff !== 0) {
						console.log("we paid from hero's purse to this amount of Knights " + paidKnights + " and this amount of gold " + purse_diff);
					}
					/*------------------------------------------*/
					var gold_was_treasury = game.gold;
					if (game.gold >= game.hrKnghtsUpkp(UnPaidKnights)) {
						game.gold -= game.hrKnghtsUpkp(UnPaidKnights);
						paidKnights += UnPaidKnights;
					} else {
						while (game.gold < game.hrKnghtsUpkp(UnPaidKnights)) {
							UnPaidKnights -= 1;
						}
						game.gold -= game.hrKnghtsUpkp(UnPaidKnights);
						console.log('paid knights was '+paidKnights);//DEBUG
						paidKnights += UnPaidKnights;
						game.myhero.knights = paidKnights;
						game.myheroArmy.units[knightsData.name].count = paidKnights;
					}
					var treasury_diff = gold_was_treasury - game.gold;
					if (treasury_diff !== 0) {
						console.log("we paid from treasury to this amount of Knights" + UnPaidKnights + " and this amount of gold " + treasury_diff);
					}
					UnPaidKnights = 0;

					/*------------------------------------------*/
					var gold_was_purse = game.myhero.gold;
					if (game.myhero.gold >= game.hrSrgntsUpkp(UnPaidSergeants)) {
						paidSergeants = UnPaidSergeants;
						UnPaidSergeants = 0;
						game.myhero.gold -= game.hrSrgntsUpkp(paidSergeants);
					} else {
						while (game.myhero.gold >= game.hrSrgntsUpkp(paidSergeants + 1)) {
							paidSergeants += 1;
							UnPaidSergeants -= 1;
						}
						game.myhero.gold -= game.hrSrgntsUpkp(paidSergeants);
					}
					var purse_diff = gold_was_purse - game.myhero.gold;
					if (purse_diff !== 0) {
						console.log("we paid from hero's purse to this amount of Sergeants" + paidSergeants + " and this amount of gold " + purse_diff);
					}
					/*------------------------------------------*/
					flagTreasuryToNull = false;
					var gold_was_treasury = game.gold;
					if (game.gold >= game.hrSrgntsUpkp(UnPaidSergeants)) {
						game.gold -= game.hrSrgntsUpkp(UnPaidSergeants);
					} else {
						while (game.gold < game.hrSrgntsUpkp(UnPaidSergeants)) {
							if (UnPaidSergeants !== 1) {
								UnPaidSergeants -= 1;
							} else {
								flagTreasuryToNull = true;
								break;
							}
						}
						paidSergeants += UnPaidSergeants;
						if (flagTreasuryToNull === true) {
							game.gold = 0
						} else {
							game.gold -= game.hrSrgntsUpkp(UnPaidSergeants);
						}
						game.myhero.sergeants = paidSergeants;
						game.myheroArmy.units[sergeantsData.name].count = paidSergeants;
					}
					var treasury_diff = gold_was_treasury - game.gold;
					if (treasury_diff !== 0) {
						console.log("we paid from treasury to this amount of Sergeants" + UnPaidSergeants + " and this amount of gold " + treasury_diff);
					}
					UnPaidSergeants = 0;
				} else {//from treasury only
					if (game.gold >= game.hrTrkplsUpkp(game.myhero.turkopols)) {
						game.gold -= game.hrTrkplsUpkp(game.myhero.turkopols);
					} else {
						while (game.gold < game.hrTrkplsUpkp(game.myhero.turkopols)) {
							game.myhero.turkopols -= 1;
						}
						game.gold -= game.hrTrkplsUpkp(game.myhero.turkopols);
					}
					if (game.gold >= game.hrKnghtsUpkp(game.myhero.knights)) {
						game.gold -= game.hrKnghtsUpkp(game.myhero.knights);
					} else {
						while(game.gold<game.hrKnghtsUpkp(game.myhero.knights)){
							game.myhero.knights -= 1;
						}
						game.gold -= game.hrKnghtsUpkp(game.myhero.knights);
					}
					flagTreasuryToNull = false;
					if (game.gold >= game.hrSrgntsUpkp(game.myhero.sergeants)) {
						game.gold -= game.hrSrgntsUpkp(game.myhero.sergeants);
					} else {
						while (game.gold < game.hrSrgntsUpkp(game.myhero.sergeants)) {
							if (game.myhero.sergeants !== 1) {
								game.myhero.sergeants -= 1;
							} else {
								flagTreasuryToNull = true;
								break;
							}
						}
						if (flagTreasuryToNull === true) {
							game.gold = 0
						} else {
							game.gold -= game.hrSrgntsUpkp(game.myhero.sergeants);
						}
					}
				}
			}
		},
		calculateAutocampaign : function () {

			if (game.heroExists() && game.myhero.status === HERO_STATUS.AUTOCAMPAIGN) {

				if (game.myhero.aCampaignForward === 1) {
					game.myhero.aCampaignLong         += 1;
					game.myhero.aCampaignTotalLong    += 1;
					game.ac_steps                     += 1;

					if (game.ac_steps === 2 && game.myhero.aCampaignLong === 2) {
						if (!game.story.includes("story_two_steps")){
							game.story.push("story_two_steps");
							postJournalLog(locObj.story2_two_steps.txt);
							return;
							// showModal(0, '', getAck, locObj.story2_two_steps.txt, locObj.okay.txt, '');
						}
					}

					var rnd = randomFromRange(1, 25);

					if (rnd <= 12) {
						game.isAutoBattle = true;
						createBattleAccordion();

						while (game.isAutoBattle) {
							game.calcAttackPhase("AutoCampaign");
						}
					} else {
						postJournalLog(localeStrings[175]);
					}

					game.heroLvlUp("AutoCampaign");
					return;
				}

				if (game.myhero.aCampaignBackward === 1) {
					if (game.myhero.aCampaignLong - 1 > 0){
						game.myhero.aCampaignLong     -= 1;
						if (game.isDefeated) {
							postJournalLog(locObj.advmapHeroLose.txt);
							game.isDefeated = false;
							return;
						}
						game.myhero.aCampaignTotalLong += 1;
						postJournalLog(localeStrings[175]);
					} else {
						document.getElementById("btnAutocampaign").disabled = false;
						enemyRandomizer.clearEntriesList();
						game.myhero.status             = HERO_STATUS.CITY;
						game.myhero.aCampaignLong      = 0;
						game.myhero.aCampaignTotalLong = 0;
						game.myhero.aCampaignForward   = 0;
						game.myhero.aCampaignBackward  = 0;
						postEventLog(localeStrings[176] + game.myhero.gold);
						var gold_diff = game.addMoneyToTreasury(game.myhero.gold);
						if (gold_diff !== game.myhero.gold){
							postEventLog(localeStrings[89].replace("%arg1", gold_diff));
						}
						game.myhero.gold               = 0;
					}
					game.heroLvlUp("AutoCampaign");
				}

			}


		},
		isHeroHaveTroops : function () {
			var totalCount = 0;
			if (game.heroExists()) {
				var heroSergeantsCount = game.myhero.sergeants;
				var heroTurkopolsCount = game.myhero.turkopols;
				var heroKnightsCount   = game.myhero.knights;
				totalCount = heroSergeantsCount + heroTurkopolsCount + heroKnightsCount;
				if (game.myheroArmy.units == null) {
					game.myheroArmy = {armyID: 1, units: {}};
				}
			}
			return totalCount > 0;
		},
		heroTroopsPrice : function () {
			var price = 0;
			price    += game.myhero.sergeants*20;
			price    += game.myhero.turkopols*20;
			price    += game.myhero.knights*40;
			return price;
		},
		autocampaign : function () {
			if (game.heroExists()){
				if (game.myhero.status === HERO_STATUS.CITY) {
					if (game.isHeroHaveTroops()) {
						showModal(1, '', game.autocampaignLaunchCallback, localeStrings[225], localeStrings[226], localeStrings[227]);
					} else {
						showModal(0, '', getAck, localeStrings[228],  locObj.okay.txt, '');
					}
					return;
				}

				if (game.myhero.status === HERO_STATUS.AUTOCAMPAIGN) {
					showModal(1, '', game.autocampaignWithdrawCallback, localeStrings[171], locObj.yes.txt,  locObj.no.txt);
				} else {
					showModal(0, '', getAck, localeStrings[170],  locObj.okay.txt, '');
				}

			} else {
				showModal(0, '', getAck, localeStrings[229],  locObj.okay.txt, '');
			}
		},
		autocampaignLaunchCallback : function () {
			if (answer === 2) {
				game.myhero.stance = 0;
			}
			if (answer === 3) {
				game.myhero.stance = 1;
			}
			game.setEnemyRandomizerEntries();
			game.generateEnemyUnitsForBattle();
			game.myhero.status = HERO_STATUS.AUTOCAMPAIGN;
			game.myhero.aCampaignForward   = 1;
			game.myhero.aCampaignBackward  = 0;

			createJournalAccordion();
			postJournalLog("------------------------");
			updateUI();
		},
		autocampaignWithdrawCallback : function () {
			if (answer === 2) {
				if (game.myhero.aCampaignLong === 0) {
					game.myhero.status = HERO_STATUS.CITY;
					updateUI();
				} else {
					game.myhero.aCampaignForward   = 0;
					game.myhero.aCampaignBackward  = 1;
					document.getElementById("btnAutocampaign").disabled = true;
					updateUI();
				}
			}
		},
		help(myobject) {
			if (myobject.id==="defences_img") {
				nextDefPrice = 0;
				blMaxLvlDef = 0;
				if (game.buildLevelD === 0) {
					nextDefPrice = config.costWall;
				}
				if (game.buildLevelD === 1) {
					nextDefPrice = config.costTower;
				}
				if (game.buildLevelD === 2) {
					nextDefPrice = config.costCastle;
				}
				if (game.buildLevelD === 3) {
					blMaxLvlDef = 1;
				}
				if (blMaxLvlDef === 0){
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[232]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextDefPrice);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[232];
				}
			}
			if (myobject.id==="home_img") {
				nextLvlHome           = game.buildLevelH*1+1;
				nextLvlPriceHome      = Math.pow(config.costHome,(game.buildLevelH*1+1));
				if (nextLvlHome===1) {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[233]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextLvlPriceHome);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[233]+"<br>"+locObj.upgCostSidebar.txt.replace("%arg1",nextLvlHome).replace("%arg2",nextLvlPriceHome);
				}
			}
			if (myobject.id==="treasury_img") {
				nextLvlTreasury       = game.buildLevelTreasury*1+1;
				nextLvlPriceTreasury  = Math.pow(config.costTreasury,(game.buildLevelTreasury*1+1));
				if (nextLvlTreasury===1) {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[234]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextLvlPriceTreasury);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[234]+"<br>"+locObj.upgCostSidebar.txt.replace("%arg1",nextLvlTreasury).replace("%arg2",nextLvlPriceTreasury);
				}
			}
			if (myobject.id==="gallows_img") {
				nextLvlGallows        = game.buildLevelGallows*1+1;
				nextLvlPriceGallows   = Math.pow(config.costGallows,(game.buildLevelGallows*1+1));
				if (nextLvlGallows===1) {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[235]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextLvlPriceGallows);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[235]+"<br>"+locObj.upgCostSidebar.txt.replace("%arg1",nextLvlGallows).replace("%arg2",nextLvlPriceGallows);
				}
			}
			if (myobject.id==="university_img") {
				document.getElementById("lblBuildHelp").innerHTML=locObj.bldUniversityHelp.txt+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",config.bldUniversityCost);
			}
			if (myobject.id==="fountain_img") {
				nextLvlFountain       = game.buildLevelFountain*1+1;
				nextLvlPriceFountain  = Math.pow(config.costFountain,(game.buildLevelFountain*1+1));
				if (nextLvlFountain===1) {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[236]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextLvlPriceFountain);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[236]+"<br>"+locObj.upgCostSidebar.txt.replace("%arg1",nextLvlFountain).replace("%arg2",nextLvlPriceFountain);
				}
			}
			if (myobject.id==="moneystash_img") {
				nextLvlStash          = game.buildLevelStash*1+1;
				nextLvlPriceStash     = Math.pow(config.costStash,(game.buildLevelStash*1+1));
				if (nextLvlStash===1) {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[237]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextLvlPriceStash);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[237]+"<br>"+locObj.upgCostSidebar.txt.replace("%arg1",nextLvlStash).replace("%arg2",nextLvlPriceStash);
				}
			}
			if (myobject.id==="inn_img") {
				nextLvlInn            = game.buildLevelInn*1+1;
				nextLvlPriceInn       = Math.pow(config.costInn,(game.buildLevelInn*1+1));
				if (nextLvlInn===1) {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[238]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextLvlPriceInn);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[238]+"<br>"+locObj.upgCostSidebar.txt.replace("%arg1",nextLvlInn).replace("%arg2",nextLvlPriceInn);
				}
			}
			if (myobject.id==="stable_img") {
				nextLvlStable         = game.buildLevelStable*1+1;
				nextLvlPriceStable    = Math.pow(config.costStable,(game.buildLevelStable*1+1));
				if (nextLvlStable===1) {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[239]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextLvlPriceStable);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[239]+"<br>"+locObj.upgCostSidebar.txt.replace("%arg1",nextLvlStable).replace("%arg2",nextLvlPriceStable);
				}
			}
			if (myobject.id==="archery_img") {
				nextLvlArchery         = game.buildLevelArchery*1+1;
				nextLvlPriceArchery    = Math.pow(config.costArchery,(game.buildLevelArchery*1+1));
				if (nextLvlArchery===1) {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[240]+"<br>"+locObj.bldCostSidebar.txt.replace("%arg2",nextLvlPriceArchery);
				} else {
					document.getElementById("lblBuildHelp").innerHTML=localeStrings[240]+"<br>"+locObj.upgCostSidebar.txt.replace("%arg1",nextLvlArchery).replace("%arg2",nextLvlPriceArchery);
				}
			}
			if (myobject.id==="imgHiringScreenSergeantToHire") {
				document.getElementById("grid-info").innerHTML=localeStrings[308].replace("%arg1", config.sergeantHiring).replace("%arg2", config.sergeantUpkeep);
			}
			if (myobject.id==="imgHiringScreenTurkopolToHire") {
				document.getElementById("grid-info").innerHTML=localeStrings[309].replace("%arg1", config.turkopolHiring).replace("%arg2", config.turkopolUpkeep);
			}
			if (myobject.id==="imgHiringScreenKnightToHire") {
				document.getElementById("grid-info").innerHTML=localeStrings[310].replace("%arg1", config.knightHiring).replace("%arg2", config.knightUpkeep);
			}
			if (myobject.id==="btnHireSergeant") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[308].replace("%arg1", config.sergeantHiring).replace("%arg2", config.sergeantUpkeep);
			}
			if (myobject.id==="btnHireTurkopol") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[309].replace("%arg1", config.turkopolHiring).replace("%arg2", config.turkopolUpkeep);
			}
			if (myobject.id==="btnHireKnight") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[310].replace("%arg1", config.knightHiring).replace("%arg2", config.knightUpkeep);
			}
			if (myobject.id==="imgCastellanInHiringScreen") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[311];
			}
			if (myobject.id==="imgHeroInHiringScreenKnight") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[312];
			}
			if (myobject.id==="imgHeroInHiringScreenMonk") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[312];
			}
			if (myobject.id==="imgHeroInHiringScreenMonk") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[312];
			}
			if (myobject.id==="btnMoveSergeantToHero") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[313];
			}
			if (myobject.id==="btnMoveTurkopolToHero") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[313];
			}
			if (myobject.id==="btnMoveKnightToHero") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[313];
			}
			if (myobject.id==="btnMoveSergeantToGarrison") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[314];
			}
			if (myobject.id==="btnMoveTurkopolToGarrison") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[314];
			}
			if (myobject.id==="btnMoveKnightToGarrison") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[314];
			}
			if (myobject.id==="btnMoveAllSergeantsToHero") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[331];
			}
			if (myobject.id==="btnMoveAllTurkopolsToHero") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[331];
			}
			if (myobject.id==="btnMoveAllKnightsToHero") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[331];
			}
			if (myobject.id==="btnMoveAllTroopsToHero") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[332];
			}
			if (myobject.id==="btnMoveAllSergeantsToGarrison") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[333];
			}
			if (myobject.id==="btnMoveAllTurkopolsToGarrison") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[333];
			}
			if (myobject.id==="btnMoveAllKnightsToGarrison") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[333];
			}
			if (myobject.id==="btnMoveAllTroopsToGarrison") {
				document.getElementById("lblTroopsHelp").innerHTML=localeStrings[334];
			}

			if (myobject.id === "btnDismissGarrisonSergeant") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[339];
			}

			if (myobject.id === "btnDismissAllGarrisonSergeants") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[340];
			}

			if (myobject.id === "btnDismissGarrisonTurkopol") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[341];
			}

			if (myobject.id === "btnDismissAllGarrisonTurkopols") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[342];
			}

			if (myobject.id === "btnDismissGarrisonKnight") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[343];
			}

			if (myobject.id === "btnDismissAllGarrisonKnights") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[344];
			}

			if (myobject.id === "btnDismissAllGarrisonForces") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[345];
			}

			if (myobject.id === "btnDismissHeroSergeant") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[346];
			}

			if (myobject.id === "btnDismissAllHeroSergeants") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[347];
			}

			if (myobject.id === "btnDismissHeroTurkopol") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[348];
			}

			if (myobject.id === "btnDismissAllHeroTurkopols") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[349];
			}

			if (myobject.id === "btnDismissHeroKnight") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[350];
			}

			if (myobject.id === "btnDismissAllHeroKnights") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[351];
			}

			if (myobject.id === "btnDismissAllHeroForces") {
				document.getElementById("lblTroopsHelp").innerHTML = localeStrings[352];
			}

		},
		heroExists: function () {
			return (Object.keys(game.myhero).length === 0 && game.myhero.constructor === Object) ? false : true;
		},
		heroAlignment(returnFormat) {
			if (returnFormat==="text") {
				var heroAlignment = "";
				if (game.myhero.lawful < 40) {
					heroAlignment += localeStrings[200];
				}
				if (game.myhero.lawful >= 40 && game.myhero.lawful <60) {
					heroAlignment += localeStrings[199];
				}
				if (game.myhero.lawful >= 60) {
					heroAlignment += localeStrings[198];
				}
				if (game.myhero.kindness < 40) {
					heroAlignment += " "+localeStrings[203];
				}
				if (game.myhero.kindness >= 40 && game.myhero.kindness <60) {
					heroAlignment += " "+localeStrings[202];
				}
				if (game.myhero.kindness >= 60) {
					heroAlignment += " "+localeStrings[201];
				}
				heroAlignment += " ("+game.myhero.lawful+"; "+game.myhero.kindness+")";
			}
			return heroAlignment;
		},
		heroNextLvlExpLimit () {
			return Math.pow((game.myhero.level+1) * config.heroExpK,2);
		},
		heroHire : function (silent) {
			if (game.heroExists() === false) {
				if (game.gold > config.costHero || silent===true) {
					if (silent === false) {
						game.gold                 = game.gold - config.costHero;
					}
					clearJournalLog();
					game.myhero.level     = heroesForHire[curHeroForHire].level;
					game.myhero.exp       = Math.pow(game.myhero.level * config.heroExpK,2);
					game.myhero.class     = curHeroForHire;
					game.myhero.atk       = heroesForHire[curHeroForHire].atk;
					game.myhero.def       = heroesForHire[curHeroForHire].def;
					game.myhero.mpow      = heroesForHire[curHeroForHire].mpow;
					game.myhero.int       = heroesForHire[curHeroForHire].int;
					game.myhero.mana      = heroesForHire[curHeroForHire].int*10;
					game.myhero.cmana     = heroesForHire[curHeroForHire].int*10;

					if (game.myhero.class===0){
						game.myhero.lawful    = 80;
						game.myhero.kindness  = 50;
						var heroAttributesRandomizer = new WeightedRandom();
						heroAttributesRandomizer.addEntry('atk', 60.0);
						heroAttributesRandomizer.addEntry('def', 40.0);
						heroAttributesRandomizer.addEntry('int', 0.0); // Temp logic for knight, until there is no magic mechanics at autocampaign
						heroAttributesRandomizer.addEntry('mpow', 0.0); // Temp logic for knight, until there is no magic mechanics at autocampaign
					}
					if (game.myhero.class===1){
						game.myhero.lawful    = 80;
						game.myhero.kindness  = 70;
						var heroAttributesRandomizer = new WeightedRandom();
						heroAttributesRandomizer.addEntry('atk', 45.0);  //Temp logic for monk, until there is no magic mechanics in autocampaign
						heroAttributesRandomizer.addEntry('def', 55.0); //Temp logic for monk, until there is no magic mechanics in autocampaign
						heroAttributesRandomizer.addEntry('int', 0.0);
						heroAttributesRandomizer.addEntry('mpow', 0.0);
					}
					game.myhero.sergeants  = 0;
					game.myhero.turkopols  = 0;
					game.myhero.knights    = 0;
					game.myhero.inventory    = [];//should the list contain objects?
					game.myhero.inventoryWorn= [];//should the list contain objects?
					game.myhero.status     = HERO_STATUS.CITY;
					game.myhero.gold       = 0;
					game.myhero.upkeepsrc  = 0;//0 from the hero's purse, 1 from the treasury
					game.myhero.statLuck           = 0;
					game.myhero.statSuperstition   = 0;
					game.myhero.statMorale         = 0;
					game.myhero.pskillCharisma     = 0;
					game.myhero.pskillLeadership   = 0;
					game.myhero.eqRigtharm         = 0;
					game.myhero.eqLeftarm          = 0;
					game.myhero.eqHelmet           = 0;
					game.myhero.eqBoots            = 0;
					game.myhero.eqCloak            = 0;
					game.myhero.eqRightring        = 0;
					game.myhero.eqLeftring         = 0;
					game.myhero.eqNecklace         = 0;
					game.myhero.eqBody             = 0;
					game.myhero.eqRange            = 0;
					game.myhero.artefactsWorn      = 0;//5
					game.myhero.aCampaign          = 0;
					game.myhero.aCampaignLong      = 0;
					game.myhero.aCampaignTotalLong = 0;
					game.myhero.aCampaignForward   = 0;
					game.myhero.aCampaignBackward  = 0;
					game.myhero.portrait_id        = heroesForHire[curHeroForHire].portrait_id;
					updateHeroStatus();
					game.gold -= config.costHero;
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			} else {
				disabledElements.push("btnHireHero");
				disabledElements.push("selectHeroClass");
				document.getElementById("btnHireHero").disabled = true;
				document.getElementById("selectHeroClass").disabled = true;
				alertMsg = localeStrings[61];
				showModal(0, '', getAck, alertMsg, locObj.okay.txt, '');
			}
		},
		heroLvlUp : function (campaignType) {
			if (game.myhero.exp > game.heroNextLvlExpLimit()){
				game.myhero.level +=1;
				var heroAttributesRandomizer = new WeightedRandom();
				if (game.myhero.class === 0) {
					heroAttributesRandomizer.addEntry('atk', 60.0);
					heroAttributesRandomizer.addEntry('def', 40.0);
					heroAttributesRandomizer.addEntry('int', 0.0); // Temp logic for knight, until there is no magic mechanics at autocampaign
					heroAttributesRandomizer.addEntry('mpow', 0.0);
				}

				if (game.myhero.class === 1) {
					heroAttributesRandomizer.addEntry('atk', 45.0);  //Temp logic for monk, until there is no magic mechanics in autocampaign
					heroAttributesRandomizer.addEntry('def', 55.0); //Temp logic for monk, until there is no magic mechanics in autocampaign
					heroAttributesRandomizer.addEntry('int', 0.0);
					heroAttributesRandomizer.addEntry('mpow', 0.0);
				}

				var rndAttrName = heroAttributesRandomizer.getRandom();
				game.myhero[rndAttrName]++;
				console.log(rndAttrName);
				if (rndAttrName === "int") {
					game.recalcManaPoints();
				}

				if (campaignType === "AutoCampaign") {
					postJournalLog(localeStrings[224]);
				}
			}
		},

		recalcManaPoints: function() {
			game.myhero.mana = game.myhero.cmana = game.myhero.int * 10;
		},

		heroDie : function () {
			game.myhero = {};
			//heroAttributesRandomizer.clearEntriesList();
			updateHeroStatus();
			writeSave();
		},
		hireSergeants : function () {
			if (game.buildLevelStable>=1) {
				if (game.gold >= numberToHire*config.sergeantHiring) {
					game.sergeants += parseInt(numberToHire);
					game.gold      -= numberToHire*config.sergeantHiring;
					updateTroopsNumbers();
					updateResources();
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1",localeStrings[316]);
				postEventLog(msg);
			}
		},
		hireTurkopols : function () {
			if (game.buildLevelStable>=1) {
				if (game.buildLevelArchery >= 1) {
					if (game.gold >= numberToHire*config.turkopolHiring) {
						game.turkopols += parseInt(numberToHire);
						game.gold      -= numberToHire*config.turkopolHiring;
						updateTroopsNumbers();
						updateResources();
					} else {
						postEventLog(locObj.notEnoughGold.txt, "bold");
					}
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[317]);
					postEventLog(msg);
				}
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1",localeStrings[316]);
				postEventLog(msg);
			}
		},
		hireKnights : function () {
			if (game.buildLevelStable>=2) {
				if (game.gold >= numberToHire*config.knightHiring) {
					game.knights   += parseInt(numberToHire);
					game.gold      -= numberToHire*config.knightHiring;
					updateTroopsNumbers();
					updateResources();
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1",localeStrings[318]);
				postEventLog(msg);
			}
		},
		hireUnits : function () {
			if (selectedUnitToHire==="sergeant"){
				game.hireSergeants();
			}
			if (selectedUnitToHire==="turkopol"){
				game.hireTurkopols();
			}
			if (selectedUnitToHire==="knight"){
				game.hireKnights();
			}
		},
		moveSergeants() {
			if (moveFromGarrison) {
				if (game.sergeants >= numberToMove) {
					game.sergeants -= numberToMove;
					game.myhero.sergeants += numberToMove;

					if (!game.myheroArmy.units[sergeantsData.name]) {
						game.genUnitStack(sergeantsData, numberToMove, game.myheroArmy.units);
					} else {
						game.myheroArmy.units[sergeantsData.name].count += numberToMove;
						game.myheroArmy.units[sergeantsData.name].stackHealth = game.myheroArmy.units[sergeantsData.name].health * game.myheroArmy.units[sergeantsData.name].count;

					}

					updateHeroStatus();
					updateTroopsNumbers();
					updateResources();
				}
			}
		},
		moveTurkopols() {
			if (moveFromGarrison) {
				if (game.turkopols >= numberToMove) {
					game.turkopols -= numberToMove;
					game.myhero.turkopols += numberToMove;

					if (!game.myheroArmy.units[turkopolsData.name]) {
						game.genUnitStack(turkopolsData, numberToMove, game.myheroArmy.units);
					} else {
						game.myheroArmy.units[turkopolsData.name].count += numberToMove;
						game.myheroArmy.units[turkopolsData.name].stackHealth = game.myheroArmy.units[turkopolsData.name].health * game.myheroArmy.units[turkopolsData.name].count;
					}

					updateHeroStatus();
					updateTroopsNumbers();
					updateResources();
				}
			}
		},
		moveKnights() {
			if (moveFromGarrison) {
				if (game.knights >= numberToMove) {
					game.knights -= numberToMove;
					game.myhero.knights += numberToMove;

					if (!game.myheroArmy.units[knightsData.name]) {
						game.genUnitStack(knightsData, numberToMove, game.myheroArmy.units);
					} else {
						game.myheroArmy.units[knightsData.name].count += numberToMove;
						game.myheroArmy.units[knightsData.name].stackHealth = game.myheroArmy.units[knightsData.name].health * game.myheroArmy.units[knightsData.name].count;
					}

					updateHeroStatus();
					updateTroopsNumbers();
					updateResources();
				}
			}
		},
		moveUnits : function () {
			if (selectedUnitToMove==="sergeant"){
				game.moveSergeants();
			}
			if (selectedUnitToMove==="turkopol"){
				game.moveTurkopols();
			}
			if (selectedUnitToMove==="knight"){
				game.moveKnights();
			}
		},
		moveSergeantsToGarnison : function () {
			if (game.myhero.status===0){
				if (game.myhero.sergeants>0) {
					game.sergeants += 1;
					game.myhero.sergeants -= 1;
					updateTroopsNumbers();
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[315]);
					postEventLog(msg);
				}
			}
			console.group("%c Garrison sergeants", "background-color: #090; color: #fff; padding: 0 10px;");
			console.log("%c Sergeants: ", "color: #090;", game.sergeants);
			console.groupEnd();

			console.group("%c Hero sergeants", "background-color: blue; color: #fff; padding: 0 10px;");
			console.log("%c Sergeants: ", "color: blue;", game.myhero.sergeants);
			console.groupEnd();
		},
		moveTurkopolsToGarnison : function () {
			if (game.myhero.status===0){
				if (game.myhero.turkopols>0) {
					game.turkopols += 1;
					game.myhero.turkopols -= 1;
					updateTroopsNumbers();
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[315]);
					postEventLog(msg);
				}
			}
			console.group("%c Garrison turkopols", "background-color: #090; color: #fff; padding: 0 10px;");
			console.log("%c Turkopols: ", "color: #090;", game.turkopols);
			console.groupEnd();

			console.group("%c Hero turkopols", "background-color: blue; color: #fff; padding: 0 10px;");
			console.log("%c Turkopols: ", "color: blue;", game.myhero.turkopols);
			console.groupEnd();
		},
		moveKnightsToGarnison : function () {
			if (game.myhero.status===0){
				if (game.myhero.knights>0) {
					game.knights += 1;
					game.myhero.knights -= 1;
					updateTroopsNumbers();
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[315]);
					postEventLog(msg);
				}
			}

			console.group("%c Garrison knights", "background-color: #090; color: #fff; padding: 0 10px;");
			console.log("%c Knights: ", "color: #090;", game.knights);
			console.groupEnd();

			console.group("%c Hero knights", "background-color: blue; color: #fff; padding: 0 10px;");
			console.log("%c Knights: ", "color: blue;", game.myhero.knights);
			console.groupEnd();
		},

		//--- Move troops by type to garrison: Start ---//
		moveAllSergeantsToGarrison : function () {
			if (game.myhero.status===0){
				if (game.myhero.sergeants>0) {
					var heroSergeantsCount = game.myhero.sergeants;
					game.sergeants += heroSergeantsCount;
					game.myhero.sergeants -= heroSergeantsCount;
					updateTroopsNumbers();
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[315]);
					postEventLog(msg);
				}
			}

			console.group("%c Garrison sergeants", "background-color: #090; color: #fff; padding: 0 10px;");
			console.log("%c Sergeants: ", "color: #090;", game.sergeants);
			console.groupEnd();

			console.group("%c Hero sergeants", "background-color: blue; color: #fff; padding: 0 10px;");
			console.log("%c Sergeants: ", "color: blue;", game.myhero.sergeants);
			console.groupEnd();

		},
		moveAllTurkopolsToGarrison: function () {
			if (game.myhero.status===0){
				if (game.myhero.turkopols>0) {
					var heroTurkopolsCount = game.myhero.turkopols;
					game.turkopols += heroTurkopolsCount;
					game.myhero.turkopols -= heroTurkopolsCount;
					updateTroopsNumbers();
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[315]);
					postEventLog(msg);
				}
			}

			console.group("%c Garrison turkopols", "background-color: #090; color: #fff; padding: 0 10px;");
			console.log("%c Turkopols: ", "color: #090;", game.turkopols);
			console.groupEnd();

			console.group("%c Hero turkopols", "background-color: blue; color: #fff; padding: 0 10px;");
			console.log("%c Turkopols: ", "color: blue;", game.myhero.turkopols);
			console.groupEnd();

		},
		moveAllKnightsToGarrison: function () {
			if (game.myhero.status===0){
				if (game.myhero.knights>0) {
					var heroKnightsCount = game.myhero.knights;
					game.knights += heroKnightsCount;
					game.myhero.knights -= heroKnightsCount;
					updateTroopsNumbers();
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[315]);
					postEventLog(msg);
				}
			}

			console.group("%c Garrison knights", "background-color: #090; color: #fff; padding: 0 10px;");
			console.log("%c Knights: ", "color: #090;", game.knights);
			console.groupEnd();

			console.group("%c Hero knights", "background-color: blue; color: #fff; padding: 0 10px;");
			console.log("%c Knights: ", "color: blue;", game.myhero.knights);
			console.groupEnd();

		},
		//--- Move troops by type to garrison: End ---//


		// Functions for moving all troops between garrison and hero's squad. Just incase.

		moveAllTroopsToHero: function () {
			if (game.myhero.status===0) {
				if (game.sergeants > 0 || game.turkopols > 0 || game.knights > 0) {
					var sergeantsCount = game.sergeants,
						turkopolsCount = game.turkopols,
						knightsCount = game.knights;

					game.myhero.sergeants += sergeantsCount
					game.myhero.turkopols += turkopolsCount;
					game.myhero.knights	+= knightsCount;

					game.sergeants -= sergeantsCount;
					game.turkopols -= turkopolsCount;
					game.knights -= knightsCount;
					updateTroopsNumbers();
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[315]);
					postEventLog(msg);
				}
			}

			console.group("%c Garrison troops", "background-color: #090; color: #fff; padding: 0 10px;");
			console.log("%c Sergeants: ", "color: #090;", game.sergeants);
			console.log("%c Turkopols: ", "color: #090;", game.turkopols);
			console.log("%c Knights: ", "color: #090;", game.knights);
			console.groupEnd();

			console.group("%c Hero troops", "background-color: blue; color: #fff; padding: 0 10px;");
			console.log("%c Sergeants: ", "color: blue;", game.myhero.sergeants);
			console.log("%c Turkopols: ", "color: blue;", game.myhero.turkopols);
			console.log("%c Knights: ", "color: blue;", game.myhero.knights);
			console.groupEnd();



		},

		moveAllTroopsToGarrison: function () {
			if (game.myhero.status===0) {
				if (game.myhero.sergeants > 0 || game.myhero.turkopols > 0 || game.myhero.knights > 0) {
					var sergeantsCount = game.myhero.sergeants,
						turkopolsCount = game.myhero.turkopols,
						knightsCount = game.myhero.knights;

					game.sergeants += sergeantsCount
					game.turkopols += turkopolsCount;
					game.knights	+= knightsCount;

					game.myhero.sergeants -= sergeantsCount;
					game.myhero.turkopols -= turkopolsCount;
					game.myhero.knights -= knightsCount;
					updateTroopsNumbers();
				} else {
					msg = "<b>%arg1</b>";
					msg = msg.replace("%arg1",localeStrings[315]);
					postEventLog(msg);
				}
			}

			console.group("%c Garrison troops", "background-color: #090; color: #fff; padding: 0 10px;");
			console.log("%c Sergeants: ", "color: #090;", game.sergeants);
			console.log("%c Turkopols: ", "color: #090;", game.turkopols);
			console.log("%c Knights: ", "color: #090;", game.knights);
			console.groupEnd();

			console.group("%c Hero troops", "background-color: blue; color: #fff; padding: 0 10px;");
			console.log("%c Sergeants: ", "color: blue;", game.myhero.sergeants);
			console.log("%c Turkopols: ", "color: blue;", game.myhero.turkopols);
			console.log("%c Knights: ", "color: blue;", game.myhero.knights);
			console.groupEnd();

		},



		//-- Dismiss garrison troops by one  --//
		dismissGarrisonSergeant: function() {
			if (game.sergeants > 0) {
				question = localeStrings[353];
				showModal(1, '', game.dismissGarrisonSergeantCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[367]);
				postEventLog(msg);
			}
		},

		dismissGarrisonSergeantCallback: function () {
			if (answer == 2) {
				game.sergeants--;
				updateTroopsNumbers();
			}
		},

		dismissGarrisonTurkopol: function() {
			if (game.turkopols > 0) {
				question = localeStrings[354];
				showModal(1, '', game.dismissGarrisonTurkopolCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[368]);
				postEventLog(msg);
			}
		},

		dismissGarrisonTurkopolCallback: function () {
			if (answer == 2) {
				game.turkopols--;
				updateTroopsNumbers();
			}
		},

		dismissGarrisonKnight: function() {
			if (game.knights > 0) {
				question = localeStrings[355];
				showModal(1, '', game.dismissGarrisonKnightCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[369]);
				postEventLog(msg);
			}
		},

		dismissGarrisonKnightCallback: function () {
			if (answer == 2) {
				game.knights--;
				updateTroopsNumbers();
			}
		},
		//-- /Dismiss garrison troops by one  --//


		//-- Dismiss all garrison troops by type --//
		dismissAllGarrisonSergenats: function() {
			if (game.sergeants > 0) {
				question = localeStrings[356];
				showModal(1, '', game.dismissAllGarrisonSergenatsCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[367]);
				postEventLog(msg);
			}
		},

		dismissAllGarrisonSergenatsCallback: function () {
			if (answer == 2) {
				game.sergeants = 0;
				updateTroopsNumbers();
			}
		},

		dismissAllGarrisonTurkopols: function () {
			if (game.turkopols > 0) {
				question = localeStrings[357];
				showModal(1, '', game.dismissAllGarrisonTurkopolsCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[368]);
				postEventLog(msg);
			}
		},

		dismissAllGarrisonTurkopolsCallback: function () {
			if (answer == 2) {
				game.turkopols = 0;
				updateTroopsNumbers();
			}
		},

		dismissAllGarrisonKnights: function () {
			if (game.knights > 0) {
				question = localeStrings[358];
				showModal(1, '', game.dismissAllGarrisonKnightsCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[369]);
				postEventLog(msg);
			}
		},

		dismissAllGarrisonKnightsCallback: function () {
			if (answer == 2) {
				game.knights = 0;
				updateTroopsNumbers()
			}
		},
		//-- /Dismiss all garrison troops by type --//


		//-- Dismiss heroe's troops by one --//
		dismissHeroSergeant: function() {
			console.log(game.hero);
			if (game.myhero.sergeants > 0) {
				question = localeStrings[359];
				showModal(1, '', game.dismissHeroSergeantCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[370]);
				postEventLog(msg);
			}
		},

		dismissHeroSergeantCallback: function () {
			if (answer == 2) {
				console.log('Hero sergeants: ', game.myhero);
				game.myhero.sergeants--;
				updateTroopsNumbers();
			}
		},

		dismissHeroTurkopol: function () {
			if (game.myhero.turkopols > 0) {
				question = localeStrings[360];
				showModal(1, '', game.dismissHeroTurkopolCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[371]);
				postEventLog(msg);
			}
		},

		dismissHeroTurkopolCallback: function () {
			if (answer == 2) {
				game.myhero.turkopols--;
				updateTroopsNumbers();
			}
		},

		dismissHeroKnight: function () {
			if (game.myhero.knights > 0) {
				question = localeStrings[361];
				showModal(1, '', game.dismissHeroKnightCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[372]);
				postEventLog(msg);
			}
		},

		dismissHeroKnightCallback: function () {
			if (answer == 2) {
				game.myhero.knights--;
				updateTroopsNumbers();
			}
		},
		//-- /Dismiss heroe's troops by one --//


		//-- Dismiss heroe's troops by type --//
		dismissAllHeroSergeants: function () {
			if (game.myhero.sergeants > 0) {
				question = localeStrings[362];
				showModal(1, '', game.dismissAllHeroSergeantsCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[370]);
				postEventLog(msg);
			}
		},

		dismissAllHeroSergeantsCallback: function () {
			if (answer == 2) {
				game.myhero.sergeants = 0;
				updateTroopsNumbers();
			}
		},

		dismissAllHeroTurkopols: function () {
			if (game.myhero.turkopols > 0) {
				question = localeStrings[363];
				showModal(1, '', game.dismissAllHeroTurkopolsCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[371]);
				postEventLog(msg);
			}
		},

		dismissAllHeroTurkopolsCallback: function () {
			if (answer == 2) {
				game.myhero.turkopols = 0;
				updateTroopsNumbers();
			}
		},

		dismissAllHeroKnights: function () {
			if (game.myhero.knights > 0) {
				question = localeStrings[364];
				showModal(1, '', game.dismissAllHeroKnightsCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[372]);
				postEventLog(msg);
			}
		},

		dismissAllHeroKnightsCallback: function () {
			if (answer == 2) {
				game.myhero.knights = 0;
				updateTroopsNumbers();
			}
		},

		//-- /Dismiss heroe's troops by type --//


		//-- Dismiss all forces --//
		dismissAllGarrisonForces: function () {
			if (game.sergeants > 0 || game.turkopols > 0 || game.knights > 0) {
				var garrisonSergeantsStr = '', garrisonTurkopolsStr = '', garrisonKnightsStr = '';
				if (game.sergeants > 0) {
					garrisonSergeantsStr = localeStrings[375].replace("%arg1", game.sergeants);
				}
				if (game.turkopols > 0) {
					garrisonTurkopolsStr = localeStrings[376].replace("%arg1", game.turkopols);
				}
				if (game.knights > 0) {
					garrisonKnightsStr = localeStrings[377].replace("%arg1", game.knights);
				}
				question = localeStrings[365].replace("%arg1", garrisonSergeantsStr).replace("%arg2", garrisonTurkopolsStr).replace("%arg3", garrisonKnightsStr);
				showModal(1, '', game.dismissAllGarrisonForcesCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[373]);
				postEventLog(msg);
			}
		},

		dismissAllGarrisonForcesCallback: function () {
			if (answer == 2) {
				game.sergeants = 0;
				game.turkopols = 0;
				game.knights = 0;
				updateTroopsNumbers();
			}
		},

		dismissAllHeroForces: function () {
			if (game.myhero.sergeants > 0 || game.myhero.turkopols > 0 || game.myhero.knights > 0) {
				var heroSergeantsStr = '', heroTurkopolsStr = '', heroKnightsStr = '';
				if (game.myhero.sergeants > 0) {
					heroSergeantsStr = localeStrings[375].replace("%arg1", game.myhero.sergeants);
				}
				if (game.myhero.turkopols > 0) {
					heroTurkopolsStr = localeStrings[376].replace("%arg1", game.myhero.turkopols);
				}
				if (game.myhero.knights > 0) {
					heroKnightsStr = localeStrings[377].replace("%arg1", game.myhero.knights);
				}
				question = localeStrings[366].replace("%arg1", heroSergeantsStr).replace("%arg2", heroTurkopolsStr).replace("%arg3", heroKnightsStr);
				showModal(1, '', game.dismissAllHeroForcesCallback, question, locObj.yes.txt, locObj.no.txt);
			} else {
				msg = "<b>%arg1</b>";
				msg = msg.replace("%arg1", localeStrings[374]);
				postEventLog(msg);
			}
		},

		dismissAllHeroForcesCallback: function () {
			if (answer == 2) {
				game.myhero.sergeants = 0;
				game.myhero.turkopols = 0;
				game.myhero.knights = 0;
				updateTroopsNumbers();
			}
		},
		//-- /Dismiss all forces --//


		goldLimit : function () {
			return Math.pow(config.costTreasury,(game.buildLevelTreasury*1+1))*2+500;
		},
		popLimit : function () {
			if (game.buildLevelH >= 1){
				return 2*Math.pow((game.buildLevelH*1+2),2);
			} else {
				return 6;
			}
		},
		recordStats : function() {
			game.years.push(game.year+" "+game.season);
			game.budgets.push(game.gold);
			game.pops.push(game.pop);
		},
		calculateTurn : function() {
			var gold_was = game.gold;
			//console.log("%c GOLD BEFORE UPDATE: ", "color: red", gold_was);
			game.recordStats();
			//game.getNearestEventTime();
			//game.getReward();
			pop_m         = 0;
			pop_was       = game.pop;
			game.ticks    = game.ticks + 1;
			game.season   = game.season + 1;
			if (game.season === 5) {
				game.season   = 1;
				game.year     = game.year+1;
			}
			pop_limit = game.popLimit();
			if (game.fire ===0) {
				if (game.pop < pop_limit) {
					pop_incr = Math.round((game.pop*20/1000)*(config.popIncRate+game.buildLevelFountain*1/10),0)
					if (pop_incr === 0) {
						game.pop = game.pop*1+config.popIncRate;
					} else {
						game.pop = game.pop*1+pop_incr*1;
						if (game.pop > pop_limit) {
							game.pop = pop_limit;
						}
					}
					pop_m    = 1;
					game.userPopAck = 0;
				} else {
					game.pop = pop_limit;
					if (game.userPopAck === 0) {
						postEventLog(locObj.buildUpgradeHouse.txt, "bold");
						game.userPopAck = 1;
					}
					//TUTORIALS
					if (game.isTutorialState && !game.tips.includes("tutorial1_pop0")){
						game.tips.push("tutorial1_pop0");
						showModal(0, '', getAck, locObj.tutorial1_pop0.txt, locObj.okay.txt, '')
					}
				}
			}
			game.calculateAutocampaign();
			game.heroSquadUpkeep();
			if (game.treasuryGuard > 0) {
				if (game.gold - game.treasuryGuard * config.treasuryGuardPricePayroll >= 0) {
					game.gold = game.gold - game.treasuryGuard * config.treasuryGuardPricePayroll;
				}
				else {
					//fire guards which we cannot afford
					//for now fire all guards!
					//TODO fire only those who we cannot afford
					var canUpkeep = Math.floor(game.gold/config.treasuryGuardPricePayroll);
					var dissmisedTreasuryGuard = game.treasuryGuard - canUpkeep;
					game.treasuryGuard = canUpkeep;
					game.gold -= (canUpkeep * config.treasuryGuardPricePayroll);
					console.group("%c Treausury guard: ", "background-color: cyan; color: #333");
					console.log("Treasury guard: ", game.treasuryGuard);
					console.groupEnd();

					msg = (canUpkeep > 0) ? localeStrings[335].replace("%arg1", dissmisedTreasuryGuard) : localeStrings[37];
					postEventLog(msg);
				}
			}
			if (game.sergeants > 0) {
				if (game.gold - game.sergeants * config.sergeantUpkeep >= 0) {
					game.gold = game.gold - game.sergeants * 5;
				}
				else {
					//fire guards which we cannot afford
					//for now fire all guards!
					//TODO fire only those who we cannot afford

					var canUpkeep = Math.floor(game.gold/config.sergeantUpkeep);
					var dismissedSergeants = game.sergeants - canUpkeep;
					game.sergeants = canUpkeep;
					game.gold -= (canUpkeep * config.sergeantUpkeep);

					console.group("%c Sergeants: ", "background-color: cyan; color: #333");
					console.log("Sergeants: ", game.sergeants);
					console.groupEnd();

					msg = (canUpkeep > 0) ? localeStrings[336].replace("%arg1", dismissedSergeants) : localeStrings[280];
					postEventLog(msg);
				}
			}
			if (game.turkopols > 0) {
				if (game.gold - game.turkopols * config.turkopolUpkeep >= 0) {
					game.gold = game.gold - game.turkopols * 5;
				}
				else {
					//fire guards which we cannot afford
					//for now fire all guards!
					//TODO fire only those who we cannot afford

					var canUpkeep = Math.floor(game.gold/config.turkopolUpkeep);
					var dismissedTurkopols = game.turkopols - canUpkeep;
					game.turkopols = canUpkeep;
					game.gold -= (canUpkeep * config.turkopolUpkeep);

					console.group("%c Turkopols: ", "background-color: cyan; color: #333");
					console.log("Turkopols: ", game.turkopols);
					console.groupEnd();

					msg = (canUpkeep > 0) ? localeStrings[337].replace("%arg1", dismissedTurkopols) : localeStrings[281];
					postEventLog(msg);
				}
			}
			if (game.knights > 0) {
				if (game.gold - game.knights * config.knightUpkeep >= 0) {
					game.gold = game.gold - game.knights * 5;
				}
				else {
					//fire guards which we cannot afford
					//for now fire all guards!
					//TODO fire only those who we cannot afford


					var canUpkeep = Math.floor(game.gold/config.knightUpkeep);
					var dismissedKnights = game.knights - canUpkeep;
					game.knights = canUpkeep;
					game.gold -= (canUpkeep * config.knightUpkeep);

					console.group("%c Knights: ", "background-color: cyan; color: #333");
					console.log("Knights: ", game.knights);
					console.groupEnd();

					msg = (canUpkeep > 0) ? localeStrings[338].replace("%arg1", dismissedKnights) : localeStrings[282];
					postEventLog(msg);
				}
			}
			if (game.fireGuard === 1) {
				if (game.gold - game.fireGuardUpkeep() >= 0) {
					game.gold = game.gold - game.fireGuardUpkeep();
				}
				else {
					game.fireGuard = 0;
					setupFirebrigadeUI();
					msg   = localeStrings[283];
					postEventLog(msg);
				}
			}
			if (game.fire === 1 && game.fireGuard === 1) {
				if (game.fireSteps > 0) {
					game.fireSteps = game.fireSteps-1;
					if (game.fireSteps===0) {
						game.fire = 0;
						game.putOutFireUI();
					}
					if (game.fireGuard===1){
						document.getElementById("divFBProgress").style.display="inline";
					}
					var fireProgress = Math.ceil((config.fireStepsBasic-game.fireSteps)/config.fireStepsBasic*100);
					document.getElementById("divFBProgress").innerHTML = localeStrings[275].replace("%arg1",fireProgress);
				}
			}
			//console.log("%c GOLD AFTER UPKEEP PAYMENTS: ", "color: blue", game.gold);
			taxes = Math.round(game.pop*(1+game.buildLevelGallows*1/10),0);
			game.addMoneyToTreasury(taxes);
			if (game.gold !== gold_was) {
				if (game.gold > gold_was) {
					msg = locObj.moneyIncreased.txt;
				} else {
					msg = locObj.moneyDecreased.txt;
				}
				postEventLog(msg);
			}
			if (game.pop !== pop_was) {
				if (game.pop > pop_was) {
					msg = locObj.popIncreased.txt;
				} else {
					msg = locObj.popDecreased.txt;
				}
				postEventLog(msg);
			};
			//TUTORIALS
			gameTips();
			gameStory();
			gameChangePath();
			cnt_cursession = cnt_cursession+1;
			if (cnt_cursession===10) {
				//TODO
				//ym(47225574, 'reachGoal', 'min5');
				//return true;
			}
			//console.log("GOLD AFTER UPDATE: ", game.gold);
			updateUI();
		},
		makeFestival : function() {
			question      = localeStrings[56].replace("%arg1", game.festivalPrice());
			if (game.festival_cooldown !==0) {
				question += localeStrings[57];
			}
			showModal(1, '', game.makeFestivalCallback, question, locObj.yes.txt, locObj.no.txt)
		},
		makeFestivalCallback : function() {
			if (answer === 2) {
				if (game.gold>=game.festivalPrice()) {
					var gold_was          = game.gold;
					game.gold = game.gold-game.festivalPrice();
					var fundraising = Math.floor(game.festivalPrice()*(30-game.festival_cooldown)/30*1.05+2*(game.buildLevelFountain+1));
					game.addMoneyToTreasury(fundraising);
					gold_diff = game.gold-gold_was;
					if (gold_diff>=0){
						msg = localeStrings[59][0].replace("%arg1",gold_diff);
					} else {
						msg = localeStrings[59][1].replace("%arg1",gold_diff);
					}
					postEventLog(msg);
					game.festival_cooldown  = config.festCooldown;
					updateResources();
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
		},
		Build : function (Structure) {
			if (Structure==="Wall" || Structure ==="Tower" || Structure ==="Castle") {
				//WALL
				if (game.buildLevelD === 0) {
					if (game.gold >= config.costWall){
						game.buildLevelD        = game.buildLevelD*1 + 1;
						game.gold               = game.gold - config.costWall;
						commonBuild();
						return true;
					} else {
						postEventLog(locObj.notEnoughGold.txt, "bold");
					}
				}
				//WOODEN TOWER
				if (game.buildLevelD === 1) {
					if (game.gold >= config.costTower){
						game.buildLevelD        = game.buildLevelD*1 + 1;
						game.gold               = game.gold - config.costTower;
						commonBuild();
						return true;
					} else {
						postEventLog(locObj.notEnoughGold.txt, "bold");
					}
				}
				//STONE CASTLE
				if (game.buildLevelD === 2) {
					if (game.gold >= config.costCastle) {
						game.buildLevelD        = game.buildLevelD*1 + 1;
						game.gold               = game.gold - config.costCastle;
						commonBuild();
						return true;
					} else {
						postEventLog(locObj.notEnoughGold.txt, "bold");
					}
				}
			}
			if (Structure==="Home") {
				if (game.gold >= Math.pow(config.costHome,(game.buildLevelH*1 + 1)) && game.buildLevelH < config.maxLevelHome) {
					game.gold               = game.gold - Math.pow(config.costHome,(game.buildLevelH*1 + 1));
					game.buildLevelH        = game.buildLevelH*1 + 1;
					commonBuild();
					return true;
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
			if (Structure==="Treasury") {
				if (game.gold >= Math.pow(config.costTreasury,(game.buildLevelTreasury*1 + 1))) {
					game.gold               = game.gold - Math.pow(config.costTreasury,(game.buildLevelTreasury*1 + 1));
					game.buildLevelTreasury = game.buildLevelTreasury*1 + 1;
					if (game.isTutorialState && !game.tips.includes("tutorial_treasury_guards")){
						game.tips.push("tutorial_treasury_guards");
						showModal(0, '', getAck, locObj.tutorial_treasury_guards.txt, locObj.okay.txt, '')
						updateImagesBuildingTab();
					}
					commonBuild();
					return true;
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
			if (Structure==="Gallows") {
				if (game.gold >= Math.pow(config.costGallows,(game.buildLevelGallows*1 + 1)) && game.buildLevelFountain == 0 && game.buildLevelGallows < config.maxLevelGallows) {
					game.gold               = game.gold - Math.pow(config.costGallows,(game.buildLevelGallows*1 + 1));
					game.buildLevelGallows  = game.buildLevelGallows*1 + 1;
					commonBuild();
					return true;
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
			if (Structure==="Fountain") {
				if (game.gold >= Math.pow(config.costFountain,(game.buildLevelFountain*1 + 1)) && game.buildLevelGallows == 0 && game.buildLevelGallows < config.maxLevelGallows) {
					game.gold               = game.gold - Math.pow(config.costFountain,(game.buildLevelFountain*1 + 1));
					game.buildLevelFountain = game.buildLevelFountain*1 + 1;
					commonBuild();
					return true;
				}//TODO make else
			}
			if (Structure==="Stash") {
				if (game.gold >= Math.pow(config.costStash,(game.buildLevelStash*1 + 1)) && game.buildLevelTreasury*1 > 0) {
					game.gold               = game.gold - Math.pow(config.costStash,(game.buildLevelStash*1 + 1));
					game.buildLevelStash    = game.buildLevelStash*1 + 1;
					commonBuild();
					return true;
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
			if (Structure==="University") {
				if (game.gold >= Math.pow(config.bldUniversityCost,(game.buildLevelUniversity*1 + 1))) {
					game.gold                 = game.gold - Math.pow(config.bldUniversityCost,(game.buildLevelUniversity*1 + 1));
					game.buildLevelUniversity = game.buildLevelUniversity*1 + 1;
					commonBuild();
					return true;
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
			if (Structure==="Inn") {
				//STORY
				if (game.gold >= Math.pow(config.costInn,(game.buildLevelInn*1 + 1)) && game.buildLevelInn < config.maxLevelInn) {
					game.gold               = game.gold - Math.pow(config.costInn,(game.buildLevelInn*1 + 1));
					game.buildLevelInn      = game.buildLevelInn*1 + 1;
					if (game.buildLevelInn===1) {
						game.generateMapCallback(true);
						if (!game.story.includes("story_catastrophe")){
							game.story.push("story_catastrophe");
							showModal(0, '', getAck, locObj.story1_catastrophe.txt, locObj.okay.txt, '')
						}
					}
					populateHeroesForHire();
					commonBuild();
					return true;
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
			if (Structure==="Stable") {
				if (game.gold >= Math.pow(config.costStable,(game.buildLevelStable*1 + 1)) && game.buildLevelStable < config.maxLevelStable) {
					game.gold               = game.gold - Math.pow(config.costStable,(game.buildLevelStable*1 + 1));
					if (game.buildLevelStable >= 1) {
						sergeantsData.attack++;
						sergeantsData.defence++;
						sergeantsData.health = Math.round(sergeantsData.health * 1.1);
					}
					if (game.buildLevelArchery >= 1) {
						turkopolsData.attack++;
						turkopolsData.defence++;
						turkopolsData.health = Math.round(turkopolsData.health * 1.1);
					}
					if (game.buildLevelStable >= 2) {
						knightsData.attack++;
						knightsData.defence++;
						knightsData.health = Math.round(knightsData.health * 1.2);
					}
					game.buildLevelStable   = game.buildLevelStable*1 + 1;
					commonBuild();
					return true;
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
			if (Structure==="Archery") {
				if (game.buildLevelStable>0){
					if (game.gold >= Math.pow(config.costArchery,(game.buildLevelArchery*1 + 1)) && game.buildLevelArchery < config.maxLevelArchery) {
						game.gold                = game.gold - Math.pow(config.costArchery,(game.buildLevelArchery*1 + 1));
						game.buildLevelArchery   = game.buildLevelArchery*1 + 1;
						commonBuild();
						return true;
					} else {
						postEventLog(locObj.notEnoughGold.txt, "bold");
					}
				} else {
					postEventLog(locObj.buildArchery.txt, "bold");
				}
			}
			function commonBuild() {
				updateUI();
				composite();
			}
		},
		buildGallowsOrFountain(objectToBuild) {
			var costOfBuilding = 0;
			if (objectToBuild==="Fountain") {
				costOfBuilding = config.costFountain;
				question = localeStrings[64].replace("%arg1",localeStrings[142]).replace("%arg2",localeStrings[141]);
			}
			if (objectToBuild==="Gallows") {
				costOfBuilding = config.costGallows;
				question = localeStrings[64].replace("%arg1",localeStrings[141]).replace("%arg2",localeStrings[142]);
			}
			if (game.gold > costOfBuilding) {
				if (game.buildLevelFountain === 0 && game.buildLevelGallows === 0) {
					the_objectToBuild = objectToBuild;
					showModal(1, '', game.buildGallowsOrFountainCallback, question, locObj.yes.txt, locObj.no.txt)
				} else {
					game.Build(objectToBuild);
				}
			} else {
				postEventLog(locObj.notEnoughGold.txt, "bold");
			}
		},
		buildGallowsOrFountainCallback() {
			if (answer === 2) {
				game.Build(the_objectToBuild);
			}
		},
		hireTreasuryGuardCost : function () {
			var hireCost =  config.treasuryGuardPriceHire;
			if (game.techLearned.includes("war_propaganda")){
				hireCost = hireCost * tech_list.war_propaganda.attrs["hire cost"];
				hireCost = Math.ceil(hireCost);
			}
			return hireCost;
		},
		hireTreasuryGuard : function () {
			if (game.buildLevelTreasury >= 1) {
				disabledElements.push("buttonFireGuard");
				disabledElements.push("buttonHireGuard");
				document.getElementById("buttonFireGuard").disabled = true;
				document.getElementById("buttonHireGuard").disabled = true;
				var question = locObj.dialogConfirmHireGuard.txt.replace("%arg1",game.hireTreasuryGuardCost()).replace("%arg2",config.treasuryGuardPricePayroll);
				showModal(1, '', game.hireTreasuryGuardCallback, question,  locObj.yes.txt, locObj.no.txt)
			} else {
				alertMsg = locObj.treasuryRequired.txt;
				showModal(0, '', getAck, alertMsg,  locObj.okay.txt, '')
			}
		},
		hireTreasuryGuardCallback : function () {
			if (answer === 2) {
				if (game.gold >= config.treasuryGuardPriceHire) {
					game.treasuryGuard = game.treasuryGuard*1 + 1;
					game.gold          = game.gold - game.hireTreasuryGuardCost();
					postEventLog(locObj.hiredGuardsman.txt);
					updateResources();
				} else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			}
			getAck();
		},
		fireTreasuryGuard : function () {
			if (game.treasuryGuard > 0) {
				disabledElements.push("buttonFireGuard");
				disabledElements.push("buttonHireGuard");
				document.getElementById("buttonFireGuard").disabled = true;
				document.getElementById("buttonHireGuard").disabled = true;
				qst = locObj.dialogConfirmDismssGuardsman.txt;
				showModal(1, '', game.fireTreasuryGuardCallback, qst,  locObj.yes.txt, locObj.no.txt)
			} else {
				postEventLog(locObj.noGuardsman.txt, "bold");
			}
		},
		fireTreasuryGuardCallback : function () {
			if (answer === 2) {
				game.treasuryGuard      = game.treasuryGuard*1 - 1;
				postEventLog(locObj.dismissedGuardsman.txt);
				updateResources();
			}
			getAck();
		},
		deathPenalty : function () {
			if (game.buildLevelGallows > 0) {
				if (game.pop > 2) {
					if (game.checkAudio('sfx', 'all')===true) {
						document.getElementById('gallowsAudio0').play();
					}
					game.pop          = game.pop - 1;
					getTypeOfCitizen  = Math.floor(Math.random()*100+1,0);
					if (getTypeOfCitizen >= 1 && getTypeOfCitizen < 50) {
						wealthShare     = 1/100*10;
						shareOfClass    = 50/100;
						citizensOfClass = Math.floor(shareOfClass*game.pop,0);
					}
					if (getTypeOfCitizen >= 50 && getTypeOfCitizen < 80) {
						wealthShare     = 1/100*20;
						shareOfClass    = 30/100;
						citizensOfClass = Math.floor(shareOfClass*game.pop,0);
					}
					if (getTypeOfCitizen >= 80 && getTypeOfCitizen <= 99) {
						wealthShare     = 1/100*30;
						shareOfClass    = 9/100;
						citizensOfClass = Math.floor(shareOfClass*game.pop,0);
					}
					if (getTypeOfCitizen > 99 && getTypeOfCitizen <= 100) {
						wealthShare     = 1/100*40;
						shareOfClass    = 1/100;
						citizensOfClass = Math.floor(shareOfClass*game.pop,0);
					}
					moneyToSeize    = Math.floor(game.gold*wealthShare*game.pop/game.popLimit()/8,0)+1;
					if (moneyToSeize > 5000){
						moneyToSeize = 5000;
					}
					rnd             = Math.floor((Math.random() * 6));
					reason          = locObj.execReasons[rnd].txt;
					msg             = localeStrings[34].replace("%arg1", reason);
					postEventLog(msg);
					msg             = localeStrings[35].replace("%arg1", moneyToSeize);
					postEventLog(msg);
					var gold_diff   = game.addMoneyToTreasury(moneyToSeize);
					if (gold_diff!==moneyToSeize){
						postEventLog(localeStrings[89].replace("%arg1", gold_diff));
					}
				} else {
					alertMsg        = localeStrings[36];
					showModal(0, '', getAck, alertMsg,  locObj.okay.txt, '')
				}
				updateResources();
			}
		},
		theftFromTreasury : function () {
			if (game.buildLevelTreasury > 0) {
				var guards = 0;
				guards    += game.sergeants + game.turkopols + game.knights;
				if (game.heroExists()===true) {
					if (game.myhero.status===0){// in town
						guards += game.myhero.sergeants + game.myhero.turkopols + game.myhero.knights;
					}
				}
				guards     = Math.ceil(guards / 4);
				guards    += game.treasuryGuard;
				rndThieves = Math.floor(Math.random()*(guards+1)+1);
				if (rndThieves === 1) {
					goldLost      = Math.floor(Math.random() * (game.gold/(1+game.buildLevelStash))/(guards-game.treasuryGuard+1)+1);
					if (goldLost > game.gold) {
						goldLost = game.gold;
					}
					if (game.checkAudio('sfx', 'events')===true) {
						document.getElementById('stealingAudio0').play();
					}
					game.gold     = game.gold - goldLost;
					msg = localeStrings[42].replace("%arg1", goldLost);
					postEventLog(msg);
					updateResources();
					if (game.isTutorialState && !game.tips.includes("tutorial_stash")){
						game.tips.push("tutorial_stash");
						showModal(0, '', getAck, locObj.tutorial_stash.txt, locObj.okay.txt, '')
					}
				} else {
					//TODO make a message about failed robbery
				}
			}
		},
		migration : function () {
			if (game.popLimit() > game.pop){
				rndPopPlus = Math.floor((Math.random() * 4) + 1);
				rnd        = Math.floor((Math.random() * 3) + 1);
				if (rndPopPlus > game.popLimit - game.pop) {
					rndPopPlus = game.popLimit - game.pop;
				}
				if (rnd === 1 && rndPopPlus > 0){
					game.pop += rndPopPlus;
					postEventLog(locObj.new_adepts.txt.replace("%arg1", rndPopPlus), "bold");
				}
				if (rnd === 2 && rndPopPlus > 0 && game.buildLevelFountain > 0){
					game.pop += rndPopPlus;
					postEventLog(locObj.people_arrive.txt.replace("%arg1", rndPopPlus), "bold");
				}
				if (rnd === 3 && game.buildLevelGallows  > 0){
					rndPopMinus = Math.floor((Math.random() * 3) + 1);
					if (game.pop - rndPopMinus > 2){
						game.pop -= rndPopMinus;
						postEventLog(locObj.people_leave.txt.replace("%arg1", rndPopMinus), "bold");
					}
				}
			}
		},
		startFire : function () {
			if (game.year > 1260) {
				if (game.fire === 0) {
					var rnd = Math.floor((Math.random() * 3) + 1);
					if (rnd === 1) {
						msg = "<b>%arg1</b>";
						msg = msg.replace("%arg1",localeStrings[38]);
						postEventLog(msg);
						game.fire = 1;
						if (game.checkAudio('sfx', 'actions')===true) {
							document.getElementById('fireAudio0').play();
						}
						composite();
						game.fireSteps = config.fireStepsBasic;
						document.getElementById("divFBProgress").innerHTML = localeStrings[275].replace("%arg1","0");
						if (game.fireGuard===1){
							document.getElementById("divFBProgress").style.display="inline";
						}
						document.getElementById("gameIcon").href="resources/favicon-flame.png";
						//TUTORIALS
						if (game.isTutorialState && !game.tips.includes("tutorial_firebrigade") && game.pop>=50){
							game.tips.push("tutorial_firebrigade");
							showModal(0, '', getAck, locObj.tutorial_firebrigade.txt, locObj.okay.txt, '')
						}
						//TODO make a certain building in fire, not just "city"
						if (game.buildLevelD == 1) {
							ceil = 1
						}
						if (game.buildLevelD == 2) {
							ceil = 2
						}
						rnd = Math.floor((Math.random() * 2) + 0);
						if (rnd === 0) {
							//	document.getElementById('constructions').innerHTML = document.getElementById('constructions').innerHTML+fire;
						}
						if (rnd === 1) {
							//	document.getElementById('constructions').innerHTML = document.getElementById('constructions').innerHTML+fire;
						}
						if (rnd === 0) {
							//	document.getElementById('constructions').innerHTML = document.getElementById('constructions').innerHTML+fire;
						}
					}
				} else {
					//you can't get another fire, while you do have previous still burning your city. For now.
				}
			}
		},
		putOutFire : function () {
			if (game.fire === 1) {
				question = localeStrings[39].replace("%arg1", config.costPutOutFire)
				showModal(1, '', game.putOutFireCallback, question,  locObj.yes.txt, locObj.no.txt)
			}
		},
		putOutFireCallback : function () {
			if (answer === 2) {
				if (game.gold >= config.costPutOutFire) {
					game.fire = 0;
					game.fireSteps = 0;
					game.gold = game.gold - config.costPutOutFire;
					game.putOutFireUI();
				}
				else {
					postEventLog(locObj.notEnoughGold.txt, "bold");
				}
			} else {
				msg = localeStrings[41];
				postEventLog(msg);
			}
		},
		putOutFireUI : function(load) {
			if (document.getElementById("fire_graphics") !== null) {
				document.getElementById("fire_graphics").setAttribute("style", "position:absolute; top:200px; left:200px; z-index=100; display:none");
				document.getElementById("buttonPutOutFire").setAttribute("style", "top:390px; left: 20px; display:none");
				document.getElementById("gameIcon").href="resources/favicon-normal.png";
				document.getElementById("divFBProgress").style.display="none";
				if (load!==true){
					msg = localeStrings[40];
					postEventLog(msg);
				}
				updateResources();
			}
		},
		winLottery : function () {
			msg = localeStrings[43].replace("%arg1", config.lotteryPrize);
			postEventLog(msg);
			var gold_diff = game.addMoneyToTreasury(config.lotteryPrize);
			if (gold_diff!==config.lotteryPrize){
				postEventLog(localeStrings[89].replace("%arg1", gold_diff));
			}
			updateResources();
		},
		chestCityAppear : function () {
			game.chestCity = 1;
			chest_timer = setTimeout(game.chestCityDisappear, config.chestCity_timeout);
			composite();
		},
		chestCityDisappear : function () {
			game.chestCity = 0;
			removeIndex = buildingsInTown.indexOf('chest');
			deleteFromArray(buildingsInTown, removeIndex);
			composite();
		},
		chestCityOpen : function () {
			msg = locObj.city_chest_gold.txt.replace("%arg1", config.chestCity);
			postEventLog(msg);
			var gold_diff = game.addMoneyToTreasury(config.chestCity);
			if (gold_diff!==config.chestCity){
				postEventLog(localeStrings[89].replace("%arg1", gold_diff));
			}
			updateResources();
			//REMOVE THE CHEST
			game.chestCityDisappear();
		},
		startPlague : function () {
			if (game.year > 1265) {
				rnd = Math.floor((Math.random() * 15) + 1);
				if (rnd === 1) {
					if (game.pop > 2) {
						numberOfDied = Math.floor(Math.random() * (game.pop*0.65)+game.pop*0.10+1);
						if (numberOfDied>game.pop-2){
							numberOfDied = game.pop-2;
						}
						game.pop     = game.pop - numberOfDied;
						msg = msg = locObj.plague.txt.replace("%arg1", numberOfDied);
						if (game.checkAudio('sfx', 'events')===true) {
							document.getElementById('plagueAudio0').play();
						}
						postEventLog(msg);
						updateResources();
					}
				}
				if (rnd === 2) {
					if (game.pop > 2) {
						if (game.turkopols>0){
							if (game.checkAudio('sfx', 'events')===true) {
								document.getElementById('archeryAudio0').play();
							}
							postEventLog(locObj.plague_turk.txt);
						} else {
							army_count = game.treasuryGuard+game.sergeants+game.knights;
							if (army_count > 0) {
								numberOfDied = Math.floor(Math.random() * (army_count*0.5)+1);
								if (numberOfDied > army_count) {
									numberOfDied = army_count
								}
								if (game.checkAudio('sfx', 'events')===true) {
									document.getElementById('plagueAudio0').play();
								}
								deceased = 0;
								while (deceased < numberOfDied && game.treasuryGuard>0){
									game.treasuryGuard=game.treasuryGuard-1;
									deceased = deceased+1;
								}
								if (deceased < numberOfDied){
									while (deceased < numberOfDied && game.sergeants>0){
										game.sergeants=game.sergeants-1;
										deceased = deceased+1;
									}
								}
								if (deceased < numberOfDied){
									while (deceased < numberOfDied && game.knights>0){
										game.knights=game.knights-1;
										deceased = deceased+1;
									}
								}
								console.log("so the random value of numberOfDied in the army is "+numberOfDied);
								console.log("and number actually deceased troops is "+deceased);
								postEventLog(locObj.plague_army.txt.replace("%arg1", numberOfDied));
								updateTroopsNumbers();
								updateResources();
							}
						}
					}
				}
				if (rnd === 3) {
					army_count = game.treasuryGuard+game.sergeants+game.knights;
					if (army_count > 0) {
						numberOfDied = Math.floor(Math.random() * (army_count*0.5)+1);
						if (numberOfDied > army_count) {
							numberOfDied = army_count
						}
						if (game.checkAudio('sfx', 'events')===true) {
							document.getElementById('plagueAudio0').play();
						}
						deceased = 0;
						while (deceased < numberOfDied && game.treasuryGuard>0){
							game.treasuryGuard=game.treasuryGuard-1;
							deceased = deceased+1;
						}
						if (deceased < numberOfDied){
							while (deceased < numberOfDied && game.sergeants>0){
								game.sergeants=game.sergeants-1;
								deceased = deceased+1;
							}
						}
						if (deceased < numberOfDied){
							while (deceased < numberOfDied && game.knights>0){
								game.knights=game.knights-1;
								deceased = deceased+1;
							}
						}
						console.log("so the random value of numberOfDied in the army is "+numberOfDied);
						console.log("and number actually deceased troops is "+deceased);
						postEventLog(locObj.plague_army.txt.replace("%arg1", numberOfDied));
						updateTroopsNumbers();
						updateResources();
					} else {
						if (game.pop > 2) {
							numberOfDied = Math.floor(Math.random() * (game.pop*0.65)+game.pop*0.10+1);
							if (numberOfDied>game.pop-2){
								numberOfDied = game.pop-2;
							}
							game.pop     = game.pop - numberOfDied;
							msg = locObj.plague.txt.replace("%arg1", numberOfDied);
							if (game.checkAudio('sfx', 'events')===true) {
								document.getElementById('plagueAudio0').play();
							}
							postEventLog(msg);
							updateResources();
						}
					}
				}
			}
		}
	};
	//init const-variables

	var tabLinks 		= document.querySelectorAll('.tab-link');
	var tabs = document.querySelectorAll('.tab');

	function openTab(evt, tabName) {
		if (tabName==="Explore"){
			game.active_tab="Explore";
		} else {
			game.active_tab="";
		}
		if (tabName==="Settings"){
			document.getElementById("lblStnUIDValue").innerHTML = game.UID;
			document.getElementById("inpStnAliasValue").value = game.alias;
		}

		tabs.forEach(tab => {
			if (tab.classList.contains('active')) {
				tab.classList.remove('active');
			}

			if (tab.getAttribute('id') === tabName) {
				tab.classList.add('active');
			}

		});

		tabLinks.forEach(tabLink => {
			if (tabLink.classList.contains('active')) {
				tabLink.classList.remove('active');
			}
		});


		if (evt !== null) {
			evt.currentTarget.classList.add('active');
		}
		if (tabName==="tabTroopsHiring"){
			if (game.isTutorialState && !game.tips.includes("tutorial_moving_troops") && game.heroExists()){
				game.tips.push("tutorial_moving_troops");
				showModal(0, '', getAck, locObj.tutorial_moving_troops.txt, locObj.okay.txt, '');
			}
		}
	}
	document.getElementById("tabCity").click();


	// 2. Выносим сюда config и game





	//TOWN
	var canvas  	= document.getElementById("canvas");
	var canvasPos   = getElementPosition(canvas);

	canvas.addEventListener("touchstart", tap);
	canvas.addEventListener("mousedown", tap);
	canvasScaleRatio = canvas.width / canvas.offsetWidth;
	languageDefined = 0;

	var ctx     = canvas.getContext("2d");
	// use forward slashes for Linux and Windows compatible.

	var resourceDir = './resources/'

	var RES_NAME_SUFFIX = {
		AUTUMN:	'_a',
		WINTER: '_w',
		SPRING:	'_s',
	};

	Object.freeze(RES_NAME_SUFFIX);

	function prepareResPath(resourceName) {
		switch(config.theme) {
			case 'autumn'	: return resourceDir + resourceName + RES_NAME_SUFFIX.AUTUMN + '.png';
			case 'winter'	: return resourceDir + resourceName + RES_NAME_SUFFIX.WINTER + '.png';
			case 'spring'	: return resourceDir + resourceName + RES_NAME_SUFFIX.SPRING + '.png';
			default				: return resourceDir + resourceName + '.png';
		}
	}

	function loadImage(src, onload) {
		var img = new Image();
		img.onload = onload;
		img.src = src;
		return img;
	}

	//use forward slashes for Linux and Windows compatible. \ this slash works only in Windows.

	var img1 		= loadImage(prepareResPath('background_a'), composite);
	var img2 		= loadImage(prepareResPath('sawmill_a'), composite);
	var img5 		= loadImage(prepareResPath('home_as'), composite);
	var img5_1  = loadImage(prepareResPath('house_as'), composite);
	var img6_1  = loadImage(prepareResPath('wallsr_a'), composite);
	var img6_2  = loadImage(prepareResPath('wallsf_a'), composite);
	var img7    = loadImage(prepareResPath('castle_as'), composite);
	var img71   = loadImage(prepareResPath('castle_st'), composite);
	var img8    = loadImage(prepareResPath('wishing_well_builded'), composite);
	var img9    = loadImage(prepareResPath('treasury_as'), composite);
	var img10   = loadImage(prepareResPath('gallows'), composite);
	var img11   = loadImage(prepareResPath('fountain'), composite);
	var img14   = loadImage(prepareResPath('inn'), composite);

	var img15   = loadImage('resources/fire_a.gif', composite);
	img15.id    = "fire_graphics";

	var img16   = loadImage(prepareResPath('stable'), composite);
	var img17   = loadImage(prepareResPath('archery_range'), composite);

	var smoke_anm      = loadImage('resources/smoke.gif', composite);
	var smoke_anm2     = loadImage('resources/smoke.gif', composite);
	var chest_img      = loadImage(prepareResPath('chest'), composite);
	var university_img = loadImage(prepareResPath('university2'), composite);
	var university   = {
		name: 'university',
		x: 550,
		y: 250,
		w: 96,
		h: 96
	}
	var sawmill = {
		name: 'sawmill',
		x: 670,
		y: 65,
		w: 110,
		h: 56
	};

	var well = {
		name: 'well',
		x: 230,
		y: 200,
		w: 41,
		h: 47
	};

	var home = {
		name: 'home',
		x: 90,
		y: 160,
		w: 80,
		h: 90
	};

	var house = {
		name: 'house',
		x: 90,
		y: 160,
		w: 113,
		h: 125,
	};

	var wall = {
		name: 'wall',
		x: 340,
		y: 400,
		w: 115,
		h: 50
	};

	var tower = {
		name: 'tower',
		x: 300,
		y: 160,
		w: 180,
		h: 160
	};

	var castle = {
		name: 'castle',
		x: 300,
		y: 160,
		w: 195,
		h: 175
	};

	var castle_st = {
		name: 'stone_castle',
		x: 300,
		y: 160,
		w: 195,
		h: 175
	};

	var treasury = {
		name: 'treasury',
		x: 200,
		y: 270,
		w: 125,
		h: 120
	};

	var gallows = {
		name: 'gallows',
		x: 485,
		y: 270,
		w: 50,
		h: 75
	};

	var fountain = {
		name: 'fountain',
		x: 485,
		y: 290,
		w: 70,
		h: 55
	};

	var stable = {
		name: 'stable',
		x: 480,
		y: 100,
		w: 160,
		h: 120
	};

	var archery = {
		name: 'archery',
		x: 390,
		y: 90,
		w: 80,
		h: 80
	};

	var inn = {
		name: 'inn',
		x: 270,
		y: 80,
		w: 87,
		h: 79
	};

	var chest = {
		name: 'chest',
		x: 0,
		y: 0,
		w: 48,
		h: 48,
	}

	var buildingsInTown = [];

	function inArray (arrayToCheck, valueToCheck) {
		 return arrayToCheck.indexOf(valueToCheck) > -1;
	}
	function deleteFromArray (arrayToMod, indexToDelete) {
		arrayLenght                = arrayToMod.length;
		tArrayBeforeDeletedElement = arrayToMod.slice(0,indexToDelete);
		tArrayAfterDeletedElement  = arrayToMod.slice(indexToDelete+1,arrayToMod.length);
		tResultArray               = tArrayBeforeDeletedElement.concat(tArrayAfterDeletedElement);
		return tResultArray;
	}
	function removeFromArrays (elementIndex) {
		buildingsInTownB = deleteFromArray(buildingsInTownB, elementIndex);
		buildingsInTownX = deleteFromArray(buildingsInTownX, elementIndex);
		buildingsInTownY = deleteFromArray(buildingsInTownY, elementIndex);
		buildingsInTownW = deleteFromArray(buildingsInTownW, elementIndex);
		buildingsInTownH = deleteFromArray(buildingsInTownH, elementIndex);
	}
	var Singleton = (function () {
		var instance;
		function createInstance() {
			var object = loadImage('resources/fire_static.png');
			return object;
		}
		return {
			getInstance: function () {
				if (!instance) {
					instance = createInstance();
				}
				return instance;
			}
		};
	})();

	function pushBuilding(buildingObj) {
		if (buildingsInTown.includes(buildingObj)) {
			return
		}

		if (buildingObj.name === house.name) {
			const index = buildingsInTown.findIndex(function (building) {
				return building.name === home.name;
			});
			if (index > -1) {
				buildingsInTown.splice(index, 1);
			}
		}


		if (buildingObj.name === castle_st.name) {
			const index = buildingsInTown.findIndex(function (building) {
				return building.name === castle.name;
			});
			if (index > -1) {
				buildingsInTown.splice(index, 1);
			}
		}

		buildingsInTown.push(buildingObj);
	};

	function composite() {
		ctx.clearRect(0, 0, 800, 480);
		ctx.drawImage(img1, 0, 0);   //draw background
		ctx.drawImage(img2, sawmill.x, sawmill.y);//draw sawmill
		pushBuilding(sawmill);

		ctx.drawImage(img8, well.x, well.y); //draw wishing well
		pushBuilding(well);
		if (game.buildLevelD > 0) {
			// draw back piece of wall
			ctx.drawImage(img6_1, 0, 0);
			// draw front piece of wall
			ctx.drawImage(img6_2, 0, 0);
			//pushing gatehouse of the wall
			pushBuilding(wall);
		}
		if (game.buildLevelH > 0 && game.buildLevelH < 10) {
			// draw homes
			ctx.drawImage(img5, home.x, home.y);
			pushBuilding(home);
			smoke_anm.style   = 'position:absolute; top: 0; left: 0;';
			document.getElementById("events_graphics").appendChild(smoke_anm);
		}

		if (game.buildLevelH >= 10) {
			// draw more houses
			ctx.drawImage(img5_1, house.x, house.y);
			pushBuilding(house);
			smoke_anm.style   = 'position:absolute; top: 0; left: 30px;';
			document.getElementById("events_graphics").appendChild(smoke_anm);
			smoke_anm2.style   = 'position:absolute; top: 30px; left: 0';
			document.getElementById("events_graphics").appendChild(smoke_anm2);
		}
		if (game.buildLevelD === 2) {
			// draw castle
			ctx.drawImage(img7, castle.x, castle.y);
			pushBuilding(castle);
		}
		if (game.buildLevelD === 3) {
			// draw castle
			ctx.drawImage(img71, castle_st.x, castle_st.y);
			pushBuilding(castle_st);
		}
		if (game.buildLevelTreasury > 0) {
			// draw treasury
			ctx.drawImage(img9, treasury.x, treasury.y);
			pushBuilding(treasury);
		}
		if (game.buildLevelGallows > 0) {
			// draw gallows
			ctx.drawImage(img10, gallows.x, gallows.y);
			pushBuilding(gallows);
		}
		if (game.buildLevelFountain > 0) {
			// draw fountain
			ctx.drawImage(img11, fountain.x, fountain.y);
			pushBuilding(fountain);
		}
		if (game.buildLevelStash > 0) {
			//We do not draw a secret Stash under the Treasury. It's a secret, do you understand?!
		}
		if (game.buildLevelInn > 0) {
			ctx.drawImage(img14, inn.x, inn.y);
			pushBuilding(inn);
		}

		if (game.buildLevelStable > 0) {
			ctx.drawImage(img16, stable.x, stable.y);
			pushBuilding(stable);
		}

		if (game.buildLevelUniversity > 0) {
			ctx.drawImage(university_img, university.x, university.y);
			pushBuilding(university);
		}

		if (game.buildLevelArchery > 0) {
			ctx.drawImage(img17, archery.x, archery.y);
			pushBuilding(archery);
		}

		if (game.fire === 1) {
			img15.style   = 'position:absolute; top:240px; left:80px; z-index:8';
			document.getElementById("events_graphics").appendChild(img15);
			//img15.style   = 'position:absolute; top:170px; left:0px; z-index:8';
			// document.getElementById("fire_graphics").setAttribute("onclick", "game.putOutFire()");
			document.getElementById("buttonPutOutFire").style.display="block";
		}
		if (game.chestCity === 1) {
			chest.x = Math.floor(Math.random() * (800-chest.w*2)+chest.w);
			chest.y = Math.floor(Math.random() * (480-chest.h*2)+chest.h);
			ctx.drawImage(chest_img, chest.x, chest.y);
			pushBuilding(chest);
		}
	}
	function loadImage(src, onload) {
		var img = new Image();
		img.onload = onload;
		img.src = src;
		return img;
	}
	function getElementPosition (element) {
		//thanks to William Alone
		var parentOffset,
				pos = {
					x: element.offsetLeft,
					y: element.offsetTop
				};
		if (element.offsetParent) {
			parentOffset = getElementPosition(element.offsetParent);
			pos.x += parentOffset.x;
			pos.y += parentOffset.y;
		}
		return pos;
	}

	function tap (e) {
		var x = (e.pageX - canvasPos.x) * canvasScaleRatio;
		var y = (e.pageY - canvasPos.y) * canvasScaleRatio;

		buildingsInTown.forEach(function(element) {
			if (y > element.y && y < element.y + element.h && x > element.x && x < element.x + element.w) {
				buildingClick(element.name)
			}
		});

	}
	function buildingClick(buildingName){
		console.log('buildingName: ', buildingName);
		var showAlert = true;
		alertMsg = "";
		if (buildingName==='amber'){
			alertMsg = localeStrings[90];
		}
		if (buildingName==='well') {
			showAlert = false;
			checkFirebrigade();
		}
		if (buildingName==='gold') {
			showAlert = false;
			checkGold();
		}
		if (buildingName==='pop') {
			//alertMsg = localeStrings[145];
			showAlert = false;
			checkPop();
		}
		if (buildingName==='sawmill') {
			showAlert = false;
			if (game.checkAudio('sfx', 'all')===true) {
				var arnd = Math.floor(Math.random() * 3);
				var Audio = 'sawmillAudio'+arnd;
				document.getElementById(Audio).play();
			}
			//alertMsg = localeStrings[133];
		}
		if (buildingName==='wall') {
			//alertMsg = localeStrings[134];
		}
		if (buildingName==='university') {
			showAlert = false;
			updateUI();
			openTab(null, 'tabUniversity');
		}
		if (buildingName==='swall') {
			//alertMsg = localeStrings[135];
		}
		if (buildingName==='home') {
			showAlert = false;
			checkPop();
		}
		if (buildingName==='house') {
			showAlert = false;
			checkPop();
		}
		if (buildingName==='castle') {
			showAlert = false;
			alertMsg = localeStrings[136];
		}
		if (buildingName==='stone_castle') {
			showAlert = false;
			alertMsg = localeStrings[137];
		}
		if (buildingName==='inn') {
			//alertMsg = localeStrings[140];
			showAlert = false;
			if (game.checkAudio('sfx', 'all')===true) {
				document.getElementById('innAudio0').play();
			}
			openTab(null, 'tabInn');
		}
		if (buildingName==='gallows') {
			//alertMsg = localeStrings[141];
			showAlert = false;
			game.deathPenalty();
		}
		if (buildingName==='fountain') {
			showAlert = false;
			if (game.checkAudio('sfx', 'all')===true) {
				document.getElementById('fountainAudio0').play();
			}
			game.makeFestival();
		}
		if (buildingName==='treasury') {
			openTab(null, 'tabGarrison');
			if (game.checkAudio('sfx', 'all')===true) {
				var arnd = Math.floor(Math.random() * 3);
				var Audio = 'treasuryAudio'+arnd;
				document.getElementById(Audio).play();
			}
		}
		if (buildingName==='stable') {
			showAlert = false;
			if (game.checkAudio('sfx', 'all')===true) {
				var arnd = Math.floor(Math.random() * 3);
				var Audio = 'stableAudio'+arnd;
				document.getElementById(Audio).play();
			}
			updateUI();
			openTab(null, 'tabTroopsHiring');
		}
		if (buildingName==='archery') {
			showAlert = false;
			if (game.checkAudio('sfx', 'all')===true) {
				var arnd = Math.floor(Math.random() * 3);
				var Audio = 'archeryAudio'+arnd;
				document.getElementById(Audio).play();
			}
			updateUI();
			openTab(null, 'tabTroopsHiring');
		}
		if (buildingName === chest.name) {
			showAlert = false;
			game.chestCityOpen();
		}
		if (showAlert === true &&  alertMsg !=="" ) {
			showModal(0, '', getAck, alertMsg,  locObj.okay.txt, '')
		}
	}
	//composite();

//THE GAME


/*-- New --*/

var WeightedRandom = function() {
  this.entries = [];
  this.accumulatedWeight = 0.0;
};

WeightedRandom.prototype.addEntry = function(object, weight) {
  this.accumulatedWeight += weight;
  this.entries.push( { object: object, accumulatedWeight: this.accumulatedWeight });
}

WeightedRandom.prototype.getRandom = function() {
  var r = Math.random() * this.accumulatedWeight;
  return this.entries.find(function(entry) {
    return entry.accumulatedWeight >= r;
  }).object;
};

WeightedRandom.prototype.hasEntry = function (name) {
	var index = this.entries.findIndex(function (item) {
		if (item.object && item.object.name === name) {
			return item;
		}
	});
	return index > -1;
};

WeightedRandom.prototype.clearEntriesList = function() {
	this.entries = [];
	this.accumulatedWeight = 0.0;
};


	function randomFromRange(min, max) {
	  let rand = min - 0.5 + Math.random() * (max - min + 1);
	  if (rand < 0) { rand *= -1 };
	  return Math.round(rand);
	};

	function isEmptyObj(obj) {
		for (var key in obj) return false;
		return true;
	};

	function objSize(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};


	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	//init variables
	var disabledElements = [];
	var hiddenElements = []; // Cache for hidden UI elements; NOTE: Do not clear it, temp fix for tutorial elements.
	flag_event_started = 0;
	allowMvt = 1;
	curObjId = "";


	//OTHERWISE RECORDS ONLY ADDS AND STACKS IN THE SAME OBJECT FOR DIFFERENT HEROES
	//CANDIDATE FOR DELETING
	//var heroAttributesRandomizer = new WeightedRandom();

	var enemyRandomizer = new WeightedRandom();
	function Monster(monster, coordx, coordy, monsterData) {
		this.monster = monster;
		this.coordx = coordx;
		this.coordy = coordy;
		this.name   	= monsterData.name;
		this.minDmg 	= monsterData.minDmg;
		this.maxDmg 	= monsterData.maxDmg;
		this.attack 	= monsterData.attack;
		this.defence	= monsterData.defence;
		this.count 		= monsterData.defence;
		this.health 	= monsterData.health;
	}




	//init service variables
	var cnt_cursession= 0;
	var delimiter     = ";"
	var nightMode     = 0;
	var dcounter_def  = 30;
	var dcounter      = dcounter_def;
	var curHeroForHire= 0;
	var heroesForHire = [];
	var dialogShown   = false;
	if (typeof updateResources === "function") { updateResources() }
	var autosaveObject;
	//setupAutosave();//DEBUG
	//composite();

	include('localisation.js',function(){
		loadStartLocale();
	});

	openLog();
	setInterval(cooldown, config.oneSecMS);
	endOfTurnObj = setInterval(endOfTurnTimer, config.oneSecMS);

	//functions
	function openTabAutocampaignJournal() {
		openTab(null, 'tabAutocampaignJournal');
		scrollDown();
	}
	function openTabAutocampaignBattle() {
		openTab(null, 'tabAutocampaignBattle');
		scrollDown();
	}

	function checkSaves() {

		if (localStorage.getItem('game')!==null) {
			document.getElementById("loadGameButton").style.display = "block";
		} else {
			if (game.isTutorialState && !game.tips.includes("tutorial0-welcome0")){
				game.tips.push("tutorial0-welcome0");
				showModal(0, '', getAck, locObj.tutorial0_w0.txt, locObj.okay.txt, locObj.skipTutorial.txt)
			}
		}

	}

	function getAck() {
		if (answer === 3) {
			console.log("before changing tutorial state");
			game.isTutorialState = false;
			// document.getElementById("tabBuilding").classList.remove('is-tutorial');
			for (var i=0; i<disabledElements.length; i++) {
				document.getElementById(disabledElements[i]).disabled = false;
			}
			hiddenElements = document.querySelectorAll('.is-tutorial');
			if (hiddenElements.length) {
				hiddenElements.forEach(function (el) {
					el.classList.remove('is-tutorial');
				})
			}
		}

		for (var i=0; i<disabledElements.length; i++) {
			console.log('we are inside the loop');
			document.getElementById(disabledElements[i]).disabled = false;
		}
		disabledElements = [];
		dialogShown = false;
	}
	function reloadLang() {
		var x = document.getElementById("selectLng").selectedIndex;
		var y = document.getElementById("selectLng").options;
		language = escape(y[x].value); //y[x].id, text, index
		loadLocale(language);
	}
	function localeCallback(returnLanguage) {
		if (returnLanguage==='en-US') {
			document.getElementById("selectLng").selectedIndex=0;
		}
		if (returnLanguage==='ru-RU') {
			document.getElementById("selectLng").selectedIndex=1;
		}
		if (returnLanguage==='de-DE') {
			document.getElementById("selectLng").selectedIndex=2;
		}
		if (returnLanguage==='eo') {
			document.getElementById("selectLng").selectedIndex=3;
		}
		if (returnLanguage==='fr-FR') {
			document.getElementById("selectLng").selectedIndex=4;
		}
		if (returnLanguage==='fi-FI') {
			document.getElementById("selectLng").selectedIndex=5;
		}
		document.getElementById("buttonPutOutFire").innerText    = localeStrings[53];
		document.getElementById("buttonDeathPenalty").innerText  = localeStrings[54];
		document.getElementById("saveGameButton").innerText      = localeStrings[44];
		document.getElementById("loadGameButton").innerText      = localeStrings[45];
		document.getElementById("tabCity").innerText             = localeStrings[46];
		//document.getElementById("tabExplore").innerText          = localeStrings[47];
		document.getElementById("tabSettings").innerText         = localeStrings[48];
		//document.getElementById("tabGarrison").innerText         = localeStrings[49];
		document.getElementById("tabBuilding").innerText         = localeStrings[50];
		document.getElementById("tabAbout").innerText            = localeStrings[51];
		document.getElementById("tabDiscord").innerText          = localeStrings[52];
		document.getElementById("labelSettings").innerText       = localeStrings[66];
		document.getElementById("labelSettings").innerText       = localeStrings[66];
		document.getElementById("buttonExportGame").innerText    = localeStrings[67];
		document.getElementById("buttonImportGame").innerText    = localeStrings[68];
		document.getElementById("labelAutosave").innerText       = localeStrings[69];
		document.getElementById("labelGarrison").innerText       = localeStrings[91];
		document.getElementById("buttonFireGuard").innerText     = localeStrings[92];
		document.getElementById("buttonHireGuard").innerText     = localeStrings[93];
		document.getElementById("labelBuilding").innerText       = localeStrings[106];
		document.getElementById("lblAboutGame").innerHTML        = localeStrings[131].replace("%arg1",config.treasuryGuardPriceHire).replace("%arg2",config.treasuryGuardPricePayroll);
		document.getElementById("lblTabPop").innerText           = localeStrings[161];
		document.getElementById("lblTabGold").innerText          = localeStrings[164];
		document.getElementById("btnColorMode").innerText        = localeStrings[70];
		document.getElementById("lblTabInn").innerText           = localeStrings[181];
		document.getElementById("lblUpkeepSrc").innerText        = localeStrings[279];
		document.getElementById("selectUpkeepSrc")[0].text       = localeStrings[284];
		document.getElementById("selectUpkeepSrc")[1].text       = localeStrings[285];
		document.getElementById("btnColorMode").innerText        = localeStrings[70];
		document.getElementById("btnDismissHero").innerText      = localeStrings[217];
		//document.getElementById("btnAutocampaign").innerText     = localeStrings[218];
		document.getElementById("btnAutocampaignJournal").innerText  = localeStrings[220];
		document.getElementById("btnTowngate").innerText         = localeStrings[221];
		document.getElementById("btnLeaveCity").innerText        = localeStrings[222];
		document.getElementById("btnGenerateMap").innerText      = localeStrings[223];

		document.getElementById("btnAutobattlesList").innerText  = locObj.autobattle_journal_btn.txt;

		document.getElementById("lblOption").innerText           = localeStrings[71];
		document.getElementById("lblOn").innerText               = localeStrings[72];
		document.getElementById("lblOff").innerText              = localeStrings[73];
		document.getElementById("lblSfxAll").innerText           = localeStrings[74];
		document.getElementById("lblSfxEvt").innerText           = localeStrings[75];
		document.getElementById("lblSfxEvtAR").innerText         = localeStrings[76];
		document.getElementById("lblMscAll").innerText           = localeStrings[77];
		document.getElementById("lblMscScr").innerText           = localeStrings[78];
		document.getElementById("btnToGeneralSettings").innerText= localeStrings[79];

		document.getElementById("btnToInn").innerText            = localeStrings[79];
		document.getElementById("btnToInn1").innerText           = localeStrings[79];

		document.getElementById("lblSoundMenu").innerText        = localeStrings[80];
		document.getElementById("btnSoundSettings").innerText    = localeStrings[81];
		document.getElementById("lblStnMobileUI").innerText      = localeStrings[82];
		document.getElementById("lblStnEventLogSize").innerText  = localeStrings[83];
		document.getElementById("lblStnLines").innerText         = localeStrings[84];
		/*
		document.getElementById("lblTroopsHiring").innerText     = localeStrings[94];
		document.getElementById("btnHireSergeant").innerHTML     = localeStrings[97].replace("%arg1",config.sergeantHiring);
		document.getElementById("btnHireTurkopol").innerHTML     = localeStrings[98].replace("%arg1",config.turkopolHiring);
		document.getElementById("btnHireKnight").innerHTML       = localeStrings[99].replace("%arg1",config.knightHiring);
		document.getElementById("lblTabHiringTroopsSergeantsGarrison").innerText       = localeStrings[100];
		document.getElementById("lblTabHiringTroopsTurkopolsGarrison").innerText       = localeStrings[101];
		document.getElementById("lblTabHiringTroopsKnightsGarrison").innerText         = localeStrings[102];
		document.getElementById("lblTabHiringTroopsSergeantsHeroSquad").innerText      = localeStrings[100];
		document.getElementById("lblTabHiringTroopsTurkopolsHeroSquad").innerText      = localeStrings[101];
		document.getElementById("lblTabHiringTroopsKnightsHeroSquad").innerText        = localeStrings[102];
		document.getElementById("lblTabHiringTroopsKnightsHeroSquad").innerText        = localeStrings[102];
		*/
		document.getElementById("lblGoodsForSale").innerText     = localeStrings[260];

		//document.getElementById("lblArtefactSellPrice").innerText= localeStrings[261];
		//document.getElementById("lblArtefactBuyPrice").innerText = localeStrings[261];
		//document.getElementById("btnBuyArtefact").innerText      = localeStrings[262];
		document.getElementById("lblGoodsForBuying").innerText   = localeStrings[263];
		//document.getElementById("btnSellArtefact").innerText     = localeStrings[264];
		document.getElementById("btnLeaveBlackmarket").innerText = localeStrings[222];
		document.getElementById("lblFirebrigade").innerText      = localeStrings[270];
		document.getElementById("lblFBOption").innerText         = localeStrings[271];
		document.getElementById("lblFBOn").innerText             = localeStrings[272];
		document.getElementById("lblFBOff").innerText            = localeStrings[273];
		document.getElementById("lblFBUpKeepPrice").innerText    = localeStrings[274];
		document.getElementById("btnPopAtStart").innerText       = localeStrings[157];
		document.getElementById("btnGoldAtStart").innerText      = localeStrings[157];
		document.getElementById("btnPopPrev").innerText          = localeStrings[158];
		document.getElementById("btnGoldPrev").innerText         = localeStrings[158];
		document.getElementById("btnPopNext").innerText          = localeStrings[159];
		document.getElementById("btnGoldNext").innerText         = localeStrings[159];
		document.getElementById("btnPopAtEnd").innerText         = localeStrings[160];
		document.getElementById("btnGoldAtEnd").innerText        = localeStrings[160];
		document.getElementById("downloadGame").innerText        = localeStrings[328];
		document.getElementById("lblLevelForHireLbl").innerText  = locObj.heroLvlLbl.txt;
		document.getElementById("spnServerStatusLabel").innerText= locObj.serverStatusSpn.txt;
        document.getElementById("spnServerStatusValue").innerText= locObj.serverStatusND.txt;
        document.getElementById("spnOnline").innerText           = locObj.online.txt;
        document.getElementById("spnOnlineValue").innerText      = locObj.onlineValueND.txt;
		if (typeof populateHeroesForHire === "function") { populateHeroesForHire() };
		checkSaves();
		welcomeMsg();
		updateButtonCaptions();
		loadArtifacts();
		updateUI();
	}
    // TODO every third cell is provoke hero to attack stance
	function loadArtifacts(){
		include('js/objects_artifacts.js',function(){
		});
	}
	function welcomeMsg(){
		postEventLog(locObj.welcome0.txt);
		postEventLog(locObj.welcome1.txt);
		postEventLog(locObj.welcome2.txt);
	}
	function postEventLog(msgEventLog, styling) {
        if (typeof styling !== 'undefined') {
            styling = styling.toUpperCase();
        } else {
            styling = "";
        }
        styling = styling.toUpperCase();
        if (styling.indexOf("BOLD")!==-1){
            msgEventLog = "<b>"+msgEventLog+"</b>";
        }
        if (styling.indexOf("ITALIC")!==-1){
            msgEventLog = "<i>"+msgEventLog+"</i>";
        }
        if (styling.indexOf("RED")!==-1){
            msgEventLog = "<font color='red'>"+msgEventLog+"</font>";
        }
		document.getElementById("log").innerHTML += getTime(0)+": "+msgEventLog+"<br>";
		scrollDown();
	}
	function clearJournalLog() {
		document.getElementById("lblAutocampaignJournal").innerHTML = "";
	}

	function createJournalAccordion() {
		var accordionContainerElement = document.createElement('div');
		var accordionHeaderElement    = document.createElement('div');
		var accordionBodyElement      = document.createElement('div');

		accordionContainerElement.classList.add('accordion', 'active');
		accordionHeaderElement.classList.add('accordion-header');
		accordionBodyElement.classList.add('accordion-body');

		game.autocampaignCounter++;

		let previousCampaignList = document.querySelectorAll('.accordion');

		previousCampaignList.forEach(function (item) {
			if (item.classList.contains('active')) {
				item.classList.remove('active');
			}
		});

		accordionBodyElement.setAttribute('id', 'accordionBody-' + game.autocampaignCounter);
		accordionHeaderElement.innerText = locObj.campaignTitle.txt.replace("%arg1", game.autocampaignCounter);

		accordionContainerElement.appendChild(accordionHeaderElement);
		accordionContainerElement.appendChild(accordionBodyElement);


		document.getElementById("lblAutocampaignJournal").appendChild(accordionContainerElement);
	}


	function createBattleAccordion() {
		var accordionContainerElement = document.createElement('div');
		var accordionHeaderElement    = document.createElement('div');
		var accordionBodyElement      = document.createElement('div');

		accordionContainerElement.classList.add('accordion-battle', 'active');
		accordionHeaderElement.classList.add('accordion-battle-header');
		accordionBodyElement.classList.add('accordion-battle-body');

		game.autocampaignBattlesCounter++;

		let previousListItem = document.querySelectorAll('.accordion-battle');

		previousListItem.forEach(function (item) {
			if (item.classList.contains('active')) {
				item.classList.remove('active');
			}
		});

		accordionBodyElement.setAttribute('id', 'accordionBattleBody-' + game.autocampaignBattlesCounter);
		accordionHeaderElement.innerText = locObj.autobattleTitle.txt.replace("%arg1", game.autocampaignBattlesCounter);

		accordionContainerElement.appendChild(accordionHeaderElement);
		accordionContainerElement.appendChild(accordionBodyElement);

		document.getElementById("lblAutocampaignBattle").appendChild(accordionContainerElement);

	}
	function postBattleLog(msgBattleLog) {
		var id = 'accordionBattleBody-' + game.autocampaignBattlesCounter;
		var accordionBattleElement = document.getElementById(id);
		var logStrElement = document.createElement('p');

		logStrElement.innerText = msgBattleLog;
		accordionBattleElement.appendChild(logStrElement);
	}

	function postJournalLog(msgEventLog) {
		var id = "accordionBody-" + game.autocampaignCounter;
		var targetCampaignLogElement = document.getElementById(id);
		targetCampaignLogElement.innerHTML += localeStrings[169]+game.myhero.aCampaignTotalLong;
		targetCampaignLogElement.innerHTML += ": "+msgEventLog+"<br>";
		scrollDown();
	}
	function writeToTextArea(msg) {
		document.getElementById("patchnotes").value = document.getElementById("patchnotes").value+"\r\n"+msg;
	}
	function autosaveGame() {
		saveGame("silent");
	}
	function saveGame(saveConfirmation) {
		if (saveConfirmation=="silent") {
			writeSave("silent");
		} else {
			if (localStorage.getItem('game')!==null) {
				question = locObj.dialogSaveGame.txt;
				showModal(1, '', saveGameCallback, question, locObj.yes.txt, locObj.no.txt)
			} else {
				writeSave();
			}
		}
	}
	function saveGameCallback() {
		if (answer === 2) {
			writeSave();
		}
	}
	function writeSave(SaveType){
		document.getElementById("loadGameButton").style.visibility = "visible";
		localStorage.setItem('game', JSON.stringify(game));
		if (SaveType === "silent") {
			if (game.userASaveAck === 0) {
				game.userASaveAck = 1;
				postEventLog(locObj.savedSuccessfully.txt, "bold");
				scrollDown();
			}
		} else {
			postEventLog(locObj.savedSuccessfully.txt, "bold");
			scrollDown();
		}
	}
	function loadGame() {
		question = locObj.dialogLoadGame.txt;
		showModal(1, '', loadGameCallback, question,  locObj.yes.txt, locObj.no.txt)
	}
	function loadGameCallback() {
		if (answer === 2) {
			if (localStorage.getItem('game')!==null){
				//Object.assign(game, JSON.parse(localStorage.getItem('game')));//DOESN'T WORK IN IE AT ALL.
				gameTemp = JSON.parse(localStorage.getItem('game'));
				dialogShown = false;
				overrideGame(gameTemp);
			} else {
				//TODO DO NOT SHOW loadGame BUTTON UNTIL WE DO HAVE A SAVEGAME!!!!
				alert(localeStrings[locObj.noSaveGame.txt]);
			}
		}
	}


function setTutorialAfterSaveRestore(gameTemp) {
	if (gameTemp.isTutorialState || gameTemp.tips.length > 0) {
		hiddenElements.forEach(function (el) {
			if (!el.classList.contains('is-tutorial')) {
				el.classList.add('is-tutorial')
			}
		});
	}
}

	function overrideGame(gameTemp){
		game.myhero = {};
		game.heroHire(true);
		tmpHero = game.myhero;
		game.myhero = {};
		for (var propertyName in gameTemp) { game[propertyName] = gameTemp[propertyName]; }
		if (game.heroExists()){
			for (var propertyName in tmpHero) {
				if (game.myhero[propertyName]===undefined){
					game.myhero[propertyName] = tmpHero[propertyName];
				}
				if (propertyName === "int") {
					if (game.myhero.class===0) {
						game.myhero.int = 0;
					}
					if (game.myhero.class===1) {
						game.myhero.int = 2;
					}
				}
			}
			while (game.myhero.inventory.length>game.myhero.inventoryWorn.length){
				game.myhero.inventoryWorn.push(0);
			}
		}
		//options  = JSON.parse(localStorage.getItem('options'));
		game.active_tab="";
		game.putOutFireUI(true);
		game.userPopAck   = 0;
		game.userGoldAck  = 0;
		game.userASaveAck = 0;

		setTutorialAfterSaveRestore(gameTemp);

		setupMobileUI();
		if (typeof setupFirebrigadeUI === "function") { setupFirebrigadeUI() };
		if (typeof setupAudioUI === "function") { setupAudioUI() };
		setupAutosave();
		if (typeof setupNickname === "function") { setupNickname() };
		setupEventLogSizeUI();
		updateImagesBuildingTab()
		composite();
		enforceColorMode();
		updateUI();
		postEventLog(locObj.loadedSuccessfully.txt, "bold");
		scrollDown();
	}
	function updateUI() {
		if (typeof updateResources      === "function") { updateResources() }
		if (typeof updateTroopsNumbers  === "function") { updateTroopsNumbers() }
		if (typeof updateButtonCaptions === "function") { updateButtonCaptions() }
		if (typeof updateHeroStatus     === "function") { updateHeroStatus() }
		if (typeof updateBlackMarket    === "function") { updateBlackMarket() }
		if (typeof updateImagesBuildingTab === "function") { updateImagesBuildingTab() }
		if (document.getElementById("inp_nickname").value === "" ||
			document.getElementById("inp_nickname").value === "undefined"){
			if (typeof setupNickname    === "function") { setupNickname() }
		}
		if (typeof drawTabUniversity === "function" ) { drawTabUniversity() }
	}
	function updateBlackMarket(changeSaleOffer,changeBuyOffer) {

		// var selectGoodsForBuying = document.getElementById("selectGoodsForHero");
		// if (changeSaleOffer!==null) {
		// 	if (changeSaleOffer!==undefined){
		// 		selectGoodsForBuying.options[changeSaleOffer].remove();
		// 	}
		// }
		// var selectedItemIndex = selectGoodsForBuying.selectedIndex;
		// selectGoodsForBuying.length = 0;
		// for(var j in game.blackMarketGoods)	{
		// 	selectGoodsForBuying.add(new Option(artefacts[game.blackMarketGoods[j]].name,artefacts[game.blackMarketGoods[j]].id));
		// }
		// if (selectedItemIndex!==-1) {
		// 	selectGoodsForBuying.selectedIndex=selectedItemIndex;
		// }
		// if (game.blackMarketGoods.length!==0){
		// 	if (selectedItemIndex !== -1){
		// 		document.getElementById("lblArtefactBuyPriceValue").innerText = artefacts[game.blackMarketGoods[selectedItemIndex]].priceBuy;
		// 	}
		// }
		// document.getElementById("lblArtefactSellPriceValue").innerText=0;
		// if (game.heroExists()){
		// 	var selectGoodsForSale = document.getElementById("selectGoodsFromHero");
		// 	if (changeBuyOffer!==null) {
		// 		if (changeSaleOffer!==undefined){
		// 			selectGoodsForSale.options[changeBuyOffer].remove();
		// 		}
		// 	}
		// 	var selectedSaleItemIndex = selectGoodsForSale.selectedIndex;
		// 	selectGoodsForSale.length = 0;
		// 	for(var i in game.myhero.inventory)	{
		// 		selectGoodsForSale.add(new Option(artefacts[game.myhero.inventory[i]].name,artefacts[game.myhero.inventory[i]].id));
		// 	}
		// 	if (selectedItemIndex!==-1) {
		// 		selectGoodsForSale.selectedIndex=selectedSaleItemIndex;
		// 	}
		// 	if (game.myhero.inventory.length!==0){
		// 		if (selectedSaleItemIndex !== -1){
		// 			document.getElementById("btnSellArtefact").disabled = false;
		// 			document.getElementById("lblArtefactSellPriceValue").innerText = artefacts[game.myhero.inventory[selectedSaleItemIndex]].priceBuy/2;
		// 		} else { document.getElementById("btnSellArtefact").disabled = true; }
		// 	} else {
		// 		document.getElementById("btnSellArtefact").disabled = true;
		// 	}
		// }
	}
	function getTime(type) {
		var d  = new Date();
		var hh = d.getHours();
		var mm = d.getMinutes();
		var ss = d.getSeconds();
		var n  = "";
		if (hh < 10) {
			hh = "0"+hh;
		}
		if (mm < 10) {
			mm = "0"+mm;
		}
		if (ss < 10) {
			ss = "0"+ss;
		}
		if (type=="0") {
			n = hh+":"+mm;
		}
		if (type=="1") {
			n = hh+":"+mm+":"+ss;
		}
		return n;
	}
	function scrollDown(){
		var textarea = document.getElementById("log");
		if(textarea.selectionStart === textarea.selectionEnd) {
			textarea.scrollTop = textarea.scrollHeight;
		}
		var textareaJrnl = document.getElementById("lblAutocampaignJournal");
		if(textareaJrnl.selectionStart === textareaJrnl.selectionEnd) {
			textareaJrnl.scrollTop = textareaJrnl.scrollHeight;
		}
	}
	function askPlayer(question, typeofasking) {
		if (typeofasking === 1) {
			playerDecision = confirm(question);
		}
		return playerDecision;
	}
	function showModal(typeofModal, dlgImage, dlgCallback, dlgMessage,  dlgAnswerOne, dlgAnswerTwo) {
		dialogShown = true;
		if (typeofModal===0) {
			myCanvas(dlgImage, dlgCallback, dlgMessage,  dlgAnswerOne, dlgAnswerTwo);
		}
		if (typeofModal===1) {
			myCanvas(dlgImage, dlgCallback, dlgMessage,  dlgAnswerOne, dlgAnswerTwo);
		}
		if (typeofModal===2) {
			//TODO PROMTS
		}
	}
	//timers
	function cooldownMvt(){
		allowMvt = 1;
	}
	function endOfTurnTimer() {
		if (dcounter - 1 === 0) {
			dcounter = dcounter_def;
			game.calculateTurn();
		} else {
			dcounter = dcounter - 1;
		}
		document.getElementById('dcounter').innerText = dcounter;
	}
	function cooldown() {
		if (game.festival_cooldown-1>=0) {
			game.festival_cooldown = game.festival_cooldown-1;
		} else {
			game.festival_cooldown = 0;
		}
	}