module.exports = (mod, extras, evt) => {
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose) return;

	const { player, entity } = mod.require.library;

	if(!evt.source) evt.source = "0n"; // Apparently this is needed for abnormal refresh?

	const target = entity["mobs"][evt.target.toString()]; // If the boss/mob get"s a abnormality applied to it
	const sauce = entity["mobs"][evt.source.toString()]; // If the boss/mob is the cause for the abnormality

	let abnType = "";
	let entai = { huntingZoneId: 0, templateId: 0 };

	if(sauce && player.isMe(evt.target)){ // If the mob/boss applies an abnormality to me
		abnType = "am";
		entai = sauce;
	}

	if(player.isMe(evt.target) && (evt.source || 0) == 0){ // If "nothing"/server applies an abnormality to me
		abnType = "ae";
	}

	if(target){ // If it"s a mob/boss getting an abnormality applied to itself
		abnType = "ab";
		entai = target;
	}

	const abnormalKey = `${abnType}-${entai.huntingZoneId}-${entai.templateId}-${evt.id}`;
	eventHandler({ event: abnormalKey, target: false, ent: entai });
};
