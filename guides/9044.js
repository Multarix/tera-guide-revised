// Bahaar's Sanctum
//
// made by michengs

exports.guide = (mod, extras) => {


	let print = false;
	let notice = true;
	let printend = false;

	function skilld_event(skillid, ent){
		if(skillid == 90442304){
			extras.sendMessage("Stun");
			extras.sendMessage("Stun");
		}

		if(notice && skillid == 305){
			notice = false;
			extras.sendMessage("Laser");

			mod.setTimeout(() => notice = true, 4000);
		}

		// Wawes
		if([1121, 2121, 1140, 2140, 1123, 2123, 1142, 2142, 1122, 2122, 1141, 2141].includes(skillid)){
			extras.eventHandler([{ type: "spawn", function: "vector", args: [553, 90, 50, 0, 500, 6000] },
				{ type: "spawn", function: "vector", args: [553, 270, 50, 0, 500, 6000] },
				{ type: "spawn", function: "vector", args: [553, 90, 50, 180, 500, 6000] },
				{ type: "spawn", function: "vector", args: [553, 270, 50, 180, 500, 6000] },
				{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 6, 400, 6000] },
				{ type: "text", delay: 60000, message: "Waves soon..." }]);
		}

		// Left
		if([1121, 2121].includes(skillid)){
			extras.eventHandler([{ type: "spawn", function: "marker", args: [false, 37, 125, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", function: "marker", args: [false, 143, 125, 2533, false, ["safe", "safe"]] }]);
		}

		// Right
		if([1140, 2140].includes(skillid)){
			extras.eventHandler([{ type: "spawn", function: "marker", args: [false, 323, 125, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", function: "marker", args: [false, 217, 125, 2533, false, ["safe", "safe"]] }]);
		}

		// 2nd fast 123 142
		// Left
		if([1123, 2123].includes(skillid)){
			extras.eventHandler([{ type: "spawn", function: "marker", args: [false, 37, 125, 2500, false, ["safe", "safe"]] },
				{ type: "spawn", function: "marker", args: [false, 143, 125, 2500, false, ["safe", "safe"]] }]);
		}

		// Right
		if([1142, 2142].includes(skillid)){
			extras.eventHandler([{ type: "spawn", function: "marker", args: [false, 323, 125, 2500, false, ["safe", "safe"]] },
				{ type: "spawn", function: "marker", args: [false, 217, 125, 2500, false, ["safe", "safe"]] }]);
		}

		// 3rd fast 122 141
		// Left
		if([1122, 2122].includes(skillid)){
			extras.eventHandler([{ type: "spawn", function: "marker", args: [false, 37, 125, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", function: "marker", args: [false, 143, 125, 2533, false, ["safe", "safe"]] }]);
		}

		// Right
		if([1141, 2141].includes(skillid)){
			extras.eventHandler([{ type: "spawn", function: "marker", args: [false, 323, 125, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", function: "marker", args: [false, 217, 125, 2533, false, ["safe", "safe"]] }]);
		}
	}

	function start_boss(){
		print = true;
		printend = true;
	}

	function print_th(){
		if(print){
			extras.sendMessage("Laser (loading)");
		}

		print = false;
	}

	function print_end(){
		if(printend){
			extras.sendMessage("Laser (loading)");
			mod.setTimeout(extras.sendMessage, 30000, "Laser (loading)");
		}
		printend = false;
	}

	return {
		// PHASE 1
		"nd-444-1000": [{ type: "stop_timers" },
			{ type: "despawn_all" }],

		// ---------------------------------------- Not enraged ----------------------------------------
		"s-444-1000-2103-0": [{ type: "text", message: "Front (Dodge)" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000], delay: 100 }],
		"s-444-1000-2108-0": [{ type: "text", message: "Back Throw | Front" }],
		"s-444-1000-2111-0": [{ type: "text", message: "Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000], delay: 100 }],
		"s-444-1000-2113-0": [{ type: "text", message: "Throw (Bait)" }],
		"s-444-1000-2114-0": [{ type: "text", message: "Front Slam" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 260, 10, 320, 4000], delay: 100 }],
		"s-444-1000-2115-0": [{ type: "text", delay: 234, message: "Knockup" }],
		"s-444-1000-2116-0": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 290, 6000], delay: 100 }],
		"s-444-1000-2117-0": [{ type: "text", message: "Jump (Bait)" }],
		"s-444-1000-2118-0": [{ type: "text", message: "Jump (Tank)" }],
		"s-444-1000-2121-0": [{ type: "text", message: "Waves (Left)" }, { type: "function", function: skilld_event, args: [2121] }],
		//
		"s-444-1000-2131-0": [{ type: "text", message: "Front | Left Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 358, 340, 8, 660, 4000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 180, 500, 4000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 0, 500, 4000], delay: 100 }],
		"s-444-1000-2132-0": [{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000] }],
		//
		"s-444-1000-2137-0": [{ type: "text", message: "Hammer Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000], delay: 100 }],
		"s-444-1000-2138-0": [{ type: "text", delay: 234, message: "Knockup (Bait)" }],
		"s-444-1000-2139-0": [{ type: "text", message: "Dodge!" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 8, 360, 2000] }],
		"s-444-1000-2140-0": [{ type: "text", message: "Waves (Right)" },
			{ type: "function", function: skilld_event, args: [2140] }],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-444-1000-1103-0": [{ type: "text", message: "Front (Dodge)" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000], delay: 100 }],
		"s-444-1000-1108-0": [{ type: "text", message: "Back Throw | Front" }],
		"s-444-1000-1111-0": [{ type: "text", message: "Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000], delay: 100 }],
		"s-444-1000-1113-0": [{ type: "text", message: "Throw (Bait)" }],
		"s-444-1000-1114-0": [{ type: "text", message: "Front Slam" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 260, 10, 320, 4000], delay: 100 }],
		"s-444-1000-1115-0": [{ type: "text", delay: 1300, message: "Knockup" }],
		"s-444-1000-1116-0": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 290, 6000], delay: 100 }],
		"s-444-1000-1117-0": [{ type: "text", message: "Jump (Bait)" }],
		"s-444-1000-1118-0": [{ type: "text", message: "Jump (Tank)" }],
		"s-444-1000-1121-0": [{ type: "text", message: "Waves (Left)" },
			{ type: "function", function: skilld_event, args: [1121] }],
		"s-444-1000-1131-0": [{ type: "text", message: "Front | Left Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 358, 340, 8, 660, 4000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 180, 500, 4000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 0, 500, 4000], delay: 100 }],
		"s-444-1000-1132-0": [{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000] }],
		"s-444-1000-1137-0": [{ type: "text", message: "Hammer Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000], delay: 100 }],
		"s-444-1000-1138-0": [{ type: "text", delay: 1300, message: "Knockup (Bait)" }],
		"s-444-1000-1139-0": [{ type: "text", message: "Dodge!" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 8, 360, 2000] }],
		"s-444-1000-1140-0": [{ type: "text", message: "Waves (Right)" },
			{ type: "function", function: skilld_event, args: [1140] }],


		// PHASE 2
		"nd-444-2000": [{ type: "stop_timers" },
			{ type: "despawn_all" },
			{ type: "function", function: print_end }],
		"ns-444-2000": [{ type: "spawn", function: "marker", args: [false, 0, -700, 60000000, false, ["Throne", "Throne Direction"]], delay: 100 },
		// { type: "spawn", function: "vector", args: [542, 0, 0, 0, 3000, 6000000] },
		// { type: "spawn", function: "vector", args: [542, 0, 0, 180, 3000, 6000000] },
			{ type: "spawn", function: "point", args: [513, 0, 800, 60000000], delay: 100 },
			{ type: "function", function: start_boss }],

		// ---------------------------------------- Not enraged ----------------------------------------
		"s-444-2000-1101-0": [{ type: "text", message: "4 Hit Combo" },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 195, 500, 4000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 270, 500, 3000] }],
		"s-444-2000-1103-0": [{ type: "text", message: "Front (Dodge)" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000], delay: 100 }],
		"s-444-2000-1107-0": [{ type: "text", message: "4 Hit (3)" }],
		"s-444-2000-1108-0": [{ type: "text", message: "Back Throw | Front" }],
		"s-444-2000-1111-0": [{ type: "text", message: "Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000], delay: 100 }],
		"s-444-2000-1112-0": [{ type: "text", delay: 1240, message: "Perfect Defense" },
			// { type: "text", message: "Perfect Defense" },
			// { type: "text", delay: 2040, message: "1" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 220, 12, 210, 4000], delay: 100 }],
		"s-444-2000-1113-0": [{ type: "text", message: "Throw (Bait)" }],
		"s-444-2000-1114-0": [{ type: "text", message: "Front Slam" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 260, 10, 320, 4000], delay: 100 }],
		"s-444-2000-1115-0": [{ type: "text", delay: 1300, message: "Knockup" }],
		"s-444-2000-1116-0": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 290, 6000], delay: 100 }],
		"s-444-2000-1117-0": [{ type: "text", message: "Jump (Bait)" }],
		"s-444-2000-1118-0": [{ type: "text", message: "Jump (Tank)" }],
		"s-444-2000-1119-0": [{ type: "text", message: "Left Swipe" },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 8, 360, 2000] },
			{ type: "spawn", function: "marker", args: [false, 270, 300, 2000, true, null], delay: 100 }],
		"s-444-2000-1120-0": [{ type: "text", message: "Right Swipe" },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 8, 360, 2000] },
			{ type: "spawn", function: "marker", args: [false, 90, 300, 2000, true, null], delay: 100 }],
		"s-444-2000-1121-0": [{ type: "text", message: "Waves (Left)" },
			{ type: "function", function: skilld_event, args: [1121] }],
		"s-444-2000-1122-0": [{ type: "text", message: "Waves (Left) 3nd fast" },
			{ type: "function", function: skilld_event, args: [1122] }],
		"s-444-2000-1123-0": [{ type: "text", message: "Waves (Left) 2nd fast" },
			{ type: "function", function: skilld_event, args: [1123] }],
		//
		"s-444-2000-1125-0": [{ type: "text", message: "Front | Right Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 356, 0, 180, 500, 3000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 356, 0, 0, 500, 3000], delay: 100 }],
		"s-444-2000-1126-0": [{ type: "spawn", function: "vector", args: [553, 90, 200, 0, 500, 2000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 90, 200, 180, 500, 2000], delay: 100 }],
		"s-444-2000-1131-0": [{ type: "text", message: "Front | Left Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 358, 340, 8, 660, 4000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 180, 500, 4000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 0, 500, 4000], delay: 100 }],
		"s-444-2000-1132-0": [{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 500, 2000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000], delay: 100 }],
		//
		"s-444-2000-1135-0": [{ type: "text", delay: 200, message: "Perfect Defense" },
			// { type: "text", message: "Perfect Defense" },
			// { type: "text", delay: 1535, message: "1" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 220, 12, 210, 4000], delay: 100 }],
		"s-444-2000-1137-0": [{ type: "text", message: "Hammer back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000], delay: 100 }],
		"s-444-2000-1138-0": [{ type: "text", delay: 1300, message: "Knockup (Bait)" }],
		"s-444-2000-1139-0": [{ type: "text", message: "Dodge!" }],
		"s-444-2000-1140-0": [{ type: "text", message: "Waves (Right)" },
			{ type: "function", function: skilld_event, args: [1140] }],
		"s-444-2000-1141-0": [{ type: "text", message: "Waves (Right) 3nd fast" },
			{ type: "function", function: skilld_event, args: [1141] }],
		"s-444-2000-1142-0": [{ type: "text", message: "Waves (Right) 2nd fast" },
			{ type: "function", function: skilld_event, args: [1142] }],
		"s-444-2000-1307-0": [{ type: "text", message: "!" },
			{ type: "text", delay: 20000, message: "Last aerolite" }],
		"ab-444-2000-90442303": [{ type: "text", message: "Plague/Regress" }],
		"s-444-2000-1308-0": [{ type: "text", message: "Stun (1)" }],
		"s-444-2000-1309-0": [{ type: "text", message: "Stun (2)" }],
		"s-444-2000-1310-0": [{ type: "text", message: "Stun (3)" }],
		"s-444-2000-1311-0": [{ type: "text", message: "Wrath" },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 500, 6000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 180, 500, 6000] }],
		"s-444-2000-1312-0": [{ type: "text", message: "Wrath!" },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 500, 6000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 180, 500, 6000] }],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-444-2000-2101-0": [{ type: "text", message: "4 Hit combo" },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 195, 500, 4000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 270, 500, 3000] }],
		"s-444-2000-2103-0": [{ type: "text", message: "Front (Dodge)" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000], delay: 100 }],
		"s-444-2000-2107-0": [{ type: "text", message: "4 Hit (3)" }],
		"s-444-2000-2108-0": [{ type: "text", message: "Back Throw | Front" }],
		"s-444-2000-2111-0": [{ type: "text", message: "Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000], delay: 100 }],
		"s-444-2000-2112-0": [{ type: "text", delay: 2000, message: "Perfect Defense" },
			{ type: "text", delay: 2700, message: "x2" },
			// { type: "text", message: "Perfect Defense" },
			// { type: "text", delay: 2800, message: "1" },
			// { type: "text", delay: 3690, message: "2" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 220, 12, 210, 4000], delay: 100 }],
		"s-444-2000-2113-0": [{ type: "text", message: "Throw (Bait)" }],
		"s-444-2000-2114-0": [{ type: "text", message: "Front Slam" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 260, 10, 320, 4000], delay: 100 }],
		"s-444-2000-2115-0": [{ type: "text", delay: 234, message: "Knockup" }],
		"s-444-2000-2116-0": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 290, 6000], delay: 100 }],
		"s-444-2000-2117-0": [{ type: "text", message: "Jump (Bait)" }],
		"s-444-2000-2118-0": [{ type: "text", message: "Jump (Tank)" }],
		"s-444-2000-2119-0": [{ type: "text", message: "Left Swipe" },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 8, 360, 2000] },
			{ type: "spawn", function: "marker", args: [false, 270, 300, 2000, true, null], delay: 100 }],
		"s-444-2000-2120-0": [{ type: "text", message: "Right Swipe" },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 8, 360, 2000] },
			{ type: "spawn", function: "marker", args: [false, 90, 300, 2000, true, null], delay: 100 }],
		"s-444-2000-2121-0": [{ type: "text", message: "Waves (Left)" },
			{ type: "function", function: skilld_event, args: [2121] }],
		"s-444-2000-2122-0": [{ type: "text", message: "Waves (Left) 3nd fast" },
			{ type: "function", function: skilld_event, args: [2122] }],
		"s-444-2000-2123-0": [{ type: "text", message: "Waves (Left) 2nd fast" },
			{ type: "function", function: skilld_event, args: [2123] }],
		//
		"s-444-2000-2125-0": [{ type: "text", message: "Front | Right Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 356, 0, 180, 500, 3000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 356, 0, 0, 500, 3000], delay: 100 }],
		"s-444-2000-2126-0": [{ type: "spawn", function: "vector", args: [553, 90, 200, 0, 500, 2000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 90, 200, 180, 500, 2000], delay: 100 }],
		"s-444-2000-2131-0": [{ type: "text", message: "Front | Left Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 358, 340, 8, 660, 4000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 180, 500, 4000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 0, 500, 4000], delay: 100 }],
		"s-444-2000-2132-0": [{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 500, 2000], delay: 100 },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000], delay: 100 }],
		//
		"s-444-2000-2135-0": [{ type: "text", delay: 200, message: "Perfect Defense" },
			{ type: "text", delay: 1535, message: "x2" },
			// { type: "text", message: "Perfect Defense" },
			// { type: "text", delay: 1535, message: "1" },
			// { type: "text", delay: 2535, message: "2" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 220, 12, 210, 4000], delay: 100 }],
		"s-444-2000-2137-0": [{ type: "text", message: "Hammer back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000], delay: 100 }],
		"s-444-2000-2138-0": [{ type: "text", delay: 234, message: "Knockup (Bait)" }],
		"s-444-2000-2139-0": [{ type: "text", message: "Dodge!" }],
		"s-444-2000-2140-0": [{ type: "text", message: "Waves (Right)" },
			{ type: "function", function: skilld_event, args: [2140] }],
		"s-444-2000-2141-0": [{ type: "text", message: "Waves (Right) 3nd fast" },
			{ type: "function", function: skilld_event, args: [2141] }],
		"s-444-2000-2142-0": [{ type: "text", message: "Waves (Right) 2nd fast" },
			{ type: "function", function: skilld_event, args: [2142] }],

		"ab-444-2000-90442000": [{ type: "function", function: skilld_event, args: [90442000] }],
		"ab-444-2000-90442001": [{ type: "function", function: skilld_event, args: [90442001] }],
		"ab-444-2000-90442304": [{ type: "function", function: skilld_event, args: [90442304] }],
		"ab-444-2000-90444001": [{ type: "function", function: skilld_event, args: [90444001] }],
		"s-444-2500-1201-0": [{ type: "function", function: print_th }],
		"s-444-2500-1305-0": [{ type: "function", function: skilld_event, args: [305] },
			{ type: "spawn", function: "vector", args: [912, 0, 0, 0, 3000, 4000] }]
	};
};

exports.type = { es: false, sp: true };
