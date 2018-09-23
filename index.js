/* addUser(userName,userPassword)
   Takes two parameters input and stores them in the AWS DynamoDB
   Sample Request: addUser("Viswajeeet Balaji","HappeningPlace Password");
*/
function addUser(userName,userPassword)
{
  // Create new XMLHttpRequest. Declare the endpoint and send parameters data in JSON form.
var req = new XMLHttpRequest();
req.open('POST','https://9ojvtxgwid.execute-api.us-east-1.amazonaws.com/signupTest/user-signup');
req.onreadystatechange = function(event)
{
  console.log(event.target.response);
};
var parameters = {
  username:userName,
  password:userPassword,
}
req.send(JSON.stringify(parameters));
}
function signup()
{
  addUser(document.getElementById("inputEmail4").value, document.getElementById("inputPassword4").value);
	// First parameter is username, last parameter is password
	// TODO get this from the front-end html using document.getElementByID and call this function
}
