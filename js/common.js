/**
 * !Resize only width
 * */

$(function() {
	$('.user-options__item_login').click(function() {
		$(this).next().slideToggle()
	});

	$( '.owl-carousel' ).on("mouseout", $('.zoom'), function( event ){
		zoomOut( event );
	});

});


function getVals() {
	// Get slider values
	var parent = this.parentNode;
	var slides = parent.getElementsByTagName("input");
	var slide1 = parseFloat(slides[0].value);
	var slide2 = parseFloat(slides[1].value);
	// Neither slider will clip the other, so make sure we determine which is larger
	if (slide1 > slide2) {
		var tmp = slide2;
		slide2 = slide1;
		slide1 = tmp;
	}

	var displayElement = parent.getElementsByClassName("rangeValues")[0];
	displayElement.innerHTML = "Высота каблука: " + slide1 + "  - " + slide2 + " см.";
}

window.onload = function () {
	// Initialize Sliders
	var sliderSections = document.getElementsByClassName("range-slider");
	for (var x = 0; x < sliderSections.length; x++) {
		var sliders = sliderSections[x].getElementsByTagName("input");
		for (var y = 0; y < sliders.length; y++) {
			if (sliders[y].type === "range") {
				sliders[y].oninput = getVals;
				// Manually trigger event first time to display values
				sliders[y].oninput();
			}
		}
	}
};


function zoom(e) {
	let zoomer = e.currentTarget;
	let windowWidth = window.outerWidth;
	if (windowWidth > 530) {
		$( 'img', zoomer ).css({'opacity': 0});
		e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
		e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
		x = (offsetX / zoomer.offsetWidth) * 100;
		y = (offsetY / zoomer.offsetHeight) * 100;
		zoomer.style.backgroundPosition = x + "% " + y + "%";
	}
}
function zoomOut( e ) {
	let zoomer = e.currentTarget;
	let windowWidth = window.outerWidth;
	if (windowWidth > 530) {
		$( 'img', zoomer ).css({'opacity': 1});
		zoomer.style.backgroundPosition = "50% 50%";
	}
}

let notifyShow = () => {
	$(".prod__body").on('mouseover', function () {
		$(this).children().css("display", "block");
	});
	$(".prod__body").on('mouseout', function () {
		$(this).children().hide();
	});
}
notifyShow()

let showReview = () => {
	$('.show-review').on('click', function () {
		$(this).next().slideToggle()
	})
}
showReview()

let clearValue = () => {
	$('.select__clear').on('click', function () {
		$('.select__input').removeAttr( "value" );
		$(this).addClass('clear')
		/*$("input[name='sortby']").next().html('Сортировать по:')*/
		$("input[name='brand']").next().html('Бренд');
		$("input[name='season']").next().html('Сезон');
		// console.log('test')
		setTimeout(function(){
			$('.select__clear').removeClass('clear');
		}, 2000);
	})

}
clearValue()

//Select -> Options JS
jQuery(($) => {
	// $('.select').on('click', '.select__head', function () {
	// 	if ($(this).hasClass('open')) {
	// 		$(this).removeClass('open');
	// 		$(this).next().fadeOut();
	// 	} else {
	// 		$('.select__head').removeClass('open');
	// 		$('.select__list, .select__lit').fadeOut();
	// 		$(this).addClass('open');
	// 		$(this).next().fadeIn();
	// 	}
	// });
	// // if(!$('.select__input').val()) {
	// // 	console.log('false')
	// // } else {
	// // 	console.log('true')
	// // }
	//
	// $('.select').on('click', '.select__item', function () {
	// 	$('.select .select__item').removeClass('select__item__active');
	// 	$(this).addClass('select__item__active');
	//
	// 	$('.select__head').removeClass('open');
	// 	$(this).parent().fadeOut();
	// 	$(this).parent().prev().text($(this).text());
	// 	$(this).parent().prev().prev().val($(this).text());
	// });
	//
	// $(document).click(function (e) {
	// 	if (!$(e.target).closest('.select').length) {
	// 		$('.select__head').removeClass('open');
	// 		$('.select__list, .select__lit').fadeOut();
	// 	}
	// });

});

$(".insta-carousel").length &&
$(".insta-carousel").owlCarousel({
	loop: true,
	margin: 0,
	nav: true,
	autoplayHoverPause: true,
	smartSpeed: 700,
	autoplay: true,
	autoplayTimeout:5000,
	navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
	responsive: { 0: { items: 1 }, 768: { items: 2 }, 1024: { items: 4 } },
})


$(".outlet-carousel").length &&
$(".outlet-carousel").owlCarousel({
	loop: false,
	margin: 0,
	nav: true,
	smartSpeed: 700,
	autoplay: true,
	navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
	responsive: { 0: { items: 4, slideBy: 4, smartSpeed: 250, autoplay: false }, 530: { items: 4 }, 768: { items: 5 }, 1024: { items: 7 } },
})

$(".product__carousel").length &&
$(".product__carousel").owlCarousel({
	loop: true,
	margin: 0,
	nav: true,
	smartSpeed: 700,
	autoplay: false,
	navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
	responsive: { 0: { items: 2 }, 768: { items: 3 }, 1024: { items: 4 } },
})

$(".product__carousel-lastseen").length &&
$(".product__carousel-lastseen").owlCarousel({
	loop: true,
	margin: 0,
	nav: true,
	smartSpeed: 700,
	autoplay: false,
	navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
	responsive: { 0: { items: 2 }, 768: { items: 3 }, 1024: { items: 4 } },
})



var monthNames = [ "January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December" ];

for (i = new Date().getFullYear(); i > 1900; i--){
	$('#bthyear').append($('<option />').val(i).html(i));
}

for (i = 1; i < 13; i++){
	$('#bthmonth').append($('<option />').val(i).html(i));
}
updateNumberOfDays();

$('#bthyear, #bthmonth').on("change", function(){
	updateNumberOfDays();
});



