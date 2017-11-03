var express = require('express');
var router = express.Router();
var mongo = require("../db/mongo");
var mongodb = require('mongodb');
// Authenticate user and add to DB if needed.
router.post('/authenticate', function(req, res, next) {

  var email = req.body.email;
  var requestJSON = {"email":email};

  mongo.findOne('USER_DETAILS',requestJSON,function(err,searchRes){
      if(err){
          console.log(err);
          res.status(500).send({
              error: 'There was an error.'
          });
      }else{

          if(searchRes===null){
              var insertJSON=req.body;
              mongo.insert('USER_DETAILS',insertJSON,function(err,insertRes){
                  if(err){
                      console.log("Failed to insert user. "+err);
                      res.status(500).send({
                          error: 'There was an error.'
                      });
                  }else{
                      console.log("INSERTING USER");
                      res.status(200).send({"profile":insertJSON});
                  }
              });
          }else{
             console.log("User already exists");
              
              res.status(200).send({"profile":searchRes});
          }

      }
  });

});

router.get('/profile', function(req, res, next) {
    var email = req.body.email;
    var requestJSON = {"email":email};
    mongo.findOne('USER_DETAILS',requestJSON,function(err,searchRes){
        if(err){
            console.log(err);
            res.status(500).send({
                error: 'There was an error.'
            });
        }else{

            if(searchRes!==null){
                console.log(searchRes);
                //res.status(200).send({"user":searchRes});
            }else{
                //res.status(404).send({"message": "User Profile not found."});
            }
        }
    });

});

router.post('/updateProfile',function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var address=req.body.address;
    var payment=req.body.paymentMethods;

    var profileJSON = {$set:{"fname":fname,"lname":lname,"address":address,"paymentMethods":payment}};
    var userID = mongodb.ObjectID(req.body._id);
    var queryJSON = {"_id":userID};
    mongo.updateOne('USER_DETAILS',queryJSON,profileJSON,function(err,searchRes){
        if(err){
            console.log(err);
            res.status(500).send({
                error: 'There was an error.'
            });
        }else{

            if(searchRes!==null){
               
                res.status(200).send();
            }else{
                res.status(500).send({"message": "User Profile not found."});
            }
        }
    });
});

router.post('/deleteProfile',function(req,res){
    var email = req.body.email;
    var queryJSON = {email};
    mongo.deleteOne('USER_DETAILS',queryJSON,function (err,delRes) {
        if(err){
            res.status(500).send({
                error: 'There was an error.'
            });
        }else{
            if(delRes!==null){
                res.status(200).send();
            }
        }
    })
});


module.exports = router;
