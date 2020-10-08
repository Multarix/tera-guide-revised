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
		verbose: null, // If the dungeon has been disabled
		spawning: true, // If the dungeon has object spawning disabled
		sp: null, // for sp guides
		es: null, // for es guides
		mobHP: {}, // Mob hps
		bonfire: false, // bonfire stuff
		entity: false, // For using spawning inside of functions for guides
		uint64: 0xFFFFFFFA,
		spawnHandler: require(path.resolve(__dirname, "./modules/spawnHandler.js")),
		sendMessage: require(path.resolve(__dirname, "./modules/sendMessage.js")),
		eventHandler: require(path.resolve(__dirname, "./modules/eventHandler.js")),
		debug: { // Debug object for debugging stuff later
			abnormal: false,
			skill: false,
			hp: false,
			message: false,
			quest: false
		},
		hookData: {
			hooks: {}, // An object that contains all our hook information
			hookArray: [],
			loaded: false, // If the hooks are currently loaded
			load: function(){ // For loading hooks
				if(this.loaded || this.hookArray.length) return;
				for(let h in this.hooks){
					h = this.hooks[h];
					this.hookArray.push(mod.hook(h.name, h.vers, h.func.bind(null, mod, extras)));
				}
				this.loaded = true;
			},
			unload: function(){ // For unloading hooks
				if(!this.loaded || !this.hookArray.length) return;
				for(const h of this.hookArray){
					mod.unhook(h);
				}
				this.hookArray = [];
				this.loaded = false;
			}
		}
	};

	const init = async () => {
		// Load the ids of the available guides
		const guideFiles = await readdir(path.resolve(__dirname, "./guides/"));
		for(const file of guideFiles){
			if(!file.endsWith(".js")) continue;
			const guideName = file.split(".")[0];
			extras.guides.push(guideName);

			// If the dungeon doesn't exist within the settings, we can add it, though we're missing it's name, we'll deal with that in just a second.
			if(!mod.settings.dungeons[guideName]) mod.settings.dungeons[guideName] = { name: undefined, verbose: true, spawnObject: true };
			// We can however apply these 2 names
			if(guideName === "3020") mod.settings.dungeons[guideName].name = "Sea of Honor";
			if(guideName === "3030") mod.settings.dungeons[guideName].name = "Commander's Residence";
		}

		// Grab a list of dungeon names, and apply them to settings
		let allDungeons;
		const dungeons = new Map();
		try {
			const resOne = await mod.queryData("/EventMatching/EventGroup/Event@type=?", ["Dungeon"], true, true, ["id"]);
			allDungeons = resOne.map(e => {
				const zoneId = e.children.find(x => x.name == "TargetList").children.find(x => x.name == "Target").attributes.id;
				let dungeon = dungeons.get(zoneId);
				if(!dungeon){
					dungeon = { id: zoneId, name: "" };
					dungeons.set(zoneId, dungeon);
				}
				return dungeon;
			});

			const resTwo = await mod.queryData("/StrSheet_Dungeon/String@id=?", [[... dungeons.keys()]], true);
			for(const res of resTwo){
				const id = res.attributes.id.toString();
				const name = res.attributes.string.toString();
				if(!mod.settings.dungeons[id]) continue;
				mod.settings.dungeons[id].name = name;
			}
		} catch (e){
			mod.warn(`Unable to get the list of dungeon names, some dungeons may be named "undefined"`);
		}

		// Load "game" events
		const gameFiles = await readdir(path.resolve(__dirname, "./events/game/"));
		for(const file of gameFiles){
			if(!file.endsWith(".js")) continue;
			try {
				const event = require(path.resolve(__dirname, `./events/game/${file}`));
				const eventName = file.split(".")[0];
				mod.game.on(eventName, event.bind(null, mod, extras));
				delete require.cache[require.resolve(path.resolve(__dirname, `./events/game/${file}`))];
			} catch (e){
				mod.error(`Unable to load "game" event ${file}:\n${e}`);
			}
		}

		// Load hooks
		const hookFiles = await readdir(path.resolve(__dirname, "./events/hooks/"));
		for(const file of hookFiles){
			if(!file.endsWith(".js")) continue;
			try {
				const hookFile = require(path.resolve(__dirname, `./events/hooks/${file}`));
				const hookName = file.split(".")[0];
				extras.hookData.hooks[hookName] = {
					name: hookName,
					vers: hookFile.version,
					func: hookFile.func
				};
				delete require.cache[require.resolve(path.resolve(__dirname, `./events/hooks/${file}`))];
			} catch (e){
				mod.error(`Unable to load "hook" ${file}:\n${e}`);
			}
		}

		// Load "me" events
		const meFiles = await readdir(path.resolve(__dirname, "./events/me/"));
		for(const file of meFiles){
			if(!file.endsWith(".js")) continue;
			try {
				const event = require(path.resolve(__dirname, `./events/me/${file}`));
				const eventName = file.split(".")[0];
				mod.game.me.on(eventName, event.bind(null, mod, extras));
				delete require.cache[require.resolve(path.resolve(__dirname, `./events/me/${file}`))];
			} catch (e){
				mod.error(`Unable to load "me" event ${file}:\n${e}`);
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

		"help": () => { // Enable and disable the module
			cmd.message(`Guide Commands:\n${cw}` +
				`Toggle - Enables and disables the guide\n` +
				`Notice -\n` +
				`TTS - Enables and disables Text-To-Speach\n` +
				`Notice - Enables and disables sending messages to notice chat\n` +
				`Verbose - Enables and disables a specific dungeon guide\n` +
				`Objects - Enables and disables spawning objects in a dungeon\n` +
				`Debug - Enables and disables debugging of skills, abnormals etc\n` +
				`Test - Allows you to test event keys`);
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

		"debug": (args) => { // Enable and disable key debugging messages
			const argsSplit = args.split(" ");
			const subCommand = argsSplit[0];
			if(!subCommand){
				cmd.message(`Debugging Settings:\n` +
					`</font><font color="#e05555">Abnormals: ${extras.debug.abnormal ? cg : cr}${extras.debug.abnormal ? "en" : "dis"}abled\n` +
					`</font><font color="#e0cd55">Boss Skills: ${extras.debug.skill ? cg : cr}${extras.debug.skill ? "en" : "dis"}abled\n` +
					`</font><font color="#9357de">Boss HP: ${extras.debug.hp ? cg : cr}${extras.debug.hp ? "en" : "dis"}abled\n` +
					`</font><font color="#c74cb2">Dungeon Message: ${extras.debug.message ? cg : cr}${extras.debug.message ? "en" : "dis"}abled\n` +
					`</font><font color="#4cc1c7">Quest Balloons: ${extras.debug.quest ? cg : cr}${extras.debug.quest ? "en" : "dis"}abled`);
			}
			switch(subCommand){
				case "abnormal":
				case "abnormals":
					extras.debug.abnormal = !extras.debug.abnormal;
					cmd.message(`Abnormal debugging has been ${extras.debug.abnormal ? cg : cr}${extras.debug.abnormal ? "en" : "dis"}abled`);
					break;
				case "skill":
				case "skills":
					extras.debug.skill = !extras.debug.skill;
					cmd.message(`Mob skill debugging has been ${extras.debug.skill ? cg : cr}${extras.debug.skill ? "en" : "dis"}abled`);
					break;
				case "hp":
					extras.debug.hp = !extras.debug.hp;
					cmd.message(`Mob HP debugging has been ${extras.debug.hp ? cg : cr}${extras.debug.hp ? "en" : "dis"}abled`);
					break;
				case "dm":
					extras.debug.message = !extras.debug.message;
					cmd.message(`Dungeon message debugging has been ${extras.debug.message ? cg : cr}${extras.debug.message ? "en" : "dis"}abled`);
					break;
				case "qb":
					extras.debug.quest = !extras.debug.quest;
					cmd.message(`Quest balloon debugging has been ${extras.debug.quest ? cg : cr}${extras.debug.quest ? "en" : "dis"}abled`);
					break;
				default:
					cmd.message(`${subCommand} is not a valid debugging type.`);
			}
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
				extras.spawnHandler(mod, extras, {
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
			extras.eventHandler(mod, extras, { event: args, target: false, ent: player });
		}
	});

	this.destructor = async () => { // When the mod gets unloaded
		mod.clearAllTimeouts(); // Clear all timers
		mod.clearAllIntervals();
		cmd.remove("guide"); // Remove chat command
		delete require.cache[require.resolve(path.resolve(__dirname, "./modules/spawnHandler.js"))]; // Remove the spawnHandler requirement
		delete require.cache[require.resolve(path.resolve(__dirname, "./modules/sendMessage.js"))]; // Remove the sendMessage requirement
		delete require.cache[require.resolve(path.resolve(__dirname, "./modules/eventHandler.js"))]; // Remove the eventHandler requirement
		extras.hookData.unload(); // Attempt unloading all hooks
	};
};
