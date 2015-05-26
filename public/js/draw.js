/**
 * Draws a google chart containing the information provided
 * @param  {JSON Object} info JSON object containing stock info
 */
function drawChart(info) {
	
		var data = new google.visualization.DataTable();
		data.addColumn('string','Day');
		data.addColumn('number','Closing value');
		var rows = [];

		for(var i=info.data.length-1; i>=0; i--)
			rows.push([info.data[i][0],info.data[i][4]]);

		data.addRows(rows);

		var options = {
			chart: { title: info.name, subtitle: 'Closing stock values'},
			width: window.innerWidth*0.95,
			height: window.innerHeight*0.65,
			legend: { position: 'none',textStyle: {color: 'red', fontSize: 16} }
		};

		var chart = new google.charts.Line(document.getElementById('result'));
		chart.draw(data,options);

}

/**
 * Draws a table containing the information provided
 * @param  {JSON Object} info JSON object containing stock info
 */
function drawTable(info) {

	var html = '<h2>' + info.name +'</h2><table class="table table-hover"> <thead> <tr>';
	
	for(var i=0; i<5; i++)
		html += '<th class="text-center">' + info.column_names[i] + '</th>';
	
	html +='</tr></thead><tbody>';
	for(var i=0; i<info.data.length; i++){
		html +='<tr>';
		for(var j=0; j<5; j++)
			html += '<td>' + info.data[i][j] + '</td>';	
		html +='</tr>';
	}

	html += '</tbody></table>';

	document.getElementById('result').innerHTML = html;
}