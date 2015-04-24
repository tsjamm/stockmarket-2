var route = function(app) {

	app.get('/my_favourites',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/my_favourites', {email: req.session.email});
		else
			res.redirect('/');
	});
	
};

module.exports = route;