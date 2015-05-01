$(function() {
	$("#newPassword2").on('keyup', checkNewPassword);
	$("#newPassword1").on('keyup', checkNewPassword);
});


function checkNewPassword() {
	var newPassword2 = $("#newPassword2");
		var newPassword1 = $("#newPassword1");

		if(newPassword1.val()!=newPassword2.val()) {
			newPassword2.css('border','solid red 1px');
			$("input[name='updateProfile']").attr('disabled',true);
		}
		else{
			$("input[name='updateProfile']").attr('disabled',false);
			newPassword2.css('border','solid #ccc 1px');
		}
	};