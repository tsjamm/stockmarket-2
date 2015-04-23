var mongoose = require('mongoose');
var Schema = mongoose.Schema; //Para crear una instancia de Schema
var db = mongoose.connect('mongodb://localhost/stockmarket'); //Para conectar a la base de datos

var StockSchema = new Schema({
	ownerId: { type:String, required:true},
	dateBought: { type:Date, required:true},
	amount: { type:Number, required:true},
	company: { type:String, required:true}
});

//Devolviendo una instancia del esquema
exports = module.exports = Stock = mongoose.model('Stock', StockSchema);