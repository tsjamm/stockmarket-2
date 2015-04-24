var dataManager = require('./../public/js/stockData');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();
var StockSchema = require('./../models/StockSchema');
var Stock = new StockSchema();
var request = require('request');
var multer = require('multer'); 

var route = function(app) {


	app.use( multer( {
		dest : './users/avatars',
		rename : function(fieldname,filename,req) {
			return req.body.email+'Avatar';
		},
		onFileUploadStart : function(file) {
			if(file.extension!='png')
				return false;
		},
		onFileUploadComplete : function(file) {
			console.log('Subida completada');
		}
	}));


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
			res.render(__dirname + './../views/explore', {email: req.session.email,data:null});
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
				res.render(__dirname + './../views/message', { message: 'This account does not exist or the password is wrong. Please, check it'});
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
		if(req.session && req.session.email) {
			StockSchema.find({},function(err,stocks) {
				if(err)
					return res.render(__dirname + './../views/message', { message: 'An error ocurred while trying to retrieve your stocks'});

				res.render(__dirname + './../views/my_finances', {email: req.session.email, stocks: stocks});
			});
			
		}
		else
			res.redirect('/');
	});

	app.get('/profile',function(req,res) {
		if(req.session && req.session.email) {
			User.findByEmail(req.session.email,function(err,user){
				if(err) {
					console.log('An error ocurred while trying to access to user profile. Error: ' + err);
					return res.render(__dirname + './../views/message', {email: req.session.email, message: 'Your profile could not be loaded'});
				}
				else
					res.render(__dirname + './../views/profile', {email: req.session.email, user: user});
			});
		}
		else
			res.redirect('/');
	});

	app.post('/profile',function(req,res) {
		if(req.session && req.session.email) {
			User.findByEmail(req.session.email,function(err,user) {
				if(err) {
					console.log('An error ocurred while trying update your profile. Error: ' + err);
					return res.render(__dirname + './../views/message', {email: req.session.email, message: 'Your profile could not be updated'});
				}
				else
				{	
					user.email = req.body.email;
					user.name = req.body.name;
					user.lastname = req.body.lastname;
					if(req.body.newPassword1)
						if(req.body.newPassword1==req.body.newPassword2)
							user.password = req.body.newPassword1;

					user.save(function(err) {
						if(err) {
							console.log('Error while saving updated profile');
							return res.render(__dirname + './../views/message', {email: req.session.email, message: 'Your profile could not be updated'});
						}
						else {
							res.render(__dirname + './../views/home', {email: req.session.email});	
						}
					});
				}
			});
		}
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
			avatarURL : req.files.avatarURL ? req.body.email + 'Avatar' : '',
			lastLogin :new Date()
		};

		
		var newUser = new UserSchema(userData);

		newUser.save(function(err) {
			if(err) {
				return console.log('An error ocurred while trying to create the user. Error: ' + err);
			}

			res.render(__dirname + './../views/message', { message: 'Your account has been successfully created. Please, <a href="/"> log in</a>'})

		});
	});

	app.post('/explore', function(req,res) {
		if(req.session && req.session.email) {
			var table;
			var db;


			switch(req.body.target) {
				case 'companies': 
					table=req.body.companyTable; 
					db='WIKI';
					break;
				case 'nationalMarkets': 
					table=req.body.nationalMarketTable;
					db='YAHOO';
			}

			var filters = {
				table: table,
				order: req.body.orderSearch,
				trim_start: req.body.trim_startSearch,
				trim_end: req.body.trim_endSearch,
				colapse: req.body.collapseSearch
			};

			var data = {result: ''};
			
			dataManager.getData(db,filters,function(data) {
				res.render(__dirname + './../views/explore' , { data : data, email: req.session.email});
			});
		}
		else
			res.redirect('/');

	});


	app.post('/my_finances', function(req,res) {
		if(req.session && req.session.email) {
			User.findByEmail(req.session.email,function(err,doc){
				var data = {
					ownerId:doc._id,
					dateBought: new Date(req.body.dateBought),
					amount : req.body.amount,
					company : req.body.company
				};
				var newStock = new StockSchema(data);

				newStock.save(function(err) {
					if(err) {
						console.log('ERROR : ' + err);
						res.render(__dirname + './../views/message',{message:'Your stock could not be saved, please try again'});
					}
					else
						res.render(__dirname + './../views/my_finances', {email: req.session.email});
				});
			});
		} else res.redirect('/');
	});
};

module.exports = route;
