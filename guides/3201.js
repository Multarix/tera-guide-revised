// Gossamer Vault (Hard)
//
// made by michengs
// Updated to revised version

exports.guide = (mod, extras) => {
	let notice = true;
	let boss = 3;
	let secondboss = false;

	function secondboss_start_event(){
		secondboss = true;
		notice = true;
		boss = 3;
	}

	function skilld_event(skillid){
		if(skillid === 203 || skillid === 204){
			notice = false;
			mod.setTimeout(() => notice = true, 4000);
		}
		if(notice && skillid === 234 && boss === 1){ // 203 204技能没出/满足234 打手位置本体技能/满足吃分身buff
		/* extras.sendMessage("Dps entity");*/
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(notice && skillid === 234 && boss === 0){ // 203 204技能没出/满足234 打手位置本体技能/满足吃本体buff
		/* extras.sendMessage("tank");*/
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(skillid === 32010224){ // 吃分身buff
			boss = 1;
			mod.setTimeout(() => {
				if(boss === 1){
					extras.sendMessage("Debuff reload");
					boss = 3;
				}
			}, 80000);
		}
		if(skillid === 32010220){ // 吃本体buff
			boss = 0;
			mod.setTimeout(() => {
				if(boss === 0){
					extras.sendMessage("Debuff reload");
					boss = 3;
				}
			}, 80000);
		}
		if(skillid === 203 && boss === 0){
		/* extras.sendMessage("tank");*/
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(skillid === 203 && boss === 1){
		/* extras.sendMessage("Dps entity");*/
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(skillid === 204 && boss === 1){
		/* extras.sendMessage("tank");*/
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(skillid === 204 && boss === 0){
		/* extras.sendMessage("Dps entity");*/
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(skillid === 203 && boss === 3){
		/* extras.sendMessage("Dps entity");*/
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(skillid === 204 && boss === 3){
		/* extras.sendMessage("Tank entity");	*/
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(notice && skillid === 234 && boss === 3){
		/* extras.sendMessage("dps entity"); */
			mod.setTimeout(() => {
				extras.sendMessage("Debuff coming soon！");
			}, 55000);
		}
		if(skillid === 9203100 && secondboss){
		/* handlers['text']({
			"sub_type": "message",
			"message_RU": "Смерть +1!!"
		});*/
		}
	}

	return {
		// 1 BOSS
		// "s-3201-1000-103-0": [{ type: "text", position:"tank", message: "Dodge" }],
		"s-3201-1000-104-0": [{ type: "text", position: "tank", message: "Stun attack" }],
		"s-3201-1000-107-0": [{ type: "text", message: "back" },
			{ type: "text", delay: 2250, message: "pull" }],
		"s-3201-1000-111-0": [{ type: "text", message: "Back Wave" }],
		// "s-3201-1000-112-0": [{ type: "text", message: "Left + Right" }],
		"s-3201-1000-113-0": [{ type: "text", message: "Jump (Slow)" },
			{ type: "text", delay: 1500, message: "Pull" }],
		"s-3201-1000-118-0": [{ type: "text", message: "Jump P (Slow)" },
			{ type: "text", delay: 1500, message: "Pull" }],
		"s-3201-1000-119-0": [{ type: "text", delay: 1000, message: "Back + Front" }],
		// "s-3201-1000-121-0": [{ type: "text", position:"tank", message: "Right" }],
		// "s-3201-1000-122-0": [{ type: "text", position:"tank", message: "Left" }],
		"s-3201-1000-124-0": [{ type: "text", position: "tank", message: "Stun attack" }],
		"s-3201-1000-127-0": [{ type: "text", position: "dps", message: "Back" },
			{ type: "text", position: "healer", message: "Back" }],
		// "s-3201-1000-128-0": [{ type: "text", position:"tank", message: "Triple Attack" }],
		"s-3201-1000-131-0": [{ type: "text", position: "dps", message: "Back Wave" },
			{ type: "text", position: "healer", message: "Back Wave" }],
		// "s-3201-1000-132-0": [{ type: "text", message: "Left + Right" }],
		"s-3201-1000-133-0": [{ type: "text", delay: 500, message: "Jump (Fast)" }],
		"s-3201-1000-138-0": [{ type: "text", delay: 500, message: "Jump P (Fast)" }],
		"s-3201-1000-139-0": [{ type: "text", message: "Back + Front (Fast)" }],
		// "s-3201-1000-141-0": [{ type: "text", position:"tank" }],
		// "s-3201-1000-142-0": [{ type: "text", position:"tank" }],
		"s-3201-1000-143-0": [{ type: "text", position: "tank", message: "Left > Right" },
			{ type: "text", position: "dps", message: "Right > Left" },
			{ type: "text", position: "healer", message: "Right > Left" },
			{ type: "spawn", function: "marker", args: [false, 150, 300, 2715, true, null] }, // 1
			{ type: "spawn", function: "marker", args: [false, 225, 300, 4175, true, null], delay: 2800 }, // 6
			{ type: "spawn", function: "marker", args: [false, 30, 300, 1000, true, null] }, // 1
			{ type: "spawn", function: "marker", args: [false, 330, 300, 5000, true, null], delay: 1100 }], // 7
		"s-3201-1000-145-0": [{ type: "text", position: "tank", message: "Left > Right" },
			{ type: "text", position: "dps", message: "Right > Left" },
			{ type: "text", position: "healer", message: "Right > Left" },
			{ type: "spawn", function: "marker", args: [false, 30, 300, 1000, true, null] }, // 1
			{ type: "spawn", function: "marker", args: [false, 330, 300, 5000, true, null], delay: 1100 }, // 7
			{ type: "spawn", function: "marker", args: [false, 150, 300, 2000, true, null] }, // 1
			{ type: "spawn", function: "marker", args: [false, 225, 300, 5000, true, null], delay: 2500 }], // 6
		"s-3201-1000-148-0": [{ type: "text", message: "Right Hand (Flying)" }],
		"s-3201-1000-149-0": [{ type: "text", message: "Left Hand (Flying)" }],
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

		"h-3201-2000-99": [{ type: "function", function: secondboss_start_event }],
		"h-3201-2000-81": [{ type: "text", message: "80%" }],
		"h-3201-2000-76": [{ type: "text", message: "75%" }],
		// "s-3201-2000-101-0": [{ type: "text", position:"tank", message: "right left" }],
		// "s-3201-2000-102-0": [{ type: "text", position:"tank", message: "left right" }],
		// "s-3201-2000-103-0": [{ type: "text", position:"tank", message: "spin" }],
		// "s-3201-2000-104-0": [{ type: "text", position:"tank", message: "right" }],
		// "s-3201-2000-105-0": [{ type: "text", position:"tank", message: "front" }],
		// "s-3201-2000-107-0": [{ type: "text", position:"tank", message: "left" }],
		"s-3201-2000-108-0": [{ type: "text", message: "Back Attack!" }],
		// "s-3201-2000-109-0": [{ type: "text", position:"tank", message: "quaternion Attack" }],
		// "s-3201-2000-110-0": [{ type: "text" }],
		// "s-3201-2000-114-0": [{ type: "text" }],
		// "s-3201-2000-116-0": [{ type: "text", message: "Back" }],
		"s-3201-2000-150-0": [{ type: "text", message: "Phantom" }],
		// "s-3201-2000-201-0": [{ type: "text", message: "back 8m" }],
		// "s-3201-2000-202-0": [{ type: "text", message: "front 8m" }],
		"s-3201-2000-203-0": [{ type: "function", function: skilld_event, args: [203] }],
		"s-3201-2000-204-0": [{ type: "function", function: skilld_event, args: [204] }],

		"am-3201-320126-32010224": [{ type: "text", message: "Next True" },
			{ type: "function", function: skilld_event, args: [32010224] }],
		"am-3201-2000-32010220": [{ type: "text", message: "Next False" },
			{ type: "function", function: skilld_event, args: [32010220] }],
		"ae-0-0-9203100": [{ type: "function", function: skilld_event, args: [9203100] }],
		// "s-3201-2000-211-0": [{ type: "text", message: "front" }],
		// "s-3201-2000-213-0": [{ type: "text", message: "back" }],
		// "s-3201-2000-226-0": [{ type: "text" }],
		"s-3201-2000-228-0": [{ type: "text", message: "Team up" },
			{ type: "text", delay: 3500, message: "Dodge" }],
		//	{ type: "text", delay: 3500, message: "Dodge" }
		//	{ type: "text", delay: 65000, message: "Dodge" },

		// "s-3201-2000-229-0": [{ type: "text", message: "3" }],
		"s-3201-2000-230-0": [{ type: "text", message: "AOE" }],
		"s-3201-2000-231-0": [{ type: "text", message: "Out Safe" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 3000] }],
		"s-3201-2000-232-0": [{ type: "text", message: "In Safe" },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 10, 300, 3000] },
			{ type: "spawn", function: "circle", args: [false, 553, 0, 0, 3, 1000, 3000] }],
		// "s-3201-2000-233-0": [{ type: "text", message: "5" }],
		"s-3201-2000-234-0": [{ type: "function", function: skilld_event, args: [234] }],
		// "s-3201-2000-235-0": [{ type: "text", message: "Debuffs" }]
		"s-3201-2000-236-0": [{ type: "text", message: "Counter" }]

		/* "s-3201-320115-203": [{ type: "spawn", function: "marker", args: [false, 0, 0, 3000, true, null] },
		{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 15, 125, 3000] }
	], 	// 	1王水晶位 */
		// 320124-------------302 301
	/* "s-3201-320120-204": [{ type: "spawn", function: "marker", args: [false, 0, 0, 1100, false, ["Бомба замедленного действия", "Бомба замедленного действия"]] },  //炸弹慢
		{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 15, 150, 1100] }],
	"s-3201-320120-205": [{ type: "spawn", function: "marker", args: [false, 0, 0, 1100, false, ["Бомба", "Бомба"]] },  //炸弹
		{ type: "spawn", function: "circle", args: [false, 445, 0, 0, 15, 150, 1100] }]*/
	};
};

exports.type = {
	es: false,
	sp: false
};
