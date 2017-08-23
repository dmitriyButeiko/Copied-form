		
	function bind_checkboxes_functions_click(name){
		var sSelected = ''
		$('.search_functions_' + name + ' input[type=checkbox]').each(function(){
			if(this.checked){
				//console.log ($(this).next().html ());
				sSelected += ((sSelected != '') ? ', ' : '') + $(this).next().html ();
			}
		})

		if(sSelected != ''){
			$('#search_functions_' + name + '_selected span').html(sSelected)
			$('#search_functions_' + name + '_selected').show()
		} else {
			$('#search_functions_' + name + '_selected span').html('')
			$('#search_functions_' + name + '_selected').hide()
		}
	}

	$(function () {
		
					
		bind_checkboxes_functions_click("podushki");
		bind_checkboxes_functions_click('safe_system');
		bind_checkboxes_functions_click('chear');
		bind_checkboxes_functions_click('windows');
		bind_checkboxes_functions_click('wheel');
		bind_checkboxes_functions_click('electronics');
		bind_checkboxes_functions_click('mirrow');
		bind_checkboxes_functions_click('salon');
		bind_checkboxes_functions_click('option');
		bind_checkboxes_functions_click('appearance');
		bind_checkboxes_functions_click('music');
		search_functions_trigger();
	});		
		
		
		
		
		$ (function() {
			var timerID, iteration = 0;
			helpValue('#search', 'поиск по сайту');
			$('#search').keydown(function(e){
				if($('#search1_result .selected a').html() == null){
					iteration = 0;
				}
				if(e.keyCode == 13 && $('#search1_result .selected a').html() != null){
					window.location.href = $('#search1_result .selected a').attr('href');
					return false;
				}else if(e.keyCode == 40) {
					iteration++;
					if($('#search1_result div:nth-child('+iteration+')').html() == null){
						iteration = 1;
					}
					$('#search1_result .link').removeClass('selected');
					$('#search1_result div:nth-child('+iteration+')').addClass('selected');

					return false;
				}else if(e.keyCode == 38) {
					iteration--;
					if(iteration < 1){
						iteration = 1;
					}

					$('#search1_result .link').removeClass('selected');
					$('#search1_result div:nth-child('+iteration+')').addClass('selected');
					return false;
				}else{
					clearTimeout(timerID);
					timerID=setTimeout('search1_result()',500);
				}
			});

			$('#search1_submit').click(function(){
				clearTimeout(timerID);
				timerID=setTimeout('search1_result()',500);
			});
		});
		function helpValue(id, value){
			$(id)
				.focus(function(){
					if ($(this).val() == value) {
						$(this).val('').css("color" , "#000");
					} 
				})
				.blur(function(){
					if ($(this).val() == '') {
						$(this).val(value).css("color" , "#999");
					} 
				});
		}
		function search1_result(){
			var query = $('#search').val();
			clear_result();
			if(query != '' && query.length > 2){
				$.post('/search/', 
					{
						search_string: query
					},
					function(data){
						$('#search1_result').css('display', 'block');
						var result = 0;

						for (i = 0;i < data.length;i++) {
							if(data[i].url != ''){
								var link = $('<div class="link ' + ' sort_' + data[i].type + '"><a href="'+data[i].url+'">'+data[i].title+'</a></div>');
							}else{
								var link = $('<div class="link ' + ' sort_' + data[i].type + '">'+data[i].title+'</div>');
							}
							$('#search1_result').append (link);
							result++;
						}
						if(result == 0){
							$('#search1_result').html('Ничего не найдено');
						}
						return false;
					},
					'json'
				);
			}
		}
		function clear_result() {
			$('#search1_result').html('');
			$('#search1_result').css('display', 'none');
		}








function bind_checkboxes_functions_click(name){
		var sSelected = ''
		$('.search_functions_' + name + ' input[type=checkbox]').each(function(){
			if(this.checked){
				//console.log ($(this).next().html ());
				sSelected += ((sSelected != '') ? ', ' : '') + $(this).next().html ();
			}
		})

		if(sSelected != ''){
			$('#search_functions_' + name + '_selected span').html(sSelected)
			$('#search_functions_' + name + '_selected').show()
		} else {
			$('#search_functions_' + name + '_selected span').html('')
			$('#search_functions_' + name + '_selected').hide()
		}
}

