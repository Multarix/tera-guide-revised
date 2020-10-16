module.exports = (mod, extras) => {
	if(!extras.spawnedObjects.size) return;
	for(const [key, value] of extras.spawnedObjects){
		mod.send(value.type, value.version, value.despawnEvent);
		mod.clearTimeout(value.timer);
		extras.spawnedObjects.delete(key);
	}
};
