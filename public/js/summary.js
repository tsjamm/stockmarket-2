

$(function() {

	/** CURRENCIES */

	$.ajax({
		url:'/euroincrement',
		success: function(result) {
			$("#euroincrement").html(result);
		}
	});

	$.ajax({
		url:'/gbpincrement',
		success: function(result) {
			$("#gbpincrement").html(result);
		}
	});

	$.ajax({
		url:'/usdincrement',
		success: function(result) {
			$("#usdincrement").html(result);
		}
	});

	$.ajax({
		url:'/yenincrement',
		success: function(result) {
			$("#yenincrement").html(result);
		}
	});

	$.ajax({
		url:'/usdtoeuro',
		success: function(result) {
			$("#eurotousd").text(Number(result).toFixed(3));
			$("#usdtoeuro").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/usdtogbp',
		success: function(result) {
			$("#gbptousd").text(Number(result).toFixed(3));
			$("#usdtogbp").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/usdtoyen',
		success: function(result) {
			$("#usdtoyen").text(Number(result).toFixed(1));
			$("#yentousd").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/eurotogbp',
		success: function(result) {
			$("#eurotogbp").text(Number(result).toFixed(3));
			$("#gbptoeuro").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/eurotoyen',
		success: function(result) {
			$("#eurotoyen").text(Number(result).toFixed(1));
			$("#yentoeuro").text(Number(1/+result).toFixed(3));
		}
	});

	/** MARKETS */

	$.ajax( {
		url:'/tsx_composite_today',
		success: function(result) {
			var resultJson = JSON.parse(result);
			
			$("#panel_market_tsx_composite .dateMarketValue").text(resultJson[0]);
			$("#panel_market_tsx_composite .openMarketValue").text(resultJson[1]);
			$("#panel_market_tsx_composite .highMarketValue").text(resultJson[2]);
			$("#panel_market_tsx_composite .lowMarketValue").text(resultJson[3]);
			$("#panel_market_tsx_composite .closeMarketValue").text(resultJson[4]);

			setMarketArrow(resultJson[7],resultJson[4],$("#panel_market_tsx_composite .market_name"));
		}
	});

	$.ajax( {
		url:'/shangai_composite_today',
		success: function(result) {
			var resultJson = JSON.parse(result);

			$("#panel_market_shangai_composite .dateMarketValue").text(resultJson[0]);
			$("#panel_market_shangai_composite .openMarketValue").text(resultJson[1]);
			$("#panel_market_shangai_composite .highMarketValue").text(resultJson[2]);
			$("#panel_market_shangai_composite .lowMarketValue").text(resultJson[3]);
			$("#panel_market_shangai_composite .closeMarketValue").text(resultJson[4]);

			setMarketArrow(resultJson[7],resultJson[4],$("#panel_market_shangai_composite .market_name"));
		}
	});

	$.ajax( {
		url:'/cac_40_today',
		success: function(result) {
			var resultJson = JSON.parse(result);

			$("#panel_market_cac_40 .dateMarketValue").text(resultJson[0]);
			$("#panel_market_cac_40 .openMarketValue").text(resultJson[1]);
			$("#panel_market_cac_40 .highMarketValue").text(resultJson[2]);
			$("#panel_market_cac_40 .lowMarketValue").text(resultJson[3]);
			$("#panel_market_cac_40 .closeMarketValue").text(resultJson[4]);

			setMarketArrow(resultJson[7],resultJson[4],$("#panel_market_cac_40 .market_name"));
		}
	});

	$.ajax( {
		url:'/dax_today',
		success: function(result) {
			var resultJson = JSON.parse(result);

			$("#panel_market_dax .dateMarketValue").text(resultJson[0]);
			$("#panel_market_dax .openMarketValue").text(resultJson[1]);
			$("#panel_market_dax .highMarketValue").text(resultJson[2]);
			$("#panel_market_dax .lowMarketValue").text(resultJson[3]);
			$("#panel_market_dax .closeMarketValue").text(resultJson[4]);

			setMarketArrow(resultJson[7],resultJson[4],$("#panel_market_dax .market_name"));
		}
	});

	$.ajax( {
		url:'/ftse_100_today',
		success: function(result) {
			var resultJson = JSON.parse(result);

			$("#panel_market_ftse_100 .dateMarketValue").text(resultJson[0]);
			$("#panel_market_ftse_100 .openMarketValue").text(resultJson[1]);
			$("#panel_market_ftse_100 .highMarketValue").text(resultJson[2]);
			$("#panel_market_ftse_100 .lowMarketValue").text(resultJson[3]);
			$("#panel_market_ftse_100 .closeMarketValue").text(resultJson[4]);

			setMarketArrow(resultJson[7],resultJson[4],$("#panel_market_ftse_100 .market_name"));
		}
	});

	$.ajax( {
		url:'/nikkei_225_today',
		success: function(result) {
			var resultJson = JSON.parse(result);
			$("#panel_market_nikkei_225 .dateMarketValue").text(resultJson[0]);
			$("#panel_market_nikkei_225 .openMarketValue").text(resultJson[1]);
			$("#panel_market_nikkei_225 .highMarketValue").text(resultJson[2]);
			$("#panel_market_nikkei_225 .lowMarketValue").text(resultJson[3]);
			$("#panel_market_nikkei_225 .closeMarketValue").text(resultJson[4]);

			setMarketArrow(resultJson[7],resultJson[4],$("#panel_market_nikkei_225 .market_name"));
		}
	});

	$.ajax( {
		url:'/ibex_35_today',
		success: function(result) {
			var resultJson = JSON.parse(result);

			$("#panel_market_ibex_35 .dateMarketValue").text(resultJson[0]);
			$("#panel_market_ibex_35 .openMarketValue").text(resultJson[1]);
			$("#panel_market_ibex_35 .highMarketValue").text(resultJson[2]);
			$("#panel_market_ibex_35 .lowMarketValue").text(resultJson[3]);
			$("#panel_market_ibex_35 .closeMarketValue").text(resultJson[4]);

			setMarketArrow(resultJson[7],resultJson[4],$("#panel_market_ibex_35 .market_name"));
		}
	});

	$.ajax( {
		url:'/sp_500_today',
		success: function(result) {
			var resultJson = JSON.parse(result);

			$("#panel_market_sp_500 .dateMarketValue").text(resultJson[0]);
			$("#panel_market_sp_500 .openMarketValue").text(resultJson[1]);
			$("#panel_market_sp_500 .highMarketValue").text(resultJson[2]);
			$("#panel_market_sp_500 .lowMarketValue").text(resultJson[3]);
			$("#panel_market_sp_500 .closeMarketValue").text(resultJson[4]);

			setMarketArrow(resultJson[7],resultJson[4],$("#panel_market_sp_500 .market_name"));
		}
	});

});

/**
	Sets arrow and color for each market depending on its current value and the day before value
	@param {Number} yesterdayClose Day before value
	@param {Number} todayClose Today value
	@param {String} div Div where the arrow is going to be set
*/
function setMarketArrow(yesterdayClose, todayClose, div) {
	if(yesterdayClose>todayClose) {
		div.html(div.text() + ' <i class="fa fa-arrow-up text-success"> </i>');
	} else if(yesterdayClose==todayClose) {
		div.html(div.text() + ' <i class="fa fa-minus text-muted"> </i>');
	} else {
		div.html(div.text() + ' <i class="fa fa-arrow-down text-danger"> </i>');
	}
}
