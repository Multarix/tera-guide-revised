// Grotto of Lost Souls
//
// made by michengs



let player, entity, library, effect;

module.exports = (mod) => {
	return {

		// 1 BOSS
		"s-782-1000-106-0": [{ "type": "text", "class_position":"tank", "message": "Heavy" }],
		"s-782-1000-107-0": [{ "type": "text", "class_position": "dps", "message": "Pushback" },
			{ "type": "text", "class_position": "heal", "message": "Pushback" }],
		"s-782-1000-108-0": [{ "type": "text", "class_position": "dps" },
			{ "type": "text", "class_position": "heal" }],
		"s-782-1000-109-0": [{ "type": "text", "message": "Rocks (Small)" }],
		"s-782-1000-110-0": [{ "type": "text", "message": "Rocks (Large)" }],
		"s-782-1000-301-0": [{ "type": "text", "message": "Flower Stuns" }],
		"s-782-1000-307-0": [{ "type": "text", "class_position": "dps" },
			{ "type": "text", "class_position": "heal" }],
		"s-782-1000-309-0": [{ "type": "text", "message": "1 flower" }],
		"s-782-1000-310-0": [{ "type": "text", "message": "2 flower" }],
		"s-782-1000-116-0": [{ "type": "text", "message": "Big AoE attack!!" }],
		"s-782-1000-312-0": [{ "type": "text", "message": "Golden Flower!!" }],

		// 2 BOSS
		"s-782-2000-105-0": [{ "type": "text", "message": "Spin" }],
		"s-782-2000-113-0": [{ "type": "text", "message": "Stun Inc" }],
		"s-782-2000-114-0": [{ "type": "text", "message": "Get IN" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 15, 260, 0, 3000] }],
		"s-782-2000-116-0": [{ "type": "text", "message": "Front then Back" },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 270, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 180, 0, 90, 500, 0, 5000] }],
		"s-782-2000-301-0": [{ "type": "text", "message": "Get Out + Dodge" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 15, 260, 0, 3000] }],
		"s-782-2000-302-0": [{ "type": "text", "message": "Get In + Dodge" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 15, 260, 0, 3000] }],

		// 3 BOSS
		"s-782-3000-118-0": [{ "type": "text", "message": "Front Triple" }],
		"s-782-3000-143-0": [{ "type": "text", "message": "Left rear" }],
		"s-782-3000-145-0": [{ "type": "text", "message": "Left rear" }],
		"s-782-3000-146-0": [{ "type": "text", "message": "Left rear (Pulses)" },
			{ "type": "function", "function": spawn.marker, "args": [false, 215, 370, 0, 8000, true, null] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 15, 160, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 12, 320, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 10, 480, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 8, 640, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 6, 800, 2500, 8000] }],
		"s-782-3000-154-0": [{ "type": "text", "message": "Left rear (Pulses)" },
			{ "type": "function", "function": spawn.marker, "args": [false, 215, 370, 0, 8000, true, null] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 15, 160, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 12, 320, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 10, 480, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 8, 640, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 6, 800, 2500, 8000] }],
		"s-782-3000-144-0": [{ "type": "text", "message": "Right Rear" }],
		"s-782-3000-147-0": [{ "type": "text", "message": "Right Rear" }],
		"s-782-3000-148-0": [{ "type": "text", "message": "Right rear (Pulses)" },
			{ "type": "function", "function": spawn.marker, "args": [false, 155, 388, 0, 8000, true, null] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 15, 160, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 12, 320, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 10, 480, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 8, 640, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 6, 800, 2500, 8000] }],
		"s-782-3000-155-0": [{ "type": "text", "message": "Right rear (Pulses)" },
			{ "type": "function", "function": spawn.marker, "args": [false, 155, 388, 0, 8000, true, null] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 15, 160, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 12, 320, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 10, 480, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 8, 640, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 6, 800, 2500, 8000] }],
		"s-782-3000-161-0": [{ "type": "text", "message": "Back then Front" }],
		"s-782-3000-162-0": [{ "type": "text", "message": "Back then Front" }],
		"s-782-3000-213-0": [{ "type": "text", "message": "Tail" }],
		"s-782-3000-215-0": [{ "type": "text", "message": "Tail!" }],
		"s-782-3000-139-0": [{ "type": "text", "message": "Left safe" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 0, 180, 500, 0, 5000] },
			{ "type": "function", "function": spawn.marker, "args": [false, 270, 200, 0, 8000, true, null] }],
		"s-782-3000-150-0": [{ "type": "text", "message": "Left safe" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 0, 180, 500, 0, 5000] },
			{ "type": "function", "function": spawn.marker, "args": [false, 270, 200, 0, 8000, true, null] }],
		"s-782-3000-141-0": [{ "type": "text", "message": "Right safe" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 0, 180, 500, 0, 5000] },
			{ "type": "function", "function": spawn.marker, "args": [false, 90, 200, 0, 8000, true, null] }],
		"s-782-3000-152-0": [{ "type": "text", "message": "Right safe" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 0, 180, 500, 0, 5000] },
			{ "type": "function", "function": spawn.marker, "args": [false, 90, 200, 0, 8000, true, null] }],
		"s-782-3000-300-0": [{ "type": "text", "message": "Dodge! (Awakening 1)" }],
		"s-782-3000-399-0": [{ "type": "text", "message": "Dodge! (Awakening 2)" }],
		"s-782-3000-360-0": [{ "type": "text", "message": "Explosion!" }]
	};

};
