module.exports = (mod, extras) => {
	const { player } = mod.require.library;

	const eventKey = `death`;
	return extras.eventHandler(mod, extras, { event: eventKey, target: false, ent: player, color: "#ff2121" });
};
