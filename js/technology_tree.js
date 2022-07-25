var tech_list = {
    war_propaganda: {
        id: "war_propaganda",
        type: "hire",
        img: "war_propaganda.png",
        name: "war propaganda",
        year: 1255,
        season: 1,
        prereqs: [],
        name: {
			"default":"war_propaganda",
        	"en-US":"war_propaganda",
        	"ru-RU":"военная агитация",
        },
        descr: {
			"default":"decrease price for hire and upkeep military units",
        	"en-US":"decrease price for hire and upkeep military units",
        	"ru-RU":"уменьшает цену для найма и содержания военных юнитов",
        },
        attrs: {
        "hire cost":0.7,
        "upkeep cost":0.7,
        },
     	attrs_type: {
     	"hire_cost":"relative",
     	"upkeep_cost":"relative"
     	},  
        priceResearch: 200,
        upkeep: 5
    },
};
function research (techName) {
	console.log("THE RESEARCH");
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
			//ToDo check whether we learned the tech already
			if (game.gold >= tech_list[techName]["priceResearch"]) {
				game.gold = game.gold-tech_list[techName]["priceResearch"];
				let name = getTechName(techName);
				console.log("we learned "+name); 
			}
		}
function getTechName(techName){
	if (tech_list[techName]["name"][language]===undefined) {
		return tech_list[techName]["name"]["default"]; 
	} else {
		return tech_list[techName]["name"][language];
	}
}
function getTechDescr(techName){
	if (tech_list[techName]["descr"][language]===undefined) {
		return tech_list[techName]["descr"]["default"]; 
	} else {
		return tech_list[techName]["descr"][language];
	}	
} 
tech_tree_area = document.getElementById("available_researches");
			for (tech in tech_list) {
				src = 'resources/techs/'+tech_list[tech]["img"];
				let id = tech_list[tech]["id"]
				id = "\""+id+"\""
				console.log(id);
				let obj = '<img src="'+src+'"'+"onclick='research("+id+")'"+">";
				tech_tree_area.innerHTML += obj;
			}
Object.freeze(tech_list);
