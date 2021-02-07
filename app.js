var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session Setup
app.use(session({
  secret: 'adasashbdyafsuashdoiywaojdoaigdawyhgdauydiw0-pjhlcasjc;jashdgaod',
  name: 'ExpressMVCAPP',
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: { maxAge: 720000 }
}));

//Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/express_mvc", { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err)
    throw err;
  else
    console.log("Connected Successfully.....");
});

//Locals Variable Setup
app.use((req, res, next) => {
  res.locals.userName = req.session.userName;
  res.locals.email = req.session.email;
  next();
})

//Routes Imported Here
require('./routes/routes')(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
