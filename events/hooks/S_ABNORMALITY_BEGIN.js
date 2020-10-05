exports.func = (mod, extras, evt) => {
	const handleAbnormals = require("../../modules/abnormals.js");
	return handleAbnormals(mod, extras, evt);
};

exports.version = 4;
