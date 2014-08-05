var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var emailsentSh = new Schema({
	date: String,
	caller: String,
	callMade: Boolean
});

module.exports = mongoose.model('emailsents', emailsentSh);