$(function () {
		
					
		bind_checkboxes_functions_click("podushki");
		bind_checkboxes_functions_click('safe_system');
		bind_checkboxes_functions_click('chear');
		bind_checkboxes_functions_click('windows');
		bind_checkboxes_functions_click('wheel');
		bind_checkboxes_functions_click('electronics');
		bind_checkboxes_functions_click('mirrow');
		bind_checkboxes_functions_click('salon');
		bind_checkboxes_functions_click('option');
		bind_checkboxes_functions_click('appearance');
		bind_checkboxes_functions_click('music');
		search_functions_trigger();
});

var oForm;
var search_form_height;

$(document).ready(function() {
	ZForms.attachObserver(ZForms.EVENT_TYPE_ON_INIT,function() {
		oForm = ZForms.getFormById('zf_search_form');

		oForm.getWidgetById('search_price_from_rur').updateElementValue = function(a){this.oElement.value=formatPrice (a.toStr()); this.oHiddenElement.value=a.toStr();}
		oForm.getWidgetById('search_price_from_euro').updateElementValue = function(a){this.oElement.value=formatPrice (a.toStr()); this.oHiddenElement.value=a.toStr();}
		oForm.getWidgetById('search_price_from_usd').updateElementValue = function(a){this.oElement.value=formatPrice (a.toStr()); this.oHiddenElement.value=a.toStr();}

		oForm.getWidgetById('search_price_to_rur').updateElementValue = function(a){this.oElement.value=formatPrice (a.toStr()); this.oHiddenElement.value=a.toStr();}
		oForm.getWidgetById('search_price_to_euro').updateElementValue = function(a){this.oElement.value=formatPrice (a.toStr()); this.oHiddenElement.value=a.toStr();}
		oForm.getWidgetById('search_price_to_usd').updateElementValue = function(a){this.oElement.value=formatPrice (a.toStr()); this.oHiddenElement.value=a.toStr();}



		var counter = 0;

		ZForms.attachObserver(
			ZForms.EVENT_TYPE_ON_CHANGE,
			function(sEventType, oWidget, bReady) {

				update_search_result_counter();
			},
			oForm
		);


	});




		search_form_height = $('#search_form').height();

		$('.search_functions_label').click(function(){
			$('#search_functions_container').slideToggle(300,function(){
				search_form_height = $('#search_form').height();
				move_submit_ontoggle();
			});
			$('#search_functions').toggleClass('folded')
		});

		$('.search_tech_label').click(function(){
			$('#search_tech_container').slideToggle(300,function(){
				search_form_height = $('#search_form').height();
				move_submit_ontoggle();
			});
			$('#search_tech').toggleClass('folded')
		});

		$('.search_brand_label').click(function(event){
			$('#group').slideToggle(300,function(){
				search_form_height = $('#search_form').height();
				move_submit_ontoggle();
			});
			$('#search_brand').toggleClass('folded');
		});

		$('.search_model_label').click(function(event){
			$('#group_model').slideToggle(300,function(){
				search_form_height = $('#search_form').height();
				move_submit_ontoggle();
			});
			$('#search_model').toggleClass('folded');
		});

		$('a[rel="external"]').click( function() {
			window.open( $(this).attr('href'), "helper", "width=500,height=500" );
			return false;
		});

		$(window).bind('ready scroll', function(event) {
			move_submit(event);
		})

		move_submit();

		$('#search_price_from_rur, #search_price_from_euro, #search_price_from_usd, #search_price_to_rur, #search_price_to_euro, #search_price_to_usd').focus(function(){
			var num = this.value.toString();
			num = num.replace(/ /gi,'');
			this.value = num;
		})

		$('#search_price_label .selected_label span').click(function(){
			$('#search_price_label_list').show()
		})

		var prev_id = 'rur';

		$('#search_price_label_list span').click(function(){
			var iCurrent_from_val = oForm.getWidgetById('search_price_from_' + prev_id).getValue().get();
			var iCurrent_to_val = oForm.getWidgetById('search_price_to_' + prev_id).getValue().get();

			if(prev_id != this.id){
				$('#search_price_from_fieldset, #search_price_to_fieldset').removeClass('display_' + prev_id);
				$('#search_price_from_fieldset, #search_price_to_fieldset').addClass('display_' + this.id);

				iCurrent_from_val = (this.id == 'rur') ? iCurrent_from_val * 30 : ( (prev_id == 'usd' || prev_id == 'euro' ) ? iCurrent_from_val : iCurrent_from_val / 30);
				iCurrent_to_val = (this.id == 'rur') ? iCurrent_to_val * 30 : ( (prev_id == 'usd' || prev_id == 'euro' ) ? iCurrent_to_val : iCurrent_to_val / 30);

				oForm.getWidgetById('search_price_from_' + this.id).setValue(oForm.getWidgetById('search_price_from_' + this.id).createValue(iCurrent_from_val));
				oForm.getWidgetById('search_price_to_' + this.id).setValue(oForm.getWidgetById('search_price_to_' + this.id).createValue(iCurrent_to_val));

				prev_id = this.id;
			}

			$('#search_price_label_list').hide();
			$('#search_price_label_list li').removeClass('selected');
			$('#search_price_label .selected_label > span').hide();
			$(this).parent().addClass('selected');
			$('#search_price_label_list').prepend($(this).parent())
			$('#search_price_label_value').val(this.id)
			$('#search_price_label .selected_label > span[class$=' + this.id + ']').show();
		})

		$('#search_form .search_body #car_list li a[href*="#"]').click(function(){
			$(this).parent().parent().toggleClass('selected');
			if($(this).parent().parent().hasClass('selected')){
				var text = $('#car_body_id').val() + ' ' + $(this).parent().parent().attr('car_body_id');
				$('#car_body_id').val(text);

			} else {
				var text = $('#car_body_id').val().replace(eval('/' + $(this).parent().parent().attr('car_body_id') + '/gi'), '');
				$('#car_body_id').val(text);

			}
			$(this).blur();

			update_search_result_counter();


			return false;
		});

		$('#search_body_label').click(function(){
			$('#search_class_label').removeClass('selected');
			$('#search_body_label').addClass('selected');
			$('#car_list').removeClass('hidden');
			$('#class_list').addClass('hidden');
		});
		$('#search_class_label').click(function(){
			$('#search_body_label').removeClass('selected');
			$('#search_class_label').addClass('selected');
			$('#class_list').removeClass('hidden');
			$('#car_list').addClass('hidden');
		});
		$('#search_form .search_body #class_list li a').click(function(){
			$(this).parent().parent().toggleClass('selected');
			if($(this).parent().parent().hasClass('selected')){
				var text = $('#car_class_id').val() + ' ' + $(this).parent().parent().attr('id');
				$('#car_class_id').val(text);

			} else {
				var text = $('#car_class_id').val().replace(eval('/' + $(this).parent().parent().attr('id') + '/gi'), '');
				$('#car_class_id').val(text);

			}
			$(this).blur();

			update_search_result_counter();

			return false;
		});

		check_brand_group();

		bind_checkboxes_tech('engine_type');
		bind_checkboxes_tech('search_tech_kpp');
		bind_checkboxes_tech('search_tech_transmission');
		bind_checkboxes_tech('search_tech_clearence');

		bind_checkboxes_functions('podushki');
		bind_checkboxes_functions('safe_system');
		bind_checkboxes_functions('chear');
		bind_checkboxes_functions('windows');
		bind_checkboxes_functions('wheel');
		bind_checkboxes_functions('electronics');
		bind_checkboxes_functions('mirrow');
		bind_checkboxes_functions('salon');
		bind_checkboxes_functions('climate');
		bind_checkboxes_functions('appearance');
		bind_checkboxes_functions('music');


		$('#group input[type="checkbox"]').click(function(){
			brand_model_load(this.value, new Array);
			check_brand_group();
			check_model_group();
			return true;
		});


		$('#search_tech_volume_from, #search_tech_volume_to').keyup(function(){
			if($('#search_tech_volume_from').val() != '' || $('#search_tech_volume_to').val() != ''){
				var text = '';
				if($('#search_tech_volume_from').val() != ''){
					text = 'от ' + $('#search_tech_volume_from').val()
				}
				if($('#search_tech_volume_from').val() != '' && $('#search_tech_volume_to').val() != ''){
					text += ' ';
				}

				if($('#search_tech_volume_to').val() != ''){
					text += 'до  ' + $('#search_tech_volume_to').val()
				}

				$('#search_tech_volume_selected span').html(text);
				$('#search_tech_volume_selected').show()
			} else {
				$('#search_tech_volume_selected span').html('')
				$('#search_tech_volume_selected').hide()
			}
			search_tech_trigger()
		})

		$('#search_tech_razgon_from, #search_tech_razgon_to').keyup(function(){
			if($('#search_tech_razgon_from').val() != '' || $('#search_tech_razgon_to').val() != ''){
				var text = '';
				if($('#search_tech_razgon_from').val() != ''){
					text = 'от ' + $('#search_tech_razgon_from').val()
				}
				if($('#search_tech_razgon_from').val() != '' && $('#search_tech_razgon_to').val() != ''){
					text += ' ';
				}

				if($('#search_tech_razgon_to').val() != ''){
					text += 'до  ' + $('#search_tech_razgon_to').val()
				}

				$('#search_tech_razgon_selected span').html(text);
				$('#search_tech_razgon_selected').show()
			} else {
				$('#search_tech_razgon_selected span').html('')
				$('#search_tech_razgon_selected').hide()
			}
			search_tech_trigger()
		})

		$('#search_number_places_from, #search_number_places_to').keyup(function(){
			if($('#search_number_places_from').val() != '' || $('#search_number_places_to').val() != ''){
				var text = '';
				if($('#search_number_places_from').val() != ''){
					text = 'от ' + $('#search_number_places_from').val()
				}
				if($('#search_number_places_from').val() != '' && $('#search_number_places_to').val() != ''){
					text += ' ';
				}

				if($('#search_number_places_to').val() != ''){
					text += 'до  ' + $('#search_number_places_to').val()
				}

				$('#search_number_places_selected span').html(text);
				$('#search_number_places_selected').show()
			} else {
				$('#search_number_places_selected span').html('')
				$('#search_number_places_selected').hide()
			}
			search_tech_trigger()
		})

		$('#search_dimensions_cargo_length_from, #search_dimensions_cargo_length_to').keyup(function(){
			if($('#search_dimensions_cargo_length_from').val() != '' || $('#search_dimensions_cargo_length_to').val() != ''){
				var text = '';
				if($('#search_dimensions_cargo_length_from').val() != ''){
					text = 'от ' + $('#search_dimensions_cargo_length_from').val()
				}
				if($('#search_dimensions_cargo_length_from').val() != '' && $('#search_dimensions_cargo_length_to').val() != ''){
					text += ' ';
				}

				if($('#search_dimensions_cargo_length_to').val() != ''){
					text += 'до  ' + $('#search_dimensions_cargo_length_to').val()
				}

				$('#search_dimensions_cargo_length_selected span').html(text);
				$('#search_dimensions_cargo_length_selected').show()
			} else {
				$('#search_dimensions_cargo_length_selected span').html('')
				$('#search_dimensions_cargo_length_selected').hide()
			}
			search_tech_trigger()
		})

		$('#search_dimensions_cargo_width_from, #search_dimensions_cargo_width_to').keyup(function(){
			if($('#search_dimensions_cargo_width_from').val() != '' || $('#search_dimensions_cargo_width_to').val() != ''){
				var text = '';
				if($('#search_dimensions_cargo_width_from').val() != ''){
					text = 'от ' + $('#search_dimensions_cargo_width_from').val()
				}
				if($('#search_dimensions_cargo_width_from').val() != '' && $('#search_dimensions_cargo_width_to').val() != ''){
					text += ' ';
				}

				if($('#search_dimensions_cargo_width_to').val() != ''){
					text += 'до  ' + $('#search_dimensions_cargo_width_to').val()
				}

				$('#search_dimensions_cargo_width_selected span').html(text);
				$('#search_dimensions_cargo_width_selected').show()
			} else {
				$('#search_dimensions_cargo_width_selected span').html('')
				$('#search_dimensions_cargo_width_selected').hide()
			}
			search_tech_trigger()
		})

		$('#search_dimensions_cargo_height_from, #search_dimensions_cargo_height_to').keyup(function(){
			if($('#search_dimensions_cargo_height_from').val() != '' || $('#search_dimensions_cargo_height_to').val() != ''){
				var text = '';
				if($('#search_dimensions_cargo_height_from').val() != ''){
					text = 'от ' + $('#search_dimensions_cargo_height_from').val()
				}
				if($('#search_dimensions_cargo_height_from').val() != '' && $('#search_dimensions_cargo_height_to').val() != ''){
					text += ' ';
				}

				if($('#search_dimensions_cargo_height_to').val() != ''){
					text += 'до  ' + $('#search_dimensions_cargo_height_to').val()
				}

				$('#search_dimensions_cargo_height_selected span').html(text);
				$('#search_dimensions_cargo_height_selected').show()
			} else {
				$('#search_dimensions_cargo_height_selected span').html('')
				$('#search_dimensions_cargo_height_selected').hide()
			}
			search_tech_trigger()
		})

		$('#search_dimensions_cargo_volume_from, #search_dimensions_cargo_volume_to').keyup(function(){
			if($('#search_dimensions_cargo_volume_from').val() != '' || $('#search_dimensions_cargo_volume_to').val() != ''){
				var text = '';
				if($('#search_dimensions_cargo_volume_from').val() != ''){
					text = 'от ' + $('#search_dimensions_cargo_volume_from').val()
				}
				if($('#search_dimensions_cargo_volume_from').val() != '' && $('#search_dimensions_cargo_volume_to').val() != ''){
					text += ' ';
				}

				if($('#search_dimensions_cargo_volume_to').val() != ''){
					text += 'до  ' + $('#search_dimensions_cargo_volume_to').val()
				}

				$('#search_dimensions_cargo_volume_selected span').html(text);
				$('#search_dimensions_cargo_volume_selected').show()
			} else {
				$('#search_dimensions_cargo_volume_selected span').html('')
				$('#search_dimensions_cargo_volume_selected').hide()
			}
			search_tech_trigger()
		})

		$('#search_capacity_from, #search_capacity_to').keyup(function(){
			if($('#search_capacity_from').val() != '' || $('#search_capacity_to').val() != ''){
				var text = '';
				if($('#search_capacity_from').val() != ''){
					text = 'от ' + $('#search_capacity_from').val()
				}
				if($('#search_capacity_from').val() != '' && $('#search_capacity_to').val() != ''){
					text += ' ';
				}

				if($('#search_capacity_to').val() != ''){
					text += 'до  ' + $('#search_capacity_to').val()
				}

				$('#search_capacity_selected span').html(text);
				$('#search_capacity_selected').show()
			} else {
				$('#search_capacity_selected span').html('')
				$('#search_capacity_selected').hide()
			}
			search_tech_trigger()
		})

		$('#search_tech_hp_from, #search_tech_hp_to').keyup(function(){
			if($('#search_tech_hp_from').val() != '' || $('#search_tech_hp_to').val() != ''){
				var text = '';
				if($('#search_tech_hp_from').val() != ''){
					text = 'от ' + $('#search_tech_hp_from').val()
				}
				if($('#search_tech_hp_from').val() != '' && $('#search_tech_hp_to').val() != ''){
					text += ' ';
				}

				if($('#search_tech_hp_to').val() != ''){
					text += 'до  ' + $('#search_tech_hp_to').val()
				}

				$('#search_tech_hp_selected span').html(text);
				$('#search_tech_hp_selected').show()
			} else {
				$('#search_tech_hp_selected span').html('')
				$('#search_tech_hp_selected').hide()
			}
			search_tech_trigger()
		})
	check_update_search_result_counter();
	$('#search_submit_result .text').click(function(){
		$('#submit_img').click();
	})
});



