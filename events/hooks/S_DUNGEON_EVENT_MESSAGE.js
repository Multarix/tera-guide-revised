exports.func = (mod, extras, evt) => {
	// Return if any of the below is false
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose) return;

	const result = /@dungeon:(\d+)/g.exec(evt.message);
	let msgKey = false;
	if(!result[1]) return;

	msgKey = `dm-0-0-${result[1]}`;
	return eventHandler({ event: msgKey, target: false, ent: { huntingZoneId: 0, templateId: 0 }, color: "#c74cb2" });
};

exports.version = 2;
