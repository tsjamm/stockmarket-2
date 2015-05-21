/**
 * Draws a google chart containing the information provided
 * @param  {JSON Object} info JSON object containing stock info
 */
function drawChart(info) {
	
		var data = new google.visualization.DataTable();
		data.addColumn('string','Day');
		data.addColumn('number','Closing value');
		var rows = [];

		for(var i=0; i<info.data.length; i++)
			rows.push([info.data[i][0],info.data[i][4]]);

		data.addRows(rows);

		var options = {
			chart: { title: 'Closing stock values', subtitle: 'Subtitulo'},
			width: 900,
			height: 400
		};

		var chart = new google.charts.Line(document.getElementById('result'));
		chart.draw(data,options);

}

/**
 * Draws a table containing the information provided
 * @param  {JSON Object} info JSON object containing stock info
 */
function drawTable(info) {

	var html = '<table class="table table-hover"> <thead> <tr>';
	
	for(var i=0; i<info.column_names.length; i++)
		html += '<th>' + info.column_names[i] + '</th>';
	
	html +='</tr></thead><tbody>';
	for(var i=0; i<info.data.length; i++){
		html +='<tr>';
		for(var j=0; j<info.data[i].length; j++)
			html += '<td>' + info.data[i][j] + '</td>';	
		html +='</tr>';
	}

	html += '</tbody></table>';

	document.getElementById('result').innerHTML = html;
}