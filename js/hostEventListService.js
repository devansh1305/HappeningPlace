const AWS = require('aws-sdk');
//AWS BACKEND CODE IN NODEJS
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});
exports.handler = (event, context, callback) => {
	    // TODO implement
	//
	//
	//
	//     var params = {
	//         TableName : "User",
	//             Key:{
	//                     username:{
	//                                 S: "dpanirwa@purdue.edu"
	//                                         }
	//                                             }
	//                                             };
	//
	//                                             dynamodb.getItem(params,function(err,data){
	//                                                 if(err){
	//                                                         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
	//                                                             }
	//                                                                 else{
	//                                                                         //var event_list=[];
	//                                                                                 //console.log(data.Item.hosted_events.NS);
	//                                                                                         var arr=data.Item.hosted_events.NS;
	//                                                                                                 var params1={
	//
	//                                                                                                                     }
	//                                                                                                                             }
	//                                                                                                                                     callback(null,event_list);
	//
	//                                                                                                                                                 }
	//                                                                                                                                                 });
	//
	//
	//                                                                                                                                                 //event_list.push("lol");
	//                                                                                                                                                 /*
	//                                                                                                                                                 dynamodb.getItem(params,function(err,data){
	//                                                                                                                                                     if(err){
	//                                                                                                                                                             console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
	//                                                                                                                                                                 }
	//                                                                                                                                                                     else{
	//                                                                                                                                                                             var event_list=[];
	//                                                                                                                                                                                     //console.log(data.Item.hosted_events.NS);
	//                                                                                                                                                                                             var arr=data.Item.hosted_events.NS;
	//                                                                                                                                                                                                     arr.forEach(function(value){
	//                                                                                                                                                                                                                 var params1 = {
	//                                                                                                                                                                                                                                 TableName : "Event",
	//                                                                                                                                                                                                                                                 Key:{
	//                                                                                                                                                                                                                                                                     EventID:{
	//                                                                                                                                                                                                                                                                                             S: value
	//                                                                                                                                                                                                                                                                                                                 }
	//                                                                                                                                                                                                                                                                                                                                 }
	//                                                                                                                                                                                                                                                                                                                                             };
	//
	//                                                                                                                                                                                                                                                                                                                                                                     dynamodb.getItem(params1,function(err1,data1){
	//
	//                                                                                                                                                                                                                                                                                                                                                                                                     if(err1){
	//                                                                                                                                                                                                                                                                                                                                                                                                                         console.error("Unable to get event. Error JSON:", JSON.stringify(err, null, 2));
	//                                                                                                                                                                                                                                                                                                                                                                                                                                         }
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                         else{
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                             event_list.push(data1.Item.EventName.S);
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 //console.log(data1.Item.EventName.S)
	//
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 });
	//
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     });
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             console.log(event_list);
	//
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             callback(null,event_list);
	//
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         }
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         });
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */
	//
	//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         };