
var request = require('request');

	//[from currency][code to get USD dollar exchange]
	var USDDollarExchangeTable = [];
		USDDollarExchangeTable['AUD']= 'DEXUSAL'; //Australian dollar
		USDDollarExchangeTable['BRL']= 'DEXBZUS'; //Brazilian real
		USDDollarExchangeTable['GBP']= 'DEXUSUK'; //British pound
		USDDollarExchangeTable['CAD']= 'DEXCAUS'; //Canadaian dollar
		USDDollarExchangeTable['CNY']= 'DEXCHUS'; //Chinese Yuan
		USDDollarExchangeTable['DKK']= 'DEXDNUS'; //Danish krone
		USDDollarExchangeTable['EUR']= 'DEXUSEU'; //Euro
		USDDollarExchangeTable['HDK']= 'DEXHKUS'; //Hong Kong Dollar
		USDDollarExchangeTable['INR']= 'DEXINUS'; //Indian rupee
		USDDollarExchangeTable['JPY']= 'DEXJPUS'; //Japanese Yen
		USDDollarExchangeTable['MXN']= 'DEXMXUS'; //Mexican peso
		USDDollarExchangeTable['NZD']= 'DEXUSNZ'; //New Zealand Dollar
		USDDollarExchangeTable['NOK']= 'DEXNOUS'; //Norwegian Krone
		USDDollarExchangeTable['SGD']= 'DEXSIUS'; //Singapore Dollar
		USDDollarExchangeTable['ZAR']= 'DEXSFUS'; //South African rand
		USDDollarExchangeTable['KRW']= 'DEXKOUS'; //South Korean Won
		USDDollarExchangeTable['SEK']= 'DEXSDUS'; // Swedish krona
		USDDollarExchangeTable['CHF']= 'DEXSZUS'; //Swiss Franc
		USDDollarExchangeTable['THB']= 'DEXTHUS'; //Thai bath

	//[from currency][code to get euro exchange]
	var euroExchangeTable = [];
		euroExchangeTable['AUD']= 'EURAUD'; //Australian dollar
		euroExchangeTable['BRL']= 'EURBRL'; //Brazilian real
		euroExchangeTable['GBP']= 'EURGBP'; //British pound
		euroExchangeTable['CAD']= 'EURCAD'; //Canadaian dollar
		euroExchangeTable['CNY']= 'EURCNY'; //Chinese Yuan
		euroExchangeTable['DKK']= 'EURDKK'; //Danish krone
		euroExchangeTable['HDK']= 'EURHKD'; //Hong Kong dollar
		euroExchangeTable['INR']= 'EURINR'; //Indian rupee
		euroExchangeTable['JPY']= 'EURJPY'; //Japanese Yen
		euroExchangeTable['MXN']= 'EURMXN'; //Mexican peso
		euroExchangeTable['NZD']= 'EURNZD'; //New Zealand dollar
		euroExchangeTable['NOK']= 'EURNOK'; //Norwegian krone
		euroExchangeTable['SGD']= 'EURSGD'; //Singapore dollar
		euroExchangeTable['ZAR']= 'EURZAR'; //South African rand
		euroExchangeTable['KRW']= 'EURKRW'; //South Korean Won
		euroExchangeTable['SEK']= 'EURSEK'; // Swedish krona
		euroExchangeTable['CHF']= 'EURCHF'; //Swiss franc
		euroExchangeTable['THB']= 'EURTHB'; //Thai baht
		euroExchangeTable['USD']= 'EURUSD'; //USD dollar

	var marketTable = [];
		marketTable['cac_40']='INDEX_FCHI';
		marketTable['dax']='INDEX_GDAXI';
		marketTable['sp_500']='INDEX_GSPC';
		marketTable['russell_1000']='INDEX_RUI';
		marketTable['ftse_100']='INDEX_FTSE';
		marketTable['ftse_mib']='INDEX_FTSEMIB_MI';
		marketTable['ibex_35']='INDEX_IBEX';
		marketTable['jakarta_composite']='INDEX_JKSE';
		marketTable['kospi_composite']='INDEX_KS11';
		marketTable['merval']='INDEX_MERV';
		marketTable['mexbol_ipc']='INDEX_MXX';
		marketTable['nikkei_225']='INDEX_N225';
		marketTable['rtsi']='INDEX_RTS_RS';
		marketTable['tsx_composite']='INDEX_GSPTSE';
		marketTable['shangai_composite']='INDEX_SSEC';