function updateNumberOfDays(){
	$('#bthday').html('');
	month=$('#bthmonth').val();
	year=$('#bthyear').val();
	days=daysInMonth(month, year);

	for(i=1; i < days+1 ; i++){
		$('#bthday').append($('<option />').val(i).html(i));
	}

}

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}


$(document).ready(function() {
	$('.edit_data').click(function() {
		$(this).addClass("selected")
		$('.person_data').removeClass("selected")
		$(".edit_item").removeAttr("readonly")
	});
	$('.person_data').click(function() {
		$(this).addClass("selected")
		$('.edit_data').removeClass("selected")
		$(".edit_item").attr("readonly", true)
	});

	$('.product__owl-item-image').on('mouseover',function(){
		$(this).elevateZoom({scrollZoom : true});
	});

	$('.show-info').click(function() {
		$(this).next().slideToggle();
	});

	$(document).on('click', '.sidebar__heading', function(e){
		$(this).next().slideToggle();
		$(this).toggleClass('active');
	})

	var sync1 = $("#sync1");
	var sync2 = $("#sync2");
	let windowWidth = window.outerWidth;
	if(windowWidth > 639) {
		var slidesPerPage = 6;
	} else if (windowWidth < 639) {
		var slidesPerPage = 5;
	}

	var syncedSecondary = true;

	if ( sync1.length )	{
		sync1.owlCarousel({
			items : 1,
			slideSpeed : 2000,
			nav: false,
			autoplay: false,
			dots: false,
			loop: true,
			lazyLoad: true,
			responsiveRefreshRate : 200,
			navText: ['',''],
		}).on('changed.owl.carousel', syncPosition);
	}

	if ( sync2.length )	{
		sync2
			.on('initialized.owl.carousel', function () {
				sync2.find(".owl-item").eq(0).addClass("current");
			})
			.owlCarousel({
				items : slidesPerPage,
				dots: false,
				nav: true,
				navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
				smartSpeed: 200,
				slideSpeed : 500,
				//   slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
				responsiveRefreshRate : 100
			}).on('changed.owl.carousel', syncPosition2);
	}

	$('.fa-chevron-left').click(function() {
		sync1.trigger('prev.owl.carousel');
	});

	$('.fa-chevron-right').click(function() {
		sync1.trigger('next.owl.carousel');
	});

	function syncPosition(el) {
		//if you set loop to false, you have to restore this next line
		//var current = el.item.index;

		//if you disable loop you have to comment this block
		var count = el.item.count-1;
		var current = Math.round(el.item.index - (el.item.count/2) - .5);

		if(current < 0) {
			current = count;
		}
		if(current > count) {
			current = 0;
		}

		//end block

		sync2
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current");
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2.find('.owl-item.active').first().index();
		var end = sync2.find('.owl-item.active').last().index();

		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if(syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl.carousel').to(number, 100, true);
		}
	}

	sync2.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});

	// $( ".owl-next").html('<div class="owl-arrow__next"></div>');
	// $( ".owl-prev").html('<img style="" src="img/back.svg" />');

	$('.product__size_table').click(function() {
		$('#size-table').show();
	});
	$('.close').click(function() {
		$('#size-table').hide();
	});
	$('#size-table').on("click", function(e) {
		var container = $(".modal");
		// if the target of the click isn't the container nor a descendant of the container
		if ( container.is(e.target) ) {
			$('#size-table').hide();
		}
	});
	$(document).keydown(function(event) {
		if (event.keyCode == 27) {
			$('#size-table').hide();
		}
	});

	$('.booking__result').click(function() {
		$(this).next().slideToggle()
	});
	$(document).mouseup(function (e){
		var menu = $(this).find('.discounts');
		if (!menu.is(e.target)
			&& menu.has(e.target).length === 0) {
			menu.hide();
		}
	});

});


var resizeByWidth = true;
var header_menu       = $("nav.nav"),
	menuOffset        = header_menu[0]?.offsetTop,
	docBody   = document.documentElement || document.body.parentNode || document.body,
	hasOffset = window.pageYOffset !== undefined,
	scrollTop;
var prevWidth = -1;

$(window).resize(function () {
	headerHeight      = document.getElementsByClassName('header').offsetHeight;

	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth !== currentWidth;
	if (resizeByWidth) {
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;

		StickyTopMenu();

	}
});

/**
 * !Detected touchscreen devices
 * */
var TOUCH = Modernizr.touchevents;
var DESKTOP = !TOUCH;

/**
 * !Tooltip
 * */
function initTooltip() {
	var $elements = $('.user-options__item a');
	$.each($elements, function () {
		var $curElem = $(this);
		$curElem.attr('data-title', $curElem.attr('title')).attr('title','');
	})
}

