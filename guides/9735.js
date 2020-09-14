﻿// RK-9 Kennel
//
// made by michengs

const { SpawnPoint, SpawnVector, SpawnCircle } = require("../lib");

let player, entity, library, effect;

module.exports = (mod) => {
	return {

		// 1 BOSS
		"s-735-1000-111-0": [{ "type": "text", "message": "Back + Front" }],
		"s-735-1000-112-0": [{ "type": "text", "message": "Back" }],
		"s-735-1000-304-0": [{ "type": "text", "message": "Out" }],
		"s-735-1000-305-0": [{ "type": "text", "message": "In" }],
		"s-735-1000-306-0": [{ "type": "text", "message": "Bombs" }],
		"s-735-1000-307-0": [{ "type": "text", "message": "Pull (dodge)" }],
		"s-735-1000-309-0": [{ "type": "text", "message": "Four Missile" }],

		// 2 BOSS
		"s-735-2000-102-0": [{ "type": "text", "class_position":"tank", "message": "Pizza Cutter (dodge)" },
			{ "type": "function", "function": SpawnCircle.bind(null, true, 553, 0, 300, 12, 230, 0, 3000) }],
		"s-735-2000-105-0": [{ "type": "text", "message": "360" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 280, 100, 4000) }],
		"s-735-2000-108-0": [{ "type": "text", "message": "Back Swipe" },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 240, 380, 0, 2000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 120, 380, 0, 2000) }],
		"s-735-2000-301-0": [{ "type": "text", "message": "Throwing Orb" }],
		"s-735-2000-304-0": [{ "type": "text", "message": "Get Out!" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 10, 380, 100, 4200) }],
		"s-735-2007-201-0": [{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 0, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 90, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 180, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 270, 500, 0, 4000) }],
		"s-735-2007-306-0": [{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 0, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 90, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 180, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 270, 500, 0, 4000) }],
		"s-735-2007-307-0": [{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 0, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 90, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 180, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 270, 500, 0, 4000) }],

		// 3 BOSS
		"s-735-3000-116-0": [{ "type": "text", "message": "Go Right" },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 120, 250, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 130, 240, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 140, 230, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 150, 220, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 160, 210, 0, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 170, 210, 180, 290, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 300, 250, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 310, 240, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 320, 230, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 330, 220, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 340, 210, 0, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 350, 210, 0, 290, 0, 3000) }],
		"s-735-3000-117-0": [{ "type": "text", "message": "Go Left" },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 10, 210, 0, 290, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 20, 210, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 30, 220, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 40, 230, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 50, 240, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 60, 250, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 240, 250, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 230, 240, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 220, 230, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 210, 220, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 200, 210, 0, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 190, 210, 180, 290, 0, 3000) }],
		"s-735-3000-118-0": [{ "type": "text", "message": "Go Left" },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 10, 210, 0, 290, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 20, 210, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 30, 220, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 40, 230, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 50, 240, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 60, 250, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 240, 250, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 230, 240, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 220, 230, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 210, 220, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 200, 210, 0, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 190, 210, 180, 290, 0, 3000) }],
		"s-735-3000-119-0": [{ "type": "text", "message": "Go Right" },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 120, 250, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 130, 240, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 140, 230, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 150, 220, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 160, 210, 0, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 170, 210, 180, 290, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 300, 250, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 310, 240, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 320, 230, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 330, 220, 0, 3000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 553, 340, 210, 0, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 350, 210, 0, 290, 0, 3000) }],
		"s-735-3000-129-0": [{ "type": "text", "class_position": "tank", "message": "Dodge" }],
		"s-735-3000-305-0": [{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 300, 0, 7000) }],
		"s-735-3000-321-0": [{ "type": "text", "message": "Shield!" }],
		"s-735-3000-324-0": [{ "type": "text", "message": "Dodge!" }]
	};

};