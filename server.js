var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var routes = require('./routes');
var expressStormpath = require('express-stormpath');

var stormpath = require('stormpath');
var apiKey = new stormpath.ApiKey(
		process.env['STORMPATH_CLIENT_APIKEY_ID'],
  		process.env['STORMPATH_CLIENT_APIKEY_SECRET']
	);
var client = new stormpath.Client({apiKey:apiKey})
var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];
console.log('Href',applicationHref);
client.getApplication(applicationHref, function(err, application) {
  console.log('Application:', application);
  var account = {
  	givenName: 'Joe',
  	surname: 'Stormtrooper',
 	username: 'tk421',
  	email: 'tk421@stormpath.com',
  	password: 'Changeme1',
  	customData: {
    		favoriteColor: 'white'
  		}
	};

application.createAccount(account, function(err, createdAccount) {
  		console.log('Account:', createdAccount);
	});
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.get('/',routes.index);

var port=process.env.PORT || 8080;
app.listen(port,function(){
	console.log('App listening on port: '+port);
});
