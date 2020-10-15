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
	let modified = content;

	const handlerOne = /handlers\.text\({(\n\r|\n|\r)?(\s*)?sub_type: (.*?),(\n\r|\n|\r)?(\s*)?message: (.*?),(\n\r|\n|\r)?(\s*)?message_RU: (.*?)(\n\r|\n|\r)?(\s*)?}\)/;
	let hOne = handlerOne.exec(modified);
	while(hOne){
		modified = modified.replace(hOne[0], `extras.sendMessage(mod, ${hOne[6]})`);
		hOne = handlerOne.exec(modified);
	}
	const handlerTwo = /handlers\.text\({(\n\r|\n|\r)?(\s*)?sub_type: (.*?),(\n\r|\n|\r)?(\s*)?message_RU: (.*?),(\n\r|\n|\r)?(\s*)?message: (.*?)(\n\r|\n|\r)?(\s*)?}\)/;
	let hTwo = handlerTwo.exec(modified);
	while(hTwo){
		modified = modified.replace(hTwo[0], `extras.sendMessage(mod, ${hTwo[9]})`);
		hTwo = handlerTwo.exec(modified);
	}


	const esGuide = /guide.type = ES;/;
	let esGuideCheck = esGuide.exec(modified);
	while(esGuideCheck){
		modified = modified.replace(esGuideCheck[0], "");
		esGuideCheck = esGuide.exec(modified);
		modified += "\n\nexports.type = { es: true, sp: false };";
	}
	const spGuide = /guide.type = SP;/;
	let spGuideCheck = spGuide.exec(modified);
	while(spGuideCheck){
		modified = modified.replace(spGuideCheck[0], "");
		spGuideCheck = spGuide.exec(modified);
		modified += "\n\nexports.type = { es: false, sp: true };";
	}
	const typeMatcher = /(exports\.type = { es: true, sp: false };|exports\.type = { es: false, sp: true };)/;
	const spesCheck = typeMatcher.exec(modified);
	if(!spesCheck) modified += "\n\nexports.type = { es: false, sp: false };";


	modified = modified.replace(/module.exports = \(dispatch, handlers, guide, lang\) => {/g, "exports.guide = (mod, extras) => {")
		.replace(/type: "func"/g, `type: "function"`)
		.replace(/func:/g, `function:`)
		.replace(/, sub_type: ".*?"/g, "")
		.replace(/, message_RU: ".*?"/g, "")
		.replace(/class_position:/g, "position:")
		.replace(/dispatch/g, "mod")
		.replace(/position: "heal"/g, `position: "healer"`)
		.replace(/function: "marker"/g, `"function": "marker"`)
		.replace(/handlers\.event\(/g, `extras.eventHandler(`)
		.replace(/module.parent.exports.spawn;/g, `require("../lib.js);`);


	const itemReplace = /function: "item", args: \[(.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let item = itemReplace.exec(modified);
	while(item){
		if(parseInt(item[4]) > 0){
			modified = modified.replace(item[0], `function: "item", args: [${item[1]}, ${item[2]}, ${item[3]}, ${item[5]}], delay: ${item[4]}`);
		} else {
			modified = modified.replace(item[0], `function: "item", args: [${item[1]}, ${item[2]}, ${item[3]}, ${item[5]}]`);
		}
		item = itemReplace.exec(modified);
	}

	const markerReplace = /"function": "marker", args: \[(.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (\[?.*?\]?)\]/;
	let marker = markerReplace.exec(modified);
	while(marker){
		if(parseInt(marker[4]) > 0){
			modified = modified.replace(marker[0], `function: "marker", args: [${marker[1]}, ${marker[2]}, ${marker[3]}, ${marker[5]}, ${marker[6]}, ${marker[7]}], delay: ${marker[4]}`);
		} else {
			modified = modified.replace(marker[0], `function: "marker", args: [${marker[1]}, ${marker[2]}, ${marker[3]}, ${marker[5]}, ${marker[6]}, ${marker[7]}]`);
		}
		marker = markerReplace.exec(modified);
	}


	const pointReplace = /function: "point", args: \[(.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let point = pointReplace.exec(modified);
	while(point){
		if(parseInt(point[4]) > 0){
			modified = modified.replace(point[0], `function: "point", args: [${point[1]}, ${point[2]}, ${point[3]}, ${point[5]}], delay: ${point[4]}`);
		} else {
			modified = modified.replace(point[0], `function: "point", args: [${point[1]}, ${point[2]}, ${point[3]}, ${point[5]}]`);
		}
		point = pointReplace.exec(modified);
	}

	const vectorReplace = /function: "vector", args: \[(.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let vector = vectorReplace.exec(modified);
	while(vector){
		if(parseInt(vector[6]) > 0){
			modified = modified.replace(vector[0], `function: "vector", args: [${vector[1]}, ${vector[2]}, ${vector[3]}, ${vector[4]}, ${vector[5]}, ${vector[7]}], delay: ${vector[6]}`);
		} else {
			modified = modified.replace(vector[0], `function: "vector", args: [${vector[1]}, ${vector[2]}, ${vector[3]}, ${vector[4]}, ${vector[5]}, ${vector[7]}]`);
		}
		vector = vectorReplace.exec(modified);
	}

	const circleReplace = /function: "circle", args: \[(.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let circle = circleReplace.exec(modified);
	while(circle){
		if(parseInt(circle[7]) > 0){
			modified = modified.replace(circle[0], `function: "circle", args: [${circle[1]}, ${circle[2]}, ${circle[3]}, ${circle[4]}, ${circle[5]}, ${circle[6]}, ${circle[8]}], delay: ${circle[7]}`);
		} else {
			modified = modified.replace(circle[0], `function: "circle", args: [${circle[1]}, ${circle[2]}, ${circle[3]}, ${circle[4]}, ${circle[5]}, ${circle[6]}, ${circle[8]}]`);
		}

		circle = circleReplace.exec(modified);
	}

	const semiReplace = /function: "semicircle", args: \[(.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?), (.*?)\]/;
	let semi = semiReplace.exec(modified);
	while(semi){
		if(parseInt(semi[8]) > 0){
			modified = modified.replace(semi[0], `function: "semi", args: [${semi[1]}, ${semi[2]}, ${semi[3]}, ${semi[4]}, ${semi[5]}, ${semi[6]}, ${semi[7]}, ${semi[9]}], delay: ${semi[8]}`);
		} else {
			modified = modified.replace(semi[0], `function: "semi", args: [${semi[1]}, ${semi[2]}, ${semi[3]}, ${semi[4]}, ${semi[5]}, ${semi[6]}, ${semi[7]}, ${semi[9]}]`);
		}
		semi = semiReplace.exec(modified);
	}

	return modified;
};

const convertStuff = async (f, content) => {
	const newData = await replacer(content);
	await fs.writeFileSync(`./converted_guides/${f}`, newData);
	console.log(`Converted file ${f}`);
};

const init = async () => {
	console.log("Starting Conversion...");
	const guides = await readdir("./");
	console.log(`${guides.length} files detected`);

	const guideModied = guides.forEach(async (f) => {
		if(!f.endsWith(".js")) return;
		if(f === "convert.js") return;
		const content = fs.readFileSync(`./${f}`, { encoding: 'utf8' });
		try {
			await convertStuff(f, content);
		} catch (e){ console.error(`Failed to read/ write file: ${f}\n${e}`); }
	});
	await guideModied;
};

init();
