var
	express = require('express'),
	app = express(),
	consolidate = require('consolidate'),
	routes = require('./controllers/routes'),
	bodyParser = require('body-parser'),
	expressSession = require('express-session'),
	favicon = require('serve-favicon');

	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(expressSession({
		secret:'abcdefghijklmnopqrstuvwxyz',
		resave: false,
		saveUninitialized:false
	}));
	app.use(favicon(__dirname + '/public/img/favicon.png'));
	app.listen(3000);

	routes(app);
	console.log('Server listening at 3000');