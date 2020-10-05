// RK-9 Kennel (Hard)
//
// made by michengs / HSDN

exports.guide = (mod, extras) => {

	const { HIGHLIGHT_ITEM, spawn } = require("../lib.js");

	let orb_notice = true;
	let boss_seventy = false;
	let msg_a = 3;
	let msg_b = 3;
	let mech_reverse = false;
	let mech_notice = false;

	const mech_messages = {
		0: { message: "Out" },
		1: { message: "In" },
		2: { message: "Wave" },
		3: { message: "?" }
	};

	function skilld_event(skillid){
		const create = new spawn(mod, extras);

		// 2 BOSS
		if(orb_notice && skillid == 301){
			orb_notice = false;
			extras.sendMessage(mod, "Throwing Orb");
			mod.setTimeout(() => orb_notice = true, 13000);
		}

		// 3 BOSS

		// Core mechanics
		if([3034302, 3034303, 3034304, 3034311, 3034312].includes(skillid)){
			switch(skillid){
			// DM
				case 3034302: // Out
					msg_a = 0;
					print_mech(true, false);
					break;
				case 3034303: // In
					msg_a = 1;
					print_mech(true, false);
					break;
				case 3034304: // Wave
					msg_a = 2;
					print_mech(true, false);
					break;
					// QB
				case 3034311: // STANDARD (1)
					mech_reverse = false;
					print_mech(true, true);
					if(mech_notice){
						print_mech(false, false);
					}
					break;
				case 3034312: // REVERSE (0)
					mech_reverse = true;
					print_mech(true, true);
					if(mech_notice){
						print_mech(false, false);
					}
					break;
			}
		}
		// QB
		// 0: Out  3034301
		// 1: In   3034302
		// 2: Wave 3034303
		if(skillid >= 0 && skillid < 3){
			msg_b = skillid;
			print_mech(false, false);
			msg_a = msg_b;
			msg_b = 3;
			mod.setTimeout(() => {
				print_mech(true, false);
			}, 7000);
			mech_notice = true;
			mod.setTimeout(() => mech_notice = false, 3000);
		}

		// S-attacks
		// Safe: 116/119 [R] + 222-0 [R] > 222-1 [L] > 222-2 [R] > 326/327
		// Safe: 117/118 [L] + 223-0 [L] > 223-1 [R] > 223-2 [L] > 326/327
		const delay = boss_seventy ? 2000 : 0;
		let	duration = boss_seventy ? 800 : 900;
		if([1160, 1190].includes(skillid)){
			extras.sendMessage(mod, "Справа сейф");
		}
		if([1170, 1180].includes(skillid)){
			if(delay){
				mod.setTimeout(extras.sendMessage, delay, mod, "Left Safe");
			} else {
				extras.sendMessage(mod, "Left Safe");
			}
		}
		if([1160, 1170, 1180, 1190].includes(skillid) && boss_seventy){ // <70%
			if(mech_reverse){
				extras.sendMessage(mod, "Triple-S | Out");
				mod.setTimeout(extras.sendMessage, 4500, mod, "Out");
			} else {
				extras.sendMessage(mod, "Трипл-эска | К нему");
				mod.setTimeout(extras.sendMessage, 4500, mod, "In");
			}
			create.circle(false, 445, 0, 0, 10, 300, 5000, 2000);
			duration = 2000;
		}
		if([1160, 1161, 1162, 1163, 1190, 1191, 1192, 1193, 2220, 2222, 2231].includes(skillid)){ // right safe
			create.marker(false, 160, 300, 0, duration, true, null);
			create.marker(false, 340, 300, 0, duration, true, null);
			create.point(202, 170, 200, 0, duration);
			create.point(202, 350, 200, 0, duration);
			create.vector(912, 170, 210, 180, 290, 0, duration);
			create.point(912, 120, 250, 0, duration);
			create.point(912, 130, 240, 0, duration);
			create.point(912, 140, 230, 0, duration);
			create.point(912, 150, 220, 0, duration);
			create.point(912, 160, 210, 0, duration);
			create.point(912, 300, 250, 0, duration);
			create.point(912, 310, 240, 0, duration);
			create.point(912, 320, 230, 0, duration);
			create.point(912, 330, 220, 0, duration);
			create.point(912, 340, 210, 0, duration);
			create.vector(912, 350, 210, 0, 290, 0, duration);
		}
		if([1170, 1171, 1172, 1173, 1180, 1181, 1182, 1183, 2230, 2232, 2221].includes(skillid)){ // left safe
			create.marker(false, 20, 300, 0, duration, true, null);
			create.marker(false, 200, 300, 0, duration, true, null);
			create.point(202, 10, 200, 0, duration);
			create.point(202, 190, 200, 0, duration);
			create.vector(912, 10, 210, 0, 290, 0, duration);
			create.point(912, 20, 210, 0, duration);
			create.point(912, 30, 220, 0, duration);
			create.point(912, 40, 230, 0, duration);
			create.point(912, 50, 240, 0, duration);
			create.point(912, 60, 250, 0, duration);
			create.point(912, 240, 250, 0, duration);
			create.point(912, 230, 240, 0, duration);
			create.point(912, 220, 230, 0, duration);
			create.point(912, 210, 220, 0, duration);
			create.point(912, 200, 210, 0, duration);
			create.vector(912, 190, 210, 180, 290, 0, duration);
		}
	}

	function print_mech(next, code){
		let message = "";
		if(next){
			message += "Next: ";
		}
		if(mech_reverse){
			message += mech_messages[msg_b].message + " + " + mech_messages[msg_a].message;
		} else {
			message += mech_messages[msg_a].message + " + " + mech_messages[msg_b].message;
		}
		if(code){
			message += ", Code: " + (mech_reverse ? "0" : "1");
		}
		extras.sendMessage(mod, message);
	}
	function thirdboss_start_event(){
		boss_seventy = false;
	}
	function thirdboss_seventy_event(){
		boss_seventy = true;
	}


	return {
		// 1 BOSS
		"qb-3034-1000-3034101": [{ type: "text", message: "Pizza" }],
		"qb-3034-1000-3034102": [{ type: "text", message: "AOE! Jump" }],
		"s-3034-1000-104-0": [{ type: "text", message: "Front Clip" }],
		"s-3034-1000-108-0": [{ type: "text", message: "Get Out" }], // крутилка
		"s-3034-1000-111-0": [{ type: "text", message: "Back + Front" }],
		"s-3034-1000-112-0": [{ type: "text", message: "Back" }],
		"s-3034-1003-205-0": [{ type: "text", message: "Wind (Kaia)" }],
		"s-3034-1000-304-0": [{ type: "text", message: "Out" }],
		"s-3034-1000-305-0": [{ type: "text", message: "In" }],
		"s-3034-1000-306-0": [{ type: "text", message: "Bombs" }],
		"s-3034-1000-307-0": [{ type: "text", message: "Pull" }],
		"s-3034-1000-309-0": [{ type: "text", message: "Four Missile" },
			{ type: "text", delay: 6000, message: "5" },
			{ type: "text", delay: 7000, message: "4" },
			{ type: "text", delay: 8000, message: "3" },
			{ type: "text", delay: 9000, message: "2" },
			{ type: "text", delay: 10000, message: "1" },
			{ type: "text", delay: 11000, message: "Jump" }],
		"s-3034-1000-311-0": [{ type: "text", message: "Safe right front" },
			{ type: "spawn", function: "marker", args: [false, 67, 120, 12000, true, null] }],
		"s-3034-1000-312-0": [{ type: "text", message: "Safe right back" },
			{ type: "spawn", function: "marker", args: [false, 112, 120, 12000, true, null] }],
		"s-3034-1000-313-0": [{ type: "text", message: "Safe back left" },
			{ type: "spawn", function: "marker", args: [false, 202, 120, 12000, true, null] }],
		"s-3034-1000-314-0": [{ type: "text", message: "Safe front left" },
			{ type: "spawn", function: "marker", args: [false, 337, 120, 12000, true, null] }],
		"s-3034-1000-315-0": [{ type: "text", message: "Safe front right" },
			{ type: "spawn", function: "marker", args: [false, 22, 120, 12000, true, null] }],
		"s-3034-1000-316-0": [{ type: "text", message: "Safe back right" },
			{ type: "spawn", function: "marker", args: [false, 157, 120, 12000, true, null] }],
		"s-3034-1000-317-0": [{ type: "text", message: "Safe left back" },
			{ type: "spawn", function: "marker", args: [false, 247, 120, 12000, true, null] }],
		"s-3034-1000-318-0": [{ type: "text", message: "Safe left front" },
			{ type: "spawn", function: "marker", args: [false, 292, 120, 12000, true, null] }],
		"s-3034-1000-319-0": [{ type: "text", message: "Safe front right" },
			{ type: "spawn", function: "marker", args: [false, 22, 120, 12000, true, null] }],
		"s-3034-1000-320-0": [{ type: "text", message: "Safe back right" },
			{ type: "spawn", function: "marker", args: [false, 157, 120, 12000, true, null] }],
		"s-3034-1000-321-0": [{ type: "text", message: "Safe back left" },
			{ type: "spawn", function: "marker", args: [false, 202, 120, 12000, true, null] }],
		"s-3034-1000-322-0": [{ type: "text", message: "Safe left front" },
			{ type: "spawn", function: "marker", args: [false, 292, 120, 12000, true, null] }],
		"s-3034-1000-323-0": [{ type: "text", message: "Safe right front" },
			{ type: "spawn", function: "marker", args: [false, 67, 120, 12000, true, null] }],
		"s-3034-1000-324-0": [{ type: "text", message: "Safe right back" },
			{ type: "spawn", function: "marker", args: [false, 112, 120, 12000, true, null] }],
		"s-3034-1000-325-0": [{ type: "text", message: "Safe left back" },
			{ type: "spawn", function: "marker", args: [false, 247, 120, 12000, true, null] }],
		"s-3034-1000-326-0": [{ type: "text", message: "Safe front left" },
			{ type: "spawn", function: "marker", args: [false, 337, 120, 12000, true, null] }],

		// 2 BOSS
		"h-3034-2000-99": [{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32904, y: 59440, z: 0 } },
			{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32900, y: 58824, z: 0 } },
			{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32372, y: 58520, z: 0 } },
			{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -31842, y: 58833, z: 0 } },
			{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -31846, y: 59444, z: 0 } },
			{ "type": "spawn", "id": 476, "sub_delay": 99999999, "pos": { x: -32379, y: 59750, z: 0 } }],
		"s-3034-2000-102-0": [{ type: "text", message: "Pizza Cutter" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 300, 12, 228, 3000] }],
		"s-3034-2000-105-0": [{ type: "text", message: "360" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 278, 5000] }],
		"s-3034-2000-108-0": [{ type: "text", message: "Back Swipe" },
			{ type: "spawn", function: "vector", args: [553, 0, 240, 240, 380, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 120, 120, 380, 2000] }],
		"s-3034-2000-301-0": [{ type: "function", function: skilld_event, args: [301] }],
		"s-3034-2000-304-0": [{ type: "text", message: "Get Out" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 400, 4000] }],
		"s-3034-2000-305-0": [{ type: "text", message: "In | Out" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 200, 3000] }],
		// Safe: |||2|2||| > ||||1|||| > ||3|||3||
		"s-3034-2000-310-0": [{ type: "text", message: "2 - 1 - 3" },
		// { type: "spawn", function: "item", args: [HIGHLIGHT_ITEM, 95, 310, 5000] },
		// { type: "spawn", function: "item", args: [HIGHLIGHT_ITEM, 265, 310, 5000] },
			{ type: "spawn", function: "marker", args: [false, 40, 220, 1500, true, null] }, // 2
			{ type: "spawn", function: "marker", args: [false, -40, 220, 1500, true, null] }, // 2
			{ type: "spawn", function: "marker", args: [false, 0, 150, 1500, true, null], delay: 1600 }, // 1
			{ type: "spawn", function: "marker", args: [false, 60, 300, 1500, true, null], delay: 1600 }, // 3
			{ type: "spawn", function: "marker", args: [false, -60, 300, 1500, true, null], delay: 3200 }], // 3
		// Safe: ||||1|||| > ||3|||3|| > |||2|2|||
		"s-3034-2000-311-0": [{ type: "text", message: "1 - 3 - 2" },
		// { type: "spawn", function: "item", args: [HIGHLIGHT_ITEM, 95, 310, 5000] },
		// { type: "spawn", function: "item", args: [HIGHLIGHT_ITEM, 265, 310, 5000] },
			{ type: "spawn", function: "marker", args: [false, 0, 150, 1500, true, null] }, // 1
			{ type: "spawn", function: "marker", args: [false, 60, 300, 1500, true, null], delay: 1600 }, // 3
			{ type: "spawn", function: "marker", args: [false, -60, 300, 1500, true, null], delay: 1600 }, // 3
			{ type: "spawn", function: "marker", args: [false, 40, 220, 1500, true, null], delay: 3200 }, // 2
			{ type: "spawn", function: "marker", args: [false, -40, 220, 1500, true, null], delay: 3200 }], // 2
		"s-3034-2007-201-0": [{ type: "spawn", function: "vector", args: [912, 0, 0, 0, 500, 8000] },
			{ type: "spawn", function: "vector", args: [912, 0, 90, 90, 500, 8000] },
			{ type: "spawn", function: "vector", args: [912, 0, 180, 180, 500, 8000] },
			{ type: "spawn", function: "vector", args: [912, 0, 270, 270, 500, 8000] }],
		"s-3034-2007-306-0": [{ type: "spawn", function: "vector", args: [912, 0, 0, 0, 500, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 90, 90, 500, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 180, 180, 500, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 270, 270, 500, 4000] }],
		"s-3034-2007-307-0": [{ type: "spawn", function: "vector", args: [912, 0, 0, 0, 500, 12000] },
			{ type: "spawn", function: "vector", args: [912, 0, 90, 90, 500, 12000] },
			{ type: "spawn", function: "vector", args: [912, 0, 180, 180, 500, 12000] },
			{ type: "spawn", function: "vector", args: [912, 0, 270, 270, 500, 12000] }],

		// 3 BOSS
		"h-3034-3000-99": [{ type: "function", function: thirdboss_start_event }],
		"h-3034-3000-70": [{ type: "text", message: "70%" },
			{ type: "function", function: thirdboss_seventy_event }],
		//
		"dm-0-0-3034311": [{ type: "function", function: skilld_event, args: [3034311] }], // 1 std
		"dm-0-0-3034312": [{ type: "function", function: skilld_event, args: [3034312] }], // 0 rev
		"dm-0-0-3034302": [{ type: "function", function: skilld_event, args: [3034302] }], // out
		"dm-0-0-3034303": [{ type: "function", function: skilld_event, args: [3034303] }], // in
		"dm-0-0-3034304": [{ type: "function", function: skilld_event, args: [3034304] }], // wave
		"qb-3034-3000-3034301": [{ type: "function", function: skilld_event, args: [0] }], // out
		"qb-3034-3000-3034302": [{ type: "function", function: skilld_event, args: [1] }], // in
		"qb-3034-3000-3034303": [{ type: "function", function: skilld_event, args: [2] }], // wave
		// right safe S
		"s-3034-3000-116-0": [{ type: "function", function: skilld_event, args: [1160] }],
		"s-3034-3000-116-1": [{ type: "function", function: skilld_event, args: [1161] }],
		"s-3034-3000-116-2": [{ type: "function", function: skilld_event, args: [1162] }],
		"s-3034-3000-116-3": [{ type: "function", function: skilld_event, args: [1163] }],
		"s-3034-3000-119-0": [{ type: "function", function: skilld_event, args: [1190] }],
		"s-3034-3000-119-1": [{ type: "function", function: skilld_event, args: [1191] }],
		"s-3034-3000-119-2": [{ type: "function", function: skilld_event, args: [1192] }],
		"s-3034-3000-119-3": [{ type: "function", function: skilld_event, args: [1193] }],
		"s-3034-3000-223-1": [{ type: "function", function: skilld_event, args: [2231] }],
		"s-3034-3000-222-0": [{ type: "function", function: skilld_event, args: [2220] }],
		"s-3034-3000-222-2": [{ type: "function", function: skilld_event, args: [2222] }],
		// left safe S
		"s-3034-3000-117-0": [{ type: "function", function: skilld_event, args: [1170] }],
		"s-3034-3000-117-1": [{ type: "function", function: skilld_event, args: [1171] }],
		"s-3034-3000-117-2": [{ type: "function", function: skilld_event, args: [1172] }],
		"s-3034-3000-117-3": [{ type: "function", function: skilld_event, args: [1173] }],
		"s-3034-3000-118-0": [{ type: "function", function: skilld_event, args: [1180] }],
		"s-3034-3000-118-1": [{ type: "function", function: skilld_event, args: [1181] }],
		"s-3034-3000-118-2": [{ type: "function", function: skilld_event, args: [1182] }],
		"s-3034-3000-118-3": [{ type: "function", function: skilld_event, args: [1182] }],
		"s-3034-3000-222-1": [{ type: "function", function: skilld_event, args: [2221] }],
		"s-3034-3000-223-0": [{ type: "function", function: skilld_event, args: [2230] }],
		"s-3034-3000-223-2": [{ type: "function", function: skilld_event, args: [2232] }],
		//
		"s-3034-3000-125-0": [{ type: "text", message: "Front" }],
		"s-3034-3000-126-0": [{ type: "text", message: "Front | Back" }],
		"s-3034-3000-127-0": [{ type: "text", message: "Back" }],
		"s-3034-3000-128-0": [{ type: "text", message: "Combo | Back Wave" },
			{ type: "spawn", function: "vector", args: [553, 180, 120, 120, 1200, 3000], delay: 2000 },
			{ type: "spawn", function: "vector", args: [553, 180, 240, 240, 1200, 3000], delay: 2000 }],
		"s-3034-3000-129-0": [{ type: "text", position: "tank", message: "Dodge" }],
		"s-3034-3000-305-0": [{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 10, 300, 6000] }], // Проверка
		"s-3034-3000-321-0": [{ type: "text", message: "Shield!" },
			{ type: "text", delay: 105000, message: "Shield in 10 seconds!" }],
		"s-3034-3001-308-0": [{ type: "text", message: "Bait!" },
			{ type: "spawn", function: "vector", args: [912, 0, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 90, 90, 300, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 180, 180, 300, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 270, 270, 300, 2000] }],
		// Radar
		"qb-3034-3000-3034312": [{ type: "text", message: "!!! Radar !!!" }],
		"s-3034-3000-324-0": [{ type: "text", message: "OUT" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 10, 250, 3000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 12, 200, 3000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 14, 150, 3000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 18, 100, 3000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 50, 50, 3000] }],
		"s-3034-3000-325-0": [{ type: "text", message: "IN" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 3000] }]
	};
};

exports.type = {
	es: false,
	sp: false
};
