
var route = function(app) {
	app.get('/',function(req,res) {
		res.render(__dirname + './../views/home');
	});

	app.get('/about',function(req,res) {
		res.render(__dirname + './../views/about');
	});

	app.get('/explore',function(req,res) {
		res.render(__dirname + './../views/explore');
	});

	app.get('/help',function(req,res) {
		res.render(__dirname + './../views/help');
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

	app.get('*', function(req,res) {
		res.render(__dirname + './../views/error');
	});
}

module.exports = route;
