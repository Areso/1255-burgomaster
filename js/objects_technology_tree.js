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