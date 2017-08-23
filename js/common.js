$(function () {
	var
		feedback_link = $ ('#contact a'),
		feedback = $ ('#feedback_popup'),
		close = feedback.find ('.close'),
		complain_link = $ ('#complain_a'),
		complain = $ ('#complain_popup'),
		complain_close = complain.find ('.close'),
		is_submit = 0;


	feedback_link.click (function()
	{
		var
			locations = window.location,
			re = /catalog\/search/,
			result = re.test(locations) ? 200 : 0;

			$('#form_feedback').find('input:text, textarea').val('');
			$('#form_feedback').show();
			$('#good').hide();

			var const_feedback_padding = 20;
			var topPosition = $(window).scrollTop() - result + $(window).height() / 2 -
				(feedback.height() / 2 + const_feedback_padding);

			feedback.removeClass ('not_display').css ({top: topPosition});
			$('#faid').css('display','none');
			return false;
	});

	$ ('#bottom_banner_close').click(function(){
		$('#bottom_banner').css('display', 'none');
		$.cookie("bottom_banner_m", "1", {expires: 1, path: "/"});
		return false;
	});

	$ ('#feedback_submit').click (function()
	{
		$('#faid').css('display','none');
		if(is_submit == 1){
			return false;
		}
		if($('#feedback_content').val() == null || $('#feedback_content').val() == 0){
			$('#faid').fadeIn("slow");
			return false;
		}
		$('#form_feedback').submit(function(){
			if(is_submit == 1){
				return false;
			}
			is_submit = 1;
			$.post("/php/requestHandler.php", {
					key: $('#feedback_key').val(),
					page: $('#feedback_page').val(),
					feedback_val : $('#feedback_content').val(),
					feedback_name : $('#feedback_content').attr("name"),
					user_name: $('#feedback_user_name').val(),
					email: $('#feedback_email').val()
				}, function (data){
					is_submit = 0;
					$('#form_feedback').css('display','none');
					$('#good').css('display','block');
					return false;
				}
			);
			return false;
		});
	});

	complain_link.click (function()
	{
		var const_complain_padding = 20;
		var topPosition = $(window).scrollTop() + $(window).height() / 2 -
			(complain.height() / 2 + const_complain_padding);

		complain.removeClass ('not_display').css ({top: topPosition});
		$('#faid').css('display','none');
		return false;
	});

	$ ('#complain_submit').click (function()
	{
		$('#faid').css('display','none');
		if($('#complain_content').val() == null || $('#complain_content').val() == 0){
			$('#faid').fadeIn("slow");
			return false;
		}
		$('#form_complain').submit(function(){
			$.post("/php/requestHandler.php", {
					key: $('#complain_key').val(),
					page: $('#complain_page').val(),
					сomplain_val : $('#complain_content').val(),
					сomplain_name : $('#complain_content').attr("name"),
					user_name: $('#complain_user_name').val(),
					email: $('#complain_email').val()
				}, function (data){
					$('#form_complain').css('display','none');
					$('#complain_good').css('display','block');
					return false;
				}
			);
			return false;
		});
	});

	$ ('#vote_submit').click (function()
	{
		$('#vote_form').submit(function(){
			$.post("/php/requestHandler.php", {
					rating: $("#vote_block input:radio:checked").val()
				}, function (data){
					$('#vote_block').css('display','none');
					$('#vote_rating_ok').css('display','block');
				}
			);
			return false;
		});
	});

	close.click (function()
	{
		feedback.addClass ('not_display');
	});
	complain_close.click (function()
	{
		complain.addClass ('not_display');
	});

	$('#button_close').click (function()
	{
		feedback.addClass ('not_display');
	});
	$('#complain_button_close').click (function()
	{
		complain.addClass ('not_display');
	});


	$('#subscribe_auth').click(function(){
		_gaq.push(['_trackEvent', 'Authorization', 'Signup']);
		showPopupWindow($(this).attr('href'), 450);
		return false;
	});

	$('a[href="#subscribe"]').click(function(){
		if ($('#subscribe_form input[name*="email"]').val() != '') {
			$('#subscribe_form a[href="#submit"]').trigger('click');
		} else {
			var data = $(this).next('.subscribe').clone();
			$(this).next('.subscribe').remove();
			showPopupWindow('', 450, data.html());
		}
		_gaq.push(['_trackEvent', 'Subscription', 'Sub']);
		return false;
	});

	//$('#subscribe_form a[href="#submit"]').live('click', function(){
	$( document ).on( "click", '#subscribe_form a[href="#submit"]', function() {
		var btn = $(this);
		if (btn.hasClass('inProgress')) {
			return false;
		} else {
			btn.addClass('inProgress');
			$('#subscribe_form').find('.error').remove();
		}

		var input = $('#subscribe_form').find('input[name*="email"]');
		if (input.val() == '') {
			btn.removeClass('inProgress');
			$('<div class="error">Пожалуйста, введите свою почту</div>').insertAfter(input);
			return;
		}

		$.post($('#subscribe_form').attr('action'), $('#subscribe_form').serialize(), function(response){
			_gaq.push(['_trackEvent', 'Subscription_Ok', 'Sub']);
			if (response == '1') {
				$('.popup_window').remove();
				alert('Вы успешно подписались');
				window.location.reload();
			} else {
				alert('Произошла ошибка');
				$('<div class="error">Пожалуйста, введите свою почту</div>').insertAfter(input);
			}
			btn.removeClass('inProgress');
		});
		return false;
	});

	if (window.location.href.indexOf('#subscribe') != -1) {
		$('a[href="#subscribe"]').trigger('click');
	}
});

