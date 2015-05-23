$( function() {
	$(".removeFavourite").on('click', function() {
		var url = $(this).attr('data-id');
		$.ajax({
			url: '/my_favourites/',
			type: 'DELETE',
			data: {
				url : url
			},
			success: function(result) {
				location.reload();
			}
		}).error(function(err) {
			alert('ERROR REMOVING FAVOURITE : ' + err.responseText);
		});
	});
});