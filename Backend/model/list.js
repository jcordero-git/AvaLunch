var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var listSh = new Schema({
	idMenu: String,
	idUser: String,
	date: String
});

module.exports = mongoose.model('Lists', listSh);