$(document).ready(function() {
	$(".show-phone .show-phone-caption").click(
		function() {
			var container = $(this).parent(".show-phone");

			container.addClass("show-phone-on");

			var name = container.data('eventName');
			var category = container.data('eventCategory');
			multiTrackEvent(name, category);
		}
	);

	function bottomBannerInit()
	{
		var expandFooter = function () {
			$('#footer').addClass('bottom_banner_on');
		};

		var collapseFooter = function () {
			$('#footer').removeClass('bottom_banner_on');
		};

		QutoBanners.doWhenAdfoxBannerLoaded('#bottom_banner', expandFooter);
		$('#bottom_banner_close').click(collapseFooter);
	}
	bottomBannerInit();
});

/**
 * Расставить пробелы между тысячами
 *
 * @param int price
 * @return string
 */
function formatPrice (price)
{
	price = new String (price).split ('');
	var result = '';
	for (var i = price.length - 1; i >= 0; i --) {
		result = price[i] + result;
		if ((price.length - i) % 3 === 0) {
			result = ' ' + result;
		}
	}
	return result;
}

function showPopupWindow(url, width, data, centered, noclose)
{
	var popup = $('<div class="popup_window">' +
						'<div class="overlay"></div>' +
						'<div class="loader"></div>' +
						'<div class="content">' +
							'<div class="modal">' +
								(noclose === true ? '' : '<div class="btn_close" title="Закрыть"></div>') +
								'<div class="content"></div>' +
							'</div>' +
						'</div>' +
					'</div>');

	var content = $('.popup_window > .content');
	var modal = $('.modal', popup);

	modal.width(width);

	$('body').append(popup);

	$('.btn_close', popup).click(function(){
		popup.remove();
	});

	if (data !== undefined) {
		$('.content', modal).html(data);
		$('.popup_window .loader').hide();
		modal.show();
		if (centered !== undefined) {
			var height = $('.content', modal).height();
			content.css('top', '40%');
			content.css('margin-top', '-' + (height / 2) + 'px');
		}
	} else {
		$.get(url, function(response){
			$('.content', modal).html(response);
			$('.popup_window .loader').hide();
			modal.show();
		});
	}
}

function CommentsLoader(appId, containerSelector, triggerSelector, loadingSelector, limit, offset)
{
	this.appId = appId;
	this.containerSelector = containerSelector;
	this.triggerSelector = triggerSelector;
	this.loadingSelector = loadingSelector;
	this.limit = limit;
	this.offset = offset;

	// Запрашивается на 1 комментарий больше,
	// чтобы понять есть ли комментарии для последующей загрузки.
	// Последний комментарий не выводится.
	this.queryLimit = this.limit + 1;

	this.init();
}

