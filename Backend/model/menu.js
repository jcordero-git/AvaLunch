var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var menuSh = new Schema({
	menuname: String,
	price: String
});

module.exports = mongoose.model('Menus', menuSh);