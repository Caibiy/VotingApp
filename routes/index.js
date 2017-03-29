var crypto = require('crypto'),
	User = require('../models/user');
exports.index=function(req,res){
	res.render('index',{title:'VOtingApp'});
/*	res.render('index',{user:null,title:'VotingApp'});
	if(req.user){
		res.render('index',{user:req.user.email,title:'VotingApp'});
	}else{
		res.render('index',{user:null,title:'VotingApp'});
	}*/
};

exports.login=function(req,res){
	res.render('login');
}

exports.setting=function(req,res){
	res.render('setting');
};
exports.reg=function(req,res){
	res.render('register');
}
exports.register=function(req,res){
	var name = req.body.name,
		password = req.body.password;
	
	var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name:name,
		password:password,
		email:req.body.email
	});
	User.find(newUser.name,function(err,user){
			if(err){
				req.flash('error',err);
				return res.redirect('/');
			}
			if(user){
				req.flash('error','用户已经存在');
				return res.redirect('/register');
			}
			newUser.save(function(err,user){
				if(err){
					req.flash('error',err);
					return res.redirect('/register');
				}
				req.session.user = newUser;//用户信息存入session
				req.flash('success','注册成功!');
				res.redirect('/');
			})
	});
}
exports.loginForm=function(req,res){
	var md5 = crypto.createHash('md5'),
		password=md5.update(req.body.password).digest('hex');
	User.find(req.body.name,function(err,user){
		if(!user){
			req.flash('error','用户不存在!');
			return res.redirect('/login');
		}
		if(user.password!=password){
			req.flash('error','用户密码错误!');
			return res.redirect('/login');
		}
		req.session.user=user;
		req.flash('success','登录成功!');
		res.redirect('/');
	})
}

exports.logout=function(req,res){
	req.session.user=null;
	req.flash('success','登出成功');
	res.redirect('/')
}

exports.setting=function(req,res){
	res.render('setting');
}