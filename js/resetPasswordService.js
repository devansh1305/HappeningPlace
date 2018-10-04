const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});

exports.handler = (event, context, callback) => {
    // TODO implement
    /*
    var params1={
        TableName:'User',
        Item: {
            
                username:{
                    S: event.username
                },
                password:{
                    S: event.password2
                }
            
            
        }
    }
    */
    var params = {
        TableName:'User',
        Key:{
            username: {
                S: event.username
            }
        },
        UpdateExpression: "set password = :r",
        ExpressionAttributeValues:{
            ":r":{
                S: event.password2
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
    }
    
    dynamodb.getItem(params1,function(err,data){
        if(err)
        {
            callback("OOOOOOPS!!");
        }
        else
        {
            if(data.Item.password.S===event.password1){
                dynamodb.updateItem(params, function(err, data) {
                    if (err) {
                        callback("Cant Update");
                        //console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        callback("Password Updated");
                        //console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                    }
                });
                /*
                dynamodb.putItem(data,function(err,data){
                   if(err){
                       callback("params.Key.username");
                       callback(data.Item.password.S);
                   } 
                   else{
                       callback("Password Updated");
                   }
                });
                */
            }
            callback(null);
        }
    });
    

};
