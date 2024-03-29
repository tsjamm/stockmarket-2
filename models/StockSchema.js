var mongoose = require('mongoose');
var Schema = mongoose.Schema; //Para crear una instancia de Schema

var StockSchema = new Schema({
	ownerId: { type:String, required:true},
	dateBought: { type:Date, required:true},
	acquisitionValue: { type: Number, required:true},
	amount: { type:Number, required:true},
	company: { type:String, required:true}
});

//Devolviendo una instancia del esquema
exports = module.exports = Stock = mongoose.model('Stock', StockSchema);