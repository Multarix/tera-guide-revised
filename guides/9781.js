// Velik's Sanctuary
//
// made by michengs / HSDN
// Updated to revised version

exports.guide = (mod, extras) => {

	let thirdboss_fifty = false;
	function thirdboss_message_event(skillid){
		switch(skillid){
		// Lakan has noticed you.
			case 1043:
				if(!thirdboss_fifty){
					extras.sendMessage(mod, "Debuffs > Circles > Bombs");
				} else {
					extras.sendMessage(mod, "Debuffs > Bombs > Circles");
				}
				break;
				// Lakan is trying to take you on one at a time.
			case 1044:
				if(!thirdboss_fifty){
					extras.sendMessage(mod, "Circles > Bombs > Debuffs");
				} else {
					extras.sendMessage(mod, "Circles > Debuffs > Bombs");
				}
				break;
				// Lakan intends to kill all of you at once.
			case 1045:
				if(!thirdboss_fifty){
					extras.sendMessage(mod, "Bombs > Debuffs > Circles");
				} else {
					extras.sendMessage(mod, "Bombs > Circles > Debuffs");
				}
				break;
		}
	}
	function thirdboss_start_event(){
		thirdboss_fifty = false;
	}
	function thirdboss_fifty_event(){
		thirdboss_fifty = true;
	}

	return {
		// 1 BOSS
		"s-781-1000-2401": [{ type: "text", message: "Right" },
			{ type: "spawn", function: "marker", args: [false, 300, 100, 2000, true, null] },
			{ type: "spawn", function: "marker", args: [false, 230, 100, 2000, true, null] }],
		"s-781-1000-2402": [{ type: "text", message: "Left" },
			{ type: "spawn", function: "marker", args: [false, 60, 100, 2000, true, null] },
			{ type: "spawn", function: "marker", args: [false, 130, 100, 2000, true, null] }],
		"s-781-1000-2304-0": [{ type: "text", message: "Flying" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 6000] }],
		"s-781-1000-2303-0": [{ type: "text", message: "Spin" }],
		"s-781-1000-2113-0": [{ type: "text", message: "Front + AoEs" }],
		"s-781-1000-2308-0": [{ type: "text", message: "OUT" }],
		"s-781-1000-2309-0": [{ type: "text", message: "IN" }],
		"s-781-1000-1401": [{ type: "text", message: "Right" },
			{ type: "spawn", function: "marker", args: [false, 300, 100, 2000, true, null] },
			{ type: "spawn", function: "marker", args: [false, 230, 100, 2000, true, null] }],
		"s-781-1000-1402": [{ type: "text", message: "Left" },
			{ type: "spawn", function: "marker", args: [false, 60, 100, 2000, true, null] },
			{ type: "spawn", function: "marker", args: [false, 130, 100, 2000, true, null] }],
		"s-781-1000-1304-0": [{ type: "text", message: "Flying" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 6000] }],
		"s-781-1000-1303-0": [{ type: "text", message: "Spin" }],
		"s-781-1000-1113-0": [{ type: "text", message: "Front + AoEs" }],
		"s-781-1000-1308-0": [{ type: "text", message: "OUT" }],
		"s-781-1000-1309-0": [{ type: "text", message: "IN" }],
		// "qb-781-1000-78102": [{ type: "text", message: "Run away" }],
		// "qb-781-1000-78103": [{ type: "text", message: "点名炸石柱" }], // круг на одного
		// "qb-781-1000-78106": [{ type: "text", message: "集体炸石柱" }], // круги на всех

		// 2 BOSS
		// Cage Mechanic
		// "s-781-2000-1503-0": [{ type: "text", message: "坦快跑远" }], // наткнул
		"s-781-2000-1106-0": [{ type: "text", message: "Back" }],
		"s-781-2000-1108-0": [{ type: "text", message: "Front" }],
		"s-781-2000-1111-0": [{ type: "text", message: "360 attack" }],
		"s-781-2000-1302-0": [{ type: "text", message: "Bait" }],
		// "s-781-2000-1121-0": [{ type: "text", message: "Summon Mobs" }],
		"s-781-2000-1501-0": [{ type: "text", message: "Identification" },
			{ type: "text", delay: 1000, message: "3" },
			{ type: "text", delay: 2000, message: "2" },
			{ type: "text", delay: 3000, message: "1" }],
		"s-781-2000-1130-0": [{ type: "text", message: "Left" },
			{ type: "spawn", function: "marker", args: [false, 60, 100, 2000, true, null] },
			{ type: "spawn", function: "marker", args: [false, 130, 100, 2000, true, null] }],
		"s-781-2000-1131-0": [{ type: "text", message: "Right" },
			{ type: "spawn", function: "marker", args: [false, 300, 100, 2000, true, null] },
			{ type: "spawn", function: "marker", args: [false, 230, 100, 2000, true, null] }],
		// "s-781-2000-2503-0": [{ type: "text", message: "坦快跑远" }], // дурион выбрал цель
		"s-781-2000-2106-0": [{ type: "text", message: "Back" }],
		"s-781-2000-2108-0": [{ type: "text", message: "Front" }],
		"s-781-2000-2111-0": [{ type: "text", message: "360 attack" }],
		// "s-781-2000-2121-0": [{ type: "text", message: "Summon Mobs" }],
		"s-781-2000-2501-0": [{ type: "text", message: "Identification" },
			{ type: "text", delay: 1000, message: "3" },
			{ type: "text", delay: 2000, message: "2" },
			{ type: "text", delay: 3000, message: "1" }],
		"s-781-2000-2130-0": [{ type: "text", message: "Left" },
			{ type: "spawn", function: "marker", args: [false, 60, 100, 2000, true, null] },
			{ type: "spawn", function: "marker", args: [false, 130, 100, 2000, true, null] }],
		"s-781-2000-2131-0": [{ type: "text", message: "Right" },
			{ type: "spawn", function: "marker", args: [false, 300, 100, 2000, true, null] },
			{ type: "spawn", function: "marker", args: [false, 230, 100, 2000, true, null] }],
		// "s-781-2000-4000-0": [{ type: "text", message: "鉴定！！！！" }],
		// "dm-0-0-9781022": [{ type: "text", message: "鉴定" }],
		// "dm-0-0-9781023": [{ type: "text", message: "全场鉴定" }],
		"dm-0-0-9781046": [{ type: "text", message: "First: (Debuffs) Closest" }], // Thank you... for this release...
		"dm-0-0-9781047": [{ type: "text", message: "First: (Circles) Spread" }], // Beware the... red lightning...
		"dm-0-0-9781048": [{ type: "text", message: "First: (Bombs) Gather + Cleanse" }], // Beware the mark... of Lakan...
		// 3 BOSS
		"h-781-3000-99": [{ type: "function", function: thirdboss_start_event }],
		"h-781-3000-50": [{ type: "function", function: thirdboss_fifty_event }],
		"dm-0-0-9781043": [{ type: "function", function: thirdboss_message_event, args: [1043] }], // Lakan has noticed you.
		"dm-0-0-9781044": [{ type: "function", function: thirdboss_message_event, args: [1044] }], // Lakan is trying to take you on one at a time.
		"dm-0-0-9781045": [{ type: "function", function: thirdboss_message_event, args: [1045] }], // Lakan intends to kill all of you at once.
		"s-781-3000-1404-0": [{ type: "text", message: "(Debuffs) Closest" }],
		"s-781-3000-1405-0": [{ type: "text", message: "(Debuffs) Farthest" }],
		"s-781-3000-1301-0": [{ type: "text", message: "(Bombs) Gather + Cleanse" }],
		"s-781-3000-1302-0": [{ type: "text", message: "(Bombs) Gather + No cleanse" }],
		"s-781-3000-3103-0": [{ type: "text", message: "(Circles) Spread" }],
		"s-781-3000-3105-0": [{ type: "text", message: "(Circles) Gather" }],
		// "s-781-3000-1116-0": [{ type: "text", message: "Wave" }],
		// "s-781-3000-2116-0": [{ type: "text", message: "Circle" }],
		"s-781-3000-1136-0": [{ type: "text", message: "Claw" }],
		"s-781-3000-1701-0": [{ type: "text", message: "Back + Front" }],
		"s-781-3000-1113-0": [{ type: "text", message: "Bait" }],
		"s-781-3000-1151-0": [{ type: "text", message: "Attention Stun" }],
		"s-781-3000-2151-0": [{ type: "text", message: "Attention Stun" }],
		"s-781-3000-2113-0": [{ type: "text", message: "Bait" }],
		"s-781-3000-1152-0": [{ type: "text", message: "Stun + Back" }],
		"s-781-3000-2152-0": [{ type: "text", message: "Stun + Back" }],
		"s-781-3000-2138-0": [{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 250, 6000] }],
		"s-781-3000-1138-0": [{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 250, 6000] }],
		"s-781-3000-1144-0": [{ type: "text", message: "OUT" }],
		"s-781-3000-1145-0": [{ type: "text", message: "IN" }],
		"s-781-3000-1240-0": [{ type: "text", message: "Donuts" }, { type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 350, 6000] }],
		"s-781-3000-1401-0": [{ type: "text", message: "Plague/Regress" }],
		"s-781-3000-1402-0": [{ type: "text", message: "Sleep" }]
	};
};

exports.type = {
	es: false,
	sp: true
};
