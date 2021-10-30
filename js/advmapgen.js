function genMap(priceOfMapGen){
	console.log("new map is generated");
	//restore the blackmarket
	if (game.tips.includes("blackmarket")){
		game.tips.pop("blackmarket");
	}
	game.genBlackMarketGoods();
	game.gold = game.gold - priceOfMapGen;
	game.myMapLand=[];
	for (i=0;i<config.sizeMapX;i++) {
		game.myMapLand.push([]);
	}
	for (i = 0; i < config.sizeMapX; i++) {
		for (j = 0; j < config.sizeMapY; j++) {
			//for now, all map is just green grass
			game.myMapLand[i][j] = 0; //Math.floor(Math.random()*10);
		}
	}
	//place the castle
	//castle on X axis has 3 points //144px
	//minus one because of 0..11
	//minus one for right part of the castle
	//plus  one for left  part of the castle
	//to both right and left parts could be draw on the map
	game.castleX = Math.floor(Math.random()*(config.sizeMapX-2))+1
	//castle on Y axis has 2 points // 96px
	//minus one because of 0..11
	//so  minus one for the roof of the castle
	//and plus  one for the road to the casle
	game.castleY = Math.floor(Math.random()*(config.sizeMapY-2))+1
	console.log('castleX is '+game.castleX+' and castleY is '+game.castleY);
	//castle(enter) = 10
	//castle(other) = 11
	//castle(point) = 12 //from this point we draw a castle
	//mountain      = 20
	//forest        = 1..3
	//hero          = 40
	//monster       = 50
	game.myMapObjects=[];
	for (i=0;i<config.sizeMapX;i++) {
		game.myMapObjects.push([]);
	}
	for (i = 0; i < config.sizeMapX; i++) {
		for (j = 0; j < config.sizeMapY; j++) {
			game.myMapObjects[i][j]=0;
		}
	}
	game.myMapObjects[game.castleX][game.castleY]=10;
	game.myMapObjects[game.castleX-1][game.castleY]=11;
	game.myMapObjects[game.castleX+1][game.castleY]=11;
	game.myMapObjects[game.castleX][game.castleY-1]=11;
	game.myMapObjects[game.castleX-1][game.castleY-1]=12;
	game.myMapObjects[game.castleX+1][game.castleY-1]=11;
	var blackmarket_flag = false;
	for (i = 0; i < config.sizeMapX; i++) {
		for (j = 0; j < config.sizeMapY; j++) {
			if (game.myMapObjects[i][j]===0) {
				rnd = Math.floor((Math.random() * 12) + 1);
				if (rnd > 4) {
					rnd = 0
				}
				if (rnd===4) {
					if (blackmarket_flag===false){
						blackmarket_flag = true;
						game.blackmarketLoc = [i,j];
					} else {
					rnd = 0;
					}
				}
				if (i===config.sizeMapX-1 && j===config.sizeMapY-1 && blackmarket_flag===false){
					rnd = 4;
					game.blackmarketLoc = [i,j];
				}
				game.myMapObjects[i][j]=rnd;
			}
		}
	}
	game.myMapObjects[game.castleX][game.castleY+1]=0;//just to be sure there are nothing to block path to a castle
	//RemovableObjects
	//The hero, first of all
	game.myMapRemObjects=[];
	for (i=0;i<config.sizeMapX;i++) {
		game.myMapRemObjects.push([]);
	}
	game.myMapRemObjects[game.castleX][game.castleY+1]=40;
	game.heroX = game.castleX;
	game.heroY = game.castleY+1;
	let generated_items = 0;
	for (i = 0; i < config.sizeMapX; i++) {
		for (j = 0; j < config.sizeMapY; j++) {
			if (game.myMapObjects[i][j]===0) {//to place removable objects, we should the place is free from non-removable objects
				rnd = Math.floor((Math.random() * 12));
				if (flag_event_started===1) {
					if (rnd >= 3) {
						rnd = 0
					}
					if (rnd === 2) {
						generated_items += 1;
					}
				} else {
					if (rnd >= 2) {
						rnd = 0
					}
				}
				if (rnd===3){
					generated_items += 1;
				} 
				game.myMapRemObjects[i][j] = rnd;
			}
		}
	}
	defElementsTypes  = [1];
	pointsToDef       = populatePOIs(defElementsTypes, []);
	placeMobsOnTheMap(pointsToDef);

	qc = checkNewMap()
	if (qc) {
		//QC is passed!
		game.mapCreated = 1;
		composite_gm();
		if (flag_event_started===1){
			if (typeof send_gen_items === "function") { send_gen_items(generated_items) };
		}
	} else {
		console.log("qc of newly generated map failed. regen the map");
		genMap(0);
	};
}


