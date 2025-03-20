(function(){

	$(function () {

		// $('.jstree').jstree({
		// 	plugins: ["json_data","checkbox"],
		// 	checkbox: {
		// 		three_state : true, // to avoid that fact that checking a node also check others
		// 		whole_node : true,  // to avoid checking the box just clicking the node
		// 		tie_selection : false, // for checking without selecting and selecting without checking
		// 		keep_selected_style : false
		// 	},
		// 	"core": {
		// 		"open_parents": false,
		// 		"load_open": true,
		// 		'strings' : { 'Loading ...' : 'Загрузка ...' },
		// 		"themes":{
		// 			"icons":false,
		// 			"dots" : false,
		// 			"responsive" : false
		// 		}
		// 	}
		// });

	});
 
	function ValidateEmail(mail) {
		if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( mail )) {
			return (true);
		}
		else {
			return (false);
		}
	}

    var ajaxPagerLoadingClass   = 'ajax-pager-loading',
        ajaxPagerWrapClass      = 'ajax-pager-wrap',
        ajaxPagerLinkClass      = 'ajax-pager-link',
        ajaxWrapAttribute       = 'wrapper-class',
        ajaxPagerLoadingTpl     = ['<span class="' + ajaxPagerLoadingClass + '">', 
                                       'Загрузка…',     
                                   '</span>'].join(''),
        busy = false,
 
 
        attachPagination = function (wrapperClass){
            var $wrapper = $('.' + wrapperClass),
                $window  = $(window);
 
            if($wrapper.length && $('.' + ajaxPagerWrapClass).length){
                $window.on('scroll', function() {
                    if(($window.scrollTop() + $window.height()) > 
                        ($wrapper.offset().top + $wrapper.height()) && !busy) {
                        busy = true;
                        $('.' + ajaxPagerLinkClass).click();
                    }
                });
            }
        },
 
 
        ajaxPagination = function (e){
            e.preventDefault();
 
            busy = true;
            var wrapperClass = $('.'+ajaxPagerLinkClass).data(ajaxWrapAttribute),
                $wrapper = $('.' + wrapperClass),
                $link = $(this);
 
            if($wrapper.length){
                $('.' + ajaxPagerWrapClass).append(ajaxPagerLoadingTpl);
                $.get($link.attr('href'), {'AJAX_PAGE' : 'Y'}, function(data) {
					$wrapper.append(data);
					if ( !$('.news-previews .ajax-pager-link').length ){
						$('.' + ajaxPagerWrapClass).remove();
					}
					else {
						$('.' + ajaxPagerWrapClass).html( $('.news-previews .ajax-pager-link')[0].outerHTML );
					}
					$('.news-previews .ajax-pager-link').remove();
                    attachPagination(wrapperClass);
                    busy = false;
                });
            }
        };  
 
    $(function() {
        if($('.'+ajaxPagerLinkClass).length 
            && $('.'+ajaxPagerLinkClass).data(ajaxWrapAttribute).length){
            attachPagination($('.'+ajaxPagerLinkClass).data(ajaxWrapAttribute));
            $(document).on('click', '.' + ajaxPagerLinkClass, ajaxPagination);
        }
    });
	
	$('.share-aside__item.audio').on('click', function(e) {
		e.preventDefault();
		var audio_share = document.getElementById("corpMusic");
		if ( $('.share-audio').is(':visible') ) {
			$('.share-audio').hide(100, 'linear', function(){
				audio_share.pause();
			});
		}
		else {
			$('.share-audio').show(100, 'linear', function(){
				audio_share.play();
			});
			
		}
		return false;
	})

	$('form[name="subscribe"]').on("submit", function( event ) {
		
		event.preventDefault();

		var _email = $('#subs').val();
		if ( _email != '' && ValidateEmail( _email ) ) {
		   $.ajax({
			   type: "POST",
			   url: $('form[name="subscribe"]').attr('action'),
			   data: $( 'form[name="subscribe"]' ).serialize(),
			   dataType: "json",
			   success: function( fillter ) {
				   console.log( fillter.error );
				   if ( fillter.error == "N" ){
						$('form[name="subscribe"]').addClass('form-success');
						$('.subs-success span').html( fillter.message );
				   }
				   else {
						$('form[name="subscribe"]').addClass('form-unsuccess');
						$('.subs-success span').html( fillter.message );
				   }

			   }
		  });
		}
	});

	/*
	$('.select_city').on('click', '.select__head', function () {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).next().fadeOut();
		} else {
			$('.select__head').removeClass('open');
			$('.select__list, .select__lit').fadeOut();
			$(this).addClass('open');
			$(this).next().fadeIn();
		}
	});
	*/
	/*
		if(!$('.select__input').val()) {
			console.log('false')
		} else {
			console.log('true')
		}
	*/
	/*
	$('.select_city').on('click', '.select__item', function () {
		$('.select .select__item').removeClass('select__item__active');
		$(this).addClass('select__item__active');
	//
		$('.select__head').removeClass('open');
		$(this).parent().fadeOut();
		$(this).parent().prev().text($(this).text());
		$(this).parent().prev().prev().val($(this).text());
	});
	*/

	$('.faq_list').on("click", '.faq_el--q a', function( event ){
		$(this).parent().toggleClass('active').next().slideToggle( 200 );
		event.stopPropagation();
	});


	$(document).click(function (e) {
		if (!$(e.target).closest('.select').length) {
			$('.select__head').removeClass('open');
			$('.select__list, .select__lit').fadeOut();
		}
	});


	$(window).scroll(function(){
		
		let scrollTop = $(this).scrollTop();

		if ( scrollTop > 100) {
			$('.scrollup').fadeIn();
		}
		else {
			$('.scrollup').fadeOut();
		}

		if ( scrollTop > 220) {
			$('.sidebar-opener-js').addClass('fixed');
		}
		else {
			$('.sidebar-opener-js').removeClass('fixed');
		}

	});
 
	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});


    // Фильтрация магазинов
    $(document).on('click', '.select_country .select__item', function(e){
        if(
            !$(this).hasClass('select__item__active')
        ){
            var item = $(this);
            var relTab = $(item).attr('rel');

			$('.select_country .select__item').removeClass('select__item__active');
			$(this).addClass('select__item__active');

			$('.shop__tab').removeClass('shop__tab__current');
			$('#'+relTab).addClass('shop__tab__current');


			$('.select_country .select__head').text( item.text() );
			$('.select_country .select__head').click();

        }
    });

	$('.sidebar-close-js').click(function(){
		$(".catalog__sidebar").removeClass('sidebar_fixed');
		$("body").removeClass('css-scroll-fixed');
		return false;
	});

	$('.sidebar-opener-js').click(function(){
		$("body").addClass('css-scroll-fixed');
		$(".catalog__sidebar").addClass('sidebar_fixed');
		return false;
	});

	if ( $('.lg-gallery').length ) {
		lightGallery(document.querySelector('.lg-gallery'), {
			plugins: [lgZoom],
			download: false,
			counter: false,
			selector: '.zoom',
			backgroundColor: '#F00',
			closeOnTap: true,
			mobileSettings: { controls: true, showCloseIcon: true, download: false, closeOnTap: true }
		});
	}
