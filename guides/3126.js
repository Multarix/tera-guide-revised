// Corrupted Skynest (Hard)
//
// made by michengs / HSDN / ZC

const { MARKER_ITEM, SpawnMarker, SpawnVector, SpawnCircle, SpawnSemicircle } = require("../lib");

let player, entity, library, effect;

let debuff = null;
let timer1;
let timer2;
let timer3;
let timer4;
let timer5;
let boss_ent;
let boss_offset = 0;
let qbacting = null;
let blue = false;
let red = false;
let debuff_tracker_started = false;

const mech_messages = {
	0: { msgt: "IN", msg: "К НЕМУ" },
	1: { msgt: "OUT", msg: "ОТ НЕГО" },
	2: { msgt: "Left", msg: "Лево" },
	3: { msgt: "Right", msg: "Право" }
};
const qbacting_messages = {
	0: { msgt: "different", msg: "разные" },
	1: { msgt: "same", msg: "одинаковые" }
};
const debuff_messages = {
	0: { msgt: "Ready to get Fire debuff", msg: "Готовность к переключению на Огонь" },
	1: { msgt: "Ready to get Ice debuff", msg: "Готовность к переключению на Лед" }
};

// NULL % 2 = 0
//    1 % 2 = 1
//    0 % 2 = 0
//    2 % 2 = 0

