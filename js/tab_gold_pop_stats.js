popPage = 0;
function checkPop() {
	var year = document.getElementById("popStatK");
	var pop  = document.getElementById("popStatV");
	year.innerHTML = "";
	pop.innerHTML  = "";
	popPage  = Math.round(game.years.length)/10;
	if (game.years.length > 10) {
		//select the latest 10
		for (i=0;i<10;i++) {
			year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[game.years.length-10+i] +'</span></td>';
			pop.innerHTML  = pop.innerHTML  +'<td><span class="dynamicCells">'+ game.pops[game.years.length-10+i]  +'</span></td>';
		}
		document.getElementById("lblCurrentPopLimit").innerHTML=localeStrings[162].replace("%arg1",game.popLimit());
		dynamicCellsSetStyle();
		openTab(null, 'tabPopulation');
	} else {
		if (game.years.length > 0) {
			for (i=0;i<game.years.length;i++) {
				year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[game.years.length-game.years.length+i] +'</span></td>';
				pop.innerHTML  = pop.innerHTML  +'<td><span class="dynamicCells">'+ game.pops[game.years.length-game.years.length+i]  +'</span></td>';
			}
			document.getElementById("lblCurrentPopLimit").innerHTML=localeStrings[162].replace("%arg1",game.popLimit());
			dynamicCellsSetStyle();
			openTab(null, 'tabPopulation');
		} else {
			// nothing to show
			var alertMsg = localeStrings[65];
			disabledElements.push("saveGameButton");
			disabledElements.push("loadGameButton");
			document.getElementById("saveGameButton").disabled = true;
			document.getElementById("loadGameButton").disabled = true;
			showModal(0, '', getAck, alertMsg,  localeStrings[65], '')
		}
	}
}
function popAtStart() { 
	var year = document.getElementById("popStatK");
	var pop  = document.getElementById("popStatV");
	year.innerHTML = "";
	pop.innerHTML  = "";
	popPage  = 0;
	if (game.years.length > 10) {
		//select the latest 10
		for (i=0;i<10;i++) {
			year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[i] +'</span></td>';
			pop.innerHTML  = pop.innerHTML  +'<td><span class="dynamicCells">'+ game.pops[i]  +'</span></td>';
		}
		document.getElementById("lblCurrentPopLimit").innerHTML=localeStrings[162].replace("%arg1",game.popLimit());
		dynamicCellsSetStyle();
		openTab(null, 'tabPopulation');
	} else {
		if (game.years.length > 0) {
			for (i=0;i<game.years.length;i++) {
				year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[i] +'</span></td>';
				pop.innerHTML  = pop.innerHTML  +'<td><span class="dynamicCells">'+ game.pops[i]  +'</span></td>';
			}
			document.getElementById("lblCurrentPopLimit").innerHTML=localeStrings[162].replace("%arg1",game.popLimit());
			dynamicCellsSetStyle();
			openTab(null, 'tabPopulation');
		} else {
			// TODO show something!
		}
	}
}
function popPrev() {
	var year = document.getElementById("popStatK");
	var pop  = document.getElementById("popStatV");
	year.innerHTML = "";
	pop.innerHTML  = "";
	if (popPage - 1 > 0) {
		popPage  = popPage-1;
	} else {
		popPage = 0;
	}
	popPage  = Math.round(popPage*10)/10;
	if (game.years.length > 10) {
		//select the latest 10
		for (i=0;i<10;i++) {
			year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[popPage*10+i] +'</span></td>';
			pop.innerHTML  = pop.innerHTML  +'<td><span class="dynamicCells">'+ game.pops[popPage*10+i]  +'</span></td>';
		}
		document.getElementById("lblCurrentPopLimit").innerHTML=localeStrings[162].replace("%arg1",game.popLimit());
		dynamicCellsSetStyle();
		openTab(null, 'tabPopulation');
	} else {
		if (game.years.length > 0) {
			for (i=0;i<game.years.length;i++) {
				year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[game.years.length-game.years.length+i] +'</span></td>';
				pop.innerHTML  = pop.innerHTML  +'<td><span class="dynamicCells">'+ game.pops[game.years.length-game.years.length+i]  +'</span></td>';
			}
			document.getElementById("lblCurrentPopLimit").innerHTML=localeStrings[162].replace("%arg1",game.popLimit());
			dynamicCellsSetStyle();
			openTab(null, 'tabPopulation');
		} else {
			// nothing to show
		}
	}
}
function popNext() {
	var year = document.getElementById("popStatK");
	var pop  = document.getElementById("popStatV");
	year.innerHTML  = "";
	pop.innerHTML   = "";
	if (popPage + 1 < Math.round(game.years.length)/10-1 ) {
		popPage  = popPage+1;
	} else {
		popPage  = Math.round(game.years.length)/10-1;
	}
	popPage  = Math.round(popPage*10)/10;
	if (game.years.length > 10) {
		//select the latest 10
		for (i=0;i<10;i++) {
			year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[popPage*10+i] +'</span></td>';
			pop.innerHTML  = pop.innerHTML  +'<td><span class="dynamicCells">'+ game.pops[popPage*10+i]  +'</span></td>';
		}
		document.getElementById("lblCurrentPopLimit").innerHTML=localeStrings[162].replace("%arg1",game.popLimit());
		dynamicCellsSetStyle();
		openTab(null, 'tabPopulation');
	} else {
		if (game.years.length > 0) {
			for (i=0;i<game.years.length;i++) {
				year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[game.years.length-game.years.length+i] +'</span></td>';
				pop.innerHTML  = pop.innerHTML  +'<td><span class="dynamicCells">'+ game.pops[game.years.length-game.years.length+i]  +'</span></td>';
			}
			document.getElementById("lblCurrentPopLimit").innerHTML=localeStrings[162].replace("%arg1",game.popLimit());
			dynamicCellsSetStyle();
			openTab(null, 'tabPopulation');
		} else {
			// nothing to show
		}
	}
}
function popAtEnd() {
	checkPop();
}
goldPage = 0;
function checkGold() {
	var year = document.getElementById("goldStatK");
	var gold = document.getElementById("goldStatV");
	year.innerHTML  = "";
	gold.innerHTML  = "";
	goldPage = Math.round(game.years.length)/10;
	if (game.years.length > 10) {
		//select the latest 10
		for (i=0;i<10;i++) {
			year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[game.years.length-10+i]    +'</span></td>';
			gold.innerHTML = gold.innerHTML +'<td><span class="dynamicCells">'+ game.budgets[game.years.length-10+i]  +'</span></td>';
			//console.log('period is '+game.years[game.years.length-10+i]+' and gold is '+game.budgets[game.years.length-10+i]);
		}
		document.getElementById("lblCurrentGoldLimit").innerHTML=localeStrings[163].replace("%arg1",game.goldLimit());
		dynamicCellsSetStyle();
		openTab(null, 'tabGold');
	} else {
		if (game.years.length > 0) {
			for (i=0;i<game.years.length;i++) {
				year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[game.years.length-game.years.length+i]    +'</span></td>';
				gold.innerHTML = gold.innerHTML +'<td><span class="dynamicCells">'+ game.budgets[game.years.length-game.years.length+i]  +'</span></td>';
				//console.log('period is '+game.years[game.years.length-game.years.length+i]+' and gold is '+game.budgets[game.years.length-game.years.length+i]);
			}
			document.getElementById("lblCurrentGoldLimit").innerHTML=localeStrings[163].replace("%arg1",game.goldLimit());
			dynamicCellsSetStyle();
			openTab(null, 'tabGold');
		} else {
			// nothing to show
			var alertMsg = localeStrings[65];
			disabledElements.push("saveGameButton");
			disabledElements.push("loadGameButton");
			document.getElementById("saveGameButton").disabled = true;
			document.getElementById("loadGameButton").disabled = true;
			showModal(0, '', getAck, alertMsg,  localeStrings[65], '')
		}
	}
}
function goldAtStart() {
	var year = document.getElementById("goldStatK");
	var gold = document.getElementById("goldStatV");
	year.innerHTML  = "";
	gold.innerHTML  = "";
	goldPage  = 0;
	if (game.years.length > 10) {
		//select the latest 10
		for (i=0;i<10;i++) {
			year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[i]    +'</span></td>';
			gold.innerHTML = gold.innerHTML +'<td><span class="dynamicCells">'+ game.budgets[i]  +'</span></td>';
			//console.log('period is '+game.years[i]+' and gold is '+game.budgets[i]);
		}
		document.getElementById("lblCurrentGoldLimit").innerHTML=localeStrings[163].replace("%arg1",game.goldLimit());
		dynamicCellsSetStyle();
		openTab(null, 'tabGold');
	} else {
		if (game.years.length > 0) {
			for (i=0;i<game.years.length;i++) {
				year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[i]    +'</span></td>';
				gold.innerHTML = gold.innerHTML +'<td><span class="dynamicCells">'+ game.budgets[i]  +'</span></td>';
				//console.log('period is '+game.years[i]+' and gold is '+game.budgets[i]);
			}
			document.getElementById("lblCurrentGoldLimit").innerHTML=localeStrings[163].replace("%arg1",game.goldLimit());
			dynamicCellsSetStyle();
			openTab(null, 'tabGold');
		} else {
			// nothing to show
		}
	}
}
function goldPrev() {
	var year = document.getElementById("goldStatK");
	var gold = document.getElementById("goldStatV");
	year.innerHTML  = "";
	gold.innerHTML  = "";
	if (goldPage - 1 > 0) {
		goldPage  = goldPage-1;
	} else {
		goldPage  = 0;
	}
	goldPage  = Math.round(goldPage*10)/10;
	//console.log(goldPage);
	if (game.years.length > 10) {
		//select the latest 10
		for (i=0;i<10;i++) {
			year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[goldPage*10+i]    +'</span></td>';
			gold.innerHTML = gold.innerHTML +'<td><span class="dynamicCells">'+ game.budgets[goldPage*10+i]  +'</span></td>';
		}
		document.getElementById("lblCurrentGoldLimit").innerHTML=localeStrings[163].replace("%arg1",game.goldLimit());
		dynamicCellsSetStyle();
		openTab(null, 'tabGold');
	} else {
		if (game.years.length > 0) {
			for (i=0;i<game.years.length;i++) {
				year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[game.years.length-game.years.length+i]    +'</span></td>';
				gold.innerHTML = gold.innerHTML +'<td><span class="dynamicCells">'+ game.budgets[game.years.length-game.years.length+i]  +'</span></td>';
			}
			document.getElementById("lblCurrentGoldLimit").innerHTML=localeStrings[163].replace("%arg1",game.goldLimit());
			dynamicCellsSetStyle();
			openTab(null, 'tabGold');
		} else {
			// nothing to show
		}
	}
}
function goldNext() {
	var year  = document.getElementById("goldStatK");
	var gold  = document.getElementById("goldStatV");
	year.innerHTML  = "";
	gold.innerHTML  = "";
	if (goldPage + 1 < Math.round(game.years.length)/10-1 ) {
		goldPage  = goldPage+1;
	} else {
		goldPage  = Math.round(game.years.length)/10-1;
	}
	goldPage  = Math.round(goldPage*10)/10;
	//console.log(goldPage);
	if (game.years.length > 10) {
		//select the latest 10
		for (i=0;i<10;i++) {
			year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[goldPage*10+i]    +'</span></td>';
			gold.innerHTML = gold.innerHTML +'<td><span class="dynamicCells">'+ game.budgets[goldPage*10+i]  +'</span></td>';
		}
		document.getElementById("lblCurrentGoldLimit").innerHTML=localeStrings[163].replace("%arg1",game.goldLimit());
		dynamicCellsSetStyle();
		openTab(null, 'tabGold');
	} else {
		if (game.years.length > 0) {
			for (i=0;i<game.years.length;i++) {
				year.innerHTML = year.innerHTML +'<td><span class="dynamicCells">'+ game.years[game.years.length-game.years.length+i]    +'</span></td>';
				gold.innerHTML = gold.innerHTML +'<td><span class="dynamicCells">'+ game.budgets[game.years.length-game.years.length+i]  +'</span></td>';
			}
			document.getElementById("lblCurrentGoldLimit").innerHTML=localeStrings[163].replace("%arg1",game.goldLimit());
			dynamicCellsSetStyle();
			openTab(null, 'tabGold');
		} else {
			// nothing to show
		}
	}
}
function goldAtEnd() {
	checkGold();
}
