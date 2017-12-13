var express = require('express');
var path = require('path');

var firebase = require('./config/firebase');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
var auth = require('./routes/auth')(firebase);
var listBroker = require('./routes/listBroker');


process.on('uncaughtException', function (error) {
   console.log(error.stack);
});

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

    //tell express to serve static files from the special
    //node variable __dirname which contains the current
    //folder
app.use(express.static(__dirname));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'this-is-a-secret-token'}));
app.use("/", index);
app.use("/auth", auth);
app.use("/listBroker", listBroker);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
