/*Core Guest View Javascript File
 * @author Viswajeeet Balaji
 * @version 2.0
 * @date 21st Oct, 2018
 */


//date setting
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();


//Amazon Web Services API Gateway Endpoints
var user_sign_up_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-signup";
var user_login_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-login";
var user_password_reset_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-password-reset";
var guest_remove_event_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/guest-remove-event";
var guest_join_event_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/guest-join-event";
var user_event_list_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-event-list";
var user_event_history_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-event-history";
var guest_get_message_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-get-messages";
var user_details_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/get-user-profile";
var user_add_friend_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/add-friend";
var user_profile_access_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/profileaccess";
var user_friend_list_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-friend-list";
var user_share_event_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-share-event";
var user_shared_events_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/get-shared-events";
var user_send_host_message_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-send-host-message";
var user_set_rating_endpoint="https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-set-rating";
var event_get_user_rating_endpoint = "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-get-user-rating";
var starcount;


/* Function Lookup index
 * 1. Add user - Adds user to Database
 * 2. signup - Calls addUser and supplies details to it
 * 3. userLogin - Authenticates user login using Database
 * 4. login - Calls userLogin and supllies details to it
 * 5. resetPassword - Call
 * 6. reset - Calls resetPassword and supplies details to it
 * 7. createEvent - Adds the event to the events Database
 * 8. create - Calls creatEvent and supplies details to it
 * 9. guestEventList - Returns the list of events for a ZipCode
 * 10. retrieve  - Calls guestEventList and supllies details to it
 * 11. renderUI - Display the list of events to the user in UI
 * 12. getZip - Gets the event list for user's default zipcode
 * 13. joinEvent - Adds the username to the guest list for the event_time
 * 14. loadProfile - After successful login, the profile details to be displayed are updated
 * 15. getUserProfile - get details of a user through EMAIL ID and display them
 */


// Add Users to the Users Database
function addUser(userName, userPassword, firstName, lastName, address_1, address_2, _city, _state, _zipcode, _usertags) {
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  var req = new XMLHttpRequest();
  req.open('POST', user_sign_up_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response === "true") {
      alert("Signed up successfully.");
      location.href = "homepage.html";
    } else if (this.readyState == 4) {
      alert("Invalid details")
    }
  };
  var parameters = {
    username: userName,
    password: userPassword,
    firstname: firstName,
    lastname: lastName,
    address1: address_1,
    address2: address_2,
    city: _city,
    state: _state,
    zipcode: _zipcode,
    usertags: _usertags
  }
  req.send(JSON.stringify(parameters));
}

// Calls addUser - connects frontend to API Gateway
function signup() {

  //Get the user interest tags supplied by the user during sign up
  var userInterestsArr = document.getElementById("inte").value.split(/[,]+/);
  //Add user to the database
  addUser(document.getElementById("inputEmail4").value,
    document.getElementById("inputPassword4").value,
    document.getElementById("inputFName").value,
    document.getElementById("inputLName").value,
    document.getElementById("inputAddress").value,
    document.getElementById("inputAddress2").value,
    document.getElementById("inputCity").value,
    document.getElementById("inputState").value,
    document.getElementById("inputZip").value,
    userInterestsArr
  );
}

function userLogin(username, password) {
  var req = new XMLHttpRequest();
  req.open('POST', user_login_endpoint)
  req.onreadystatechange = function(event) {
    res = "";
    console.log(event.target.response);
    if (this.readyState == 4)
      res = JSON.parse(event.target.response);
    if (res.response === 'true' && this.readyState == 4) {
      localStorage.setItem("username", document.getElementById('username').value);
      localStorage.setItem("userDetails", event.target.response);
      alert("Successful login");
      location.href = "guest.html"
    } else if (this.readyState == 4) {
      alert("Invalid Credentials");
    }
  };
  req.setRequestHeader('Content-Type', 'application/json');
  var params = {
    userName: username,
    password: password
  }
  req.send(JSON.stringify(params));

}

function login() {
  if (document.getElementById('username').value != "" && document.getElementById('password').value != "") {
    userLogin(document.getElementById('username').value, document.getElementById('password').value);
  }
}

