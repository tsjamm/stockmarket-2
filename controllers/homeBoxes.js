var dataManager = require('./../public/lib/stockData');

var route = function(app) {

	/**	DAILY CURRENCIES BOXES IN HOME PAGE*/

	app.get('/increment/:currency', function(req, res) {
		switch(req.param('currency')) {
			case 'euro' : 
				dataManager.getEuroIncrement(function(result) {
					res.json(result, 200);
				});
				break;

			case 'gbp' :
				dataManager.getGBPIncrement(function(result) {
					res.json(result, 200);
				});
				break;

			case 'usd':
				dataManager.getUSDIncrement(function(result) {
					res.json(result, 200);
				});
				break;

			case 'yen': 
				dataManager.getYenIncrement(function(result) {
					res.json(result, 200);
				});
				break;
			default: res.json({message: 'Increment not found'},404);
		}
	});

	/** DAILY EXCHANGES IN HOME PAGE */

	app.get('/currency-from-to/:currencyFrom/:currencyTo', function(req, res) {
		var from = req.param('currencyFrom') !== '' ? req.param('currencyFrom').toUpperCase() : '';
		var to = req.param('currencyTo') !== '' ? req.param('currencyTo').toUpperCase() : '';
		var availableFrom = ['USD','EUR'];
		var availableTo = ['USD','EUR','GBP','JPY'];

		if ( availableFrom.indexOf(from) === -1 || availableTo.indexOf(to) === -1 )
			return res.json({message: 'Data not found'}, 404);

		dataManager.getDailyCurrencyExchange(from, to, function(result) {
			res.json(result,200);
		});
	});

	/**	DAILY MARKETS BOXES IN HOME PAGE*/

	app.get('/daily_stock/:stock', function(req, res) {
		var availableDailyStocks = ['cac_40','dax','ftse_100','ibex_35','nikkei_225','shangai_composite', 'sp_500', 'tsx_composite'];	
		if(availableDailyStocks.indexOf(req.param('stock')) !== -1) {
			dataManager.getDailyMarket(req.param('stock'), function(result) {
				return res.json(result,200);
			});
		} else {
			return res.json({message:'Daily stock not found'},404);
		}
	});

};

module.exports = route;