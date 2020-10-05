// Red Refuge
//
// made by multarix
// Updated to revised version

exports.guide = (mod, extras) => {
	return {
		// 1 BOSS
		"s-739-1000-105-0": [{ type: "text", message: "Turn + Breath" }],
		"s-739-1000-308-0": [{ type: "text", message: "In > Out" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 7500] }],
		"s-739-1000-308-1": [{ type: "text", message: "Out" }],
		"s-739-1000-112-0": [{ type: "text", message: "Back Spray" }],
		"s-739-1000-107-0": [{ type: "text", message: "Jump" }],
		"s-739-1000-306-0": [{ type: "text", message: "Out > In" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 7500] }],
		"s-739-1000-306-1": [{ type: "text", message: "In" }],
		// 2 BOSS
		"s-739-2000-105-0": [{ type: "text", message: "360" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 2500] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 510, 2500] }],
		"s-739-2000-113-0": [{ type: "text", message: "Stun" }],
		"s-739-2000-108-0": [{ type: "text", message: "Clense", position: "healer" }],
		"s-739-2000-115-0": [{ type: "text", message: "Whirlwind" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 360, 6500] }],
		"s-739-2000-119-0": [{ type: "text", message: "Front" }],
		"s-739-2000-120-0": [{ type: "text", message: "Back" }],
		"s-739-2000-303-0": [{ type: "text", message: "Whip" },
			{ type: "text", message: "Dodge!", delay: 1000, targeted: true }],
		// 3 BOSS
		"h-739-3001-30": [{ type: "text", message: "Reveal soon..." }],
		"s-739-3000-201-0": [{ type: "text", delay: 3600, message: "Dodge!" }],
		"s-739-3000-107-0": [{ type: "text", message: "Many Hits" }],
		"s-739-3000-115-0": [{ type: "text", delay: 1750, message: "Dodge!" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 630, 4000] }],
		"s-739-3000-118-0": [{ type: "text", message: "Scratching" }],
		// Revealed Argog
		"s-739-3000-167-0": [{ type: "text", message: "Many Hits" }],
		"s-739-3000-175-0": [{ type: "text", delay: 1750, message: "Dodge!" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 630, 4000] }],
		"s-739-3000-178-0": [{ type: "text", message: "Scratching (bleed)" }]
	};
};

exports.type = {
	es: false,
	sp: false
};
