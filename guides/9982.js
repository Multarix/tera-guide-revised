// Grotto of Lost Souls (Hard)
//
// made by michengs



let player, entity, library, effect;

let power = true;
let Level = 0;
let powerMsg = null;
let notice = true;
let steptwo = false;

function start_boss(){
	power = false;
	Level = 0;
	notice = true;
	powerMsg = null;
	steptwo = false;
}

function skilld_event(skillid, handlers, event, ent, dispatch){
	if(!notice) return;

	if(notice && [118, 139, 141, 150, 152].includes(skillid)){
		notice = false;
		dispatch.setTimeout(() => notice = true, 4000);
	}
	if(skillid === 300){
		power = true;
		Level = 0;
		powerMsg = null;
	}
	if(skillid === 360 || skillid === 399){
		Level = 0;
	}
	if(power && [118, 143, 145, 146, 144, 147, 148, 154, 155, 161, 162, 213, 215].includes(skillid)){
		Level++;
		powerMsg = "{" + Level + "}";
		if(Level == 4){
			handlers["text"]({
				"sub_type": "message",
				"message_RU": "Полностью заряжен!",
				"message": "Fully charged!"
			});
			handlers["text"]({
				"sub_type": "alert",
				"message_RU": "Полностью заряжен!",
				"message": "Fully charged!"
			});
		} else if(Level == 2 && steptwo){
			handlers["text"]({
				"sub_type": "message",
				"message_RU": "Полностью заряжен!",
				"message": "Fully charged!!"
			});
			handlers["text"]({
				"sub_type": "alert",
				"message_RU": "Полностью заряжен!",
				"message": "Fully charged!"
			});
		}
		if(powerMsg !== null && skillid !== 399){
			if(!steptwo && Level !== 4){
				handlers["text"]({
					"sub_type": "message",
					"message_RU": powerMsg,
					"message": powerMsg
				});
			}
			if(steptwo && Level !== 2){
				handlers["text"]({
					"sub_type": "message",
					"message_RU": powerMsg,
					"message": powerMsg
				});
			}
		}
	}
	if(skillid === 399){
		steptwo = true;
	}
}