CommentsLoader.prototype = {
	API_BASE_URL: "http://c.rambler.ru/api/v2/json/",

	DATE_FORMAT_OPTIONS_TIME: {
		hour: '2-digit',
		minute: '2-digit'
	},

	months: [
		'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
		'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
	],

	maxCommentSize: 80,

	containerSelector: null,
	triggerSelector: null,
	loadingSelector: null,
	limit: null,
	offset: null,

	queryLimit: null,

	isLoading: false,

	init: function() {
		var _this = this;
		$(this.triggerSelector).click(function() {
			_this.loadMore();
		});
		this.loadMore();
	},

	loadMore: function() {
		// Защита от повторного нажатия кнопки во время загрузки
		if (this.isLoading) {
			return;
		}

		var onError = function (jqXHR, textStatus, errorThrown) {
			_this.isLoading = false;
			$(_this.loadingSelector).hide();
		};

		var params = {
			appId: this.appId,
			count: this.queryLimit,
			offset: this.offset
		};

		this.isLoading = true;
		_this = this;
		this.callApi(
			"get_user_last_comments",
			params,
			function (commentsData, textStatus, jqXHR) {
				_this.callQuto(
					"/api/get-entities-info-by-xids/",
					{
						xids: _this.getXids(commentsData)
					},
					function (entitiesData, textStatus, jqXHR) {
						_this.appendComments(commentsData, entitiesData);
						_this.isLoading = false;
						$(_this.loadingSelector).hide();
					},
					onError
				);
			},
			onError
		);
	},

	getXids: function(commentsData) {
		var xids = [];
		if (this.isValidGetUserLastCommentsResult(commentsData)) {
			for (var i = 0; i < commentsData.result.length; i++) {
				xids.push(commentsData.result[i].xid);
			}
		}
		return xids;
	},

	appendComments: function(commentsData, entitiesData) {
		var recievedComments;
		if (this.isValidGetUserLastCommentsResult(commentsData)) {
			recievedComments = commentsData.result.length;

			// Оставляем только this.limit элементов
			var comments = commentsData.result.slice(0, this.limit);
			for (var i = 0; i < comments.length; i++) {
				var entityTitle = typeof(entitiesData[comments[i].xid]) != 'undefined' ? entitiesData[comments[i].xid] : false;
				$(this.containerSelector).append(this.renderComment(comments[i], entityTitle));
			}

			this.offset += commentsData.result.length == this.queryLimit ? this.limit : commentsData.result.length;
		} else {
			recievedComments = 0;
		}

		// Если получено меньше комментариев, чем было запрошено,
		// то следующей страницы для загрузки нет
		if (recievedComments < this.queryLimit) {
			$(this.triggerSelector).hide();
		} else {
			// Срабатывает после первой загрузки, когда кнопка скрыта
			$(this.triggerSelector).show();
		}
	},

	isValidGetUserLastCommentsResult: function(data) {
		var result =
			typeof(data.status) !== 'undefined' &&
			data.status == 200 &&
			typeof(data.result) !== 'undefined'
		;
		return result;
	},

	renderComment: function(commentData, entityTitle) {
		var date = new Date(commentData.createdAt);
		var dateHtml = this.formatDate(date);

		var text = commentData.text;

		var ending = '...';
		if (text.length > this.maxCommentSize + ending.length) {
			text = text.substring(0, this.maxCommentSize) + ending;
		}

		var html = "";
		html += '<div class="item">';
		html += '<div class="date">' + dateHtml + '</div>';
		html += '<div class="title"><a href="' + commentData.permalink + '" target="_blank">' + entityTitle + '</a></div>';
		html += '<div class="text">' + text + '</div>';
		html += '<div class="link"><a href="' + commentData.permalink + '" target="_blank">Перейти</a></div>';
		html += '</div>';

		return html;
	},

	formatDate: function(date) {
		if (this.isToday(date)) {
			var html = 'Сегодня<br>' +
				'<span class="big">' + date.toLocaleString("ru", this.DATE_FORMAT_OPTIONS_TIME) + '</span>';
		} else {
			var html = '<span class="big">' + date.getDay() + '</span><br>' +
				this.months[date.getMonth()];
		}

		return html;
	},

	isToday: function(d1) {
		var d2 = new Date();
		return d1.getFullYear() == d2.getFullYear()	&&
			d1.getMonth() == d2.getMonth() &&
			d1.getDate() == d2.getDate()
		;
	},

	callQuto: function(url, params, onSuccess, onError) {
		var ajaxParams = {
			method: "get",
			url: url,
			data: params,
			dataType: "json",
			success: onSuccess,
			error: onError
		};
		$.ajax(ajaxParams);
	},

	callApi: function(method, params, onSuccess, onError) {
		var ajaxParams = {
			method: "post",
			url: this.API_BASE_URL + method,
			data: JSON.stringify(params),
			processData: false,
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			headers: {
				'Content-Type': 'application/json',
			},
			success: onSuccess,
			error: onError
		};
		$.ajax(ajaxParams);
	}
};

