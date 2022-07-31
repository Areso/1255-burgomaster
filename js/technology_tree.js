var tech_list = {
    war_propaganda: {
        id: "war_propaganda",
        type: "hire",
        img: "war_propaganda.png",
        year: 1255,
        season: 1,
        prereqs: [],
        name: {
			"default":"war propaganda",
        	"en-US":"war propaganda",
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
        upkeep: 5,
        switchable: true,
    },
    civil_propaganda: {
        id: "civil_propaganda",
        type: "hire",
        img: "civil_propaganda.png",
        year: 1260,
        season: 1,
        prereqs: ["war_propaganda"],
        name: {
			"default":"civil propaganda",
        	"en-US":"civil propaganda",
        	"ru-RU":"гражданская агитация",
        },
        descr: {
			"default":"decrease price for hire and upkeep civil units and services",
        	"en-US":"decrease price for hire and upkeep civil units and services",
        	"ru-RU":"уменьшает цену для найма и содержания гражданских юнитов и сервисов",
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
        upkeep: 5,
        switchable: true,
    },
};

function researchTech (){
	if (game.gold >= tech_list[selectedTech]["priceResearch"]) {
		game.gold = game.gold-tech_list[selectedTech]["priceResearch"];
		game.techLearned.push(tech_list[selectedTech]);
		let name = getTechName(selectedTech);
		console.log("we learned "+name);
		game.techLearned.push(selectedTech);
		if (tech_list[selectedTech]["switchable"]) {
			game.techEnabled.push(selectedTech);
		}
		updateUI();
		//drawTabUniversity();
		lblResearchHelp.innerHTML = "";
	}
}
Object.freeze(tech_list);
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
function researchHelp(myobject) {
	selectedTech               = myobject.id;
	lblResearchHelp            = document.getElementById("lblReseachHelp");
	lblResearchHelp.innerHTML  = getTechName(selectedTech)  + '<br>';
	lblResearchHelp.innerHTML += getTechDescr(selectedTech) + '<br>';
	lblResearchHelp.innerHTML += '<button onclick="researchTech()">Reserch</button>';
}

tech_tree_area = document.getElementById("available_researches");
drawTabUniversity();
function drawTabUniversity(){
	tech_tree_area.innerHTML = "";
	
	for (tech in tech_list) {
		console.log(tech);
		if (!game.techLearned.includes(tech_list[tech]["id"])) {
			console.log("continue with");
			console.log(tech);
			if (game.year>=tech_list[tech]["year"] && game.season>=tech_list[tech]["season"]){ 
				src = 'resources/techs/'+tech_list[tech]["img"];
				let id = tech_list[tech]["id"]
				id = "\""+id+"\"";
				//let obj = '<img src="'+src+'"'+"onclick='researchHelp("+id+")'"+"onmouseover='researchHelp("+id+")'"+">";
				let obj = '<img id='+id+' src="'+src+'"'+"onclick='researchHelp(this)'"+"onmouseover='researchHelp(this)'"+">";
				tech_tree_area.innerHTML += obj;
			}
		}
	}
}

