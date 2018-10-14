function ListEvent(zipcode) {
  var req = new XMLHttpRequest();
  req.open(
    "POST",
    "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-event-list"
  );
  req.onreadystatechange = function(event) {
    console.log(event.target.response);
  };
  var params = {
    zip_code: zipcode
  };
  req.send(JSON.stringify(params));
}

function ListPastEvent(UserName) {
  var req = new XMLHttpRequest();
  req.open(
    "POST",
    "https://md1q5ktq6e.execute-api.us-east-1.amazonaws.com/hp1/user-event-list"
  );
  req.onreadystatechange = function(event) {
    console.log(event.target.response);
  };
  var params = {
    user_name: UserName
  };
  req.send(JSON.stringify(params));
}
function ShowList() {
  console.log("PART000");
  //for (var i = 0; i < event.target.response.length; i++) {
  //var str = JSON.parse();
  //console.log(str);

  ListEvent(document.getElementById("zip").value);
}
