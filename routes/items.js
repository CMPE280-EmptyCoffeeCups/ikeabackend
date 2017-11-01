var express = require('express');
var router = express.Router();

// GET all items
router.get('/', function(req, res, next) {
    res.send({'item': 'items'});
});

module.exports = router;
