//THE ADVENTURE MAP
var canvas_map      = document.getElementById("canvasMap");
canvas_map.addEventListener("touchstart", tap_map);
canvas_map.addEventListener("mousedown", tap_map);
var ctx_map         = canvas_map.getContext("2d");
theme = "winter";
//use forward slashes for Linux and Windows compatible. \ this slash works only in Windows.
var tile_grass      = loadImage('tiles/grass1.png');
var tile_sand       = loadImage('tiles/sand.png');
var tile_snow       = loadImage('tiles/snow1.png');
var tile_water      = loadImage('tiles/water.png');
if (theme === "winter") {
	var castle_tile     = loadImage('resources/castle_big_w.png');
	var blackmarket_tile= loadImage('resources/black_market_w.png');
	var bmarket_burned_tile= loadImage('resources/black_market_burned_w.png');
	var tree_tile       = loadImage('resources/tree2_w.png');
	var tree_tile2      = loadImage('resources/tree_w.png');
	var chest_tile      = loadImage('resources/chest_w.png');
} else {
	var castle_tile     = loadImage('resources/castle_big.png');
	var blackmarket_tile= loadImage('resources/black_market.png');
	var bmarket_burned_tile= loadImage('resources/black_market_burned.png');
	var tree_tile       = loadImage('resources/tree2.png');
	var tree_tile2      = loadImage('resources/tree.png');
	var chest_tile      = loadImage('resources/chest.png');
}
var hero_tile       = loadImage('resources/someKnight3.png');
var hero_atk_tile   = loadImage('resources/someKnightAttacked2.png');
var pumpkin_tile    = loadImage('resources/pumpkin.png');
var snowman_tile    = loadImage('resources/snowman.png');
var monster_tile    = loadImage('resources/monster_redpeople.png');
var arrow_l         = loadImage('resources/pointer_l.png');
var arrow_r         = loadImage('resources/pointer_r.png');
var arrow_u         = loadImage('resources/pointer_u.png');
var arrow_d         = loadImage('resources/pointer_d.png');
ctx_map.globalAlpha=1;
function composite_gm() {
	ctx_map.clearRect(0, 0, 800, 480);
	// try place hero at center of screen
	camXL = game.heroX - Math.floor(config.sizeScrX/2);
	camXH = camXL + config.sizeScrX;
	if (camXL < 0) {
		camXL = 0;
		camXH = config.sizeMapX-config.sizeScrX;
	}
	if (camXH > config.sizeMapX) {
		camXL = config.sizeMapX-config.sizeScrX;
		camXH = config.sizeMapX;
	}
	camYL = game.heroY - Math.floor(config.sizeScrY/2);
	camYH = camYL + config.sizeScrY;
	if (camYL < 0) {
		camYL = 0;
		camYH = config.sizeMapY-config.sizeScrY;
	}
	if (camYH > config.sizeMapY) {
		camYL = config.sizeMapY-config.sizeScrY;
		camYH = config.sizeMapY;
	}
	for (i = 0; i < config.sizeScrX; i++) {
		for (j = 0; j < config.sizeScrY; j++) {
			if (game.myMapLand[i+camXL][j+camYL]===0) {
				if (theme==="winter") {
					ctx_map.drawImage(tile_snow, i * 48, j * 48);   //draw background
				} else {
					ctx_map.drawImage(tile_grass, i * 48, j * 48);   //draw background
				}
			}
		}
	}
	already_draw = false;
	for (i = 0; i < config.sizeScrX; i++) {
		for (j = 0; j < config.sizeScrY; j++) {
			if (game.myMapLand[i+camXL][j+camYL]===0) {
				//ctx_map.drawImage(tile_grass, i * 48, j * 48);   //draw background
			}
			if (game.myMapObjects[i+camXL][j+camYL]===1) {
				//console.log("draw tree");
				ctx_map.drawImage(tree_tile, i * 48, j * 48);
			}
			if (game.myMapObjects[i+camXL][j+camYL]===2) {
				//console.log("draw tree");
				ctx_map.drawImage(tree_tile2, i * 48, j * 48);
			}
			if (game.myMapObjects[i+camXL][j+camYL]===3) {
				//console.log("draw tree");
				ctx_map.drawImage(tree_tile, i * 48, j * 48);
			}
			if (game.myMapObjects[i+camXL][j+camYL]===4) {
				//console.log("draw blackmarket");
				ctx_map.drawImage(blackmarket_tile, i * 48, j * 48);
			}
			if (game.myMapObjects[i+camXL][j+camYL]===41) {
				//console.log("draw burned blackmarket");
				ctx_map.drawImage(bmarket_burned_tile, i * 48, j * 48);
			}
			if (game.myMapObjects[i+camXL][j+camYL]===12) {
				//console.log("draw castle");
				ctx_map.drawImage(castle_tile, i * 48, j * 48);   //draw castle entrance
				already_draw = true;
			} else {
				if (already_draw === false){
					if (j+camYL-1>0){
						if (game.myMapObjects[i + camXL][j + camYL -1] === 12) {
							//console.log("draw castle");
							ctx_map.drawImage(castle_tile, i * 48, (j-1) * 48);   //draw castle entrance
							already_draw = true;
						}
					}
					if (j+camYL+1<config.sizeMapY) {
						if (game.myMapObjects[i + camXL][j + camYL + 1] === 12) {
							//console.log("draw castle");
							ctx_map.drawImage(castle_tile, i * 48, (j + 1) * 48);   //draw castle entrance
							already_draw = true;
						}
					}
					if (i+camXL-1>0) {
						if (game.myMapObjects[i + camXL - 1][j + camYL] === 12) {
							//console.log("draw castle");
							ctx_map.drawImage(castle_tile, (i - 1) * 48, j * 48);   //draw castle entrance
							already_draw = true;
						}
					}
					if (i+camXL+1<config.sizeMapX) {
						if (game.myMapObjects[i + camXL + 1][j + camYL] === 12) {
							//console.log("draw castle");
							ctx_map.drawImage(castle_tile, (i + 1) * 48, j * 48);   //draw castle entrance
							already_draw = true;
						}
					}
					if (i+camXL-2>0) {
						if (game.myMapObjects[i + camXL - 2][j + camYL] === 12) {
							//console.log("draw castle");
							ctx_map.drawImage(castle_tile, (i - 2) * 48, j * 48);   //draw castle entrance
							already_draw = true;
						}
					}
					if (i+camXL+2<config.sizeMapX) {
						if (game.myMapObjects[i + camXL + 2][j + camYL] === 12) {
							//console.log("draw castle");
							ctx_map.drawImage(castle_tile, (i + 2) * 48, j * 48);   //draw castle entrance
							already_draw = true;
						}
					}
				}
			}
			if (game.myMapRemObjects[i+camXL][j+camYL]===1) {
				ctx_map.drawImage(chest_tile, i * 48, j * 48);
			}
			if (game.myMapRemObjects[i+camXL][j+camYL]===2) {
				if (theme==="winter"){
					ctx_map.drawImage(snowman_tile, i * 48, j * 48);
				} else {
					ctx_map.drawImage(pumpkin_tile, i * 48, j * 48);
				}
			}
			if (game.myMapRemObjects[i+camXL][j+camYL]===3) {
				ctx_map.drawImage(monster_tile, i * 48, j * 48);
			}
			if (game.myMapRemObjects[i+camXL][j+camYL]===40) {
				ctx_map.drawImage(hero_tile, i * 48, j * 48);   //draw hero
			}
			if (game.myMapRemObjects[i+camXL][j+camYL]===41) {
				ctx_map.drawImage(hero_atk_tile, i * 48, j * 48);   //draw hero being attacked
			}
		}
	}
	//overlay buttons for mobile clients
	if (game.isMobile===1){
		arrow_lx = 100;
		arrow_ly = 200;
		arrow_ux = 200;
		arrow_uy = 100;
		arrow_dx = 200;
		arrow_dy = 300;
		arrow_rx = 300;
		arrow_ry = 200;
		arrow_size=80;
		ctx_map.globalAlpha=0.5;
		ctx_map.drawImage(arrow_l, arrow_lx, arrow_ly);
		ctx_map.drawImage(arrow_u, arrow_ux, arrow_uy);
		ctx_map.drawImage(arrow_d, arrow_dx, arrow_dy);
		ctx_map.drawImage(arrow_r, arrow_rx, arrow_ry);
		ctx_map.globalAlpha=1;
	}
}
function tap_map (e) {
	pos  = getElementPosition(canvasMap);
	loc  = {};
	tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
	tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
	canvasScaleRatio = canvas.width / canvas.offsetWidth;
	loc.x = (tapX - 9)  * canvasScaleRatio;
	loc.y = (tapY - 58) * canvasScaleRatio;
	if (game.isMobile===1 && allowMvt===1) {
		allowMvt = 0;
		setTimeout(cooldownMvt, 300);
		if (loc.x >= arrow_lx && loc.x <= arrow_lx + arrow_size) {
			if (loc.y >= arrow_ly && loc.y <= arrow_ly + arrow_size) {
				game.tryHeroMovement(-1, 0);//LEFT
			}
		}
		if (loc.x >= arrow_ux && loc.x <= arrow_ux + arrow_size) {
			if (loc.y >= arrow_uy && loc.y <= arrow_uy + arrow_size) {
				game.tryHeroMovement(0, -1);//UP
			}
		}
		if (loc.x >= arrow_dx && loc.x <= arrow_dx + arrow_size) {
			if (loc.y >= arrow_dy && loc.y <= arrow_dy + arrow_size) {
				game.tryHeroMovement(0, 1);//DOWN
			}
		}
		if (loc.x >= arrow_rx && loc.x <= arrow_rx + arrow_size) {
			if (loc.y >= arrow_ry && loc.y <= arrow_ry + arrow_size) {
				game.tryHeroMovement(1, 0);//RIGHT
			}
		}
	}
}
document.onkeyup = function(e) {
	if (game.active_tab==="Explore"){
		if(e.keyCode === 38 || e.keyCode === 87) {
			game.tryHeroMovement(0,-1);//UP
		}
		if(e.keyCode === 37 || e.keyCode === 65) {
			game.tryHeroMovement(-1,0);//LEFT
		}
		if(e.keyCode === 40 || e.keyCode === 83) {
			game.tryHeroMovement(0,1);//DOWN
		}
		if(e.keyCode === 68 || e.keyCode === 39) {
			game.tryHeroMovement(+1,0);//RIGHT
		}
	}
}
