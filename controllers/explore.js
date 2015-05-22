
var dataManager = require('./../public/lib/stockData');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {
	
	app.get('/explore',function(req,res) {
		if(req.session && req.session.email)
			res.render(__dirname + './../views/explore', {
				data:null,
				username: req.session.username,
				twitterWidget1: req.session.twitterWidget1,
				twitterWidget2: req.session.twitterWidget2
			});
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
			
			dataManager.getTableData(db,filters,function(data) {

				if(req.body.addFavourite) {
					UserSchema.findOne({email: req.session.email}, function(err,user) { 
						if(err) return console.log('Error getting user: ' + err);

						var favourite = 'https://www.quandl.com/api/v1/datasets/'+ db + '/' + filters.table + '.json?sort_order='+filters.sort_order+
							'&trim_start='+filters.trim_start+'&trim_end='+filters.trim_end+'&collapse='+filters.collapse + '&auth_token=rgC48yaay4DWshssN2Yp';
						user.favourites.push(favourite);

						user.save(function(err){
							if(err)
								return console.log('Error saving favourite : ' + err);
							console.log('Favourite saved');
						});
					});
				}

				res.render(__dirname + './../views/explore' , { 
					data : data, 
					username: req.session.username,
					twitterWidget1: req.session.twitterWidget1,
					twitterWidget2: req.twitterWidget2
				});
			});
		}
		else
			res.redirect('/');

	});
};

module.exports = route;