var MongoClient = require('mongodb').MongoClient;
var mongoURL = "mongodb://admin:admin123@ds243285.mlab.com:43285/ikeadb";

var db;
MongoClient.connect(mongoURL, function(err, ikeadb) {
    if(!err) {
        db = ikeadb
    }else{
        console.log('Could not connect to mongo server due to '+err);
    }
});


function collection(name){
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);

};

exports.insert = function(collectionName,insertJSON, callback){

    var collectionObject = db.collection(collectionName);
    collectionObject.insertOne(insertJSON,callback);

}

exports.findOne = function(collectionName,queryJSON,callback){

    var collectionObject = db.collection(collectionName);
    collectionObject.findOne(queryJSON,callback);
}


exports.updateOne = function(collectionName,queryJSON,updateJSON,callback){
    var collectionObject = db.collection(collectionName);
    collectionObject.updateOne(queryJSON,updateJSON,callback);
}