function populatePOIs (elemsRemToCheck,elemsStatToCheck) {
	console.log("WE ARE INSIDE populateDefPOIs FUNCTION");
	pointsToCheck = [];
	if (elemsRemToCheck.length > 0){
		console.log("WE ARE POPULATING REMOVABLE ITEMS LIST");
		for (i=0; i<config.sizeMapX; i++){
			for (j=0; j<config.sizeMapX; j++){
				if (inArray(elemsRemToCheck, game.myMapRemObjects[i][j])) {
					console.log("the element code is "+game.myMapRemObjects[i][j]+" in this loc "+i+"; "+j);
					pointsToCheck.push([i,j]);
				}
			}
		}
	}
	if (elemsStatToCheck.length > 0){
		console.log("WE ARE POPULATING STATICAL ITEMS LIST");
		for (i=0; i<config.sizeMapX; i++){
			for (j=0; j<config.sizeMapX; j++){
				if (inArray(elemsStatToCheck, game.myMapObjects[i][j])) {
					console.log("the element code is "+game.myMapObjects[i][j]+" in this loc "+i+"; "+j);
					pointsToCheck.push([i,j]);
				}
			}
		}
	}
	return pointsToCheck;
}


function prepareMap () {
	preparedMap = []
	for (i=0;i<config.sizeMapX;i++) {
		preparedMap.push([]);
	}
	for (i = 0; i < config.sizeMapX; i++) {
		for (j = 0; j < config.sizeMapY; j++) {
			preparedMap[i][j]=0;
		}
	}
	for (i=0; i<config.sizeMapX; i++){
		for (j=0; j<config.sizeMapX; j++){
			if (game.myMapObjects[i][j] == 10){//city entrance
				preparedMap[i][j] = 1;
			} 
			else if (game.myMapObjects[i][j] == 4){//blackmarket
				preparedMap[i][j] = 1;
			}
			else if (game.myMapObjects[i][j] == 0){//no object
				preparedMap[i][j] = 1;
			}
			else {
				preparedMap[i][j] = 0;
			}
		}
	}
	console.log("prepared map is");
	console.log(preparedMap);
	return preparedMap;
}


function checkNewMap () {
	//blackmarket 4, castle entrance 10
	assertions = [];
	visitableElements     = [4];
	pointsToCheck         = [];
	//pointsToCheck = populatePOIs(visitableElements);
	pointsToCheck = populatePOIs([], visitableElements);
	pfmap     = prepareMap();
	lenOfPOIs = pointsToCheck.length;
	for (i=0;i<lenOfPOIs;i++){
		console.log(pointsToCheck[i])
		assertions.push(genWaveMap(pfmap, pointsToCheck[i]));
		//wavemap = genWaveMap(pfmap, pointsToCheck[i]);
		//track   = genTrack();
	}
	if (!assertions.includes("failed")){
		return true;
	} else {
		return false;
	}
}


function genWaveMap (map, POI) {
	qg_passed = "failed";
	neighbor_offsets = [[0, 1], [1, 0], [0, -1], [-1, 0]];
	waveMap          = [];
	for (i=0;i<config.sizeMapX;i++) {
		waveMap.push([]);
	}
	for (i = 0; i < config.sizeMapX; i++) {
		for (j = 0; j < config.sizeMapY; j++) {
			waveMap[i][j]=0;
		}
	}
	waveMap[game.heroX][game.heroY]  =  1;
	node_list = [];
	node_list.push([[game.heroX],[game.heroY]])
	target = [];
	target[0] = POI[0]
	target[1] = POI[1]
	console.log("new target is ");
	console.log(target);
	console.log("node list");
	console.log(node_list+"lenght of the node_list is "+node_list.length);
	for (node of node_list){
		//console.log("node is ");
		//console.log(node);
		score = waveMap[node[0]][node[1]]
		//console.log("score is "+score);
		for (neighbor_offset of neighbor_offsets){
			//console.log("run over neighbor offsets");
			neighbor_x = node[0]*1+neighbor_offset[0]*1;
			neighbor_y = node[1]*1+neighbor_offset[1]*1;
			if (neighbor_x < 0 ||
				neighbor_y < 0 ||
				neighbor_x >= config.sizeMapX ||
				neighbor_y >= config.sizeMapY){
				//console.log("out of borders - we can not move here "+neighbor_x+";"+neighbor_y);
				continue
			}
			if (pfmap[neighbor_x][neighbor_y] == 0){
				//console.log("not travelable - we can not move here "+neighbor_x+";"+neighbor_y);
				continue
			}
			if (pfmap[neighbor_x][neighbor_y] == 1){
				//console.log("travelable - we could move there " + neighbor_x + ";" + neighbor_y);
				if (neighbor_x == target[0] && neighbor_y == target[1]) {
					console.log("we found the target!");
					qg_passed = "passed";
					waveMap[neighbor_x][neighbor_y] = score*1 + 1;
					continue
				} else {
					if (waveMap[neighbor_x][neighbor_y] == 0){
						//console.log("can move here "+neighbor_x+";"+neighbor_y);
						node_list.push([neighbor_x, neighbor_y]);
						waveMap[neighbor_x][neighbor_y] = score*1 + 1;
						continue
					} else {
						//console.log("we already have been here " + neighbor_x + ";" + neighbor_y);
						continue
					}
				}
			}
		}
	}
	console.log("---the waveMap----");
	console.log(waveMap);
	document.getElementById("outTable").innerHTML="";
	for (j = 0; j < config.sizeMapY; j++) {
		for (i = 0; i < config.sizeMapX; i++) {
			//console.log("target coord is "+target[0]+" "+target[1]);
			if (waveMap[i][j] < 10) {
				prVal = "0"+waveMap[i][j]
			} else {
				prVal = waveMap[i][j]
			}
			if (i===target[0] && j===target[1]) {
				prVal = "<b>"+prVal+"</b>";
			}
			document.getElementById("outTable").innerHTML+=prVal;
			document.getElementById("outTable").innerHTML+=" | ";
		}
		document.getElementById("outTable").innerHTML+="</br>";
	}
//return waveMap;
return qg_passed;
}


