// Bahaar's Sanctum
//
// made by michengs

const { SpawnMarker, SpawnPoint, SpawnVector, SpawnCircle, SpawnSemicircle } = require("../lib");

let player, entity, library, effect;

let shining = false;
let skill = 0;
let print = false;
let notice = true;
let notices = true;
let printend = false;

function skillds_event(skillids, handlers, event, ent, dispatch){
	if(skillids === 104){
		skill = 104;
		// dispatch.setTimeout(() => skill = 0, 500);
	} else if(skillids === 134){
		skill = 134;
		// dispatch.setTimeout(() => skill = 0, 500);
	} else if(skillids === 118){
		skill = 118;
		// dispatch.setTimeout(() => skill = 0, 500);
	}
}

function skilld_event(skillid, handlers, event, ent, dispatch){
	if(skillid == 90442000) shining = true;
	if(skillid == 90442001) shining = false;
	if(skillid == 90442304){
		handlers["text"]({ "sub_type": "notification", "message": "Stun" });
		handlers["text"]({ "sub_type": "message", "message": "Stun" });
	}
	if(skillid == 90444001 && skill == 104){
		dispatch.setTimeout(() => {
			if(shining){
				handlers["text"]({ "sub_type": "msgcp", "message": "Back" });
				skill = 0;
				notices = false;
				dispatch.setTimeout(() => notices = true, 1000);
			}
		}, 500);
	}
	if(skillid == 90442000 && skill == 134){
		dispatch.setTimeout(() => {
			if(shining){
				handlers["text"]({ "sub_type": "msgcp", "message": "Back" });
				skill = 0;
				notices = false;
				dispatch.setTimeout(() => notices = true, 1000);
			}
		}, 300);
	}
	if(skillid == 90444001 && skill == 118){
		dispatch.setTimeout(() => {
			if(shining){
				handlers["text"]({ "sub_type": "msgcp", "message": "Back" });
				skill = 0;
				notices = false;
				dispatch.setTimeout(() => notices = true, 1000);
			}
		}, 300);
	}
	if(notice && skillid == 305){
		notice = false;
		handlers["text"]({ "sub_type": "notification", "message": "Laser" });
		handlers["text"]({ "sub_type": "message", "message": "Laser" });
		dispatch.setTimeout(() => notice = true, 4000);
	}
	if(notices && skillid == 137){
		handlers["text"]({ "sub_type": "message", "message": "Back" });
	}
	//
	if([1121, 2121].includes(skillid)){
		SpawnMarker(false, 37, 125, 0, 2533, false, ["safe", "safe"], handlers, event, ent, dispatch);
		SpawnMarker(false, 143, 125, 0, 2533, false, ["safe", "safe"], handlers, event, ent, dispatch);

		SpawnVector(553, 90, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 90, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnCircle(false, 445, 0, 0, 6, 400, 0, 6000, handlers, event, ent, dispatch);

		handlers["text"]({ "type": "text", "sub_type": "alert", "delay": 60000, "message": "Waves soon..." });
	}
	// Right
	if([1140, 2140].includes(skillid)){
		SpawnMarker(false, 323, 125, 0, 2533, false, ["safe", "safe"], handlers, event, ent, dispatch);
		SpawnMarker(false, 217, 125, 0, 2533, false, ["safe", "safe"], handlers, event, ent, dispatch);

		SpawnVector(553, 90, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 90, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnCircle(false, 445, 0, 0, 6, 400, 0, 6000, handlers, event, ent, dispatch);

		handlers["text"]({ "type": "text", "sub_type": "alert", "delay": 60000, "message": "Waves soon..." });
	}
	// 2nd fast 123 142
	// Left
	if([1123, 2123].includes(skillid)){
		SpawnMarker(false, 37, 125, 0, 2500, false, ["safe", "safe"], handlers, event, ent, dispatch);
		SpawnMarker(false, 143, 125, 0, 2500, false, ["safe", "safe"], handlers, event, ent, dispatch);

		SpawnVector(553, 90, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 90, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnCircle(false, 445, 0, 0, 6, 400, 0, 6000, handlers, event, ent, dispatch);

		handlers["text"]({ "type": "text", "sub_type": "alert", "delay": 60000, "message": "Waves soon..." });
	}
	// Right
	if([1142, 2142].includes(skillid)){
		SpawnMarker(false, 323, 125, 0, 2500, false, ["safe", "safe"], handlers, event, ent, dispatch);
		SpawnMarker(false, 217, 125, 0, 2500, false, ["safe", "safe"], handlers, event, ent, dispatch);

		SpawnVector(553, 90, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 90, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnCircle(false, 445, 0, 0, 6, 400, 0, 6000, handlers, event, ent, dispatch);

		handlers["text"]({ "type": "text", "sub_type": "alert", "delay": 60000, "message": "Waves soon..." });
	}
	// 3rd fast 122 141
	// Left
	if([1122, 2122].includes(skillid)){
		SpawnMarker(false, 37, 125, 0, 2533, false, ["safe", "safe"], handlers, event, ent, dispatch);
		SpawnMarker(false, 143, 125, 0, 2533, false, ["safe", "safe"], handlers, event, ent, dispatch);

		SpawnVector(553, 90, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 90, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnCircle(false, 445, 0, 0, 6, 400, 0, 6000, handlers, event, ent, dispatch);

		handlers["text"]({ "type": "text", "sub_type": "alert", "delay": 60000, "message": "Waves soon..." });
	}
	// Right
	if([1141, 2141].includes(skillid)){
		SpawnMarker(false, 323, 125, 0, 2533, false, ["safe", "safe"], handlers, event, ent, dispatch);
		SpawnMarker(false, 217, 125, 0, 2533, false, ["safe", "safe"], handlers, event, ent, dispatch);

		SpawnVector(553, 90, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 0, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 90, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnVector(553, 270, 50, 180, 500, 0, 6000, handlers, event, ent, dispatch);
		SpawnCircle(false, 445, 0, 0, 6, 400, 0, 6000, handlers, event, ent, dispatch);

		handlers["text"]({ "type": "text", "sub_type": "alert", "delay": 60000, "message": "Waves soon..." });
	}
}

function start_boss(){
	print = true;
	printend = true;
}

function print_th(handlers){
	if(print){
		handlers['text']({
			"sub_type": "message",
			"message": "Laser (loading)",
			"message_RU": "Лазер (зарядка)"
		});
	}
	print = false;
}

function print_end(handlers){
	if(printend){
		handlers['text']({
			"sub_type": "message",
			"message": "Laser (loading)",
			"message_RU": "Лазер (зарядка)"
		});
		handlers['text']({
			"sub_type": "message",
			"delay": 30000,
			"message": "Laser (loading)",
			"message_RU": "Лазер (зарядка)"
		});
	}
	printend = false;
}

module.exports = (mod) => {
	return {

		// PHASE 1

		// ---------------------------------------- Not enraged ----------------------------------------
		"s-444-1000-2103-0": [{ "type": "text", "message": "Front (Dodge)" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 400, 8, 350, 100, 3000) }],
		"s-444-1000-2108-0": [{ "type": "text", "message": "Back Throw | Front" }],
		"s-444-1000-2111-0": [{ "type": "text", "message": "Back" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 180, 500, 8, 480, 100, 2000) }],
		"s-444-1000-2113-0": [{ "type": "text", "message": "Throw (Bait)" }],
		"s-444-1000-2114-0": [{ "type": "text", "message": "Front Slam" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 260, 10, 320, 100, 4000) }],
		"s-444-1000-2115-0": [{ "type": "text", "delay": 234, "message": "Knockup" }],
		"s-444-1000-2116-0": [{ "type": "text", "message": "Donuts" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 290, 100, 6000) }],
		"s-444-1000-2117-0": [{ "type": "text", "message": "Jump (Bait)" }],
		"s-444-1000-2118-0": [{ "type": "text", "message": "Jump (Tank)" }],
		// { "type": "function", "function": skillds_event.bind(null, 118) }

		"s-444-1000-2121-0": [{ "type": "text", "message": "Waves (Left)" }, { "type": "function", "function": skilld_event.bind(null, 2121) }],
		//
		"s-444-1000-2131-0": [{ "type": "text", "message": "Front | Left Scratch" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 358, 340, 8, 660, 100, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 358, 0, 180, 500, 100, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 358, 0, 0, 500, 100, 4000) }],
		"s-444-1000-2132-0": [{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 200, 0, 500, 0, 2000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 200, 180, 500, 0, 2000) }],
		//
		"s-444-1000-2137-0": [{ "type": "text", "message": "Hammer Back" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 180, 500, 8, 480, 100, 2000) }],
		"s-444-1000-2138-0": [{ "type": "text", "delay": 234, "message": "Knockup (Bait)" }],
		"s-444-1000-2139-0": [{ "type": "text", "message": "Dodge!" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 20, 160, 0, 2000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 12, 220, 0, 2000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 10, 300, 0, 2000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 8, 360, 0, 2000) }],
		"s-444-1000-2140-0": [{ "type": "text", "message": "Waves (Right)" },
			{ "type": "function", "function": skilld_event.bind(null, 2140) }],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-444-1000-1103-0": [{ "type": "text", "message": "Front (Dodge)" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 400, 8, 350, 100, 3000) }],
		"s-444-1000-1108-0": [{ "type": "text", "message": "Back Throw | Front" }],
		"s-444-1000-1111-0": [{ "type": "text", "message": "Back" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 180, 500, 8, 480, 100, 2000) }],
		"s-444-1000-1113-0": [{ "type": "text", "message": "Throw (Bait)" }],
		"s-444-1000-1114-0": [{ "type": "text", "message": "Front Slam" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 260, 10, 320, 100, 4000) }],
		"s-444-1000-1115-0": [{ "type": "text", "delay": 1300, "message": "Knockup" }],
		"s-444-1000-1116-0": [{ "type": "text", "message": "Donuts" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 290, 100, 6000) }],
		"s-444-1000-1117-0": [{ "type": "text", "message": "Jump (Bait)" }],
		"s-444-1000-1118-0": [{ "type": "text", "message": "Jump (Tank)" }],
		// { "type": "function", "function": skillds_event.bind(null, 118) }

		"s-444-1000-1121-0": [{ "type": "text", "message": "Waves (Left)" },
			{ "type": "function", "function": skilld_event.bind(null, 1121) }],
		"s-444-1000-1131-0": [{ "type": "text", "message": "Front | Left Scratch" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 358, 340, 8, 660, 100, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 358, 0, 180, 500, 100, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 358, 0, 0, 500, 100, 4000) }],
		"s-444-1000-1132-0": [{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 200, 0, 500, 0, 2000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 200, 180, 500, 0, 2000) }],
		"s-444-1000-1137-0": [{ "type": "text", "message": "Hammer Back" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 180, 500, 8, 480, 100, 2000) }],
		"s-444-1000-1138-0": [{ "type": "text", "delay": 1300, "message": "Knockup (Bait)" }],
		"s-444-1000-1139-0": [{ "type": "text", "message": "Dodge!" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 20, 160, 0, 2000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 12, 220, 0, 2000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 10, 300, 0, 2000) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 912, 0, 0, 8, 360, 0, 2000) }],
		"s-444-1000-1140-0": [{ "type": "text", "message": "Waves (Right)" },
			{ "type": "function", "function": skilld_event.bind(null, 1140) }],


		// PHASE 2
		"h-444-2000-100": [{ "type": "function", "function": SpawnMarker.bind(null, false, 0, -700, 100, 60000000, false, ["Throne", "Throne Direction"]) },
		// { "type": "function", "function": SpawnVector.bind(null, 542, 0, 0, 0, 3000, 0, 6000000) },
		// { "type": "function", "function": SpawnVector.bind(null, 542, 0, 0, 180, 3000, 0, 6000000) },
			{ "type": "function", "function": SpawnPoint.bind(null, 513, 0, 800, 100, 60000000) }],
		"h-444-2000-99": [{ "type": "function", "function": start_boss }],
		"h-444-2000-0": [{ "type": "function", "function": print_end }],

		// ---------------------------------------- Not enraged ----------------------------------------
		"s-444-2000-1101-0": [{ "type": "text", "message": "4 Hit Combo" },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 195, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 270, 500, 0, 3000) }],
		"s-444-2000-1103-0": [{ "type": "text", "message": "Front (Dodge)" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 400, 8, 350, 100, 3000) }],
		// "s-444-2000-1104-0": [{ "type": "function", "function": skillds_event.bind(null, 104) }],
		"s-444-2000-1107-0": [{ "type": "text", "message": "4 Hit (3)" }],
		"s-444-2000-1108-0": [{ "type": "text", "message": "Back Throw | Front" }],
		"s-444-2000-1111-0": [{ "type": "text", "message": "Back" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 180, 500, 8, 480, 100, 2000) }],
		"s-444-2000-1112-0": [{ "type": "text", "delay": 1240, "message": "Perfect Defense" },
		// { "type": "text", "message": "Perfect Defense" },
		// { "type": "text", "delay": 2040, "message": "1" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 220, 12, 210, 100, 4000) }],
		"s-444-2000-1113-0": [{ "type": "text", "message": "Throw (Bait)" }],
		"s-444-2000-1114-0": [{ "type": "text", "message": "Front Slam" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 260, 10, 320, 100, 4000) }],
		"s-444-2000-1115-0": [{ "type": "text", "delay": 1300, "message": "Knockup" }],
		"s-444-2000-1116-0": [{ "type": "text", "message": "Donuts" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 290, 100, 6000) }],
		"s-444-2000-1117-0": [{ "type": "text", "message": "Jump (Bait)" }],
		"s-444-2000-1118-0": [{ "type": "text", "message": "Jump (Tank)" }],
		// { "type": "function", "function": skillds_event.bind(null, 118) }
		"s-444-2000-1119-0": [{ "type": "text", "message": "Left Swipe" },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 0, 180, 912, 0, 0, 20, 160, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 0, 180, 912, 0, 0, 12, 220, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 0, 180, 912, 0, 0, 10, 300, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 0, 180, 912, 0, 0, 8, 360, 0, 2000) },
			{ "type": "function", "function": SpawnMarker.bind(null, false, 270, 300, 100, 2000, true, null) }],
		"s-444-2000-1120-0": [{ "type": "text", "message": "Right Swipe" },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 180, 360, 912, 0, 0, 20, 160, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 180, 360, 912, 0, 0, 12, 220, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 180, 360, 912, 0, 0, 10, 300, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 180, 360, 912, 0, 0, 8, 360, 0, 2000) },
			{ "type": "function", "function": SpawnMarker.bind(null, false, 90, 300, 100, 2000, true, null) }],
		"s-444-2000-1121-0": [{ "type": "text", "message": "Waves (Left)" },
			{ "type": "function", "function": skilld_event.bind(null, 1121) }],
		"s-444-2000-1122-0": [{ "type": "text", "message": "Waves (Left) 3nd fast" },
			{ "type": "function", "function": skilld_event.bind(null, 1122) }],
		"s-444-2000-1123-0": [{ "type": "text", "message": "Waves (Left) 2nd fast" },
			{ "type": "function", "function": skilld_event.bind(null, 1123) }],
		//
		"s-444-2000-1125-0": [{ "type": "text", "message": "Front | Right Scratch" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 400, 8, 350, 100, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 356, 0, 180, 500, 100, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 356, 0, 0, 500, 100, 3000) }],
		"s-444-2000-1126-0": [{ "type": "function", "function": SpawnVector.bind(null, 553, 90, 200, 0, 500, 100, 2000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 90, 200, 180, 500, 100, 2000) }],
		"s-444-2000-1131-0": [{ "type": "text", "message": "Front | Left Scratch" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 358, 340, 8, 660, 100, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 358, 0, 180, 500, 100, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 358, 0, 0, 500, 100, 4000) }],
		"s-444-2000-1132-0": [{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 200, 0, 500, 100, 2000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 200, 180, 500, 100, 2000) }],
		//
		// "s-444-2000-1134-0": [{ "type": "function", "function": skillds_event.bind(null, 134) }],
		"s-444-2000-1135-0": [{ "type": "text", "delay": 200, "message": "Perfect Defense" },
		// { "type": "text", "message": "Perfect Defense" },
		// { "type": "text", "delay": 1535, "message": "1" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 220, 12, 210, 100, 4000) }],
		"s-444-2000-1137-0": [{ "type": "text", "message": "Hammer back" },
		// { "type": "function", "function": skilld_event.bind(null, 137) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 180, 500, 8, 480, 100, 2000) }],
		"s-444-2000-1138-0": [{ "type": "text", "delay": 1300, "message": "Knockup (Bait)" }],
		"s-444-2000-1139-0": [{ "type": "text", "message": "Dodge!" }],
		"s-444-2000-1140-0": [{ "type": "text", "message": "Waves (Right)" },
			{ "type": "function", "function": skilld_event.bind(null, 1140) }],
		"s-444-2000-1141-0": [{ "type": "text", "message": "Waves (Right) 3nd fast" },
			{ "type": "function", "function": skilld_event.bind(null, 1141) }],
		"s-444-2000-1142-0": [{ "type": "text", "message": "Waves (Right) 2nd fast" },
			{ "type": "function", "function": skilld_event.bind(null, 1142) }],
		"s-444-2000-1307-0": [{ "type": "text", "message": "!" },
			{ "type": "text", "delay": 20000, "message": "Last aerolite" }],
		"ab-444-2000-90442303": [{ "type": "text", "message": "Plague/Regress" }],
		"s-444-2000-1308-0": [{ "type": "text", "message": "Stun (1)" }],
		"s-444-2000-1309-0": [{ "type": "text", "message": "Stun (2)" }],
		"s-444-2000-1310-0": [{ "type": "text", "message": "Stun (3)" }],
		"s-444-2000-1311-0": [{ "type": "text", "message": "Wrath" },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 0, 500, 0, 6000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 180, 500, 0, 6000) }],
		"s-444-2000-1312-0": [{ "type": "text", "message": "Wrath!" },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 0, 500, 0, 6000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 180, 500, 0, 6000) }],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-444-2000-2101-0": [{ "type": "text", "message": "4 Hit combo" },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 195, 500, 0, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 0, 0, 270, 500, 0, 3000) }],
		"s-444-2000-2103-0": [{ "type": "text", "message": "Front (Dodge)" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 400, 8, 350, 100, 3000) }],
		// "s-444-2000-2104-0": [{ "type": "function", "function": skillds_event.bind(null, 104) }],
		"s-444-2000-2107-0": [{ "type": "text", "message": "4 Hit (3)" }],
		"s-444-2000-2108-0": [{ "type": "text", "message": "Back Throw | Front" }],
		"s-444-2000-2111-0": [{ "type": "text", "message": "Back" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 180, 500, 8, 480, 100, 2000) }],
		"s-444-2000-2112-0": [{ "type": "text", "delay": 2000, "message": "Perfect Defense" },
			{ "type": "text", "delay": 2700, "message": "x2" },
			// { "type": "text", "message": "Perfect Defense" },
			// { "type": "text", "delay": 2800, "message": "1" },
			// { "type": "text", "delay": 3690, "message": "2" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 220, 12, 210, 100, 4000) }],
		"s-444-2000-2113-0": [{ "type": "text", "message": "Throw (Bait)" }],
		"s-444-2000-2114-0": [{ "type": "text", "message": "Front Slam" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 260, 10, 320, 100, 4000) }],
		"s-444-2000-2115-0": [{ "type": "text", "delay": 234, "message": "Knockup" }],
		"s-444-2000-2116-0": [{ "type": "text", "message": "Donuts" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 553, 0, 0, 8, 290, 100, 6000) }],
		"s-444-2000-2117-0": [{ "type": "text", "message": "Jump (Bait)" }],
		"s-444-2000-2118-0": [{ "type": "text", "message": "Jump (Tank)" }],
		// { "type": "function", "function": skillds_event.bind(null, 118) }

		"s-444-2000-2119-0": [{ "type": "text", "message": "Left Swipe" },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 0, 180, 912, 0, 0, 20, 160, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 0, 180, 912, 0, 0, 12, 220, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 0, 180, 912, 0, 0, 10, 300, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 0, 180, 912, 0, 0, 8, 360, 0, 2000) },
			{ "type": "function", "function": SpawnMarker.bind(null, false, 270, 300, 100, 2000, true, null) }],
		"s-444-2000-2120-0": [{ "type": "text", "message": "Right Swipe" },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 180, 360, 912, 0, 0, 20, 160, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 180, 360, 912, 0, 0, 12, 220, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 180, 360, 912, 0, 0, 10, 300, 0, 2000) },
			{ "type": "function", "function": SpawnSemicircle.bind(null, 180, 360, 912, 0, 0, 8, 360, 0, 2000) },
			{ "type": "function", "function": SpawnMarker.bind(null, false, 90, 300, 100, 2000, true, null) }],
		"s-444-2000-2121-0": [{ "type": "text", "message": "Waves (Left)" },
			{ "type": "function", "function": skilld_event.bind(null, 2121) }],
		"s-444-2000-2122-0": [{ "type": "text", "message": "Waves (Left) 3nd fast" },
			{ "type": "function", "function": skilld_event.bind(null, 2122) }],
		"s-444-2000-2123-0": [{ "type": "text", "message": "Waves (Left) 2nd fast" },
			{ "type": "function", "function": skilld_event.bind(null, 2123) }],

		"s-444-2000-2125-0": [{ "type": "text", "message": "Front | Right Scratch" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 400, 8, 350, 100, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 356, 0, 180, 500, 100, 3000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 356, 0, 0, 500, 100, 3000) }],
		"s-444-2000-2126-0": [{ "type": "function", "function": SpawnVector.bind(null, 553, 90, 200, 0, 500, 100, 2000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 90, 200, 180, 500, 100, 2000) }],
		"s-444-2000-2131-0": [{ "type": "text", "message": "Front | Left Scratch" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 358, 340, 8, 660, 100, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 358, 0, 180, 500, 100, 4000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 358, 0, 0, 500, 100, 4000) }],
		"s-444-2000-2132-0": [{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 200, 0, 500, 100, 2000) },
			{ "type": "function", "function": SpawnVector.bind(null, 553, 270, 200, 180, 500, 100, 2000) }],

		// "s-444-2000-2134-0": [{ "type": "function", "function": skillds_event.bind(null, 134) }],
		"s-444-2000-2135-0": [{ "type": "text", "delay": 200, "message": "Perfect Defense" },
			{ "type": "text", "delay": 1535, "message": "x2" },
			// { "type": "text", "message": "Perfect Defense" },
			// { "type": "text", "delay": 1535, "message": "1" },
			// { "type": "text", "delay": 2535, "message": "2" },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 356, 220, 12, 210, 100, 4000) }],
		"s-444-2000-2137-0": [{ "type": "text", "message": "Hammer back" },
		// { "type": "function", "function": skilld_event.bind(null, 137) },
			{ "type": "function", "function": SpawnCircle.bind(null, false, 445, 180, 500, 8, 480, 100, 2000) }],
		"s-444-2000-2138-0": [{ "type": "text", "delay": 234, "message": "Knockup (Bait)" }],
		"s-444-2000-2139-0": [{ "type": "text", "message": "Dodge!" }],
		"s-444-2000-2140-0": [{ "type": "text", "message": "Waves (Right)" },
			{ "type": "function", "function": skilld_event.bind(null, 2140) }],
		"s-444-2000-2141-0": [{ "type": "text", "message": "Waves (Right) 3nd fast" },
			{ "type": "function", "function": skilld_event.bind(null, 2141) }],
		"s-444-2000-2142-0": [{ "type": "text", "message": "Waves (Right) 2nd fast" },
			{ "type": "function", "function": skilld_event.bind(null, 2142) }],

		"ab-444-2000-90442000": [{ "type": "function", "function": skilld_event.bind(null, 90442000) }],
		"ab-444-2000-90442001": [{ "type": "function", "function": skilld_event.bind(null, 90442001) }],
		"ab-444-2000-90442304": [{ "type": "function", "function": skilld_event.bind(null, 90442304) }],
		"ab-444-2000-90444001": [{ "type": "function", "function": skilld_event.bind(null, 90444001) }],
		"s-444-2500-1201-0": [{ "type": "function", "function": print_th }],
		"s-444-2500-1305-0": [{ "type": "function", "function": skilld_event.bind(null, 305) },
			{ "type": "function", "function": SpawnVector.bind(null, 912, 0, 0, 0, 3000, 0, 4000) }]
	};

};
