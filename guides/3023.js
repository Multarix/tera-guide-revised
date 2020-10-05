// Akalath Quarantine
//
// made by michengs
// Updated to revised version

exports.guide = (mod, extras) => {

	let debuff = 0;
	let counter = 0;
	let timer1;
	let timer2;
	let timer3;
	let timer4;

	function skilld_event(skillid){
		if(skillid === 99020020){ // Debuff removed
			debuff = 0;
			mod.clearTimeout(timer1);
			mod.clearTimeout(timer2);
		}
		if([3119, 3220].includes(skillid)){
			switch(skillid){
				case 3119: // red inside
					if(debuff === 1){
						extras.sendMessage(mod, "OUT (blue)");
					} else if(debuff === 2){
						extras.sendMessage(mod, "IN (red)");
					}
					break;
				case 3220: // blue inside
					if(debuff === 1){
						extras.sendMessage(mod, "IN (blue)");
					} else if(debuff === 2){
						extras.sendMessage(mod, "OUT (red)");
					}
					break;
			}
		}
		if([30231000, 1000].includes(skillid)){ // Red debuff
			debuff = 1;
			mod.clearTimeout(timer1);
			mod.clearTimeout(timer2);
			timer1 = mod.setTimeout(() => {
			/* extras.sendMessage(mod, "!");*/
				debuff = 0;
			}, 70000);
		}
		if([30231001, 1001].includes(skillid)){ // Blue debuff
			debuff = 2;
			mod.clearTimeout(timer2);
			mod.clearTimeout(timer1);
			timer2 = mod.setTimeout(() => {
			/* extras.sendMessage(mod, "!");*/
				debuff = 0;
			}, 70000);
		}
		if([1113, 1114].includes(skillid)){ // x4 slash
			mod.clearTimeout(timer3);
			counter++;
			if(counter >= 4){
			/* mod.clearTimeout(timer4);
			timer4 = mod.setTimeout(()=> {
			extras.sendMessage(mod, "4x slash");
			}, 70000);*/
			}
			timer3 = mod.setTimeout(() => {
				counter = 0;
			}, 20000);
		}
	}

	function firstboss_start_event(){
		debuff = 0;
	}

	return {
		// 1 BOSS
		"h-3023-1000-99": [{ type: "function", function: firstboss_start_event }],
		"h-3023-1000-80": [{ type: "text", message: "80%" }],
		"s-3023-1000-104-0": [{ type: "text", message: "Random Jump" }],
		"s-3023-1000-105-0": [{ type: "text", message: "Back" }],
		"s-3023-1000-110-0": [{ type: "text", message: "Stun" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 175, 10, 260, 6000] }],
		"s-3023-1000-111-0": [{ type: "text", message: "Left Slash" },
			{ type: "spawn", function: "vector", args: [553, 270, 180, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 180, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 270, 270, 200, 2000] },
			{ type: "spawn", function: "vector", args: [553, 180, 270, 270, 200, 2000] }],
		"s-3023-1000-112-0": [{ type: "text", message: "Right Slash" },
			{ type: "spawn", function: "vector", args: [553, 90, 180, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 180, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 90, 90, 200, 2000] },
			{ type: "spawn", function: "vector", args: [553, 180, 90, 90, 200, 2000] }],
		"s-3023-1000-113-0": [{ type: "text", message: "Left Slash" },
			{ type: "function", function: skilld_event, args: [1113] },
			{ type: "spawn", function: "vector", args: [553, 270, 180, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 270, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 180, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 270, 270, 200, 2000] },
			{ type: "spawn", function: "vector", args: [553, 180, 270, 270, 200, 2000] }],
		"s-3023-1000-114-0": [{ type: "text", message: "Right Slash" },
			{ type: "function", function: skilld_event, args: [1114] },
			{ type: "spawn", function: "vector", args: [553, 90, 180, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 90, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 180, 180, 500, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 0, 0, 300, 2000] },
			{ type: "spawn", function: "vector", args: [553, 0, 90, 90, 200, 2000] },
			{ type: "spawn", function: "vector", args: [553, 180, 90, 90, 200, 2000] }],
		"s-3023-1000-115-0": [{ type: "text", message: "Back Attack" },
			{ type: "spawn", function: "semi", args: [90, 270, 553, 0, 0, 20, 160, 2000] },
			{ type: "spawn", function: "semi", args: [90, 270, 553, 0, 0, 12, 220, 2000] },
			{ type: "spawn", function: "semi", args: [90, 270, 553, 0, 0, 10, 300, 2000] }],
		"s-3023-1000-116-0": [{ type: "text", message: "Kaia/Thrall of Protection" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 500, 6000] }],
		"am-3023-1000-30231001": [{ type: "function", function: skilld_event, args: [1001] }],
		"am-3023-1000-30231000": [{ type: "function", function: skilld_event, args: [1000] }],
		"ae-0-0-99020020": [{ type: "function", function: skilld_event, args: [99020020] }], // 复生
		"ae-0-0-30231000": [{ type: "function", function: skilld_event, args: [30231000] }], // 开始红色
		"ae-0-0-30231001": [{ type: "function", function: skilld_event, args: [30231001] }], // 开始蓝色
		"s-3023-1000-3107-0": [{ type: "text", message: "Smash" },
			{ type: "spawn", function: "vector", args: [553, 90, 10, 10, 1000, 4000] },
			{ type: "spawn", function: "vector", args: [553, 270, 350, 350, 1000, 4000] }],
		"s-3023-1000-3115-0": [{ type: "text", message: "Spin" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 320, 3500] }],
		"s-3023-1000-3116-0": [{ type: "text", message: "Circles + Spin" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 320, 5000] }],
		"s-3023-1000-3119-0": [{ type: "function", function: skilld_event, args: [3119] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 270, 4000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 575, 4000] }],
		"s-3023-1000-3220-0": [{ type: "function", function: skilld_event, args: [3220] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 270, 4000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 575, 4000] }],
		// "s-3023-1000-3223-0": [{ type: "text" }],
		// 2 BOSS
		"s-3023-2000-164-0": [{ type: "text", message: "Counter Attack (bleed)" }],
		"s-3023-2000-166-0": [{ type: "text", message: "Turn-back" }],
		"s-3023-2000-175-0": [{ type: "text", message: "Incoming Stun" },
			{ type: "text", delay: 1500, message: "Dodge" }],
		"s-3023-2000-178-0": [{ type: "text", message: "Scratching (bleed)" }],
		"s-3023-2000-181-0": [{ type: "text", message: "Rock Throw" },
			{ type: "spawn", function: "vector", args: [553, 90, 10, 10, 1000, 4000] },
			{ type: "spawn", function: "vector", args: [553, 270, 350, 350, 1000, 4000] }],
		"s-3023-2000-182-0": [{ type: "text", message: "Knockdown" }],
		"s-3023-2000-185-0": [{ type: "text", message: "Kaia/Thrall of Protection" },
			{ "sub_type": "message", delay: 110000, message: "Big jump soon" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 500, 6000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 8, 750, 6000] }],
		"s-3023-2000-202-0": [{ type: "text", message: "Backstab" },
			{ type: "spawn", function: "vector", args: [553, 90, 180, 180, 500, 3000] },
			{ type: "spawn", function: "vector", args: [553, 270, 180, 180, 500, 3000] }],
		"s-3023-2000-207-0": [{ type: "text", message: "Phantom x5 (bleed)" }],
		"s-3023-2000-212-0": [{ type: "text", message: "Flash (bleed)" }]
	};
};

exports.type = {
	es: true,
	sp: false
};
