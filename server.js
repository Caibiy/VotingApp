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

/*var apiKey = new stormpath.ApiKey(
		process.env['STORMPATH_CLIENT_APIKEY_ID'],
  		process.env['STORMPATH_CLIENT_APIKEY_SECRET']
	);*/


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
app.use(express.static(path.join(__dirname,'public')));
var routes = require('./routes/index')(passport);
app.use('/',routes);
app.listen('8080',function(){
  console.log('App is running');
})
