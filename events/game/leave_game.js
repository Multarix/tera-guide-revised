module.exports = (mod, extras) => { // When we leave the game, clear all timers
	extras.despawnAll(mod, extras);
	mod.clearAllTimeouts();
	mod.clearAllIntervals();
};
