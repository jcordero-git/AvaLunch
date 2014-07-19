var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var emailsentSh = new Schema({
	date: String,
	caller: String
});

module.exports = mongoose.model('emailsents', emailsentSh);