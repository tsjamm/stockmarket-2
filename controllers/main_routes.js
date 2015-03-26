
var route = function(app) {
	app.get('/',function(req,res) {
		res.render(__dirname + './../views/index');
	});

	app.get('*', function(req,res) {
		res.render(__dirname + './../views/error');
	});
}

module.exports = route;
