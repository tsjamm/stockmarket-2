var TwitterWidgetSchema = require('./../models/TwitterWidgetSchema');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {

	/**
		Displays login page or home page if the user is logged
	*/
	app.get('/',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/home', {
				username: req.session.username,
				twitterWidget1: req.session.twitterWidget1,
				twitterWidget2: req.session.twitterWidget2
			});
		else
			res.render(__dirname + './../views/index');
	});	

	/**
		Displays login page
	*/
	app.get('/index',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/home', {
				username: req.session.username,
				twitterWidget1: req.session.twitterWidget1,
				twitterWidget2: req.session.twitterWidget2
			});
		else
			res.render(__dirname + './../views/index');
	});

	/**
		Process login data and render home if email and password are corrects
	*/
	app.post('/index',function(req,res) {
		var email = req.body.email;
		var password = req.body.password;

		User.checkLogin(email,password, function(isCorrect) {
			if(isCorrect) {

				User.findByEmail(email, function(err,user){
					if(err) {
							console.log('Error searching user : ' + err);
							return res.render(__dirname + './../views/index', {errorMessage: 'Error searching user'});
					} else if(!user) {
						console.log('User not found');
						return res.render(__dirname + './../views/index', {errorMessage: 'User not found'});
					}

					TwitterWidgetSchema.find( {account:user.twitterWidget1}, function(err,tws1){
						if (err) {
							console.log('Error retrieving Twitter widget : ' + err);
							return res.render(__dirname + './../views/index', {errorMessage: 'Error retrieving Twitter widget'});
						} 
						TwitterWidgetSchema.find({account:user.twitterWidget2}, function(err,tws2){
							if (err) {
								console.log('Error retrieving Twitter widget : ' + err);
								return res.render(__dirname + './../views/index', {errorMessage: 'Error retrieving Twitter widget'});
							}
							req.session.email = email;
							req.session.twitterWidget1 = tws1[0] ? tws1[0].getLink() : '';
							req.session.twitterWidget2 = tws2[0] ? tws2[0].getLink() : '';
							req.session.username = user.name;
							req.session.userId = user._id;
							
							res.render(__dirname + './../views/home',{
								username: req.session.username,
								twitterWidget1: req.session.twitterWidget1,
								twitterWidget2: req.session.twitterWidget2
							});
						});
					});

				} );
				
			}
			else
				res.render(__dirname + './../views/index', { errorMessage: 'This account does not exist or the password is wrong'});
		});
	});

};

module.exports = route;