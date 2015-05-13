var TwitterWidgetSchema = require('./../models/TwitterWidgetSchema');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {

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

	app.post('/index',function(req,res) {
		var email = req.body.email;
		var password = req.body.password;

		User.checkLogin(email,password, function(isCorrect) {
			if(isCorrect) {

				User.findByEmail(email, function(err,user){
					if(err)
						return res.render(__dirname + './../views/home',{username: 'Me'});

					TwitterWidgetSchema.find( {account:user.twitterWidget1}, function(err,tws1){
						TwitterWidgetSchema.find({account:user.twitterWidget2}, function(err,tws2){
							req.session.email = email;
							req.session.twitterWidget1 = tws1[0].getLink();
							req.session.twitterWidget2 = tws2[0].getLink();
							req.session.username = user.name;
							
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