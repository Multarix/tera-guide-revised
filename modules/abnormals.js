module.exports = (mod, extras, evt) => {
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose) return;

	const { player, entity } = mod.require.library;

	if(!evt.source) evt.source = 0; // Apparently this is needed for abnormal refresh?

	const target = entity["mobs"][evt.target.toString()]; // If the boss/mob get"s a abnormality applied to it
	const source_ent = entity["mobs"][evt.source.toString()]; // If the boss/mob is the cause for the abnormality

	let abnType = "";
	let entai = {};

	abnormalType:{
		if(player.isMe(evt.target) && source_ent){ // If the mob/boss applies an abnormality to me
			abnType = "am";
			entai = source_ent;
			break abnormalType;
		}

		if(player.isMe(evt.target) && (evt.source || 0) == 0){ // If "nothing"/server applies an abnormality to me
			abnType = "ae";
			entai = player;
			break abnormalType;
		}

		if(target){ // If it"s a mob/boss getting an abnormality applied to itself
			abnType = "ab";
			entai = target;
			break abnormalType;
		}
	}
	if(!abnType) return;

	const abnormalKey = `${abnType}-${(abnType === "ae") ? 0 : entai.huntingZoneId}-${(abnType === "ae") ? 0 : entai.templateId}-${evt.id}`;
	extras.eventHandler(mod, extras, { event: abnormalKey, target: false, ent: entai, color: "#55e07a" });
};