move_submit = function(){
	var submitHeight = $('#submit_img').height();
	var searchFormHeight = $('#search_form').height();

	var position = $(window).height() / 2
		+ $(window).scrollTop()
		- $('#search_form').offset().top
		- submitHeight / 2
	;

	var minPosition = 20;
	if (position < minPosition) {
		position = minPosition;
	}

	var maxPosition = searchFormHeight - submitHeight - 50;
	if (position > maxPosition) {
		position = maxPosition;
	}

	$('#search_submit').stop();
	$('#search_submit').animate({top: position}, 200);
}

function search_tech_trigger(){
	if($('#search_tech .search_tech_selected > span > span').length > $('#search_tech .search_tech_selected > span > span:empty').length){
		$('#search_tech .search_tech_selected').show();
		$('#search_tech .search_tech_unselected').hide();
	} else {
		$('#search_tech .search_tech_selected').hide();
		$('#search_tech .search_tech_unselected').show();
	}
}

move_submit_ontoggle = function(){
	move_submit();
}


function checkboxes_transmission (t) {
	if(t.checked){
		if($(t).val() == 'atransmission'){
			$('#kpp-2').prop("checked", true);
			$('#kpp-3').prop("checked", true);
			$('#kpp-4').prop("checked", true);
		}else{
			if ($('#kpp-2').attr('checked') && $('#kpp-3').attr('checked') && $('#kpp-4').attr('checked')){
				$('#kpp-234').prop("checked", true);
			}
			
		}
	}else{
		if($(t).val() == 'atransmission'){
			$('#kpp-2').prop("checked", false);
			$('#kpp-3').prop("checked", false);
			$('#kpp-4').prop("checked", false);
		}else if ($(t).val() == 'avt' || $(t).val() == 'robot' || $(t).val() == 'variator'){
			$('#kpp-234').prop("checked", false);
		}
	}

}
function bind_checkboxes_tech (name) {
	$('.' + name + ' input[type=checkbox]').click(function(){
		var sSelected = ''
		checkboxes_transmission(this);
		$('.' + name + ' input[type=checkbox]').each(function(){
			if(this.checked){
				if($(this).val() != 'atransmission'){
                    console.log($(this).next().html ());
					sSelected += ((sSelected != '') ? ', ' : '') + $(this).next().html ();
				}
			}
		})

		if(sSelected != ''){
			$('#' + name + '_selected span').html(sSelected)
			$('#' + name + '_selected').show()
		} else {
			$('#' + name + '_selected span').html('')
			$('#' + name + '_selected').hide()
		}

		search_tech_trigger()
	})
}

