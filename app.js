var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');

var jwt = require('express-jwt');

var jwtCheck = jwt({
    secret: 'WYpJ_dKwAYRHmGCRHgY2DtYgBrDpIxv4L3uD2yMmaQIdqkG8qxF87nzhVEkX-g5N',
    aud: 'e8V4OAn727yXYYJjCw7C7wedgdsSMSLN',
    algorithms: ['HS256']
}).unless({ path: ['/']});


var user = require('./routes/user');
var items = require('./routes/items');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/user', jwtCheck, user);
app.use('/items', jwtCheck, items);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
