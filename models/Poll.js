var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
	user:String,
	title:String,
	options:[{name:String,value:Number}],
	count:Number
});

module.exports=mongoose.model('Poll',pollSchema);