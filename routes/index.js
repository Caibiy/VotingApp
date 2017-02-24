exports.index=function(req,res){
	res.render('index',{title:'VotingApp'});
};

exports.login=function(req,res){
	res.render('login');
}

exports.register=function(req,res){
	res.render('register');
}

exports.setting=function(req,res){
	res.render('setting');
}