$("#addUserStock").on('click', function() {
	$("#saveNewUserStock").css("display","block");
	$(this).css("display","none");
});

$("#saveUserSockSubmit").on('click', function() {
	if($("#amount").text()!=='' && $("#acquisitionValue").text()!=='' && $("dateBought").text()!=='') {
		$("#addUserStock").css("display","block");
		$("#saveNewUserStock").css("display","none");
	}
});

$("#closeAddStock").on('click', function() {
	$("#addUserStock").css("display","block");
	$("#saveNewUserStock").css("display","none");
});


$(".deleteStock").on('click', function() {
	var stockId = $(this).attr('data-id');
	$.ajax({
		url:'/my_finances/'+stockId,
		type: 'DELETE',
		success: function() {
			$("#message").html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close"' +
				' data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span><strong>Done:' +
				' </strong> Stock removed</span></div>');
			$('.deleteStock[data-id="' + stockId + '"').parentsUntil("tbody").remove();
		}
	}).error(function() {
		$("#message").html('<div class="alert alert-danger alert-dismissible" role="alert" id="errMessageAlert">' +
		  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>'+
		  '</button><span id="errMessage"> <strong>Error : </strong> Stock not deleted </span></div>');
	});
});


$(function() {
	var companies = $(".companyTd");
	var acquisitionsValues = $(".acquisitionValueTd");
	var lastValues = $(".lastValueTd");
	var earnings = $(".earningTd");
	var count=0;

	for(var i=0; i<companies.length;i++){
		$.ajax({
			type:'POST',
			url:'/getLastOfCompany',
			data: {
				'company': companies[i].innerText,
				'trim_startSearch': new Date(Date.now()-1000*3600*24*5) //Getting last 5 days in case there are no data for the last days
			},
			success: function(result) {
				lastValues[count].innerText = result.data[result.data.length-1][1];
				var percent = [(result.data[result.data.length-1][1]/acquisitionsValues[count].innerText)*100]-100;
				if(percent>0.00000001) {
					percent = String(percent);
					earnings[count].innerHTML = '<span class="text-success"> +' + (percent.indexOf('.')==-1 ? percent : percent.slice(0,percent.indexOf('.')+3) ) + ' %</span>';
				} else if (percent==100) {	
					percent = String(percent);
					earnings[count].innerHTML = '<span class="text-primary">' + (percent.indexOf('.')==-1 ? percent : percent.slice(0,percent.indexOf('.')+3) ) + ' %</span>';
				} else {
					percent = String(percent);
					earnings[count].innerHTML = '<span class="text-danger">' + (percent.indexOf('.')==-1 ? percent : percent.slice(0,percent.indexOf('.')+3) ) + ' %</span>';
				}
				count++;
			}
		}).error(function(err) {
			console.log('Error : ' + err);
		});
	}
});

