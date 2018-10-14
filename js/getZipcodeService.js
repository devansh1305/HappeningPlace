const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});

exports.handler = (event, context, callback) => {
	    // TODO implement
	//     var params1={
	//             TableName:'User',
	//                     Key: {
	//                                 username: {
	//                                                 S: event.username
	//                                                             }
	//                                                                     }
	//                                                                         };
	//                                                                             
	//                                                                                 dynamodb.getItem(params1,function(err,data){
	//                                                                                         if(err)
	//                                                                                                 {
	//                                                                                                             callback("OOPS!!");
	//                                                                                                                     }
	//                                                                                                                             else
	//                                                                                                                                     {
	//                                                                                                                                                 console.log(data.Item.zipcode.S);
	//                                                                                                                                                             callback(null,data.Item.zipcode.S);
	//
	//                                                                                                                                                                     }
	//                                                                                                                                                                         });
	//                                                                                                                                                                         };
