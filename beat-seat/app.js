var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressEjsLayout = require('express-ejs-layouts')

//import flash
const flash = require("connect-flash");

// import passport
const passport = require('passport');
require("./config/passport.js")(passport);

//import session
const session = require("express-session");

//import mongoose
const mongoose = require("mongoose");

// import method override
const methodOverride = require("method-override");

// connect ke database
try {
    mongoose.connect('mongodb+srv://ayukrisn:ayukrisna@beatseat.qxv2w5w.mongodb.net/beat-seat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Keluar dengan pesan eror
}

// variabel dan konstanta router
var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require("./routes/auth");
const konserRouter = require("./routes/konser");
const publicRouter = require("./routes/public");
const dashboardRouter = require("./routes/dashboard");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//menggunakan method override
app.use(methodOverride("_method"));

// menggunakan session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000},
  })
);

// menggunakan passport
app.use(passport.initialize());
app.use(passport.session());

// menggunakan flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// menggunakan router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/auth", authRouter);
app.use("/konser", konserRouter);
app.use("/public", publicRouter);
app.use("/dashboard", dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