function doWhenWithTimeout(fnJob, fnWhen, timeout) {
    var startTime = new Date();

    var fnTimer = function () {
        var currentTime = new Date();

        // Выполнено условие
        if (fnWhen()) {
            fnJob();
            return true;
        }

        // Истек timeout
        if (timeout !== false && currentTime - startTime >= timeout) {
            return false;
        }

        window.setTimeout(arguments.callee, 200);
    };

    var intervalId = window.setTimeout(fnTimer, 200);
}

function multiTrackEvent(name, googleCategory) {
	yaCounter1188885.reachGoal(name);
	_gaq.push(['_trackEvent', googleCategory, name, location.href]);
}

var GeometryHelper = {
	getRectanglesIntersection: function (r1, r2) {
		var intersection = {
			top: Math.max(r1.top, r2.top),
			left: Math.max(r1.left, r2.left),
			bottom: Math.min(r1.bottom, r2.bottom),
			right: Math.min(r1.right, r2.right)
		};
		return intersection;
	},

	getRectangleArea: function (r) {
		return (r.right - r.left) * (r.bottom - r.top);
	},

	isIntersects: function (r1, r2) {
		// X not intersects
		if (r1.right < r2.left || r2.right < r1.left) {
			return false;
		}

		// Y not intersects
		if (r1.bottom < r2.top || r2.bottom < r1.top) {
			return false;
		}

		return true;
	}
};

function isElementInViewport(el, percentage) {

    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var bannerRect = el.getBoundingClientRect();

    var clientAreaRect = {top: 0, left: 0, right: $(window).width(), bottom: $(window).height()};

	var intersects = GeometryHelper.isIntersects(bannerRect, clientAreaRect);
	if (intersects) {
		var intersection = GeometryHelper.getRectanglesIntersection(bannerRect, clientAreaRect);
		var visiblePart = Math.round(100 * GeometryHelper.getRectangleArea(intersection) / GeometryHelper.getRectangleArea(bannerRect));
		// console.log(el.id + ' visible: ' + visiblePart + '');

		if (visiblePart >= percentage) {
			return true;
		}
	}

	return false;
}

/**
 * Функция вызывается, когда на странице обновилось содержимое
 *
 * На данный момент функция обновляет баннер 240*400.
 *
 * @param  string section Раздел сайта
 * @return void
 */
function qutoPageContentReloaded(section)
{
	if (typeof(Adf) != "undefined") {
		// Reloading 240x400 banner
		console.log("q:reloadssp1 adfox_02_240x400");
		Adf.banner.reloadssp("adfox_02_240x400", adfox_02_240x400_options1, adfox_02_240x400_options2);
	}
}

/**
 * Методы для работы с рекламой
 */
