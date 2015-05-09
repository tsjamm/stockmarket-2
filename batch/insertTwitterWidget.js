var TwitterWidget = require('../models/TwitterWidgetSchema');
var twitterAccount = process.argv[2];
var dataWidgetId = process.argv[3];


if (twitterAccount === undefined || dataWidgetId === undefined)
	return console.log('Error. Usage: insertTwitterWidget twitterAccount dataWidgetId');

var twitterWidget = new TwitterWidget({
	twitterAccount: twitterAccount,
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
