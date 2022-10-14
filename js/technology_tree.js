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
    grant_system: {
        id: "grant_system",
        type: "hire",
        img: "grant_system.png",
        year: 1261,
        season: 1,
        prereqs: [],
        name: {
			"default":"grant system",
        	"en-US":"grant system",
        	"ru-RU":"система грантов",
        },
        descr: {
			"default":"allow bright mind, but poor people get education",
        	"en-US":"allow bright mind, but poor people get education",
        	"ru-RU":"позволяет выдающимся, но малоимущим людям получать образование",
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
    smm_faculty: {
        id: "smm_faculty",
        type: "hire",
        img: "smm_faculty.png",
        year: 1260,
        season: 1,
        prereqs: ["civil_propaganda", "grant_system"],
        name: {
			"default":"smm faculty",
        	"en-US":"smm faculty",
        	"ru-RU":"факультет SMM",
        },
        descr: {
			"default":"decrease price for military and civilpropaganda",
        	"en-US":"decrease price for military and civilpropaganda",
        	"ru-RU":"уменьшает цену работы гражданской и военной агитации",
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

Object.freeze(tech_list);

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

function getTechName(techName){
	var tech = tech_list[techName];
	if (isNil(tech)) {
		throw new Error('Tech with name "' + techName + '" not found.');
	}
	if (tech["name"][language]) {
		return tech["name"][language];
	}
	return tech["name"][language]['default'];
}

function getTechDescr(techName){
	var tech = tech_list[techName];
	if (isNil(tech)) {
		throw new Error('Tech with name "' + techName + '" not found.');
	}

	if (tech["descr"][language]) {
		return tech["descr"][language];
	}
	return tech["descr"][language]['default'];

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
		//check whether we already learned (we shouldn't)
		if (!game.techLearned.includes(tech_list[tech]["id"])) {
			//check whether we already advanced in the timeline far enough
			if (game.year>=tech_list[tech]["year"] && game.season>=tech_list[tech]["season"]){
				//finally, check whether all prereqs are learned
				unlocked = true;
				if (tech_list[tech]["prereqs"].length>0){
					for (let i=0; i<tech_list[tech]["prereqs"].length; i++){
						the_prereq = tech_list[tech]["prereqs"][i]
						if (!game.techLearned.includes(the_prereq)){
							unlocked = false;
						}
					}
				}
				if (unlocked){
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
}

