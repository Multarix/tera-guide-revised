// Kezzel's Gorge
//
// Made by Multarix
// Updated to revised version

exports.guide = (mod, extras) => {
	return {
		"s-453-999-103-0": [{ type: "text", message: "Smash (Left)" }],
		"s-453-999-104-0": [{ type: "text", message: "Smash (Right)" }],
		"s-453-999-105-0": [{ type: "text", message: "Rock Smash", position: "tank" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 210, 10, 185, 3500] }],
		"s-453-999-106-0": [{ type: "text", message: "Blast" },
			{ type: "text", message: "Dodge!", delay: 2000 }],
		"s-453-999-107-0": [{ type: "text", message: "Whip" }],
		"s-453-999-116-0": [{ type: "text", message: "Shield" }],
		"s-453-999-119-0": [{ type: "text", message: "Kaia/ Thrall of Protection" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 75, 10, 450, 5700] }], // Unsure on size and position, the in-game telegraphs for this boss are buggy
		"s-453-999-120-0": [{ type: "text", message: "AoE Waves" },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 10, 200, 5700] }, // Inner circle
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 10, 390, 6700] }, // Middle circle
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 10, 590, 7700] }] // Outer circle
	};
};

exports.type = {
	es: false,
	sp: false
};
