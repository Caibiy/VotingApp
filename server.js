/**
 * Voting Application
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./settings');
var flash = require('connect-flash');
/**
 * configure app
 */

mongoose.connect(settings.local_url);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
   resave: true,
    saveUninitialized: true,
  secret:settings.cookieSecret,
  cookie:{maxAge: 1000 * 60 * 60 * 24 * 30}//30 days
 
}));


/**
 * passport init
 */
 var passport = require('passport');
 app.use(passport.initialize());
 app.use(passport.session());


/**
 * 
 */

app.use(flash());
app.use(function(req,res,next){
  if(req.user){
    res.locals.user=req.user;
  }
  next();
});
 var passportInit= require('./passport/index');
 passportInit(passport);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'client')));
var routes = require('./routes/index')(passport);
var poll=require('./api/poll')(passport);
app.use('/',routes);
app.use('/api',poll);
app.listen('8080',function(){
  console.log('App is running');
})
