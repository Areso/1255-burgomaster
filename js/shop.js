function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function addItem(target, item) {

	if (target === "hero") {
		if (game.heroExists()) {
			var newItem = Object.assign({}, item);
			newItem.priceBuy = newItem.priceBuy / 2;
			newItem.uid = uuidv4();
			game.myhero.inventory.push(newItem);
			createElementUI(newItem, "heroMarketList");
			equipItem(newItem.uid);
		}
	}

	if (target === "trader") {
		var newItem = Object.assign({}, item);
		newItem.uid = uuidv4();
		game.blackMarketGoods.push(newItem);
		createElementUI(newItem, "marketList");
	}

};




function removeItem(target, itemID) {
	if (target === "hero") {
		if (game.heroExists()) {
			for (var i = 0; i < game.myhero.inventory.length; i++) {
				if (game.myhero.inventory[i].id === itemID) {
					var targetIndex = game.myhero.inventory.indexOf(game.myhero.inventory[i]);
					game.myhero.inventory = deleteFromArray(game.myhero.inventory, targetIndex);
					console.log(game.myhero.inventory);
					return

				}
			}
		}
	}

	if (target === "trader") {
		for (var i = 0; i < game.blackMarketGoods.length; i++) {
			if (game.blackMarketGoods[i].id === itemID) {
				var targetIndex = game.blackMarketGoods.indexOf(game.blackMarketGoods[i]);
				game.blackMarketGoods = deleteFromArray(game.blackMarketGoods, targetIndex);
				console.log('TRADER INVENTORY: ', game.blackMarketGoods);
				return
			}
		}
	}

};

function removeElementUI(elemUID) {
	var selector = '[data-uid=' + '"' + elemUID + '"]';
	var element = document.querySelector(selector);
	if (element) {
		var parent = element.parentNode;
		parent.removeChild(element)
	}
}

function createElementUI(item, targetListId) {
	var parent = document.getElementById(targetListId);

	var descWrapperElement = document.createElement("div");
	var nameElement = document.createElement("div");
	var descElement = document.createElement("span");
	var priceElement = document.createElement("div");

	var imgElement = document.createElement("img");
	var imgWrapperElement = document.createElement("div");

	var actionBtnElement = document.createElement("button");

	var id = item.id;
	if (targetListId === "marketList") {
		actionBtnElement.innerText = locObj.buy.txt;
		actionBtnElement.onclick = function (e) {
		e.preventDefault();

			// TODO: #SwordsRestriction remove it later
			if ((item.id === 'artid15' || item.id === 'artid16')  && swordsCount === 2) {
				showModal(0, '', getAck, locObj.swordsWarn.txt,  localeStrings[60], '');
				return;
			}

			if ((item.id === 'artid17' || item.id === 'artid18')  && ringsCount === 2) {
				showModal(0, '', getAck, locObj.ringsWarn.txt,  localeStrings[60], '');
				return;
			}



		if (game.gold >= item.priceBuy) {

			game.gold -= item.priceBuy;
			addItem("hero", item);
			updateUI();
			if (targetListId === "marketList" && id === "artid00") {
				return
			}
			removeItem("trader", id);
			removeElementUI(item.uid);
		} else {
			msg = "<b>%arg1</b>";
			msg = msg.replace("%arg1",localeStrings[20]);
			postEventLog(msg);
			return
		}
	}


	} else {
		actionBtnElement.innerText = locObj.sell.txt;
		actionBtnElement.onclick = function (e) {
			e.preventDefault();

			var testCost = game.gold + item.priceBuy;
			if (testCost >= game.goldLimit()) {
				postEventLog("You reached gold limit!");
				return
			}

			game.gold += item.priceBuy;

			if (item.id !== "artid00") {
				item.priceBuy *= 2;
				addItem("trader", item);
			}
			updateUI();
			removeItem("hero", id);
			removeElementUI(item.uid);
			unequipItem(item.uid);
		};
	}



	var imgSrc = "resources/" + item.img;
	imgElement.setAttribute("src", imgSrc);

	var wrapperElement = document.createElement("div");


	nameElement.innerText = item.name;
	priceElement.innerText = item.priceBuy;
	priceElement.classList.add("price-val");
	nameElement.appendChild(priceElement);

	descElement.innerText = item.desc;


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

function clearTraderUI() {
	document.getElementById('marketList').innerHTML = '';
}

var swordsCount = 0; // TODO: #SwordsRestriction Counter will be removed after hero inventory system rework. For now dummy fix.
var ringsCount = 0; // TODO: Same as swords. For now...

function equipItem(itemUID) {
	var inventoryItem = null;
	var equipedItem = null;
	for (var i = 0; i < game.myhero.inventory.length; i++) {
		if (game.myhero.inventory[i].uid === itemUID) {
			inventoryItem = game.myhero.inventory[i];
			break;
		}
	}

	for (var i = 0; i < game.myhero.inventoryWorn.length; i++) {
		if (game.myhero.inventoryWorn[i].uid === itemUID) {
			equipedItem = game.myhero.inventoryWorn[i];
			break;
		}
	}


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
	}

}


function unequipItem(itemUID) {
	var equipedItem = null;

	for (var i = 0; i < game.myhero.inventoryWorn.length; i++) {
		if (game.myhero.inventoryWorn[i].uid === itemUID) {
			equipedItem = game.myhero.inventoryWorn[i];
			break;
		}
	}
	
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
