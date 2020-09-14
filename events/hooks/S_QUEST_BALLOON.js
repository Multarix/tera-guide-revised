exports.func = (mod, extras, evt) => {
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose) return;
	const { entity } = mod.require.library;

	const ent = entity["mobs"][evt.source.toString()];
	const res = /@monsterBehavior:(\d+)/g.exec(evt.message);

	if(!res || !ent) return;

	const qbKey = `qb-${ent.huntingZoneId}-${ent.templateId}-${res[1]}`;
	eventHandler({ event: qbKey, target: false });
};

exports.version = 1;
