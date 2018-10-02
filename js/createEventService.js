const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});
exports.handler = (event, context, callback) => {
    // TODO implement
    //var eventName="test1"
    var randomNumber = (Math.floor(Math.random() * 1000000)).toString();
    var params =
    {
        Item:
        {
            "EventName":
            {
                S:event.eventName
            },
            "EventID":
            {
                S:randomNumber
            },
            "Zipcode":
            {
                S:event.zipcode
            },
            "Location":
            {
                S:event.event_location
            }
        },
        TableName:'Event'
    }

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
