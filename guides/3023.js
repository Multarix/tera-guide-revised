// Akalath Quarantine
//
// made by michengs

exports.guide = (mod, extras) => {

	let debuff = 0;
	let timer1 = null;
	let timer2 = null;

	function firstboss_debuff_event(skillid){
		switch(skillid){
			case 3119: // red inside
				if(debuff === 1){
					extras.sendMessage(mod, "OUT");
				}
				if(debuff === 2){
					extras.sendMessage(mod, "IN");
				}
				break;

			case 3220: // blue inside
				if(debuff === 1){
					extras.sendMessage(mod, "IN");
				}
				if(debuff === 2){
					extras.sendMessage(mod, "OUT");
				}
				break;

			case 30231000: // red debuff
				debuff = 1;
				mod.clearTimeout(timer1);
				mod.clearTimeout(timer2);

				timer1 = mod.setTimeout(() => debuff = 0, 70000);
				break;

			case 30231001: // blue debuff
				debuff = 2;
				mod.clearTimeout(timer2);
				mod.clearTimeout(timer1);

				timer2 = mod.setTimeout(() => debuff = 0, 70000);
				break;

			case "death": // debuff removed
				debuff = 0;
				mod.clearTimeout(timer1);
				mod.clearTimeout(timer2);
				break;
		}
	}

	function firstboss_start_event(){
		debuff = 0;
	}

	return {
		// 1 BOSS
		"h-3023-1000-99": [{ type: "function", function: firstboss_start_event }],
		"nd-3023-1000": [{ type: "stop_timers" },
			{ type: "despawn_all" }],
		"ns-3023-1000": [{ type: "function", function: firstboss_start_event }],
		"s-3023-1000-104-0": [{ type: "text", message: "Random Jump" }],
		"s-3023-1000-105-0": [{ type: "text", message: "Back" }],
		"s-3023-1000-110-0": [{ type: "text", message: "Stun" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 175, 10, 260, 6000] }],
		"s-3023-1000-111-0": [{ type: "text", message: "Left Slash" },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 20, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 20, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 6, 302, 270, 200, 2000] },
			{ type: "spawn", function: "vector", args: [553, 176, 502, 270, 200, 2000] }],
		"s-3023-1000-112-0": [{ type: "text", message: "Right Slash" },
			{ type: "spawn", function: "vector", args: [553, 90, 200, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 200, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 20, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 20, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 354, 302, 90, 200, 2000] },
			{ type: "spawn", function: "vector", args: [553, 184, 502, 90, 200, 2000] }],
		"s-3023-1000-113-0": [{ type: "text", message: "Left Slash" },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 20, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 20, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 6, 302, 270, 200, 2000] },
			{ type: "spawn", function: "vector", args: [553, 176, 502, 270, 200, 2000] }],
		"s-3023-1000-114-0": [{ type: "text", message: "Right Slash" },
			{ type: "spawn", function: "vector", args: [553, 90, 200, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 200, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 20, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 20, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 354, 302, 90, 200, 2000] },
			{ type: "spawn", function: "vector", args: [553, 184, 502, 90, 200, 2000] }],
		"s-3023-1000-115-0": [{ type: "text", message: "Back Attack" },
			{ type: "spawn", function: "semi", args: [90, 270, 553, 0, 0, 20, 160, 2000], delay: 100 },
			{ type: "spawn", function: "semi", args: [90, 270, 553, 0, 0, 12, 220, 2000], delay: 100 },
			{ type: "spawn", function: "semi", args: [90, 270, 553, 0, 0, 10, 300, 2000], delay: 100 }],
		"s-3023-1000-116-0": [{ type: "text", message: "Kaia's Shield", position: "priest" },
			{ type: "text", message: "Thrall of Protection", position: "mystic" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 500, 6000] }],
		"am-3023-1000-30231000": [{ type: "function", function: firstboss_debuff_event, args: [30231000] }],
		"am-3023-1000-30231001": [{ type: "function", function: firstboss_debuff_event, args: [30231001] }],
		"death": [{ type: "function", function: firstboss_debuff_event, args: ["death"] }], // Debuff removed
		"ae-0-0-30231000": [{ type: "function", function: firstboss_debuff_event, args: [30231000] }], // Red debuff
		"ae-0-0-30231001": [{ type: "function", function: firstboss_debuff_event, args: [30231001] }], // Blue debuff
		"s-3023-1000-3107-0": [{ type: "text", message: "Smash" },
			{ type: "spawn", function: "vector", args: [553, 90, 80, 10, 1000, 4000] },
			{ type: "spawn", function: "vector", args: [553, 270, 80, 350, 1000, 4000] }],
		"s-3023-1000-3115-0": [{ type: "text", message: "Spin" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 320, 3500] }],
		"s-3023-1000-3116-0": [{ type: "text", message: "Circles + Spin" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 320, 5000] }],
		"s-3023-1000-3119-0": [{ type: "function", function: firstboss_debuff_event, args: [3119] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 270, 4000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 575, 4000] }],
		"s-3023-1000-3220-0": [{ type: "function", function: firstboss_debuff_event, args: [3220] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 270, 4000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 575, 4000] }],

		// 2 BOSS
		"nd-3023-2000": [{ type: "stop_timers" },
			{ type: "despawn_all" }],
		"s-3023-2000-164-0": [{ type: "text", message: "Counter Attack (bleed)" }],
		"s-3023-2000-166-0": [{ type: "text", message: "Turn-back" }],
		"s-3023-2000-175-0": [{ type: "text", message: "Incoming Stun" },
			{ type: "text", delay: 1500, message: "Dodge" }],
		"s-3023-2000-178-0": [{ type: "text", message: "Scratching (bleed)" }],
		"s-3023-2000-181-0": [{ type: "text", message: "Rock Throw" },
			{ type: "spawn", function: "vector", args: [553, 90, 80, 10, 1000, 4000] },
			{ type: "spawn", function: "vector", args: [553, 270, 80, 350, 1000, 4000] }],
		"s-3023-2000-182-0": [{ type: "text", message: "Knockdown" }],
		"s-3023-2000-185-0": [{ type: "text", message: "Big jump (Kaia's Shield)", position: "priest" },
			{ type: "text", message: "Big jump (Thrall of Protection)", position: "mystic" },
			{ type: "text", delay: 110000, message: "Big jump soon...", position: "healer" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 500, 6000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 750, 6000] }],
		"s-3023-2000-202-0": [{ type: "text", message: "Backstab" },
			{ type: "spawn", function: "vector", args: [553, 90, 80, 180, 500, 3000] },
			{ type: "spawn", function: "vector", args: [553, 270, 80, 180, 500, 3000] }],
		"s-3023-2000-207-0": [{ type: "text", message: "Phantom x5 (bleed)" }],
		"s-3023-2000-212-0": [{ type: "text", message: "Flash (bleed)" }]
	};
};


exports.type = { es: true, sp: false };
