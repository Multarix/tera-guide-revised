exports.func = (mod, extras, evt) => {
	// Return if any of the below is false
	if(!mod.settings.enabled || !evt.skill.npc || !extras.active_guide || !extras.verbose) return;

	let skillid = evt.skill.id % 1000;
	const eskillid = (evt.skill.id > 3000) ? evt.skill.id : evt.skill.id % 1000;
	skillid = (skillid === eskillid) ? skillid : eskillid; // This feels kinda cheaty

	const { entity } = mod.require.library; // Honestly, I still have no idea what this does, it's not my code
	const ent = entity["mobs"][evt.gameId.toString()];
	if(!ent) return; // I had random errors appear when I didn't do this, still no idea what library does
	const stage = `${evt.stage}`;

	const attackKey = `s-${ent.huntingZoneId}-${ent.templateId}-${skillid}${stage ? `-${stage}` : ""}`;
	return eventHandler({ event: attackKey, target: evt.target });
};

exports.version = 9;