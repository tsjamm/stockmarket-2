/** Makes footer go to the bottom of the page */
function pushFooterDown() {
	var footer = $("footer");
	
		$(function() {
			if($(document.body).height()+footer.outerHeight() < $(window).height()) {
				footer.css('display','block');
				footer.css('position','absolute');
				footer.css('margin-top',0);
			} else {
				footer.css('position','static');
				footer.css('display','inline-block');
			}
			
			footer.css('top',$(window).height()-footer.outerHeight());
		});
	
}
