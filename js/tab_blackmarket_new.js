function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
function get_artefact_localization(object_id, property){
  console.log(object_id, property, language);
  console.log(artefacts)
  console.log(artefacts[object_id])
  console.log(artefacts[object_id][property])
  console.log(artefacts[object_id][property][language])
  if (artefacts[object_id][property][language]===undefined) {
    return artefacts[object_id][property]["default"];
  } else {
    return artefacts[object_id][property][language];
  }
}
function clearTraderUI() {
  document.getElementById('marketList').innerHTML = '';
}
function addItem(target, item) {
  if (target === "blackMarketGoods"){
    game.blackMarketGoods.push(item.id);
    createElementUI(item.id,"marketList");
  }
  if (target === "hero"){
    game.myhero.inventory.push(item.id);
    createElementUI(item.id,"heroMarketList");
  }
}
//TODO move actionBtnElement.onclick = function (e) sto below
function buy() {

}
function sell() {

}
function removeElementUI(elemUID) {
    console.log("INSIDE REMOVE ELEMENT UI");
	var selector = '[data-uid=' + '"' + elemUID + '"]';
	var element = document.querySelector(selector);
	if (element) {
		var parent = element.parentNode;
		parent.removeChild(element)
	}
}
function createElementUI(item_id, targetListId) {
    //get item
    let item = artefacts[item_id];
    //DOM
	var parent = document.getElementById(targetListId);
	var descWrapperElement = document.createElement("div");
	var nameElement = document.createElement("div");
	var descElement = document.createElement("span");
	var priceElement = document.createElement("div");
	var imgElement = document.createElement("img");
	var imgWrapperElement = document.createElement("div");
	var actionBtnElement = document.createElement("button");
	//end of DOM
	var id = item.id;
	item.uid = uuidv4();
	if (targetListId === "marketList") {
		actionBtnElement.innerText = locObj.buy.txt;
		actionBtnElement.onclick = function (e) {
		e.preventDefault();
			// TODO: #SwordsRestriction remove it later
			if ((item.id === 'artid15' || item.id === 'artid16')  && swordsCount === 2) {
				showModal(0, '', getAck, locObj.swordsWarn.txt,  locObj.okay.txt, '');
				return;
			}
			if ((item.id === 'artid17' || item.id === 'artid18')  && ringsCount === 2) {
				showModal(0, '', getAck, locObj.ringsWarn.txt,  locObj.okay.txt, '');
				return;
			}
            if (game.gold >= item.priceBuy) {
                game.gold -= item.priceBuy;
                addItem("hero", item);
                updateUI();
                if (targetListId === "marketList" && id === "artid00") {
                    return
                }
                removeItem("trader", item);
                equipItem(item.uid);
            } else {
                postEventLog(locObj.notEnoughGold.txt, 'bold');
                return
            }
	    }
	}
	if (targetListId === "heroMarketList") {
	    console.log("WE ARE HERE");
		actionBtnElement.innerText = locObj.sell.txt;
		console.log(locObj.sell.txt)
		actionBtnElement.onclick = function (e) {
			e.preventDefault();
			var testCost = game.gold + item.priceBuy;
			if (testCost >= game.goldLimit()) {
				postEventLog("You reached gold limit!");
				return
			}
			console.log(item)
			game.gold += item.priceBuy;
			if (item.id !== "artid00") {
				item.priceBuy *= 2;
				addItem("trader", item);
			}
			updateUI();
			removeItem("hero", item);
			unequipItem(item.uid);
		};
	}
	var imgSrc = "resources/" + item.img;
	imgElement.setAttribute("src", imgSrc);
	var wrapperElement = document.createElement("div");
	nameElement.innerText = get_artefact_localization(id, "name");
	priceElement.innerText = item.priceBuy;
	priceElement.classList.add("price-val");
	nameElement.appendChild(priceElement);
	descElement.innerText = get_artefact_localization(id, "desc");;
	imgWrapperElement.appendChild(imgElement);
	imgWrapperElement.classList.add("inventory-item__wrapper-img");
	descWrapperElement.appendChild(nameElement);
	descWrapperElement.appendChild(descElement);
	nameElement.classList.add("inventory-item__name")
	descWrapperElement.classList.add("inventory-item__wrapper-desc");
	wrapperElement.appendChild(imgWrapperElement);
	wrapperElement.appendChild(descWrapperElement);
	wrapperElement.appendChild(actionBtnElement);
	actionBtnElement.classList.add("inventory-item__btn");
	wrapperElement.classList.add("inventory-item");
	wrapperElement.setAttribute("data-uid", item.uid);
	parent.appendChild(wrapperElement);
}
function removeItem(target, item) {
	if (isNil(item)) {
		throw new Error('Item not passed.')
	}
	var targetInventoryList = null;
	switch (target) {
		case 'hero': targetInventoryList = game.myhero.inventory; break;
		case 'trader': targetInventoryList = game.blackMarketGoods; break;
		default: throw new Error('Incorrect target type: available types are "trader" or "hero"');
	}
	console.log(item)
	console.log(target)
	console.log(targetInventoryList)
	var targetIndex = targetInventoryList.findIndex(function (inventoryItem) {
		return inventoryItem.id === item.id;
	});
	console.log(targetIndex)
	if (targetIndex > -1) {
		targetInventoryList.splice(targetIndex, 1);
		console.log("TRY TO CALL REMOVE ELEMENT UI");
		removeElementUI(item.uid);
	}
}
var swordsCount = 0; // TODO: #SwordsRestriction Counter will be removed after hero inventory system rework. For now dummy fix.
var ringsCount = 0; // TODO: Same as swords. For now...
function equipItem(itemUID) {
	var inventoryItem = game.myhero.inventory.find(function (item) {
		return item.uid === itemUID;
	});

	var equipedItem = game.myhero.inventoryWorn.find(function (item) {
		return item.uid === itemUID;
	});

	if (inventoryItem && !equipedItem) {
		var newItem = JSON.parse(JSON.stringify(inventoryItem));
		// TODO: #SwordsRestriction remove it later
		if (newItem.id === 'artid15' || newItem.id === 'artid16') {
			swordsCount++;
		}

		if (newItem.id === 'artid17' || newItem.id === 'artid18') {
			ringsCount++;
		}

		game.myhero.inventoryWorn.push(newItem);
		recalcStats(newItem.attr);
		updateHeroStatus();
	}

}
function unequipItem(itemUID) {
	var equipedItem = game.myhero.inventoryWorn.find(function (item) {
		return item.uid === itemUID;
	});

	if (equipedItem) {
		var substr = 'unit_';
		var substrLength = substr.length;
		var itemStats = equipedItem.attr;
		for (var i = 0; i < itemStats.length; i++) {
			if (itemStats[i].name.includes(substr)) {
				var unitParam = itemStats[i].name.substring(substrLength);
				switch(itemStats[i].type) {
					case BONUS_VALUE_TYPES.INTEGER: {
						for (var key in game.myheroArmy.units) {
							game.myheroArmy.units[key][unitParam] -= itemStats[i].val;
						}
					} break;
					case BONUS_VALUE_TYPES.PERCENT: {
						for (var key in game.myheroArmy.units) {
							game.myheroArmy.units[key][unitParam] = Math.round(game.myheroArmy.units[key][unitParam] / itemStats[i].val);
						}
					} break;
					default: throw new Error('Unknown stat type. Unable to assign value to ' + itemStats[i].name + '. Correct types is: "flat" or "percentage"');
				}
			}
			if (game.myhero && game.myhero[itemStats[i].name]) {
				switch(itemStats[i].type) {
					case BONUS_VALUE_TYPES.INTEGER:
						game.myhero[itemStats[i].name] -= itemStats[i].val;
						console.log(game.myhero[itemStats[i].name]);
						break;
					case BONUS_VALUE_TYPES.PERCENT:
						game.myhero[itemStats[i].name] = Math.round(game.myhero[itemStats[i].name] / itemStats[i].val);
						break;
					default: throw new Error('Unknown stat type. Unable to assign value to ' + itemStats[i].name + '. Correct types is: "flat" or "percentage"');
				}
			}
		}

		game.myhero.inventoryWorn = deleteFromArray(game.myhero.inventoryWorn, game.myhero.inventoryWorn.indexOf(equipedItem));
		// TODO: #SwordsRestriction remove it later
		if (equipedItem.id === 'artid15' || equipedItem.id === 'artid16') {
			swordsCount--;
		}
		// TODO: #RingsRestrictions remove it later
		if (equipedItem.id === 'artid17' || equipedItem.id === 'artid18') {
			ringsCount--;
		}
		updateHeroStatus();
	}
}
function recalcStats(itemStats) {
	if (itemStats.length) {
		var substr = 'unit_';
		var substrLength = substr.length;
		for (var i = 0; i < itemStats.length; i++) {
			if (itemStats[i].name.includes(substr)) {
				var unitParam = itemStats[i].name.substring(substrLength);
				switch(itemStats[i].type) {
					case BONUS_VALUE_TYPES.INTEGER: {
						for (var key in game.myheroArmy.units) {
							game.myheroArmy.units[key][unitParam] += itemStats[i].val;
						}
					} break;
					case BONUS_VALUE_TYPES.PERCENT: {
						for (var key in game.myheroArmy.units) {
							game.myheroArmy.units[key][unitParam] = Math.round(game.myheroArmy.units[key][unitParam] * itemStats[i].val);
						}
					} break;
					default: throw new Error('Unknown stat type. Unable to assign value to ' + itemStats[i].name + '. Correct types is: "' + BONUS_VALUE_TYPES.INTEGER + '" or "' + BONUS_VALUE_TYPES.PERCENT + '"');
				}
			}

			if (game.myhero && game.myhero[itemStats[i].name]) {
				switch(itemStats[i].type) {
					case BONUS_VALUE_TYPES.INTEGER:
						game.myhero[itemStats[i].name] += itemStats[i].val;
						break;
					case BONUS_VALUE_TYPES.PERCENT:
						game.myhero[itemStats[i].name] = Math.round(game.myhero[itemStats[i].name] * itemStats[i].val);
						break;
					default: throw new Error('Unknown stat type. Unable to assign value to ' + itemStats[i].name + '. Correct types is: "' + BONUS_VALUE_TYPES.INTEGER + '" or "' + BONUS_VALUE_TYPES.PERCENT + '"');
				}
			}
		}
	}
}
function getInventoryItemListIds(target) {
  let targetList = [];
  switch (target) {
    case 'hero': {
      if (game.heroExists()) {
        targetList = game.myhero && game.myhero.inventory;
      }
    } break;
    case 'trader': targetList = game.blackMarketGoods; break;
    default: console.warn('Unknown inventory target'); return;
  }
  if (targetList.length > 0) {
    targetList =  targetList.map(item => item.id);
  }
  return targetList;
}

