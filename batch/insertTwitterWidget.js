var TwitterWidget = require('../models/TwitterWidgetSchema');
var account = process.argv[2];
var dataWidgetId = process.argv[3];


if (account === undefined || dataWidgetId === undefined)
	return console.log('Error. Usage: insertTwitterWidget twitterAccount dataWidgetId');

var twitterWidget = new TwitterWidget({
	account: account,
	dataWidgetId: dataWidgetId
});


twitterWidget.save(function(err) {
	if(err) {
		console.log('Twitter widget could not be saved. Error : ' + err)
	} else {
		console.log('Twitter account saved successfully');
		console.log(twitterWidget);
	}

	process.exit(0);
});