(function($){
	var defaults = {
		// container: '.ms-drop__container-js', // is element
		opener: '.ms-drop__opener-js',
		openerText: 'span',
		drop: '.ms-drop__drop-js',
		dropOption: '.ms-drop__drop-js a',
		dropOptionText: 'span',
		initClass: 'ms-drop--initialized',
		closeOutsideClick: true, // Close all if outside click
		closeEscClick: true, // Close all if click on escape key
		closeAfterSelect: true, // Close drop after selected option
		preventOption: false, // Add preventDefault on click to option
		selectValue: true, // Display the selected value in the opener
		modifiers: {
			isOpen: 'is-open',
			activeItem: 'active-item'
		}

		// Callback functions
		// afterInit: function () {} // Fire immediately after initialized
		// afterChange: function () {} // Fire immediately after added or removed an open-class
	};

	function MsDrop(element, options) {
		var self = this;

		self.config = $.extend(true, {}, defaults, options);

		self.element = element;

		self.callbacks();
		self.event();
		// close drop if clicked outside active element
		if (self.config.closeOutsideClick) {
			self.closeOnClickOutside();
		}
		// close drop if clicked escape key
		if (self.config.closeEscClick) {
			self.closeOnClickEsc();
		}
		self.eventDropItems();
		self.init();
	}

	/** track events */
	MsDrop.prototype.callbacks = function () {
		var self = this;
		$.each(self.config, function (key, value) {
			if(typeof value === 'function') {
				self.element.on(key + '.msDrop', function (e, param) {
					return value(e, self.element, param);
				});
			}
		});
	};

	MsDrop.prototype.event = function () {
		var self = this;
		self.element.on('click', self.config.opener, function (event) {
			event.preventDefault();
			var curContainer = $(this).closest(self.element);

			if (curContainer.hasClass(self.config.modifiers.isOpen)) {

				curContainer.removeClass(self.config.modifiers.isOpen);

				// callback afterChange
				self.element.trigger('afterChange.msDrop');
				return;
			}

			self.element.removeClass(self.config.modifiers.isOpen);

			curContainer.addClass(self.config.modifiers.isOpen);

			// callback afterChange
			self.element.trigger('afterChange.msDrop');
		});
	};

	MsDrop.prototype.closeOnClickOutside = function () {

		var self = this;
		$(document).on('click', function(event){
			if( $(event.target).closest(self.element).length ) {
				return;
			}

			self.closeDrop();
			event.stopPropagation();
		});

	};

	MsDrop.prototype.closeOnClickEsc = function () {

		var self = this;
		$(document).keyup(function(e) {
			if (e.keyCode === 27) {
				self.closeDrop();
			}
		});

	};

	MsDrop.prototype.closeDrop = function (container) {

		var self = this,
			$element = $(container || self.element);

		if ($element.hasClass(self.config.modifiers.isOpen)) {
			$element.removeClass(self.config.modifiers.isOpen);
		}

	};

	MsDrop.prototype.eventDropItems = function () {

		var self = this;

		self.element.on('click', self.config.dropOption, function (e) {
			var cur = $(this);
			var curParent = cur.parent();

			if(curParent.hasClass(self.config.modifiers.activeItem)){
				e.preventDefault();
				return;
			}
			if(self.config.preventOption){
				e.preventDefault();
			}

			var curContainer = cur.closest(self.element);

			curContainer.find(self.config.dropOption).parent().removeClass(self.config.modifiers.activeItem);

			curParent
				.addClass(self.config.modifiers.activeItem);

			if(self.config.selectValue){
				curContainer
					.find(self.config.opener).find(self.config.openerText)
					.html(cur.find(self.config.dropOptionText).html());
			}

			if(self.config.closeAfterSelect) {
				self.closeDrop();
			}

		});

	};

	MsDrop.prototype.init = function () {

		this.element.addClass(this.config.initClass);

		this.element.trigger('afterInit.msDrop');

	};

	$.fn.msDrop = function (options) {
		'use strict';

		return this.each(function(){
			new MsDrop($(this), options);
		});

	};
})(jQuery);

/**
 * !Select lang
 * */
function selectLang() {
	$('.ms-drop__container-js').msDrop({})
}

/**
 *  !Add placeholder for old browsers
 * */
function placeholderInit() {
	$('[placeholder]').placeholder();
}

/**
 * !Show print page by click on the button
 * */
function printShow() {
	$('.view-print').on('click', function (e) {
		e.preventDefault();
		window.print();
	})
}

/**
 * !Toggle class on a form elements on focus
 * */
function inputFocusClass() {
	var $inputs = $('.field-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classFocus = 'input--focus';

		$inputs.focus(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			$currentField.addClass(classFocus);
			$currentField.prev('label').addClass(classFocus);
			$currentField.closest($selectWrap).prev('label').addClass(classFocus);
			$currentFieldWrap.addClass(classFocus);
			$currentFieldWrap.find('label').addClass(classFocus);

		}).blur(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			$currentField.removeClass(classFocus);
			$currentField.prev('label').removeClass(classFocus);
			$currentField.closest($selectWrap).prev('label').removeClass(classFocus);
			$currentFieldWrap.removeClass(classFocus);
			$currentFieldWrap.find('label').removeClass(classFocus);

		});
	}
}

/**
 * !Toggle class on a form elements if this one has a value
 * */
