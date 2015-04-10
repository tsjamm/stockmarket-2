var 
	Schema = require('mongoose').Schema;

var UserSchema = new Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	lastname: {type: String, required: true},
	avatarURL : {type: String},
	lastLogin: { type: Date},
});


exports = module.exports = UserSchema;
