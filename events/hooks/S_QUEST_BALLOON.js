exports.func = (mod, extras, evt) => {
	// Return if any of the below is false
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose) return;
	const { entity } = mod.require.library;

	const ent = entity["mobs"][evt.source.toString()];
	const res = /@monsterBehavior:(\d+)/g.exec(evt.message);
	if(!res || !ent) return;

	const qbKey = `qb-${ent.huntingZoneId}-${ent.templateId}-${res[1]}`;
	extras.eventHandler(mod, extras, { event: qbKey, target: false, ent: ent, color: "#fdff21" });
};

exports.version = 1;
