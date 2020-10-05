module.exports = (mod, extras, evt) => {
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose) return;

	const { player, entity } = mod.require.library;

	if(!evt.source) evt.source = "0n"; // Apparently this is needed for abnormal refresh?

	const target = entity["mobs"][evt.target.toString()]; // If the boss/mob get"s a abnormality applied to it
	const sauce = entity["mobs"][evt.source.toString()]; // If the boss/mob is the cause for the abnormality

	if(!target && !sauce) return;

	let abnType = "";
	let entai = {};

	abnormalType:{
		if(sauce && player.isMe(evt.target)){ // If the mob/boss applies an abnormality to me
			abnType = "am";
			entai = sauce;
			break abnormalType;
		}

		if(player.isMe(evt.target) && (evt.source || 0) == 0){ // If "nothing"/server applies an abnormality to me
			abnType = "ae";
			entai = { huntingZoneId: 0, templateId: 0 };
			break abnormalType;
		}

		if(target){ // If it"s a mob/boss getting an abnormality applied to itself
			abnType = "ab";
			entai = target;
			break abnormalType;
		}
	}
	if(!abnType) return;

	const abnormalKey = `${abnType}-${entai.huntingZoneId}-${entai.templateId}-${evt.id}`;
	extras.eventHandler(mod, extras, { event: abnormalKey, target: false, ent: entai, color: "#e05555" });
};
