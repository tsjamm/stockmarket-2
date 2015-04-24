var multer = require('multer');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app){

	app.use( multer( {
		dest : './users/avatars',
		rename : function(fieldname,filename,req) {
			return req.body.email+req.body.name+req.body.lastname+'Avatar';
		},
		onFileUploadStart : function(file) {
			if(file.extension!='png')
				return false;
		},
		onFileUploadComplete : function(file) {
			console.log('Subida completada');
		}
	}));

	app.get('/register',function(req,res) {
		res.render(__dirname + './../views/register');
	});

	app.post('/register', function(req,res) {
		var userData = {
			email :req.body.email,
			password : req.body.password,
			name : req.body.name,
			lastname : req.body.lastname,
			avatarURL : req.files.avatarURL ? req.body.email+req.body.name+req.body.lastname + 'Avatar' : '',
			lastLogin :new Date()
		};

		
		var newUser = new UserSchema(userData);

		newUser.save(function(err) {
			if(err) return console.log('An error ocurred while trying to create the user. Error: ' + err);

			res.render(__dirname + './../views/message', { 
				message: 'Your account has been successfully created. Please, <a href="/"> log in</a>'
			});

		});
	});
};

module.exports = route;