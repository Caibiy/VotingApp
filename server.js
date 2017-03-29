/**
 * Voting Application
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var routes = require('./routes');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
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
  secret:settings.cookieSecret,
  key:settings.db,
  cookie:{maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db:settings.db,
    host:settings.host,
    port:settings.port,
    mongooseConnection:mongoose.connection
  })
}));
/*var apiKey = new stormpath.ApiKey(
		process.env['STORMPATH_CLIENT_APIKEY_ID'],
  		process.env['STORMPATH_CLIENT_APIKEY_SECRET']
	);*/
app.use(flash());
app.use(function(req,res,next){
  var error = req.flash('error');
  var success = req.flash('success');
  if(success.length){
    res.locals.user=req.session.user;
  }
  if(req.session.user){
  res.locals.name=req.session.user.name;
  }
  res.locals.error=error.length?error:null;
  res.locals.success=success.length?success:null;
  next();
})
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');


app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/register',routes.reg);
app.post('/reg_post',routes.register);
app.post('/login_post',routes.loginForm);
app.get('/logout',routes.logout);
app.get('/setting',routes.setting);
app.listen('8080',function(){
  console.log('App is running');
})
