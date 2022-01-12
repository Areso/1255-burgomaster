setInterval(rndEvents, 100000);
function rndEvents() {
	var rnd = Math.floor((Math.random() * 12) + 1);
	//rnd = 2;//debug
	switch (rnd) {
		case 1:
			game.theftFromTreasury();
			break;
		case 2:
			game.startFire();
			break;
		case 3:
			game.startPlague();
			break;
		case 4:
			game.chestCityAppear();
			break;
		case 5:
			game.migration();
			break;
		case 6:
			//
			break;
		case 7:
			//
			break;
		case 8:
			//
			break;
		case 9:
			//
			break;
		case 10:
				//
			break;
		case 11:
			//
			break;
		case 12:
			game.winLottery();
			break;
		default:
			alert("error on switch/case function");
		}
	}
