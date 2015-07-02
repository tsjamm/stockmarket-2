

$(function() {

	/** CURRENCIES */

	$.ajax({
		url:'/increment/euro',
		success: function(result) {
			$("#euroincrement").html(result);
		}
	});

	$.ajax({
		url:'/increment/gbp',
		success: function(result) {
			$("#gbpincrement").html(result);
		}
	});

	$.ajax({
		url:'/increment/usd',
		success: function(result) {
			$("#usdincrement").html(result);
		}
	});

	$.ajax({
		url:'/increment/yen',
		success: function(result) {
			$("#yenincrement").html(result);
		}
	});

	$.ajax({
		url:'/currency-from-to/usd/eur',
		success: function(result) {
			$("#eurotousd").text(Number(result).toFixed(3));
			$("#usdtoeuro").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/currency-from-to/usd/gbp',
		success: function(result) {
			$("#gbptousd").text(Number(result).toFixed(3));
			$("#usdtogbp").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/currency-from-to/usd/jpy',
		success: function(result) {
			$("#usdtoyen").text(Number(result).toFixed(1));
			$("#yentousd").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/currency-from-to/eur/gbp',
		success: function(result) {
			$("#eurotogbp").text(Number(result).toFixed(3));
			$("#gbptoeuro").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/currency-from-to/eur/jpy',
		success: function(result) {
			$("#eurotoyen").text(Number(result).toFixed(1));
			$("#yentoeuro").text(Number(1/+result).toFixed(3));
		}
	});

	/** MARKETS */
	$.ajax( {
		url:'/daily_stock/shangai_composite',
		success: function(result) {
			$("#panel_market_shangai_composite .dateMarketValue").text(result[0]);
			$("#panel_market_shangai_composite .openMarketValue").text(result[1]);
			$("#panel_market_shangai_composite .highMarketValue").text(result[2]);
			$("#panel_market_shangai_composite .lowMarketValue").text(result[3]);
			$("#panel_market_shangai_composite .closeMarketValue").text(result[4]);

			setMarketArrow(result[7],result[4],$("#panel_market_shangai_composite .market_name"));
		}
	});

	$.ajax( {
		url:'/daily_stock/tsx_composite',
		success: function(result) {
			$("#panel_market_tsx_composite .dateMarketValue").text(result[0]);
			$("#panel_market_tsx_composite .openMarketValue").text(result[1]);
			$("#panel_market_tsx_composite .highMarketValue").text(result[2]);
			$("#panel_market_tsx_composite .lowMarketValue").text(result[3]);
			$("#panel_market_tsx_composite .closeMarketValue").text(result[4]);

			setMarketArrow(result[7],result[4],$("#panel_market_shangai_composite .market_name"));
		}
	});

	$.ajax( {
		url:'/daily_stock/cac_40',
		success: function(result) {
			$("#panel_market_cac_40 .dateMarketValue").text(result[0]);
			$("#panel_market_cac_40 .openMarketValue").text(result[1]);
			$("#panel_market_cac_40 .highMarketValue").text(result[2]);
			$("#panel_market_cac_40 .lowMarketValue").text(result[3]);
			$("#panel_market_cac_40 .closeMarketValue").text(result[4]);

			setMarketArrow(result[7],result[4],$("#panel_market_cac_40 .market_name"));
		}
	});

	$.ajax( {
		url:'/daily_stock/dax',
		success: function(result) {
			$("#panel_market_dax .dateMarketValue").text(result[0]);
			$("#panel_market_dax .openMarketValue").text(result[1]);
			$("#panel_market_dax .highMarketValue").text(result[2]);
			$("#panel_market_dax .lowMarketValue").text(result[3]);
			$("#panel_market_dax .closeMarketValue").text(result[4]);

			setMarketArrow(result[7],result[4],$("#panel_market_dax .market_name"));
		}
	});

	$.ajax( {
		url:'/daily_stock/ftse_100',
		success: function(result) {
			$("#panel_market_ftse_100 .dateMarketValue").text(result[0]);
			$("#panel_market_ftse_100 .openMarketValue").text(result[1]);
			$("#panel_market_ftse_100 .highMarketValue").text(result[2]);
			$("#panel_market_ftse_100 .lowMarketValue").text(result[3]);
			$("#panel_market_ftse_100 .closeMarketValue").text(result[4]);

			setMarketArrow(result[7],result[4],$("#panel_market_ftse_100 .market_name"));
		}
	});

	$.ajax( {
		url:'/daily_stock/nikkei_225',
		success: function(result) {
			$("#panel_market_nikkei_225 .dateMarketValue").text(result[0]);
			$("#panel_market_nikkei_225 .openMarketValue").text(result[1]);
			$("#panel_market_nikkei_225 .highMarketValue").text(result[2]);
			$("#panel_market_nikkei_225 .lowMarketValue").text(result[3]);
			$("#panel_market_nikkei_225 .closeMarketValue").text(result[4]);

			setMarketArrow(result[7],result[4],$("#panel_market_nikkei_225 .market_name"));
		}
	});

	$.ajax( {
		url:'/daily_stock/ibex_35',
		success: function(result) {
			$("#panel_market_ibex_35 .dateMarketValue").text(result[0]);
			$("#panel_market_ibex_35 .openMarketValue").text(result[1]);
			$("#panel_market_ibex_35 .highMarketValue").text(result[2]);
			$("#panel_market_ibex_35 .lowMarketValue").text(result[3]);
			$("#panel_market_ibex_35 .closeMarketValue").text(result[4]);

			setMarketArrow(result[7],result[4],$("#panel_market_ibex_35 .market_name"));
		}
	});

	$.ajax( {
		url:'/daily_stock/sp_500',
		success: function(result) {
			$("#panel_market_sp_500 .dateMarketValue").text(result[0]);
			$("#panel_market_sp_500 .openMarketValue").text(result[1]);
			$("#panel_market_sp_500 .highMarketValue").text(result[2]);
			$("#panel_market_sp_500 .lowMarketValue").text(result[3]);
			$("#panel_market_sp_500 .closeMarketValue").text(result[4]);

			setMarketArrow(result[7],result[4],$("#panel_market_sp_500 .market_name"));
		},
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