brand_model_load = function(car_brand_id, car_model) {
	if($('#search_brand_'+car_brand_id).attr('checked')){
		var url = $('#url_js').val();
		$.ajax({
			url: url+'search/brand/'+car_brand_id+'/json/',
			dataType: "json",
			success: function(data){
				ul = $('<ul>');
				ul.attr ('class', 'list_model');
				ul.attr ('id', 'brand_model_' + data.brand.id);
				
				li_brand = $('<li>');
				li_brand.attr('class', 'brand');
				li_brand.append(data.brand.title);

				ul.append (li_brand);

				for(i=0;i<data.models.length;i++){
					li = $('<li>');
					input = $('<input>');
					input.attr ('type', 'checkbox');
					input.attr ('name', 'car_model_id');
					input.attr ('id', 'car_model_'+data.models[i].id);
					input.attr ('value', data.models[i].id);
					input.click(function(){
						check_model_group();
						return true;
					});

					for(var j=0; j < car_model.length; j++){
						if(car_model[j] == data.models[i].id){
							input.attr ('checked', 'true');
						}
					}

					li.append (input);
					label = $('<label>');
					label.attr ('for', 'car_model_'+data.models[i].id);
					label.append(data.models[i].title);
					li.append (label);
					ul.append (li);
				}
				$('#group_model').append(ul);
				check_model_group();
			}
		});
	}else{
		$('#brand_model_'+car_brand_id).remove();
	}
}
check_brand_group = function(){
	var search_brand_selected_list_text = '';
	$('#group input').each(function(index) {
		if(this.checked){
			var devider = (search_brand_selected_list_text == '') ? '' : ', ';
			search_brand_selected_list_text = search_brand_selected_list_text + devider + $(this).next().html();
		}
	});

	$('#search_brand_selected_list').html(search_brand_selected_list_text);

	if(search_brand_selected_list_text == ''){
		$('.search_brand_selected').hide();
		$('.search_brand_unselected').show();
	} else {
		$('.search_brand_selected').show();
		$('.search_brand_unselected').hide();
	}

}

