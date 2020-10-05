module.exports = (mod, extras, evtData) => {
	const { library } = mod.require.library;

	const sendEvent = (type, version, obj) => {
		mod.send(type, version, obj);
	};

	if(evtData.spawnType !== "S_SPAWN_BONFIRE"){ // We want to be able to spawn bonfires anywhere no matter what
		if(!mod.settings.spawnObject || !extras.spawning) return;
		if(!evtData.id) return mod.error("No itemID was listed"); // Make sure id is defined
	}

	const spawnType = evtData.spawnType || "S_SPAWN_COLLECTION"; // Set spawnType to be collection as default for backward compatibility
	const spawnVersion = evtData.spawnVersion || 4;
	const despawnType = evtData.despawnType || "S_DESPAWN_COLLECTION";
	const despawnVersion = evtData.despawnVersion || 2;

	// The unique spawned id this item will be using.

	const uniqueIdent = evtData.force_gameId || extras.uint64--; // uint64 in js... what a pain
	mod.log(uniqueIdent);
	let loc = evtData.ent.loc.clone();

	if(evtData.pos) loc = evtData.pos; // if pos is set, we use that
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
