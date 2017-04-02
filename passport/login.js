
var LocalStrategy = require('passport-local');
var User = require('../models/nuser');
module.exports=function(passport){
    passport.use('login',new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        emailField:'email',
        passReqToCallback:true
    },function(req,username,password,done){
        process.nextTick(function(){
            User.findOne({'username':username},function(err,user){
                if(err)
                    return done(err);
                if(!user){
                    return done(null,false,req.flash('loginMessage','该用户不存在'));
                }
                if(!user.validPassword(password)){
                    return done(null,false,req.flash('loginMessage','密码不匹配'));
                }
                return done(null,user);
            });
        })
    }))
}