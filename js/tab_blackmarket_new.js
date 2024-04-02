function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
function populateBlackMarketGoods() {
  clearTraderUI();
  for (let iterator in game.blackMarketGoods) {
    let itemToAdd = game["blackMarketGoods"][iterator];
    createElementUI(itemToAdd, 'tabBlackMarketTraderGoods');
  }
}
function populateHeroGoods(){
  clearHeroGoodsUI();
  if (game.heroExists()){
    for (let iterator in tmpHero["inventory"]) {
      let itemToAdd = tmpHero["inventory"][iterator]
      createElementUI(itemToAdd, 'tabBlackMarketHeroGoods');
    }
  }
}
function get_artefact_localization(object_id, property){
  if (artefacts[object_id][property][language]===undefined) {
    return artefacts[object_id][property]["default"];
  } else {
    return artefacts[object_id][property][language];
  }
}
function clearTraderUI() {
  document.getElementById('tabBlackMarketTraderGoods').innerHTML = '';
}
function clearHeroGoodsUI() {
  document.getElementById('tabBlackMarketHeroGoods').innerHTML = '';
}
function buy(item_for_buying){
  //console.log("buy ", item_for_buying);
  let data = item_for_buying.split(";");
  let uid  = data[0];
  let id   = data[1];
  let item = artefacts[id];
  if (game.gold >= item.priceBuy) {
    game.gold -= item.priceBuy;
    game.myhero.inventory.push(id);
    if (id !== "artid00") {
      let theIndex          = game.blackMarketGoods.indexOf(id);
      game.blackMarketGoods = deleteFromArray(game.blackMarketGoods, theIndex);
      populateBlackMarketGoods();
      equipItem_new(item);
    }
    createElementUI(id, "tabBlackMarketHeroGoods");
  }
}

function isFreeSlot(item){
  let require_slots  = item.slots;
  let slots_qty      = item.slots.length
  let isSatisfied    = true;
  if (require_slots[0] !== "misc") {
    for (let iterator in game.myhero.inventoryWorn){
      let worn_artefact_ref =   game.myhero.inventoryWorn[iterator];
      let worn_artefact = artefacts[worn_artefact_ref];
      if (require_slots === worn_artefact.slots) {
        isSatisfied = false;
        return isSatisfied;
      }
      if (slots_qty > 1){
        for (let slot_rqt_iterator in require_slots) {
          if (require_slots[slot_rqt_iterator] === worn_artefact.slots) {
            isSatisfied = false;
            return isSatisfied;
          }
        }
      }
    }
  }
  if (require_slots[0] === "misc") {
    misc_worn = 0;
    for (let iterator in game.myhero.inventoryWorn){
      let worn_artefact_ref =   game.myhero.inventoryWorn[iterator];
      let worn_artefact = artefacts[worn_artefact_ref];
      if (worn_artefact.slots[0] === "misc") {
        misc_worn += 1;
      }
    }
    if (misc_worn >= config.miscSlots) {
      isSatisfied = false;
    }
  }
  return isSatisfied;
}
function equipItem_new(item){
  console.log(item)
  console.log("equipt item")
  //console.log(isFreeSlot(item))
  if (!isFreeSlot(item)) {
    return;
  }
  console.log("try to worn")
  game.myhero.inventoryWorn.push(item.id);
  //recalcStats(newItem.attr);
  //updateHeroStatus();
}
function sell(){

}
function createElementUI(item_ref, targetListId) {
    //get item
    console.log(item_ref)
    item = artefacts[item_ref];
    console.log("create elementUI ",item)
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
	console.log("id is ", id);
	console.log(targetListId)
	item.uid = uuidv4();

	if (targetListId === "tabBlackMarketTraderGoods") {
		actionBtnElement.innerText = locObj.buy.txt;
		actionBtnElement.id = item.uid+";"+id;
		actionBtnElement.onclick = function (e) {
		  item = e.target.id;
		  buy(item);
	    }
	    priceElement.innerText = item.priceBuy;
	}
	if (targetListId === "tabBlackMarketHeroGoods") {
	    actionBtnElement.innerText = locObj.sell.txt;
		console.log(locObj.sell.txt)
		actionBtnElement.onclick = function (e) {
		  sell(e.target.id);
		}
		priceElement.innerText = item.priceBuy/2;
	}
	var imgSrc = "resources/" + item.img;
	imgElement.setAttribute("src", imgSrc);
	var wrapperElement = document.createElement("div");
	nameElement.innerText = get_artefact_localization(id, "name");
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