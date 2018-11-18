const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});

exports.handler = (event, context, callback) => {
    /*goes to the user table and passes the username of the user logged in*/
    var params = {
        TableName:'User',
        Key: {
            username: {
                S: event.username
            }
        }
    };
    
    /*this function goes to the current user logged in and saves the eventids of the user's participating events*/
    dynamodb.getItem(params,function(err, data){
        if(err) {
            callback(err);
        }
        else {
            if(data.Item!=null && data.Item.interest_tags!=null){
                console.log(data.Item.profileAccess);
                if (data.Item.profileAccess.S=="public"){
                    callback(null,data.Item.interest_tags.SS);
                }
                else{
                    callback(null,"The profile is private");
                }
            }
            else{
                callback(null,false);
            }
        }
    });
};
