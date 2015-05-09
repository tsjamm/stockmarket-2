var mongoose = require('mongoose');
var Schema = mongoose.Schema; //Para crear una instancia de Schema
var db = mongoose.connect('mongodb://localhost/stockmarket'); //Para conectar a la base de datos

var TwitterWidgetSchema = new Schema({
	dataWidgetId: {type: String, required: true},
	twitterAcount: {type: String, required: true}
});

TwitterWidgetSchema.method('getLink',function(twitterAcount) {
	TwitterWidget.find({twitterAccount: twitterAccount}, function(err,docs) {
		if(err) return console.log('Error retrieving Twitter Widget');
		if(docs.length===0) return console.log('No Twitter Widget found');

		return '<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/' + twitterAccount +'" data-theme="light"'+ 
		'data-chrome="noheader nofooter noborders transparent" data-widget-id="' + docs[0].dataWidgetId + 
		'">Tweets by @' + twitterAccount + '</a>';
	});
});


//Devolviendo una instancia del esquema
exports = module.exports = TwitterWidget = mongoose.model('TwitterWidget', TwitterWidgetSchema);