function resetpassword(userName, userPassword, new_password, confirm_Password) {
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  if (new_password != confirm_Password) {
    alert("New Password do not match")
    return;
  }
  var req = new XMLHttpRequest();
  req.open('POST', user_password_reset_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response === "true") {
      alert("Reset successful");
    } else if (this.readyState == 4) {
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

function reset() {
  resetpassword(document.getElementById("inputEmail").value,
    document.getElementById("old_inputPassword").value,
    document.getElementById("new_inputPassword").value,
    document.getElementById("confirm_Password").value
  );
}

function guestEventList() {
  var req = new XMLHttpRequest();
  req.open('POST', user_event_list_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response != "[]") {
      renderUI(JSON.parse(event.target.response), "blue");
    } else if (this.readyState == 4 && event.target.response == "[]") {
      document.getElementById("backgroundCard").className = "w3-card w3-container w3-red";
      document.getElementById('searchResults').innerHTML = "Sorry no events found";
    }
  };
  var parameters;
  document.getElementById('searchResults').innerHTML = "";
  document.getElementById("backgroundCard").className = "w3-card w3-container w3-red";
  document.getElementById('searchResults').innerHTML = "Sorry no events found";
  //console.log(document.getElementById('zipcodeInput').value == '' && document.getElementById('tagsInput').value == '');
  if (document.getElementById('zipcodeInput').value == '' && document.getElementById('tagsInput').value == '') {
    arr = JSON.parse(localStorage.getItem("userDetails"));
    //console.log(arr.zipcode);
    parameters = {
      zip_code: arr.zipcode,
      interest_tags: ""
    }
  } else {
    parameters = {
      zip_code: document.getElementById('zipcodeInput').value,
      interest_tags: document.getElementById('tagsInput').value
    }
  }
  req.send(JSON.stringify(parameters));
}

function renderUI(arr, color) {

  if (arr != null) {
    //console.log(arr);
    document.getElementById('searchResults').innerHTML = "";
    if (color != 'green') {
      document.getElementById("backgroundCard").className = "w3-card w3-container w3-red";
      document.getElementById('searchResults').innerHTML = "Sorry no events found";
    } else {
      document.getElementById("backgroundCard").className = "w3-card w3-container w3-green";
      document.getElementById('searchResults').innerHTML = "<label>You have not RSVP'ed any event yet<label>";
    }
    var flag = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != null) {
        document.getElementById("backgroundCard").className = "w3-card w3-container w3-" + color;



        if (flag == 0) {
          document.getElementById('searchResults').innerHTML = "";
          flag = 1;
        }
        if (color == 'blue') {
          // Searching for events
          document.getElementById('searchResults').innerHTML += "<div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\"></span><h4>" + arr[i].name + " " + arr[i].location + "</h4><br><hr class=\"w3-clear\"><p>Location: " + arr[i].location + "<br>Time: " + arr[i].time + "<br>ZipCode: " + arr[i].zipcode + "<br> Description:" + arr[i].desc + "</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div><button type=\"button\" class=\"w3-button w3-theme-d1 w3-margin-bottom\" onclick=\"joinEvent(" + arr[i].eventid + ")\"><i class=\"fa fa-thumbs-up\"></i>  Going?</button>";

        } else if (color == 'green') {
          //Displaying joined events
         


getEventRating(arr[i]);
/*
console.log(starcount);
var count=1;
for(;count<=starcount;count++){
 document.getElementById('searchResults').innerHTML += "<span class=\"fa fa-star checked\" onclick=\"setStar("+count+","+arr[i].eventid+","+arr[i].date +")\"></span>";
}
for(;count<6;count++){
 document.getElementById('searchResults').innerHTML += "<span class=\"fa fa-star\" onclick=\"setStar("+count+","+arr[i].eventid+","+arr[i].date +")\"></span>";
}

*/

     


        }
      }
    }
  }
}




