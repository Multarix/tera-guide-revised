// Forbidden Arena [Nightmare Undying Warlord]
//
// made by HSDN



let player, entity, library, effect;

let timer1;
let print_target = true;
let in_bait = false;

function skilld_event(skillid, handlers, event, ent, dispatch){
	if([107, 310].includes(skillid)){ // Bait/Back Flip
		in_bait = true;
		dispatch.setTimeout(() => in_bait = false, 3500);
	}
	if(skillid == 116){ // Haymaker
		if(in_bait){
			handlers["text"]({
				"sub_type": "message",
				"message": "Haymaker",
				"message_RU": "Мощный удар"
			});
		} else { // 116 -> 146
			handlers["text"]({
				"sub_type": "message",
				"message": "Haymaker | Back Kick",
				"message_RU": "Мощный удар | Откид назад"
			});
		}
	}
	if([31031007, 32031007].includes(skillid)){ // "Ha" attacks
		if(print_target){
			dispatch.clearTimeout(timer1);
			print_target = false;
			dispatch.setTimeout(() => print_target = true, 5000);
			timer1 = dispatch.setTimeout(() => {
				handlers["text"]({
					"sub_type": "alert",
					"message": "Target attacks soon...",
					"message_RU": "Скоро таргет-атака..."
				});
			}, 65000);
		}
	}
}

module.exports = (mod) => {
	return {

		"h-3203-1000-30": [{ "type": "text", "message": "30%" }],

		// "s-3203-1000-101-0": [{ "type": "text", "class_position": "tank", "message": "Punch" }],
		"s-3203-1000-113-0": [{ "type": "text", "class_position": "tank", "message": "Roundhouse Kick" }],
		"s-3203-1000-111-0": [{ "type": "text", "class_position": "tank", "message": "Knockdown" }],
		"s-3203-1000-120-0": [{ "type": "text", "class_position": "tank", "message": "Knockdown" }],
		// "s-3203-1000-102-0": [{ "type": "text", "class_position": "tank", "message": "Combo" }], // 102 153/154 115/116
		"s-3203-1000-153-0": [{ "type": "text", "class_position": "tank", "message": "Two Kicks" }], // 153 108
		// "s-3203-1000-108-0": [{ "type": "text", "class_position": "tank", "message": "Floor Punch" }],
		// "s-3203-1000-127-0": [{ "type": "text", "class_position": "tank", "message": "Many Kicks" }],

		"s-3203-1000-121-0": [{ "type": "text", "message": "Flip Kick (Stun)" }],
		"s-3203-1000-107-0": [{ "type": "text", "message": "Bait" }, { "type": "function", "function": skilld_event[107] }],
		"s-3203-1000-110-0": [{ "type": "text", "message": "Spin" }, { "type": "function", "function": spawn.circle, "args": [true, 553, 0, 0, 12, 420, 0, 3000] }],
		"s-3203-1000-114-0": [{ "type": "text", "message": "Leap (Knockdown)" }, { "type": "function", "function": spawn.circle, "args": [true, 553, 0, 0, 12, 240, 0, 2000] }],
		// "s-3203-1000-154-0": [{ "type": "text", "message": "Jumping Kick" }], // 154 310 116
		"s-3203-1000-310-0": [{ "type": "text", "message": "Back Flip | Haymaker" }, { "type": "function", "function": skilld_event[310] }], // 310 116
		"s-3203-1000-116-0": [{ "type": "function", "function": skilld_event[116] }], // Haymaker
		"s-3203-1000-115-0": [{ "type": "text", "message": "Haymaker (Tank)" }],
		"s-3203-1000-131-0": [{ "type": "text", "message": "Rhythmic Blows" }], // 131 132 133
		"s-3203-1000-146-0": [{ "type": "text", "message": "Back Kick" }, // 116 146
			{ "type": "function", "function": spawn.vector, "args": [553, 90, 120, 170, 600, 0, 3000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 270, 120, -170, 600, 0, 3000] }],

		// Shield
		"qb-3203-1000-32031006": [{ "type": "text", "message": "Shield!" }],

		// Target "Ha" attacks 308 32031007 125
		"qb-3203-1000-32031007": [{ "type": "text", "message": "Target" }, { "type": "function", "function": skilld_event[32031007] }],
		"s-3203-1000-124-0": [{ "type": "text", "message": "Kick" }], // 305 124
		"s-3203-1000-125-0": [{ "type": "text", "message": "Kick" }],

		// Donuts
		"qb-3203-1000-32031008": [{ "type": "text", "message": "Donuts: Out > In > Dodge" }], // 32031008 303/304 117 155
		"qb-3203-1000-32031009": [{ "type": "text", "message": "Donuts: In > Out > Dodge" }], // 32031009 303/304 118 155
		"s-3203-1000-303-0": [{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 8, 630, 0, 7000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 0, 0, 12, 250, 0, 5000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 0, 0, 8, 480, 0, 5000] }],
		"s-3203-1000-304-0": [{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 8, 630, 0, 7000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 0, 0, 12, 250, 0, 5000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 445, 0, 0, 8, 480, 0, 5000] }],
		"s-3203-1000-155-0": [{ "type": "text", "delay": 400, "message": "Dodge" }],

		// Stun 142 148 129
		"s-3203-1000-142-0": [{ "type": "text", "message": "Stun | Back Wave" }],
		"s-3203-1000-148-0": [{ "type": "function", "function": spawn.circle, "args": [true, 912, 0, 0, 12, 300, 0, 3000] }],
		"s-3203-1000-129-0": [{ "type": "text", "message": "Back Wave" },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 210, 390, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 140, 380, 350, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 70, 370, 400, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 90, 0, 0, 400, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 70, -370, 400, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 140, -380, 350, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [912, 270, 210, -390, 300, 0, 2000] }],

		// Jump 143-0 143-1
		"s-3203-1000-143-0": [{ "type": "text", "message": "Jump (Stun)" }],
		"s-3203-1000-143-1": [{ "type": "function", "function": spawn.circle, "args": [true, 553, 0, 0, 14, 240, 0, 2000] }],

		// AoE 313 314
		"s-3203-1000-313-0": [{ "type": "text", "message": "AOE" }],
		"s-3203-1000-314-0": [{ "type": "text", "message": "Get Out" },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 20, 460, 0, 4000] }],

		// Explosion 320310?? ??? ???
		// "s-3203-1000-???-0": [{ "type": "text", "message": "Explosion (Stun)" },
		//	{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 14, 360, 0, 3000] },
		//	{ "type": "text", "sub_type": "alert", "delay": 65000, "message": "Explosion soon..." }
		// ],
		// "s-3203-1000-???-0": [{ "type": "text", "message": "Dodge!" }],

		// Debuff
		"ae-0-0-32031011": [{ "type": "text", "sub_type": "alert", "message": "Debuff Stack" }],
		"am-3203-1000-32031011": [{ "type": "text", "sub_type": "alert", "message": "Debuff Stack" }],
		"am-3203-1000-32031012": [{ "type": "text", "sub_type": "alert", "message": "Debuff Stack" }]
	};

};