var QutoBanners = {

	BANNERS_ENUM: [
		'adfox_01_billboard',
		'adfox_02_240x400',
		'adfox_03_240x400_2nd',
		'adfox_04_1_super_footer',
		'adfox_05_1_in_read',
		'adfox_05_2_in_read',
		'adfox_06_native1',
		'adfox_07_native2',
		'adfox_08_context',
		'adfox_10_native_footer',
		'adfox_11_fullscreen',
		'adfox_direct'
	],

	GALLERY_BANNERS_ENUM: [
		'adfox_01_billboard',
		'adfox_02_240x400',
		'adfox_04_1_super_footer'
	],

	/**
	 * Ждет загрузки баннера в блоке blockId и вызывает handler
	 *
	 * @param  string   blockId  ID блока баннера
	 * @param  function handler  Функция обработчик "события"
	 * @param  object   settings Параметры
	 * @return void
	 */
	doWhenAdfoxBannerLoaded: function(blockId, handler, settings)
	{
		var defaultSettings = {
			'minLoadedBannerHeight': 20, // px
			'waitTimeout': 10000  // msec
		};

		var settings = $.extend({}, defaultSettings, settings || {});

		doWhenWithTimeout(
			handler,
			function() {
				return $(blockId).height() > settings.minLoadedBannerHeight;
			},
			settings.waitTimeout
		);
	},

	/**
	 * Ждет загрузки баннера (директ, бегун или заглушка) в блоке blockSelector и показывает/скрывает нужные элементы
	 *
	 * @param  string blockSelector   jQuery-селектор блока баннера
	 * @param  string contentToShowSelector jQuery-селектор элементов, которые необходимо показать
	 * @param  string contentToHideSelector jQuery-селектор элементов, которые необходимо скрыть
	 * @return void
	 */
	switchIfBannerLoaded: function(
		blockSelector,
		contentToShowSelector,
		contentToHideSelector,
		callback
	)
	{
		// Директ загрузился
		var handler = function() {
			if (contentToHideSelector) {
				$(contentToHideSelector).hide();
			}
			if (contentToShowSelector) {
				$(contentToShowSelector).show();
			}
			if (typeof(callback) != 'undefined') {
				callback();
			}
		};

		var waitForBannerLoad = 600000; // msec (600 sec)

		doWhenWithTimeout(
			handler,
			function() {
				var isLoaded = QutoBanners.isAnyBannerLoaded(blockSelector);
				return isLoaded;
			},
			waitForBannerLoad
		);
	},

	/**
	 * Проверяет загрузку какого-либо баннера в блоке blockSelector
	 *
	 * @param  string blockSelector jQuery-селектор блока баннера
	 * @return boolean
	 */
	isAnyBannerLoaded: function(blockSelector) {
		var isBegunLoaded = QutoBanners.isBegunLoaded(blockSelector);
		var isDirectLoaded = QutoBanners.isDirectLoaded(blockSelector);
		var isMockupLoaded = QutoBanners.isMockupLoaded(blockSelector);
		return (isBegunLoaded || isDirectLoaded || isMockupLoaded);
	},

	/**
	 * Проверяет загрузку баннера Бегуна в блоке blockSelector
	 *
	 * @param  string blockSelector jQuery-селектор блока баннера
	 * @return boolean
	 */
	isBegunLoaded: function(blockSelector) {
		var length = $(blockSelector).find('div[id*="begun"]').length;
		return length > 0;
	},

	/**
	 * Проверяет загрузку директа в блоке blockSelector
	 *
	 * @param  string blockSelector jQuery-селектор блока баннера
	 * @return boolean
	 */
	isDirectLoaded: function(blockSelector) {
		var length = $(blockSelector).find('iframe').contents().find('.yap-layout__content').length;
		return length > 0;
	},

	/**
	 * Проверяет загрузку заглушки в блоке blockSelector
	 *
	 * @param  string blockSelector jQuery-селектор блока баннера
	 * @return boolean
	 */
	isMockupLoaded: function(blockSelector) {
		var length = $(blockSelector).find("div.xhtml_banner div[class*='outerBlock']").length;
		return length > 0;
	},

	refreshVisibleBanners: function(banners, percentage)
	{
		// console.log("refreshVisibleBanners");
		for (var i in banners) {
			var id = banners[i];
			var el = $('#' + id);
			if (el.length > 0 && isElementInViewport(el, percentage)) {
				// console.log('refreshing ' + id);
				if (typeof(Adf) != "undefined") {
					console.log("q:reloadssp2 " + id);
					Adf.banner.reloadssp(id, window[id + "_options1"], window[id + "_options2"]);
				}
			}
		}
	},


	markRows: function(selector) {
		var rows = QutoBanners.splitByRows(selector);
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			for (var j = 0; j < row.length; j++) {
				var cell = $(rows[i][j]);
				cell.removeClass('qrm-row-first');
				cell.removeClass('qrm-row-last');
				if (j == 0) {
					cell.addClass('qrm-row-first');
				} else if (j == row.length - 1) {
					cell.addClass('qrm-row-last');
				}
			}

		}

		return rows;
	},

	splitByRows: function (selector) {
		var items = $(selector);

		var rows = [];
		var rowTopPosition = -1;
		items.each(function() {
			if (!$(this).is(':visible')) {
				return;
			}

			if (Math.abs(rowTopPosition - $(this).offset().top) > 10) {
				rowTopPosition = $(this).offset().top;
				rows.push([]);
			}

			rows[rows.length - 1].push(this);
		});

		return rows;
	},

	showedImagesCount: 0,

	onGalleryNextImage: function() {
		QutoBanners.showedImagesCount++;
		// console.log('count: ' + QutoBanners.showedImagesCount);
		if (QutoBanners.showedImagesCount > 1 && (QutoBanners.showedImagesCount - 1) % 2 == 0) {
			// console.log('try refresh');
			QutoBanners.refreshGalleryBanners();
		}
	},

	refreshGalleryBanners: $.throttle(2000, true, function() {
		// console.log('refreshing!');
		refreshCounters();
		QutoBanners.refreshVisibleBanners(QutoBanners.BANNERS_ENUM, 50);
	})
};