function renderUIGuestEvent(arr, color) {

  if (arr != null) {
    //console.log(arr);
    document.getElementById('searchResults').innerHTML += "";
    if (color != 'green') {
      document.getElementById("backgroundCard").className = "w3-card w3-container w3-red";
      document.getElementById('searchResults').innerHTML = "Sorry no events found ";
    } else {
      document.getElementById("backgroundCard").className = "w3-card w3-container w3-green";
    }
    var flag = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != null) {
        document.getElementById("backgroundCard").className += "w3-card w3-container w3-" + color;


        if (flag == 0) {
          document.getElementById('searchResults').innerHTML += "";
          flag = 1;
        }
        if (color == 'blue') {
          document.getElementById('searchResults').innerHTML += "<div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\"></span><h4>" + arr[i].name + " " + arr[i].location + "</h4><br><hr class=\"w3-clear\"><p>Location: " + arr[i].location + "<br>Time: " + arr[i].time + "<br>ZipCode: " + arr[i].zipcode + "<br> Description:" + arr[i].desc + "</div>";
        } else if (color == 'green') {



          document.getElementById('searchResults').innerHTML += "<div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\"></span><h4>" + arr[i].name + " " + arr[i].location + "</h4><br><hr class=\"w3-clear\"><p>Location: " + arr[i].location + "<br>Time: " + arr[i].time + "<br>ZipCode: " + arr[i].zipcode + "<br> Description:" + arr[i].desc + "</div>";
        }
      }
    }
  }
}







function setStar(starNum,eventID,date){
 userLoggedIn = localStorage.getItem("username");
  var req = new XMLHttpRequest();
  req.open('POST', user_set_rating_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response == 'true') {
      console.log(event.target.response);
    }
  };
  console.log(eventID);
  var params = {
    username: userLoggedIn.toString(),
    event_id: eventID.toString(),
    event_rate: starNum.toString()
  }
  req.send(JSON.stringify(params));
}



function joinEvent(eventID) {
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  userLoggedIn = localStorage.getItem("username");
  var req = new XMLHttpRequest();
  req.open('POST', guest_join_event_endpoint);
  req.onreadystatechange = function(event) {

    if (this.readyState == 4 && event.target.response == 'true') {
      console.log(event.target.response);
      alert("Added to event")
    }
  };
  console.log(eventID);
  var params = {
    username: userLoggedIn.toString(),
    event_id: eventID.toString()
  }
  req.send(JSON.stringify(params));
}

function loadProfile() {
  //Tags updated
  arr = JSON.parse(localStorage.getItem("userDetails"));
  for (var i = 0; i < arr.interest_tags.length; i++) {
    document.getElementById("tags").innerHTML += "<span class=\"w3-tag w3-small w3-theme-l" + ((i % 5)) + "\">" + arr.interest_tags[i] + "</span> ";
  }
  searchEvents();
  guestEventList();
  setReminders();
  viewFriends()
  //Profile name
  document.getElementById("firstName").innerHTML = arr.firstname + "'s";
  document.getElementById("address1").innerHTML += arr.address1 + ", " + arr.address2 + ", " + arr.city;
  document.getElementById("email").innerHTML += arr.email;
  document.getElementById("profileState").innerHTML = '<i class="fa fa-search fa-fw w3-margin-right w3-text-theme"></i>' + localStorage.getItem("profileAccess");

  //Send Reminders
  //Function to loop through all events returned by  returnParticipatingEvents
  //If date is within 1 day of current date, then add the event name to
}

function returnParticipatingEvents() {
  userLoggedIn = localStorage.getItem("username");
  var req = new XMLHttpRequest();
  req.open('POST', user_event_history_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      return JSON.parse(event.target.response);
    }
  };
  var params = {
    username: userLoggedIn.toString()
  }
  req.send(JSON.stringify(params));
}

function viewParticipatingEvents() {
  userLoggedIn = localStorage.getItem("username");
  console.log(userLoggedIn);
  var req = new XMLHttpRequest();
  req.open('POST', user_event_history_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      document.getElementById("searchBar").innerHTML = '<div class="w3-card w3-round w3-white"><div class="w3-container w3-padding"><h3>My Event List</h3></div></div>';
      renderUI(JSON.parse(event.target.response), "green");
    }
  };
  var params = {
    username: userLoggedIn.toString()
  }
  req.send(JSON.stringify(params));
}
function viewGuestParticipatingEvents(email) {
  var req = new XMLHttpRequest();
  req.open('POST', user_event_history_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      renderUIGuestEvent(JSON.parse(event.target.response), "green");
    }
  };
  var params = {
    username: email
  }
  req.send(JSON.stringify(params));
}

