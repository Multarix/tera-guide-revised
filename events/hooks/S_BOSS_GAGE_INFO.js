exports.func = (mod, extras, evt) => {
	// Return if any of the below is false
	if(!mod.settings.enabled || !extras.active_guide || !extras.verbose) return;

	const { entity } = mod.require.library; // Honestly, I still have no idea what this does, it's not my code
	const ent = entity["mobs"][evt.id.toString()];
	if(!ent) return; // I had random errors appear when I didn't do this, still no idea what library does

	const hp = Math.floor(Number(evt.curHp) / Number(evt.maxHp) * 100); // Get the HP percentage
	const mobKey = `${ent.huntingZoneId}-${ent.templateId}`;

	if(extras.mobHP[mobKey] === hp) return; // If the HP percentage is already the same, return
	extras.mobHP[mobKey] = hp; // Otherwise set the hp percentage and send event

	const hpKey = `h-${mobKey}-${hp}`;
	return extras.eventHandler({ event: hpKey, target: false, ent: ent, color: "#9357de" });
};

exports.version = 3;
