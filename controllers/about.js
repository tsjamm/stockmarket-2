var route = function(app) {

	app.get('/about',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/about', {email: req.session.email});
		else
			res.redirect('/');
	});
};

module.exports = route;