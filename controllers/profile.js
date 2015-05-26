var TwitterWidget = require('./../models/TwitterWidgetSchema');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app){

	/**
		Displays user profile
	*/
	app.get('/profile',function(req,res) {
		if(req.session && req.session.email) {

			TwitterWidget.find({}, function(err,tws) {
				if (err) {
					console.log('Error retrieving Twitter widget : ' + err);
					return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Error retrieving Twitter widget'});
				}

				User.findByEmail(req.session.email,function(err,user){
					if(err) {
						console.log('An error ocurred while trying to access to user profile. Error: ' + err);
						return res.render(__dirname + './../views/home', {
							username: req.session.username, 
							errorMessage: 'Your profile could not be loaded'
						});
					} else if(!user) {
						console.log('No user found');
						return res.render(__dirname + './../views/home', {
							username: req.session.username, 
							errorMessage: 'User not found'
						});
					} else res.render(__dirname + './../views/profile', {
						username: req.session.username,
						user: user,
						twitterWidgets : tws
					});
				});
			});

		}
		else res.redirect('/');
	});

	/**
		Saves basic profile data changes
	*/
	app.post('/profileBasic',function(req,res) {

		if(req.session && req.session.email) {
			User.findByEmail(req.session.email,function(err,user) {
				if(err) {
					console.log('An error ocurred while trying update your profile. Error: ' + err);
					return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Your profile could not be updated'});
				} else if(!user) {
					console.log('No user found');
					return res.render(__dirname + './../views/home', {
						username: req.session.username, 
						errorMessage: 'User not found'
					});
				} else {	
					user.email = req.body.email;
					user.name = req.body.name;
					user.lastname = req.body.lastname;

					if(req.body.newPassword1)
						if(req.body.newPassword1===req.body.newPassword2)
							user.password = req.body.newPassword1;

					user.save(function(err) {
						if(err) {
							console.log('Error while saving updated profile');
							return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Your profile could not be updated'});
						}
						else res.render(__dirname + './../views/home', {
							username: req.session.username,
							twitterWidget1: req.session.twitterWidget1,
							twitterWidget2: req.session.twitterWidget2
						});	
					});
				}
			});
		} else res.redirect('/');
	});

	/**
		Saves user's twitter widget new preferences
	*/
	app.post('/profileTwitterWidget', function(req,res) {
		if(req.session && req.session.email) {
			User.findByEmail(req.session.email,function(err,user) {

				if(err) {
					console.log('Error searching user ' + err);
					return res.render(__dirname + './../views/home', {
						username: req.session.username, 
						errorMessage: 'Error searching user'
					});
				} else if(!user) {
					console.log('No user found');
					return res.render(__dirname + './../views/home', {
						username: req.session.username, 
						errorMessage: 'User not found'
					});
				}

				user.twitterWidget1= req.body.defaultTwitterWidget1,
				user.twitterWidget2= req.body.defaultTwitterWidget2,
				user.save(function(err) {
					if(err) {
							console.log('Error while saving updated profile');
							return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Your profile could not be updated'});
						} else {

							TwitterWidget.findOne({account: user.twitterWidget1}, function(err,tw1) {
								if (err) {
									console.log('Error retrieving Twitter widget : ' + err);
									return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Error retrieving Twitter widget'});
								}
								TwitterWidget.findOne({account: user.twitterWidget2}, function(err,tw2) {
									if (err) {
										console.log('Error retrieving Twitter widget : ' + err);
										return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Error retrieving Twitter widget'});
									}

									req.session.twitterWidget1= tw1!==null ? tw1.getLink() : req.session.twitterWidget1;
									req.session.twitterWidget2=  tw2!==null ? tw2.getLink() : req.session.twitterWidget2;
									
									res.render(__dirname + './../views/home', {
										username: req.session.username,
										twitterWidget1: req.session.twitterWidget1,
										twitterWidget2: req.session.twitterWidget2
									});
								});
							});
						}	
				});
			});
		} else res.redirect('/');
	});
};

module.exports = route;