function inputHasValueClass() {
	var $inputs = $('.field-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classHasValue = 'input--has-value';

		$.each($inputs, function () {
			switchHasValue.call(this);
		});

		$inputs.on('keyup change', function () {
			switchHasValue.call(this);
		});

		function switchHasValue() {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			//first element of the select must have a value empty ("")
			if ($currentField.val().length === 0) {
				$currentField.removeClass(classHasValue);
				$currentField.prev('label').removeClass(classHasValue);
				$currentField.closest($selectWrap).prev('label').removeClass(classHasValue);
				$currentFieldWrap.removeClass(classHasValue);
				$currentFieldWrap.find('label').removeClass(classHasValue);
			} else if (!$currentField.hasClass(classHasValue)) {
				$currentField.addClass(classHasValue);
				$currentField.prev('label').addClass(classHasValue);
				$currentField.closest($selectWrap).prev('label').addClass(classHasValue);
				$currentFieldWrap.addClass(classHasValue);
				$currentFieldWrap.find('label').addClass(classHasValue);
			}
		}
	}
}

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
	/*promo slider*/
	var $promoSlider = $('.promo-slider-js');
	if ($promoSlider.length) {
		$promoSlider.each(function () {
			var $thisSlider = $(this),
				$thisBtnNext = $('.slider-arrow_next-js', $thisSlider),
				$thisBtnPrev = $('.slider-arrow_prev-js', $thisSlider),
				$thisPag = $('.swiper-pagination', $thisSlider);
			var time = 8;
			var $bar,
				slider,
				isPause,
				tick,
				percentTime;

			slider = new Swiper($thisSlider, {
				autoplay: true,
				autoplayDisableOnInteraction: false,
			    speed: 1500,
				// Optional parameters
				//loop: true,
				// Keyboard
				keyboardControl: true,
				// Parallax
				parallax: true,

				// Navigation arrows
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,

				// Pagination
				pagination: $thisPag,
				paginationType: 'bullets',
				paginationClickable: true,
				breakpoints: {
					768: {
						parallax: false
					}
				},
				// events
				onInit: function (swiper) {
					$(swiper.container).closest($thisSlider).addClass('is-loaded');
				}
			});

			// slider.on('slideChangeStart', function () {
			// 	startProgressbar();
			// 	isPause = true;
			// });

			// $bar = $('.slider-progress .progress');
			//
			// $('.main-enter').on({
			// 	mouseenter: function() {
			// 		isPause = true;
			// 	},
			// 	mouseleave: function() {
			// 		isPause = false;
			// 	}
			// });
			//
			// function startProgressbar() {
			// 	resetProgressbar();
			// 	percentTime = 0;
			// 	isPause = false;
			// 	tick = setInterval(interval, 10);
			// }
			//
			// function interval() {
			// 	if(isPause === false) {
			// 		percentTime += 1 / (time+0.1);
			// 		$bar.css({
			// 			// width: percentTime+"%",
			// 			'-ms-transform'     : 'translateX(' + percentTime + '%)',
			// 			'transform'         : 'translateX(' + percentTime + '%)'
			// 		});
			// 		if(percentTime >= 100) {
			// 			slider.slideNext();
			// 			startProgressbar();
			// 		}
			// 	}
			// }
			//
			// function resetProgressbar() {
			// 	$bar.css({
			// 		// width: 0+'%',
			// 		'-ms-transform'     : 'translateX(0%)',
			// 		'transform'         : 'translateX(0%)'
			// 	});
			// 	clearTimeout(tick);
			// }
			//
			// startProgressbar();
		});

	}

	/*tape slider*/
	var $tapeSlider = $('.tape-slider-js');
	if ($tapeSlider.length) {
		$tapeSlider.each(function () {
			var $thisSlider = $(this),
				$thisBtnNext = $('.slider-arrow_next-js', $thisSlider),
				$thisBtnPrev = $('.slider-arrow_prev-js', $thisSlider),
				$thisPag = $('.swiper-pagination', $thisSlider)
				// slidesLength = $('.swiper-slide', $thisSlider).length,
			;
			// console.log("slidesLength: ", slidesLength);
			// console.log("perView: ", perView);

			new Swiper($('.swiper-container', $thisSlider), {
				// slidesPerView: 'auto',
				slidesPerView: 4,
				slidesPerGroup: 4,
				// autoHeight: true,
				// Optional parameters
				loop: false,
				// Keyboard
				keyboardControl: true,
				// additional slide offset in the beginning of the container
				// slidesOffsetBefore: 91,
				spaceBetween: 0,
				// Ratio to trigger swipe to next/previous slide during long swipes
				longSwipesRatio: 0.1,
				longSwipesMs: 200,

				// Navigation arrows
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,
				// navigation: {
				// 	nextEl: $thisBtnNext,
				// 	prevEl: $thisBtnPrev
				// },

				// Pagination
				pagination: $thisPag,
				paginationClickable: true,
				// paginationType: 'fraction',
				// Responsive breakpoints
				breakpoints: {
					1279: {
						spaceBetween: 20
					},
					1023: {
						slidesPerView: 3,
						slidesPerGroup: 3,
						spaceBetween: 20
					},
					859: {
						slidesPerView: 2,
						slidesPerGroup: 2,
						spaceBetween: 20
					},
					640: {
						slidesPerView: 2,
						slidesPerGroup: 2,
						spaceBetween: 15
					},
					420: {
						slidesPerView: 1,
						slidesPerGroup: 1,
						spaceBetween: 0
					}
				},
				// events
				onInit: function (swiper) {
					$(swiper.slides).matchHeight({
						byRow: true, property: 'height', target: null, remove: false
					});
					$(swiper.container).closest($thisSlider).addClass('is-loaded');
				}
			});

			// $('h2').on('click', function () {
			// 	console.log(1);
			// 	mySwiper.detachEvents();
			// });
			// $('.parts__item__thumb').on('click', function () {
			// 	console.log(2);
			// 	mySwiper.update();
			// 	mySwiper.attachEvents();
			// })
		});
	}

	/*news slider*/
	var $newsSlider = $('.news-slider-js');
	if ($newsSlider.length) {
		$newsSlider.each(function () {
			var $thisSlider = $(this),
				$thisBtnNext = $('.slider-arrow_next-js', $thisSlider),
				$thisBtnPrev = $('.slider-arrow_prev-js', $thisSlider),
				$thisPag = $('.swiper-pagination', $thisSlider);

			new Swiper($('.swiper-container', $thisSlider), {
				slidesPerView: 5,
				// Optional parameters
				loop: false,
				// Keyboard
				keyboardControl: true,
				// Ratio to trigger swipe to next/previous slide during long swipes
				longSwipesRatio: 0.1,
				longSwipesMs: 200,

				// Navigation arrows
				nextButton: $thisBtnNext,
				prevButton: $thisBtnPrev,

				// Pagination
				pagination: $thisPag,
				paginationClickable: true,
				breakpoints: {
					1600: {
						slidesPerView: 4
					},
					899: {
						slidesPerView: 3
					},
					639: {
						slidesPerView: 2
					}
				},
				// events
				onInit: function (swiper) {
					$(swiper.slides).matchHeight({
						byRow: true, property: 'height', target: null, remove: false
					});
					$(swiper.container).closest($thisSlider).addClass('is-loaded');
				}
			});
		});
	}
}

/**
 * !Plugin HoverClass
 * */
