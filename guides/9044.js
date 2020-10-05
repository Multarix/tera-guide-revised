// Bahaar's Sanctum
//
// made by michengs
// Updated to revised version

exports.guide = (mod, extras) => {
	const { spawn } = require("../lib.js");

	let shining = false;
	let skill = 0;
	let print = false;
	let notice = true;
	let notices = true;
	let printend = false;

	function skillds_event(skillids){
		if(skillids === 104){
			skill = 104;
		} else if(skillids === 134){
			skill = 134;
		} else if(skillids === 118){
			skill = 118;
		}
	}

	function skilld_event(skillid){
		const create = new spawn(mod, extras);

		if(skillid == 90442000) shining = true;
		if(skillid == 90442001) shining = false;
		if(skillid == 90442304) extras.sendMessage(mod, "Stun");
		if(skillid == 90444001 && skill == 104){
			mod.setTimeout(() => {
				if(shining){
					extras.sendMessage(mod, "Back");
					skill = 0;
					notices = false;
					mod.setTimeout(() => notices = true, 1000);
				}
			}, 500);
		}
		if(skillid == 90442000 && skill == 134){
			mod.setTimeout(() => {
				if(shining){
					extras.sendMessage(mod, "Back");
					skill = 0;
					notices = false;
					mod.setTimeout(() => notices = true, 1000);
				}
			}, 300);
		}
		if(skillid == 90444001 && skill == 118){
			mod.setTimeout(() => {
				if(shining){
					extras.sendMessage(mod, "Back");
					skill = 0;
					notices = false;
					mod.setTimeout(() => notices = true, 1000);
				}
			}, 300);
		}
		if(notice && skillid == 305){
			notice = false;
			extras.sendMessage(mod, "Laser");
			extras.sendMessage(mod, "Laser");
			mod.setTimeout(() => notice = true, 4000);
		}
		if(notices && skillid == 137){
			extras.sendMessage(mod, "Back");
		}
		//
		if([1121, 2121].includes(skillid)){
			create.marker(false, 37, 125, 2533, false, ["safe", "safe"]);
			create.marker(false, 143, 125, 2533, false, ["safe", "safe"]);

			create.vector(553, 90, 50, 0, 500, 6000);
			create.vector(553, 270, 50, 0, 500, 6000);
			create.vector(553, 90, 50, 180, 500, 6000);
			create.vector(553, 270, 50, 180, 500, 6000);
			create.circle(false, 445, 0, 0, 6, 400, 6000);

			mod.setTimeout(extras.sendMessage, 60000, mod, "Waves soon...");
		}
		// Right
		if([1140, 2140].includes(skillid)){
			create.marker(false, 323, 125, 2533, false, ["safe", "safe"]);
			create.marker(false, 217, 125, 2533, false, ["safe", "safe"]);

			create.vector(553, 90, 50, 0, 500, 6000);
			create.vector(553, 270, 50, 0, 500, 6000);
			create.vector(553, 90, 50, 180, 500, 6000);
			create.vector(553, 270, 50, 180, 500, 6000);
			create.circle(false, 445, 0, 0, 6, 400, 6000);

			mod.setTimeout(extras.sendMessage, 60000, mod, "Waves soon...");
		}
		// 2nd fast 123 142
		// Left
		if([1123, 2123].includes(skillid)){
			create.marker(false, 37, 125, 0, 2500, false, ["safe", "safe"]);
			create.marker(false, 143, 125, 0, 2500, false, ["safe", "safe"]);

			create.vector(553, 90, 50, 0, 500, 6000);
			create.vector(553, 270, 50, 0, 500, 6000);
			create.vector(553, 90, 50, 180, 500, 6000);
			create.vector(553, 270, 50, 180, 500, 6000);
			create.circle(false, 445, 0, 0, 6, 400, 6000);

			mod.setTimeout(extras.sendMessage, 60000, mod, "Waves soon...");
		}
		// Right
		if([1142, 2142].includes(skillid)){
			create.marker(false, 323, 125, 2500, false, ["safe", "safe"]);
			create.marker(false, 217, 125, 2500, false, ["safe", "safe"]);

			create.vector(553, 90, 50, 0, 500, 6000);
			create.vector(553, 270, 50, 0, 500, 6000);
			create.vector(553, 90, 50, 180, 500, 6000);
			create.vector(553, 270, 50, 180, 500, 6000);
			create.circle(false, 445, 0, 0, 6, 400, 6000);

			mod.setTimeout(extras.sendMessage, 60000, mod, "Waves soon...");
		}
		// 3rd fast 122 141
		// Left
		if([1122, 2122].includes(skillid)){
			create.marker(false, 37, 125, 2533, false, ["safe", "safe"]);
			create.marker(false, 143, 125, 2533, false, ["safe", "safe"]);

			create.vector(553, 90, 50, 0, 500, 6000);
			create.vector(553, 270, 50, 0, 500, 6000);
			create.vector(553, 90, 50, 180, 500, 6000);
			create.vector(553, 270, 50, 180, 500, 6000);
			create.circle(false, 445, 0, 0, 6, 400, 6000);

			mod.setTimeout(extras.sendMessage, 60000, mod, "Waves soon...");
		}
		// Right
		if([1141, 2141].includes(skillid)){
			create.marker(false, 323, 125, 2533, false, ["safe", "safe"]);
			create.marker(false, 217, 125, 2533, false, ["safe", "safe"]);

			create.vector(553, 90, 50, 0, 500, 6000);
			create.vector(553, 270, 50, 0, 500, 6000);
			create.vector(553, 90, 50, 180, 500, 6000);
			create.vector(553, 270, 50, 180, 500, 6000);
			create.circle(false, 445, 0, 0, 6, 400, 6000);

			mod.setTimeout(extras.sendMessage, 60000, mod, "Waves soon...");
		}
	}

	function start_boss(){
		print = true;
		printend = true;
	}

	function print_th(){
		if(print){
			extras.sendMessage(mod, "Laser (loading)");
		}
		print = false;
	}

	function print_end(){
		if(printend){
			extras.sendMessage(mod, "Laser (loading)");
			mod.setTimeout(extras.sendMessage, 30000, mod, "Laser (loading)");
		}
		printend = false;
	}

	return {
		// PHASE 1
		// ---------------------------------------- Not enraged ----------------------------------------
		"s-444-1000-2103-0": [{ type: "text", message: "Front (Dodge)" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000] }],
		"s-444-1000-2108-0": [{ type: "text", message: "Back Throw | Front" }],
		"s-444-1000-2111-0": [{ type: "text", message: "Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000] }],
		"s-444-1000-2113-0": [{ type: "text", message: "Throw (Bait)" }],
		"s-444-1000-2114-0": [{ type: "text", message: "Front Slam" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 260, 10, 320, 4000] }],
		"s-444-1000-2115-0": [{ type: "text", message: "Knockup", delay: 234 }],
		"s-444-1000-2116-0": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 290, 6000] }],
		"s-444-1000-2117-0": [{ type: "text", message: "Jump (Bait)" }],
		"s-444-1000-2118-0": [{ type: "text", message: "Jump (Tank)" }],
		"s-444-1000-2121-0": [{ type: "text", message: "Waves (Left)" },
			{ type: "function", function: skilld_event, args: [2121] }],
		//
		"s-444-1000-2131-0": [{ type: "text", message: "Front | Left Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 358, 340, 8, 660, 4000] },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 180, 500, 4000] },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 0, 500, 4000] }],
		"s-444-1000-2132-0": [{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000] }],
		//
		"s-444-1000-2137-0": [{ type: "text", message: "Hammer Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000] }],
		"s-444-1000-2138-0": [{ type: "text", message: "Knockup (Bait)", delay: 234 }],
		"s-444-1000-2139-0": [{ type: "text", message: "Dodge!" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 8, 360, 2000] }],
		"s-444-1000-2140-0": [{ type: "text", message: "Waves (Right)" },
			{ type: "function", function: skilld_event, args: [2140] }],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-444-1000-1103-0": [{ type: "text", message: "Front (Dodge)" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000] }],
		"s-444-1000-1108-0": [{ type: "text", message: "Back Throw | Front" }],
		"s-444-1000-1111-0": [{ type: "text", message: "Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000] }],
		"s-444-1000-1113-0": [{ type: "text", message: "Throw (Bait)" }],
		"s-444-1000-1114-0": [{ type: "text", message: "Front Slam" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 260, 10, 320, 4000] }],
		"s-444-1000-1115-0": [{ type: "text", message: "Knockup", delay: 1300 }],
		"s-444-1000-1116-0": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 290, 6000] }],
		"s-444-1000-1117-0": [{ type: "text", message: "Jump (Bait)" }],
		"s-444-1000-1118-0": [{ type: "text", message: "Jump (Tank)" }],
		"s-444-1000-1121-0": [{ type: "text", message: "Waves (Left)" },
			{ type: "function", function: skilld_event, args: [1121] }],
		"s-444-1000-1131-0": [{ type: "text", message: "Front | Left Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 358, 340, 8, 660, 4000] },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 180, 500, 4000] },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 0, 500, 4000] }],
		"s-444-1000-1132-0": [{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000] }],
		"s-444-1000-1137-0": [{ type: "text", message: "Hammer Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000] }],
		"s-444-1000-1138-0": [{ type: "text", message: "Knockup (Bait)", delay: 1300 }],
		"s-444-1000-1139-0": [{ type: "text", message: "Dodge!" },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "circle", args: [false, 912, 0, 0, 8, 360, 2000] }],
		"s-444-1000-1140-0": [{ type: "text", message: "Waves (Right)" },
			{ type: "function", function: skilld_event, args: [1140] }],
		// PHASE 2
		"h-444-2000-100": [{ type: "spawn", function: "marker", args: [false, 0, -700, 3600000, false, ["Throne", "Throne Direction"]] }, // 1 hour is probably overkill
			{ type: "spawn", function: "point", args: [513, 0, 800, 3600000] }], // 1 hour is probably overkill
		"h-444-2000-99": [{ type: "function", function: start_boss }],
		"h-444-2000-0": [{ type: "function", function: print_end }],
		// ---------------------------------------- Not enraged ----------------------------------------
		"s-444-2000-1101-0": [{ type: "text", message: "4 Hit Combo" },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 195, 500, 4000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 270, 500, 3000] }],
		"s-444-2000-1103-0": [{ type: "text", message: "Front (Dodge)" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000] }],
		"s-444-2000-1107-0": [{ type: "text", message: "4 Hit (3)" }],
		"s-444-2000-1108-0": [{ type: "text", message: "Back Throw | Front" }],
		"s-444-2000-1111-0": [{ type: "text", message: "Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000] }],
		"s-444-2000-1112-0": [{ type: "text", message: "Perfect Defense", delay: 1240 },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 220, 12, 210, 4000] }],
		"s-444-2000-1113-0": [{ type: "text", message: "Throw (Bait)" }],
		"s-444-2000-1114-0": [{ type: "text", message: "Front Slam" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 260, 10, 320, 4000] }],
		"s-444-2000-1115-0": [{ type: "text", message: "Knockup", delay: 1300 }],
		"s-444-2000-1116-0": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 290, 6000] }],
		"s-444-2000-1117-0": [{ type: "text", message: "Jump (Bait)" }],
		"s-444-2000-1118-0": [{ type: "text", message: "Jump (Tank)" }],
		"s-444-2000-1119-0": [{ type: "text", message: "Left Swipe" },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 8, 360, 2000] },
			{ type: "spawn", function: "marker", args: [false, 270, 300, 2000, true, null] }],
		"s-444-2000-1120-0": [{ type: "text", message: "Right Swipe" },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 8, 360, 2000] },
			{ type: "spawn", function: "marker", args: [false, 90, 300, 100, 2000, true, null] }],
		"s-444-2000-1121-0": [{ type: "text", message: "Waves (Left)" },
			{ type: "function", function: skilld_event, args: [1121] }],
		"s-444-2000-1122-0": [{ type: "text", message: "Waves (Left) 3nd fast" },
			{ type: "function", function: skilld_event, args: [1122] }],
		"s-444-2000-1123-0": [{ type: "text", message: "Waves (Left) 2nd fast" },
			{ type: "function", function: skilld_event, args: [1123] }],
		"s-444-2000-1125-0": [{ type: "text", message: "Front | Right Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000] },
			{ type: "spawn", function: "vector", args: [553, 356, 0, 180, 500, 3000] },
			{ type: "spawn", function: "vector", args: [553, 356, 0, 0, 500, 3000] }],
		"s-444-2000-1126-0": [{ type: "spawn", function: "vector", args: [553, 90, 200, 0, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 200, 180, 500, 2000] }],
		"s-444-2000-1131-0": [{ type: "text", message: "Front | Left Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 358, 340, 8, 660, 4000] },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 180, 500, 4000] },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 0, 500, 4000] }],
		"s-444-2000-1132-0": [{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000] }],
		"s-444-2000-1135-0": [{ type: "text", message: "Perfect Defense", delay: 200 },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 220, 12, 210, 4000] }],
		"s-444-2000-1137-0": [{ type: "text", message: "Hammer back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000] }],
		"s-444-2000-1138-0": [{ type: "text", message: "Knockup (Bait)", delay: 1300 }],
		"s-444-2000-1139-0": [{ type: "text", message: "Dodge!" }],
		"s-444-2000-1140-0": [{ type: "text", message: "Waves (Right)" },
			{ type: "function", function: skilld_event, args: [1140] }],
		"s-444-2000-1141-0": [{ type: "text", message: "Waves (Right) 3nd fast" },
			{ type: "function", function: skilld_event, args: [1141] }],
		"s-444-2000-1142-0": [{ type: "text", message: "Waves (Right) 2nd fast" },
			{ type: "function", function: skilld_event, args: [1142] }],
		"s-444-2000-1307-0": [{ type: "text", message: "!" },
			{ type: "text", message: "Last aerolite", delay: 20000 }],
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
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000] }],
		"s-444-2000-2107-0": [{ type: "text", message: "4 Hit (3)" }],
		"s-444-2000-2108-0": [{ type: "text", message: "Back Throw | Front" }],
		"s-444-2000-2111-0": [{ type: "text", message: "Back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000] }],
		"s-444-2000-2112-0": [{ type: "text", message: "Perfect Defense", delay: 2000 },
			{ type: "text", message: "x2", delay: 2700 },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 220, 12, 210, 4000] }],
		"s-444-2000-2113-0": [{ type: "text", message: "Throw (Bait)" }],
		"s-444-2000-2114-0": [{ type: "text", message: "Front Slam" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 260, 10, 320, 4000] }],
		"s-444-2000-2115-0": [{ type: "text", message: "Knockup", delay: 234 }],
		"s-444-2000-2116-0": [{ type: "text", message: "Donuts" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 290, 6000] }],
		"s-444-2000-2117-0": [{ type: "text", message: "Jump (Bait)" }],
		"s-444-2000-2118-0": [{ type: "text", message: "Jump (Tank)" }],
		"s-444-2000-2119-0": [{ type: "text", message: "Left Swipe" },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "semi", args: [0, 180, 912, 0, 0, 8, 360, 2000] },
			{ type: "spawn", function: "marker", args: [false, 270, 300, 2000, true, null] }],
		"s-444-2000-2120-0": [{ type: "text", message: "Right Swipe" },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 10, 300, 2000] },
			{ type: "spawn", function: "semi", args: [180, 360, 912, 0, 0, 8, 360, 2000] },
			{ type: "spawn", function: "marker", args: [false, 90, 300, 2000, true, null] }],
		"s-444-2000-2121-0": [{ type: "text", message: "Waves (Left)" },
			{ type: "function", function: skilld_event, args: [2121] }],
		"s-444-2000-2122-0": [{ type: "text", message: "Waves (Left) 3nd fast" },
			{ type: "function", function: skilld_event, args: [2122] }],
		"s-444-2000-2123-0": [{ type: "text", message: "Waves (Left) 2nd fast" },
			{ type: "function", function: skilld_event, args: [2123] }],
		//
		"s-444-2000-2125-0": [{ type: "text", message: "Front | Right Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 400, 8, 350, 3000] },
			{ type: "spawn", function: "vector", args: [553, 356, 0, 180, 500, 3000] },
			{ type: "spawn", function: "vector", args: [553, 356, 0, 0, 500, 100, 3000] }],
		"s-444-2000-2126-0": [{ type: "spawn", function: "vector", args: [553, 90, 200, 0, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 200, 180, 500, 2000] }],
		"s-444-2000-2131-0": [{ type: "text", message: "Front | Left Scratch" },
			{ type: "spawn", function: "circle", args: [false, 445, 358, 340, 8, 660, 4000] },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 180, 500, 4000] },
			{ type: "spawn", function: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }],
		"s-444-2000-2132-0": [{ type: "spawn", function: "vector", args: [553, 270, 200, 0, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 200, 180, 500, 2000] }],
		//
		"s-444-2000-2135-0": [{ type: "text", message: "Perfect Defense", delay: 200 },
			{ type: "text", message: "x2", delay: 1535 },
			{ type: "spawn", function: "circle", args: [false, 445, 356, 220, 12, 210, 4000] }],
		"s-444-2000-2137-0": [{ type: "text", message: "Hammer back" },
			{ type: "spawn", function: "circle", args: [false, 445, 180, 500, 8, 480, 2000] }],
		"s-444-2000-2138-0": [{ type: "text", message: "Knockup (Bait)", delay: 234 }],
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

exports.type = {
	es: false,
	sp: true
};
