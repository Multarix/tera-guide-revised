// Forbidden Arena [Hagufna]
//
// made by michengs / HSDN



let player, entity, library, effect;

let timer1;
let timer2;
let timer3;
let shield_notices = true;
let print_shield = true;
let print_hp = true;
let print_mech = true;
let is_hp_74_39 = false;

function skilld_event(skillid, handlers, event, ent, dispatch){
	if([351].includes(skillid)){ // щит
		if(shield_notices){
			dispatch.clearTimeout(timer1);
			dispatch.clearTimeout(timer2);
			shield_notices = false;
			dispatch.setTimeout(() => shield_notices = true, 5000);
			timer1 = dispatch.setTimeout(()=> {
				handlers['text']({
					"sub_type": "message",
					"message": is_hp_74_39 ? "!" : "Shield in 5 seconds!",
					"message_RU": is_hp_74_39 ? "!" : "Через 5 сек. щит!"
				});
			}, 85000);
			timer2 = dispatch.setTimeout(()=> {
				handlers['text']({
					"sub_type": "message",
					"message": is_hp_74_39 ? "!" : "Shield in 15 seconds!",
					"message_RU": is_hp_74_39 ? "!" : "Через 15 сек. щит!"
				});
			}, 75000);
		}
	}
	if([74, 39].includes(skillid)){
		if(print_hp){
			dispatch.clearTimeout(timer1);
			dispatch.clearTimeout(timer2);
			print_hp = false;
			is_hp_74_39 = true;
			dispatch.setTimeout(() => print_hp = true, 15000);
		}
	}
	if([89, 59, 29].includes(skillid)){ // до щита
		if(print_shield){
			print_shield = false;
			is_hp_74_39 = false;
			dispatch.setTimeout(() => print_shield = true, 15000);
			handlers['text']({
				"sub_type": "alert",
				"message": "Ready for Shield",
				"message_RU": "Готовность ломать щит"
			});
		}
	}
	if([350, 357].includes(skillid)){ // до стяжки
		if(print_mech){
			dispatch.clearTimeout(timer3);
			print_mech = false;
			dispatch.setTimeout(() => print_mech = true, 15000);
			timer3 = dispatch.setTimeout(()=> {
				handlers['text']({
					"sub_type": "alert",
					"message": "Mechanics soon...",
					"message_RU": "Скоро стяжка..."
				});
			}, 58000);
		}
	}
}

