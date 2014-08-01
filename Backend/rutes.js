module.exports = function(app){

	

	app.all('*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	 });
	 
	

	var userVa= require('./model/user');
	var menuVa= require('./model/menu');
	var listVa= require('./model/list');
	var emailSentVa= require('./model/emailsent');
	var nodemailer = require('nodemailer');	
	
	var fs = require('fs');
	var path = require("path");
	 
	function copyDefaultUserImage(idUser){
		var newImageLocation = path.join(__dirname, 'public/images', idUser+".jpg");
		fs.readFile("public/images/user_default_img.jpg", function(err, data) {
		if (err)
			throw err;
		else{							
			fs.writeFile(newImageLocation, data, function(err) {
			console.log("Imagen predeterminada copiada a: "+newImageLocation);
			});							
			}
		});		
		}
	
	upload=function(req, res){	
		  setTimeout(			
			function () {
			    
				res.setHeader('Content-Type', 'text/html');
				if (req.files.length == 0 || req.files.file.size == 0)
					res.send({ msg: 'No file uploaded at ' + new Date().toString() });
				else {
					var file = req.files.file;	
					var newImageLocation = path.join(__dirname, 'public/images', file.name);
					console.log(newImageLocation);
					fs.readFile(file.path, function(err, data) {
						if (err)
							throw err;
						else{							
							fs.writeFile(newImageLocation, data, function(err) {
								res.json(200, { 
								src: 'images/' + file.name,
								size: file.size								
								});
								console.log(file.name);
							});
							//res.end("Hello");
							res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString() });							
						}
					});
				}
			},
			(req.param('delay', 'yes') == 'yes') ? 2000 : -1
		);
	};
	
	uploadDish=function(req, res){	
		  setTimeout(			
			function () {
			    
				res.setHeader('Content-Type', 'text/html');
				if (req.files.length == 0 || req.files.file.size == 0)
					res.send({ msg: 'No file uploaded at ' + new Date().toString() });
				else {
					var file = req.files.file;	
					var newImageLocation = path.join(__dirname, 'public/images/Dish', file.name);
					console.log(newImageLocation);
					fs.readFile(file.path, function(err, data) {
						if (err)
							throw err;
						else{							
							fs.writeFile(newImageLocation, data, function(err) {
								res.json(200, { 
								src: 'images/Dish/' + file.name,
								size: file.size								
								});
								console.log(file.name);
							});
							//res.end("Hello");
							res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString() });							
						}
					});
				}
			},
			(req.param('delay', 'yes') == 'yes') ? 2000 : -1
		);
	};
	
	var serverVar = function (dateValue, hourValue){
    this.serverDate = dateValue;
	this.serverHour = hourValue;
	
	};
	
	GetServerHour=function(req, res){		 
		 var dateAux=new Date;
		 var hourAux=dateAux.getHours();
		 var server = new serverVar(dateAux, hourAux);		
		 console.log(server);
		 res.autoEtag();
		 res.send(JSON.stringify(server));
	};

	var file = __dirname + '/config/emailConfig.json';	
	var transporter;
	fs.readFile(file, 'utf8', function (err, data) {
		  if (err) {
			console.log('Error: ' + err);
			return;
			}		 
		data = JSON.parse(data);		 
		console.log("Configuracion de Email cargada");			
		transporter = nodemailer.createTransport({		
		service: data.service,
		auth: {
			user: data.user,
			pass: data.pass
			}		
		});
		return transporter;
	});		
	/*
	var mailOptions = {
    from: 'Fred Foo ? <foo@blurdybloop.com>', // sender address
    to: 'jocorbre@gmail.com', // list of receivers
    subject: 'Hello ?', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
	};
	
	
	transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
		}
	});
	*/

	function sendEmail(mailOptions2){
		transporter.sendMail(mailOptions2,function(error, info){
		if(error){
			console.log(error);
		}else{
			console.log('Message sent: ' + info.response);
			}
		});
	}
	
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
		idUser:	  req.body.idUser,
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
		console.log("list to delete: "+list);
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
	//console.log("menu: "+menu);
		if(!err) {
				res.json(menu);
				}
		else console.log('Error'+ err);
	});	
	};
	
	findListByDate=function(req, res){
	var re = new RegExp(req.params.date, 'i');
	listVa.find({date: {$regex: re}},function(err,list){	
		if(!err) {
				res.json(list);
				}
		else console.log('Error'+ err);
	});	
	};
	
	deleteMenuById=function(req, res){
	menuVa.findById(req.params.id,function(err,menu)
		{
		console.log("menu to delete: "+menu);
		menu.remove		
			(function(err)
				{	
				console.log("Function");				
				if(!err) 
					{
					console.log('Menu Removed');
					}
				else 
					{
					console.log('Error'+ err);
					}
				}				
			)
		res.send(menu);			
		});	
	};
	
	findMenuByName=function(req, res){
	menuVa.findOne({menuname:req.params.menuname},function(err,menu)
		{
		console.log("menu found: "+menu);		
		res.json(menu);			
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
	
	validateUserPassEncrypt=function(req, res){
	userVa.findOne({username:req.params.username}, function(err,user){
	if(user)
		{
		user.comparePassword(req.params.password, function(err, isMatch){
			if(!err)
			{
			console.log('Password: '+ isMatch );
			if(isMatch==true)
				{
				res.send(user);
				}
			else{
				console.log('Intento fallido de inicio de sesion por parte de: '+req.params.username+' usando el Password: '+ req.params.password );
				res.send(null);
				}
			
			}
			else{
				throw err;	
			}
		});	
		}
	else
		{
		res.send(false);
		}
		//if(!err)
		//else console.log('Error '+err);
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
		if(!err) 
		{
		if(user)
		{
		var tempPass = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 5; i++ )
			tempPass += possible.charAt(Math.floor(Math.random() * possible.length));
			
		var mailOptions1 = {
						from: 'AvaLunchs <jocorbre@gmail.com>', // sender address
						to: req.params.email, // list of receivers
						subject: 'AvaLunchs - Recuperacion de Contrasena', // Subject line
						text: 'Recuperación de Contraseña', // plaintext body
						html: '<b>Sr(a)</b>: '+user.username+',<p><b>Su nueva contrasena es: '+tempPass+'</b></p><p>Se recomienda que cambie su contrasena una vez se haya logueado con la contrasena autogenerada..</p></br></br><p><b>AvaLunchs SQA Project Liberia 2014</b><p>' // html body
						};
		//mailOptions1.to=req.params.email;
		user.password=tempPass;
		user.save(function(err) 
				{
				if(!err) 
					{
					sendEmail(mailOptions1);
					console.log('Password was sent successfully');
					} 
					else 
					{
					console.log('ERROR: ' + err);
					}		
				console.log(user);
				res.send(user);		
				}				
				);			
		}else res.send(null);		
		}else console.log('Error '+err);
		}
		)};
	
	var error = function(user,email) {
				this.username= user;
				this.email= email;
				};
	
	registerUser=function(req, res){
	
	var existUserName=false;
	var existEmail=false;
	
	var user = new userVa(
		{
		username: req.body.username,
		email: req.body.email,
		password: req.body.password	
		});	
	
	userVa.findOne({$or:[{username:req.body.username},{email:req.body.email}]}, function(err,userAux){ // Falta verificar todos los users que hacen match con la condición
			if(!err) 
				{				
				if(userAux)
					{	
					if(userAux.username==user.username)existUserName=true;
					if(userAux.email==user.email)existEmail=true;																				
					}
				if(!existUserName&&!existEmail)
						{
						console.log("usuario: "+user);
						user.save(function(err){
									if (!err) 
										{
										console.log('User saved');
										copyDefaultUserImage(user._id);
										res.send(user);
										}
									else console.log('error'+ err);
								});
						}
						else{						
							var errorAux = new error(existUserName, existEmail);						
							console.log("username: "+existUserName+", email: "+existEmail);
							res.send(JSON.stringify(errorAux));							
							}
				}
			});		
	};
	
	
	
	
	
	updateUserById=function(req, res){
	
	var updatePass=req.params.updatePass;
	
	userVa.findById(req.params.id,function(err,user)
		{

		if(!err)
			{
			var updateUser=false;
			user.username=req.body.username;
			user.email=req.body.email;			
			if(updatePass=="false")
				{
				updateUser=true;
				console.log("User to update: "+user+", updatePass: "+req.params.updatePass);				
				user.save
				(function(err)
					{	
					console.log("Function");				
					if(!err) 
						{
						console.log('User updated');
						}
					else 
						{
						console.log('Error'+ err);
						}
					}				
				);
				res.send(user);
				}
			else{		
				console.log("nuevo password: "+req.body.password);			
				user.comparePassword(req.body.password, function(err, isMatch)
					{
					if(!err)
						{
						console.log('Password: '+ isMatch );
						if(isMatch==true)
							{
							updateUser=true;
							user.password=req.body.newpassword;
							console.log("User to update: "+user+", updatePass: "+req.params.updatePass);				
								user.save
								(function(err)
									{	
									console.log("Function");				
									if(!err) 
										{
										console.log('User updated');
										res.send(user);
										}
									else 
										{
										console.log('Error'+ err);
										res.send(false);
										}
									}				
								);
								
							}
						else{
							console.log('El nuevo password no coincide con el actual: '+req.body.username+' usando el Password: '+ req.body.password );
							updateUser=false;
							res.send(false);
							//res.send(null);
							}			
						}
					else{
						res.send(false);
						updateUser=false;
						throw err;	
						}			
					});
				}
				/*
			console.log('update user: '+ updateUser);
			if(updateUser==true)
				{
				
				}
			else
			{
			console.log('enviando null');
			res.send(false);
			}
			*/
		}
		else{
			res.send(false);
			};														
		}		
				
	    );	
	};
	
	/*
	function findEmailSent(date){		
		emailSentVa.findOne({date:date}, function(err,emailSent){
		if(!err) 
		{
			if(emailSent)
				{
				console.log("el email que habia sido enviado: "+ emailSent);
				return true;
				}
			else
				{
				return false;
				}
		}
		else 
		{
		console.log('Error '+err);
		return false;
		}
		});		
	};
	*/
	
	sendEmailNotification=function(req, res){		
	var lisUsers=req.params.listuser;
	var caller=req.params.caller;
	var date=req.params.date;
    var verifyEmailSent=false;	
	
	emailSentVa.findOne({date:date}, function(err,emailSent){
		if(!err) 
		{
			if(emailSent)
				{
				console.log("The email confirmation was already sent: "+ emailSent.date +', caller: '+emailSent.caller);															
				}
			else
				{
				console.log("User List that buy a lunch: "+lisUsers);								
				var mailOptions1 = {
									from: 'AvaLunchs <jocorbre@gmail.com>', // sender address
									to: lisUsers, // list of receivers
									subject: 'AvaLunchs - Pedido del '+date, // Subject line
									text: 'Pedido', // plaintext body
									html: '<p><b>El seleccionado para realizar la llamada del dia de hoy es: '+caller+'</b></p><p>La lista se encuentra en el sitio web: <a target="_black" href="http:192.168.0.124:8080/app"> http:192.168.49.115:8080/app <a></p></br></br><p><b>AvaLunchs SQA Project Liberia 2014</b><p>' // html body
									};
									
					sendEmail(mailOptions1);	
					registerEmailSent(date,caller);				
					res.send(true);
				}
		}
		else 
		{
		console.log('Error '+err);
		verifyEmailSent=false;
		}
		});			
	console.log(verifyEmailSent);
    res.send(false);	
	};
	
	function registerEmailSent(date, caller){		
		var emailSent = new emailSentVa(
		{
		date: date,
		caller: caller
		});
	console.log("Email Sent: "+emailSent);
		emailSent.save(function(err){
			if (!err) console.log('emailSent saved');
			else console.log('error'+ err);
		});			
	};
	
	
	
app.post('/list',registerList);
app.get('/list',findAllList);
app.delete('/list/:id',deleteListById);
app.get('/menu',findAllMenu);
app.get('/list/:date',findListByDate);
app.get('/menu/:menuname',findMenuByName);
app.delete('/menu/:id',deleteMenuById);
app.post('/menu',registerMenu);
app.get('/user',findAllUsers);
app.post('/user',registerUser);
app.get('/user/:username/:password',validateUserPassEncrypt);
app.get('/user/:email',findUserByEmail);
app.put('/user/:id/:updatePass',updateUserById);
//app.get('/sendemail',sendEmail);
app.get('/sendemail/:listuser/:caller/:date',sendEmailNotification);
app.get('/serverhour', GetServerHour);

app.post('/upload',upload);
app.post('/uploadDish',uploadDish);
	
};

