// Draakon Arena
//
// made by Kuroine / HSDN

exports.guide = (mod, extras) => {
	return {
		"nd-3102-1000": [{ type: "stop_timers" },
			{ type: "despawn_all" }],

		// Ress bait / range check
		"s-3102-1000-107-0": [{ type: "text", message: "Spectral Throw (Bait)" }],

		// Basic attacks
		"s-3102-1000-103-0": [{ type: "text", message: "2 Hits | Bleed" }],
		"s-3102-1000-113-0": [{ type: "text", message: "4 Hits Combo" }],
		"s-3102-1000-105-0": [{ type: "text", message: "Uppercut | Stun" }],
		"s-3102-1000-106-0": [{ type: "text", message: "Stun" }],
		// 120 > 114
		"s-3102-1000-120-0": [{ type: "text", message: "Many Pokes | Stun (AOE)" }],
		"s-3102-1000-114-0": [{ type: "text", message: "Stun (AOE)" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 0, 16, 420, 3000], delay: 100 }],
		"s-3102-1000-111-0": [{ type: "text", message: "Leap (Stun)" }],
		"s-3102-1000-115-0": [{ type: "text", message: "AOE Bombs (Gather)" },
			{ type: "text", delay: 3000, message: "Gather!" }],
		"s-3102-1000-112-0": [{ type: "text", message: "Front | Back Kick" },
			{ type: "spawn", function: "vector", args: [553, 90, 120, 160, 300, 3000] },
			{ type: "spawn", function: "vector", args: [553, 270, 120, -160, 300, 3000] }],
		"s-3102-1000-110-0": [{ type: "text", message: "Donuts + Wave" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 650, 4000] }],
		"s-3102-1000-109-0": [{ type: "text", message: "Knockdown + Spin" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 100, 10, 420, 1000] },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 150, 10, 420, 2000], delay: 1000 }],
		"s-3102-1000-304-0": [{ type: "text", message: "Shield!" }],
		"ab-3102-1000-31021006": [{ type: "text", message: "Plague/Regress" }],

		// Right Foot
		"s-3102-1000-121-0": [{ type: "text", message: "Pizza" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 550, 3000] },
			{ type: "spawn", function: "semi", args: [-60, 70, 912, 0, 50, 8, 450, 4000] },
			{ type: "spawn", function: "semi", args: [120, 250, 912, 0, 50, 8, 450, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 50, 70, 450, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 50, 120, 450, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 50, 250, 450, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 50, 300, 450, 4000] },
			{ type: "text", delay: 1900, message: "Dodge!" }],
		"s-3102-1000-122-0": [{ type: "spawn", function: "marker", args: [false, 0, 200, 2000, true, null], delay: 500 }],
		"s-3102-1000-123-0": [{ type: "spawn", function: "vector", args: [912, 0, 0, 295, 550, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 0, 85, 550, 2000] },
			{ type: "spawn", function: "semi", args: [85, 295, 912, 0, 0, 6, 550, 2000] }],
		// Left Foot
		"s-3102-1000-124-0": [{ type: "text", message: "Pizza" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 550, 3000] },
			{ type: "spawn", function: "semi", args: [-60, 70, 912, 0, 50, 8, 450, 4000] },
			{ type: "spawn", function: "semi", args: [120, 250, 912, 0, 50, 8, 450, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 50, 70, 450, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 50, 120, 450, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 50, 250, 450, 4000] },
			{ type: "spawn", function: "vector", args: [912, 0, 50, 300, 450, 4000] },
			{ type: "text", delay: 1900, message: "Dodge!" }],
		"s-3102-1000-125-0": [{ type: "spawn", function: "marker", args: [false, 0, 200, 3000, true, null], delay: 500 }],
		"s-3102-1000-126-0": [{ type: "spawn", function: "vector", args: [912, 0, 0, 295, 550, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 0, 85, 550, 2000] },
			{ type: "spawn", function: "semi", args: [85, 295, 912, 0, 0, 6, 550, 2000] }]
	};
};

exports.type = { es: false, sp: false };
