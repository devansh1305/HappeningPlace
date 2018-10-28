const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});
exports.handler = (event, context, callback) => {
    // TODO implement
    var params1={
        TableName:'User',
        Key:{
            username:{
                S: event.username
            }
        },
        UpdateExpression: "DELETE contributing_events :r",
        ExpressionAttributeValues:{
            ":r":{
                "NS" : [event.eventID.toString()]
            }
        },
        //ReturnValues:"UPDATED_NEW"
    };
    dynamodb.updateItem(params1,callback);
    
    var params2={
        TableName:'Event',
        Key:{
            EventID:{
                S: event.eventID.toString()
            }
        },
        UpdateExpression: "DELETE contributors :r",
        ExpressionAttributeValues:{
            ":r":{
                "SS" : [event.username]
            }
        },
        //ReturnValues:"UPDATED_NEW"
    };
    dynamodb.updateItem(params2,callback);
    
};
