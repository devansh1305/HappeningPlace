/* addUser(userName,userPassword)  jasajs
   Takes two parameters input and stores them in the AWS DynamoDB
   Sample Request: addUser("Viswajeeet Balaji","HappeningPlace Password");
 */

var user_sign_up_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-signup";
var user_login_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-login";
var user_password_reset_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-password-reset";
var host_event_list_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-event-list";
var host_event_guest_list_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-event-guest-list";
var host_delete_event_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-delete-event";
var host_create_event_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-create-event";
var guest_remove_event_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/guest-remove-event";
var guest_join_event_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/guest-join-event";
var user_event_list_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-event-list"
var user_zipcode_endpoint ="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/zipcode"


var userLoggedIn;

function addUser(userName,userPassword,firstName,lastName,address_1,address_2,_city,_state,_zipcode,_usertags)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	var req = new XMLHttpRequest();
	req.open('POST',user_sign_up_endpoint);
	req.onreadystatechange = function(event)
	{
		if( this.readyState==4 && event.target.response==="true")
		{
			alert("Signed up successfully.");
			location.href = "index.html";
		}
		else if (this.readyState==4){
			console.log("Mostly gone. Username repeat");
		}
	};
	var parameters = {
	 username:userName,
	 password:userPassword,
	 firstname:firstName,
	 lastname:lastName,
	 address1:address_1,
	 address2:address_2,
	 city:_city,
	 state:_state,
	 zipcode:_zipcode,
	 usertags:_usertags
	}
	req.send(JSON.stringify(parameters));
}
function hostEventList()
{
	var req = new XMLHttpRequest();
	req.open('POST',host_event_list_endpoint);
	req.onreadystatechange = function(event)
	{
    if(this.readyState==4)
    {
     alert("Event Creation Successful");
		if(this.readyState==4)
		{
			alert("Event Creation Successful");
			loadHostEventList(JSON.parse(event.target.response));

		}
	};
	userName = lcoalStorage.getItem("username");
	var parameters = {
	 username:userName,
	}
	req.send(JSON.stringify(parameters));
}
}


function loadHostEventList(arr){

	var hostEventNames=arr;
	if(arr==null)
	{
		document.getElementById("eventList").innerHTML = "No events hosted";
		return;
	}
	var text = "";
	var i;
	for (i = 0; i < hostEventNames.length; i++) {
		text += "<button class=\"w3-button w3-theme-d5 \"  onclick=\" displayHostEventDetails('"+ hostEventNames[i]+"')\" >" + hostEventNames[i] + "</button><br><br>";
	}
	document.getElementById("eventList").innerHTML = text;

}

function eventmanager(){
	document.getElementById("createEvent").innerHTML = "<div class=\"w3-display-container w3-panel w3-theme-d3\" style=\"padding:0px;\">";
	document.getElementById("createEvent").innerHTML+="<input class=\"w3-input\" type=\"text\" placeholder=\"Event Name\" id=\"eventname\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Enter Date\" id=\"enterdate\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Enter Time\" id=\"entertime\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Enter Venue\" id=\"entervenue\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Enter zipcode\" id=\"enterzip\"><br><input class=\"w3-input\" type=\"text\" placeholder=\"Event Description\" id=\"description\"><br>";
	document.getElementById("createEvent").innerHTML += " <input class=\"w3-input\" type=\"text\" placeholder=\"Enter Tags\" id=\"tags\"><br><button type=\"button\" class=\"w3-button w3-theme-d1\" onclick=\"create()\">Create Event</button>&nbsp<button type=\"button\" class=\"w3-button w3-theme-d1\" onclick=\"cancel()\">Cancel</button></div>";
}

function myFunction(id) {
	var x = document.getElementById(id);
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
		x.previousElementSibling.className += " w3-theme-d1";
	} else {
		x.className = x.className.replace("w3-show", "");
		x.previousElementSibling.className =
			x.previousElementSibling.className.replace(" w3-theme-d1", "");
	}
}
function loadNearEventList(){

	var near_event_list;
	text="";
	for (i = 0; i <3; i++) {
		text += "<div class=\"w3-panel w3-theme-d4 w3-display-container w3-card\"><span onclick=\"this.parentElement.style.display='none'\"class=\"w3-button w3-theme-d1 w3-large w3-display-topright\">&times;</span><h3>Event Name</h3><p>Partytime</p></div>";
	}
	document.getElementById("nearEventList").innerHTML = text;

}


