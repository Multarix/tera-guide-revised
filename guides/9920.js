// Antaroth's Abyss (Hard)
//
// made by Yuyuko / HSDN
// Updated to revised version

module.exports = (mod, extras) => {


	const { spawn } = module.parent.exports.lib;


	let counter = 0;
	let timer;

	function thirdboss_backattack_event(handlers, event, ent, mod){
		mod.clearTimeout(timer);
		counter++;
		if(counter >= 2){
			sendMessage("Back attack");
		}
		timer = mod.setTimeout(() => counter = 0, 3000);
	}

	let colour_to_use = null;
	const COLOURS_OFFSETS = {
		"red": 0,
		"yellow": 120,
		"blue": 240
	};
	function thirdboss_set_clockwise_event(clockwise){
		const create = new spawn(extras.ent);
		mod.setTimeout(() => {
			const colour_rotation = clockwise ? ["red", "yellow", "blue"] : ["blue", "yellow", "red"];
			for(let i = 0; i < 3; i++){
				const current_colour = colour_rotation[(colour_rotation.indexOf(colour_to_use) + i) % 3];
				create.marker(false, COLOURS_OFFSETS[current_colour], 150, i * 2600, (i + 1) * 3000, true, null);
			}
			mod.setTimeout(() => clockwise = null, 12000);
		}, 1000);
	}
	function thirdboss_change_colour_event(colour){
		colour_to_use = colour;
	}

	const SPAWNING_FIRST_CIRCLE_FLOWERS = [{ type: "text", position: "tank", message: "Right Safe > Inward Waves" },
		{ type: "text", position: "dps", message: "Left Safe > Inward Waves" },
		{ type: "text", position: "healer", message: "Left Safe > Inward Waves" },
		{ type: "spawn", function: "marker", args: [false, 90, -250, 2500, true, null] },
		{ type: "spawn", function: "vector", args: [553, 0, 180, 180, 500, 2500] },
		{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 500, 1500] },
		{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 18, 143, 5000], delay: 1500 },
		{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 12, 293, 5000], delay: 1500 }];

	const SPAWNING_SECOND_CIRCLE_FLOWERS = [{ type: "text", position: "tank", message: "Left Safe > Outward Waves" },
		{ type: "text", position: "dps", message: "Right Safe > Outward Waves" },
		{ type: "text", position: "healer", message: "Right Safe > Outward Waves" },
		{ type: "spawn", function: "marker", args: [false, 270, -250, 2500, true, null] },
		{ type: "spawn", function: "vector", args: [553, 0, 180, 180, 500, 2500] },
		{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 500, 1500] },
		{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 18, 157, 5000], delay: 1500 },
		{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 12, 307, 5000], delay: 1500 }];


	return {

		// 1 BOSS, NOT ENRAGED
		"s-920-1000-1117-0": [{ type: "text", message: "Stay In > Get Out" }],
		"s-920-1000-1116-0": [{ type: "text", message: "Get Out > Stay In" }],
		"s-920-1000-1109-0": [{ type: "text", message: "Back Attack" }],
		"s-920-1000-1130-0": [{ type: "text", message: "Full > Outer > Inner" }],

		// 1 BOSS, ENRAGED
		"s-920-1000-2117-0": [{ type: "text", message: "Stay In > Get Out" }],
		"s-920-1000-2116-0": [{ type: "text", message: "Get Out > Stay In" }],
		"s-920-1000-2109-0": [{ type: "text", message: "Back Attack" }],
		"s-920-1000-2130-0": [{ type: "text", message: "Full > Inner > Outer" }],

		// 1 BOSS, SPECIAL ATTACKS
		"s-920-1000-1300-0": [{ type: "text", delay: 600, message: "Dodge!" }],

		// 2 BOSS, NOT ENRAGED
		"s-920-2000-1108-0": [{ type: "text", message: "Target Swing" }],
		"s-920-2000-1113-0": [{ type: "text", message: "Left Slash" }],
		"s-920-2000-1114-0": [{ type: "text", message: "Right Slash" }],
		"s-920-2000-1106-0": [{ type: "text", message: "Spin Attack" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 320, 3500] }],
		"s-920-2000-1105-0": [{ type: "text", message: "Back Attack" }],
		"s-920-2000-1104-0": [{ type: "text", message: "Random Jump" }],
		"s-920-2000-1110-0": [{ type: "text", message: "Stun Attack" }],
		"s-920-2000-1111-0": [{ type: "text", message: "Left Slash" }],
		"s-920-2000-1112-0": [{ type: "text", message: "Right Slash" }],

		// 2 BOSS, ENRAGED
		"s-920-2000-2108-0": [{ type: "text", message: "Target Swing" }],
		"s-920-2000-2113-0": [{ type: "text", message: "Left Slash" }],
		"s-920-2000-2114-0": [{ type: "text", message: "Right Slash" }],
		"s-920-2000-2106-0": [{ type: "text", message: "Spin Attack" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 320, 3500] }],
		"s-920-2000-2105-0": [{ type: "text", message: "Back Attack" }],
		"s-920-2000-2104-0": [{ type: "text", message: "Random Jump" }],
		"s-920-2000-2110-0": [{ type: "text", message: "Stun Attack" }],
		"s-920-2000-2111-0": [{ type: "text", message: "Left Slash" }],
		"s-920-2000-2112-0": [{ type: "text", message: "Right Slash" }],

		// 2 BOSS, SPECIAL ATTACKS
		"s-920-2000-3119-0": [{ type: "text", message: "Red: Out safe" }],
		"s-920-2000-3220-0": [{ type: "text", message: "Blue: In safe" }],
		"s-920-2000-3116-0": [{ type: "text", message: "Circles" }],
		"h-920-2000-50": [{ type: "text", message: "50%" }],
		"h-920-2000-20": [{ type: "text", message: "20%" }],

		// 3 BOSS, UNENRAGED
		"s-920-3000-1315-0": [{ type: "text", message: "Pushback" }],
		"s-920-3000-1107-0": [{ type: "text", message: "Random Jump" }],
		"s-920-3000-1204-0": [{ type: "text", message: "Energy Beam" }],
		// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
		"s-920-3000-1109-0": SPAWNING_FIRST_CIRCLE_FLOWERS,
		// heart thrust+clockwise spin+left swipe+AOEs from in to out
		"s-920-3000-1111-0": SPAWNING_SECOND_CIRCLE_FLOWERS,
		//
		"s-920-3000-1113-0": [{ type: "text", message: "Front | Back Slam" }],
		"s-920-3000-1115-0": [{ type: "text", message: "Spinning Attack" }],
		"s-920-3000-1104-0": [{ type: "function", function: thirdboss_backattack_event }],
		// "s-920-3000-1202-0": [{ type: "text", message: "spin or front, back slam" }],
		"s-920-3000-1120-0": [{ type: "text", message: "Energy Beam" }],

		// 3 BOSS, ENRAGED
		"s-920-3000-2204-0": [{ type: "text", message: "Energy Beam" }],
		// heart thrust+anticlockwise spin+right swipe+AOEs from out to in
		"s-920-3000-2109-0": SPAWNING_FIRST_CIRCLE_FLOWERS,
		// heart thrust+clockwise spin+left swipe+AOEs from in to out
		"s-920-3000-2111-0": SPAWNING_SECOND_CIRCLE_FLOWERS,
		//
		"s-920-3000-2113-0": [{ type: "text", message: "Front | Back Slam" }],
		"s-920-3000-2104-0": [{ type: "function", function: thirdboss_backattack_event }],
		"s-920-3000-2115-0": [{ type: "text", message: "Spinning Attack" }],
		"s-920-3000-2107-0": [{ type: "text", message: "Random Jump" }],
		// "s-920-3000-2202-0": [{ type: "text", message: "spin or front, back slam" }],
		"s-920-3000-2120-0": [{ type: "text", message: "Energy Beam" }],

		// 3 BOSS, SPECIAL ATTACKS
		"s-920-3000-1400-0": [{ type: "text", message: "Clones: Beam" }],
		"s-920-3000-1401-0": [{ type: "text", message: "Clones: Spin" }],
		// color marks in cage
		"ae-0-0-9203037": [{ type: "text", message: "Red" }, { type: "function", function: thirdboss_change_colour_event, args: ["red"] }],
		"ae-0-0-9203038": [{ type: "text", message: "Yellow" }, { type: "function", function: thirdboss_change_colour_event, args: ["yellow"] }],
		"ae-0-0-9203039": [{ type: "text", message: "Blue" }, { type: "function", function: thirdboss_change_colour_event, args: ["blue"] }],
		// anti-clockwise
		"s-920-3000-1317-0": [{ type: "function", function: thirdboss_set_clockwise_event, args: [false] }],
		// clockwise
		"s-920-3000-1318-0": [{ type: "function", function: thirdboss_set_clockwise_event, args: [true] }]
	};

};
