// Red Refuge
//
// made by Multarix

const { SpawnPoint, SpawnVector, SpawnCircle } = require("../lib");

let player, entity, library, effect;

module.exports = (mod) => {
	return {

		// Kalavese (1st boss)
		"s-739-1000-105-0": [{ "type": "text", "message": "Turn & Breath" }],
		"s-739-1000-308-0": [{ "type": "text", "message": "In then Out" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 300, 0, 7500) }],
		"s-739-1000-308-1": [{ "type": "text", "message": "Out" }],
		"s-739-1000-112-0": [{ "type": "text", "message": "Back Spray" }],
		"s-739-1000-107-0": [{ "type": "text", "message": "Jump" }],
		"s-739-1000-306-0": [{ "type": "text", "message": "Out then In" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 300, 0, 7500) }],
		"s-739-1000-1306-1": [{ "type": "text", "message": "In" }],

		// Thormentum (2nd Boss)
		"s-739-2000-105-0": [{ "type": "text", "message": "360" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 300, 0, 2500) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 510, 0, 2500) }],
		"s-739-2000-113-0": [{ "type": "text", "message": "Stun" }],
		"s-739-2000-108-0": [{ "type": "text", "message": "Clense", "class_position": "heal" }],
		"s-739-2000-115-0": [{ "type": "text", "message": "Whirlwind" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 360, 0, 6500) }],
		"s-739-2000-119-0": [{ "type": "text", "message": "Front" }],
		"s-739-2000-120-0": [{ "type": "text", "message": "Back" }],
		"s-739-2000-303-0": [{ "type": "text", "message": "Whip" }],

		// Argog (3rd boss)
		"h-739-3001-30": [{ "type": "text", "message": "Reveal Soon..." }],
		"s-739-3000-201-0": [{ "type": "text", "message": 'Blue Shield', "class_position": "lancer" },
			{ "type": "text", "delay": 3650, "message": 'Dodge!' }],
		"s-739-3000-107-0": [{ "type": "text", "message": "Many Hits" }],
		"s-739-3000-115-0": [{ "type": "text", "message": 'Incoming Stun' },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 630, 0, 4000) },
			{ "type": "text", "delay": 2000, "message": 'Dodge!' }],
		"s-739-3000-118-0": [{ "type": "text", "message": "Scratching" }],
		// Revealed Argog
		"s-739-3000-167-0": [{ "type": "text", "message": "Many Hits" }],
		"s-739-3000-175-0": [{ "type": "text", "message": 'Incoming Stun' },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 630, 0, 4000) },
			{ "type": "text", "delay": 2000, "message": 'Dodge!' }],
		"s-739-3000-178-0": [{ "type": "text", "message": "Scratching (bleed)" }]
	};

};
