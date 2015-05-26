var route = function(app) {

	/**
		Cleans session data and redirect to login page when the user log out
	*/
	app.get('/logout', function(req,res) {
		if(req.session && req.session.email)
			req.session.destroy(function(err) {
				if(err) console.log('Error while closing session. Error: ' + err);
				res.redirect('/');
			});
		else
			res.redirect('/');
	});
};

module.exports = route;