var dataManager = require('./../public/js/stockData');
var User = require('./../models/UserSchema');
var request = require('request');

var route = function(app) {
	app.get('/',function(req,res) {
		res.render(__dirname + './../views/index');
	});	

	app.get('/about',function(req,res) {
		res.render(__dirname + './../views/about');
	});

	app.get('/explore',function(req,res) {
		res.render(__dirname + './../views/explore');
	});

	app.post('/result', function(req,res) {
		var filters = {
			table: req.body.tableSearch,
			order: req.body.orderSearch,
			trim_start: req.body.trim_startSearch,
			trim_end: req.body.trim_endSearch,
			colapse: req.body.collapseSearch
		};

		var data = {result: ''};
		dataManager.getData(filters,function(data) {
			res.render(__dirname + './../views/result' , { data : data});
		});

	});

	app.get('/help',function(req,res) {
		res.render(__dirname + './../views/help');
	});

	app.post('/index',function(req,res) {
		var email = req.body.email;
		var password = req.body.password;
		if(email=='antonio@gmail.com' && password=='123') {
			res.render(__dirname + './../views/home');
		}
		else {
			res.render(__dirname+ './../views/index');
		}
	});

	app.get('/my_favourites',function(req,res) {
		res.render(__dirname + './../views/my_favourites');
	});

	app.get('/my_finances',function(req,res) {
		res.render(__dirname + './../views/my_finances');
	});

	app.get('/profile',function(req,res) {
		res.render(__dirname + './../views/profile');
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

	app.get('*', function(req,res) {
		res.render(__dirname + './../views/message', { message: '<h3> This page does not exist, but...You can check the rest of our pages!!!</h3> '});
	});

}

module.exports = route;
