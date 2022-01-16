var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
require('dotenv').config();

var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var logger = require('morgan');



var app = express();

// PORT SETUP
const port = process.env.PORT || 8005;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MY ROUTERS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var productRouter = require('./routes/product');
var userRouter = require('./routes/users');
var contactRouter = require('./routes/contactlist');

// MY ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', contactRouter);


// Check port and node rnning
app.listen(port, () => {
  console.log("Server is connected and running " + port);
});

// DB CONNECTION
mongoose.connect(process.env.DBCONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => {
  console.log("DB CONNECTED", process.env.DBCONNECTION);
}).catch((err) => {
  console.log("DB NOT CONNECTED", err);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// ERROR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