(function ($) {
	var HoverClass = function (settings) {
		var options = $.extend({
			container: 'ul',
			item: 'li',
			drop: 'ul'
		},settings || {});

		var self = this;
		self.options = options;

		var container = $(options.container);
		self.$container = container;
		self.$item = $(options.item, container);
		self.$drop = $(options.drop, container);
		self.$html = $('html');

		self.modifiers = {
			hover: 'hover',
			hoverNext: 'hover_next',
			hoverPrev: 'hover_prev'
		};

		self.addClassHover();

		if (!DESKTOP) {
			$(window).on('debouncedresize', function () {
				self.removeClassHover();
			});
		}
	};

	HoverClass.prototype.addClassHover = function () {
		var self = this,
			_hover = this.modifiers.hover,
			_hoverNext = this.modifiers.hoverNext,
			_hoverPrev = this.modifiers.hoverPrev,
			$item = self.$item,
			item = self.options.item,
			$container = self.$container;

		if (!DESKTOP) {

			$container.on('click', ''+item+'', function (e) {
				var $currentAnchor = $(this);
				var currentItem = $currentAnchor.closest($item);

				if (!currentItem.has(self.$drop).length){ return; }

				e.stopPropagation();

				if (currentItem.hasClass(_hover)){
					// self.$html.removeClass('css-scroll-fixed');

					// if($('.main-sections-js').length) {
					// 	$.fn.fullpage.setAllowScrolling(true); // unblocked fullpage scroll
					// }

					currentItem.removeClass(_hover).find('.'+_hover+'').removeClass(_hover);

					return;
				}

				// self.$html.addClass('css-scroll-fixed');
				// if($('.main-sections-js').length) {
				// 	$.fn.fullpage.setAllowScrolling(false); // blocked fullpage scroll
				// }

				$('.'+_hover+'').not($currentAnchor.parents('.'+_hover+''))
					.removeClass(_hover)
					.find('.'+_hover+'')
					.removeClass(_hover);
				currentItem.addClass(_hover);

				e.preventDefault();
			});

			$container.on('click', ''+self.options.drop+'', function (e) {
				e.stopPropagation();
			});

			$(document).on('click', function () {
				$item.removeClass(_hover);
			});

		} else {
			$container.on('mouseenter', ''+item+'', function () {

				var currentItem = $(this);

				if (currentItem.prop('hoverTimeout')) {
					currentItem.prop('hoverTimeout', clearTimeout(currentItem.prop('hoverTimeout')));
				}

				currentItem.prop('hoverIntent', setTimeout(function () {
					// self.$html.addClass('css-scroll-fixed');
					// if($('.main-sections-js').length) {
					// 	$.fn.fullpage.setAllowScrolling(false); // blocked fullpage scroll
					// }

					currentItem.addClass(_hover);
					currentItem.next().addClass(_hoverNext);
					currentItem.prev().addClass(_hoverPrev);

				}, 50));

			}).on('mouseleave', ''+ item+'', function () {

				var currentItem = $(this);

				if (currentItem.prop('hoverIntent')) {
					currentItem.prop('hoverIntent', clearTimeout(currentItem.prop('hoverIntent')));
				}

				currentItem.prop('hoverTimeout', setTimeout(function () {
					// self.$html.removeClass('css-scroll-fixed');
					// if($('.main-sections-js').length) {
					// 	$.fn.fullpage.setAllowScrolling(true); // unblocked fullpage scroll
					// }

					currentItem.removeClass(_hover);
					currentItem.next().removeClass(_hoverNext);
					currentItem.prev().removeClass(_hoverPrev);
				}, 50));

			});

		}
	};

	HoverClass.prototype.removeClassHover = function () {
		var self = this;
		self.$item.removeClass(self.modifiers.hover );
	};

	window.HoverClass = HoverClass;

}(jQuery));

/**
 * !Toggle "hover" class by hover on the item of the list
 * */
function initHoverClass() {
	if ($('.nav__list-js').length) {
		new HoverClass({
			container: '.nav__list-js', drop: '.nav__drop-js'
		});
	}
}

/**
 * !Multi accordion jquery plugin
 * */
(function ($) {
	var MultiAccordion = function (settings) {
		var options = $.extend({
			collapsibleAll: false, // если установить значение true, сворачиваются идентичные панели НА СТРАНИЦЕ, кроме текущего
			resizeCollapsible: false, // если установить значение true, при ресайзе будут соворачиваться все элементы
			container: null, // общий контейнер
			item: null, // непосредственный родитель открывающегося элемента
			handler: null, // открывающий элемента
			handlerWrap: null, // если открывающий элемент не является непосредственным соседом открывающегося элемента, нужно указать элемент, короный является оберткой открывающего элемета и лежит непосредственно перед открывающимся элементом (условно, является табом)
			panel: null, // открывающийся элемент
			openClass: 'active', // класс, который добавляется при открытии
			currentClass: 'current', // класс текущего элемента
			animateSpeed: 300, // скорость анимации
			collapsible: false // сворачивать соседние панели
		}, settings || {});

		this.options = options;
		var container = $(options.container);
		this.$container = container;
		this.$item = $(options.item, container);
		this.$handler = $(options.handler, container);
		this.$handlerWrap = $(options.handlerWrap, container);
		this._animateSpeed = options.animateSpeed;
		this.$totalCollapsible = $(options.totalCollapsible);
		this._resizeCollapsible = options.resizeCollapsible;

		this.modifiers = {
			active: options.openClass,
			current: options.currentClass
		};

		this.bindEvents();
		this.totalCollapsible();
		this.totalCollapsibleOnResize();

	};

	MultiAccordion.prototype.totalCollapsible = function () {
		var self = this;
		self.$totalCollapsible.on('click', function () {
			self.$panel.slideUp(self._animateSpeed, function () {
				self.$container.trigger('accordionChange');
			});
			self.$item.removeClass(self.modifiers.active);
		})
	};

	MultiAccordion.prototype.totalCollapsibleOnResize = function () {
		var self = this;
		$(window).on('resize', function () {
			if (self._resizeCollapsible) {
				self.$panel.slideUp(self._animateSpeed, function () {
					self.$container.trigger('accordionChange');
				});
				self.$item.removeClass(self.modifiers.active);
			}
		});
	};

	MultiAccordion.prototype.bindEvents = function () {
		var self = this;
		var $container = this.$container;
		var $item = this.$item;
		var panel = this.options.panel;

		$container.on('click', self.options.handler, function (e) {
			var $currentHandler = self.options.handlerWrap ? $(this).closest(self.options.handlerWrap) : $(this);
			var $currentItem = $currentHandler.closest($item);

			if ($currentItem.has($(panel)).length) {
				e.preventDefault();

				if ($currentHandler.next(panel).is(':visible')) {
					self.closePanel($currentItem);

					return;
				}

				if (self.options.collapsibleAll) {
					self.closePanel($($container).not($currentHandler.closest($container)).find($item));
				}

				if (self.options.collapsible) {
					self.closePanel($currentItem.siblings());
				}

				self.openPanel($currentItem, $currentHandler);
			}
		})
	};

	MultiAccordion.prototype.closePanel = function ($currentItem) {
		var self = this;
		var panel = self.options.panel;
		var openClass = self.modifiers.active;

		$currentItem.removeClass(openClass).find(panel).filter(':visible').slideUp(self._animateSpeed, function () {
			self.$container.trigger('mAccordionAfterClose').trigger('mAccordionAfterChange');
		});

		$currentItem
			.find(self.$item)
			.removeClass(openClass);
	};

	MultiAccordion.prototype.openPanel = function ($currentItem, $currentHandler) {
		var self = this;
		var panel = self.options.panel;

		$currentItem.addClass(self.modifiers.active);

		$currentHandler.next(panel).slideDown(self._animateSpeed, function () {
			self.$container.trigger('mAccordionAfterOpened').trigger('mAccordionAfterChange');
		});
	};

	window.MultiAccordion = MultiAccordion;
}(jQuery));

