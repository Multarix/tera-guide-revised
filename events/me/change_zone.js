const path = require("path");
/* eslint-disable */
const sp_guides = [
	3026, // Corrupted Skynest
	3126, // Corrupted Skynest (Hard)
	9050, // Rift's Edge (Hard)
	9054, // Bathysmal Rise (Hard)
	9044, // Bahaar's Sanctum
	9066, // Demon's Wheel
	9070, // Manglemire
	9750, // Rift's Edge
	9754, // Bathysmal Rise
	9781, // Velik's Sanctuary
	9916, // Sky Cruiser Endeavor (Hard)
	9920, // Antaroth's Abyss (Hard)
	9970, // Ruinous Manor (Hard)
	9981 // Velik's Sanctuary (Hard)
];
const es_guides = [
	3023, // Akalath Quarantine
	9000, // ???
	9759 // Forsaken Island (Hard)
];
	/* eslint-enable */

module.exports = (mod, extras, zone, quick) => {
	extras.bonfire = false;

	if(extras.lastLocation === zone) return; // if the zone is the same as the last one, return
	mod.clearAllTimeouts();
	mod.clearAllIntervals();

	if(extras.guides.includes(extras.lastLocation.toString())) extras.active_guide = false;

	extras.lastLocation = zone; // Set the last location to this current location
	if(!extras.guides.includes(zone.toString())) return extras.active_guide = false; // if the zone is not a dungeon, return

	const dungeon = mod.settings.dungeons[zone.toString()];
	extras.verbose = dungeon.verbose;
	extras.spawning = dungeon.spawnObject;

	// I feel like there is a better way to do this, but idk what it is.
	if(sp_guides.includes(zone)){ // skill 1000-3000
		extras.sp = true;
		extras.es = false;
	} else if(es_guides.includes(zone)){ // skill 100-200-3000
		extras.sp = false;
		extras.es = true;
	} else { // skill 100-200
		extras.sp = false;
		extras.es = false;
	}

	try { // Try loaidng the guide
		extras.active_guide = require(`../../guides/${zone}.js`)(mod, extras);
		delete require.cache[require.resolve(`../../guides/${zone}.js`)];
	} catch (e){ mod.error(e); }
	if(!extras.active_guide) return; // If the guide still doesn't exist, return
	extras.mobHP = {}; // Reset all mob HP

	// Honestly chat colors are unnessary but eh, fight me. I wanted this to look fancy.
	const cg = '</font><font color="#00ff00">'; // Green
	const cr = '</font><font color="#ff0000">'; // red
	const cw = '</font><font color="#ffffff">'; // white
	const cp = '</font><font color="#ae60ff">'; // Purple
	mod.command.message(`Entered ${cp}${dungeon.name}${cw} (${cp}${zone}${cw})!\n` +
		`Text-to-Speech: ${mod.settings.tts ? cg : cr}${mod.settings.tts}\n${cw}` +
		`Spawn Objects: ${dungeon.spawnObject ? cg : cr}${dungeon.spawnObject}\n${cw}` +
		`Verbose: ${dungeon.verbose ? cg : cr}${dungeon.verbose}\n`

	);
};
