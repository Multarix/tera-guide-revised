// Antaroth's Abyss
//
// made by Yuyuko / HSDN
// Updated to revised version

exports.guide = (mod, extras) => {

	let counter = 0;
	let timer;

	function thirdboss_backattack_event(){
		mod.clearTimeout(timer);
		counter++;
		if(counter >= 2){
			extras.sendMessage(mod, "Back attack");
		}
		timer = mod.setTimeout(() => {
			counter = 0;
		}, 3000);
	}

	return {
		// 1 BOSS
		"s-720-1000-117-0": [{ type: "text", message: "Stay In > Get Out" }],
		"s-720-1000-116-0": [{ type: "text", message: "Get Out > Stay In" }],
		"s-720-1000-109-0": [{ type: "text", message: "Back Attack" }],
		"s-720-1000-300-0": [{ type: "text", delay: 600, message: "Dodge!" }],
		// 2 BOSS
		"s-720-2000-106-0": [{ type: "text", message: "Spin Attack" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 320, 3500] }],
		"s-720-2000-105-0": [{ type: "text", message: "Back Attack" }],
		"s-720-2000-104-0": [{ type: "text", message: "Random Jump" }],
		"s-720-2000-112-0": [{ type: "text", message: "Right Slash" }],
		"s-720-2000-111-0": [{ type: "text", message: "Left Slash" }],
		"s-720-2000-110-0": [{ type: "text", message: "Stun Attack" }],
		"s-720-2000-119-0": [{ type: "text", message: "Red: Out Safe" }],
		"s-720-2000-220-0": [{ type: "text", message: "Blue: In Safe" }],
		"s-720-2000-116-0": [{ type: "text", message: "Circles" }],
		// 3 BOSS
		"s-720-3000-315-0": [{ type: "text", message: "Pushback" }],
		"s-720-3000-107-0": [{ type: "text", message: "Random Jump" }],
		"s-720-3000-204-0": [{ type: "text", message: "Energy Beam" }],
		// heart thrust+anticlockwise spin+right swipe
		"s-720-3000-109-0": [{ type: "text", position: "tank", message: "Right Safe" },
			{ type: "text", position: "dps", message: "Left Safe" },
			{ type: "text", position: "healer", message: "Left Safe" },
			{ type: "spawn", function: "marker", args: [false, 90, -250, 2500, true, null] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 180, 500, 2500] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 500, 2500] }],
		// heart thrust+clockwise spin+left swipe
		"s-720-3000-111-0": [{ type: "text", position: "tank", message: "Left Safe" },
			{ type: "text", position: "dps", message: "Right Safe" },
			{ type: "text", position: "healer", message: "Right Safe" },
			{ type: "spawn", function: "marker", args: [false, 270, -250, 2500, true, null] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 180, 500, 2500] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 500, 2500] }],
		"s-720-3000-113-0": [{ type: "text", message: "Front | Back Slam" }],
		"s-720-3000-115-0": [{ type: "text", message: "Spinning Attack" }],
		"s-720-3000-104-0": [{ type: "function", function: thirdboss_backattack_event }],
		// "s-720-3000-202-0": [{ type: "text", message: "spin or front, back slam" }],
		"s-720-3000-400-0": [{ type: "text", message: "Clones: Beam" }],
		"s-720-3000-401-0": [{ type: "text", message: "Clones: Spin" }]
	};
};

exports.type = {
	es: false,
	sp: false
};