function hostguestlist(){
	var host_guest_list;
	text="";
	for (i = 0; i <3; i++) {
		text +="<div class=\"w3-bar-item w3-hover-white w3-button w3-card\">User Name</div>";
	}
	document.getElementById("hostEventGuestList").innerHTML = text;
}


function cancel()
{
	document.getElementById("createEvent").innerHTML = "";
}

function displayHostEventDetails(name){

	var text="<div class=\"w3-card w3-theme-d4\" style=\"padding-left:5%\"><h2>"+name+"</h2></div>";
	var text2="";
	var text4="";

	for(var i=0;i<3;i++){
		text2+=" <div class=\"w3-bar-item w3-hover-white w3-button w3-card-4 w3-medium w3-theme-d2\">"+name+"Task</div>";
		text4+=" <div class=\"w3-bar-item w3-hover-white w3-button w3-card-4\">"+name+"Name</div>";
	}

	var text3="<div class=\"w3-card w3-theme-d4\" style=\"padding-left:5%\"><h2>Contributors</h2></div>"

		document.getElementById("eventDetails").innerHTML = text+text2+text3+text4;


}
function create() {
	createE();
}


function createEvent(userName,event_Name,eventZipcode,eventLocation,time,description)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	var req = new XMLHttpRequest();
	req.open('POST',host_create_event_endpoint);
	req.onreadystatechange = function(event)
	{
		if(this.readyState==4)
		{
			console.log(event.target.response);
			alert("Event Creation Successful");
		}
	};
	var parameters = {
	 username:userName,
	 eventName:event_Name,
	 zipcode:eventZipcode,
	 event_location:eventLocation,
	 event_time:time,
	 desc: description,
	 tags: tags
	}
	req.send(JSON.stringify(parameters));
}

function getZip(){
	var req = new XMLHttpRequest();
	req.open('POST',user_zipcode_endpoint);
	req.onreadystatechange = function(event)
	{
		if(this.readyState==4)
			guestEventList(JSON.parse(event.target.response));
	};
	userName = localStorage.getItem("username");
	var params = {
username: userName
	}
	req.send(JSON.stringify(params));
}

function userLogin(username,password)
{
	var req = new XMLHttpRequest();
	req.open('POST',user_login_endpoint)
		req.onreadystatechange = function(event)
		{
			//console.log(event);
			if(event.target.responseText==='true' && this.readyState==4)
			{
				userLoggedIn = document.getElementById('username').value;
				localStorage.setItem("username",userLoggedIn);
				console.log(userLoggedIn);
				alert("Successful login");
				location.href="guest.html"

			}
			else if (this.readyState==4)
				alert("Invalid Credentials");
		};
	req.setRequestHeader('Content-Type','application/json');
	var params =
	{
userName : username,
	   password : password
	}
	req.send(JSON.stringify(params));

}

function renderUI(arr)
{
	console.log(arr);
	document.getElementById('results').innerHTML = "";
	if(arr!=null)
	{for(var i=0;i<arr.length;i++)
		{
			document.getElementById('results').innerHTML += "<div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\">1 min</span><h4>"+arr[i].name +" "+ arr[i].location+"</h4><br><hr class=\"w3-clear\"><p>Location: "+arr[i].location+"<br>Time: "+arr[i].time+"<br>ZipCode: "+arr[i].zipcode+"<br> Description:" + arr[i].desc+"</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div><button type=\"button\" class=\"w3-button w3-theme-d1 w3-margin-bottom\" onclick=\"joinEvent(" +arr[i].eventid+ ")\"><i class=\"fa fa-thumbs-up\"></i>  Going?</button><button type=\"button\" class=\"w3-button w3-theme-d2 w3-margin-bottom\">&nbsp<i class=\"fa fa-comment\"></i>  Share</button></div>";
		}
	}
}
function guestEventList(_zipcode)
{
	var req = new XMLHttpRequest();
	req.open('POST',user_event_list_endpoint);
	req.onreadystatechange = function(event)
	{
		if(this.readyState==4 && event.target.response!="[]")
		{
			renderUI(JSON.parse(event.target.response));
		}
		else if(this.readyState==4 && event.target.response=="[]")
		{
			alert("Sorry no events found for that zipcode.");
		}
	};
	var parameters = {
zip_code:_zipcode
	}
	req.send(JSON.stringify(parameters));
}
function retrieve()
{
	guestEventList(document.getElementById('zipcode').value);
}
function login()
{
	userLogin(document.getElementById('username').value,document.getElementById('password').value);
}


