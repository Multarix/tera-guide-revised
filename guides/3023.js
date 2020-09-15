// Akalath Quarantine
//
// made by michengs



const lastboss = false;
let player, entity, library, effect;
let	print = true;
let debuff = 0;
let timer1;
let timer2;
let timer3;
let timer4;
let timer5;
let counter = 0;

function skilld_event(skillid, handlers, event, ent, dispatch){
	if(skillid === 99020020){ // 死亡解除debuff
		debuff = 0;
		dispatch.clearTimeout(timer2);
		dispatch.clearTimeout(timer1);
	}
	if(skillid === 185){ // 死亡解除debuff
		dispatch.clearTimeout(timer5);
		timer5 = dispatch.setTimeout(()=> {
			handlers['text']({
				"sub_type": "message",
				"message": "Big jump soon",
				"message_RU": "Скоро прыжок!"
			});
		}, 110000);
	}

	if(skillid === 3119 || skillid === 3220){
		switch(skillid){
			case 3119: // red inside
				if(debuff === 1){
					handlers['text']({
						"sub_type": "message",
						"message": "OUT (blue)",
						"message_RU": "ОТ НЕГО"
					});
				} else if(debuff === 2){
					handlers['text']({
						"sub_type": "message",
						"message": "IN (red)",
						"message_RU": "К НЕМУ"
					});
				}
				break;
			case 3220: // blue inside
				if(debuff === 1){
					handlers['text']({
						"sub_type": "message",
						"message": "IN (blue)",
						"message_RU": "К НЕМУ"
					});
				} else if(debuff === 2){
					handlers['text']({
						"sub_type": "message",
						"message": "OUT (red)",
						"message_RU": "ОТ НЕГО"
					});
				}
				break;
			default:
				break;
		}
	}

	if([30231000, 1000].includes(skillid)){ // debuff为红色
		debuff = 1;
		dispatch.clearTimeout(timer1);
		dispatch.clearTimeout(timer2);
		timer1 = dispatch.setTimeout(()=> {
			/* handlers['text']({
				"sub_type": "message",
				"message": "!",
				"message_RU": "!"
			});*/
			debuff = 0;
		}, 70000);
	}
	if([30231001, 1001].includes(skillid)){ // debuff为蓝色
		debuff = 2;
		dispatch.clearTimeout(timer2);
		dispatch.clearTimeout(timer1);
		timer2 = dispatch.setTimeout(()=> {
			/* handlers['text']({
				"sub_type": "message",
				"message": "!",
				"message_RU": "!"
			});*/
			debuff = 0;
		}, 70000);
	}
	if([1113, 1114].includes(skillid)){ // 4连挥刀预判
		dispatch.clearTimeout(timer3);
		counter++;
		if(counter >= 4){
			dispatch.clearTimeout(timer4);
			/* timer4 = dispatch.setTimeout(()=> {
				handlers['text']({
					"sub_type": "message",
					"message": "4x slash",
					"message_RU": "4 полосы"
				});
			}, 70000);*/
		}
		timer3 = dispatch.setTimeout(()=> {
			counter = 0;
		}, 20000);
	}
}
function start_boss(){
	const print = true;
	debuff = 0;
}
function start_1boss80(handlers, event, ent, dispatch){
	if(print){
		handlers['text']({
			"sub_type": "message",
			"message": "80%",
			"message_RU": "80%"
		});
	}
	print = false;
	dispatch.setTimeout(() => print = true, 10000);
}

