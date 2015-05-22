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
	twitterWidget1: { type: String, required: true},
	twitterWidget2: {type: String, required: true},
	favourites: {type: []}
});

//Añadiendo un método al esquema mediante nombreEsquema.method('nombreMetodo',metodo);
UserSchema.method('findByEmail',function(email,cb) {
	User.find({email: email}, function(err,docs) {
		if(err)
			cb(err,null);
		cb(null,docs[0]);
	});
});

UserSchema.method('checkLogin',function(email,password,cb){
	User.find({email: email, password: password}, function(err,docs) {
		if(err)
			throw err;
		if(docs.length>0)
			cb(true);
		else
			cb(false);
	});
});

//Devolviendo una instancia del esquema
exports = module.exports = User = mongoose.model('User', UserSchema);