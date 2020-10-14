const DefaultSettings = {
	"enabled": true,
	"notice": false,
	"spawnObject": true,
	"tts": true,
	"rate": 2,
	"gender": "male",
	"dungeons": {}
};

module.exports = function MigrateSettings(oldVersion, targetVersion, oldSettings){
	let updatedSettings = oldSettings;
	if(!oldVersion){ // We have no config file, and legeacy config file checking is pointless for this module, so just give a default settings file if the old version doesn't exist
		return DefaultSettings;
	} else {
		oldVersion = parseFloat(oldVersion);
		targetVersion = parseFloat(targetVersion);

		if(oldVersion < targetVersion){ // If the old version is smaller than the target version
			oldVersion += 0.1;	// Add 0.1 to the old version so we know which version we're upgrading to

			updatedSettings = Object.assign(DefaultSettings, {}); // This is our new settings

			/* Seeing as there has been no major settings upgrades, this part is commented out for now, but remains as an example
			switch(oldVersion){
				// We can simply make use of case fallthroughs for instant upgrades without need for repetition by removing breaks,
				// simply setting oldVersion to the current highest version at the end... I swear most js module devs don't know about this
				case 1.1:
					console.log("Example Config version 1.2");
					// Upgrade config from 1.1 to 1.2 here
					oldVersion = 1.1;

					// falls through
				case 1.2:
					console.log("Example Config version 1.3");
					// Upgrade config from 1.2 to 1.3 here
					oldVersion = 1.2;

					// falls through
				case 1.3:
					console.log("Example Config version 1.4");
					// Upgrade config from 1.3 to 1.4 here
					oldVersion = 1.3;

					// falls through
				case 1.4:
					console.log("Example Config version 1.5");
					// Upgrade config from 1.4 to 1.5 here
					oldVersion = 1.4;
					break;
				default: break;
			}
			*/

			for(const item of oldSettings){ // If any of the keys in the old settings are the same as the keys in the new settings, apply them to the new settings
				if(updatedSettings[item]){
					updatedSettings[item] = oldSettings[item];
				}
			}
		}
	}
	return updatedSettings; // Once we reach here, we know that oldVersion >= targetVersion and should now be ready for use!
};
