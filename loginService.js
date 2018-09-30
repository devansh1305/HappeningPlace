const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});
exports.handler = (event, context, callback) => {
    // TODO implement
    var params = 
    {
        Key:
        {
            "username":
            {
                S: event.userName
            }
        },
        TableName:'User'
    }
    dynamodb.getItem(params,function(err,data){
        if(err)
        {
            callback(err);
        }
        else
        {
            callback(null, data.Item.password.S===event.password);
        }
    });
    
};