module.exports = (mod) => {
	return {

		// 1 BOSS
		"s-982-1000-106-0": [{ "type": "text", "class_position": "tank", "message": "Heavy" }],
		"s-982-1000-107-0": [{ "type": "text", "class_position": "dps", "message": "Pushback" },
			{ "type": "text", "class_position": "heal", "message": "Pushback (Kaia)" }],
		"s-982-1000-108-0": [{ "type": "text", "message": "Bait (Flying)" }],
		"s-982-1000-109-0": [{ "type": "text", "message": "Rocks (Small)" }],
		"s-982-1000-110-0": [{ "type": "text", "message": "Rocks (Large)" }],
		"s-982-1000-301-0": [{ "type": "text", "message": "Flower Stuns" }],
		"s-982-1000-307-0": [{ "type": "text", "message": "Cage" }],
		"s-982-1000-309-0": [{ "type": "text", "message": "1 Flower" }],
		"s-982-1000-310-0": [{ "type": "text", "message": "2 Flower" }],
		"s-982-1000-116-0": [{ "type": "text", "message": "Big AoE Attack!" }],
		"s-982-1000-312-0": [{ "type": "text", "message": "Golden Flower!" }],

		// 2 BOSS
		"s-982-2000-105-0": [{ "type": "text", "message": "Spin" }],
		"s-982-2000-113-0": [{ "type": "text", "message": "Stun Inc" }],
		"s-982-2000-114-0": [{ "type": "text", "message": "Get In" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 15, 260, 0, 3000] }],
		"s-982-2000-116-0": [{ "type": "text", "message": "Front then Back" },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 270, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 180, 0, 90, 500, 0, 5000] }],
		"s-982-2000-301-0": [{ "type": "text", "message": "Get Out + Dodge" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 15, 260, 0, 3000] }],
		"s-982-2000-302-0": [{ "type": "text", "message": "Get In + Dodge" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 15, 260, 0, 3000] }],

		// 3 БОСС
		"h-982-3000-99": [{ "type": "function", "function": start_boss }],
		"h-982-3000-30": [{ "type": "text", "message": "30%" }],
		"s-982-3000-118-0": [{ "type": "text", "message": "Front Triple" },
			{ "type": "function", "function": skilld_event[118] }],
		"s-982-3000-143-0": [{ "type": "text", "message": "Left Rear" },
			{ "type": "function", "function": skilld_event[143] }],
		"s-982-3000-145-0": [{ "type": "text", "message": "Left Rear" },
			{ "type": "function", "function": skilld_event[145] }],
		"s-982-3000-146-0": [{ "type": "text", "message": "Left Rear (Pulses)" },
			{ "type": "function", "function": spawn.marker, "args": [false, 215, 370, 0, 8000, true, null] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 15, 160, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 12, 320, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 10, 480, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 8, 640, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 6, 800, 2500, 8000] },
			{ "type": "function", "function": skilld_event[146] }],
		"s-982-3000-154-0": [{ "type": "text", "message": "Left Rear (Pulses)" },
			{ "type": "function", "function": spawn.marker, "args": [false, 215, 370, 0, 8000, true, null] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 15, 160, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 12, 320, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 10, 480, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 8, 640, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 215, 370, 6, 800, 2500, 8000] },
			{ "type": "function", "function": skilld_event[154] }],
		"s-982-3000-144-0": [{ "type": "text", "message": "Right Rear" },
			{ "type": "function", "function": skilld_event[144] }],
		"s-982-3000-147-0": [{ "type": "text", "message": "Right Rear" },
			{ "type": "function", "function": skilld_event[147] }],
		"s-982-3000-148-0": [{ "type": "text", "message": "Right Rear (Pulses)" },
			{ "type": "function", "function": spawn.marker, "args": [false, 155, 388, 0, 8000, true, null] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 15, 160, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 12, 320, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 10, 480, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 8, 640, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 6, 800, 2500, 8000] },
			{ "type": "function", "function": skilld_event[148] }],
		"s-982-3000-155-0": [{ "type": "text", "message": "Right Rear (Pulses)" },
			{ "type": "function", "function": spawn.marker, "args": [false, 155, 388, 0, 8000, true, null] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 15, 160, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 12, 320, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 10, 480, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 8, 640, 2500, 8000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 155, 388, 6, 800, 2500, 8000] },
			{ "type": "function", "function": skilld_event[155] }],
		"s-982-3000-161-0": [{ "type": "text", "message": "Back then Front" },
			{ "type": "function", "function": skilld_event[161] }],
		"s-982-3000-162-0": [{ "type": "text", "message": "Back then Front" },
			{ "type": "function", "function": skilld_event[162] }],
		"s-982-3000-213-0": [{ "type": "text", "message": "Tail" },
			{ "type": "function", "function": skilld_event[213] }],
		"s-982-3000-215-0": [{ "type": "text", "message": "Tail!" },
			{ "type": "function", "function": skilld_event[215] }],
		"s-982-3000-139-0": [{ "type": "text", "message": "Left Safe" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 0, 180, 500, 0, 5000] },
			{ "type": "function", "function": spawn.marker, "args": [false, 270, 200, 0, 8000, true, null] },
			{ "type": "function", "function": skilld_event[139] }],
		"s-982-3000-150-0": [{ "type": "text", "message": "Left Safe" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 0, 180, 500, 0, 5000] },
			{ "type": "function", "function": spawn.marker, "args": [false, 270, 200, 0, 8000, true, null] },
			{ "type": "function", "function": skilld_event[150] }],
		"s-982-3000-141-0": [{ "type": "text", "message": "Right Safe" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 0, 180, 500, 0, 5000] },
			{ "type": "function", "function": spawn.marker, "args": [false, 90, 200, 0, 8000, true, null] },
			{ "type": "function", "function": skilld_event[141] }],
		"s-982-3000-152-0": [{ "type": "text", "message": "Right Safe" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 500, 0, 5000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 0, 180, 500, 0, 5000] },
			{ "type": "function", "function": spawn.marker, "args": [false, 90, 200, 0, 8000, true, null] },
			{ "type": "function", "function": skilld_event[152] }],
		"s-982-3000-300-0": [{ "type": "text", "message": "Dodge! (Awakening 1)" },
			{ "type": "function", "function": skilld_event[300] }],
		"s-982-3000-399-0": [{ "type": "text", "message": "Dodge! (Awakening 2)" },
			{ "type": "function", "function": skilld_event[399] }],
		"s-982-3000-360-0": [{ "type": "text", "message": "Explosion!" },
			{ "type": "function", "function": skilld_event[360] }]
	};

};
