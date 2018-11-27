/*Core Host View Javascript File
 * @author Viswajeeet Balaji
 * @version 2.0
 * @date 21st Oct, 2018
 */

//Amazon Web Services API Gateway Endpoints
var host_event_list_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-event-list";
var host_event_guest_list_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-event-guest-list";
var host_delete_event_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-delete-event";
var host_create_event_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/host-create-event";
var event_task_list_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-task-list";
var event_contributor_list_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-contributor-list";
var event_add_task_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-add-task";
var event_add_contributor_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-add-contributor";
var host_cancel_event_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/delete-host-event";
var host_event_details_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/event-details";
var host_send_message_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/send-message";
var user_details_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/get-user-profile";
var task_add_contributor_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/add-contributor-to-task";
var contribute_event_list_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/contributinglistservice";
var task_check_endpoint =
  "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/TaskCheck";

var taskArr;

function cancelEvent() {
  var req = new XMLHttpRequest();
  req.open("POST", host_cancel_event_endpoint);
  req.onreadystatechange = function(event) {
    console.log(event.target.response);
    if (this.readyState == 4) {
      return JSON.parse(event.target.response);
    }
    retrieveHostEventList();
    document.getElementById("createEvent").innerHTML = "";
  };
  event_id = localStorage.getItem("currentEvent");
  console.log(event_id);
  var parameters = {
    event_id: event_id
  };
  req.send(JSON.stringify(parameters));
}
/*this is called when you hit the plus button in the dashboard.html to create a event*/
function eventmanager() {
  document.getElementById("createEvent").innerHTML =
    '<div class="w3-display-container w3-panel w3-theme-d3" style="padding:0px;">';
  document.getElementById("createEvent").innerHTML +=
    '<input class="w3-input" type="text" placeholder="Event Name" id="eventname"><br><input class="w3-input" type="date" placeholder="Enter Date" id="enterdate"><br><input class="w3-input" type="text" placeholder="Enter Time" id="entertime"><br><input class="w3-input" type="text" placeholder="Enter Venue" id="entervenue"><br><input class="w3-input" type="text" placeholder="Enter zipcode" id="enterzip"><br><input class="w3-input"type="text" placeholder="Event Description" id="description"><br><select id="event_type" class="form-control"><option selected>Choose...</option><option value="Public">Public</option><option value="Private">Private</option></select><br>';
  document.getElementById("createEvent").innerHTML +=
    ' <input class="w3-input" type="text" placeholder="Enter Tags" id="tags"><br><button type="button" class="w3-button w3-theme-d1" onclick="create()">Create Event</button>&nbsp<button type="button" class="w3-button w3-theme-d1" onclick="cancel()">Cancel</button></div>';
}

/*dont create a event*/
function cancel() {
  document.getElementById("createEvent").innerHTML = "";
}

function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme-d1";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(
      " w3-theme-d1",
      ""
    );
  }
}

function create() {
  let tagsArray = document.getElementById("tags").value.split(/[ ,]+/);
  console.log(document.getElementById("entertime").value);
  console.log(document.getElementById("event_type").value);
  createEvent(
    localStorage.getItem("username"),
    document.getElementById("eventname").value,
    document.getElementById("enterzip").value,
    document.getElementById("entervenue").value,
    document.getElementById("entertime").value,
    document.getElementById("enterdate").value,
    document.getElementById("description").value,
    document.getElementById("event_type").value,
    tagsArray
  );
}

function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

/*function hostguestlistonclick(position) {
  var host_guest_list = ["hemanth", "rahul", "harish"];
  text = "";
  for (i = 0; i < position; i++) {
    text +=
      '<div class="w3-bar-item w3-hover-white w3-button w3-card" title="guest email" onclick="hostguestlistonclick(' +
      i +
      ')">' +
      host_guest_list[i] +
      "</div>";
  }

  text +=
    '<div class="w3-bar-item w3-hover-white w3-button w3-card" title="guest email">email ID</div>';

  <<
  << << < HEAD

  for (i = position + 1; i < host_guest_list.length; i++) {
    text += "<div class=\"w3-bar-item w3-hover-white w3-button w3-card\" title=\"guest email\" onclick=\"hostguestlistonclick(" + i + ")\">" + host_guest_list[i] + "</div>"; ===
    === =
    for (i = position + 1; i < host_guest_list.length; i++) {
      text +=
        '<div class="w3-bar-item w3-hover-white w3-button w3-card" title="guest email" onclick="hostguestlistonclick(' +
        i +
        ')">' +
        host_guest_list[i] +
        "</div>"; >>>
      >>> > e08c761b60be1b8ec21eb2b511e44d57d5c81f9e
    }
    document.getElementById("hostEventGuestList").innerHTML = text;
  }*/

