


function dataload() {
		
		//new xmlObject instance
		var httpReq = new XMLHttpRequest();

		//inner function globals
		var user_url = "stefan22";
		var repo_type = "javascript";

		//get data api
		httpReq.open('GET', 'https://api.github.com/users/' + user_url);

		httpReq.onreadystatechange = function() {

			if (httpReq.readyState == 4 && httpReq.status == 200)           {
				//console.log(httpReq.responseText);
				var resData = JSON.parse(httpReq.responseText);
				console.log(resData);

				function loadAvatar() {
					var output = document.getElementById('output');
					output.style.marginTop = ".5em";
					output.style.minHeight = "90px";
					output.style.outline = "1px groove #465780";
					//grab image
					var usr_avatar = resData.avatar_url;
					//console.log(usr_avatar);
					output.innerHTML = "<img src=" + usr_avatar + " style='margin:0 auto 15px; border-radius:4px;box-shadow:0px 1px 3px 1px rgba(0,0,0,.5);opacity:.9;'" 
					+ "/>";

				}//loadAvatar function

				function addInputFields() {
					//add number of repos to field 1
					var phone = document.getElementById('phone').value = resData.public_repos;
					
					//add name to name field:
					var gitname = document.getElementById('gitname').value = resData.name;
					// add account type
					var accType = document.getElementById('accType').value = resData.type;
					// add account location
					var accloc = document.getElementById('accloc').value = resData.location;
					// add user followers
					var followers = document.getElementById('followers').value = resData.followers;
				   	// add user following
					var following = document.getElementById('following').value = resData.following;
					// add user blog
					var blog = document.getElementById('blog').value = resData.blog;
					// add user url
					var url = document.getElementById('url').value = resData.html_url;

					var accCreated = document.getElementById('accCreated').value = startDat;


				}// addInputFields function


				function convertTime(milli) {

					var today = new Date().getTime();
					//console.log(today);
					var difDat = Math.abs(today - startObj);
					console.log(difDat);  //94698848067


					var seconds = (milli/1000).toFixed(1);
					var minutes = (milli/(1000*60)).toFixed(1);
					var hours = (milli/(1000*60*60)).toFixed(1);
					var days = (milli/1000*60*60*24).toFixed(1);

					if (seconds < 60) {
						console.log(seconds + "secs"); 
					} else if (minutes < 60) {
						console.log(minutes + "mins"); ;
					} else if (hours < 60) {
						console.log(hours + "hrs"); 
					} else {

						console.log(days + "days"); 
					}


				}//convertTime function
				

				/*-------------------------------------------------------------------------------
				to find out how old the account is. First i need the time the account was created
				to be converted to a date object and then subtracted from todays time.
				Milliseconds difference used to calculate the time
				---------------------------------------------------------------------------------
				*/

				//get time account was created
				var startDat = (resData.created_at);
				
				//convert string to date object and to miliseconds
				var startObj = new Date(startDat).getTime();
				//console.log(startObj);
				convertTime(startObj);


				//load avatar image
				loadAvatar();
				//add input fields data
				addInputFields();


				




				

			}//if readystate 4 & status 200	



		};//http.onreadystatechange

httpReq.send();




}//dataload











document.addEventListener('DOMContentLoaded', dataload, false);



	
	









			