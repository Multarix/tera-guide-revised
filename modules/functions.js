module.exports = (mod, extras) => {
	const { player, library, effect } = mod.require.library; // Require the library module
	const lib = require("../lib");
	const { spawn } = lib;

	let uint64 = 0xFFFFFFFA;

	const sendEvent = (type, version, obj) => {
		mod.send(type, version, obj);
	};


	global.spawnHandler = (evtData) => {
		if(evtData.spawnType !== "S_SPAWN_BONFIRE"){ // We want to be able to spawn bonfires anywhere no matter what
			if(!mod.settings.spawnObject || !extras.spawning) return;
			if(!evtData.id) return mod.error("No itemID was listed"); // Make sure id is defined
		}
		const spawnType = evtData.spawnType || "S_SPAWN_COLLECTION"; // Set spawnType to be collection as default for backward compatibility
		const spawnVersion = evtData.spawnVersion || 4;
		const despawnType = evtData.despawnType || "S_DESPAWN_COLLECTION";
		const despawnVersion = evtData.despawnVersion || 2;

		// The unique spawned id this item will be using.
		const uniqueIdent = evtData.force_gameId || uint64--; // uint64 in js... what a pain
		let loc = evtData.ent.loc.clone();

		if(evtData.pos) loc = evtData.pos; // if pos is set, we use that (as far as I can tell it's never set?)
		loc.w = (evtData.ent.loc.w || 0) + (evtData.offset || 0);
		library.applyDistance(loc, evtData.distance || 0, evtData.degrees || 0); // I have no idea how library works still
		let spawnEvent = {
			gameId: uniqueIdent,
			loc: loc,
			w: loc.w
		};
		let despawnEvent = {
			gameId: uniqueIdent,
			unk: 0, // used in S_DESPAWN_BUILD_OBJECT
			collected: false // used in S_DESPAWN_COLLECTION
		};
		// Create the sending event
		switch(spawnType){
			case "S_SPAWN_COLLECTION":
				Object.assign(spawnEvent, {
					id: evtData.id,
					amount: 1,
					extractor: false,
					extractorDisabled: false,
					extractorDisabledTime: 0
				});
				break;
			case "S_SPAWN_DROPITEM":
				Object.assign(spawnEvent, {
					item: evtData.id,
					amount: 1,
					expiry: 0,
					explode: false,
					masterwork: false,
					enchant: 0,
					debug: false,
					owners: []
				});
				break;
			case "S_SPAWN_BUILD_OBJECT":
				Object.assign(spawnEvent, {
					itemId: evtData.id,
					unk: 0,
					ownerName: evtData.ownerName || "SafeZone",
					message: evtData.message || "SafeZone"
				});
				break;
			// Because BONFIRES SON
			case "S_SPAWN_BONFIRE":
				spawnEvent = {
					gameId: evtData.bonfireID,
					id: evtData.bonfireType,
					loc: loc,
					status: 0
				};
				despawnEvent = {
					gameId: evtData.bonfireID
				};
				break;
			default:
				// spawnType broke apparently
				return mod.error(`Invalid spawnType for spawn handler: ${evtData.spawnType}`);
		}

		sendEvent(spawnType, spawnVersion, spawnEvent);
		mod.setTimeout(sendEvent, evtData.duration, despawnType, despawnVersion, despawnEvent);
	};

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
		return false; // All checks failed, return false
	}


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
				try {
					extras.entity = data.ent;
					obj.function(...obj.args);
				} catch (e){ mod.error(e); }
				return;
			}

			if(obj.type === "spawn"){
				if(!mod.settings.spawnObject || !extras.spawning) return;

				// Make sure func and args is defined
				if(!obj.function) return mod.error(`Spawning objects needs a type of spawning function! (${data.event})`);
				if(!obj.args) return mod.error(`Spawning objects requires arguments! (${data.evemt})`);

				const spawnEvent = new spawn(data.ent);
				try {
					spawnEvent[obj.function](...obj.args);
				} catch (e){
					mod.error(e);
				}
				return;
			}

			if(obj.type === "text") return sendMessage(obj.message);
			return mod.warn(`The key "${data.event}" does not have a proper function, skipping it.`);
		};

		if(delay){ mod.setTimeout(doAction, delay);	} else { doAction(); }
	};


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
			message: `</font><font color="#ffff00">${msg}`
		});
		if(mod.settings.tts && voice) voice.speak(msg, mod.settings.rate);
	};

	global.eventHandler = (data) => {
		if(!extras.active_guide[data.event]) return;
		const attackKeyData = extras.active_guide[data.event];
		for(const obj of attackKeyData){
			if(positionCheck(obj.position) && checkTarget(obj, data)) handleEvent(obj, data);
		}
	};
};
