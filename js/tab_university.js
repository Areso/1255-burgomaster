techTreeLoaded = false;
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
    if (!techTreeLoaded){
        include('js/objects_technology_tree.js',function(){
		});
		techTreeLoaded = true;
    }
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

