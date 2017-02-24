var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var voteSchema = new Schema({ip:String});
var choiceSchema = new Schema({
	text:String,
	votes:[voteSchema]
});
var PollSchema = new Schema({
	question:{type:String,required:true},
	choice:[choiceSchema]
});
var Poll = mongoose.model('Poll',PollSchema);
module.exports=Poll;