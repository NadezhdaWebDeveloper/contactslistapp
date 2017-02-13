var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

mongoose.Promise = require('bluebird');

var contactSchema = new Schema({
	name: { type: String, lowercase: true, required: true },
	email: { type: String, required: true, unique: true },
	number: { type: String, required: true, unique: true }
});

// Validation the contact email
contactSchema.methods.validateEmail = function(email){};
// Validation the contact phone
contactSchema.methods.validatePhone = function(number){};

module.exports = mongoose.model('Contact', contactSchema);