check_model_group = function(){
	var search_model_selected_list_text = '';
	$('#group_model input').each(function(index) {
		if(this.checked){
			var devider = (search_model_selected_list_text == '') ? '' : ', ';
			var brand_tmp = $(this).parent().parent().children('.brand').html();
			search_model_selected_list_text = search_model_selected_list_text + devider + brand_tmp + ' ' + $(this).next().html();
		}
	});
	$('#search_model').show();

	$('#search_model_selected_list').html(search_model_selected_list_text);

	if(search_model_selected_list_text == ''){
		$('.search_model_selected').hide();
		$('.search_model_unselected').show();
	} else {
		$('.search_model_selected').show();
		$('.search_model_unselected').hide();
	}
}

function search_functions_trigger(){
	if($('#search_functions .search_functions_selected > span > span').length > $('#search_functions .search_functions_selected > span > span:empty').length){
		$('#search_functions .search_functions_selected').show();
		$('#search_functions .search_functions_unselected').hide();
	} else {
		$('#search_functions .search_functions_selected').hide();
		$('#search_functions .search_functions_unselected').show();
	}
}


function bind_checkboxes_functions (name) {
	$('.search_functions_' + name + ' input[type=checkbox]').click(function(){
		var sSelected = ''
		$('.search_functions_' + name + ' input[type=checkbox]').each(function(){
			if(this.checked){
				sSelected += ((sSelected != '') ? ', ' : '') + $(this).next().html();
			}
		})

		if(sSelected != ''){
			$('#search_functions_' + name + '_selected span').html(sSelected)
			$('#search_functions_' + name + '_selected').show()
		} else {
			$('#search_functions_' + name + '_selected span').html('')
			$('#search_functions_' + name + '_selected').hide()
		}

		search_functions_trigger()
	})
}

