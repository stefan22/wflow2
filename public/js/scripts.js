var httpReq = new XMLHttpRequest();
var user_url = "stefan22";

httpReq.open('GET', 'https://api.github.com/users/' + user_url);

httpReq.onload = function() {
	//console.log(httpReq.responseText);
	var resData = JSON.parse(httpReq.responseText);
	console.log(resData);


	var output = document.getElementById('output');
	output.style.marginTop = "7em";
	output.style.padding = "1em";
	output.style.minHeight = "90px";
	output.style.backgroundColor = "#ffffff";
	output.style.borderRadius = "4px";

	

	//grab image
	var usr_avatar = resData.avatar_url;
	
	output.innerHTML = "<img style='max-width:200px;max-height:200px;margin:0 auto 15px;' src=" + usr_avatar +  "/>";
	output.innerHTML += "<p>Account type: " + resData.type + "</p>";
	output.innerHTML += "<p>User name: " + resData.name + "</p>";
	output.innerHTML += "<p>Public repos: " + resData.public_repos + "</p>";
	output.innerHTML += "<p>Location: " + resData.location + "</p>";
	output.innerHTML += "<p>Followers " + resData.followers + "</p>";
	output.innerHTML += "<p>Following " + resData.following + "</p>";






};

httpReq.send();




			