function QutoAuthHelper()
{
}

QutoAuthHelper.prototype = {

	/**
	 * List of blocks that depends on auth state
	 *
	 * @type Array
	 */
	authDependentBlocks: [],

	/**
	 * Is auth state changed after exportsid.js
	 *
	 * @type Boolean
	 */
	authChanged: false,

	/**
	 * Is page content depends on auth state
	 *
	 * @type Boolean
	 */
	isPageDependsOnAuth: false,

	/**
	 * Initialize user session via exportsid
	 *
	 * @return void
	 */
	init: function(isPageDependsOnAuth) {

		var _this = this;

		this.isPageDependsOnAuth = isPageDependsOnAuth;

		var qutoRsidx = $.cookie('qutoRsidx');

		$.ajax({
			method: "get",
			dataType: "script",
			url: "https://id.rambler.ru/script/exportsid.js",
			success: function () {
				if (typeof(RamblerId) != "undefined") {
					if (typeof(RamblerId.rsidx) != "undefined") {
						ramblerRsidx = RamblerId.rsidx;
					} else {
						ramblerRsidx = '';
						if (typeof(RamblerId.remove) != "undefined") {
							for (var i = 0; i < RamblerId.remove.length; i++) {
								$.cookie(RamblerId.remove[i], null, {path: '/'});
							}
						}
					}
					if (ramblerRsidx != qutoRsidx) {
						$.cookie('qutoRsidx', ramblerRsidx, {path: '/'});
						if (_this.isPageDependsOnAuth) {
							window.location.href = window.location.href;
						} else {
							_this.updateAuthDependentBlocks();
						}
					}
				}
			}
		});

		window.ramblerIdHelper = window.ramblerIdHelper || [];
		window.ramblerIdHelper.push(function () {
			window.ramblerIdHelper.registerOnFrameCloseCallback(
				function() {_this.onFrameCloseCallback();}
			);
			window.ramblerIdHelper.registerOnPossibleLoginCallback(
				function() {_this.onPossibleLoginOrLogoutCallback();}
			);
			window.ramblerIdHelper.registerOnPossibleLogoutCallback(
				function() {_this.onPossibleLoginOrLogoutCallback();}
			);
		});
	},

	/**
	 * Add HTML block that depends on auth state
	 *
	 * If auth state already changed, updates block immediately
	 *
	 * @param string selector
	 * @param string url
	 */
	addAuthDependentBlock: function(selector, url) {
		if (this.authChanged) {
			// Immediate update
			this.updateAuthDependentBlock(selector, url);
		} else {
			this.authDependentBlocks.push(
				{'selector': selector, 'url': url}
			);
		}
	},

	/**
	 * Update all registered blocks after auth state change
	 *
	 * @param string selector
	 * @param string url
	 */
	updateAuthDependentBlocks: function() {
		this.authChanged = true;
		for (var i = 0; i < this.authDependentBlocks.length; i++) {
			var block = this.authDependentBlocks[i];
			this.updateAuthDependentBlock(block.selector, block.url);
		}
	},

	/**
	 * Update block after auth state change
	 *
	 * @param string selector
	 * @param string url
	 */
	updateAuthDependentBlock: function(selector, url) {
		$.ajax({
			method: "get",
			dataType: "html",
			'url': url,
			success: function (data) {
				$(selector).html(data);
			}
		});
	},

	/**
	 * Logout user
	 *
	 * @return void
	 */
	logout: function() {
		window.ramblerIdHelper.logout();
	},

	/**
	 * Show login form
	 *
	 * @return void
	 */
	showForm: function() {
		this.getLoginIframe().addClass('quto-auth-frame--visible');
	},

	/**
	 * Hide login form
	 *
	 * @return void
	 */
	hideForm: function() {
		$('.quto-auth-frame').removeClass('quto-auth-frame--visible');
	},

	/**
	 * Get or create (if not exists) login form
	 *
	 * @return jQuery
	 */
	getLoginIframe: function() {
		var iframe = $('.js--quto-auth-frame-container .quto-auth-frame');
		if (iframe.length == 0) {
			var url = "https://id.rambler.ru/login-20?param=iframe&iframeOrigin=" + encodeURIComponent(window.location.href);
			iframe = $('<iframe class="quto-auth-frame" src="' + url + '" frameborder="0"></iframe>');
			$('.js--quto-auth-frame-container').append(iframe);
		}
		return iframe;
	},

	/**
	 * Close login form
	 *
	 * @return void
	 */
	onFrameCloseCallback: function() {
		this.hideForm();
	},

	/**
	 * Handle auth state change
	 *
	 * @return void
	 */
	onPossibleLoginOrLogoutCallback: function() {
		window.location.href = window.location.href;
	}
};

