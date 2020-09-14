// Draakon Arena (Hard)
//
// made by Kuroine / HSDN

const { SpawnMarker, SpawnVector, SpawnCircle, SpawnSemicircle } = require("../lib");

let player, entity, library, effect;

module.exports = (mod) => {
	return {

		// Ress bait / range check
		"s-3202-1000-107-0": [{ "type": "text", "message": "Spectral Throw (Bait)" }],

		// Basic attacks
		"s-3202-1000-103-0": [{ "type": "text", "message": "2 Hits | Bleed" }],
		"s-3202-1000-113-0": [{ "type": "text", "message": "4 Hits Combo" }],
		"s-3202-1000-105-0": [{ "type": "text", "message": "Uppercut | Stun" }],
		"s-3202-1000-106-0": [{ "type": "text", "message": "Stun" }],
		// 120 > 114
		"s-3202-1000-120-0": [{ "type": "text", "message": "Many Pokes | Stun (AOE)" }],
		"s-3202-1000-114-0": [{ "type": "text", "message": "Stun (AOE)" },
			{ "type": "function", "function": SpawnCircle.bind(null, true, 553, 0, 0, 16, 420, 100, 3000) }],
		"s-3202-1000-111-0": [{ "type": "text", "message": "Leap (Stun)" }],
		"s-3202-1000-115-0": [{ "type": "text", "message": "AOE Bombs (spread if no ninja)" },
			{ "type": "text", "delay": 3000, "message": "Gather!" }],
		"s-3202-1000-112-0": [{ "type": "text", "message": "Front | Back Kick" },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 90, 120, 160, 300, 0, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 120, -160, 300, 0, 3000) }],
		"s-3202-1000-110-0": [{ "type": "text", "message": "Donuts + Wave" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 650, 0, 4000) }],
		"s-3202-1000-109-0": [{ "type": "text", "message": "Knockdown + Spin" },
			{ "type": "function", "function": SpawnCircle.bind(null, true, 553, 0, 100, 10, 420, 0, 1000) },
			{ "type": "function", "function": SpawnCircle.bind(null, true, 553, 0, 150, 10, 420, 1000, 2000) }],
		"s-3202-1000-304-0": [{ "type": "text", "message": "Shield!" }],
		"ab-3202-1000-32021006": [{ "type": "text", "message": "Plague/Regress" }],

		// Pizza + Donuts (outward waves)
		"s-3202-1000-121-0": [{ "type": "text", "message": "Pizza (Right foot) | Out-waves: Stay Out > Get In" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 550, 0, 3000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, -60, 70, 912, 0, 0, 8, 450, 0, 4000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 120, 250, 912, 0, 0, 8, 450, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 70, 450, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 120, 450, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 250, 450, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 300, 450, 0, 4000) },
			{ "type": "text", "delay": 1900, "message": "Dodge!" }],
		"s-3202-1000-122-0": [{ "type": "function", "function": SpawnMarker.bind(null, false, 0, 100, 500, 3000, true, null) }],
		"s-3202-1000-123-0": [{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 295, 550, 0, 1500) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 85, 550, 0, 1500) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 85, 295, 912, 0, 0, 6, 550, 0, 1500) },
			{ "type": "text", "delay":100, "message": "[Out-waves: Stay Out > Get In]" }],
		"s-3202-1000-127-0": [{ "type": "text", "message": "Out-waves: Stay Out > Get In" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 0, 0, 14, 160, 0, 3000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 0, 0, 8, 390, 0, 3000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 0, 0, 6, 620, 0, 3000) }],
		// Pizza + Donuts (inward waves)
		"s-3202-1000-124-0": [{ "type": "text", "message": "Pizza (Left foot) | In-waves: Stay In > Get Out" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 550, 0, 3000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, -60, 70, 912, 0, 0, 8, 450, 0, 4000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 120, 250, 912, 0, 0, 8, 450, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 70, 450, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 120, 450, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 250, 450, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 300, 450, 0, 4000) },
			{ "type": "text", "delay": 1900, "message": "Dodge!" }],
		"s-3202-1000-125-0": [{ "type": "function", "function": SpawnMarker.bind(null, false, 0, 300, 500, 3000, true, null) }],
		"s-3202-1000-126-0": [{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 295, 550, 0, 1500) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 85, 550, 0, 1500) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 85, 295, 912, 0, 0, 6, 550, 0, 1500) },
			{ "type": "text", "delay":100, "message": "[In-waves: Stay In > Get Out]" }],
		"s-3202-1000-128-0": [{ "type": "text", "message": "In-waves: Stay In > Get Out" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 0, 0, 14, 160, 0, 3000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 0, 0, 8, 390, 0, 3000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 0, 0, 6, 620, 0, 3000) }]
	};

};
