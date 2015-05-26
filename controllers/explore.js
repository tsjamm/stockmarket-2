
var dataManager = require('./../public/lib/stockData');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {
	
	app.get('/explore',function(req,res) {
		if(req.session && req.session.email) {
			res.render(__dirname + './../views/explore', {
				data:null,
				username: req.session.username,
				twitterWidget1: req.session.twitterWidget1,
				twitterWidget2: req.session.twitterWidget2
			});
		} else {
			res.redirect('/');
		}
	});

	app.get('/showfavourite/:url', function(req,res) {
		console.log(' TEST : ' + decodeURIComponent(req.param('url')));

		if(req.session && req.session.email) {
			dataManager.getTableDataFromURL(decodeURIComponent(req.param('url')), function(data) {
				res.render(__dirname + './../views/explore' , { 
						data : data, 
						username: req.session.username,
						twitterWidget1: req.session.twitterWidget1,
						twitterWidget2: req.twitterWidget2
					});
			});
		} else { res.redirect('/'); }
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
					if(err || !user) {
						console.log('An error ocurred while searching user. Error: ' + err);
						return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Error searching user data'});
					} 
						var favourite = 'https://www.quandl.com/api/v1/datasets/'+ db + '/' + filters.table + '.json?sort_order='+filters.sort_order+
							'&trim_start='+filters.trim_start+'&trim_end='+filters.trim_end+'&collapse='+filters.collapse + '&auth_token=rgC48yaay4DWshssN2Yp';
						user.favourites.push(favourite);

						user.save(function(err){
							if(err) {
								console.log('An error ocurred while saving user changes. Error: ' + err);
								return res.render(__dirname + './../views/home', {username: req.session.username, errorMessage: 'Error saving favourite'});
							} 
							console.log('Favourite saved');
						});
					});
				}


				return res.render(__dirname + './../views/explore' , { 
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