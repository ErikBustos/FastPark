var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

(function(){
  //initialize Firebase
 // Initialize Firebase
    var config = {
    apiKey: "AIzaSyAVaten_qJLQb3YyQC_k-CW_rrTX8Bya6I",
    authDomain: "fastpark-cd1a8.firebaseapp.com",
    databaseURL: "https://fastpark-cd1a8.firebaseio.com",
    projectId: "fastpark-cd1a8",
    storageBucket: "fastpark-cd1a8.appspot.com",
    messagingSenderId: "86398450595"
    };
    firebase.initializeApp(config);

    var txtEmail= document.getElementById('txtPassword');
    var txtPassword= document.getElementById('txtPassword');
    var btnLogin= document.getElementById('btnLogin');
    var btnSignUp=document.getElementById('btnSignUp');
    


    btnLogin.addEventListener('click', e=>{
      var email=txtEmail.nodeValue;
      var pass=txtPassword.nodeValue;
      var auth=firebase.auth();

      auth.signInWithEmailAndPassword(email,pass);
      Promise.catch(e => console.log(e.message));
    });
}());


module.exports = app;
