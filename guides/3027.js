// Forbidden Arena [Hagufna]
//
// made by michengs / HSDN

exports.guide = (mod, extras) => {
	const { HIGHLIGHT_ITEM } = require("../lib.js");

	let timer1 = null;
	let timer2 = null;
	let print_shield = true;
	let print_hp = true;
	let is_hp_74_39 = false;

	function shield_event(){
		mod.clearTimeout(timer1);
		mod.clearTimeout(timer2);

		timer1 = mod.setTimeout(() => {
			if(!is_hp_74_39){
				extras.sendMessage(mod, "Shield in 5 seconds!");
			}
		}, 85000);

		timer2 = mod.setTimeout(() => {
			if(!is_hp_74_39){
				extras.sendMessage(mod, "Shield in 15 seconds!");
			}
		}, 75000);
	}

	function boss_hp_event(hp){
		if([74, 39].includes(hp)){
			if(print_hp){
				mod.clearTimeout(timer1);
				mod.clearTimeout(timer2);
				print_hp = false;
				is_hp_74_39 = true;
				mod.setTimeout(() => print_hp = true, 15000);
			}
		}
		if([89, 59, 29].includes(hp)){ // до щита
			if(print_shield){
				print_shield = false;
				is_hp_74_39 = false;
				mod.setTimeout(() => print_shield = true, 15000);

				extras.sendMessage(mod, "Ready for Shield");
			}
		}
	}

	return {
		"nd-3027-1000": [{ type: "stop_timers" },
			{ type: "despawn_all" }],
		"h-3027-1000-89": [{ type: "function", function: boss_hp_event, args: [89] }],
		"h-3027-1000-59": [{ type: "function", function: boss_hp_event, args: [59] }],
		"h-3027-1000-29": [{ type: "function", function: boss_hp_event, args: [29] }],
		"h-3027-1000-74": [{ type: "function", function: boss_hp_event, args: [74] }],
		"h-3027-1000-39": [{ type: "function", function: boss_hp_event, args: [39] }],

		// "s-3027-1001-255-0": [{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 3000, 5000] }],  //0
		// "s-3027-1002-256-0": [{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 3000, 5000] }],  //60
		// "s-3027-1003-257-0": [{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 3000, 5000] }],  //0
		// "s-3027-1004-258-0": [{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 3000, 5000] }],  //60

		"s-3027-1000-108-0": [{ type: "text", position: "tank", message: "Strike (Slow)" }], // 101 121 122 -> 108
		// "s-3027-1000-355-0": [{ type: "text", message: "Eviscerate" }], //         102 121 103 -> 355 -> 114
		"s-3027-1000-135-0": [{ type: "text", message: "Strike (Slow)" }], //         104 -> 135 -> 130
		"s-3027-1000-111-0": [{ type: "text", message: "Stun | Strike" }], //         104 -> 111 -> 130
		"s-3027-1000-112-0": [{ type: "text", message: "Back Jump | Strike" }], //    121 102 -> 112 -> 130

		// прыжок
		"s-3027-1000-116-0": [{ type: "text", message: "Jump" },
			{ type: "spawn", function: "circle", args: [true, 413, 0, 180, 8, 560, 1000] }],
		"s-3027-1000-116-1": [{ type: "text", message: "Dodge" },
			{ type: "spawn", function: "circle", args: [true, 912, 0, 180, 8, 480, 3000] }],

		// 3 оборота -> прыжок (145 -> 139 -> 140)
		"s-3027-1000-145-0": [{ type: "text", message: "3x360 | Jump" }],
		"s-3027-1000-139-0": [{ type: "text", delay: 1000, message: "Jump" },
			{ type: "spawn", function: "circle", args: [true, 413, 0, 180, 8, 660, 1000], delay: 1000 }],
		"s-3027-1000-140-0": [{ type: "text", message: "Dodge" },
			{ type: "spawn", function: "circle", args: [true, 912, 0, 180, 8, 480, 3000] }],

		// 109 -> 402 -> 130
		"s-3027-1000-109-0": [{ type: "text", message: "Forward Jump" }],
		"s-3027-1000-402-0": [{ type: "text", message: "Jump" }],

		// 136 -> 144 -> 130
		"s-3027-1000-136-0": [{ type: "text", message: "2x360 | Strike" }],
		"s-3027-1000-144-0": [{ type: "text", message: "Strike" }],

		// 134 -> 147
		"s-3027-1000-134-0": [{ type: "text", message: "Turn around | Back" }],
		"s-3027-1000-134-1": [{ type: "text", message: "Back" }],
		"s-3027-1000-147-0": [{ type: "text", message: "Strike" }],

		// 142 -> 143 114 130
		"s-3027-1000-142-0": [{ type: "text", message: "2x360 | Strike" }],
		"s-3027-1000-143-0": [{ type: "text", message: "Strike" }],

		"s-3027-1000-141-0": [{ type: "text", message: "2x360 | Eviscerate" }], // 141 -> 146 114 130
		"s-3027-1000-146-0": [{ type: "text", message: "Eviscerate | Strike" }], // 146 ->         114 -> 130

		// стяжка -> бублики (350 -> 302)
		"s-3027-1000-350-0": [{ type: "text", message: "Red: Donuts (Out > In)" },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 12, 240, 5000] },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 8, 480, 5000] },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 3, 950, 5000] },
			{ type: "spawn", function: "item", args: [HIGHLIGHT_ITEM, 0, 0, 1000], delay: 3800 },
			{ type: "text", delay: 3800, message: "In" },
			{ type: "spawn", function: "marker", args: [false, 180, 100, 1000, false, ["CENTER", "IN"]], delay: 3800 },
			{ type: "spawn", function: "marker", args: [false, 0, 100, 1000, false, ["CENTER", "IN"]], delay: 3800 },
			{ type: "spawn", function: "marker", args: [false, 90, 100, 1000, false, ["CENTER", "IN"]], delay: 3800 },
			{ type: "spawn", function: "marker", args: [false, 270, 100, 1000, false, ["CENTER", "IN"]], delay: 3800 },
			{ type: "text", delay: 58000, message: "Mechanics soon..." }],
		// стяжка -> волна (357 -> 110)
		"s-3027-1000-357-0": [{ type: "text", message: "Purple: Get Out" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 20, 500, 5000], delay: 2000 },
			{ type: "text", delay: 58000, message: "Mechanics soon..." }],

		// "s-3027-1000-114-0": [{ type: "text", message: "Eviscerate (slow)" }],
		// "s-3027-1000-130-0": [{ type: "text", message: "Target" }],
		"s-3027-1000-151-0": [{ type: "text", message: "Back teleport | Strike" }], // 151 149 148 -> 130
		"s-3027-1000-149-1": [{ type: "text", message: "Back teleport (Target)" }],
		"s-3027-1000-117-0": [{ type: "text", message: "Teleport (Target)" }], //         117 -> 130
		"s-3027-1000-356-0": [{ type: "text", message: "Teleport (Target)" }], //         356 -> 147
		"s-3027-1000-148-1": [{ type: "text", message: "Teleport (Target)" }],

		"s-3027-1000-351-0": [{ type: "text", message: "Shield!" },
			{ type: "function", function: shield_event }],
		"s-3027-1000-401-0": [{ type: "text", message: "30% AOE!" },
			{ type: "text", delay: 1600, message: "Dodge!" }]
	};
};

exports.type = { es: false, sp: false };
