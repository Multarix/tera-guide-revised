module.exports = (mod, msg) => {

	let voice = null; // Check if the voice lib is available
	try { voice = require('../voice'); } catch (e){
		mod.warn(e);
		voice = null;
	}

	const { player } = mod.require.library;
	if(mod.settings.notice && mod.game.me.party.inParty()){ // If in a party, and the notice setting is on, send to party notice
		mod.send('S_CHAT', 3, {
			channel: 21,
			message: msg,
			name: player.name
		});
	}
	// Big message on screen
	mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
		type: 31,
		chat: false,
		channel: 27,
		message: `</font><font color="#ffff00">${msg}`
	});

	if(voice && mod.settings.tts) voice.speak(msg, mod.settings.rate);
};