/**
 * !Navigation accordion initial
 * */
function navAccordionInit() {

	var navMenu = '.nav__list-js';

	if ($(navMenu).length) {
		new MultiAccordion({
			container: navMenu,
			item: 'li',
			handler: '.nav-handler-js',
			handlerWrap: '.nav__tab-js',
			panel: '.nav__drop-js',
			openClass: 'is-open',
			animateSpeed: 200,
			collapsible: true
		});
	}
}


/**
 * !Equal height of blocks by maximum height of them
 */
function equalHeight() {
	// equal height
	var $equalHeight = $('.equal-height-js');

	if($equalHeight.length) {
		$equalHeight.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}
}

/**
 * Shutters
 * */
(function($){
	'use strict';

	var $doc = $(document),
		$html = $('html'),
		$body = $('body'),
		countFixedScroll = 0;

	var TClass = function(element, config){
		var self,
			$element = $(element),
			dataStopRemove = '[data-tc-stop]',
			classIsAdded = false;

		var callbacks = function() {
				/** track events */
				$.each(config, function (key, value) {
					if(typeof value === 'function') {
						$element.on('tClass.' + key, function (e, param) {
							return value(e, $element, param);
						});
					}
				});
			},
			add = function () {
				if (classIsAdded) return;

				// callback before added class
				$element.trigger('tClass.beforeAdded');

				var arr = [
					$element,
					$(config.switchBtn),
					config.toggleClassTo
				];

				$.each(arr, function () {
					var curElem = this;
					// если массив, то устанавливаем класс на каждый из элемент этого массива
					if ($.isArray(curElem)) {
						$.each(curElem, function () {
							var $curElem = $(this);
							if ($curElem.length) {
								$curElem.addClass(config.modifiers.currentClass);

								$element.trigger('tClass.afterEachAdded', $curElem);
							} else {
								// В консоль вывести предуприждение,
								// если указанного элемента не существует.
								console.warn('Element "' + this + '" does not exist!')
							}
						});
					} else {
						$(this).addClass(config.modifiers.currentClass);

						$element.trigger('tClass.afterEachAdded', $(this));
					}
				});

				if (config.cssScrollFixed) {
					countFixedScroll = ++countFixedScroll;
				}

				classIsAdded = true;

				toggleScroll();

				// callback after added class
				$element.trigger('tClass.afterAdded');
			},
			remove = function () {
				if (!classIsAdded) return;

				// callback beforeRemoved
				$element.trigger('tClass.beforeRemoved');

				var arr = [
					$element,
					$(config.switchBtn),
					config.toggleClassTo
				];

				$.each(arr, function () {
					var curElem = this;
					// если массив, то удаляем класс с каждого элемент этого массива
					if ($.isArray(curElem)) {
						$.each(curElem, function () {
							var $curElem = $(this);
							if ($curElem.length) {
								$curElem.removeClass(config.modifiers.currentClass);

								$element.trigger('tClass.afterEachRemoved', $curElem);
							} else {
								// В консоль вывести предуприждение,
								// если указанного элемента не существует.
								console.warn('Element "' + this + '" does not exist!')
							}
						});
					} else {
						$(this).removeClass(config.modifiers.currentClass);

						$element.trigger('tClass.afterEachRemoved', $(this));
					}
				});

				classIsAdded = false;

				if (config.cssScrollFixed) {
					countFixedScroll = --countFixedScroll;
				}
				toggleScroll();

				// callback afterRemoved
				$element.trigger('tClass.afterRemoved');
			},
			events = function () {
				$element.on('click', function (event) {
					if (classIsAdded) {
						remove();

						event.preventDefault();
						return false;
					}

					add();

					event.preventDefault();
					event.stopPropagation();
				});

				if (config.switchBtn) {
					$html.on('click', config.switchBtn, function (event) {
						var $this = $(this);

						event.preventDefault();

						if ($this.attr('data-tc-only-add') !== undefined) {
							add();

							return false;
						}

						if ($this.attr('data-tc-only-remove') !== undefined) {
							remove();

							return false;
						}

						if (classIsAdded) {
							remove();

							return false;
						}

						add();

						event.stopPropagation();
					})
				}
			},
			toggleScroll = function () {
				if (config.cssScrollFixed) {
					var mod = (config.cssScrollFixed === true) ? 'css-scroll-fixed' : config.cssScrollFixed;
					if (!countFixedScroll) {
						// Удаляем с тега html
						// класс блокирования прокрутки
						$body.removeClass(mod);
					} else {
						// Добавляем на тег html
						// класс блокирования прокрутки.
						$body.addClass(mod);
					}
				}
			},
			closeByClickOutside = function () {
				$doc.on('click', function(event){
					if(classIsAdded && config.removeOutsideClick && !$(event.target).closest(dataStopRemove).length) {
						remove();
						// event.stopPropagation();
					}
				});
			},
			closeByClickEsc = function () {
				$doc.keyup(function(event) {
					if (classIsAdded && event.keyCode === 27) {
						remove();
					}
				});
			},
			init = function () {
				$element.addClass(config.modifiers.init);
				$element.trigger('tClass.afterInit');
			};

		self = {
			callbacks: callbacks,
			remove: remove,
			events: events,
			closeByClickOutside: closeByClickOutside,
			closeByClickEsc: closeByClickEsc,
			init: init
		};

		return self;
	};

	// $.fn.tClass = function (options, params) {
	$.fn.tClass = function () {
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++) {
			if (typeof opt === 'object' || typeof opt === 'undefined') {
				_[i].tClass = new TClass(_[i], $.extend(true, {}, $.fn.tClass.defaultOptions, opt));
				_[i].tClass.callbacks();
				_[i].tClass.events();
				_[i].tClass.closeByClickOutside();
				_[i].tClass.closeByClickEsc();
				_[i].tClass.init();
			}
			else {
				ret = _[i].tClass[opt].apply(_[i].tClass, args);
			}
			if (typeof ret !== 'undefined') {
				return ret;
			}
		}
		return _;
	};

	$.fn.tClass.defaultOptions = {
		switchBtn: null,
		toggleClassTo: null,
		removeOutsideClick: true,
		cssScrollFixed: false,
		modifiers: {
			init: 'tc--initialized',
			currentClass: 'tc--active'
		}
	};

})(jQuery);

