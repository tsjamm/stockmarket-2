

$(function() {
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
			$("#usdtoeuro").text(Number(result).toFixed(3));
			$("#eurotousd").text(Number(1/+result).toFixed(3));
		}
	});

	$.ajax({
		url:'/usdtogbp',
		success: function(result) {
			$("#usdtogbp").text(Number(result).toFixed(3));
			$("#gbptousd").text(Number(1/+result).toFixed(3));
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

});
