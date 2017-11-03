var monk = require('monk');
var db =  monk('mongodb://admin:admin123@ds243285.mlab.com:43285/ikeadb');

exports.insert = function(collectionName,insertJSON, callback){
    console.log("Inserting document in "+collectionName);
    var collectionObject = db.get(collectionName);
    collectionObject.insert(insertJSON,callback);

}

exports.findOne = function(collectionName,queryJSON,callback){
    console.log("Searching document in "+collectionName);
    var collectionObject = db.get(collectionName);
    collectionObject.findOne(queryJSON,callback);

}

exports.updateOne = function(collectionName,queryJSON,updateJSON,callback){
    console.log("Updating document in "+collectionName);
    var collectionObject = db.get(collectionName);
    //collectionObject.updateOne(queryJSON,updateJSON,callback);
    collectionObject.update(queryJSON,updateJSON,callback);
}