function hostguestlist(host_guest_list) {
  text = "";
  for (i = 0; i < host_guest_list.length; i++) {
    text +=
      '<div class="w3-bar-item w3-hover-white w3-button w3-card" title="guest email" onclick="retrieveUserDetails(\'' +
      host_guest_list[i] +
      "')\">" +
      host_guest_list[i] +
      "</div>";
  }
  document.getElementById("hostEventGuestList").innerHTML = text;
}

function userDetails(arr) {
  document.getElementById("createEvent").innerHTML = "Name: " + arr.firstname + "'s<hr>";
  document.getElementById("createEvent").innerHTML += "Address: " + arr.address1 + ", " + arr.address2 + "," + arr.city + "<hr>";
  document.getElementById("createEvent").innerHTML += "Email: " + arr.email + "<hr>Interests: ";
  for (var i = 0; i < arr.interest_tags.length; i++) {
      document.getElementById("createEvent").innerHTML += " <span class=\"w3-tag w3-small w3-theme-l" + ((i % 5)) + "\">" + arr.interest_tags[i] + "</span>&nbsp";
    }
    document.getElementById("createEvent").innerHTML +=
      '<hr><input id="message" placeholder="Enter message to send" class="form-control" style=" width:100%"></input><p></p><button type="button" class="btn btn-primary" onclick="sendMessage(\''+arr.email+'\')">Send</button>';
}

function retrieveUserDetails(email) {
  var req = new XMLHttpRequest();
  req.open("POST", user_details_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      userDetails(JSON.parse(event.target.response));
    }
  };

  var parameters = {
    username: email,
    check: "0"
  };
  req.send(JSON.stringify(parameters));
}

function hostContributeList() {
  // var arr = ["contribute1", "contribute2", "contribute3"];

  // var text = "";
  // var i;
  // for (i = 0; i < arr.length; i++) {
  //   text += '<div class="w3-button w3-theme-d5">' + arr[i] + "</div><br><br>";
  // }
  // document.getElementById("eventList").innerHTML = text;
  var req = new XMLHttpRequest();
  req.open("POST", contribute_event_list_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      loadHostEventList(JSON.parse(event.target.response));
    }
  };
  userName = localStorage.getItem("username");
  var parameters = {
    username: userName
  };
  req.send(JSON.stringify(parameters));
}

function displayEventDetails() {
  var req = new XMLHttpRequest();
  req.open("POST", host_event_details_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      arg = JSON.parse(event.target.response);
      var text = "";
      var cancelButton =
        '<button class="w3-button w3-theme-d5" onclick="viewEventMessages()"> Messages </button>&nbsp<button class="w3-button w3-theme-d5" onclick="sendInvitations()"> Invitations </button>&nbsp';
      cancelButton +=
        '<button class="w3-button w3-theme-d5" title="Cancel Event" onclick="cancelEvent()">Cancel Event</button><br>';
      text +=
        "<h2>" +
        arg[0] +
        '</h2><h3 class="w3-card-4 w3-theme-d5">&nbsp&nbspEvent Details</h3><div class="w3-theme-d3 w3-card-2" style="padding:10px">';
      text +=
        "<h5>Location                 :" +
        arg[2] +
        "</h5><h5>Time        :" +
        arg[4] +
        "</h5><h5>Description :" +
        arg[3] +
        "</h5></div>";
      document.getElementById("menu").innerHTML = cancelButton;
      document.getElementById("createEvent").innerHTML = text;
      document.getElementById("tagsOutput").innerHTML = "";
      for (var i in arg[5])
        document.getElementById("tagsOutput").innerHTML +=
          '<div class="w3-bar-item w3-hover-white w3-button w3-card-4">' +
          arg[5][i] +
          "</div>";
      //arg[6] is guest List
      if (arg[6] != null) hostguestlist(arg[6]);
    }
  };
  var parameters = {
    eventid: localStorage.getItem("currentEvent")
  };
  req.send(JSON.stringify(parameters));
}

