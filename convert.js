// This file is used to (mostly) convert the guides from HSDN Tera guide into version that is usable by my guide.
// This file is uncommented as it's only intended for my usage
//
// DO NOT RELY ON THIS TO 100% CONVERT GUIDES
// UNLESS THE GUIDE IS VERY SIMPLE, IT WILL REQUIRE ADDITIONAL HUMAN MODIFICATION

const wait = require("util").promisify(setTimeout);

const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);

const replacer = async (content) => {
	const loadRemover = /module\.exports = {(\r\n|\r|\n)\s.*(\r\n|\r|\n).*(\r\n|\r|\n).*/;

	let modified = content;

	const convertToArray = /\.bind\(null, (.*?)\)/;
	let xa = convertToArray.exec(modified);
	while(xa){
		modified = modified.replace(xa[0], `, args: [${xa[1]}]`);
		xa = convertToArray.exec(modified);
	}

	const hRepl = /handlers\['text']\({(\n|\n\r|\r)\s+"sub_type": ".*?",(\n|\n\r|\r)\s+"message": "(.*?)",(\n|\n\r|\r)\s+"message_RU": ".*?"(\n|\n\r|\r)\s+}\)/; // Yikes lmfao
	let ya = hRepl.exec(modified);
	while(ya){
		modified = modified.replace(ya[0], `sendMessage("${ya[3]}")`);
		ya = hRepl.exec(modified);
	}

	const hRep2 = /handlers\['text']\({(\n|\n\r|\r)\s+"sub_type": ".*?",(\n|\n\r|\r)\s+"message_RU": ".*?",(\n|\n\r|\r)\s+"message": "(.*?)"(\n|\n\r|\r)\s+}\)/; // Yikes lmfao
	let qa = hRep2.exec(modified);
	while(qa){
		modified = modified.replace(qa[0], `sendMessage("${qa[4]}")`);
		qa = hRep2.exec(modified);
	}

	const handleRepl = /handlers\["text"\]\({ "sub_type": "message", ("delay": delay, )?"message": (".*?"), "message_RU": (".*?") }\);/;
	let za = handleRepl.exec(modified);
	while(za){
		modified = modified.replace(za[0], `sendMessage("${za[3]}")`);
		za = handleRepl.exec(modified);
	}

	modified = modified.replace(loadRemover, "module.exports = (mod, extras) => {\n\treturn {")
		.replace(/const {.*?} = require\("\.\.\/lib"\);/g, "")
		.replace("let player, entity, library, effect;", "")
		.replace(/dispatch/g, "mod")
		.replace(/, handlers, event, ent, mod/g, "")
		.replace(/"type": "text"/g, `type: "text"`)
		.replace(/"type": "spawn_func"/g, `type: "spawn"`)
		.replace(/"type": "func"/g, `type: "function"`)
		.replace(/"delay":/g, "delay:")
		.replace(/"func":/g, "function:")
		.replace(/"class_position":/g, "position:")
		.replace(/position: "heal"/g, `position: "healer"`)
		.replace(/function: "semicircle"/g, `function: "semi"`)
		.replace(/"message":/g, `message:`)
		.replace(/, "sub_type": ".*?"/g, "")
		.replace(/, "message_RU": ".*?"/g, "");


	const itemReplace = /"item", "args": \[(.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let item = itemReplace.exec(modified);
	while(item){
		if(parseInt(item[4]) > 150){
			modified = modified.replace(item[0], `"item", args: [${item[1]}, ${item[2]}, ${item[3]}, ${item[5]}], delay: ${item[4]}`);
		} else {
			modified = modified.replace(item[0], `"item", args: [${item[1]}, ${item[2]}, ${item[3]}, ${item[5]}]`);
		}
		item = itemReplace.exec(modified);
	}


	const markerReplace = /"marker", "args": \[(.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (\[?.*?\]?)\]/;
	let marker = markerReplace.exec(modified);
	while(marker){
		if(parseInt(marker[4]) > 150){
			modified = modified.replace(marker[0], `"marker", args: [${marker[1]}, ${marker[2]}, ${marker[3]}, ${marker[5]}, ${marker[6]}, ${marker[7]}], delay: ${marker[4]}`);
		} else {
			modified = modified.replace(marker[0], `"marker", args: [${marker[1]}, ${marker[2]}, ${marker[3]}, ${marker[5]}, ${marker[6]}, ${marker[7]}]`);
		}
		marker = markerReplace.exec(modified);
	}


	const pointReplace = /"point", "args": \[(.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let point = pointReplace.exec(modified);
	while(point){
		if(parseInt(point[4]) > 150){
			modified = modified.replace(point[0], `"point", args: [${point[1]}, ${point[2]}, ${point[4]}, ${point[5]}], delay: ${point[4]}`);
		} else {
			modified = modified.replace(point[0], `"point", args: [${point[1]}, ${point[2]}, ${point[3]}, ${point[5]}]`);
		}
		point = pointReplace.exec(modified);
	}


	const vectorReplace = /"vector", "args": \[(.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let vector = vectorReplace.exec(modified);
	while(vector){
		if(parseInt(vector[6]) > 150){
			modified = modified.replace(vector[0], `"vector", args: [${vector[1]}, ${vector[2]}, ${vector[4]}, ${vector[4]}, ${vector[5]}, ${vector[7]}], delay: ${vector[6]}`);
		} else {
			modified = modified.replace(vector[0], `"vector", args: [${vector[1]}, ${vector[2]}, ${vector[4]}, ${vector[4]}, ${vector[5]}, ${vector[7]}]`);
		}
		vector = vectorReplace.exec(modified);
	}


	const circleReplace = /"circle", "args": \[(.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let circle = circleReplace.exec(modified);
	while(circle){
		if(parseInt(circle[7]) > 150){
			modified = modified.replace(circle[0], `"circle", args: [${circle[1]}, ${circle[2]}, ${circle[3]}, ${circle[4]}, ${circle[5]}, ${circle[6]}, ${circle[8]}], delay: ${circle[7]}`);
		} else {
			modified = modified.replace(circle[0], `"circle", args: [${circle[1]}, ${circle[2]}, ${circle[3]}, ${circle[4]}, ${circle[5]}, ${circle[6]}, ${circle[8]}]`);
		}

		circle = circleReplace.exec(modified);
	}


	const semiReplace = /"semi", "args": \[(.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let semi = semiReplace.exec(modified);
	while(semi){
		if(parseInt(semi[8]) > 150){
			modified = modified.replace(semi[0], `"semi", args: [${semi[1]}, ${semi[2]}, ${semi[3]}, ${semi[4]}, ${semi[5]}, ${semi[6]}, ${semi[7]}, ${semi[9]}], delay: ${semi[8]}`);
		} else {
			modified = modified.replace(semi[0], `"semi", args: [${semi[1]}, ${semi[2]}, ${semi[3]}, ${semi[4]}, ${semi[5]}, ${semi[6]}, ${semi[7]}, ${semi[9]}]`);
		}
		semi = semiReplace.exec(modified);
	}

	modified += "\n};";
	return modified;
};

const convertStuff = async (f, content) => {
	const newData = await replacer(content);
	await fs.writeFileSync(`./guides/${f}`, newData);
	console.log(`Converted file ${f}`);
};

const init = async () => {
	console.log("Starting Conversion...");
	const guides = await readdir("./guides");
	console.log(`${guides.length} files detected in ./guides/`);

	const guideModied = guides.forEach(async (f) => {
		if(!f.endsWith(".js")) return;
		const content = fs.readFileSync(`./guides/${f}`, { encoding: 'utf8' });
		try {
			await convertStuff(f, content);
		} catch (e){ console.error(`Failed to read/ write file: ${f}\n${e}`); }
	});
	await guideModied;
};

init();