function joinEvent(eventID)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	userLoggedIn = localStorage.getItem("username");
	console.log(userLoggedIn.toString());
	console.log(eventID.toString());
	var req = new XMLHttpRequest();
	req.open('POST',guest_join_event_endpoint);
	req.onreadystatechange = function(event)
	{
		console.log(event.target.response);
		alert("Added to event")
	};
	console.log(eventID);
	var params = {
username: userLoggedIn.toString(),
	  event_id: eventID.toString()
	}
	req.send(JSON.stringify(params));
}

function join()
{
	//Implement code to get the events hosted by host
	joinEvent(document.getElementById(),userLoggedIn);
}

function retrieveHostEventList()
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  userName = localStorage.getItem("username");
  console.log(userName);
	var req = new XMLHttpRequest();
	req.open('POST',host_event_list_endpoint);
	req.onreadystatechange = function(event)
	{
    if(this.readyState==4)
    {
		    console.log(JSON.parse(event.target.response));
        loadHostEventList(JSON.parse(event.target.response));
    }

	};
	var params = {
username: userName
	}
	req.send(JSON.stringify(params));
}

function getH_EventList()
{
	//Implement code to get the events hosted by host
	retrieveHostEventList(localStorage.getItem("userName"));
}

function resetpassword(userName,userPassword,new_password,confirm_Password)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	if(new_password===confirm_Password)
	{
	}
	else {
		alert("New Password do not match")
			return;
	}
	var req = new XMLHttpRequest();
	req.open('POST',user_password_reset_endpoint);
	req.onreadystatechange = function(event)
	{
		if(this.readyState==4 && event.target.response==="true")
		{
			alert("Reset successful");
		}
		else if(this.readyState==4){
			alert("Invalid account");
		}
	};
	var params = {
username: userName,
	  password1: userPassword,
	  password2: new_password,
	  password3: confirm_Password
	}
	req.send(JSON.stringify(params));
}

function getValue()
{
	var x=document.getElementById("inte");
	// for (var i = 0; i < x.options.length; i++) {
	//    if(x.options[i].selected ==true){
	//         alert(x.options[i].selected);
	//     }
	// }
	return x;
}

function signup()
{
	var userInterestsArr = getValue();
	// for(var i = 0; i < userInterestsArr.length; i++) {
	// 	alert(userInterestsArr[i].options);
	// }
	var userInterestsArrStr = [];
	for(var i = 0; i < userInterestsArr.options.length; i++) {
		if(userInterestsArr.options[i].selected) {
			userInterestsArrStr.push(userInterestsArr.options[i].label);
		}
	}
	console.log(userInterestsArrStr);
	addUser(document.getElementById("inputEmail4").value,
			document.getElementById("inputPassword4").value,
			document.getElementById("inputFName").value,
			document.getElementById("inputLName").value,
			document.getElementById("inputAddress").value,
			document.getElementById("inputAddress2").value,
			document.getElementById("inputCity").value,
			document.getElementById("inputState").value,
			document.getElementById("inputZip").value,
			userInterestsArrStr
	       );
}

function reset()
{
	resetpassword(document.getElementById("inputEmail").value,
			document.getElementById("old_inputPassword").value,
			document.getElementById("new_inputPassword").value,
			document.getElementById("confirm_Password").value
			);

}

function createE()
{
	userLoggedIn = localStorage.getItem("username");
	createEvent(userLoggedIn, document.getElementById("eventname").value,
			document.getElementById("enterzip").value,
			document.getElementById("entervenue").value,
			document.getElementById("entertime").value,
			document.getElementById("description").value,
			document.getElementById('desc').value,
			document.getElementById('tags').value
	);

}
