module.exports = function(app){

	app.all('*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	 });

	var userVa= require('./model/user');
	var menuVa= require('./model/menu');
	var listVa= require('./model/list');
	
	findAllList=function(req, res){
	listVa.find(function(err,list){
	//console.log("menu: "+list);
		if(!err) res.json(list);
		else console.log('Error'+ err);
	});	
	};
	
	registerList=function(req, res){
	var list = new listVa(
		{
		menuname: req.body.menuname,
		username: req.body.username,
		date: req.body.date
		});
	console.log("List: "+list);
		list.save(function(err){
			if (!err) console.log('list saved');
			else console.log('error'+ err);
		});
		res.send(list);
	};
	
	
	deleteListById=function(req, res){
	listVa.findById(req.params.id,function(err,list)
		{
		console.log("menu to delete: "+list);
		list.remove		
			(function(err)
				{	
				console.log("Function");				
				if(!err) 
					{
					console.log('List Item Removed');
					}
				else 
					{
					console.log('Error'+ err);
					}
				}				
			)
		res.send(list);			
		});	
	};
			
	findAllMenu=function(req, res){
	menuVa.find(function(err,menu){
	console.log("menu: "+menu);
		if(!err) res.json(menu);
		else console.log('Error'+ err);
	});	
	};
	
	registerMenu=function(req, res){
	var menu = new menuVa(
		{
		menuname: req.body.menuname,
		price: req.body.price	
		});
	console.log("Menu: "+menu);
		menu.save(function(err){
			if (!err) console.log('menu saved');
			else console.log('error'+ err);
		});
		res.send(menu);
	};
	
	
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
	findUserByEmail=function(req, res){
	userVa.findOne({email:req.params.email}, function(err,user){
		if(!err) res.send(user);
		else console.log('Error '+err);
		});
	};
	registerUser=function(req, res){
	var user = new userVa(
		{
		username: req.body.username,
		email: req.body.email,
		password: req.body.password	
		});
	console.log("usuario: "+user);
		user.save(function(err){
			if (!err) console.log('User saved');
			else console.log('error'+ err);
		});
		res.send(user);
	};
	
app.post('/list',registerList);
app.get('/list',findAllList);
app.delete('/list/:id',deleteListById);
app.get('/menu',findAllMenu);
app.post('/menu',registerMenu);
app.get('/user',findAllUsers);
app.post('/user',registerUser);
app.get('/user/:username/:password',validateUser);
app.get('/user/:email',findUserByEmail);
	
};

