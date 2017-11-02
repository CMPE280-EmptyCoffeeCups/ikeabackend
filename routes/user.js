var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
// Authenticate user and add to DB if needed.
router.post('/authenticate', function(req, res, next) {
  var email = req.body.email;
  var fname = req.body.given_name;
  var lname = req.body.family_name;
  var requestJSON = {"email":email};
  var resJSON={};
  mongo.findOne('USER_DETAILS',requestJSON,function(err,searchRes){
      if(err){
          console.log(err);
          res.status(500).send({
              error: 'There was an error.'
          });
      }else{

          if(searchRes==null){
              var inserJSON={"email":email,"fname":fname,"lname":lname};
              mongo.insert('USER_DETAILS',inserJSON,function(err,insertRes){
                  if(err){
                      console.log("Failed to insert user. "+err);
                      res.status(500).send({
                          error: 'There was an error.'
                      });
                  }else{
                      console.log("INSERTING USER");
                      res.status(200).send({
                            msg: 'Account created.'
                      });
                  }
              });
          }else{
             console.log("User already exists");
              res.status(200).send({
                  msg: 'Account created.'
              });
          }

      }
  });

});

module.exports = router;
