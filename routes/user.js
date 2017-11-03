var express = require('express');
var router = express.Router();
var mongo = require("../db/mongo");
// Authenticate user and add to DB if needed.
router.post('/authenticate', function(req, res, next) {
  var email = req.body.email;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var requestJSON = {"email":email};

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

                      res.status(200);
                  }
              });
          }else{
             console.log("User already exists");
              console.log(searchRes);
              res.status(200);
          }

      }
  });

});

router.get('/profile', function(req, res, next) {
    var email = req.body.email;
    mongo.findOne('USER_DETAILS',requestJSON,function(err,searchRes){
        if(err){
            console.log(err);
            res.status(500).send({
                error: 'There was an error.'
            });
        }else{

            if(searchRes!=null){
                console.log(searchRes);
                //res.status(200).send({"user":searchRes});
            }else{
                //res.status(404).send({"message": "User Profile not found."});
            }
        }
    });

});

router.post('/updateProfile',function(req,res,next){
    var email = req.body.email;
    var fname = req.body.given_name;
    var lname = req.body.family_name;
    var address = req.body.address;
    var cardnumber = req.body.cardnumber;
    var mm = req.body.mm;
    var yy = req.body.yy;
    var cvv = req.body.cvv;
    var cardholdername = req.body.holdername;
    var billingAddr=req.body.billAddr;
    var paymentDetails={"cardnumber":cardnumber,"mm":mm,"yy":yy,"cvv":cvv,"cardholdername":cardholdername,"billingAddr":billingAddr};
    var profileJSON = {"fname":fname,"lname":lname,"address":address,"payment":paymentDetails};
    var queryJSON = {"email":email};
    mongo.updateOne('USER_DETAILS',queryJSON,profileJSON,function(err,searchRes){
        if(err){
            console.log(err);
            res.status(500).send({
                error: 'There was an error.'
            });
        }else{

            if(searchRes!=null){
                console.log(searchRes);
                //res.status(200).send({"user":searchRes});
            }else{
                //res.status(404).send({"message": "User Profile not found."});
            }
        }
    });
});



module.exports = router;
