module.exports = (mod, extras) => { // When we leave the game, clear all timers
	mod.clearAllTimeouts();
	mod.clearAllIntervals();
};
