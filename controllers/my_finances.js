var StockSchema = require('./../models/StockSchema');
var UserSchema = require('./../models/UserSchema');
var User = new UserSchema();

var route = function(app) {

	app.get('/my_finances',function(req,res) {
		if(req.session && req.session.email) {
			StockSchema.find({},function(err,stocks) {
				if(err)
					return res.render(__dirname + './../views/message', { message: 'An error ocurred while trying to retrieve your stocks'});

				res.render(__dirname + './../views/my_finances', {username: req.session.username, stocks: stocks});
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
						res.render(__dirname + './../views/my_finances', {username: req.session.username});
				});
			});
		} else res.redirect('/');
	});

};

module.exports = route;