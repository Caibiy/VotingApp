var express=require('express');
var routes=express.Router();

module.exports=function(passport){
	var isAuthenticated=function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		var str=encodeURIComponent('请先登录');
		res.redirect('/?message='+str);
	}
	routes.get('/',function(req,res){
		var message=null;
		if(req.query.message){
			message=req.query.message;
		}
		res.render('index',{message:message});
	});
	routes.get('/signup',function(req,res){
		res.render('signup',{message:req.flash('signupMessage')});
	});
	routes.post('/signup',passport.authenticate('signup',{
		successRedirect:'/profile',
		failureRedirect:'/signup',
		failureFlash:true
	}));
	routes.get('/login',function(req,res){
		res.render('login',{"message":req.flash('loginMessage')});
	});
	routes.post('/login',passport.authenticate('login',{
		successRedirect:'/',
		failureRedirect:'signup',
		failureFlash:true
	}));
	routes.get('/newpolls',isAuthenticated,function(req,res){
		res.render('newpolls');
	})
	routes.get('/profile',isAuthenticated,function(req,res){
		
		res.render('profile');
	});
	routes.get('/logout',function(req,res){
		req.logout();
		res.redirect('/');
	})

	return routes;
};