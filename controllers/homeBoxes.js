var dataManager = require('./../public/lib/stockData');

var route = function(app) {
	app.get('/euroincrement', function(req,res) {
		dataManager.getEuroIncrement(function(result) {
			res.end(result);
		});
	});

	app.get('/gbpincrement', function(req,res) {
		dataManager.getGBPIncrement(function(result) {
			res.end(result);
		});
	});

	app.get('/usdincrement', function(req,res) {
		dataManager.getUSDIncrement(function(result) {
			res.end(result);
		});
	});

	app.get('/yenincrement', function(req,res) {
		dataManager.getYenIncrement(function(result) {
			res.end(result);
		});
	});

	app.get('/usdtoeuro', function(req,res) {
		dataManager.getDailyCurrencyExchange('USD','EUR', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/usdtogbp', function(req,res) {
		dataManager.getDailyCurrencyExchange('USD','GBP', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/usdtoyen', function(req,res) {
		dataManager.getDailyCurrencyExchange('USD','JPY', function(result) {
			res.end(JSON.stringify(result));
		});
	});


	app.get('/eurotodollar', function(req,res) {
		dataManager.getDailyCurrencyExchange('EUR','USD', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/eurotogbp', function(req,res) {
		dataManager.getDailyCurrencyExchange('EUR','GBP', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/eurotoyen', function(req,res) {
		dataManager.getDailyCurrencyExchange('EUR','JPY', function(result) {
			res.end(JSON.stringify(result));
		});
	});

};

module.exports = route;