function displayEventDetailsForContributors() {
  var req = new XMLHttpRequest();
  req.open("POST", host_event_details_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      arg = JSON.parse(event.target.response);
      var text = "";
      // var cancelButton = "<button class=\"w3-button w3-theme-d5\" onclick=\"viewEventMessages()\"> Messages </button>&nbsp<button class=\"w3-button w3-theme-d5\" onclick=\"sendInvitations()\"> Invitations </button>&nbsp";
      // cancelButton += '<button class="w3-button w3-theme-d5" title="Cancel Event" onclick="cancelEvent()">Cancel Event</button><br>';
      text +=
        "<h2>" +
        arg[0] +
        '</h2><h3 class="w3-card-4 w3-theme-d5">&nbsp&nbspEvent Details</h3><div class="w3-theme-d3 w3-card-2" style="padding:10px">';
      text +=
        "<h5>Location                 :" +
        arg[2] +
        "</h5><h5>Time        :" +
        arg[4] +
        "</h5><h5>Description :" +
        arg[3] +
        "</h5></div>";
      // document.getElementById("menu").innerHTML = cancelButton;
      document.getElementById("createEvent").innerHTML = text;
      document.getElementById("tagsOutput").innerHTML = "";
      for (var i in arg[5])
        document.getElementById("tagsOutput").innerHTML +=
          '<div class="w3-bar-item w3-hover-white w3-button w3-card-4">' +
          arg[5][i] +
          "</div>";
      //arg[6] is guest List
      if(arg[6]!=null)
      hostguestlist(arg[6]);
    }
  };
  var parameters = {
    eventid: localStorage.getItem("currentEvent")
  };
  req.send(JSON.stringify(parameters));
}

function displayHostEventDetails(currentEvent) {
  localStorage.setItem("currentEvent", currentEvent);
  var req = new XMLHttpRequest();
  req.open("POST", event_task_list_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      taskArr = JSON.parse(event.target.response);
      var task =
        '<button class="w3-button w3-hide-small w3-padding-large w3-hover-white" title="Create Task" onclick="callAddTask()"><i class="fa fa-plus"></i></button>';
      if (taskArr != null) {
        for (var i = 0; i < taskArr.length; i++) {
          task +=
            '<button class="w3-bar-item w3-hover-white w3-button w3-card-4 w3-medium w3-theme-d2" onclick="displayTaskDetails(\'' +
            taskArr[i][1] +
            "');\" >" +
            taskArr[i][0] +
            "</button>";
        }
      }
      document.getElementById("tasks").innerHTML = task;
      //hostguestlist(arg[6]);
    }
  };
  var parameters = {
    eventid: localStorage.getItem("currentEvent")
  };
  req.send(JSON.stringify(parameters));

  var req2 = new XMLHttpRequest();
  req2.open("POST", event_contributor_list_endpoint);
  req2.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response != null) {
      contributorArr = JSON.parse(event.target.response);

      var contributor =
        '<button class="w3-button w3-hide-small w3-padding-large w3-hover-white" title="Add Contributor" onclick="callAddContributor()"><i class="fa fa-plus"></i></button>';
      if (contributorArr != null) {
        for (var i = 0; i < contributorArr.length; i++) {
          contributor +=
            '<button class="w3-bar-item w3-hover-white w3-button w3-card-4 w3-medium w3-theme-d2" onclick="retrieveUserDetails(\'' +
            contributorArr[i][1] +
            "');\" >" +
            contributorArr[i][0] +
            "</button>";
        }
      }
      document.getElementById("contributors").innerHTML = contributor;
    }
  };
  var parameters2 = {
    event_id: localStorage.getItem("currentEvent")
  };
  req2.send(JSON.stringify(parameters2));
}

function displayContributeEventDetails(currentEvent) {
  localStorage.setItem("currentEvent", currentEvent);
  var req = new XMLHttpRequest();
  req.open("POST", event_task_list_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      taskArr = JSON.parse(event.target.response);
      var task =
        '<button class="w3-button w3-hide-small w3-padding-large w3-hover-white" title="Create Task" onclick="callAddTask()"><i class="fa fa-plus"></i></button>';
      if (taskArr != null) {
        for (var i = 0; i < taskArr.length; i++) {
          task +=
            '<button class="w3-bar-item w3-hover-white w3-button w3-card-4 w3-medium w3-theme-d2" onclick="displayTaskDetails(\'' +
            taskArr[i][1] +
            "');\" >" +
            taskArr[i][0] +
            "</button>";
        }
      }
      document.getElementById("tasks").innerHTML = task;
      //hostguestlist(arg[6]);
    }
  };
  var parameters = {
    eventid: localStorage.getItem("currentEvent")
  };
  req.send(JSON.stringify(parameters));

  var req2 = new XMLHttpRequest();
  req2.open("POST", event_contributor_list_endpoint);
  req2.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response != null) {
      contributorArr = JSON.parse(event.target.response);

      var contributor =
        '<button class="w3-button w3-hide-small w3-padding-large w3-hover-white" title="Add Contributor" onclick="callAddContributor()"><i class="fa fa-plus"></i></button>';
      if (contributorArr != null) {
        for (var i = 0; i < contributorArr.length; i++) {
          contributor +=
            '<button class="w3-bar-item w3-hover-white w3-button w3-card-4 w3-medium w3-theme-d2" onclick="retrieveUserDetails(\'' +
            contributorArr[i][1] +
            "');\" >" +
            contributorArr[i][0] +
            "</button>";
        }
      }
      document.getElementById("contributors").innerHTML = contributor;
    }
  };
  var parameters2 = {
    event_id: localStorage.getItem("currentEvent")
  };
  req2.send(JSON.stringify(parameters2));
}

