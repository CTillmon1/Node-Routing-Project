var Profile = require("./profile.js");
var renderer = require("./renderer.js")

//2. Handle Http Get/ and Post/ route i.e. Home
function homeRoute(req, res){
	if(req.url === "/"){
		res.writeHead(200, {'Content-Type':'text/plain'});
		renderer.view('header',{},res); 
		renderer.view('search',{},res);  
		renderer.view('footer',{},res); 
	}
	
	
}

//3. Handle Http Get/username route 
function userRoute(req, res){ 
	let userName = req.url.replace("/", " ");
	
	if (userName.length > 0 ){
		res.writeHead(200, {'Content-Type':'text/plain'});
		renderer.view('header',{},res); 
		
		let studentProfile = new Profile(userName);
		studentProfile.on("end", function(profileJSON){
			let values ={
				avatarUrl: profileJSON.avatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges, 
				JavaScript: profileJSON.points.javaScript
			};
			renderer.view('profile',values,res); 
			renderer.view('footer',{},res); 
		});
		studentProfile.on("error", function(error){
			console.log(error.message);
			renderer.view('error',{errorMessage: error.message},res); 
			renderer.view('search',{},res); 
			renderer.view('footer',{},res); 
		});
		
	}
}

//4. Function that handles the reading of files 

module.exports.home = homeRoute;
module.exports.user = userRoute;