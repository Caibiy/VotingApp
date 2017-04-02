var User =require('../models/nuser');
var LocalStrategy = require('passport-local');
module.exports=function(passport){
    process.nextTick(function(){
        passport.use('signup',new LocalStrategy({
            usernameField:'username',
            passwordField:'password',
            emailField:'email',
            passReqToCallback:true
        },function(req,username,password,done){
            User.findOne({"username":username},function(err,user){
                if(err){
                   return  done(err);
                }
                if(user){
                    return done(null,false,req.flash("signupMessage","该用户已经存在"));
                }
                var newUser = new User();
                newUser.username=req.body.username;
                newUser.password=newUser.generateHash(req.body.password);
                newUser.email=req.body.email;
                newUser.save(function(err){
                    if(err){
                         return done(err);
                    }
                    console.log('注册成功');
                    return done(null,newUser);
                })
            })
        }))
    });
}