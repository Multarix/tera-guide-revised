exports.func = (mod, extras, evnt) => {
	// Return if any of the below is false
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose || !evnt.skill.npc) return;

	let skillid = evnt.skill.id % 1000;
	const eskillid = (evnt.skill.id > 3000) ? evnt.skill.id : evnt.skill.id % 1000;

	if(extras.sp) skillid = evnt.skill.id; // If the dungeon is an sp dungeon
	if(extras.es) skillid = eskillid; // If the dungeon is an es dungeon

	const { entity } = mod.require.library; // Honestly, I still have no idea what this does, it's not my code
	const ent = entity["mobs"][evnt.gameId.toString()];
	if(!ent) return; // I had random errors appear when I didn't do this, still no idea what library does

	evnt.loc.w = evnt.w;
	const entData = Object.assign({}, ent, evnt);

	const stage = `${evnt.stage}`;
	const attackKey = `s-${ent.huntingZoneId}-${ent.templateId}-${skillid}${stage ? `-${stage}` : ""}`;
	return extras.eventHandler(mod, extras, { event: attackKey, target: evnt.target, ent: entData, color: "#ff9121" });
};

exports.version = 9;
