var getData = require('./../public/js/getData');
var request = require('request');

var route = function(app) {
	app.get('/',function(req,res) {
		res.render(__dirname + './../views/home',{ data:''});
	});

	app.post('/home', function(req,res) {
		function getData(cb) {
			var data = '';
			var table = req.body.tableSearch;
			var data_format = '.json';
			var sort_order = req.body.orderSearch;
			var trim_start = req.body.trim_startSearch;
			var trim_end = req.body.trim_endSearch;
			var collapse = req.body.collapseSearch;


			var url = 'http://www.quandl.com/api/v1/datasets/WIKI/' + table + data_format + '?sort_order='+sort_order+'&trim_start='+trim_start+'&trim_end='+trim_end+'&collapse='+collapse;


			request({url: url, json: true}, function(err,response,body) {
				console.log(body);
				data+= '<table class="table"> <tr>';
				for(var column in body.column_names){
					data += '<td>' + body.column_names[column]+ '</td>';
					if(body.column_names[column]=='Volume')
						break;
				}

				data+='</tr>';

				for(var row in body.data) {
					data +='<tr>';
					for(var i=0; i<6; i++){
						if(body.column_names[i]=='Date')
							data +='<td>'+ body.data[row][i] + '</td>';
						else
							data +='<td>'+ Number(body.data[row][i]).toFixed(2) + '</td>';
					}
					data +='</tr>';
				
				}

				data +='</table>';
				cb(data);
			});	
		}

		getData(function(data) {
			res.render(__dirname + './../views/home', { data: data } );
		});
	});

	app.get('/about',function(req,res) {
		res.render(__dirname + './../views/about');
	});

	app.get('/explore',function(req,res) {
		res.render(__dirname + './../views/explore');
	});

	app.get('/help',function(req,res) {
		res.render(__dirname + './../views/help');
	});

	app.get('/my_favourites',function(req,res) {
		res.render(__dirname + './../views/my_favourites');
	});

	app.get('/my_finances',function(req,res) {
		res.render(__dirname + './../views/my_finances');
	});

	app.get('/profile',function(req,res) {
		res.render(__dirname + './../views/profile');
	});

	app.get('*', function(req,res) {
		res.render(__dirname + './../views/error');
	});
}

module.exports = route;
