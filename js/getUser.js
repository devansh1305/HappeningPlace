const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});

exports.handler = (event, context, callback) => {
    // TODO implement

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
    var params={
        TableName:'User',
        Key: {
            username: {
                S: event.username
            }/*,
            password1: {
                S: 'hp'
            },
            password2:{
                S: 'newPass'
            },
            password3:{
                S: 'newPass'
            }*/
        }
    }

    dynamodb.getItem(params,function(err,data){
        if(err)
        {
            callback("OOOOOOPS!!");
        }
        else
        {
            if(data.Item.password.S===event.password1){
                dynamodb.putItem(params1,function(err,data){
                   if(err){
                       callback("Cant Update");
                   }
                   else{
                       callback("Password Updated");
                   }
                });
            }
            callback(null);
        }
    });

};
