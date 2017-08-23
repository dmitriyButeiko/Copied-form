var m = document.uniqueID
&& document.compatMode
&& !window.XMLHttpRequest
&& document.execCommand;

try{
	if(!!m){
		m("BackgroundImageCache", false, true)
		//document.execCommand("BackgroundImageCache", false, true);
	}
} catch(e) {

}

(function(){
	var bad_ie = /MSIE (5\.5|6).+Win/.test(navigator.userAgent);

	/*
	 * Как использовать
	 * В CSS-файле написать такое правило:
	 * .png{
	 * 	filter: expression(fixPNG(this));
	 * }
	 */
	fixPNG = function(element, all_ie, scale_mode) {
		if( all_ie || bad_ie ){
			var src;
			scale_mode = scale_mode || 'crop';
			if( (element.tagName == 'IMG' || element.tagName == 'INPUT') && !$(element).is(".bg") ){
				//if (/\.png$/.test(element.src)) {
				src = element.src;
				element.src = "/f/1/global/e.gif";
				//}
			}
			else {
				src = element.currentStyle.backgroundImage
						.match(/url\("(.+\.png)"\)/i);
				if( src ){
					src = src[1];
					element.runtimeStyle.backgroundImage = "none";
				}
			}

			var re_scale_mode = /iesizing_(\w+)/;
			var m = re_scale_mode.exec(element.className);
			if( m ){
				scale_mode = m[1];
			}
			if( src ){
				element.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "',sizingMethod='" + scale_mode + "')";
			}
		}
	};

	if(bad_ie){
		$(document).ready(
			function(){
				$(".pseudo_link, .with_hover, .close, .btn_framed .f").hover(
					function(){
						$(this).addClass("hover");
					},
					function(){
						$(this).removeClass("hover");
					}
				);

				var layout = $('#layout')[0];
				function ie_resize(){
					var document_width = document.documentElement.clientWidth || document.body.clientWidth;
					layout.style.width = document_width < 990 ? '990px' : (document_width > 1400 ? '1400px' : '100%');
				}
				
				var
					resizable_images = $('.resizable_image'),
					resizable_images_amount = resizable_images.size();
				
				function resize_images(){
					for( var i = 0; i < resizable_images_amount; i++ ){
						var
							cur_img = resizable_images.eq(i),
							image_width = cur_img[0].offsetWidth ? cur_img[0].offsetWidth : resizable_images.attr('width');

						window.status = cur_img.parent()[0].offsetWidth;
						if(cur_img.parent()[0].offsetWidth <= image_width){
							cur_img.removeAttr('width').css({width: '100%'});
						} else {
							cur_img.removeAttr('style');
						}
					}
				}

				resize_images();
				ie_resize();

				$(window).resize(function() {
					ie_resize();
					resize_images();
				});
			}
		);
	}
})();