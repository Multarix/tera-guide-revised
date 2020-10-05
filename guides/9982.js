// Grotto of Lost Souls (Hard)
//
// made by michengs
// Updated to revised version

exports.guide = (mod, extras) => {

	let power = true;
	let Level = 0;
	let powerMsg = null;
	let notice = true;
	let steptwo = false;

	function start_boss(){
		power = false;
		Level = 0;
		notice = true;
		powerMsg = null;
		steptwo = false;
	}

	function skilld_event(skillid){
		if(!notice) return;

		if(notice && [118, 139, 141, 150, 152].includes(skillid)){
			notice = false;
			mod.setTimeout(() => notice = true, 4000);
		}
		if(skillid === 300){
			power = true;
			Level = 0;
			powerMsg = null;
		}
		if(skillid === 360 || skillid === 399){
			Level = 0;
		}
		if(power && [118, 143, 145, 146, 144, 147, 148, 154, 155, 161, 162, 213, 215].includes(skillid)){
			Level++;
			powerMsg = "{" + Level + "}";
			if(Level == 4){
				extras.sendMessage(mod, "Fully charged!");
			} else if(Level == 2 && steptwo){
				extras.sendMessage(mod, "Fully charged!!");
			}
			if(powerMsg !== null && skillid !== 399){
				if(!steptwo && Level !== 4){
					extras.sendMessage(mod, powerMsg);
				}
				if(steptwo && Level !== 2){
					extras.sendMessage(mod, powerMsg);
				}
			}
		}
		if(skillid === 399){
			steptwo = true;
		}
	}

	return {
		// 1 BOSS
		"s-982-1000-106-0": [{ type: "text", position: "tank", message: "Heavy" }],
		"s-982-1000-107-0": [{ type: "text", position: "dps", message: "Pushback" },
			{ type: "text", position: "healer", message: "Pushback (Kaia)" }],
		"s-982-1000-108-0": [{ type: "text", message: "Bait (Flying)" }],
		"s-982-1000-109-0": [{ type: "text", message: "Rocks (Small)" }],
		"s-982-1000-110-0": [{ type: "text", message: "Rocks (Large)" }],
		"s-982-1000-301-0": [{ type: "text", message: "Flower Stuns" }],
		"s-982-1000-307-0": [{ type: "text", message: "Cage" }],
		"s-982-1000-309-0": [{ type: "text", message: "1 Flower" }],
		"s-982-1000-310-0": [{ type: "text", message: "2 Flower" }],
		"s-982-1000-116-0": [{ type: "text", message: "Big AoE Attack!" }],
		"s-982-1000-312-0": [{ type: "text", message: "Golden Flower!" }],
		// 2 BOSS
		"s-982-2000-105-0": [{ type: "text", message: "Spin" }],
		"s-982-2000-113-0": [{ type: "text", message: "Stun Inc" }],
		"s-982-2000-114-0": [{ type: "text", message: "Get In" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 15, 260, 3000] }],
		"s-982-2000-116-0": [{ type: "text", message: "Front then Back" },
			{ type: "spawn", function: "vector", args: [553, 0, 270, 270, 500, 5000] },
			{ type: "spawn", function: "vector", args: [553, 180, 90, 90, 500, 5000] }],
		"s-982-2000-301-0": [{ type: "text", message: "Get Out + Dodge" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 15, 260, 3000] }],
		"s-982-2000-302-0": [{ type: "text", message: "Get In + Dodge" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 15, 260, 3000] }],
		// 3 БОСС
		"h-982-3000-99": [{ type: "function", function: start_boss }],
		"h-982-3000-30": [{ type: "text", message: "30%" }],
		"s-982-3000-118-0": [{ type: "text", message: "Front Triple" },
			{ type: "function", function: skilld_event, args: [118] }],
		"s-982-3000-143-0": [{ type: "text", message: "Left Rear" },
			{ type: "function", function: skilld_event, args: [143] }],
		"s-982-3000-145-0": [{ type: "text", message: "Left Rear" },
			{ type: "function", function: skilld_event, args: [145] }],
		"s-982-3000-146-0": [{ type: "text", message: "Left Rear (Pulses)" },
			{ type: "spawn", function: "marker", args: [false, 215, 370, 8000, true, null] },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 15, 160, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 12, 320, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 10, 480, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 8, 640, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 6, 800, 8000], delay: 2500 },
			{ type: "function", function: skilld_event, args: [146] }],
		"s-982-3000-154-0": [{ type: "text", message: "Left Rear (Pulses)" },
			{ type: "spawn", function: "marker", args: [false, 215, 370, 8000, true, null] },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 15, 160, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 12, 320, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 10, 480, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 8, 640, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 215, 370, 6, 800, 8000], delay: 2500 },
			{ type: "function", function: skilld_event, args: [154] }],
		"s-982-3000-144-0": [{ type: "text", message: "Right Rear" },
			{ type: "function", function: skilld_event, args: [144] }],
		"s-982-3000-147-0": [{ type: "text", message: "Right Rear" },
			{ type: "function", function: skilld_event, args: [147] }],
		"s-982-3000-148-0": [{ type: "text", message: "Right Rear (Pulses)" },
			{ type: "spawn", function: "marker", args: [false, 155, 388, 8000, true, null] },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 15, 160, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 12, 320, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 10, 480, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 8, 640, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 6, 800, 8000], delay: 2500 },
			{ type: "function", function: skilld_event, args: [148] }],
		"s-982-3000-155-0": [{ type: "text", message: "Right Rear (Pulses)" },
			{ type: "spawn", function: "marker", args: [false, 155, 388, 8000, true, null] },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 15, 160, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 12, 320, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 10, 480, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 8, 640, 8000], delay: 2500 },
			{ type: "spawn", function: "circle", args: [false, 445, 155, 388, 6, 800, 8000], delay: 2500 },
			{ type: "function", function: skilld_event, args: [155] }],
		"s-982-3000-161-0": [{ type: "text", message: "Back then Front" },
			{ type: "function", function: skilld_event, args: [161] }],
		"s-982-3000-162-0": [{ type: "text", message: "Back then Front" },
			{ type: "function", function: skilld_event, args: [162] }],
		"s-982-3000-213-0": [{ type: "text", message: "Tail" },
			{ type: "function", function: skilld_event, args: [213] }],
		"s-982-3000-215-0": [{ type: "text", message: "Tail!" },
			{ type: "function", function: skilld_event, args: [215] }],
		"s-982-3000-139-0": [{ type: "text", message: "Left Safe" },
			{ type: "spawn", function: "vector", args: [912, 90, 0, 0, 500, 5000] },
			{ type: "spawn", function: "vector", args: [912, 270, 180, 180, 500, 5000] },
			{ type: "spawn", function: "marker", args: [false, 270, 200, 8000, true, null] },
			{ type: "function", function: skilld_event, args: [139] }],
		"s-982-3000-150-0": [{ type: "text", message: "Left Safe" },
			{ type: "spawn", function: "vector", args: [912, 90, 0, 0, 500, 5000] },
			{ type: "spawn", function: "vector", args: [912, 270, 180, 180, 500, 5000] },
			{ type: "spawn", function: "marker", args: [false, 270, 200, 8000, true, null] },
			{ type: "function", function: skilld_event, args: [150] }],
		"s-982-3000-141-0": [{ type: "text", message: "Right Safe" },
			{ type: "spawn", function: "vector", args: [912, 90, 0, 0, 500, 5000] },
			{ type: "spawn", function: "vector", args: [912, 270, 180, 180, 500, 5000] },
			{ type: "spawn", function: "marker", args: [false, 90, 200, 8000, true, null] },
			{ type: "function", function: skilld_event, args: [141] }],
		"s-982-3000-152-0": [{ type: "text", message: "Right Safe" },
			{ type: "spawn", function: "vector", args: [912, 90, 0, 0, 500, 5000] },
			{ type: "spawn", function: "vector", args: [912, 270, 180, 180, 500, 5000] },
			{ type: "spawn", function: "marker", args: [false, 90, 200, 8000, true, null] },
			{ type: "function", function: skilld_event, args: [152] }],
		"s-982-3000-300-0": [{ type: "text", message: "Dodge! (Awakening 1)" },
			{ type: "function", function: skilld_event, args: [300] }],
		"s-982-3000-399-0": [{ type: "text", message: "Dodge! (Awakening 2)" },
			{ type: "function", function: skilld_event, args: [399] }],
		"s-982-3000-360-0": [{ type: "text", message: "Explosion!" },
			{ type: "function", function: skilld_event, args: [360] }]
	};
};

exports.type = {
	es: false,
	sp: false
};
