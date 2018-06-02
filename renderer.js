const fs = require("fs");

function mergeValues(values, content){
	for(key in values){
		content = content.replace("{"+ key +"}", values[key]);
	}
	return content; 
}

function view(templateName, values, res){
	let fileContents = fs.readFileSync("./views/" + templateName + ".html", {encoding: "utf8"});
	mergeValues(values, fileContents);
	console.log(fileContents.toString());
	//read from template file 
}

module.exports.view = view; 