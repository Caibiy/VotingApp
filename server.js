var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var routes = require('./routes');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.get('/',routes.index);

var port=process.env.PORT || 8080;
app.listen(port,function(){
	console.log('App listening on port: '+port);
});
