module.exports = (mod, extras) => {
	const { player, entity, library, effect } = mod.require.library; // Require the library module

	let voice = null;
	try { voice = require('../voice'); } catch (e){
		mod.log(e);
		voice = null;
	} // Check if the voice lib is available

	// Yes this is prototype pollution, yes it's not a good idea, yes I'm going to do it anyway.
	String.prototype.toProperCase = function(){
		return this.replace(/([^\W_]+[^\s-]*) */g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
	};

	// Check if the class matches the class position
	function positionCheck(position){
		const tanks = [1, 10]; // Tanks (Lancer + Brawler)
		const dps = [2, 3, 4, 5, 8, 9, 11, 12]; // DPS (not counting warrior)
		const healers = [6, 7]; // Healers (Priest & Mystic)
		const warrior = {	tank: 100201, dps: 100103	};

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
					if(effect.hasAbnormality(warrior.dps)) return false; // If we have the DPS abnormality return false
					if(effect.hasAbnormality(warrior.tank)) return true; // If we have the Tank abnormality return true
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
			case "mystic": // For Mystic specific actions (idk what mystic can do that priest can't, I'm a priest main)
				if(player.job === 7) return true;
				break;
			case "lancer": // For Lancer specific actions (eg Blue Shield)
				if(player.job === 1) return true;
				break;
			default:
				mod.warn(`Failed to find class position: ${position}`);
				break;
		}
		return true; // All checks failed, assume the position isn't valid, send to everyone
	}

	// Determine where to send messages
	global.sendMessage = (msg) => {
		if(mod.settings.notice && mod.game.me.party.inParty()){ // If in a party, and the notice setting is on, send to party notice
			mod.send('S_CHAT', 3, {
				channel: 21,
				message: msg,
				name: "Multarix"
			});
		}
		// Big message on screen
		mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
			type: 31,
			chat: false,
			channel: 27,
			message: msg
		});
		if(mod.settings.tts && voice) voice.speak(msg, mod.settings.rate);
	};

	const checkTarget = (obj, data) => {
		if(!obj.targeted) return true; // If target isn't specified, assume it's for everyone
		if(data.target.toString() === mod.game.me.gameId.toString()) return true; // If the target is us, return true
		return false; // Target isn't us
	};

	const handleEvent = (obj, data) => { // Determine the type, and run w/e action it requires
		let delay = false;
		if(obj.delay){ // Check if a delay is required
			delay = parseInt(obj.delay);
			if(isNaN(delay)) delay = false;// ;
		}

		const doAction = () => { // A function so we don't have to write this crap out twice
			if(obj.type === "function"){ // If the type is a function, try running the function
				// try {	obj.function();	} catch (e){ mod.error(e); }
				return;
			}
			if(obj.type === "text") return sendMessage(obj.message);
			return mod.warn(`The key "${data.attack}" does not have a proper function, skipping it.`);
		};

		if(delay){ mod.setTimeout(doAction, delay);	} else { doAction(); }
	};

	global.eventHandler = (data) => {
		if(!extras.active_guide[data.event]) return;
		const attackKeyData = extras.active_guide[data.event];
		for(const obj of attackKeyData){
			if(positionCheck(obj.position) && checkTarget(obj, data)) handleEvent(obj, data);
		}
	};

};
