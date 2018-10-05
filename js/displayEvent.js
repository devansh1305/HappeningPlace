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

function ShowList() {
  console.log("PART1");
  ListEvent(document.getElementById("zip").value);
}
