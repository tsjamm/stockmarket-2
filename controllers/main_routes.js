
var route = function(app) {
	app.get('/',function(req,res) {
		res.render(__dirname + './../views/index', {layout: __dirname + './../views/layout'});
	});

	app.get('*', function(req,res) {
		res.render('error');
	});
}

module.exports = route;
