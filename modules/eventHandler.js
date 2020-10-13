module.exports = (mod, extras, data) => {
	const { player, effect } = mod.require.library; // Require the library module
	const { spawn } = require("../lib");

	function positionCheck(position){
		const tanks = [1, 10]; // Tanks (Lancer + Brawler)
		const dps = [2, 3, 4, 5, 8, 9, 11, 12]; // DPS (not counting warrior)
		const healers = [6, 7]; // Healers (Priest & Mystic)
		const warrior = { tank: 100201, dps: 100103 };

		if(!position) return true; // if it's not defined we assume that it's for everyone

		if(Array.isArray(position)){ // If it's an array
			for(const pos of position){
				if(!positionCheck(pos)) continue; // If the position check fails, go to next iteration
				return true; // One of the position checks succeeded, return true
			}
		}
		switch(position){
			case "tank": // If we're a tank, return true
				if(player.job === 0){ // If we're a warrior
					if(effect.hasAbnormality(warrior.tank)) return true; // If we have the Tank abnormality return true
					if(effect.hasAbnormality(warrior.dps)) return false; // If we have the DPS abnormality return false
					return false; // We have no stance, lets assume we're a dps
				}
				if(tanks.includes(player.job)) return true; // If we're a tank return true
				break;
			case "dps": // if it's a dps return true
				if(player.job === 0){ // If we're a warrior
					if(effect.hasAbnormality(warrior.dps)) return true; // If we have the DPS abnormality return true
					if(effect.hasAbnormality(warrior.tank)) return false; // If we have the Tank abnormality return false
					return true; // We have no stance, lets assume we're a dps
				}
				if(dps.includes(player.job)) return true;
				break;
			case "healer": // If we're a healer return true
				if(healers.includes(player.job)) return true;
				break;
			case "priest": // For Priest specific actions (eg Arise)
				if(player.job === 6) return true;
				break;
			case "mystic": // For Mystic specific actions (idfk what mystic can do that priest can't, I'm a priest main)
				if(player.job === 7) return true;
				break;
			case "lancer": // For Lancer specific actions (eg Blue Shield)
				if(player.job === 1) return true;
				break;
			default:
				mod.warn(`Failed to find class position: ${position}`);
				break;
		}
		return false; // All checks failed, return false
	}


	const checkTarget = (obj, data) => {
		if(!obj.targeted) return true; // If target isn't specified, assume it's for everyone
		if(data.target.toString() === mod.game.me.gameId.toString()) return true; // If the target is us, return true
		return false; // Target isn't us
	};


	const doAction = (obj, data) => { // A function so we don't have to write this crap out twice
		if(obj.type === "text") return extras.sendMessage(mod, obj.message);
		if(obj.type === "function"){ // If the type is a function, try running the function
			extras.entity = data.ent || extras.entity;
			try {
				(obj.args) ? obj.function(...obj.args) : obj.function();
			} catch (e){ mod.error(e); }
			return;
		}

		if(obj.type === "spawn"){
			if(!mod.settings.spawnObject || !extras.spawning) return;
			extras.entity = data.ent || extras.entity;

			// Make sure func and args is defined
			if(!obj.function) return mod.error(`Spawning objects needs a type of spawning function! (${data.event})`);
			if(!obj.args) return mod.error(`Spawning objects requires arguments! (${data.evemt})`);

			const spawnEvent = new spawn(mod, extras);
			try {
				spawnEvent[obj.function](...obj.args);
			} catch (e){
				mod.error(e);
			}
			return;
		}
		return mod.warn(`The key "${data.event}" does not have a proper function, skipping it.`);
	};


	const runEvent = (obj, data) => { // Determine the type, and run w/e action it requires
		let delay = false;
		if(obj.delay){ // Check if a delay is required
			delay = parseInt(obj.delay);
			if(isNaN(delay)) delay = false;
		}
		if(delay){ mod.setTimeout(doAction, delay, obj, data);	} else { doAction(obj, data); }
	};


	const debugFunc = (key, color) => {
		const type = key.split("-")[0];
		const cw = '</font><font color="#ffffff">';
		switch(type){
			case "am":
			case "ae":
			case "ab":
				if(extras.debug.abnormal) return mod.command.message(`${cw}Abnormal event: '</font><font color="${color}">${key}${cw}'`);
				break;
			case "s":
				if(extras.debug.skill) return mod.command.message(`${cw}Skill event: '</font><font color="${color}">${key}${cw}'`);
				break;
			case "h":
				if(extras.debug.hp) return mod.command.message(`${cw}HP event: '</font><font color="${color}">${key}${cw}'`);
				break;
			case "dm":
				if(extras.debug.message) return mod.command.message(`${cw}Dungeon-Message event: '</font><font color="${color}">${key}${cw}'`);
				break;
			case "qb":
				if(extras.debug.quest) return mod.command.message(`${cw}Quest-Balloon Event: '</font><font color="${color}">${key}${cw}'`);
				break;
			default:
				return;
		}
	};


	let attackKeyData = data;
	if(data.event){
		debugFunc(data.event, data.color);
		if(!extras.active_guide[data.event]) return;
		attackKeyData = extras.active_guide[data.event];
	}

	for(const obj of attackKeyData){
		if(positionCheck(obj.position) && checkTarget(obj, data)) runEvent(obj, data);
	}
};
