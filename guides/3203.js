// Forbidden Arena [Nightmare Undying Warlord]
//
// made by HSDN

exports.guide = (mod, extras) => {
	let timer1 = null;
	let print_target = true;
	let in_bait = false;

	function back_kick_event(skillid){
		if([107, 310].includes(skillid)){ // Bait/Back Flip
			in_bait = true;
			mod.setTimeout(() => in_bait = false, 3500);
		}

		if(skillid == 116){ // Haymaker
			if(in_bait){
				extras.sendMessage("Haymaker");
			} else { // 116 -> 146
				extras.sendMessage("Haymaker | Back Kick");
			}
		}
	}

	function target_attack_event(){
		if(print_target){
			mod.clearTimeout(timer1);
			print_target = false;

			mod.setTimeout(() => print_target = true, 5000);

			timer1 = mod.setTimeout(() => {
				extras.sendMessage("Target attacks soon...");
			}, 65000);
		}
	}

	return {
		"nd-3203-1000": [{ type: "stop_timers" },
			{ type: "despawn_all" }],
		"h-3203-1000-30": [{ type: "text", message: "30%" }],

		// "s-3203-1000-101-0": [{ type: "text", position: "tank", message: "Punch" }],
		"s-3203-1000-113-0": [{ type: "text", position: "tank", message: "Roundhouse Kick" }],
		"s-3203-1000-111-0": [{ type: "text", position: "tank", message: "Knockdown" }],
		"s-3203-1000-120-0": [{ type: "text", position: "tank", message: "Knockdown" }],
		// "s-3203-1000-102-0": [{ type: "text", position: "tank", message: "Combo" }], // 102 153/154 115/116
		"s-3203-1000-153-0": [{ type: "text", position: "tank", message: "Two Kicks" }], // 153 108
		// "s-3203-1000-108-0": [{ type: "text", position: "tank", message: "Floor Punch" }],
		// "s-3203-1000-127-0": [{ type: "text", position: "tank", message: "Many Kicks" }],

		"s-3203-1000-121-0": [{ type: "text", message: "Flip Kick (Stun)" }],
		"s-3203-1000-107-0": [{ type: "text", message: "Bait" },
			{ type: "function", function: back_kick_event, args: [107] }],
		"s-3203-1000-110-0": [{ type: "text", message: "Spin" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 0, 12, 420, 3000] }],
		"s-3203-1000-114-0": [{ type: "text", message: "Leap (Knockdown)" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 0, 12, 240, 2000] }],
		// "s-3203-1000-154-0": [{ type: "text", message: "Jumping Kick" }], // 154 310 116
		// 310 116
		"s-3203-1000-310-0": [{ type: "text", message: "Back Flip | Haymaker" },
			{ type: "function", function: back_kick_event, args: [310] }],
		"s-3203-1000-116-0": [{ type: "function", function: back_kick_event, args: [116] }], // Haymaker
		"s-3203-1000-115-0": [{ type: "text", message: "Haymaker (Tank)" }],
		"s-3203-1000-131-0": [{ type: "text", message: "Rhythmic Blows" }], // 131 132 133
		"s-3203-1000-146-0": [{ type: "text", message: "Back Kick" }, // 116 146
			{ type: "spawn", function: "vector", args: [553, 90, 120, 170, 600, 3000] },
			{ type: "spawn", function: "vector", args: [553, 270, 120, -170, 600, 3000] }],

		// Shield
		"qb-3203-1000-32031006": [{ type: "text", message: "Shield!" }],

		// Target "Ha" attacks 308 32031007 125
		"qb-3203-1000-32031007": [{ type: "text", message: "Target" },
			{ type: "function", function: target_attack_event }],
		"s-3203-1000-124-0": [{ type: "text", message: "Kick" }], // 305 124
		"s-3203-1000-125-0": [{ type: "text", message: "Kick" }],

		// Donuts
		"qb-3203-1000-32031008": [{ type: "text", message: "Donuts: Out > In > Dodge" }], // 32031008 303/304 117 155
		"qb-3203-1000-32031009": [{ type: "text", message: "Donuts: In > Out > Dodge" }], // 32031009 303/304 118 155
		"s-3203-1000-303-0": [{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 630, 7000] },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 12, 250, 5000] },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 8, 490, 5000] }],
		"s-3203-1000-304-0": [{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 630, 7000] },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 12, 250, 5000] },
			{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 8, 490, 5000] }],
		"s-3203-1000-155-0": [{ type: "text", delay: 400, message: "Dodge" }],

		// Stun 142 148 129
		"s-3203-1000-142-0": [{ type: "text", message: "Stun | Back Wave" }],
		"s-3203-1000-148-0": [{ type: "spawn", function: "circle", args: [true, 912, 0, -10, 12, 300, 3000] }],
		"s-3203-1000-129-0": [{ type: "text", message: "Back Wave" },
			{ type: "spawn", function: "vector", args: [912, 90, 210, 390, 300, 2000] },
			{ type: "spawn", function: "vector", args: [912, 90, 140, 380, 350, 2000] },
			{ type: "spawn", function: "vector", args: [912, 90, 70, 370, 400, 2000] },
			{ type: "spawn", function: "vector", args: [912, 90, 0, 0, 400, 2000] },
			{ type: "spawn", function: "vector", args: [912, 270, 70, -370, 400, 2000] },
			{ type: "spawn", function: "vector", args: [912, 270, 140, -380, 350, 2000] },
			{ type: "spawn", function: "vector", args: [912, 270, 210, -390, 300, 2000] }],

		// Jump 143-0 143-1
		"s-3203-1000-143-0": [{ type: "text", message: "Jump (Stun)" }],
		"s-3203-1000-143-1": [{ type: "spawn", function: "circle", args: [true, 553, 0, 0, 14, 240, 2000] }],

		// AoE 313 314
		"s-3203-1000-313-0": [{ type: "text", message: "AOE" }],
		"s-3203-1000-314-0": [{ type: "text", message: "Get Out" }],

		// Explosion 32031003 152 / 135
		"s-3203-1000-152-0": [{ type: "text", message: "Explosion (Stun)" },
			{ type: "spawn", function: "circle", args: [true, 912, 0, 0, 8, 460, 2500] },
			{ type: "text", delay: 58000, message: "Explosion soon..." }],
		"s-3203-1000-135-0": [{ type: "text", message: "Explosion (Stun)" },
			{ type: "spawn", function: "circle", args: [true, 912, 0, 0, 8, 460, 2500] },
			{ type: "text", delay: 58000, message: "Explosion soon..." }],

		// Debuff
		"ae-0-0-32031011": [{ type: "text", message: "Debuff Stack" }],
		"am-3203-1000-32031011": [{ type: "text", message: "Debuff Stack" }],
		"am-3203-1000-32031012": [{ type: "text", message: "Debuff Stack" }]
	};
};

exports.type = { es: false, sp: false };
