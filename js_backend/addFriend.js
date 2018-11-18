const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});
exports.handler = (event, context, callback) => {
    var params={
        TableName:'User',
        Key:{
            username:{
                S: event.username
            }
        },
        UpdateExpression: "ADD friend_list :r",
        ExpressionAttributeValues:{
            ":r":{
                "SS" : [event.friend_name]
            }
        },
    };
    dynamodb.updateItem(params,function(err,data){
        if(err)
            callback("part1");
        else{
            //callback(null,true);
        }
    });
    var params_cont={
        TableName:'User',
        Key:{
            username:{
                S: event.friend_name
            }
        },
        UpdateExpression: "ADD friend_list :r",
        ExpressionAttributeValues:{
            ":r":{
                "SS" : [event.username]
            }
        },
    };
    dynamodb.updateItem(params_cont,function(err,data){
        if(err)
            callback("part2");
        else{
            callback(null,true);
        }
    });
};
