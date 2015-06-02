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
			$("#message").html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close"' +
				' data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span><strong>Error removing favourite' +
				'</div>');
		});
	});
});


$(".showFavouriteChart").on('click',function(evt) {
	evt.preventDefault();
	var favouriteUrl = encodeURIComponent($(this).attr('data-id'));
	window.location.replace('/showfavourite/'+favouriteUrl);
});