function setReminders() {
  userLoggedIn = localStorage.getItem("username");
  var req = new XMLHttpRequest();
  req.open('POST', user_event_history_endpoint);
  req.onreadystatechange = function(event) {

    if (this.readyState == 4) {
      document.getElementById('notifications').innerHTML = "";
      arr = JSON.parse(event.target.response);
      for (var i in arr) {
        console.log(arr[i].date + "T" + arr[i].time);
        var eventTime = new Date(arr[i].date + "T" + arr[i].time + ':00');
        if (eventTime - (new Date) < 86400000) {
          document.getElementById('notifications').innerHTML += '<a href="#" class="w3-bar-item w3-button">' + arr[i].name + '</a>';
        }

      }
    }
  };
  var params = {
    username: localStorage.getItem("username")
  }
  req.send(JSON.stringify(params));
}

function cancelEvent(eventID) {
  var req = new XMLHttpRequest();
  req.open('POST', guest_remove_event_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response != 'false') {
      return JSON.parse(event.target.response);
    }
    viewParticipatingEvents();
  };
  event_id = eventID
  var params = {
    username: localStorage.getItem("username"),
    eventID: event_id
  };
  req.send(JSON.stringify(params));
}

function displayMessages() {
  document.getElementById("backgroundCard").className = "w3-card w3-container w3-yellow";
  document.getElementById("searchResults").innerHTML = "<h3>Your Messages</h3>"
  var req = new XMLHttpRequest();
  req.open('POST', guest_get_message_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response != 'false') {

      arr = JSON.parse(event.target.response);
      for (var i in arr.message_list)
        document.getElementById("searchResults").innerHTML += arr.message_list[i] + "<br>";

    }
  };
  var params = {
    username: localStorage.getItem("username")
  };
  req.send(JSON.stringify(params));
}

function searchFriend() {
  document.getElementById("searchBar").innerHTML = '<div class="w3-card w3-round w3-white"><div class="w3-container w3-padding"><h6 class="w3-opacity">Search for friends by username</h6><input contenteditable="true" class="w3-border w3-padding" placeholder="Enter username" id="friendUserName" default="0"></input><i> <br><br><button type="button" class="w3-button w3-theme" onclick="showFriend()"><i class="fa fa-pencil"></i> Retrieve</button></div></div>';
  document.getElementById("searchResults").innerHTML = "";
}

function searchEvents() {
  document.getElementById("searchBar").innerHTML = '<div class="w3-card w3-round w3-white"><div class="w3-container w3-padding"><h6 class="w3-opacity">Search for events</h6><input contenteditable="true" class="w3-border w3-padding" placeholder="Enter zipcode" id="zipcodeInput" default="0"></input><i> and/or </i><input contenteditable="true" class="w3-border w3-padding" placeholder="Enter tags" id="tagsInput"></input><br><br><button type="button" class="w3-button w3-theme" onclick="guestEventList()"><i class="fa fa-pencil"></i> Retrieve</button></div></div>';

  document.getElementById("searchResults").innerHTML = ""
}

function showFriend() {

  var friendName = document.getElementById('friendUserName').value;
  var req = new XMLHttpRequest();
  req.open("POST", user_details_endpoint);
  req.onreadystatechange = function(event) {

    if (this.readyState == 4) {
      arr = JSON.parse(event.target.response);
      if (arr.response == "true") {

        document.getElementById("searchResults").innerHTML = "Name: " + arr.firstname + "'s<br>";
        document.getElementById("searchResults").innerHTML += "Address: " + arr.address1 + ", " + arr.address2 + ", " + arr.city + "<br>";
        document.getElementById("searchResults").innerHTML += "Email: " + arr.email + "<br>Interests: ";
        for (var i = 0; i < arr.interest_tags.length; i++) {
          document.getElementById("searchResults").innerHTML += " <span class=\"w3-tag w3-small w3-theme-l" + ((i % 5)) + "\">" + arr.interest_tags[i] + "</span>&nbsp";
        }
        document.getElementById("backgroundCard").className = "w3-card w3-container w3-green";
        if (arr.email != localStorage.getItem("username"))
          document.getElementById("searchResults").innerHTML += "<br><br><button type=\"button\" class=\"w3-button w3-small w3-theme-d4\" onclick=\"addFriend(arr.email)\">&nbsp<i class=\"fa fa-user\"></i>&nbspAdd Friend</button>";

      } else {
        document.getElementById("backgroundCard").className = "w3-card w3-container w3-red";
        document.getElementById("searchResults").innerHTML = "User name associated with email not found or profile might be private";
      }
    }
  };
  var parameters = {
    username: friendName,
    check: "1"
  };
  req.send(JSON.stringify(parameters));
}




