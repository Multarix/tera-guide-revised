// Sea of Honor
//
// made by michengs
// updated by HSDN
// Updated to revised version

exports.guide = (mod, extras) => {
	const { player } = mod.require.library;
	const { spawn } = require("../lib.js");

	let green = false;
	let purple = false;
	let boss_thirty = false;
	let party_makers = [];

	function skilld_event(skillid){
		const create = new spawn(mod, extras);
		// (зеленый) "Ближе!"
		if(skillid == 121){
			green = true;
			// круг перед боссом
			mod.setTimeout(create.circle, 3000, ...[true, 553, 0, 170, 8, 290, 2000]); // 1
			// бублик вокруг босса
			mod.setTimeout(create.circle, 4000, ...[true, 553, 0, 0, 8, 280, 3000]); // 2
			mod.setTimeout(create.circle, 4000, ...[true, 553, 0, 0, 4, 570, 3000]); // 2
		}
		// (фиолетовый) "Проваливай!"
		if(skillid == 122){
			purple = true;
			// бублик вокруг босса
			mod.setTimeout(create.circle, 3000, ...[true, 553, 0, 0, 8, 280, 2000]); // 1
			mod.setTimeout(create.circle, 3000, ...[true, 553, 0, 0, 4, 570, 3000, 2000]); // 1
			// круг перед боссом
			mod.setTimeout(create.circle, 4000, ...[true, 553, 0, 170, 8, 290, 3000]); // 2
		}
		// "Упади в бездну"
		if(skillid == 120){
		// Проваливай! - Упади в бездну
		// к нему (бублик вокруг босса) -> от него (круг перед боссом) -> к нему (бублик перед боссом)
			if(purple && !boss_thirty){
				extras.sendMessage(mod, "In > Out > In");
				// бублик перед боссом
				mod.setTimeout(create.circle, 5000, ...[true, 912, 0, 150, 8, 280, 3000]); // 3
				mod.setTimeout(create.circle, 5000, ...[true, 912, 0, 150, 4, 570, 3000]); // 3
				mod.setTimeout(() => purple = false, 2000);

				// < 30%
				// Проваливай! - Упади в бездну
				// к нему (бублик вокруг босса) -> от него (круг перед боссом) -> [волны] -> к нему (бублик перед боссом)
			} else if(purple && boss_thirty){
				extras.sendMessage(mod, "In > Out");
				mod.setTimeout(extras.sendMessage, 5000, mod, "In");
				// бублик перед боссом
				mod.setTimeout(create.circle, 5000, ...[true, 912, 0, 150, 8, 280, 5000]); // 3
				mod.setTimeout(create.circle, 5000, ...[true, 912, 0, 150, 4, 570, 5000]); // 3
				mod.setTimeout(() => purple = false, 2000);
			}
		}
		// "Ощути силу взрыва"
		if(skillid == 123){
		// Ближе! - Ощути силу взрыва
		// от него (круг перед боссом) -> к нему (бублик вокруг босса) -> от него (большой круг перед боссом)
			if(green && !boss_thirty){
				extras.sendMessage(mod, "Out > In > Out");
				// большой круг перед боссом
				mod.setTimeout(create.circle, 5000, ...[true, 912, 0, 200, 8, 450, 3000]); // 3
				mod.setTimeout(() => green = false, 2000);

				// Проваливай - Ощути силу взрыва
				// к нему (бублик вокруг босса) -> от него (круг перед боссом) -> от него (большой круг перед боссом)
			} else if(purple && !boss_thirty){
				extras.sendMessage(mod, "In > Out > Out");
				// большой круг перед боссом
				mod.setTimeout(create.circle, 5000, ...[true, 912, 0, 200, 8, 450, 3000]); // 3
				mod.setTimeout(() => purple = false, 2000);

				// < 30%
				// Ближе! - Ощути силу взрыва
				// от него (круг перед боссом) -> к нему (бублик вокруг босса) -> [волны] -> от него (большой круг перед боссом)
			} else if(green && boss_thirty){
				extras.sendMessage(mod, "Out > In");
				setTimeout(extras.sendMessage, 5000, mod, "Out");
				// большой круг перед боссом
				mod.setTimeout(create.circle, 5000, ...[true, 912, 0, 200, 8, 450, 5000]); // 3
				mod.setTimeout(() => purple = false, 2000);

				// < 30%
				// Проваливай! - Ощути силу взрыва
				// к нему (бублик вокруг босса) -> от него (круг перед боссом) -> [волны] -> от него (большой круг перед боссом)
			} else if(purple && boss_thirty){
				extras.sendMessage(mod, "In > Out");
				mod.setTimeout(extras.sendMessage, 5000, mod, "Out");
				// большой круг перед боссом
				mod.setTimeout(create.circle, 5000, ...[true, 912, 0, 200, 8, 450, 5000]); // 3
				mod.setTimeout(() => purple = false, 2000);
			}
		}
		// Прыжок
		if(skillid == 127){
			if(boss_thirty){
				extras.sendMessage(mod, "Jump | Get Out");
			} else {
				extras.sendMessage(mod, "Jump | Get In");
				mod.setTimeout(create.circle, 250, ...[true, 553, 0, 0, 15, 200, 1000]);
				mod.setTimeout(create.circle, 1000, ...[true, 553, 0, 0, 10, 300, 4000]);
			}
		}
	}

	function boss_start_event(){
		boss_thirty = false;
	}

	function boss_thirty_event(){
		boss_thirty = true;
	}

	let debuff_tracker_started = false;
	const debuffs_targe = {
		30209101: "Lightning",
		30209102: "Witch"
	};

	let debuff_call_event = null;
	function start_dungeon_event(handlers, event, ent, mod){
		const abnormality_change = (added, event) => {
			if(debuffs_targe[event.id]){
				party_makers.push({
					color: 2, // 0. red, 1. yellow, 2. blue
					target: event.target
				});
				updateMarkers(mod);
				mod.setTimeout(() => {
					party_makers = [];
					updateMarkers(mod);
				}, 3500);
				if(player.isMe(event.target.toString()) || player.playersInParty.includes(event.target.toString())){
					if(added){
						if(debuff_call_event){
							mod.clearTimeout(debuff_call_event);
						}
						debuff_call_event = mod.setTimeout(() => {
							extras.sendMessage(mod, debuffs_targe[event.id]);
							debuff_call_event = null;
						}, 1500);
					}
				}
			}
		};
		if(!debuff_tracker_started){
			extras.hookData.hookArray.push(mod.hook("S_ABNORMALITY_BEGIN", 4, abnormality_change(true)));
			extras.hookData.hookArray.push(mod.hook("S_ABNORMALITY_END", 1, abnormality_change(false)));
			debuff_tracker_started = true;
		}
	}

	function updateMarkers(mod){
		if(!extras.spawning) return;
		mod.send("S_PARTY_MARKER", 1, {
			markers: party_makers
		});
	}

	const skills = {
		"dm-0-0-30209203": [{ type: "function", function: start_dungeon_event }],
		"dm-0-0-30209204": [{ type: "function", function: start_dungeon_event }],
		// 1 BOSS
		"s-3020-1900-104-0": [{ type: "text", message: "Suction (Dodge)" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 0, 15, 450, 6000], delay: 200 }],
		// 2 BOSS
		"s-3020-1200-103-0": [{ type: "text", message: "Suction (Dodge)" }],
		// 3 BOSS
		"s-3020-2200-108-0": [{ type: "text", message: "Front Stun" },
			{ type: "spawn", function: "circle", args: [true, 553, 0, 170, 20, 120, 2000], delay: 200 }],
		"h-3020-2200-99": [{ type: "function", function: boss_start_event }],
		"h-3020-2200-30": [{ type: "text", message: "30%" },
			{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-29": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-28": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-27": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-26": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-25": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-24": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-23": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-22": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-21": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-20": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-19": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-18": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-17": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-16": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-15": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-14": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-13": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-12": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-11": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-10": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-9": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-8": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-7": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-6": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-5": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-4": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-3": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-2": [{ type: "function", function: boss_thirty_event }],
		"h-3020-2200-1": [{ type: "function", function: boss_thirty_event }],
		"s-3020-2200-121-0": [{ type: "function", function: skilld_event, args: [121] }], // "Ближе!" (зеленый)
		"s-3020-2200-122-0": [{ type: "function", function: skilld_event, args: [122] }], // "Проваливай!" (фиолетовый)
		"s-3020-2200-120-0": [{ type: "function", function: skilld_event, args: [120] }], // "Упади в бездну"
		"s-3020-2200-123-0": [{ type: "function", function: skilld_event, args: [123] }], // "Ощути силу взрыва"
		// "s-3020-9101-122-0": [{ type: "text", message: "Jump", "message_TW": "强袭" }],
		// "s-3020-9101-124-0": [{ type: "text", message: "Jump", "message_TW": "前砸" }],
		// "s-3020-9101-125-0": [{ type: "text", message: "Jump", "message_TW": "转圈" }],
		// "s-3020-9101-126-0": [{ type: "text", message: "Jump", "message_TW": "大前砸" }],
		// "s-3020-2201-121-0": [{ type: "text", message: 'Left swipe', "message_TW": "2201-121" }, { type: "spawn", function: "marker", args: [false, 0, 0, 2000, true, null] }],
		// "s-3020-2201-125-0": [{ type: "text", message: 'Left swipe', "message_TW": "2201-125" }, { type: "spawn", function: "marker", args: [false, 0, 0, 2000, true, null] }],
		// "s-3020-2201-126-0": [{ type: "text", message: 'Left swipe', "message_TW": "2201-126" }, { type: "spawn", function: "marker", args: [false, 0, 0, 2000, true, null] }],
		// "s-3020-2201-201-0": [{ type: "spawn", function: "marker", args: [false, 0, 0, 2000, true, null] }],
		// "s-3020-6103-203-0": [{ type: "text", message: 'Left swipe', "message_TW": "6103-203" }, { type: "spawn", function: "marker", args: [false, 0, 0, 2000, true, null] }],
		// "s-3020-6103-202-0": [{ type: "text", message: 'Left swipe', "message_TW": "6103-202" }, { type: "spawn", function: "marker", args: [false, 0, 0, 2000, true, null] }],
		// "s-3020-6103-201-0": [{ type: "text", message: 'Left swipe', "message_TW": "6103-201" }, { type: "spawn", function: "marker", args: [false, 0, 0, 2000, true, null] }],
		"s-3020-2200-127-0": [{ type: "function", function: skilld_event, args: [127] }],
		"s-3020-2200-128-0": [{ type: "text", message: "Uppercut (Knockup)" }],
		"s-3020-2200-129-0": [{ type: "text", message: "Hammer Toss ~ Skull" },
			{ type: "spawn", function: "vector", args: [553, 90, 0, 0, 500, 2000], delay: 200 },
			{ type: "spawn", function: "vector", args: [553, 270, 0, 0, 500, 2000], delay: 200 }],
		// "s-3020-2200-131-0": [{ type: "text", message: "Jump" }],
		"s-3020-2200-133-1": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [true, 445, 0, 0, 10, 300, 5000], delay: 200 },
			{ type: "spawn", function: "circle", args: [true, 445, 0, 0, 6, 600, 5000], delay: 200 },
			{ type: "spawn", function: "circle", args: [true, 445, 0, 0, 4, 900, 5000], delay: 200 }],
		"s-3020-2200-135-0": [{ type: "text", message: "Puddles Inc (Jump)" }],
		"s-3020-2200-137-0": [{ type: "text", message: "Outward Pluse" }],
		"s-3020-2200-139-0": [{ type: "text", message: "Inward Succ" }],
		"s-3020-2200-202-0": [{ type: "text", message: "Defence 3 seconds" }],
		"s-3020-2200-203-0": [{ type: "text", message: "Defence 10 seconds" }],
		"s-3020-2200-204-0": [{ type: "text", message: "30% (transformation)" }]
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
