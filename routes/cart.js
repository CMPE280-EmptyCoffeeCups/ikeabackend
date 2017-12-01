var express = require('express');
var router = express.Router();
var mongo = require("../db/mongo");
var mongodb = require('mongodb');

router.post('/add', function(req, res) {
    var product = req.body.item;
    var userEmail = req.body.profile.email;
    console.log(req.body);
    var requestJson = {"email" : userEmail}
    //TODO: remove user check with the database

    mongo.findOne("USER_DETAILS",requestJson,function (err, results) {
        if (err) {
            console.log(err);
        }
        else if(results!=null){

            var productName = product.PRODUCT_NAME;
            var price = product.PRICE;
            var productId= product._id;
            var fileName = product.IMAGES.main; //change filename
            var qty = 1;
            console.log(qty);
            var insertionDate = new Date();
            var productDetails={"productName":productName,"price":price,"fileName":fileName,"qty":qty};
            mongo.findOne("CART",{"email":userEmail},function (cartErr, cartResults) {
                if(cartResults) {
                    var cartProductDetails = cartResults.CART_PRODUCTS;
                    if (cartProductDetails.length > 0) {
                        var i = 0;
                        var found = false;
                        for (; i < cartProductDetails.length; i++) {
                            if (cartProductDetails[i].PRODUCT_ID == productId) {
                                cartProductDetails[i].QTY = parseInt(cartProductDetails[i].QTY) + qty;
                                found = true;
                                updateJSON = {"CART_PRODUCTS": cartProductDetails};
                                mongo.updateOne('CART', {"email":userEmail}, {$set: updateJSON}, function (err, updateResults) {
                                    if (err) {
                                        res.status(500).send({
                                            error: 'There was an error.'
                                        });
                                    }
                                    else {
                                        console.log("Updated database successfully");
                                        res.status(200).send({
                                            "productDetails":productDetails
                                        });
                                    }
                                });
                                break;
                            }
                        }
                        if (i == cartProductDetails.length && !found) {
                            var newJSON = {
                                "PRODUCT_ID": productId,
                                "PRODUCT_NAME": productName,
                                "PRICE": price,
                                "QTY": qty,
                                "FILE_NAME": fileName,
                                "INSERTION_DATE": new Date()
                            };
                            cartProductDetails[i] = newJSON;
                            updateJSON = {"CART_PRODUCTS": cartProductDetails};
                            mongo.updateOne('CART', {"email":userEmail}, {$set: updateJSON}, function (err, updateResults) {
                                if (err) {
                                    res.status(500).send({
                                        error: 'There was an error.'
                                    });
                                }
                                else {
                                    res.status(200).send({
                                        "productDetails":productDetails
                                    });
                                }
                            });
                        }
                    } else if (cartProductDetails.length == 0) {
                        var newJSON = {
                            "PRODUCT_ID": productId,
                            "PRODUCT_NAME": productName,
                            "PRICE": price, "QTY": qty,
                            "FILE_NAME": fileName,
                            "INSERTION_DATE": new Date()
                        };
                        cartProductDetails[0] = newJSON;
                        updateJSON = {"CART_PRODUCTS": cartProductDetails};
                        mongo.updateOne('CART',{"email":userEmail}, {$set: updateJSON}, function (err, updateResults) {
                            if (err) {
                                res.status(500).send({
                                    error: 'There was an error.'
                                });
                            }
                            else {
                                res.status(200).send({
                                "productDetails":productDetails
                                });
                            }
                        });
                    }
                }
                else{

                    console.log("add new product to cart");
                    insertCartJSON = {"email":userEmail, "CART_PRODUCTS" : [{"PRODUCT_ID" : productId ,
                        "PRODUCT_NAME" : productName,
                        "PRICE" : price,
                        "QTY" : qty,
                        "FILE_NAME" : fileName,
                        "INSERTION_DATE":new Date()}]};
                    mongo.insert('CART',insertCartJSON,function (err, results) {
                        if (err) {
                            res.status(500).send({
                                error: 'There was an error.'
                            });
                        }
                        else {
                            res.status(200).send({
                                "productDetails":productDetails
                            });
                        }
                    });
                }
            });
        }
    });
});


router.post('/remove',function(req,res){
    var userEmail = req.body.profile.email;
    var product_id = req.body.item.id;
    console.log(product_id);
    mongo.updateOne('CART',{"email":userEmail},{$pull : { "CART_PRODUCTS" : {"PRODUCT_ID" : product_id}}},function (err, results) {
            if (err) {
                res.status(500).send({
                    error: 'There was an error.'
                });
            }
            else {
                res.status(200).send();
            }
        }
    );
});

router.post('/update',function(req,res){
    var userEmail = req.body.profile.email;
    var product = req.body.item;
    var qty = req.body.qty;
    var queryJson = {
                    "email": userEmail,
                    "CART_PRODUCTS": {
                        $elemMatch: {
                            "PRODUCT_ID": product._id
                        }
                    }
                };
    var updateJson = {$set : {"CART_PRODUCTS.$.QTY" :parseInt(qty) }}
    mongo.updateOne('CART',queryJson,updateJson,function (err, results) {
            if (err) {
                console.log(err);
            }
            else {

                res.status(200).send({"message":"Cart updated"});
            }
        }
    );
});



router.post('/checkout',function(req,res){
    

    res.status(200).send({"message":"Order Placed"});

});




module.exports = router;