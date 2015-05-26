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


$(".showFavouriteChart").on('click',function(evt) {
	evt.preventDefault();
	var favouriteUrl = encodeURIComponent($(this).attr('data-id'));
	window.location.replace('/showfavourite/'+favouriteUrl);
});