window.qutoAuthHelper = new QutoAuthHelper();

function FotoramaImageManager(fimContainerSelector, readonly, fimImagesInputSelector)
{
	this.fotorama = null;
	this.readonly = readonly;
	this.fimContainerSelector = fimContainerSelector;
	this.fimImagesInputSelector = fimImagesInputSelector;
	this.images = [];
	this.showsCount = 0;
	this.onShow = null;
	this.initialStartIndex = null;

	var _this = this;

	var currentFotoramaIndex = $('.fim-container').index($(_this.fimContainerSelector));

	var matches = window.location.hash.match(/^\#(\d+)_(\d+)$/);
	if (matches) {
		if (parseInt(matches[1]) - 1 == currentFotoramaIndex) {
			this.initialStartIndex = parseInt(matches[2]) - 1;
		}
	}

	$(window).bind('popstate', function() {
		var matches = matches = window.location.hash.match(/^\#(\d+)_(\d+)$/);
		if (matches) {
			if (parseInt(matches[1]) - 1 == currentFotoramaIndex) {
				_this.getFotorama().show(parseInt(matches[2]) - 1);
			}
		}
	});

	// prev/next navigation visibility
	$(this.fimContainerSelector + ' .fotorama').on(
		'fotorama:showend',
		function() {
			_this.showsCount++;

			$(_this.fimContainerSelector + '.fim-container .fim-caption').remove();
			$(_this.fimContainerSelector + '.fim-container .fotorama__stage').after( // or .fotorama__nav before
				$('<div class="fim-caption"><div class="fim-caption-counter"></div><div class="fim-caption-text"></div></div>')
			);

			var i = _this.getFotorama().activeIndex;
			$(_this.fimContainerSelector + ' .fim-caption-counter').html((i + 1) + ' / ' + _this.images.length);
			$(_this.fimContainerSelector + ' .fim-caption-text').html(_this.images[i].caption);

			if (isHistoryApiAvailable() && _this.showsCount > 1) {
				if (_this.getFotorama().activeIndex == 0) {
					var url = window.location.pathname;
				} else {
					var hash = '#' + (currentFotoramaIndex + 1) + '_' + (_this.getFotorama().activeIndex + 1);
					var url = window.location.pathname + hash;
				}
				window.history.pushState(false, false, url);
			}

			if (_this.onShow) {
				_this.onShow(_this);
			}
		}
	);

	$(_this.fimContainerSelector + ' .fim-prev').click(function(){
		_this.getFotorama().show('<');
	});

	$(_this.fimContainerSelector + ' .fim-next').click(function(){
		_this.getFotorama().show('>');
	});

	if (!this.readonly) {
		// remove button rendering
		$(this.fimContainerSelector + ' .fotorama').on(
			'fotorama:showend',
			function() {
				if ($(_this.fimContainerSelector + ' .fotorama' + ' .fotorama__stage__frame.fotorama__active .fim-remove').length == 0) {
					var onClick = function() {
						var src = $(this).parent('.fotorama__stage__frame').find('img').attr('src');
						_this.remove(src);
						_this.update();
					}

					var button = $('<div class="button fim-remove"><button class="btn green">Удалить</button></div>');
					button.click(onClick)
					$(_this.fimContainerSelector + ' .fotorama' + ' .fotorama__stage__frame.fotorama__active').append(button);
				}
			}
		);
	}
}

FotoramaImageManager.prototype = {
	fotorama: null,

	initialStartIndex: null,

	fimContainerSelector: null,

	fimImagesInputSelector: null,

	readonly: true,

	images: null,

	showsCount: 0,

	onShow: null,

	add: function(src, caption) {
		var data = {img: src};
		if (typeof(caption) !== "undefined") {
			data.caption = caption;
		}
		this.images.push(data);
	},

	remove: function(src) {
		for (var i = 0; i < this.images.length; i++) {
			if (this.images[i].img == src) {
				this.images.splice(i, 1);
				break;
			}
		}
	},

	showLast: function() {
		this.getFotorama().show('>>');
	},

	update: function(src) {
		this.getFotorama().load(
			this.images
		);
		if (this.initialStartIndex) {
			this.getFotorama().show(this.initialStartIndex);
			this.initialStartIndex = false;
		}

		if (!this.readonly) {
			$(this.fimImagesInputSelector).val(JSON.stringify(this.images));
		}

		if (this.images.length == 0) {
			$(this.fimContainerSelector + '.fim-container').hide();
		} else {
			$(this.fimContainerSelector + '.fim-container').show();
		}
	},

	setOnShow: function(handler) {
		this.onShow = handler;
	},

	getShowsCount: function() {
		return this.showsCount;
	},

	getFotorama: function() {
		return $(this.fimContainerSelector + ' .fotorama').fotorama().data('fotorama');
	}
};

function isHistoryApiAvailable() {
    return !!(window.history && history.pushState);
}

var refreshCounters = $.debounce(1000, function() {
	// console.log('refreshCounters');

	// google analytics
	window.ga && window.ga('send', 'pageview', location.pathname);

	// hit yandex metrics
	$.each(window.yaCounters, function(i, yaCounter) {
		yaCounter.hit(window.location.href, {referer: document.referrer});
	});
});

AMPartnerWidgetSerpParams = [];
AMPartnerWidgetsManager = {

	configs: [],

	showedIndexes: [],

	add: function(config) {
		AMPartnerWidgetsManager.configs.push(config);

		var className = config.selector.substring(1);
		document.write('<div class="' + className + '"></div>');
	},

	addRandomFromArray: function(configs) {
		var config = configs[Math.floor(Math.random() * configs.length)];
		AMPartnerWidgetsManager.add(config);
	},

	addRandomFromArrayUnique: function(configs, groupName) {
		var indexesOfNotShow = [];
		for (var i in configs) {
			if (!AMPartnerWidgetsManager.isShowed(groupName, i)) {
				indexesOfNotShow.push(i);
			}
		}

		var index = indexesOfNotShow[Math.floor(Math.random() * indexesOfNotShow.length)];
		AMPartnerWidgetsManager.showedIndexes.push(index);

		var config = configs[index];
		AMPartnerWidgetsManager.add(config);
	},

	isShowed: function(groupName, index) {
		if (typeof(AMPartnerWidgetsManager.showedIndexes[groupName]) != "undefined") {
			if ($.inArray(index, AMPartnerWidgetsManager.showedIndexes[groupName])) {
				return true;
			}
		}

		return false;
	},

	install: function() {
		if (AMPartnerWidgetsManager.configs.length == 0) {
			return false;
		}

		AMPartnerWidgetSerpParams = AMPartnerWidgetsManager.configs;

		(function () {
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = 'https://partners.am.ru/dist/partnerWidgetSerp.bundle.js';
			var script = document.getElementsByTagName('script')[0];
			script.parentNode.insertBefore(s, script);
		})();

		return true;
	}
};

$(document).ready(function() {
	function initMovableBanner() {
		var marginFromTopOfWindow = 10;
		var marginFromFooter = 10;

		var handler = function () {
			var container = $('.movable-vertical-banner-container');
			var inner = $('.movable-vertical-banner-inner');

			var scrollTop = $(window).scrollTop();
			var containerOffset = container.offset().top;
			var footerOffset = $('#footer').offset().top;
			var innerHeight = inner.height();

			var top = (scrollTop - containerOffset) + marginFromTopOfWindow;
			var minTop = 0;
			var maxTop = footerOffset - marginFromFooter - innerHeight - containerOffset;

			if (top < minTop) {
				top = minTop;
			}
			if (top > maxTop) {
				top = maxTop;
			}
			inner.css('position', 'absolute');
			inner.css('top', top);

			container.css('height', innerHeight);

			inner.css('width', container.css('width'));
		}

		$(window).scroll(handler);
		$(window).resize(handler);

		/* Пуск по таймеру отслеживает загрузку контента внтури блока (меняется высота блока) */
		var launchLimit = 30;
		var launchTimeout = 1000;
		var launchCount = 0;
		var timer = function() {
			launchCount++;
			handler();
			if (launchCount < launchLimit) {
				window.setTimeout(timer, launchTimeout);
			}
		}
		window.setTimeout(timer, launchTimeout);

	}
	if ($('.movable-vertical-banner-container').length > 0) {
		initMovableBanner();
	}
});
