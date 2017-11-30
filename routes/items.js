var express = require('express');
var router = express.Router();
var mongo = require("../db/mongo");
var mongodb = require('mongodb');

// GET all items
router.get('/', function(req, res) {
    var requestJSON={};
    console.log(requestJSON);
    mongo.findAll('PRODUCT_DETAILS',requestJSON,function(err,searchRes){
        if(err){
            console.log(err);
            res.status(500).send({
                error: 'There was an error.'
            });
        }else{
            if(searchRes!==null){
                console.log(searchRes);
                res.status(200).send({
                    "items":searchRes
                });
            }
        }
    });
});


router.get('/product', function(req, res) {
    console.log(req.query.prod_id);
    var productid = mongodb.ObjectID(req.query.prod_id);
    var requestJSON={"_id":productid};
    mongo.findOne('PRODUCT_DETAILS',requestJSON,function(err,searchRes){
        if(err){
            console.log(err);
            res.status(500).send({
                error: 'There was an error.'
            });
        }else{

            if(searchRes!==null){
                console.log(searchRes);
                res.status(200).send({"user":searchRes});
            }else{
                res.status(404).send({"message": "No product found."});
            }
        }
    });
});
module.exports = router;