function toggleShutters() {
	var $nav = $('.nav-opener-js'),
		nav,
		$filters = $('.filters-opener-js'),
		filters,
		$search = $('.search-opener-js'),
		search,
		searchForm = '.search-form-js';

	if ($nav.length) {
		nav = $nav.tClass({
			toggleClassTo: ['html', '.nav-overlay-js', '.shutter--nav-js']
			, modifiers: {
				currentClass: 'nav-is-open open-only-mob'
				// open-only-mob - используется для адаптива
			}
			, cssScrollFixed: true
			, removeOutsideClick: true
			, beforeAdded: function () {
				$search.length && search.tClass('remove');
				$filters.length && filters.tClass('remove');
			}
		});
	}

	// filters
	if ($filters.length) {
		filters = $filters.tClass({
			toggleClassTo: ['html', '.filters-overlay-js', '.shutter--filters-js']
			, switchBtn: '.filter-closer-js'
			, modifiers: {
				currentClass: 'filters-is-open open-only-mob'
			}
			, cssScrollFixed: true
			, removeOutsideClick: true
			, beforeAdded: function () {
				$search.length && search.tClass('remove');
				$nav.length && nav.tClass('remove');
			}
		});
	}

	if ($search.length) {
		search = $search.tClass({
			toggleClassTo: ['html', searchForm]
			, modifiers: {
				currentClass: 'search-is-open'
			}
			, cssScrollFixed: false
			, removeOutsideClick: true
			, switchBtn: '.search-closer-js'
			, beforeAdded: function () {
				$nav.length && nav.tClass('remove');
				$filters.length && filters.tClass('remove');
			}
			, afterAdded: function () {
				setTimeout(function () {
					$(searchForm).find('input[type=search]').focus();
				}, 100)
			}
			, afterRemoved: function () {
				$(searchForm).find('input[type=search]').blur();
			}
		});
	}
}

/**
 * !Form validation
 * */
function formValidation() {
	$.validator.setDefaults({
		submitHandler: function(form) {
			$(form).addClass('form-success')
		}
	});
/*
	$('.user-form form').validate({
		errorClass: "error",
		validClass: "success",
		errorElement: false,
		errorPlacement: function(error,element) {
			return true;
		},
		highlight: function(element, errorClass, successClass) {
			$(element)
				.removeClass(successClass)
				.addClass(errorClass)
				.closest('form').find('label[for="' + $(element).attr('id') + '"]')
				.removeClass(successClass)
				.addClass(errorClass);
		},
		unhighlight: function(element, errorClass, successClass) {
			$(element)
				.removeClass(errorClass)
				.addClass(successClass)
				.closest('form').find('label[for="' + $(element).attr('id') + '"]')
				.removeClass(errorClass)
				.addClass(successClass);
		}
	});
*/
	$('.subs-form form').validate({
		errorClass: "error",
		validClass: "success",
		errorElement: false,
		errorPlacement: function(error,element) {
			return true;
		},
		highlight: function(element, errorClass, successClass) {
			$(element)
				.removeClass(successClass)
				.addClass(errorClass)
				.closest('.input-holder')
				.removeClass(successClass)
				.addClass(errorClass);
		},
		unhighlight: function(element, errorClass, successClass) {
			$(element)
				.removeClass(errorClass)
				.addClass(successClass)
				.closest('.input-holder')
				.removeClass(errorClass)
				.addClass(successClass);
		}
	});
}

function contactsMapInit (){

	$('.holding').on('click', 'a', function( e ){
		e.preventDefault();

		var _this = $(this);
		var _factory = _this.attr('href').substr(1);

		if ( $('.contact_tab[data-rel="'+_factory+'"]').length ) {

			$('.holding .current').removeClass('current');
			_this.addClass('current');

			$('.contact_tab.current').removeClass('current');
			$('.contact_tab[data-rel="'+_factory+'"]').addClass('current');

			markoPlacemark[ _factory ].balloon.open();

		}

		return false;

	});

}

/**
 * =========== !ready document, load/resize window ===========
 */

$(window).on('load', function () {
	// add functions
});

$(window).on('debouncedresize', function () {
	// $(document.body).trigger("sticky_kit:recalc");
});

