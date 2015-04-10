
var request = require('request');

exports.getData = function(searchFilters,cb) {
	var url = 'http://www.quandl.com/api/v1/datasets/WIKI/' + searchFilters.table + '.json?sort_order='+searchFilters.sort_order+'&trim_start='+searchFilters.trim_start+'&trim_end='+searchFilters.trim_end+'&collapse='+searchFilters.collapse + '&auth_token=rgC48yaay4DWshssN2Yp';
	request({url: url, json: true}, function(err,response,body) {
		if(err)
			return console.log('Error while using getData function. Error: ' + err);
		console.log(body);
		cb(body);
	});
};	
