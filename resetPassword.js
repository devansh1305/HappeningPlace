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
                S:event.old_password
            },
            /*
            "password":
            {
                S:event.new_password
            },
            "password":
            {
                S:event.confirm_new_password
            },
            */
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

    dynamodb.getItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);

        } else {
            console.log("Success", data.Item);
        }
    });
/*
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
*/
};