$(document).ready(function () {

	initTooltip();
	selectLang();
	placeholderInit();
	printShow();
	inputFocusClass();
	inputHasValueClass();
	slidersInit();
	navAccordionInit();
	initHoverClass();
	equalHeight();
	toggleShutters();
	objectFitImages(); // object-fit-images initial

	StickyTopMenu();

	//formValidation();

	contactsMapInit();

	var $rangeSlider = $(".range-slider-js"),
		$rangeSliderValue = $('.range-slider-value-js'),
		priceSlider = {};

	function priceRange() {
		$.each($rangeSlider, function (i, el) {
			var $curSlider = $(this),
				$curSliderValue = $curSlider.closest('.range-slider').find($rangeSliderValue);
			$curSlider.ionRangeSlider({
				decorate_both: true,
				values_separator: " - ",
				onStart: function (data) {
					getValue(data, $curSliderValue)
				},
				onChange: function (data) {
					getValue(data, $curSliderValue);
				},
				onUpdate: function (data) {
					getValue(data, $curSliderValue);
				},
				onFinish: function (data) {
					/*_filtrate();*/
				}
			});
			priceSlider[i] = $curSlider.data('ionRangeSlider');
		});

		function getValue(data, $elem) {
			var from = data.from,
				to = data.to;
			if (data.input.attr('data-type') === "double") {

				$( 'input[name="' + data.input.attr('name')+'_min"]' ).val( from );
				$( 'input[name="' + data.input.attr('name')+'_max"]' ).val( to );

				$elem.html(from + " - " + to);

			} else {
				$elem.html(from);
			}
		}
		$('.select__clear').on('click', function () {
			var key;
			for (key in priceSlider) {
				priceSlider[key].reset();
			}
		})
	}

	priceRange();



	$('.histCarousel').each(function(){
		var cssSmall = {
			width: 130,
			marginTop: 70,
			opacity: .5
		};
		var cssMedium = {
			width: 220,
			marginTop: 35,
			opacity: .5
		};
		var cssLarge = {
			width: 340,
			marginTop: 0,
			opacity: 1
		};
		var aniConf = {
			queue: false,
			duration: 800
		};
		var _this = $(this);
		$('.carousel', _this)
			.children().css(cssSmall)
			.eq(1).css(cssMedium)
			.next().css(cssLarge).addClass('current')
			.next().css(cssMedium);

		$('.carousel', _this).carouFredSel({
			circular: true,
			infinite: true,
			width: '1100',
			height: 350,
			items: 5,
			auto: false,
			scroll: {
				items: 1,
				duration: aniConf.duration,
				onBefore: function( data ) {
					data.items.new.eq(0).animate(cssSmall, aniConf).removeClass('current');
					data.items.new.eq(1).animate(cssMedium, aniConf).removeClass('current');
					data.items.new.eq(2).animate(cssLarge, aniConf).addClass('current');
					data.items.new.eq(3).animate(cssMedium, aniConf).removeClass('current');
					data.items.new.eq(4).animate(cssSmall, aniConf).removeClass('current');

				}
			},
			prev: $('.prev', _this),
			next: $('.next', _this)

		});


		$('.prev', _this).click(function(){
			var cp = $('.histCarousel .carousel').triggerHandler('currentPosition');
			$('.histLine .event').eq(cp).trigger('click');
		});

		$('.next', _this).click(function(){
			var cp = $('.histCarousel .carousel').triggerHandler('currentPosition');
			$('.histLine .event').eq(cp).trigger('click');
		});


		$('.prevPrev', _this).click(function(){
			var cp = $('.histCarousel .carousel').triggerHandler('currentPosition');
			$('.histLine .event').eq(cp-2).trigger('click');
			$('.carousel', _this).trigger("prev", 2);
		});

		$('.nextNext', _this).click(function(){
			var cp = $('.histCarousel .carousel').triggerHandler('currentPosition');
			$('.histLine .event').eq(cp+2).trigger('click');
			$('.carousel', _this).trigger("next", 2);
		});

	});

	$('.histBack').click(function(){
		$('.histLine .event').eq(0).trigger('click');
		return false;
	});
	$('.histLine').each(function(){
		$(this).width($('.event').length*110+230);
		$('.event', this).each(function(j){
			$(this).attr('cntr', j);
			$(this).click(function(){

				w_width = $( window ).width();

				if ( w_width < 1280 ) {
					margin_delta = 0;
				}
				else {
					margin_delta = 470;
				}


				var cntr = parseFloat($(this).attr('cntr'));
				$('.histCarousel .carousel').trigger("slideTo", cntr);
				$('.histLine .event.current').removeClass('current').animate({
					width: 99
				});
				$(this).addClass('current').stop(true, false).animate({
					width: 239
				});
				$('.histLine').stop(true, false).animate({
					marginLeft: -cntr*100-margin_delta
				})

				if (cntr == 0){
					$('.histBack.visible').removeClass('visible');
				} else {
					$('.histBack:not(".visible")').addClass('visible');
				}

				return false;
			});
		});
		$('.histLine .event').eq(0).trigger('click');

	});

	window.onscroll = function (e) {

		StickyTopMenu();

	}

	$( "#sticky_search" ).on("focus", "input", function() {
		$( "#sticky_search").addClass('focus');
	});
	$( "#sticky_search" ).on("focusout", "input", function() {
		$( "#sticky_search").removeClass('focus');
	});

});


function StickyTopMenu() {

	let windowWidth = window.outerWidth;

	if (windowWidth > 1279) {

		headerHeight      = $('.header')[0]?.offsetHeight;
		scrollTop = hasOffset ? window.pageYOffset : docBody.scrollTop;

		if (scrollTop >= headerHeight) {

			if ( !$( "#sticky_search .search-form" ).length ) {
				$( "#sticky_search" ).append( $( "form.search-form" ).clone() );
			}

			header_menu.addClass( 'sticky' );
		} else {
			header_menu.removeClass( 'sticky' );
			$( "#sticky_search" ).empty();
		}

	}
	else {
		header_menu.removeClass( 'sticky' );
		$( "#sticky_search" ).empty();
	}

}
