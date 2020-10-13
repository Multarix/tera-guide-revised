// Kezzel's Gorge
//
// Made by Multarix

exports.guide = (mod, extras) => {
	return {
		"nd-453-999": [{ type: "stop_timers" },
			{ type: "despawn_all" }],
		"s-453-999-103-0": [{ type: "text", message: "Smash (Left)" }],
		"s-453-999-104-0": [{ type: "text", message: "Smash (Right)" }],
		"s-453-999-105-0": [{ type: "text", message: "Rock Smash", position: "tank" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 210, 14, 190, 3000] }],
		"s-453-999-106-0": [{ type: "text", message: "Blast" },
			{ type: "text", message: "Dodge!", delay: 2000 }],
		"s-453-999-107-0": [{ type: "text", message: "Whip" }],
		"s-453-999-116-0": [{ type: "text", message: "Shield" }],
		"s-453-999-119-0": [{ type: "text", message: "Kaia's Shield", position: "priest" },
			{ type: "text", message: "Thrall of Protection", position: "mystic" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 0, 10, 500, 6000] }],
		"s-453-999-120-0": [{ type: "text", message: "AoE Waves" },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 14, 200, 5700] },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 10, 390, 6700] },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 8, 590, 7700] }]
	};
};

exports.type = { es: false, sp: false };
