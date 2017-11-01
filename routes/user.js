var express = require('express');
var router = express.Router();

// Authenticate user and add to DB if needed.
router.post('/authenticate', function(req, res, next) {
  console.log(req.body);
  res.send({'user':'user'});
});

module.exports = router;
