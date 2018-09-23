// Viswajeeet Balaji sign-up service code
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});
exports.handler = (event, context, callback) => {
    // TODO implement
    var params = 
    {
        Item:
        {
        "username":
        {
            S:event.username
        },
        "password":
        {
          S:event.password
        },
        },
        TableName:'User',
        Expected:
        {
            "username":
            {
                Exists:false
            }
        }
    }
    //Place the item in the dynamoDB table
    dynamodb.putItem(params,function(err,data)
    {
       if(err)
       {
           callback(err);
       }
       else
       {
            const response = {
        statusCode: 200,
        body: JSON.stringify('Item Added Successfully!')
         };
            callback(null, response);
       }
    });
   
};
//01-12-1998
