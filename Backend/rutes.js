module.exports = function(app){
	var userVa= require('./model/user');
	
	//GET
	findAllUsers=function(req, res){
	userVa.find(function(err,user){
		if(!err) res.json(user);
		else console.log('Error'+ err);
	});	
	};
	validateUser=function(req, res){
	userVa.findOne({username:req.params.username,password:req.params.password}, function(err,user){
		if(!err) res.send(user);
		else console.log('Error '+err);
		});
	};
	registerUser=function(req, res){
	var user = new userVa(
		{
		username: req.body.username,
		password: req.body.password	
		});
	console.log("usuario: "+user);
		user.save(function(err){
			if (!err) console.log('User saved');
			else console.log('error'+ err);
		});
		res.send(user);
	};
	
app.get('/user',findAllUsers);
app.post('/user',registerUser);
app.get('/user/:username::password',validateUser);
	
};

