var dataManager = require('./../public/lib/stockData');
var StockSchema = require('./../models/StockSchema');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {

	app.get('/my_finances',function(req,res) {
		if(req.session && req.session.email) {
			StockSchema.find({},function(err,stocks) {
				if(err) return res.render(__dirname + './../views/message', { message: 'An error ocurred while trying to retrieve your stocks'});

				res.render(__dirname + './../views/my_finances', {
					username: req.session.username,
					twitterWidget1: req.session.twitterWidget1,
					twitterWidget2: req.session.twitterWidget2,	
					stocks: stocks
				});
			});
			
		}
		else
			res.redirect('/');
	});

	app.post('/my_finances', function(req,res) {
		if(req.session && req.session.email) {
			User.findByEmail(req.session.email,function(err,doc){
				var data = {
					ownerId:doc._id,
					dateBought: new Date(req.body.dateBought),
					acquisitionValue: req.body.acquisitionValue,
					amount : req.body.amount,
					company : req.body.company
				};
				var newStock = new StockSchema(data);

				newStock.save(function(err) {
					if(err) {
						console.log('ERROR : ' + err);
						res.render(__dirname + './../views/message',{message:'Your stock could not be saved, please try again'});
					}
					else
						res.redirect('/my_finances');
				});
			});
		} else res.redirect('/');
	});


	app.post('/getLastOfCompany', function(req,res) {
		var db='WIKI';

		var filters = {
				table: req.body.company,
				order: '',
				trim_start: req.body.trim_startSearch,
				trim_end: '',
				colapse: ''
			};

			var data = {result: ''};
			
			dataManager.getTableData(db,filters,function(data) {
				return res.json(data);
			});
	});

	app.delete('/my_finances/:idStock', function(req,res) {
		StockSchema.remove({_id : req.param('idStock')}, function(err) {
			if(err)
				return res.json(err,500);
			else res.json('OK',200);
		});
	});
};

module.exports = route;