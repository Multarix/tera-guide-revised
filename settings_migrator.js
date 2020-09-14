"use strict";

const DefaultSettings = {
	"enabled": true,
	"notice": false,
	"spawnObject": true,
	"tts": true,
	"rate": 2,
	"dungeons": {}
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