function showFriendClick(friendName) {

  var req = new XMLHttpRequest();
  req.open("POST", user_details_endpoint);
  req.onreadystatechange = function(event) {

    if (this.readyState == 4) {
      console.log(event.target.response);
      arr = JSON.parse(event.target.response);
      console.log("hi");
      if (arr.response == "true") {

        document.getElementById("friendProfile").innerHTML = "<div align=\"left\">Name : " + arr.firstname + "'s<hr>";
        document.getElementById("friendProfile").innerHTML += "Address : " + arr.address1 + "" + arr.address2 + ", " + arr.city + "<hr>";
        document.getElementById("friendProfile").innerHTML += "Email : " + arr.email + "<hr>Interests:";
        for (var i = 0; i < arr.interest_tags.length; i++) {
          document.getElementById("friendProfile").innerHTML += "<span class=\"w3-tag w3-small w3-theme-l" + ((i % 5)) + "\">" + arr.interest_tags[i] + "</span>&nbsp";
        }
        document.getElementById("friendProfile").innerHTML += "</div>"
        document.getElementById("backgroundCard").className = "w3-card w3-container w3-blue";

        document.getElementById("searchBar").innerHTML = '<div class="w3-card w3-round w3-white"><div class="w3-container w3-padding"><h4 class="w3-opacity"><h3>'+arr.firstname+'\'s Event List<h3></div></div>';
        document.getElementById("searchResults").innerHTML = "";
        viewGuestParticipatingEvents(arr.email);
      }
    }
  };
  var parameters = {
    username: friendName,
    check: "0"
  };
  req.send(JSON.stringify(parameters));
}



function addFriend(friendName) {
  var req = new XMLHttpRequest();
  req.open("POST", user_add_friend_endpoint);
  req.onreadystatechange = function(event) {
    console.log(event.target.response);
    if (this.readyState == 4) {
      console.log(event.target.response);
      //getUserProfile(JSON.parse(event.target.response));
        viewFriends();
      alert('Friend added successfully');

    }
  };
  var parameters = {
    username: localStorage.getItem("username"),
    friend_name: friendName
  };
 }



function viewFriends() {

  document.getElementById("friendList").innerHTML = "<u>Your Friend List</u>";
    var userFriendList=[];
  var req = new XMLHttpRequest();
  req.open("POST", user_friend_list_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      arr = JSON.parse(event.target.response);
      document.getElementById("backgroundCard").className = "w3-card w3-container w3-green";
      //getUserProfile(JSON.parse(event.target.response));

      for (x in arr)
      {
        userFriendList.push(arr[x]);
        document.getElementById("friendList").innerHTML += '<button class="w3-btn w3-small" onclick="showFriendClick(\''+arr[x]+'\')">'+arr[x]+'</button>';
      }
      localStorage.setItem("userFriendList",JSON.stringify(userFriendList));
    }
  };
  var parameters = {
    username: localStorage.getItem("username")
  };
  req.send(JSON.stringify(parameters));

}

function profileAccess() {
  if (localStorage.getItem("profileAccess") == "public")
    localStorage.setItem("profileAccess", "private");
  else {
    localStorage.setItem("profileAccess", "public");
  }
  document.getElementById("profileState").innerHTML = '<i class="fa fa-search fa-fw w3-margin-right w3-text-theme"></i>' + localStorage.getItem("profileAccess")
  var req = new XMLHttpRequest();
  req.open("POST", user_profile_access_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      //getUserProfile(JSON.parse(event.target.response));
    }
  };
  var parameters = {
    username: localStorage.getItem("username"),
    profileAccess: localStorage.getItem("profileAccess")
  };
  req.send(JSON.stringify(parameters));
}

