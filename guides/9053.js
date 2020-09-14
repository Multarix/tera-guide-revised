// Kezzel's Gorge
//
// Made by Multarix

const { SpawnMarker, SpawnVector, SpawnCircle } = require("../lib");
let player, entity, library, effect;

module.exports = (mod) => {
	return {
	// Kezzel (1st boss)
		"s-453-999-103-0": [{ "type": "text", "message": "Smash (Left)" }],
		"s-453-999-104-0": [{ "type": "text", "message": "Smash (Right)" }],
		"s-453-999-105-0": [{ "type": "text", "message": "Rock Smash", "class_position": "tank" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 210, 10, 185, 0, 3500) }],
		"s-453-999-106-0": [{ "type": "text", "message": "Blast" },
			{ "type": "text", "message": "Dodge!", "delay": 2000 }],
		"s-453-999-107-0": [{ "type": "text", "message": "Whip" }],
		"s-453-999-116-0": [{ "type": "text", "message": "Shield" }],
		"s-453-999-119-0": [{ "type": "text", "message": "Kaia's Shield", "class_position": "priest" },
			{ "type": "text", "message": "Thrall of Protection", "class_position": "mystic" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 75, 10, 450, 0, 5700) }], // Unsure on size and position, the in-game telegraphs for this boss are buggy
		"s-453-999-120-0": [{ "type": "text", "message": "AoE Waves" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 200, 0, 5700) }, // Inner circle
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 0, 0, 10, 390, 0, 6700) }, // Middle circle
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 10, 590, 0, 7700) }] // Outer circle
	};

};