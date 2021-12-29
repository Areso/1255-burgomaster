function getItem(itemID) {
	var targetArtefact = null;
	for (artefactKey in artefacts) {
		if (artefacts.hasOwnProperty(artefactKey) && artefactKey === itemID) {
			targetArtefact = artefacts[itemID];
			break;
		}
	}
	return targetArtefact
};

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

	console.log(equipedItem);

	if (equipedItem) {
		for (var i = 0; i < equipedItem.attr.length; i++) {
			game.myhero[equipedItem.attr[i].name] -= equipedItem.attr[i].val; 
		}
		game.myhero.inventoryWorn = deleteFromArray(game.myhero.inventoryWorn, game.myhero.inventoryWorn.indexOf(equipedItem));
	}

	return
}


function recalcStats(itemStats) {
	if (itemStats.length) {
		for (var i = 0; i < itemStats.length; i++) {
			if (itemStats[i].type === "flat") {
				game.myhero[itemStats[i].name] += itemStats[i].val
			}
		}
	}
}