function shareEvent(eventID)
{
  var req = new XMLHttpRequest();
  req.open("POST", user_share_event_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      console.log(event.target.response);
      alert("Event shared with friends successfully");
    }
  };

  var parameters = {
    eventID : eventID.toString(),
    usersSharedTo: JSON.parse(localStorage.getItem("userFriendList"))
  };
  req.send(JSON.stringify(parameters));
}

function viewSharedEvents()
{
  var req = new XMLHttpRequest();
  req.open("POST", user_shared_events_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
        document.getElementById("searchBar").innerHTML = '<div class="w3-card w3-round w3-white"><div class="w3-container w3-padding"><h3>Events Shared with you</h3></div></div>';
        renderUI(JSON.parse(event.target.response), "blue");
    }
  };

  var parameters = {
    username:localStorage.getItem("username")
  };
  req.send(JSON.stringify(parameters));
}


function messageHost(eventID)
{
  var req = new XMLHttpRequest();
  req.open("POST", user_send_host_message_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      console.log(event.target.response);
        alert("Message sent successfully")
    }
  };

  var parameters = {
    event_id: eventID.toString(),
    username: localStorage.getItem("username"),
    event_mess: document.getElementById('messageToHost').value
  };
  req.send(JSON.stringify(parameters));
}


function getEventRating(arr)
{
	
  var req = new XMLHttpRequest();
  req.open("POST", event_get_user_rating_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
	starcount= event.target.response[1];
	console.log(starcount);

 document.getElementById('searchResults').innerHTML += "<div class=\"w3-container w3-card w3-white w3-round w3-margin\"><br><img src=\"img/avatar2.png\" alt=\"Avatar\" class=\"w3-left w3-circle w3-margin-right\" style=\"width:60px\"><span class=\"w3-right w3-opacity\"></span><h4>" + arr.name + " " + arr.location + "</h4><br><hr class=\"w3-clear\"><div id=\"stars\">"


if(yyyy>=Number(arr.date.substr(0,4))){
if(mm>=Number(arr.date.substr(5,2))){
if(dd>=Number(arr.date.substr(8,2))){
var count=1;
for(;count<=starcount;count++){
 document.getElementById('searchResults').innerHTML += "<span class=\"fa fa-star checked\" onclick=\"setStar("+count+","+arr.eventid+","+arr.date +")\"></span>";
}
for(;count<6;count++){
 document.getElementById('searchResults').innerHTML += "<span class=\"fa fa-star\" onclick=\"setStar("+count+","+arr.eventid+","+arr.date +")\"></span>";
}
}
}
}
     document.getElementById('searchResults').innerHTML += "</div><p>Location: " + arr.location + "<br>Time: " + arr.time + "<br>ZipCode: " + arr.zipcode + "<br> Description:" + arr.desc + "</p><div class=\"w3-row-padding\" style=\"margin:0 -16px\"><div class=\"w3-half\"></div><div class=\"w3-half\"></div></div><button type=\"button\" class=\"w3-button w3-theme-l2 w3-margin-bottom\" onclick=\"cancelEvent(" + arr.eventid + ")\"><i class=\"fa fa-thumbs-down\"></i> Cancel RSVP</button><button type=\"button\" class=\"w3-button w3-theme-d4 w3-margin-bottom\" onclick=\"shareEvent("+arr.eventid+")\">&nbsp<i class=\"fa fa-comment\" ></i>  Share</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input id=\"messageToHost\" style=\"height:40px\"></input><button type=\"button\" class=\"w3-button w3-theme-d1 w3-margin-bottom\" onclick=\"messageHost("+arr.eventid+")\">&nbsp<i class=\"fa fa-user\"></i>&nbspMessage Host</button></div>";

    }
  };

  var parameters = {
    event_id: arr.eventid,
    username: localStorage.getItem("username")
  };
  req.send(JSON.stringify(parameters));
}





