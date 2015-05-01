var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app){

	app.get('/profile',function(req,res) {
		if(req.session && req.session.email) {
			User.findByEmail(req.session.email,function(err,user){
				if(err) {
					console.log('An error ocurred while trying to access to user profile. Error: ' + err);
					return res.render(__dirname + './../views/message', {username: req.session.username, message: 'Your profile could not be loaded'});
				}
				else res.render(__dirname + './../views/profile', {username: req.session.username, user: user});
			});
		}
		else res.redirect('/');
	});

	app.post('/profile',function(req,res) {
		if(req.session && req.session.email) {
			User.findByEmail(req.session.email,function(err,user) {
				if(err) {
					console.log('An error ocurred while trying update your profile. Error: ' + err);
					return res.render(__dirname + './../views/message', {username: req.session.username, message: 'Your profile could not be updated'});
				}
				else {	
					user.email = req.body.email;
					user.name = req.body.name;
					user.lastname = req.body.lastname;
					if(req.body.newPassword1)
						if(req.body.newPassword1==req.body.newPassword2)
							user.password = req.body.newPassword1;

					user.save(function(err) {
						if(err) {
							console.log('Error while saving updated profile');
							return res.render(__dirname + './../views/message', {username: req.session.username, message: 'Your profile could not be updated'});
						}
						else res.render(__dirname + './../views/home', {username: req.session.username});	
					});
				}
			});
		}
		else res.redirect('/');
	});
};

module.exports = route;