function spawn_marker(out, handlers, dispatch){
	if(!boss_ent) return;
	let distance = 220;
	let caption = "IN";
	if(out){
		distance = 620;
		caption = "OUT";
	}
	SpawnMarker(false, 45 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"], handlers, null, boss_ent, dispatch);
	SpawnMarker(false, 135 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"], handlers, null, boss_ent, dispatch);
	SpawnMarker(false, 225 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"], handlers, null, boss_ent, dispatch);
	SpawnMarker(false, 315 + boss_offset, distance, 0, 4000, true, [caption, "SAFE"], handlers, null, boss_ent, dispatch);
}

function debuff_added(id, handlers, dispatch){
	debuff_removed(dispatch);
	debuff = id; // debuff event id
	timer1 = dispatch.setTimeout(() => {
		if(debuff != null){
			handlers["text"]({
				"sub_type": "message",
				"message": "Debuff 20 seconds",
				"message_RU": "Дебафф 20 сек."
			});
		}
	}, 50000);
	timer2 = dispatch.setTimeout(() => {
		if(debuff != null){
			dispatch.setTimeout(() => {
				handlers["text"]({
					"sub_type": "alert",
					"message": (`${debuff_messages[debuff % 2].msgt}`),
					"message_RU": (`${debuff_messages[debuff % 2].msg}`)
				});
			}, 2000);
			handlers["text"]({
				"sub_type": "message",
				"message": "Debuff 50 seconds",
				"message_RU": "Дебафф 50 сек."
			});
		}
	}, 70000);
	timer3 = dispatch.setTimeout(() => {
		if(debuff != null){
			handlers["text"]({
				"sub_type": "message",
				"message": "Warning! Debuff 15 seconds",
				"message_RU": "Дебафф 15 сек."
			});
		}
	}, 55000);
	timer4 = dispatch.setTimeout(() => {
		if(debuff != null){
			handlers["text"]({
				"sub_type": "message",
				"message": "Warning! Debuff 10 seconds",
				"message_RU": "Дебафф 10 сек."
			});
		}
	}, 60000);
	timer5 = dispatch.setTimeout(() => {
		if(debuff != null){
			handlers["text"]({
				"sub_type": "message",
				"message": "Warning! Debuff 5 seconds",
				"message_RU": "Дебафф 5 сек."
			});
		}
	}, 65000);
	//
	if(blue){
		handlers["text"]({
			"sub_type": "message",
			"message": (`${mech_messages[(qbacting + debuff + 1) % 2].msgt}`),
			"message_RU": (`${mech_messages[(qbacting + debuff + 1) % 2].msg}`)
		});
		spawn_marker((qbacting + debuff + 1) % 2, handlers, dispatch);
	} else if(red){
		handlers["text"]({
			"sub_type": "message",
			"message": (`${mech_messages[(qbacting + debuff) % 2].msgt}`),
			"message_RU": (`${mech_messages[(qbacting + debuff) % 2].msg}`)
		});
		spawn_marker((qbacting + debuff) % 2, handlers, dispatch);
	}
}

function debuff_removed(dispatch){
	debuff = null;
	dispatch.clearTimeout(timer1);
	dispatch.clearTimeout(timer2);
	dispatch.clearTimeout(timer3);
	dispatch.clearTimeout(timer4);
	dispatch.clearTimeout(timer5);
}

function skilld_event(skillid, handlers, event, ent, dispatch){
	const abnormality_change = (added, event) => {
		// Fire/Ice debuff
		if(player.isMe(event.target.toString()) && [30260001, 30260002, 31260001, 31260002].includes(event.id)){
			if(added){
				debuff_added(event.id, handlers, dispatch);
			} else {
				debuff_removed(dispatch);
			}
		}
		// Argon Priest Essence buff
		if(player.isMe(event.target.toString()) && [30261701, 31261701].includes(event.id)){
			if(added && boss_ent){
				const shield_loc = boss_ent["loc"].clone();
				shield_loc.w = boss_ent["loc"].w;
				handlers["spawn"]({ // spawn teleport mark
					"sub_type": "item",
					"id": MARKER_ITEM,
					"sub_delay": 50000,
					"pos": {
						x: 53192,
						y: 100761,
						z: 14233
					}
				}, {
					loc: shield_loc
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
		debuff_added(skillid, handlers, dispatch);
	}
	// In-Out identification
	if([212, 213, 214, 215].includes(skillid)){
		boss_ent = ent;
		SpawnCircle(false, 445, 0, 0, 8, 440, 200, 11000, handlers, event, ent, dispatch);
		SpawnCircle(false, 445, 0, 0, 4, 840, 200, 11000, handlers, event, ent, dispatch);
	}
	if([212, 214].includes(skillid)){ // Fire claw (141,  142)
		boss_offset = 10;
		SpawnVector(553, 0, 0, 190, 840, 200, 11000, handlers, event, ent, dispatch);
		SpawnVector(553, 0, 0, 10, 840, 200, 11000, handlers, event, ent, dispatch);
	}
	if([213, 215].includes(skillid)){ // Ice claw (143,  144)
		boss_offset = -10;
		SpawnVector(553, 0, 0, 170, 840, 200, 11000, handlers, event, ent, dispatch);
		SpawnVector(553, 0, 0, 350, 840, 200, 11000, handlers, event, ent, dispatch);
	}
	if([213, 214].includes(skillid)){ // Ice inside
		dispatch.setTimeout(() => {
			if(debuff != null){
				handlers["text"]({
					"sub_type": "message",
					"message": (`Ice inside (${qbacting_messages[qbacting].msgt}) | ${mech_messages[debuff % 2 + 2].msgt} | ${mech_messages[(qbacting + debuff + 1) % 2].msgt}`),
					"message_RU": (`Внутри лед (${qbacting_messages[qbacting].msg}) | ${mech_messages[debuff % 2 + 2].msg} | ${mech_messages[(qbacting + debuff + 1) % 2].msg}`)
				});
				spawn_marker((qbacting + debuff + 1) % 2, handlers, dispatch);
			} else {
				handlers["text"]({
					"sub_type": "message",
					"message": (`Ice inside (${qbacting_messages[qbacting].msgt})`),
					"message_RU": (`Внутри лед (${qbacting_messages[qbacting].msg})`)
				});
			}
		}, 500);
		blue = true;
		red = false;
		dispatch.setTimeout(() => {
			blue = false;
			red = true;
		}, 6600);
		dispatch.setTimeout(() => red = false, 9400);
	}
	if([212, 215].includes(skillid)){ // Fire inside
		dispatch.setTimeout(() => {
			if(debuff != null){
				handlers["text"]({
					"sub_type": "message",
					"message": (`Fire inside (${qbacting_messages[qbacting].msgt}) | ${mech_messages[debuff % 2 + 2].msgt} | ${mech_messages[(qbacting + debuff) % 2].msgt}`),
					"message_RU": (`Внутри огонь (${qbacting_messages[qbacting].msg}) | ${mech_messages[debuff % 2 + 2].msg} | ${mech_messages[(qbacting + debuff) % 2].msg}`)
				});
				spawn_marker((qbacting + debuff) % 2, handlers, dispatch);
			} else {
				handlers["text"]({
					"sub_type": "message",
					"message": (`Fire inside (${qbacting_messages[qbacting].msgt})`),
					"message_RU": (`Внутри огонь (${qbacting_messages[qbacting].msg})`)
				});
			}
		}, 500);
		blue = false;
		red = true;
		dispatch.setTimeout(() => {
			blue = true;
			red = false;
		}, 6600);
		dispatch.setTimeout(() => blue = false, 9400);
	}
	if(skillid === 99020020){ // Death release debuff
		dispatch.clearTimeout(timer1);
		dispatch.clearTimeout(timer2);
	}
	if(!debuff_tracker_started){
		dispatch.hook("S_ABNORMALITY_BEGIN", 4, abnormality_change.bind(null, true));
		dispatch.hook("S_ABNORMALITY_END", 1, abnormality_change.bind(null, false));
		debuff_tracker_started = true;
	}
}

const skills = {
	"112-0": [{ "type": "text", "message": "Ice DOT" }],
	"110-0": [{ "type": "text", "message": "Fire DOT" }],
	"108-0": [{ "type": "text", "message": "Turn Right (Repel)" },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 8, 440, 0, 2000) }],
	"158-0": [{ "type": "text", "message": "Turn Right (Repel)" },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 8, 440, 0, 2000) }],
	"109-0": [{ "type": "text", "message": "Turn Left (Repel)" },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 8, 440, 0, 2000) }],
	"159-0": [{ "type": "text", "message": "Turn Left (Repel)" },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 8, 440, 0, 2000) }],
	"120-0": [{ "type": "text", "message": "Together" }],
	"145-0": [{ "type": "text", "message": "Stun" }],
	"157-0": [{ "type": "text", "message": "Change" }],
	"103-0": [{ "type": "text", "message": "Tail (Flying)" },
		{ "type": "text", "message": "Arise!", "delay": 1500, "class_position": "priest" },
		{ "type": "function", "function": SpawnSemicircle.bind(null, 140, 260, 912, 0, 0, 10, 500, 0, 2000) },
		{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 135, 500, 0, 2000) },
		{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 260, 500, 0, 2000) }],
	"153-0": [{ "type": "text", "message": "Tail (Flying)" },
		{ "type": "text", "message": "Arise!", "delay": 1500, "class_position": "priest" },
		{ "type": "function", "function": SpawnSemicircle.bind(null, 140, 260, 912, 0, 0, 10, 500, 0, 2000) },
		{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 135, 500, 0, 2000) },
		{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 260, 500, 0, 2000) }],
	"114-0": [{ "type": "text", "message": "Front Fire" }],
	"118-0": [{ "type": "text", "message": "Jump" }],
	"118-1": [{ "type": "text", "message": "Dodge" }],

	// AOE лед (большой)
	"104-0": [{ "type": "text", "message": "Ice Storm DOTs" },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 500, 0, 5000) }],
	// AOE огонь (большой)
	"105-0": [{ "type": "text", "message": "Fire Bombs" },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 135, 500, 10, 270, 0, 3000) },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 315, 500, 10, 270, 0, 3250) },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 45, 500, 10, 270, 0, 3500) },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 235, 500, 10, 270, 0, 3750) },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 90, 500, 10, 270, 0, 4000) },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 270, 500, 10, 270, 0, 4250) },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 500, 10, 270, 0, 4500) },
		{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 180, 500, 10, 270, 0, 4750) }],
	// AOE лед (малый)
	"154-0": [{ "type": "text", "message": "Ice Storm" }, { "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 500, 0, 6000) }],
	// AOE огонь (малый)
	"155-0": [{ "type": "text", "message": "Fire (Knockdown)" },
		{ "type": "text", "delay": 1200, "message": "Dodge" }],

	"206-0": [{ "type": "text", "message": "Jump Back" }],
	"206-2": [{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 15, 350, 0, 3000) }],
	"137-0": [{ "type": "text", "message": "Knockdown" }],
	"138-0": [{ "type": "text", "message": "AOE" }],
	"139-0": [{ "type": "text", "message": "60 degrees (Fire to all)" },
		{ "type": "text", "delay": 4000, "message": "Lower the temp" }],
	"140-0": [{ "type": "text", "message": "40 degrees (Ice to all)" },
		{ "type": "text", "delay": 4000, "message": "Raise the temp" }],

	"s-3126-1000-1212-0": [{ "type": "function", "function": skilld_event.bind(null, 212) }],
	"s-3126-1000-1215-0": [{ "type": "function", "function": skilld_event.bind(null, 215) }],
	"s-3126-1000-1213-0": [{ "type": "function", "function": skilld_event.bind(null, 213) }],
	"s-3126-1000-1214-0": [{ "type": "function", "function": skilld_event.bind(null, 214) }],
	"qb-3126-1000-3026005": [{ "type": "function", "function": skilld_event.bind(null, 3026005) }], // ужас, одинаковые цвета
	"qb-3126-1000-3026004": [{ "type": "function", "function": skilld_event.bind(null, 3026004) }], // ярость, разные цвета
	"qb-3126-1000-3126005": [{ "type": "function", "function": skilld_event.bind(null, 3126005) }], // ужас, одинаковые цвета
	"qb-3126-1000-3126004": [{ "type": "function", "function": skilld_event.bind(null, 3126004) }], // ярость, разные цвета
	"ae-0-0-99020020": [{ "type": "function", "function": skilld_event.bind(null, 99020020) }],
	"am-3126-1000-30260001": [{ "type": "function", "function": skilld_event.bind(null, 30260001) }], // красный
	"am-3126-1000-30260002": [{ "type": "function", "function": skilld_event.bind(null, 30260002) }], // синий
	"am-3126-1000-31260001": [{ "type": "function", "function": skilld_event.bind(null, 31260001) }], // красный
	"am-3126-1000-31260002": [{ "type": "function", "function": skilld_event.bind(null, 31260002) }], // синий

	"s-3126-1000-1107-0": [{ "type": "text", "message": "[Debuff] Farthest" }],
	"s-3126-1000-2107-0": [{ "type": "text", "message": "[Debuff] Closest" }],
	"am-3126-1000-31260251": [{ "type": "text", "message": "[Debuff] Layer 1" }],
	"am-3126-1000-31260067": [{ "type": "text", "message": "[Debuff] Layer 2" }],
	"am-3126-1000-31260068": [{ "type": "text", "message": "[Debuff] Layer 3" },
		{ "type": "text", "delay": 145000, "message": '[Debuff] 2.5 minutes passed' }]
};

module.exports = (mod) => {	
return {
};

for(const [key, value] of Object.entries(skills)){
	if(key.length === 5){
		module.exports["s-3126-1000-1" + key] = value;
		module.exports["s-3126-1000-2" + key] = value;
	} else {
		module.exports[key] = value;
	}
}

};