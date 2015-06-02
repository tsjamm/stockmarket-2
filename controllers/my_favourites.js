var async = require('async');
var dataManager = require('./../public/lib/stockData');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {

	/**
		Displays user's favourite searches
	*/
	app.get('/my_favourites',function(req,res) {
		if(req.session && req.session.email) {
			var favourites = [];

			UserSchema.findOne( {email: req.session.email}, function(err,user) {
				if(err) {
					console.log('An error ocurred while searching user. Error: ' + err);
					return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Error searching user data'});
				} else if(!user) {
					console.log('User not found');
					return res.render(__dirname + './../views/home', {errorMessage: 'User not found'});
				}

				async.forEach(user.favourites, function(favourite,next) {
					if(favourite.indexOf('YAHOO') !== -1) {
						favourites.push({favourite: favourite, country: dataManager.getMarketCountry(favourite.slice(favourite.indexOf('YAHOO/')+6,favourite.indexOf('json')-1))});
					} else {
						favourites.push({favourite: favourite});
					}
					next();
				}, function() {
					res.render(__dirname + './../views/my_favourites', {
						username: req.session.username,
						twitterWidget1: req.session.twitterWidget1,
						twitterWidget2: req.session.twitterWidget2,
						favourites: favourites
					});
				});

			});
		}
		else
			res.redirect('/');
	});

	/**
		Deletes selected favourite
	*/
	app.delete('/my_favourites', function(req,res) {
		if(req.session && req.session.email) {
			UserSchema.findOne( {email: req.session.email}, function(err,user) {
				if(err) return res.json(err);
				if(user===null) res.json(err);

				var position = user.favourites.indexOf(req.param('url'));
				
				if(position !== -1) {
					user.favourites.splice(position,1);
					user.save(function(err) {
						if(err) return res.json(err);
						return res.json(user, 200);
					});
				} else {
					return res.json({message: 'Not found'},404);
				}

			});
		}
		else
			res.redirect('/');
	});
	
};

module.exports = route;