var mongoose = require('mongoose');
var Schema = mongoose.Schema; //Para crear una instancia de Schema
var db = mongoose.connect('mongodb://localhost/stockmarket'); //Para conectar a la base de datos

var UserSchema = new Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	lastname: {type: String, required: true},
	avatarURL : {type: String},
	lastLogin: { type: Date},
});

//Añadiendo un método al esquema mediante nombreEsquema.method('nombreMetodo',metodo);
UserSchema.method('findByEmail',function(email,cb) {
	User.find({email: email}, function(err,docs) {
		if(err)
			throw err;
		cb(docs);
	});
});

//Devolviendo una instancia del esquema
var User = mongoose.model('User', UserSchema)
exports = module.exports = User;