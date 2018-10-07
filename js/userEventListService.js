const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});
exports.handler = (event, context, callback) => {
	    // TODO implement
	
	
	     var params = {
	         TableName : "Event",
	             //IndexName: 'zipcode',
	                 //KeyConditionExpression: "zipcode = :zip",
	                     FilterExpression: "zipcode = :zip",
	                         ExpressionAttributeValues: {
	                                 ":zip": {
	                                             S: event.zip_code
	                                                     }
	                                                         }
	                                                         };
	
	                                                         dynamodb.scan(params,function(err,data){
	                                                             if (err) {
	                                                                     console.log(err,err.stack);
	                                                                         }
	                                                                             else{
	                                                                                     console.log("Scan succeeded.");
	                                                                                             console.log("<---->\n");
	                                                                                                     const items = data.Items.map(
	                                                                                                                 (dataField) => {
	                                                                                                                                 return {location: dataField.Location.S,host: dataField.Host.S,zipcode:dataField.zipcode.S,time: dataField.Time.S,name:dataField.EventName.S,eventid:dataField.EventID.S, desc:dataField.Description.S};
	                                                                                                                                             }
	                                                                                                                                                         );
	                                                                                                                                                                 callback(null,items);
	                                                                                                                                                                     }
	                                                                                                                                                                     });
	
	                                                                                                                                                                     };
