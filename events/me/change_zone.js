const path = require("path");

module.exports = (mod, extras, zone, quick) => {
	extras.bonfire = false;

	if(extras.lastLocation === zone) return; // if the zone is the same as the last one, return
	extras.despawnAll(mod, extras);
	mod.clearAllTimeouts();
	mod.clearAllIntervals();
	extras.hookData.unload();

	if(extras.guides.includes(extras.lastLocation.toString())) extras.active_guide = false;

	extras.lastLocation = zone; // Set the last location to this current location
	if(extras.entity) extras.entity = false; // Set entity to false

	if(!extras.guides.includes(zone.toString())) return extras.active_guide = false; // if the zone is not a dungeon, return

	const dungeon = mod.settings.dungeons[zone.toString()];
	extras.verbose = dungeon.verbose;
	extras.spawning = dungeon.spawnObject;

	try { // Try loaidng the guide
		const guide = require(`../../guides/${zone}.js`);
		extras.active_guide = guide.guide(mod, extras);

		extras.sp = guide.type.sp;
		extras.es = guide.type.es;

		delete require.cache[require.resolve(`../../guides/${zone}.js`)];
	} catch (e){
		mod.error(e);
		mod.command.message(`${zone}.js could not be loaded, see the console for more details`);
	}
	if(!extras.active_guide) return; // If the guide still doesn't exist, return

	extras.mobHP = {}; // Reset all mob HP
	extras.hookData.load(); // Load all the hooks (hopefully)

	// Honestly chat colors are unnessary but eh, fight me. I wanted this to look fancy.
	const cg = '</font><font color="#00ff00">'; // Green
	const cr = '</font><font color="#ff0000">'; // red
	const cw = '</font><font color="#ffffff">'; // white
	const cp = '</font><font color="#ae60ff">'; // Purple
	mod.command.message(`${cw}Entered ${cp}${dungeon.name}${cw} (${cp}${zone}${cw})!\n` +
		`Text-to-Speech: ${mod.settings.tts ? cg : cr}${mod.settings.tts}\n${cw}` +
		`Object Spawning: ${dungeon.spawnObject ? cg : cr}${dungeon.spawnObject}\n${cw}` +
		`Verbose: ${dungeon.verbose ? cg : cr}${dungeon.verbose}\n`
	);
};
