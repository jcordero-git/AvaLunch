var express = require('express');
var mongoose=require('mongoose');
var app = express();

mongoose.connect('mongodb://admin:admin@ds027799.mongolab.com:27799/foodproviders', function(err,res){
	if(err) console.log('Error en la conexion con Mongo'+ err);
	else console.log('conexion exitosa con Mongo');
});

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});
/*
app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
*/


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 


require('./rutes')(app);

app.listen(80, function() {
  console.log("Node server running on http://localhost:3000");
});



