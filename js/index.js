/* addUser(userName,userPassword)  jasajs
   Takes two parameters input and stores them in the AWS DynamoDB
   Sample Request: addUser("Viswajeeet Balaji","HappeningPlace Password");
 */

 /*
 TODO: Add all endpoints here
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

 var userLoggedIn;
 var glob_zip;

function addUser(userName,userPassword,firstName,lastName,address_1,address_2,_city,_state,_zipcode)
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
		zipcode:_zipcode
	}
	req.send(JSON.stringify(parameters));
}

function createEvent(userName,event_Name,eventZipcode,eventLocation,time)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	var req = new XMLHttpRequest();
	req.open('POST',host_create_event_endpoint);
	req.onreadystatechange = function(event)
	{
		console.log(event.target.response);
	};
	var parameters = {
		username:userName,
		eventName:event_Name,
		zipcode:eventZipcode,
		event_location:eventLocation,
		event_time:time
	}
	req.send(JSON.stringify(parameters));
}

function getZip(username){
	var req = new XMLHttpRequest();
	req.open('POST',user_password_reset_endpoint);
	req.onreadystatechange = function(event)
	{
		//console.log(event.target.response);
		glob_zip=event.target.response;
	};
	var params = {
		username: userName,
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
    	localStorage.itemname = document.getElementById('username').value;
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
	//getZip(username);
}

function renderUI(arr)
{
  console.log(arr);
  for(var i=0;i<arr.length;i++)
  {
    document.getElementById('results').innerHTML += "<div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\">1 min</span><h4>"+arr[i].name +" "+ arr[i].location+"</h4><br><hr class=\"w3-clear\"><p>Location: "+arr[i].location+"<br>Time: "+arr[i].time+"<br>ZipCode: "+arr[i].zipcode+"</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div><button type=\"button\" class=\"w3-button w3-theme-d1 w3-margin-bottom\" onclick=\"joinEvent(userLoggedIn,"+arr[i].eventid+")\"><i class=\"fa fa-thumbs-up\"></i>  Going?</button><button type=\"button\" class=\"w3-button w3-theme-d2 w3-margin-bottom\">&nbsp<i class=\"fa fa-comment\"></i>  Share</button></div>";
  }
}
function guestEventList(_zipcode)
{
  var req = new XMLHttpRequest();
	req.open('POST',user_event_list_endpoint);
	req.onreadystatechange = function(event)
	{
    if(this.readyState==4)
    {
		   renderUI(JSON.parse(event.target.response));
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
	var req = new XMLHttpRequest();
	req.open('POST',guest_join_event_endpoint);
	req.onreadystatechange = function(event)
	{
		console.log(event.target.response);
	};
  eventID = eventID.toString();
  console.log(eventID);
	var params = {
		username: userLoggedIn,
		event_id: eventID
	}
	req.send(JSON.stringify(params));
}

function join()
{
	//Implement code to get the events hosted by host
	joinEvent(document.getElementById(),userLoggedIn);
}

function retrieveHostEventList(userName)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	var req = new XMLHttpRequest();
	req.open('POST',host_event_list_endpoint);
	req.onreadystatechange = function(event)
	{
		console.log(event.target.response);
	};
	var params = {
		username: userName
	}
	req.send(JSON.stringify(params));
}

function getH_EventList()
{
	//Implement code to get the events hosted by host
	retrieveHostEventList();
}

function resetpassword(userName,userPassword,new_password,confirm_Password)
{
	// Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
	var req = new XMLHttpRequest();
	req.open('POST',user_password_reset_endpoint);
	req.onreadystatechange = function(event)
	{
		console.log(event.target.response);
	};
	var params = {
		username: userName,
		password1: userPassword,
		password2: new_password,
		password3: confirm_Password
	}
	req.send(JSON.stringify(params));
}

function signup()
{

	addUser(document.getElementById("inputEmail4").value,
					document.getElementById("inputPassword4").value,
					document.getElementById("inputFName").value,
					document.getElementById("inputLName").value,
					document.getElementById("inputAddress").value,
					document.getElementById("inputAddress2").value,
					document.getElementById("inputCity").value,
					document.getElementById("inputState").value,
					document.getElementById("inputZip").value
				  );
	//window.location.replace("login.html");
	// First parameter is username, last parameter is password
	// TODO get this from the front-end html using document.getElementByID and call this function
}

function reset()
{
	console.log("Hi");
	resetpassword(document.getElementById("inputEmail").value,
					document.getElementById("old_inputPassword").value,
					document.getElementById("new_inputPassword").value,
					document.getElementById("confirm_Password").value);
	//window.location.replace("login.html");
	// First parameter is username, last parameter is password
	// TODO get this from the front-end html using document.getElementByID and call this function
}

function createE()
{
	console.log("Hi");
	console.log(userLoggedIn);

	console.log(document.getElementById("eventname").value);
	console.log(document.getElementById("enterzip").value);
	console.log(document.getElementById("entervenue").value);
	userLoggedIn = localStorage.itemname;
	createEvent(userLoggedIn, document.getElementById("eventname").value,
					document.getElementById("enterzip").value,
					document.getElementById("entervenue").value,
					document.getElementById("entertime").value);
	//window.location.replace("login.html");
	// First parameter is username, last parameter is password
	// TODO get this from the front-end html using document.getElementByID and call this function
}
