var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app){

	/**
		Creates a new user
	*/
	app.post('/register', function(req,res) {
		User.findByEmail(req.body.email, function(err,user) {
			if(err) {
					console.log('Error checking users database ' + err);
					return res.render(__dirname + './../views/index', {errorMessage: 'Error checking user database'});
			}
			
			if(user) return res.render(__dirname + './../views/index',  { errorMessage: 'This email has been used before'});

			var userData = {
				email :req.body.email,
				password : req.body.password,
				name : req.body.name,
				lastname : req.body.lastname,
				avatarURL : req.files.avatarURL ? req.body.email+req.body.name+req.body.lastname + 'Avatar' : '',
				lastLogin :new Date(),
				twitterWidget1: 'forbes',
				twitterWidget2: 'TheEconomist',
				favourites: []
			};

			var newUser = new UserSchema(userData);

			newUser.save(function(err) {
				if(err) {
					console.log('An error ocurred while trying to create the user. Error: ' + err);
					return res.render(__dirname + './../views/index',  { errorMessage: "The account could not be created"});
				}

				res.render(__dirname + './../views/index',  { infoMessage: 'Your account has been successfully created'});
			});
		});
		
	});
};

module.exports = route;