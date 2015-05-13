var mongoose = require('mongoose');
var Schema = mongoose.Schema; //Para crear una instancia de Schema

var TwitterWidgetSchema = new Schema({
	account: {type: String, required: true},
	dataWidgetId: {type: String, required: true}
});

TwitterWidgetSchema.methods.getLink = function() {
	return ('<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/' + this.account +'" data-theme="light"'+ 
	'data-chrome="noheader nofooter noborders transparent" data-widget-id="' + this.dataWidgetId + 
	'">Tweets by @' + this.account + '</a>');
};


//Devolviendo una instancia del esquema
exports = module.exports = TwitterWidget = mongoose.model('TwitterWidget', TwitterWidgetSchema);