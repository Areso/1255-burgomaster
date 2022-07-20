var techs = {
    war_propaganda: {
        id: "war_propaganda",
        type: "hire",
        img: "war_propaganda.png",
        name: "war propaganda",
        name_loc: {
        	"en-US":"war_propaganda",
        	"ru-RU":"военная агитация"
        },
        desc: "decrease price for hire and upkeep military units",
        desc_loc: {
        	"en-US":"decrease price for hire and upkeep military units",
        	"ru-RU":"уменьшает цену для найма и содержания военных юнитов"
        },
        attrs: {
        "hire cost":0.7,
        "upkeep cost":0.7,
        },
     	attrs_type: {
     	"hire_cost":"relative",
     	"upkeep_cost":"relative"
     	},  
        priceBuy: 200,
        upkeep: 5
    },
};

Object.freeze(techs);
