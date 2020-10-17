// Gossamer Vault (Hard)
//
// made by michengs

exports.guide = (mod, extras) => {
	let notice = true;
	let boss = null;

	function secondboss_start_event(){
		notice = true;
		boss = null;
	}

	function secondboss_debuff_event(skillid){
		if(skillid === 32010224){ // false debuff (next true)
			boss = 1;

			mod.setTimeout(() => {
				if(boss === 1){
					extras.sendMessage(mod, "Debuff reload");
					boss = null;
				}
			}, 80000);
		}

		if(skillid === 32010220){ // true debuff (next false)
			boss = 0;

			mod.setTimeout(() => {
				if(boss === 0){
					extras.sendMessage(mod, "Debuff reload");
					boss = null;
				}
			}, 80000);
		}

		if([203, 204].includes(skillid)){
			notice = false;
			mod.setTimeout(() => notice = true, 4000);

			mod.setTimeout(() => {
				extras.sendMessage(mod, "Debuff coming soon...");
			}, 55000);
		}

		if(notice && skillid === 234){
			mod.setTimeout(() => {
				extras.sendMessage(mod, "Debuff coming soon...");
			}, 55000);
		}
	}

	return {
		// 1 BOSS
		"nd-3201-1000": [{ type: "stop_timers" },
			{ type: "despawn_all" }],
		// "s-3201-1000-103-0": [{ type: "text", position:"tank", message: "Dodge" }],
		"s-3201-1000-104-0": [{ type: "text", position: "tank", message: "Stun attack" }],
		"s-3201-1000-107-0": [{ type: "text", message: "back" },
			{ type: "text", delay: 2250, message: "pull" },
			{ type: "spawn", function: "vector", args: [553, 90, 139, 173, 800, 3000] },
			{ type: "spawn", function: "vector", args: [553, 270, 139, -173, 800, 3000] }],
		"s-3201-1000-111-0": [{ type: "text", message: "Back Wave" },
			{ type: "spawn", function: "vector", args: [553, 0, 100, 112, 800, 3000] },
			{ type: "spawn", function: "vector", args: [553, 0, 100, -112, 800, 3000] }],
		// "s-3201-1000-112-0": [{ type: "text", message: "Left + Right" }],
		"s-3201-1000-113-0": [{ type: "text", message: "Jump (Slow)" },
			{ type: "text", delay: 1500, message: "Pull" }],
		"s-3201-1000-118-0": [{ type: "text", message: "Jump P (Slow)" },
			{ type: "text", delay: 1500, message: "Pull" }],
		"s-3201-1000-119-0": [{ type: "text", delay: 1000, message: "Back + Front" },
			{ type: "spawn", function: "vector", args: [553, 2, 0, 70, 800, 2500] },
			{ type: "spawn", function: "vector", args: [553, 2, 0, 110, 800, 2500] },
			{ type: "spawn", function: "vector", args: [553, 2, 0, 250, 800, 2500] },
			{ type: "spawn", function: "vector", args: [553, 2, 0, 290, 800, 2500] }],
		// "s-3201-1000-121-0": [{ type: "text", position:"tank", message: "Right" }],
		// "s-3201-1000-122-0": [{ type: "text", position:"tank", message: "Left" }],
		"s-3201-1000-124-0": [{ type: "text", position: "tank", message: "Stun attack" }],
		"s-3201-1000-127-0": [{ type: "text", position: "dps", message: "Back" },
			{ type: "text", position: "heal", message: "Back" },
			{ type: "spawn", function: "vector", args: [553, 90, 139, 173, 800, 3000] },
			{ type: "spawn", function: "vector", args: [553, 270, 139, -173, 800, 3000] }],
		// "s-3201-1000-128-0": [{ type: "text", position:"tank", message: "Triple Attack" }],
		"s-3201-1000-131-0": [{ type: "text", position: "dps", message: "Back Wave" },
			{ type: "text", position: "heal", message: "Back Wave" },
			{ type: "spawn", function: "vector", args: [553, 0, 100, 112, 800, 3000] },
			{ type: "spawn", function: "vector", args: [553, 0, 100, -112, 800, 3000] }],
		// "s-3201-1000-132-0": [{ type: "text", message: "Left + Right" }],
		"s-3201-1000-133-0": [{ type: "text", delay: 500, message: "Jump (Fast)" }],
		"s-3201-1000-138-0": [{ type: "text", delay: 500, message: "Jump P (Fast)" }],
		"s-3201-1000-139-0": [{ type: "text", message: "Back + Front (Fast)" },
			{ type: "spawn", function: "vector", args: [553, 2, 0, 70, 800, 2500] },
			{ type: "spawn", function: "vector", args: [553, 2, 0, 110, 800, 2500] },
			{ type: "spawn", function: "vector", args: [553, 2, 0, 250, 800, 2500] },
			{ type: "spawn", function: "vector", args: [553, 2, 0, 290, 800, 2500] }],
		"s-3201-1000-143-0": [{ type: "text", position: "tank", message: "Left > Right" },
			{ type: "text", position: "dps", message: "Right > Left" },
			{ type: "text", position: "heal", message: "Right > Left" },
			{ type: "spawn", function: "marker", args: [false, 150, 300, 2715, true, null], delay: 100 }, // 1
			{ type: "spawn", function: "marker", args: [false, 225, 300, 4175, true, null], delay: 2800 }, // 6
			{ type: "spawn", function: "marker", args: [false, 30, 300, 1000, true, null], delay: 100 }, // 1
			{ type: "spawn", function: "marker", args: [false, 330, 300, 5000, true, null], delay: 1100 }], // 7
		"s-3201-1000-145-0": [{ type: "text", position: "tank", message: "Left > Right" },
			{ type: "text", position: "dps", message: "Right > Left" },
			{ type: "text", position: "heal", message: "Right > Left" },
			{ type: "spawn", function: "marker", args: [false, 30, 300, 1000, true, null], delay: 100 }, // 1
			{ type: "spawn", function: "marker", args: [false, 330, 300, 5000, true, null], delay: 1100 }, // 7
			{ type: "spawn", function: "marker", args: [false, 150, 300, 2000, true, null], delay: 100 }, // 1
			{ type: "spawn", function: "marker", args: [false, 225, 300, 5000, true, null], delay: 2500 }], // 6
		"s-3201-1000-148-0": [{ type: "text", message: "Right Hand (Flying)" },
			{ type: "spawn", function: "circle", args: [false, 553, 20, 150, 10, 320, 4000] }],
		"s-3201-1000-149-0": [{ type: "text", message: "Left Hand (Flying)" },
			{ type: "spawn", function: "circle", args: [false, 553, 340, 150, 10, 320, 4000] }],
		"s-3201-1000-151-0": [{ type: "text", message: "Stun Attack" }],
		"s-3201-1000-305-0": [{ type: "text", message: "Pizza" }],
		"s-3201-1000-311-0": [{ type: "text" },
			{ type: "text", delay: 4000, message: "pull" }],
		"s-3201-1000-312-0": [{ type: "text" },
			{ type: "text", delay: 2000, message: "pull" }],
		"s-3201-1000-313-0": [{ type: "text", message: "Circles (Slow)" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 75, 10, 300, 6000] }],
		"s-3201-1000-314-0": [{ type: "text", message: "Circles (Fast)" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 75, 10, 300, 6000] }],

		// 2 BOSS
		"nd-3201-2000": [{ type: "stop_timers" },
			{ type: "despawn_all" }],
		"h-3201-2000-99": [{ type: "function", function: secondboss_start_event }],
		"h-3201-2000-81": [{ type: "text", message: "80%" }],
		"h-3201-2000-76": [{ type: "text", message: "75%" }],
		"s-3201-2000-108-0": [{ type: "text", message: "Back Attack!" }],
		"s-3201-2000-150-0": [{ type: "text", message: "Phantom" }],
		"s-3201-2000-203-0": [{ type: "function", function: secondboss_debuff_event, args: [203] }],
		"s-3201-2000-204-0": [{ type: "function", function: secondboss_debuff_event, args: [204] }],
		"am-3201-320126-32010224": [{ type: "text", message: "Next True" },
			{ type: "function", function: secondboss_debuff_event, args: [32010224] }],
		"am-3201-2000-32010220": [{ type: "text", message: "Next False" },
			{ type: "function", function: secondboss_debuff_event, args: [32010220] }],
		"s-3201-2000-228-0": [{ type: "text", message: "Team Up" },
			{ type: "text", delay: 3500, message: "Dodge" }],
		"s-3201-2000-230-0": [{ type: "text", message: "AOE" }],

		"s-3201-2000-231-0": [{ type: "text", message: "Out Safe" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 3000] }],
		"s-3201-2000-232-0": [{ type: "text", message: "In Safe" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 3000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 1000, 3000] }],
		"s-3201-2000-234-0": [{ type: "function", function: secondboss_debuff_event, args: [234] }],
		"s-3201-2000-236-0": [{ type: "text", message: "Counter" }]
	};
};

exports.type = { es: false, sp: false };
