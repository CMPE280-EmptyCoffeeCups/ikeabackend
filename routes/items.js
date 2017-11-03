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

module.exports = router;
