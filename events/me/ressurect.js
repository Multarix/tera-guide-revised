module.exports = (mod, extras) => {
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose) return;
	const { player } = mod.require.library;

	const eventKey = `ressurect`;
	return extras.eventHandler(mod, extras, { event: eventKey, target: false, ent: player, color: "#ff2121" });
};
