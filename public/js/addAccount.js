var db = require('mongoose').createConnection('mongodb://localhost/test');

var userSchema = require('./../../models/UserSchema');
var User = db.model('user',userSchema);

var data = {
	name : 'Mari',
	lastname: 'Dominguez',
	email: 'mari@gmail.com',
	password:'123'
};

var user = new User(data);

user.save(function(err,data) {
	if(err)
		console.log('ERROR: ' + err);
	else
		console.log('INSERTADO CORRECTAMENTE: ' + data);
});

