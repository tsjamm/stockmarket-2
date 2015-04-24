var dataManager = require('./../public/js/stockData');

var route = function(app) {
	
	app.get('/explore',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/explore', {email: req.session.email,data:null});
		else
			res.redirect('/');
	});

	app.post('/explore', function(req,res) {
		if(req.session && req.session.email) {
			var table;
			var db;


			switch(req.body.target) {
				case 'companies': 
					table=req.body.companyTable; 
					db='WIKI';
					break;
				case 'nationalMarkets': 
					table=req.body.nationalMarketTable;
					db='YAHOO';
			}

			var filters = {
				table: table,
				order: req.body.orderSearch,
				trim_start: req.body.trim_startSearch,
				trim_end: req.body.trim_endSearch,
				colapse: req.body.collapseSearch
			};

			var data = {result: ''};
			
			dataManager.getData(db,filters,function(data) {
				res.render(__dirname + './../views/explore' , { data : data, email: req.session.email});
			});
		}
		else
			res.redirect('/');

	});
};

module.exports = route;