function addContributor() {
  var req = new XMLHttpRequest();
  req.open("POST", event_add_contributor_endpoint);
  req.onreadystatechange = function(event) {
    console.log(event.target.response);
    if (this.readyState == 4 && event.target.response == true)
      console.log("Added Contributor");
  };
  console.log(localStorage.getItem("currentEvent"));
  console.log(document.getElementById("contributor_username").value);
  var parameters = {
    event_id: localStorage.getItem("currentEvent"),
    contributor_username: document.getElementById("contributor_username").value
  };
  req.send(JSON.stringify(parameters));
}

function createEvent(
  userName,
  event_Name,
  eventZipcode,
  eventLocation,
  time,
  date,
  description,
  eventTypeParam,
  tags
) {
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
  var req = new XMLHttpRequest();
  req.open("POST", host_create_event_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      console.log(event.target.response);
      alert("Event Creation Successful");
      retrieveHostEventList();
      document.getElementById("createEvent").innerHTML = "";
    }
  };
  var parameters = {
    username: userName,
    eventName: event_Name,
    zipcode: eventZipcode,
    event_location: eventLocation,
    event_time: time,
    event_date: date,
    desc: description,
    usertags: tags,
    eventType: eventTypeParam
  };
  req.send(JSON.stringify(parameters));
}

function callAddTask() {
  document.getElementById("createEvent").innerHTML =
    '<div class="w3-display-container w3-panel w3-theme-d3" style="padding:0px;">';
  document.getElementById("createEvent").innerHTML +=
    '<input class="w3-input" type="text" placeholder="Task Name" id="task_name"><br><input class="w3-input"type="text" placeholder="Task Description" id="task_description"><br>';
  document.getElementById("createEvent").innerHTML +=
    ' <input class="w3-input" type="text" placeholder="Enter Tags with spaces" id="tags"><br><button type="button" class="w3-button w3-theme-d1" onclick="addTask()">Create Task</button>&nbsp<button type="button" class="w3-button w3-theme-d1" onclick="cancel()">Cancel</button></div>';
}

function callAddContributor() {
  document.getElementById("createEvent").innerHTML =
    '<div class="w3-display-container w3-panel w3-theme-d3" style="padding:0px;">';
  document.getElementById("createEvent").innerHTML +=
    '<input class="w3-input" type="text" placeholder="Contributor e-mail ID" id="contributor_username">';
  document.getElementById("createEvent").innerHTML +=
    '<br><button type="button" class="w3-button w3-theme-d1" onclick="addContributor()">Add Contributor</button>&nbsp<button type="button" class="w3-button w3-theme-d1" onclick="cancel()">Cancel</button></div>';
}

function loadHostEventList(arr) {
  var hostEventNames = arr;
  if (arr == null) {
    document.getElementById("eventList").innerHTML = "No events hosted";
    return;
  }
  var text = "";
  var i;
  for (i = 0; i < hostEventNames.length; i++) {
    text +=
      '<button class="w3-button w3-theme-d5"  onclick=" displayHostEventDetails(\'' +
      hostEventNames[i][1] +
      "'); displayEventDetails()\">" +
      hostEventNames[i][0] +
      "</button><br><br>";
  }
  document.getElementById("eventList").innerHTML = text;
}

function loadContributeEventList(arr) {
  let contributeEventNames = arr;
  if (arr == null) {
    document.getElementById("eventList").innerHTML = "No events conributed";
    return;
  }
  var text = "";
  var i;
  for (i = 0; i < contributeEventNames.length; i++) {
    text +=
      '<button class="w3-button w3-theme-d5"  onclick=" displayHostEventDetails(\'' +
      contributeEventNames[i][1] +
      "'); displayEventDetailsForContributors()\">" +
      contributeEventNames[i][0] +
      "</button><br><br>";
  }
  document.getElementById("eventList").innerHTML = text;
}

