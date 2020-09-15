// Antaroth's Abyss
//
// made by Yuyuko / HSDN



let player, entity, library, effect;

let counter = 0;
let timer;

function thirdboss_backattack_event(handlers, event, ent, dispatch){
	dispatch.clearTimeout(timer);
	counter++;
	if(counter >= 2){
		handlers['text']({
			"sub_type": "message",
			"message": "Back attack",
			"message_RU": "Задний"
		});
	}
	timer = dispatch.setTimeout(() => {
		counter = 0;
	}, 3000);
}

module.exports = (mod) => {
	return {

		// 1 BOSS
		"s-720-1000-117-0": [{ "type": "text", "message": "Stay In > Get Out" }],
		"s-720-1000-116-0": [{ "type": "text", "message": "Get Out > Stay In" }],
		"s-720-1000-109-0": [{ "type": "text", "message": "Back Attack" }],
		"s-720-1000-300-0": [{ "type": "text", "delay": 600, "message": "Dodge!" }],

		// 2 BOSS
		"s-720-2000-106-0": [{ "type": "text", "message": "Spin Attack" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 10, 320, 0, 3500] }],
		"s-720-2000-105-0": [{ "type": "text", "message": "Back Attack" }],
		"s-720-2000-104-0": [{ "type": "text", "message": "Random Jump" }],
		"s-720-2000-112-0": [{ "type": "text", "message": "Right Slash" }],
		"s-720-2000-111-0": [{ "type": "text", "message": "Left Slash" }],
		"s-720-2000-110-0": [{ "type": "text", "message": "Stun Attack" }],
		"s-720-2000-119-0": [{ "type": "text", "message": "Red: Out Safe" }],
		"s-720-2000-220-0": [{ "type": "text", "message": "Blue: In Safe" }],
		"s-720-2000-116-0": [{ "type": "text", "message": "Circles" }],

		// 3 BOSS
		"s-720-3000-315-0": [{ "type": "text", "message": "Pushback" }],
		"s-720-3000-107-0": [{ "type": "text", "message": "Random Jump" }],
		"s-720-3000-204-0": [{ "type": "text", "message": "Energy Beam" }],
		// heart thrust+anticlockwise spin+right swipe
		"s-720-3000-109-0": [{ "type": "text", "class_position":"tank", "message": "Right Safe" },
			{ "type": "text", "class_position":"dps", "message": "Left Safe" },
			{ "type": "text", "class_position":"heal", "message": "Left Safe" },
			{ "type": "function", "function": spawn.marker, "args": [false, 90, -250, 0, 2500, true, null] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 180, 500, 0, 2500] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 500, 0, 2500] }],
		// heart thrust+clockwise spin+left swipe
		"s-720-3000-111-0": [{ "type": "text", "class_position":"tank", "message": "Left Safe" },
			{ "type": "text", "class_position":"dps", "message": "Right Safe" },
			{ "type": "text", "class_position":"heal", "message": "Right Safe" },
			{ "type": "function", "function": spawn.marker, "args": [false, 270, -250, 0, 2500, true, null] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 180, 500, 0, 2500] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 500, 0, 2500] }],
		"s-720-3000-113-0": [{ "type": "text", "message": "Front | Back Slam" }],
		"s-720-3000-115-0": [{ "type": "text", "message": "Spinning Attack" }],
		"s-720-3000-104-0": [{ "type": "function", "function": thirdboss_backattack_event }],
		// "s-720-3000-202-0": [{ "type": "text", "message": "spin or front, back slam" }],

		"s-720-3000-400-0": [{ "type": "text", "message": "Clones: Beam" }],
		"s-720-3000-401-0": [{ "type": "text", "message": "Clones: Spin" }]
	};

};
