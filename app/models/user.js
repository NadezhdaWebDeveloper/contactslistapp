var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;
var bcrypt 		= require('bcrypt-nodejs');

mongoose.Promise = require('bluebird');

var userSchema = new Schema({
	username: { type: String, lowercase: true, required: true, unique: true },
	userpswd: { type: String, required: true },
	useremail: { type: String, lowercase: true, required: true, unique: true }
});

userSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.userpswd, null, null, function(err, hash) {
		if (err) return next(err);
		user.userpswd = hash;
		next();
	});
});

// Validation the user password for authenticate
userSchema.methods.comparePassword = function(pswd){
	return bcrypt.compareSync(pswd, this.userpswd);
};

module.exports = mongoose.model('User', userSchema);