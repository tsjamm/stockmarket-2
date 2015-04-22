$(function() {
	$('#companiesRadio').on('click',function() { showSearchForm(); hideAll(); showOne('companies')})
	$('#nationalMarketsRadio').on('click',function() { showSearchForm(); hideAll(); showOne('nationalMarkets')})
});

function hideAll() {
	$('#searchForm > div').css('display','none');
}

function showOne(name) {
	$('#'+name).css('display','block');
	$('#target').val(name);
}


function showSearchForm() {
	$("#searchForm").css('display','block');
}