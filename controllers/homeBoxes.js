var dataManager = require('./../public/lib/stockData');

var route = function(app) {

	/**	DAILY CURRENCIES BOXES IN HOME PAGE*/

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

	/**	DAILY MARKETS BOXES IN HOME PAGE*/

	app.get('/cac_40_today', function(req,res) {
		dataManager.getDailyMarket('cac_40', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/dax_today', function(req,res) {
		dataManager.getDailyMarket('dax', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/ftse_100_today', function(req,res) {
		dataManager.getDailyMarket('ftse_100', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/ibex_35_today', function(req,res) {
		dataManager.getDailyMarket('ibex_35', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/nikkei_225_today', function(req,res) {
		dataManager.getDailyMarket('nikkei_225', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/shangai_composite_today', function(req,res) {
		dataManager.getDailyMarket('shangai_composite', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/sp_500_today', function(req,res) {
		dataManager.getDailyMarket('sp_500', function(result) {
			res.end(JSON.stringify(result));
		});
	});

	app.get('/tsx_composite_today', function(req,res) {
		dataManager.getDailyMarket('tsx_composite', function(result) {
			res.end(JSON.stringify(result));
		});
	});

};

module.exports = route;