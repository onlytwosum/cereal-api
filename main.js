var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comments');
var album = require('./routes/album');
var collection = require('./routes/collection');
var post = require('./routes/post');
var productCategory = require('./routes/productCategory');
var customer = require('./routes/customer');
var basic = require('./routes/basic');
var product = require('./routes/product');
var paramspro = require('./middleware/paramsProcessor.js');
var customHeader = require('./middleware/customHeader.js');
var vsAuth = require('./middleware/vsAuth.js');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('etag', false);  //remove etag added by aws ngix

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//set custom header, set no cache
app.use(customHeader.noCache);
//set api token check 
//app.use('/api',vsAuth.APIAuth);
//allow client angular js call admin API
app.use('/admin',customHeader.allowOrigin);

app.use('/', routes);
app.use('/users', users);
app.use('/api/comments',comments);
app.use('/api/album',album);
app.use('/api/post',post);
app.use('/api/productCategory',productCategory);
app.use('/api/customer',customer);
app.use('/api/basic',basic);
app.use('/api/product',product);
app.use('/api/collection',collection);
app.use('/admin',admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
