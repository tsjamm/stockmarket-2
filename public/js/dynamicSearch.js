$(function() {
	$('#companiesButton').on('click',function() {
		showOne('companies')
		$("#selectGraphic").hide();
	});
	$('#nationalMarketsButton').on('click',function() { 
		showOne('nationalMarkets')
		$("#selectGraphic").hide();
	});
});

/**
	Shows all the search form inputs and exclude companies or national markets depending on the option selected
	@param {String}  name Option selected
*/
function showOne(name) {
	$("#searchForm").css('display','block');
	$('.form-group').css('display','block');
	if(name=='companies') {
		$("#nationalMarkets").hide();
	} else if(name=='nationalMarkets') {
		$("#companies").hide();
	}
	
	$('#target').val(name);
}
