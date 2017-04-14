var Poll =require('../models/Poll');
 var routes=require('express').Router();

module.exports=function(passport){
	var isAuthenticated=function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		var str=encodeURIComponent('请先登录');
		res.redirect('/?message='+str);
	}
    routes.post('/newpoll',isAuthenticated,function(req,res){
		console.log('new poll api');
        var data=req.body;

			var newPoll=new Poll();
			newPoll.user=req.user.id;
			newPoll.title=req.body.title;
			newPoll.options=req.body.options;
			newPoll.count=0;
			newPoll.save(function(err){
				if(err){
					console.log('Err:'+err);
				}else{
					var str='保存成功';
					return str;
				}
			})
		}

    );
	return routes;
}