exports.getDailyCurrencyExchange = function(from,to,cb) {
	var searchFilters = {
		table:'',
		trim_start: new Date('2015-02-03').toISOString()
	};

	var db='';

	switch(from) {
		case 'EUR': db='ECB'; searchFilters.table=euroExchangeTable[to]; break;
		case 'USD': db='FRED'; searchFilters.table=USDDollarExchangeTable[to]; break;
		default: return;
	}

	var url = 'https://www.quandl.com/api/v1/datasets/'+ db + '/' + searchFilters.table + '.json?&trim_start='+searchFilters.trim_start+'&auth_token=rgC48yaay4DWshssN2Yp';
	request({url: url, json: true}, function(err,response,body) {
		console.log('Retrieving data from : ' + url);
		if(err)
			return console.log('Error while using getDailyCurrencyExchange function. Error: ' + err);
		if(!body || !body.data || body.data.length===0)
			return cb([]);
		cb(body.data[body.data.length-1][1]);
	});
};

exports.getEuroIncrement = function(cb) {
	var searchFilters = {
		table:euroExchangeTable['USD'],
		trim_start: new Date('2015-02-03').toISOString()
	};

	var db='ECB';

	var url = 'https://www.quandl.com/api/v1/datasets/'+ db + '/' + searchFilters.table + '.json?&trim_start='+searchFilters.trim_start+'&auth_token=rgC48yaay4DWshssN2Yp';
	request({url: url, json: true}, function(err,response,body) {
		if(err)
			return console.log('Error while using getDailyCurrencyExchange function. Error: ' + err);
		if(!body || !body.data || body.data.length===0)
			return cb('No data');

		var lastday = Number(body.data[body.data.length-1][1]);
		var daybefore = Number(body.data[body.data.length-2][1]);
		if(lastday>daybefore)
			cb('<i class="fa fa-euro"> </i><i class="fa fa-arrow-up text-success"> </i> <h5><small>Last day vs USD</small></h5>');
		else if(lastday===daybefore)
			cb('<i class="fa fa-euro"> </i><i class="fa fa-minus text-muted"> </i> <h5><small>Last day vs USD</small></h5>');
		else
			cb('<i class="fa fa-euro"> </i><i class="fa fa-arrow-down text-danger"> </i> <h5><small>Last day vs USD</small></h5>');
	});
};

exports.getUSDIncrement = function(cb) {
	var searchFilters = {
		table:USDDollarExchangeTable['EUR'],
		trim_start: new Date('2015-02-03').toISOString()
	};

	var db='FRED';

	var url = 'https://www.quandl.com/api/v1/datasets/'+ db + '/' + searchFilters.table + '.json?&trim_start='+searchFilters.trim_start+'&auth_token=rgC48yaay4DWshssN2Yp';
	request({url: url, json: true}, function(err,response,body) {
		if(err)
			return console.log('Error while using getDailyCurrencyExchange function. Error: ' + err);
		if(!body || !body.data || body.data.length===0)
			return cb('No data');

		var lastday = Number(body.data[body.data.length-1][1]);
		var daybefore = Number(body.data[body.data.length-2][1]);
		if(lastday>daybefore)
			cb('<i class="fa fa-usd"> </i><i class="fa fa-arrow-up text-success"> </i> <h5><small>Last day vs Euro</small></h5>');
		else if(lastday===daybefore)
			cb('<i class="fa fa-usd"> </i><i class="fa fa-minus text-muted"> </i> <h5><small>Last day vs Euro</small></h5>');
		else
			cb('<i class="fa fa-usd"> </i><i class="fa fa-arrow-down text-danger"> </i> <h5><small>Last day vs Euro</small></h5>');
	});
};


