exports.func = (mod, extras, evt) => {
	const handleAbnormals = require("../../modules/abnormals.js");
	return extras.handleAbnormals(mod, extras, evt);
};

exports.version = 4;
