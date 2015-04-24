var route = function(app) {

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
};

module.exports = route;