exports.getGBPIncrement = function(cb) {
	var searchFilters = {
		table:USDDollarExchangeTable['GBP'],
		trim_start: new Date('2015-02-03').toISOString()
	};

	var db='FRED';

	var url = 'https://www.quandl.com/api/v1/datasets/'+ db + '/' + searchFilters.table + '.json?&trim_start='+searchFilters.trim_start+'&auth_token=rgC48yaay4DWshssN2Yp';
	request({url: url, json: true}, function(err,response,body) {
		if(err)
			return console.log('Error while using getDailyCurrencyExchange function. Error: ' + err);
		if(!body || !body.data || body.data.length===0)
			return cb('No data');
		var lastday = 1/Number(body.data[body.data.length-1][1]);
		var daybefore = 1/Number(body.data[body.data.length-2][1]);

		if(lastday>daybefore)
			cb('<i class="fa fa-gbp"> </i><i class="fa fa-arrow-up text-success"> </i> <h5><small>Last day vs USD</small></h5>');
		else if(lastday===daybefore)
			cb('<i class="fa fa-gbp"> </i><i class="fa fa-minus text-muted"> </i> <h5><small>Last day vs USD</small></h5>');
		else
			cb('<i class="fa fa-gbp"> </i><i class="fa fa-arrow-down text-danger"> </i> <h5><small>Last day vs USD</small></h5>');
	});
};

exports.getYenIncrement = function(cb) {
	var searchFilters = {
		table:USDDollarExchangeTable['JPY'],
		trim_start: new Date('2015-02-03').toISOString()
	};

	var db='FRED';

	var url = 'https://www.quandl.com/api/v1/datasets/'+ db + '/' + searchFilters.table + '.json?&trim_start='+searchFilters.trim_start+'&auth_token=rgC48yaay4DWshssN2Yp';
	request({url: url, json: true}, function(err,response,body) {
		if(err)
			return console.log('Error while using getDailyCurrencyExchange function. Error: ' + err);
		if(!body || !body.data || body.data.length===0)
			return cb('No data');

		var lastday = 1/Number(body.data[body.data.length-1][1]);
		var daybefore = 1/Number(body.data[body.data.length-2][1]);

		if(lastday>daybefore)
			cb('<i class="fa fa-jpy"> </i><i class="fa fa-arrow-up text-success"> </i> <h5><small>Last day vs USD</small></h5>');
		else if(lastday===daybefore)
			cb('<i class="fa fa-jpy"> </i><i class="fa fa-minus text-muted"> </i> <h5><small>Last day vs USD</small></h5>');
		else
			cb('<i class="fa fa-jpy"> </i><i class="fa fa-arrow-down text-danger"> </i> <h5><small>Last day vs USD</small></h5>');
	});
};

exports.getTableData = function(db,searchFilters,cb) {
	var url = 'https://www.quandl.com/api/v1/datasets/'+ db + '/' + searchFilters.table + '.json?sort_order='+searchFilters.sort_order+'&trim_start='+searchFilters.trim_start+'&trim_end='+searchFilters.trim_end+'&collapse='+searchFilters.collapse + '&auth_token=rgC48yaay4DWshssN2Yp';
	
	console.log('Retrieving data from : ' + url);
	request({url: url, json: true}, function(err,response,body) {
		if(err)
			return console.log('Error while using getData function. Error: ' + err);
		cb(body);
	});
};	

exports.getTableDataFromURL = function(url,cb) {
	console.log('Retrieving data from url: ' + url);
	request({url: url, json: true}, function(err,response,body) {
		if(err)
			return console.log('Error while using getData function. Error: ' + err);
		cb(body);
	});
};	

exports.getDailyMarket = function(market,cb) {
	var url = 'https://www.quandl.com/api/v1/datasets/YAHOO/' + marketTable[market] + '.json?&trim_start='+new Date('2015-02-03').toISOString()+'&trim_end='+new Date().toISOString()+ '&auth_token=rgC48yaay4DWshssN2Yp';
	console.log('Retrieving data from : ' + url);
	request({url: url, json: true}, function(err,response,body) {
		if(err)
			return console.log('Error while using getData function. Error: ' + err);
		if(!body || !body.data || body.data.length===0)
			return cb([]);
		body.data[body.data.length-1].push(body.data[body.data.length-2][4]);
		cb(body.data[body.data.length-1]);
	});
};
