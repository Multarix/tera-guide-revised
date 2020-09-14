module.exports = (mod, extras) => {
	console.log(`Logged in as ${mod.game.me.name}, a lvl ${mod.game.me.level}, ${mod.game.me.gender.toProperCase()} ${mod.game.me.race.toProperCase()} ${mod.game.me.class.toProperCase()}!`);
};