function placeMobsOnTheMap (elemsToDefend) {
	console.log(elemsToDefend);
	//WIP
	neighbor_offsets = [[0, 1], [1, 0], [0, -1], [-1, 0]];
	neighbor_offsets_ext = [[0, 1], [1, 0], [0, -1], [-1, 0],
							[1, 1], [-1, -1], [1, -1], [-1, 1]];
	for (i = 0; i < elemsToDefend.length; i++) {
		everyPoint = elemsToDefend[i];
		mobPlaced = false;
		neighbor_offsets_s = [];
		for (s = 0; s < neighbor_offsets.length; s++) {
			neighbor_offsets_s[s] = neighbor_offsets[s];
		}
		neighbor_offsets_s = shuffleArray(neighbor_offsets_s);
		for (neighbor_offset of neighbor_offsets_s) {
			neighbor_x = everyPoint[0]*1+neighbor_offset[0]*1;
			neighbor_y = everyPoint[1]*1+neighbor_offset[1]*1;
			//if there is no such condition we would end out of the range
			if (neighbor_x >= 0 && neighbor_y >= 0 && 
				neighbor_x < config.sizeMapX && neighbor_y < config.sizeMapY) {
				if (game.myMapObjects[neighbor_x][neighbor_y]===0 &&
					game.myMapRemObjects[neighbor_x][neighbor_y]===0) {
					//check here if in any directions a starting point.
					castleEntranceFound = false;
					for (neighbor_offset_castle of neighbor_offsets_ext) {
						//castleEntranceFound = false;
						castle_neighbor_x = neighbor_x*1+neighbor_offset_castle[0]*1;
						castle_neighbor_y = neighbor_y*1+neighbor_offset_castle[1]*1;
						//if there is no such condition we would end out of the range
						if (castle_neighbor_x >= 0 && castle_neighbor_y >= 0 && 
							castle_neighbor_x < config.sizeMapX && castle_neighbor_y < config.sizeMapY) {
							if (game.myMapRemObjects[castle_neighbor_x][castle_neighbor_y]===40) {//40 means hero
								castleEntranceFound = true;
							}
						}
					}
					if (castleEntranceFound === false) {
						mobPlaced = true;
						game.myMapRemObjects[neighbor_x][neighbor_y]=3;
						mymonster = new Monster("monster", neighbor_x, neighbor_y, grolinWorker);
						game.monstersOnAdvMap.push(mymonster);
					}
				}
			}
			if (mobPlaced === true){
				break;
			}
		}
	}
}



function genTrack () {
	target[0] = game.blackmarketLoc[0]
	target[1] = game.blackmarketLoc[1]
	if (wavemap[target[0]][target[1]] != 0 && wavemap[target[0]][target[1]] != -1){
		console.log("try to get_path")
		//print(wave_map[target[0]][target[1]])
		// neighbor_offsets = [(0, 1), (1, 0), (0, -1), (-1, 0)]
		neighbor_offsets = [[0, 1], [1, 0], [0, -1], [-1, 0]];
		node_list = [target]
		score = wavemap[target[0]][target[1]]
		//print("blank path map")
		for (node of node_list){
			for (neighbor_offset of neighbor_offsets){
				neighbor_x = node[0]+neighbor_offset[0]
				neighbor_y = node[1]+neighbor_offset[1]
				if (neighbor_x < 0 ||
					neighbor_y < 0 ||
					neighbor_x >= config.sizeMapX ||
					neighbor_y >= config.sizeMapY){
					continue
				}
				if (wavemap[neighbor_x][neighbor_y] < score && wavemap[neighbor_x][neighbor_y] != 0){
					score = wavemap[neighbor_x][neighbor_y]
					node_list.push([neighbor_x, neighbor_y]);
				}
			}
		}
		return node_list
		//return true
	} else {
		return false
	}
}