var process_request = false;
var timerID;

function check_update_search_result_counter(){
	if(process_request){
		process_update_search_result_counter();
	}
	clearTimeout(timerID);
	timerID=setTimeout('check_update_search_result_counter()',1000);
	/*console.log("setTimeout from check", process_request);*/
}



function update_search_result_counter (sEventType, oWidget, bReady) {
	process_request = true;
	$('#search_submit_result .text').css({visibility: 'hidden'});
	$('#search_submit_result .loader').css({visibility: 'visible'});
	/*console.log("clearTimeout", process_request);*/
	clearTimeout(timerID);
	timerID=setTimeout('check_update_search_result_counter()',1000);
	/*console.log("setTimeout from update", process_request);*/
}

function process_update_search_result_counter () {

	/* Найдено<br/><span>6582</span> новых<br/>авто<br/> */
	process_request = false;

	/* Перекладываем вводимые значения в hidden поля для ajax запроса*/
	/* цена */
	$("#value-search_price_from_rur").val($("#search_price_from_rur").val().replace(/ /gi,''));
	$("#value-search_price_to_rur").val($("#search_price_to_rur").val().replace(/ /gi,''));
	/* объем */
	$("#value-search_tech_volume_from").val($("#search_tech_volume_from").val().replace(/,/gi, '\.'));
	$("#value-search_tech_volume_to").val($("#search_tech_volume_to").val().replace(/,/gi, '\.'));

	if($("#search_tech_razgon_from").val() != undefined){
		$("#value-search_tech_razgon_from").val($("#search_tech_razgon_from").val().replace(/,/gi, '\.'));
		$("#value-search_tech_razgon_to").val($("#search_tech_razgon_to").val().replace(/,/gi, '\.'));
	}
	if($("#search_tech_rashod_from").val() != undefined){
		$("#value-search_tech_rashod_from").val($("#search_tech_rashod_from").val().replace(/,/gi, '\.'));
		$("#value-search_tech_rashod_to").val($("#search_tech_rashod_to").val().replace(/,/gi, '\.'));
	}

	$("#value-search_tech_hp_from").val($("#search_tech_hp_from").val());
	$("#value-search_tech_hp_to").val($("#search_tech_hp_to").val());

	var query = ''
	$('#zf_search_form input').each(function(index) {
		if( ($(this).attr('type') == 'checkbox' && $(this).attr('checked')) || 
			($(this).attr('type') == 'radio' && $(this).attr('checked')) || 
			($(this).attr('type') != 'checkbox' && $(this).attr('type') != 'radio' && $(this).val() != '' )){
			if($(this).attr('name') != ''){
				query += $(this).attr('name') + '=' + $(this).val() +  '&';
			}
		}
	  });

	var url = $('#url_js').val();
	$.ajax({
		url: url+'search/result/count/?' + query,
		success: function(data){
			showLinkNewSearch();
			$('#search_submit_result .text').css({visibility: 'visible'}).html('Найдено<br/><span>' + data + '</span> ' + new_auto(data) + '<br/>авто<br/>');
			$('#search_submit_result .loader').css({visibility: 'hidden'});
		}
	});

}
function showLinkNewSearch (number) {
	$('#new_search_a1').removeClass("hidden");
	$('#new_search_a2').removeClass("hidden");
}

function new_auto (number) {
	var rest = number - Math.floor(number / 10) * 10;
	switch (rest) {
		case 1 :
			return 'новый';
			break;
		case 0 :
		case 2 :
		case 3 :
		case 4 :
		case 5 :
		case 6 :
		case 7 :
		case 8 :
		case 9 :
			return 'новых';
			break;
		default :
			return 'новый';
			break;
	}

}