module.exports = (mod) => {
	return {

		// 1 BOSS
		"h-3023-1000-99": [{ "type": "function", "function": start_boss }],
		"h-3023-1000-80": [{ "type": "function", "function": start_1boss80 }],
		"s-3023-1000-104-0": [{ "type": "text", "message": 'Random Jump' }],
		"s-3023-1000-105-0": [{ "type": "text", "message": 'Back' }],
		"s-3023-1000-110-0": [{ "type": "text", "message": 'Stun' },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 175, 10, 260, 0, 6000] }],
		"s-3023-1000-111-0": [{ "type": "text", "message": 'Left Slash' },
			{ "type": "function", "function": spawn.vector, "args": [553, 270, 200, 180, 500, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 270, 200, 0, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 180, 500, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 300, 270, 200, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 180, 500, 270, 200, 0, 2000] }],
		"s-3023-1000-112-0": [{ "type": "text", "message": 'Right Slash' },
			{ "type": "function", "function": spawn.vector, "args": [553, 90, 200, 180, 500, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 90, 200, 0, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 180, 500, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 300, 90, 200, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 180, 500, 90, 200, 0, 2000] }],
		"s-3023-1000-113-0": [{ "type": "text", "message": 'Left Slash' },
			{ "type": "function", "function": skilld_event[1113] },
			{ "type": "function", "function": spawn.vector, "args": [553, 270, 200, 180, 500, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 270, 200, 0, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 180, 500, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 300, 270, 200, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 180, 500, 270, 200, 0, 2000] }],
		"s-3023-1000-114-0": [{ "type": "text", "message": 'Right Slash' },
			{ "type": "function", "function": skilld_event[1114] },
			{ "type": "function", "function": spawn.vector, "args": [553, 90, 200, 180, 500, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 90, 200, 0, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 180, 500, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 0, 0, 300, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 0, 300, 90, 200, 0, 2000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 180, 500, 90, 200, 0, 2000] }],
		"s-3023-1000-115-0": [{ "type": "text", "message": 'Back Attack' },
			{ "type": "function", "function": spawn.semi, "args": [90, 270, 553, 0, 0, 20, 160, 100, 2000] },
			{ "type": "function", "function": spawn.semi, "args": [90, 270, 553, 0, 0, 12, 220, 100, 2000] },
			{ "type": "function", "function": spawn.semi, "args": [90, 270, 553, 0, 0, 10, 300, 100, 2000] }],
		"s-3023-1000-116-0": [{ "type": "text", "message": 'Kaia/ Thrall of Protection' },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 8, 500, 0, 6000] }],
		"am-3023-1000-30231001": [{ "type": "function", "function": skilld_event[1001] }],
		"am-3023-1000-30231000": [{ "type": "function", "function": skilld_event[1000] }],
		"ae-0-0-99020020": [{ "type": "function", "function": skilld_event[99020020] }], // 复生
		"ae-0-0-30231000": [{ "type": "function", "function": skilld_event[30231000] }], // 开始红色
		"ae-0-0-30231001": [{ "type": "function", "function": skilld_event[30231001] }], // 开始蓝色
		"s-3023-1000-3107-0": [{ "type": "text", "message": 'Smash' },
			{ "type": "function", "function": spawn.vector, "args": [553, 90, 80, 10, 1000, 0, 4000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 270, 80, 350, 1000, 0, 4000] }],
		"s-3023-1000-3115-0": [{ "type": "text", "message": 'Spin' },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 10, 320, 0, 3500] }],
		"s-3023-1000-3116-0": [{ "type": "text", "message": 'Spin + Circles' },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 10, 320, 0, 5000] }],
		"s-3023-1000-3119-0": [{ "type": "function", "function": skilld_event[3119] },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 10, 270, 0, 4000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 8, 575, 0, 4000] }],
		"s-3023-1000-3220-0": [{ "type": "function", "function": skilld_event[3220] },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 10, 270, 0, 4000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 8, 575, 0, 4000] }],
		// "s-3023-1000-3223-0": [{"type": "text","sub_type": "message","message_RU": "Красный дебаф"}],

		// 2 BOSS
		"s-3023-2000-164-0": [{ "type": "text", "message": 'Counter attack (bleed)' }],
		"s-3023-2000-166-0": [{ "type": "text", "message": 'Turn-back' }],
		"s-3023-2000-175-0": [{ "type": "text", "message": 'Incoming Stun' },
			{ "type": "text", "delay": 1500, "message": 'Dodge' }],
		"s-3023-2000-178-0": [{ "type": "text", "message": 'Scratching (bleed)' }],
		"s-3023-2000-181-0": [{ "type": "text", "message": 'Rock Throw' },
			{ "type": "function", "function": spawn.vector, "args": [553, 90, 80, 10, 1000, 0, 4000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 270, 80, 350, 1000, 0, 4000] }],
		"s-3023-2000-182-0": [{ "type": "text", "message": 'Knock Down' }],
		"s-3023-2000-185-0": [{ "type": "text", "message": 'Kaia/Thrall of Protection' },
			{ "type": "function", "function": skilld_event[185] },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 10, 500, 0, 6000] },
			{ "type": "function", "function": spawn.circle, "args": [false, 553, 0, 0, 8, 750, 0, 6000] }],
		"s-3023-2000-202-0": [{ "type": "text", "message": 'Backstab' },
			{ "type": "function", "function": spawn.vector, "args": [553, 90, 80, 180, 500, 0, 3000] },
			{ "type": "function", "function": spawn.vector, "args": [553, 270, 80, 180, 500, 0, 3000] }],
		"s-3023-2000-207-0": [{ "type": "text", "message": 'Phantom x5 (bleed)' }],
		"s-3023-2000-212-0": [{ "type": "text", "message": 'Flash (bleed)' }]
	};

};
