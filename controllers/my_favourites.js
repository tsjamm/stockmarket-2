var route = function(app) {

	app.get('/my_favourites',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/my_favourites', {
				username: req.session.username,
				twitterWidget1: user.session.twitterWidget1,
				twitterWidget2: user.twitterWidget2
			});
		else
			res.redirect('/');
	});
	
};

module.exports = route;