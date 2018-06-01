var Profile = require("./profile.js");

//2. Handle Http Get/ and Post/ route i.e. Home
function homeRoute(req, res){
	if(req.url === "/"){
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.write('Header\n'); 
		res.write('Body\n'); 
		res.end('Footer\n'); 
	}
	
	
}

//3. Handle Http Get/username route 
function userRoute(req, res){ 
	let userName = req.url.replace("/", " ");
	
	if (userName.length > 0 ){
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.write('Header\n'); 
		
		let studentProfile = new Profile(userName);
		studentProfile.on("end", function(profileJSON){
			let values ={
				avatarUrl: profileJSON.avatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges, 
				JavaScript: profileJSON.points.javaScript
			};
			res.write(values.username + ' has ' + values.badges + 'badges and' + values.javaScript + 'JavaScript points\n'); 
			res.end('Footer\n'); 
		});
		studentProfile.on("error", function(error){
			console.log(error.message);
			
		});
		
		res.end('Footer\n'); 
	}
}

//4. Function that handles the reading of files 

module.exports.home = homeRoute;
module.exports.user = userRoute;