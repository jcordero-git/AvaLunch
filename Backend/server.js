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

app.get('/', function(req, res) {
  res.send("Hello world!");
});

require('./rutes')(app);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});