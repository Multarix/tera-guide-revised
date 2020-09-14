"use strict";

const DefaultSettings = {
	"enabled": true,
	"notice": false,
	"spawnObject": true,
	"tts": true,
	"rate": 2,
	"dungeons": [{
		"id": 3020,
		"name": "Sea of Honor",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3023,
		"name": "Akalath Quarantine",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3026,
		"name": "Corrupted Skynest",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3027,
		"name": "Forbidden Arena",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3034,
		"name": "RK-9 Kennel (Hard)",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3101,
		"name": "Gossamer Vault",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3102,
		"name": "Draakon Arena",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3126,
		"name": "Corrupted Skynest (Hard)",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3201,
		"name": "Gossamer Vault (Hard)",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 3202,
		"name": "Draakon Arena (Hard)",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9044,
		"name": "Bahaar's Sanctum",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9053,
		"name": "Kezzel's Gorge",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9067,
		"name": "Demokron Factory (Hard)",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9720,
		"name": "Antaroth's Abyss",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9735,
		"name": "RK-9 Kennel",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9739,
		"name": "Red Refuge",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9781,
		"name": "Velik's Sanctuary",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9782,
		"name": "Grotto of Lost Souls",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9920,
		"name": "Antaroth's Abyss (Hard)",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9970,
		"name": "Ruinous Manor (Hard)",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9981,
		"name": "Velik's Sanctuary (Hard)",
		"verbose": true,
		"spawnObject": true
	},
	{
		"id": 9982,
		"name": "Grotto of Lost Souls (Hard)",
		"verbose": true,
		"spawnObject": true
	}]
};

module.exports = function MigrateSettings(from_ver, to_ver, settings){
	if(from_ver === undefined){
		// Migrate legacy config file
		return Object.assign(Object.assign({}, DefaultSettings), settings);
	} else if(from_ver === null){
		// No config file exists, use default settings
		return DefaultSettings;
	} else {
		// Migrate from older version (using the new system) to latest one
		if(from_ver + 1 < to_ver){
			// Recursively upgrade in one-version steps
			settings = MigrateSettings(from_ver, from_ver + 1, settings);

			setTimeout(function(){
				return MigrateSettings(from_ver + 1, to_ver, settings);
			}, 0);
		}
		// If we reach this point it's guaranteed that from_ver === to_ver - 1, so we can implement
		// a switch for each version step that upgrades to the next version. This enables us to
		// upgrade from any version to the latest version without additional effort!
		switch(to_ver){
			default:
				let oldsettings = settings; //eslint-disable-line
				settings = Object.assign(DefaultSettings, {});
				for(const option in settings){
					if(option == "lNotice" && oldsettings["notice"]) settings[option] = oldsettings["notice"];
					if(option == "gNotice" && oldsettings["systemNotice"]) settings[option] = oldsettings["systemNotice"];
				}
				for(const option in oldsettings){
					if(settings[option]){
						settings[option] = oldsettings[option];
					}
				}
				break;
		}
		return settings;
	}
};
