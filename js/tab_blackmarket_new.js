function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
function get_artefact_localization(object_id, property){
  if (artefacts[object_id][property][language]===undefined) {
    return artefacts[object_id][property]["default"];
  } else {
    return artefacts[object_id][property][language];
  }
}
function buy(){
			// TODO: #SwordsRestriction remove it later
			if ((item.id === 'artid15' || item.id === 'artid16')  && swordsCount === 2) {
				showModal(0, '', getAck, locObj.swordsWarn.txt,  locObj.okay.txt, '');
				return;
			}
			if ((item.id === 'artid17' || item.id === 'artid18')  && ringsCount === 2) {
				showModal(0, '', getAck, locObj.ringsWarn.txt,  locObj.okay.txt, '');
				return;
			}
			console.log("item for sale from trader is ", item);
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
function sell(){
var testCost = game.gold + item.priceBuy;
			if (testCost >= game.goldLimit()) {
				postEventLog("You reached gold limit!");
				return
			}
			console.log("the item for sale ", item);
			game.gold += item.priceBuy;
			if (item.id !== "artid00") {
				item.priceBuy *= 2;
				addItem("trader", item);
			}
			updateUI();
			removeItem("hero", item);
			unequipItem(item.uid);
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
		actionBtnElement.onclick = function (e) {
		  buy(this);
	    }
	    priceElement.innerText = item.priceBuy;
	}
	if (targetListId === "tabBlackMarketHeroGoods") {
	    actionBtnElement.innerText = locObj.sell.txt;
		console.log(locObj.sell.txt)
		actionBtnElement.onclick = function (e) {
		  sell(this);
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