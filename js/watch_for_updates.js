$(function () {
	var
		watch_for_updates_link = $ ('#watch_for_updates_link'),
		watch_for_updates = $ ('#watch_for_updates_modal'),
		close = watch_for_updates.find ('.close');


	watch_for_updates_link.click (function()
	{
		watch_for_updates.removeClass ('not_display').css ('top', '0');
		watch_for_updates.css ('left', '40px');
		$('#watch_faid').css('display','none');
		
		if($('#watch_is_mail').val() == 1){
			$ ('#id_count_image').html('<img src="http://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=282814&bt=21&pid=617950&bid=1204079&bn=1204079&rnd=1494289259" border=0 width=1 height=1>');
		}else{
			$ ('#id_count_image').html('<img src="http://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=282814&bt=21&pid=618559&bid=1204080&bn=1204080&rnd=1273379864" border=0 width=1 height=1><img src="'+watch_for_updates_link.attr('name')+'" border=0 width=1 height=1>');
		}

		return false;
	});

	$ ('#watch_for_updates_submit').click (function()
	{
		$('#watch_faid').css('display','none');
		if($('#watch_user_name').val() == null || $('#watch_user_name').val() == 0){
			$('#watch_faid').fadeIn("slow");
			return false;
		}
		$('#form_watch_for_updates').submit();
		return false;
	});
	close.click (function()
	{
		watch_for_updates.addClass ('not_display');
	});
});