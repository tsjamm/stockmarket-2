var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {

	app.get('/my_favourites',function(req,res) {
		if(req.session && req.session.email) {


			UserSchema.findOne( {email: req.session.email}, function(err,user) {
				if(err) return console.log('Error reading user data : ' + err);

				res.render(__dirname + './../views/my_favourites', {
					username: req.session.username,
					twitterWidget1: req.session.twitterWidget1,
					twitterWidget2: req.session.twitterWidget2,
					favourites: user.favourites
				});
			});
		}
		else
			res.redirect('/');
	});

	app.delete('/my_favourites', function(req,res) {
		if(req.session && req.session.email) {
			UserSchema.findOne( {email: req.session.email}, function(err,user) {
				if(err) return res.json(err);
				if(user===null) res.json(err);

				var position = user.favourites.indexOf(req.param('url'));
				if(position !== -1) {
					user.favourites.splice(position,1);
				}

				user.save(function(err) {
					if(err) return res.json(err);
					return res.json(user, 200);
				});
			});
		}
		else
			res.redirect('/');
	});
	
};

module.exports = route;