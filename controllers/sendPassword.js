var UserSchema = require('../models/UserSchema');
var User = new UserSchema();
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP',{
		service: 'Gmail',
		auth: {
			user: 'quickeconomy@gmail.com',
			pass: ''
		}
});

var route = function(app) {

	app.post('/sendPassword',function(req,res) {

		User.findByEmail(req.body.email, function(err,doc){
			if(!doc) 
				return res.render(__dirname + './../views/index',{ 
					errorMessage:'The account ' + req.body.email + ' does not exist. Please, check it'
				});

			var mailInfo = {
				from:'quickeconomy@gmail.com',
				to: req.body.email,
				subject: 'QuickEconomy. Your account password',
				html: 'Hi, your account password is: ' + doc.password,
			};

			smtpTransport.sendMail(mailInfo,function(err,info) {
				if(err) {
					console.log('Error: ' + err);

					return res.render(__dirname + './../views/index',{ 
					errorMessage:'An error ocurred and the email has not been sent. Sorry, try again'
					});
				} 

				console.log('Mail sent. Response: ' + info.message);
				return res.render(__dirname + './../views/index',{ 
					infoMessage:'An email has been sent to your account. Please check it'
				});
			});
		});
	});
};

module.exports = route;