function displayTaskDetails(eventID) {
  var text = "";

  text =
    text +
    '<button type="button" class="w3-button w3-theme-d1 w3-right" onclick="cancel()">Cancel</button><br>';
  text +=
    "<h2>" +
    eventID +
    '</h2><div class="w3-theme-d2 w3-card-2" style="padding:10px"><h4>Task Description</h4>';

  text +=
    '<div class="w3-display-container w3-panel w3-theme-d3" style="padding:0px;">';
  text +=
    '<input class="w3-input" type="text" placeholder="Contributor e-mail ID" id="contributor_id_from_task">';
  text +=
    '<br><button type="button" class="w3-button w3-theme-d1" onclick="addContributorToTask(\'' +
    eventID +
    "')\">Add Contributor</button>&nbsp</div>";

  text +=
    '<div class="w3-card-3 w3-theme-d3" style="padding:5px"><input class="w3-input" type="text" placeholder="Enter Subtask Name" id="subtaskname">';
  text +=
    '<button type="button" class="w3-button w3-small w3-theme-d5" onclick="create()">Add Sub_Task</button></div>';
  text += '<div class=" w3-bar"> ';
  text +=
    '<input class="w3-check" type="checkbox"><label>sub_task</label><br><input class="w3-small w3-check" type="checkbox"><label>sub_task</label><br><input class="w3-check" type="checkbox"><label>sub_task</label><br> </div>';
  document.getElementById("createEvent").innerHTML = text;
}

function addContributorToTask(taskid) {
  var req = new XMLHttpRequest();
  req.open("POST", task_add_contributor_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response == "true") {
      alert("Task added successfully");
    } else if (this.readyState == 4) {
      console.log(event.target.response);
      alert("Sorry resource unavailable");
    }
  };
  var parameters = {
    task_id: taskid,
    contributor_username: document.getElementById("contributor_id_from_task").value
  };
  req.send(JSON.stringify(parameters));
}

function retrieveHostEventList() {
  var req = new XMLHttpRequest();
  req.open("POST", host_event_list_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4) {
      loadHostEventList(JSON.parse(event.target.response));
    }
  };
  userName = localStorage.getItem("username");
  var parameters = {
    username: userName
  };
  req.send(JSON.stringify(parameters));
}

function addTask() {
  var req = new XMLHttpRequest();
  req.open("POST", event_add_task_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response == "true") {
      displayHostEventDetails(localStorage.getItem("currentEvent"));
      alert("Task added successfully");
    } else if (this.readyState == 4) {
      alert("Sorry resource unavailable");
    }
  };
  var parameters = {
    event_id: localStorage.getItem("currentEvent"),
    task_name: document.getElementById("task_name").value,
    desc: document.getElementById("task_description").value
  };
  req.send(JSON.stringify(parameters));
}

function retrieveUserEvents() {
  retrieveHostEventList();
}

function retrieveTasks() {
  var req = new XMLHttpRequest();
  req.open("POST", event_add_contributor_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response == "true") {
      displayHostEventDetails(localStorage.getItem("currentEvent"));
      alert("Contributor added successfully");
    } else if (this.readyState == 4) {
      alert("Sorry resource unavailable");
    }
  };
  var parameters = {
    event_id: localStorage.getItem("currentEvent"),
    contributor_username: document.getElementById("contributor_username").value
  };
  req.send(JSON.stringify(parameters));
}

function sendMessage(username) {
  var req = new XMLHttpRequest();
  req.open("POST", host_send_message_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response == "true") {
      alert("Sent message successfully");
    } else if (this.readyState == 4) {
      alert("Sorry resource unavailable");
    }
  };
  var parameters;
  if(username!=null)
  parameters = {
    event_id: localStorage.getItem("currentEvent"),
    message: document.getElementById("message").value,
    username:username
  };
  else {
    parameters = {
      event_id: localStorage.getItem("currentEvent"),
      message: document.getElementById("message").value
    };
  }
  req.send(JSON.stringify(parameters));
}

/* not done yet*/
function seeProfile() {
  var req = new XMLHttpRequest();
  req.open("POST", host_send_message_endpoint);
  req.onreadystatechange = function(event) {
    if (this.readyState == 4 && event.target.response == "true") {
      alert("Sent message successfully");
    } else if (this.readyState == 4) {
      alert("Sorry resource unavailable");
    }
  };
  var parameters = {
    event_id: localStorage.getItem("currentEvent"),
    message: document.getElementById("message").value
  };
  req.send(JSON.stringify(parameters));
}

function messagecontributor() {}
function viewEventMessages() {
  document.getElementById("createEvent").innerHTML =
    "Messages sent by users would appear here.";
}
function sendInvitations() {
  document.getElementById("createEvent").innerHTML =
    "Enter email id of user to send invitation too.";
}
