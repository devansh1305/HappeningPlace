const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'us-east-1',apiVersion:'2012-08-10'});

exports.handler = (event, context, callback) => {
    // TODO implement
    /*
    let scanningParameters={
        TableName:'User',
    };

    dynamodb.scan(scanningParameters,function(err, data){
        if(err){
            callback(err,null);
        }
        else{
            callback(null,data);
        }
    });
    */
    var params={
        TableName:'User',
        Key: {
            'username': {
                S: 'viswa'
            }
        }
    }
    //console.log(params);
    dynamodb.getItem(params, function(err,data){
       if(err){
           callback(err,null);
       }else{
           callback(null,data);
       }
    });
    /*
    dynamodb.getItem(params, function(err,data){
        if(err){
            callback(err,null);
        }
        else{
            callback(null,data);
        }
    });*/
};
