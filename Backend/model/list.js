var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var listSh = new Schema({
	menuname: String,
	username: String,
	date: String
});

module.exports = mongoose.model('Lists', listSh);