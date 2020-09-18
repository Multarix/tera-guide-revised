const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const path = require("path");

module.exports = function TeraGuide(mod){
	const { player } = mod.require.library;

	// Extra stuff that we need
	const extras = {
		guides: [], // The list of guides that we have
		active_guide: false, // The current active guide, if it doesn't exist, it should be false
		lastLocation: 0, // The last location we were at
		verbose: false, // If the dungeon has been disabled
		spawning: true, // If the dungeon has object spawning disabled
		sp: false, // for sp guides
		es: false, // for es guides
		mobHP: {}, // Mob hps
		bonfire: false, // bonfire stuff
		entity: false // For using spawning inside of functions for guides
	};

	require(path.resolve(__dirname, "./modules/functions.js"))(mod, extras);

	const init = async () => {
		// Load the ids of the available guides
		const guideFiles = await readdir(path.resolve(__dirname, "./guides/"));
		for(const file of guideFiles){
			if(file.split(".").slice(-1)[0] !== "js") continue;
			const guideName = file.split(".")[0];
			extras.guides.push(guideName);

			// If the dungeon doesn't exist within the settings, we can add it, though we're missing it's name, we'll deal with that later.
			if(!mod.settings.dungeons[guideName]) mod.settings.dungeons[guideName] = { name: undefined, verbose: true, spawnObject: true };
			// We can however apply these 2 names
			if(guideName === "3020") mod.settings.dungeons[guideName].name = "Sea of Honor";
			if(guideName === "3030") mod.settings.dungeons[guideName].name = "Commander's Residence (Raid)";
		}

		// Load "game" events
		const gameFiles = await readdir(path.resolve(__dirname, "./events/game/"));
		for(const file of gameFiles){
			if(file.split(".").slice(-1)[0] !== "js") continue;
			try {
				const event = require(path.resolve(__dirname, `./events/game/${file}`));
				const eventName = file.split(".")[0];
				mod.game.on(eventName, event.bind(null, mod, extras));
				delete require.cache[require.resolve(path.resolve(__dirname, `./events/game/${file}`))];
			} catch (e){
				mod.error(`Unable to load "game" event ${file}: ${e}`);
			}
		}

		// Load "me" events
		const meFiles = await readdir(path.resolve(__dirname, "./events/me/"));
		for(const file of meFiles){
			if(file.split(".").slice(-1)[0] !== "js") continue;
			try {
				const event = require(path.resolve(__dirname, `./events/me/${file}`));
				const eventName = file.split(".")[0];
				mod.game.me.on(eventName, event.bind(null, mod, extras));
				delete require.cache[require.resolve(path.resolve(__dirname, `./events/me/${file}`))];
			} catch (e){
				mod.error(`Unable to load "me" event ${file}: ${e}`);
			}
		}

		// Load hooks
		const hookFiles = await readdir(path.resolve(__dirname, "./events/hooks/"));
		for(const file of hookFiles){
			if(file.split(".").slice(-1)[0] !== "js") continue;
			try {
				const hookFile = require(path.resolve(__dirname, `./events/hooks/${file}`));
				const hookName = file.split(".")[0];
				mod.hook(hookName, hookFile.version, {}, hookFile.func.bind(null, mod, extras));
				delete require.cache[require.resolve(path.resolve(__dirname, `./events/hooks/${file}`))];
			} catch (e){
				mod.error(`Unable to load "hook" ${file}: ${e}`);
			}
		}
	};
	init();

	// Honestly chat colors are unnessary but eh, fight me. I wanted this to look fancy.
	const cg = '</font><font color="#00ff00">'; // Green
	const cr = '</font><font color="#ff0000">'; // red
	const cw = '</font><font color="#ffffff">'; // white
	const cp = '</font><font color="#ae60ff">'; // Purple

	const cmd = mod.command;
	cmd.add("guide", { // Add chat commands to change mod settings
		"$none": () => {
			cmd.message(`Guide Settings:\n${cw}` +
				`Guide enabled: ${mod.settings.enabled ? cg : cr}${mod.settings.enabled}${cw}\n` +
				`TTS Enabled: ${mod.settings.tts ? cg : cr}${mod.settings.tts}${cw}\n` +
				`Notice Chat: ${mod.settings.notice ? cg : cr}${mod.settings.notice}`);
		},

		"toggle": () => { // Enable and disable the module
			mod.settings.enabled = !mod.settings.enabled;
			cmd.message(`Guide has been ${mod.settings.enabled ? cg : cr}${mod.settings.enabled ? "en" : "dis"}abled`);
		},

		"tts": () => { // Enable and disable tts
			mod.settings.tts = !mod.settings.tts;
			cmd.message(`TTS has been ${mod.settings.tts ? cg : cr}${mod.settings.tts ? "en" : "dis"}abled`);
		},

		"notice": () => { // Enable and disable whether or not the message is sent to party notices
			mod.settings.notice = !mod.settings.notice;
			cmd.message(`Send to notice chat has been ${mod.settings.notice ? cg : cr}${mod.settings.notice ? "en" : "dis"}abled`);
		},

		"verbose": (args) => { // Enable and disable a specific dungeon guide
			if(parseInt(args)) args = parseInt(args);
			if(isNaN(args)) return;
			let foundDungeon = false;
			for(const dungeon of mod.settings.dungeons){
				if(dungeon.id !== args) continue;
				foundDungeon = true;
				dungeon.verbose = !dungeon.verbose;
				return cmd.message(`Spawning objects in ${cp}${dungeon.name}${cw} has been ${dungeon.verbose ? cg : cr}${dungeon.verbose ? "en" : "dis"}abled`);
			}
			if(!foundDungeon) return cmd.message(`That dungeon doesn't seem to exist, please try again!`);
		},

		"objects": (args) => { // Enable and disable the spawning of objects inside a specific dungeon
			if(parseInt(args)) args = parseInt(args);
			if(isNaN(args)) return;
			let foundDungeon = false;
			for(const dungeon of mod.settings.dungeons){
				if(dungeon.id !== args) return;
				foundDungeon = true;
				dungeon.spawnObject = !dungeon.spawnObject;
				return cmd.message(`Spawning objects in ${cp}${dungeon.name}${cw} has been ${dungeon.spawnObject ? cg : cr}${dungeon.spawnObject ? "en" : "dis"}abled`);
			}
			if(!foundDungeon) return cmd.message(`That dungeon doesn't seem to exist, please try again!`);
		},

		"campfire": (args) => { // Spawn a bonfire because WHY WOULDN'T YOU WANT THIS???
			let type = 1;
			switch(args){
				case "normal":	type = 1; break;
				case "friend":
				case "friendly":
				case "santa": type = 6; break;
				case "blue": type = 8; break;
				case "purple": type = 9; break;
				case "sacrifice": type = 10; break;
				case "remove":
				case "despawn": type = -1; break;
				default: type = 1; break;
			}

			function despawnBonfire(){
				mod.send("S_DESPAWN_BONFIRE", 2, { gameId: 0xCEDE5683 });
				extras.bonfire = false;
				mod.command.message("Despawned the campfire");
			}

			if(type === -1){
				despawnBonfire();
			} else {
				if(extras.bonfire) despawnBonfire();
				spawnHandler({
					spawnType: "S_SPAWN_BONFIRE",
					spawnVersion: 2,
					despawnType: "S_DESPAWN_BONFIRE",
					despawnVersion: 2,
					bonfireType: type,
					bonfireID: 0xCEDE5683,
					duration: 600000,
					ent: {
						loc: player.loc
					}
				});
				extras.bonfire = true;
				mod.command.message("Spawned a campfire");
			}
		},

		"test": (args) => { // Test a key with the player as the target entity
			cmd.message(`Running event with key "${args}"`);
			eventHandler({ event: args, target: false, ent: player });
		}
	});

	this.destructor = async () => { // When the mod gets unloaded, clear all the timers & remove the chat command
		mod.clearAllTimeouts();
		mod.clearAllIntervals();
		cmd.remove("guide");
	};
};
