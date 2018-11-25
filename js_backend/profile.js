const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});

exports.handler = (event, context, callback) => {
    // TODO implement

    var params = {
        TableName:'User',
        Key:{
            username: {
                S: event.username
            }
        },
        UpdateExpression: "set profileAccess = :r",
        ExpressionAttributeValues:{
            ":r":{
                S: event.profileAccess
            }
        },
        ReturnValues:"UPDATED_NEW"
    };


    var params1={
        TableName:'User',
        Key: {
            username: {
                S: event.username
            }
        }
    };

    dynamodb.getItem(params1,function(err,data){
        if (err)
        {
            callback(err);
        }
        else
        {
            dynamodb.updateItem(params, function(err, data) {
                if (err) {
                    callback(err);
                }
                else {gi
                    callback(null,true);
                }
                });


        }
    });


};