/*
	if ( $('.book-btn').length ) {
		$('.book-btn').on('click', function(e){
			event.preventDefault();
			Popup.open();		
		});
	}
*/
	var Popup = {};
	Popup = {

		open: function(url, title, maxwidth) {

			var $popup = $('#jPopup');
			$popup.fadeIn(200);

		},

		close: function() {

			setTimeout(function(){
				$('#jPopup').fadeOut(200, function(){});
			},100)

		}

	};

	popupEvents();

	function popupEvents() {

		$(document).on('click', '#jPopup .close', function(event) {
			event.preventDefault();
			Popup.close();
		});

		$(document).on('keyup', function(e) {
			if (e.keyCode === 27) Popup.close();
		});

		$(document).on('click', '#jPopup', function(e) {
			if ( $(e.target).is(".modalPopup")) {
				Popup.close();
			}			
		});
	}

	if ( $('#reservationTable').length )	{
		/*$('#reservationTable tbody tr').on( "click", function(e){
			if (!$(e.target).closest('a').length) {
				Popup.open();
			}
		})*/
	}

	$( ".footer-nav__list>li.has-drop" ).each(function( index ) {
		_footerMenu = $( this );
		
		if ( index > 0 ) {
			$('.nav__list').append(
			'<li class="has-drop hide-1280">'+
				'<div class="nav__tab nav__tab-js">'+
					'<a href="'+$('a:first-child', _footerMenu).attr('href')+'"><span>'+$('.rub', _footerMenu).html()+'</span></a>'+
					'<span class="nav__angle nav-handler-js"><i>&nbsp;</i></span>'+
				'</div>'+
				'<div class="nav__drop nav__drop-js nav__simple">'+
					'<ul class="sub-nav__list">'+
						$('ul', _footerMenu).html()+
					'</ul>'+
				'</div>'+
			'</li>');
		}

	});

	$(".inner-gallery").length &&
	$(".inner-gallery").owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		autoplayHoverPause: true,
		smartSpeed: 700,
		autoplay: true,
		autoplayTimeout:5000,
		autoHeight: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: { 0: { items: 1 }, 768: { items: 1 }, 1024: { items: 1 } },
	})

	$(".articles-gallery").length &&
	$(".articles-gallery").owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		autoplayHoverPause: true,
		smartSpeed: 700,
		autoplay: true,
		autoplayTimeout:5000,
		autoHeight: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: { 0: { items: 1 }, 768: { items: 1 }, 1024: { items: 1 } },
	})

	
	var youtubeOwl = $(".youtube-carousel");

	youtubeOwl.length &&
	youtubeOwl.owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		autoplayHoverPause: true,
		smartSpeed: 700,
		autoplay: true,
		autoplayTimeout:5000,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: { 0: { items: 2 }, 768: { items: 4 }, 1024: { items: 6 } },
		onInitialized: function(){
			lightGallery(document.getElementById('youtube-gallery'), {
				plugins: [lgVideo],
				licenseKey: '0000-0000-000-0000',
				download: false,
				counter: false,
				selector: 'a',
				backgroundColor: '#F00',
				closeOnTap: true,
				mobileSettings: { controls: true, showCloseIcon: true, download: false, closeOnTap: true }
			});
		}
	})

})();