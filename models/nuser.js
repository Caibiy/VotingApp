var mongoose = require('mongoose');
var brcypt = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String
});

//密码加密
userSchema.methods.generateHash=function(password){
    return brcypt.hashSync(password,brcypt.genSaltSync(8),null);
}
userSchema.methods.validPassword=function(password){
    return brcypt.compareSync(password,this.password);
}
module.exports=mongoose.model('User',userSchema);