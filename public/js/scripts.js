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

					var accCreated = document.getElementById('accCreated').value = timeStartFormat(startObj);


				}// addInputFields function

				//i need back years, months and days
				function convertTime(milli) {
					//passing start date as argument
					//console.log(milli);
					//retrieve todays date on the fly
					var today = new Date().getTime();
					//console.log(today);

					//difference to find out how long's been
					var difDat = Math.abs(today - milli);
					//console.log(difDat);  //94822002356

					//one day in milliseconds
					var oneDay = 1000*60*60*24;

					var days = Math.ceil(difDat/oneDay);
					//console.log(days); //1098 days
					var duration = 0;
					var years = 0;
					var months = 0;
					
					for (var i=0; i < days; i++) {
						if (days >= 365) {
							years += 1;
							days -= 365;
							//years
							if (years != 0 && days > 30) {
								duration = (years + ' years');
								//console.log(duration);
								//console.log(days);
							}

							
							//months
							else if (days > 30) {
								months += 1;
								months -= 30;
							 	if (months != 0 && days > 0) {
									//console.log(duration);
									duration += (", and " + months + " months");
								}//if

							}
							//remaining days 
							else if (days > 0 && days < 30) {
									var remaining = days;
									//console.log(remaining);
									duration += (", and " + remaining + " days");
							}

						}//main if

					}//for loop

					//grab dom handle
					var accHowOld = document.getElementById('accHowOld');
					//return directly to input field
					return accHowOld.value = duration;
					




				}//convertTime function
				

				/*-------------------------------------------------------------------------------
				to find out how old the account is. First i need the time the account was created
				to be converted to a date object and then subtracted from todays time.
				Milliseconds difference used to calculate the time
				---------------------------------------------------------------------------------
				*/

				//get time account was created
				var startDat = (resData.created_at);
				//convert string to date object and use methods to get year and month
				var startObj = new Date(startDat);

				//pass startObj to function timeStartFormat and call it
				timeStartFormat(startObj);


				function timeStartFormat(start) {

					var yesterday = start
					//console.log(yesterday);

					var month = yesterday.getMonth();
					var year = yesterday.getFullYear();



					switch(month) {

						case 0:
							return 'January'   + " / " + year;
							break;
						case 1:
							return 'February'  + " / " + year;
							break;
						case 2:
							return 'March'     + " / " + year;
							break;
						case 3:
							return 'April'     + " / " + year;
							break;
						case 4:
							return 'May'       + " / " + year;
							break;
						case 5:
							return 'June'      + " / " + year;
							break;
						case 6:
							return 'July'      + " / " + year;
							break;
						case 7:
							return 'August'    + " / " + year;
							break;
						case 8:
							return 'September' + " / " + year;
							break;
						case 9:
							return 'October'   + " / " + year;
							break;
						case 10:
							return 'November'  + " / " + year;
							break;
						case 11:
							return 'December'  + " / " + year;
							break;
							

					}//switch

				}//timeToStart function

				
				//convert startTime from object to milliseconds in order to use function
				startMilli = startObj.getTime();
				//console.log(startObj);
				convertTime(startMilli);


				//load avatar image
				loadAvatar();
				//add input fields data
				addInputFields();
				

			}//if readystate 4 & status 200	


		};//http.onreadystatechange

httpReq.send();

}//dataload




document.addEventListener('DOMContentLoaded', dataload, false);