module.exports = (mod) => {
	return {

		"h-3027-1000-89": [{ "type": "function", "function": skilld_event[89] }],
		"h-3027-1000-59": [{ "type": "function", "function": skilld_event[59] }],
		"h-3027-1000-29": [{ "type": "function", "function": skilld_event[29] }],
		"h-3027-1000-74": [{ "type": "function", "function": skilld_event[74] }],
		"h-3027-1000-39": [{ "type": "function", "function": skilld_event[39] }],

		// "s-3027-1001-255-0": [{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 3000, 0, 5000] }],  //0
		// "s-3027-1002-256-0": [{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 3000, 0, 5000] }],  //60
		// "s-3027-1003-257-0": [{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 3000, 0, 5000] }],  //0
		// "s-3027-1004-258-0": [{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 3000, 0, 5000] }],  //60

		"s-3027-1000-108-0": [{ "type": "text", "class_position":"tank", "message": "Strike (Slow)" }], // 101 121 122 -> 108
		// "s-3027-1000-355-0": [{ "type": "text", "message": "Eviscerate" }],                                 // 102 121 103 -> 355 -> 114
		"s-3027-1000-135-0": [{ "type": "text", "message": "Strike (Slow)" }], //         104 -> 135 -> 130
		"s-3027-1000-111-0": [{ "type": "text", "message": "Stun | Strike" }], //         104 -> 111 -> 130
		"s-3027-1000-112-0": [{ "type": "text", "message": "Back Jump | Strike" }], //     121 102 -> 112 -> 130

		// прыжок
		"s-3027-1000-116-0": [{ "type": "text", "message": "Jump" },
			{ "type": "function", "function": spawn.circle, "args": [true, 413, 0, 180, 8, 560, 0, 1000] }],
		"s-3027-1000-116-1": [{ "type": "text", "message": "Dodge" },
			{ "type": "function", "function": spawn.circle, "args": [true, 912, 0, 180, 8, 480, 0, 3000] }],

		// 3 оборота -> прыжок (145 -> 139 -> 140)
		"s-3027-1000-145-0": [{ "type": "text", "message": "3x360 | Jump" }],
		"s-3027-1000-139-0": [{ "type": "text", "delay": 1000, "message": "Jump" },
			{ "type": "function", "function": spawn.circle, "args": [true, 413, 0, 180, 8, 660, 1000, 1000] }],
		"s-3027-1000-140-0": [{ "type": "text", "message": "Dodge" },
			{ "type": "function", "function": spawn.circle, "args": [true, 912, 0, 180, 8, 480, 0, 3000] }],

		// 109 -> 402 -> 130
		"s-3027-1000-109-0": [{ "type": "text", "message": "Forward Jump" }],
		"s-3027-1000-402-0": [{ "type": "text", "message": "Jump" }],

		// 136 -> 144 -> 130
		"s-3027-1000-136-0": [{ "type": "text", "message": "2x360 | Strike" }],
		"s-3027-1000-144-0": [{ "type": "text", "message": "Strike" }],

		// 134 -> 147
		"s-3027-1000-134-0": [{ "type": "text", "message": "Turn around | Back" }],
		"s-3027-1000-134-1": [{ "type": "text", "message": "Back" }],
		"s-3027-1000-147-0": [{ "type": "text", "message": "Strike" }],

		// 142 -> 143 114 130
		"s-3027-1000-142-0": [{ "type": "text", "message": "2x360 | Strike" }],
		"s-3027-1000-143-0": [{ "type": "text", "message": "Strike" }],

		"s-3027-1000-141-0": [{ "type": "text", "message": "2x360 | Eviscerate" }], // 141 -> 146 114 130
		"s-3027-1000-146-0": [{ "type": "text", "message": "Eviscerate | Strike" }], // 146 ->         114 -> 130

		// стяжка -> бублики (350 -> 302)
		"s-3027-1000-350-0": [{ "type": "text", "message": "Red: Donuts (Stay Out > Get In)" },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 0, 0, 12, 240, 0, 5000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 0, 0, 8, 480, 0, 5000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 0, 0, 3, 950, 0, 5000] },
			{ "type": "function", "function": spawn.item[HIGHLIGHT_ITEM, 0, 0, 3800, 1000] },
			{ "type": "text", "delay": 3800, "message": "In" },
			{ "type": "function", "function": spawn.marker, "args": [false, 180, 100, 3800, 1000, false, ["CENTER", "IN"]] },
			{ "type": "function", "function": spawn.marker, "args": [false, 0, 100, 3800, 1000, false, ["CENTER", "IN"]] },
			{ "type": "function", "function": spawn.marker, "args": [false, 90, 100, 3800, 1000, false, ["CENTER", "IN"]] },
			{ "type": "function", "function": spawn.marker, "args": [false, 270, 100, 3800, 1000, false, ["CENTER", "IN"]] },
			{ "type": "function", "function": skilld_event[350] }],
		// стяжка -> волна (357 -> 110)
		"s-3027-1000-357-0": [{ "type": "text", "message": "Purple: Get Out" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 20, 500, 2000, 5000] },
			{ "type": "function", "function": skilld_event[357] }],

		// "s-3027-1000-114-0": [{ "type": "text", "message": "Eviscerate (slow)" }],
		// "s-3027-1000-130-0": [{ "type": "text", "message": "Target" }],
		"s-3027-1000-151-0": [{ "type": "text", "message": "Back teleport | Strike" }], // 151 149 148 -> 130
		"s-3027-1000-149-1": [{ "type": "text", "message": "Back teleport (Target)" }],
		"s-3027-1000-117-0": [{ "type": "text", "message": "Teleport (Target)" }], //         117 -> 130
		"s-3027-1000-356-0": [{ "type": "text", "message": "Teleport (Target)" }], //         356 -> 147
		"s-3027-1000-148-1": [{ "type": "text", "message": "Teleport (Target)" }],

		"s-3027-1000-351-0": [{ "type": "text", "message": "Shield!" },
			{ "type": "function", "function": skilld_event[351] }],
		"s-3027-1000-401-0": [{ "type": "text", "message": "30% AOE!" },
			{ "type": "text", "delay": 1600, "message": "Dodge!" }]
	};

};
