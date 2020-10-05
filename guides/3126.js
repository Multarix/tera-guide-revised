// Corrupted Skynest (Hard)
//
// made by michengs / HSDN / ZC
// Should be functional, needs testing

exports.guide = (mod, extras) => {
	const { player } = mod.require.library;
	const { MARKER_ITEM, spawn } = require("../lib.js");

	let debuff = null;
	let timer1;
	let timer2;
	let timer3;
	let timer4;
	let timer5;
	let boss_ent = extras.entity;
	let boss_offset = 0;
	let qbacting = null;
	let blue = false;
	let red = false;
	let debuff_tracker_started = false;

	const mech_messages = {
		0: { message: "IN" },
		1: { message: "OUT" },
		2: { message: "Left" },
		3: { message: "Right" }
	};
	const qbacting_messages = {
		0: { message: "different" },
		1: { message: "same" }
	};
	const debuff_messages = {
		0: { message: "Ready to get Fire debuff" },
		1: { message: "Ready to get Ice debuff" }
	};

	// NULL % 2 = 0
	//    1 % 2 = 1
	//    0 % 2 = 0
	//    2 % 2 = 0

	function spawn_marker(out){
		if(!boss_ent) return;
		const create = new spawn(mod, extras);
		let distance = 220;
		let caption = "IN";
		if(out){
			distance = 620;
			caption = "OUT";
		}
		create.marker(false, 45 + boss_offset, distance, 4000, true, [caption, "SAFE"]);
		create.marker(false, 135 + boss_offset, distance, 4000, true, [caption, "SAFE"]);
		create.marker(false, 225 + boss_offset, distance, 4000, true, [caption, "SAFE"]);
		create.marker(false, 315 + boss_offset, distance, 4000, true, [caption, "SAFE"]);
	}

	function debuff_added(id, handlers, mod){
		debuff_removed(mod);
		debuff = id; // debuff event id
		timer1 = mod.setTimeout(() => {
			if(debuff != null){
				extras.sendMessage(mod, "Debuff 20 seconds");
			}
		}, 50000);
		timer2 = mod.setTimeout(() => {
			if(debuff != null){
				mod.setTimeout(() => {
					extras.sendMessage(mod, `${debuff_messages[debuff % 2].message}`);
				}, 2000);
				extras.sendMessage(mod, "Debuff 50 seconds");
			}
		}, 70000);
		timer3 = mod.setTimeout(() => {
			if(debuff != null){
				extras.sendMessage(mod, "Warning! Debuff 15 seconds");
			}
		}, 55000);
		timer4 = mod.setTimeout(() => {
			if(debuff != null){
				extras.sendMessage(mod, "Warning! Debuff 10 seconds");
			}
		}, 60000);
		timer5 = mod.setTimeout(() => {
			if(debuff != null){
				extras.sendMessage(mod, "Warning! Debuff 5 seconds");
			}
		}, 65000);
		//
		if(blue){
			extras.sendMessage(mod, `${mech_messages[(qbacting + debuff + 1) % 2].message}`);
			spawn_marker((qbacting + debuff + 1) % 2, handlers, mod);
		} else if(red){
			extras.sendMessage(mod, `${mech_messages[(qbacting + debuff) % 2].message}`);
			spawn_marker((qbacting + debuff) % 2);
		}
	}

	function debuff_removed(mod){
		debuff = null;
		mod.clearTimeout(timer1);
		mod.clearTimeout(timer2);
		mod.clearTimeout(timer3);
		mod.clearTimeout(timer4);
		mod.clearTimeout(timer5);
	}

	function skilld_event(skillid){
		const create = new spawn(mod, extras);
		const abnormality_change = (added, event) => {
		// Fire/Ice debuff
			if(player.isMe(event.target.toString()) && [30260001, 30260002, 31260001, 31260002].includes(event.id)){
				if(added){
					debuff_added(event.id);
				} else {
					debuff_removed();
				}
			}
			// Argon Priest Essence buff
			if(player.isMe(event.target.toString()) && [30261701, 31261701].includes(event.id)){
				if(added && boss_ent){
					const bossLoc = boss_ent.loc.clone();
					bossLoc.w = boss_ent.loc.w;
					extras.spawnHandler({ // spawn teleport marker
						spawnType: "S_SPAWN_DROPITEM",
						spawnVersion: 8,
						despawnType: "S_DESPAWN_DROPITEM",
						despawnVersion: 4,
						id: MARKER_ITEM,
						duration: 50000,
						pos: {
							x: 53192,
							y: 100761,
							z: 14233
						},
						ent: {
							loc: bossLoc
						}
					});
				}
			}
		};
		// In-Out quest balloons (qbacting => ярость 0, ужас 1)
		if([3026004, 3126004, 3026005, 3126005].includes(skillid)){
			qbacting = skillid % 2;
		}
		// Fire/Ice debuff (debuff % 2 => синий 0, красный 1)
		if([30260001, 31260001, 30260002, 31260002].includes(skillid) && !debuff_tracker_started){
			debuff_added(skillid);
		}
		// In-Out identification
		if([212, 213, 214, 215].includes(skillid)){
			boss_ent = extras.entity;
			create.circle(false, 445, 0, 0, 8, 440, 11000);
			create.circle(false, 445, 0, 0, 4, 840, 11000);
		}
		if([212, 214].includes(skillid)){ // Fire claw (141,  142)
			boss_offset = 10;
			create.vector(553, 0, 0, 190, 840, 11000);
			create.vector(553, 0, 0, 10, 840, 11000);
		}
		if([213, 215].includes(skillid)){ // Ice claw (143,  144)
			boss_offset = -10;
			create.vector(553, 0, 0, 170, 840, 11000);
			create.vector(553, 0, 0, 350, 840, 11000);
		}
		if([213, 214].includes(skillid)){ // Ice inside
			mod.setTimeout(() => {
				if(debuff != null){
					extras.sendMessage(mod, `Ice inside (${qbacting_messages[qbacting].message}) | ${mech_messages[debuff % 2 + 2].message} | ${mech_messages[(qbacting + debuff + 1) % 2].message}`);
					spawn_marker((qbacting + debuff + 1) % 2);
				} else {
					extras.sendMessage(mod, `Ice inside (${qbacting_messages[qbacting].message})`);
				}
			}, 500);
			blue = true;
			red = false;
			mod.setTimeout(() => {
				blue = false;
				red = true;
			}, 6600);
			mod.setTimeout(() => red = false, 9400);
		}
		if([212, 215].includes(skillid)){ // Fire inside
			mod.setTimeout(() => {
				if(debuff != null){
					extras.sendMessage(mod, `Fire inside (${qbacting_messages[qbacting].message}) | ${mech_messages[debuff % 2 + 2].message} | ${mech_messages[(qbacting + debuff) % 2].message}`);
					spawn_marker((qbacting + debuff) % 2);
				} else {
					extras.sendMessage(mod, `Fire inside (${qbacting_messages[qbacting].message})`);
				}
			}, 500);
			blue = false;
			red = true;
			mod.setTimeout(() => {
				blue = true;
				red = false;
			}, 6600);
			mod.setTimeout(() => blue = false, 9400);
		}
		if(skillid === 99020020){ // Death release debuff
			mod.clearTimeout(timer1);
			mod.clearTimeout(timer2);
		}
		if(!debuff_tracker_started){
			extras.hookData.hookArray.push(mod.hook("S_ABNORMALITY_BEGIN", 4, abnormality_change(true)));
			extras.hookData.hookArray.push(mod.hook("S_ABNORMALITY_END", 1, abnormality_change(false)));
			debuff_tracker_started = true;
		}
	}

	const skills = {
		"112-0": [{ type: "text", message: "Ice DOT" }],
		"110-0": [{ type: "text", message: "Fire DOT" }],
		"108-0": [{ type: "text", message: "Turn Right (Repel)" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 8, 440, 2000] }],
		"158-0": [{ type: "text", message: "Turn Right (Repel)" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 8, 440, 2000] }],
		"109-0": [{ type: "text", message: "Turn Left (Repel)" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 8, 440, 2000] }],
		"159-0": [{ type: "text", message: "Turn Left (Repel)" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 8, 440, 2000] }],
		"120-0": [{ type: "text", message: "Together" }],
		"145-0": [{ type: "text", message: "Stun" }],
		"157-0": [{ type: "text", message: "Change" }],
		"103-0": [{ type: "text", message: "Tail (Flying)" },
			{ type: "text", message: "Arise!", delay: 1500, position: "priest" },
			{ type: "spawn", function: "semi", args: [140, 260, 912, 0, 0, 10, 500, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 135, 135, 500, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 260, 260, 500, 2000] }],
		"153-0": [{ type: "text", message: "Tail (Flying)" },
			{ type: "text", message: "Arise!", delay: 1500, position: "priest" },
			{ type: "spawn", function: "semi", args: [140, 260, 912, 0, 0, 10, 500, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 135, 135, 500, 2000] },
			{ type: "spawn", function: "vector", args: [912, 0, 260, 260, 500, 2000] }],
		"114-0": [{ type: "text", message: "Front Fire" }],
		"118-0": [{ type: "text", message: "Jump" }],
		"118-1": [{ type: "text", message: "Dodge" }],

		// AOE лед (большой)
		"104-0": [{ type: "text", message: "Ice Storm DOTs" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 500, 5000] }],
		// AOE огонь (большой)
		"105-0": [{ type: "text", message: "Fire Bombs" },
			{ type: "spawn", function: "circle", args: [false, 553, 135, 500, 10, 270, 3000] },
			{ type: "spawn", function: "circle", args: [false, 553, 315, 500, 10, 270, 3250] },
			{ type: "spawn", function: "circle", args: [false, 553, 45, 500, 10, 270, 3500] },
			{ type: "spawn", function: "circle", args: [false, 553, 235, 500, 10, 270, 3750] },
			{ type: "spawn", function: "circle", args: [false, 553, 90, 500, 10, 270, 4000] },
			{ type: "spawn", function: "circle", args: [false, 553, 270, 500, 10, 270, 4250] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 500, 10, 270, 4500] },
			{ type: "spawn", function: "circle", args: [false, 553, 180, 500, 10, 270, 4750] }],
		// AOE лед (малый)
		"154-0": [{ type: "text", message: "Ice Storm" }, { type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 500, 6000] }],
		// AOE огонь (малый)
		"155-0": [{ type: "text", message: "Fire (Knockdown)" },
			{ type: "text", delay: 1200, message: "Dodge" }],

		"206-0": [{ type: "text", message: "Jump Back" }],
		"206-2": [{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 15, 350, 3000] }],
		"137-0": [{ type: "text", message: "Knockdown" }],
		"138-0": [{ type: "text", message: "AOE" }],
		"139-0": [{ type: "text", message: "60 degrees (Fire to all)" },
			{ type: "text", delay: 4000, message: "Lower the temp" }],
		"140-0": [{ type: "text", message: "40 degrees (Ice to all)" },
			{ type: "text", delay: 4000, message: "Raise the temp" }],

		"s-3126-1000-1212-0": [{ type: "function", function: skilld_event, args: [212] }],
		"s-3126-1000-1215-0": [{ type: "function", function: skilld_event, args: [215] }],
		"s-3126-1000-1213-0": [{ type: "function", function: skilld_event, args: [213] }],
		"s-3126-1000-1214-0": [{ type: "function", function: skilld_event, args: [214] }],
		"qb-3126-1000-3026005": [{ type: "function", function: skilld_event, args: [3026005] }], // ужас, одинаковые цвета
		"qb-3126-1000-3026004": [{ type: "function", function: skilld_event, args: [3026004] }], // ярость, разные цвета
		"qb-3126-1000-3126005": [{ type: "function", function: skilld_event, args: [3126005] }], // ужас, одинаковые цвета
		"qb-3126-1000-3126004": [{ type: "function", function: skilld_event, args: [3126004] }], // ярость, разные цвета
		"ae-0-0-99020020": [{ type: "function", function: skilld_event, args: [99020020] }],
		"am-3126-1000-30260001": [{ type: "function", function: skilld_event, args: [30260001] }], // красный
		"am-3126-1000-30260002": [{ type: "function", function: skilld_event, args: [30260002] }], // синий
		"am-3126-1000-31260001": [{ type: "function", function: skilld_event, args: [31260001] }], // красный
		"am-3126-1000-31260002": [{ type: "function", function: skilld_event, args: [31260002] }], // синий

		"s-3126-1000-1107-0": [{ type: "text", message: "[Debuff] Farthest" }],
		"s-3126-1000-2107-0": [{ type: "text", message: "[Debuff] Closest" }],
		"am-3126-1000-31260251": [{ type: "text", message: "[Debuff] Layer 1" }],
		"am-3126-1000-31260067": [{ type: "text", message: "[Debuff] Layer 2" }],
		"am-3126-1000-31260068": [{ type: "text", message: "[Debuff] Layer 3" },
			{ type: "text", delay: 145000, message: '[Debuff] 2.5 minutes passed' }]
	};

	const skillGroup = {};
	for(const [key, value] of Object.entries(skills)){
		if(key.length === 5){
			skillGroup[`s-3126-1000-1${key}`] = value;
			skillGroup[`s-3126-1000-2${key}`] = value;
		} else {
			skillGroup[key] = value;
		}
	}
	return skillGroup;
};

exports.type = {
	es: false,
	sp: true
};
