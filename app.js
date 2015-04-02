var
	express = require('express'),
	app = express(),
	consolidate = require('consolidate'),
	routes = require('./controllers/routes');

	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/'));
	app.listen(3000);

	routes(app);