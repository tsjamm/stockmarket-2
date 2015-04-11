var dataManager = require('./../public/js/stockData');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();
var request = require('request');

var route = function(app) {
	app.get('/',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/home', {email: req.session.email});
		else
			res.render(__dirname + './../views/index');
	});	

	app.get('/about',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/about', {email: req.session.email});
		else
			res.redirect('/');
	});

	app.get('/explore',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/explore', {email: req.session.email});
		else
			res.redirect('/');
	});

	app.get('/help',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/help', {email: req.session.email});
		else
			res.redirect('/');
	});

	app.get('/index',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/home', {email: req.session.email});
		else
			res.render(__dirname + './../views/index');
	})

	app.post('/index',function(req,res) {
		var email = req.body.email;
		var password = req.body.password;

		User.checkLogin(email,password, function(isCorrect) {
			if(isCorrect) {
				req.session.email = email;
				res.render(__dirname + './../views/home', {email: req.session.email});
			}
			else
				res.render(__dirname + './../views/index', { errorMessage: 'This account does not exist or the password is wrong. Please, check it'});
		});
	});

	app.get('/logout', function(req,res) {
		if(req.session && req.session.email)
			req.session.destroy(function(err) {
				if(err)
					return console.log('Error while closing session. Error: ' + err);
				res.redirect('/');
			});
		else
			res.redirect('/');
	});

	app.get('/my_favourites',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/my_favourites', {email: req.session.email});
		else
			res.redirect('/');
	});

	app.get('/my_finances',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/my_finances', {email: req.session.email});
		else
			res.redirect('/');
	});

	app.get('/profile',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/profile', {email: req.session.email});
		else
			res.redirect('/');
	});

	app.get('/register',function(req,res) {
		res.render(__dirname + './../views/register');
	});

	app.post('/register', function(req,res) {
		var userData = {
			email :req.body.email,
			password : req.body.password,
			name : req.body.name,
			lastname : req.body.lastname,
			avatarURL :req.body.avatarURL,
			lastLogin :new Date(),
		}
		
		var user = new User(userData);

		user.save(function(err) {
			if(err) {
				return console.log('An error ocurred while trying to create the user. Error: ' + err);
			}

			res.render(__dirname + './../views/message', { message: 'Your account has been successfully created. Please, <a href="/"> log in</a>'})

		});
	});

	app.post('/result', function(req,res) {
		if(req.session && req.session.email) {
			var filters = {
				table: req.body.tableSearch,
				order: req.body.orderSearch,
				trim_start: req.body.trim_startSearch,
				trim_end: req.body.trim_endSearch,
				colapse: req.body.collapseSearch
			};

			var data = {result: ''};
			dataManager.getData(filters,function(data) {
				res.render(__dirname + './../views/result' , { data : data, email: req.session.email});
			});
		}
		else
			res.redirect('/');

	});

	app.get('*', function(req,res) {
		res.render(__dirname + './../views/message', { message: '<h3> This page does not exist, but...You can check the rest of our pages!!!</h3> '});
	});

}

module.exports = route;
