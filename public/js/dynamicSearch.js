$(function() {
	$('#companiesRadio').on('click',function() { hideAll(); showOne('companies')})
	$('#nationalMarketsRadio').on('click',function() { hideAll(); showOne('nationalMarkets')})
});

function hideAll() {
	$('#searchForm > div').css('display','none');
}

function showOne(name) {
	$('#'+name).css('display','block');
	$('#target').val(name);
}
