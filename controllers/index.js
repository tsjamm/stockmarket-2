var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {

	app.get('/',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/home', {email: req.session.email});
		else
			res.render(__dirname + './../views/index');
	});	

	app.get('/index',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/home', {email: req.session.email});
		else
			res.render(__dirname + './../views/index');
	});

	app.post('/index',function(req,res) {
		var email = req.body.email;
		var password = req.body.password;

		User.checkLogin(email,password, function(isCorrect) {
			if(isCorrect) {
				req.session.email = email;
				res.render(__dirname + './../views/home', {email: req.session.email});
			}
			else
				res.render(__dirname + './../views/index', { errorMessage: 'This account does not exist or the password is wrong'});
		});
	});

};

module.exports = route;