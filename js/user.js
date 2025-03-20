
var shopLKFilterURL = null;
var lkShopEditID = null;
var lkShopIsArchive;

var timeIntervals = {};
var modalTimeIntervals = {};


function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime, isModal = false) {
    var clock = document.getElementById(id);
    //var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    function updateClock() {
        var t = getTimeRemaining(endtime);
        //daysSpan.innerHTML = t.days;
        hours = t.hours + t.days*24;
        if( hours < 10 ){   hours = '0'+hours;   }
        hoursSpan.innerHTML = hours;
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);

    $(clock).show();

    if( isModal ){
        modalTimeIntervals[ timeinterval ] = timeinterval;
    } else {
        timeIntervals[ timeinterval ] = timeinterval;
    }
}


function startBookingEventStream( shop_xml_id, last_viewed_time ){
    if (typeof (EventSource) !== 'undefined') {
        var url = '/ajax/shop_new_bookings.php?shop_xml_id='+shop_xml_id+'&last_viewed_time='+last_viewed_time;
        bookingEvent = new EventSource(url);
        bookingEvent.onopen = function (event){};
        bookingEvent.onerror = function (event){};
        bookingEvent.onmessage = function(event){};
        bookingEvent.addEventListener('new_bookings', function (event) {
            if( event.data == 'Y' ){

                // Проигрывание звука
                if( $('#soundcard').length > 0 ){   $('#soundcard').remove();   }
                $('body').append('<audio style="display:none;" id="soundcard" src="/local/templates/.default/sounds/new_bookings_alert.mp3"></audio>');
                document.getElementById("soundcard").play();

                // Открытие окна уведомления
                $.noty.closeAll();
                var n = noty({
                    text        : 'Появились новые брони!',
                    type        : 'error',
                    dismissQueue: true,
                    layout      : 'center',
                    theme       : 'defaultTheme',
                    buttons     : [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Обновить',
                            onClick: function ($noty) {
                                $.noty.closeAll();
                                shopBookingsLoad();
                            }
                        }, {
                            addClass: 'btn',
                            text: 'Закрыть',
                            onClick: function ($noty){
                                $.noty.closeAll();
                            }
                        }
                    ]
                });
            }
        });
    }
}



function shopBookingsLoad( params ){

    if( !params ){   var params = {};   }

    params['is_ajax'] = 'Y';

    for( k in timeIntervals ){  clearInterval( timeIntervals[k] );  }

    if( shopLKFilterURL ){
        var url = shopLKFilterURL;
    } else {
        var url = document.URL;
    }

    params['status'] = shopLKstatus;
    params['count'] = shopLKcount;
    params['sort'] = shopLKsort;
    params['page'] = shopLKpage;
    params['is_archive'] = lkShopIsArchive;

    process(true);
    $('.shopBookingsForm select').prop('disabled', true);
    $.post("/ajax/shopBookingsLoad.php", params, function(data){
        if( data.status == 'ok' ){

            var html = data.html;

            $('.shopBookingsBlock').replaceWith( html );

            ////////////////////////
            var title = shopLKtitle;
            var new_url = rawurldecode( url );
            // if( catalog_page_number > 1 ){
            //     new_url = addToRequestURI( new_url, 'PAGEN_1', catalog_page_number );
            //     title += ' - страница ' + catalog_page_number;
            // } else {
            //     new_url = removeFromRequestURI( new_url, 'PAGEN_1' );
            // }
            $('title').html(title);

            if( shopLKstatus == 'empty' ){
                new_url = removeFromRequestURI( new_url, 'status' );
            } else {
                new_url = addToRequestURI( new_url, 'status', shopLKstatus );
            }
            new_url = addToRequestURI( new_url, 'count', shopLKcount );
            new_url = addToRequestURI( new_url, 'sort', shopLKsort );
            if( shopLKpage == 1 ){
                new_url = removeFromRequestURI( new_url, 'page' );
            } else if( shopLKpage > 1 ){
                new_url = addToRequestURI( new_url, 'page', shopLKpage );
            }
            history.replaceState({}, null, new_url);

            shopLKFilterURL = document.URL;

        } else if (data.status == 'auth_error'){

            window.location.href = '/personal_shop/';

        } else if (data.status == 'error'){

            show_message(data.text, 'warning')
        }
    }, 'json')
    .fail(function(data, status, xhr){
        show_message('Ошибка запроса', 'warning');
    })
    .always(function(data, status, xhr){
        process(false);
        $('.shopBookingsForm select').prop('disabled', false);
    })
}


function shopBookingsMonitoringLoad( params ){

    if( !params ){   var params = {};   }

    params['is_ajax'] = 'Y';

    for( k in timeIntervals ){  clearInterval( timeIntervals[k] );  }

    if( shopLKFilterURL ){
        var url = shopLKFilterURL;
    } else {
        var url = document.URL;
    }

    params['status'] = shopLKstatus;
    params['count'] = shopLKcount;
    params['sort'] = shopLKsort;
    params['page'] = shopLKpage;
    params['is_archive'] = lkShopIsArchive;

    process(true);
    $('.shopBookingsForm select').prop('disabled', true);
    $.post("/ajax/shopBookingsMonitoringLoad.php", params, function(data){
        if( data.status == 'ok' ){

            var html = data.html;

            $('.shopsMonitoringBookingsBlock').replaceWith( html );

            ////////////////////////
            var title = shopLKtitle;
            var new_url = rawurldecode( url );
            // if( catalog_page_number > 1 ){
            //     new_url = addToRequestURI( new_url, 'PAGEN_1', catalog_page_number );
            //     title += ' - страница ' + catalog_page_number;
            // } else {
            //     new_url = removeFromRequestURI( new_url, 'PAGEN_1' );
            // }
            $('title').html(title);

            if( shopLKstatus == 'empty' ){
                new_url = removeFromRequestURI( new_url, 'status' );
            } else {
                new_url = addToRequestURI( new_url, 'status', shopLKstatus );
            }
            new_url = addToRequestURI( new_url, 'count', shopLKcount );
            new_url = addToRequestURI( new_url, 'sort', shopLKsort );
            if( shopLKpage == 1 ){
                new_url = removeFromRequestURI( new_url, 'page' );
            } else if( shopLKpage > 1 ){
                new_url = addToRequestURI( new_url, 'page', shopLKpage );
            }
            history.replaceState({}, null, new_url);

            shopLKFilterURL = document.URL;

        } else if (data.status == 'auth_error'){

            window.location.href = '/shops_monitoring/';

        } else if (data.status == 'error'){

            show_message(data.text, 'warning')
        }
    }, 'json')
    .fail(function(data, status, xhr){
        show_message('Ошибка запроса', 'warning');
    })
    .always(function(data, status, xhr){
        process(false);
        $('.shopBookingsForm select').prop('disabled', false);
    })
}



function openBookingEditModal( booking_id ){
    var postParams = {
        item_id: booking_id
    };
    process(true);
    $('.shopBookingsForm select').prop('disabled', true);
    $.post("/ajax/lkShopOpenEditModal.php", postParams, function(data){
        if (data.status == 'ok'){
            $('#mainPopup #modelReservation').html( data.html );
            if( $('#mainPopup:visible').length == 0 ){
                var $popup = $('#mainPopup');
                $popup.fadeIn(200);
            }
        } else if (data.status == 'error'){
            show_message( data.text );
        }
    }, 'json')
        .fail(function(data, status, xhr){
            show_message( 'Ошибка запроса' );
        })
        .always(function(data, status, xhr){
            process(false);
            $('.shopBookingsForm select').prop('disabled', false);
        })
}

function openBookingMonitoringModal( booking_id ){
    var postParams = {
        item_id: booking_id
    };
    process(true);
    $('.shopBookingsForm select').prop('disabled', true);
    $.post("/ajax/openBookingMonitoringModal.php", postParams, function(data){
        if (data.status == 'ok'){
            $('#mainPopup #modelReservation').html( data.html );
            if( $('#mainPopup:visible').length == 0 ){
                var $popup = $('#mainPopup');
                $popup.fadeIn(200);
            }
        } else if (data.status == 'error'){
            show_message( data.text );
        }
    }, 'json')
    .fail(function(data, status, xhr){
        show_message( 'Ошибка запроса' );
    })
    .always(function(data, status, xhr){
        process(false);
        $('.shopBookingsForm select').prop('disabled', false);
    })
}



function registerSend(){

    process(true);

    var form_data = $('.registerForm').serialize();

    $.post("/ajax/register.php", { form_data:form_data }, function(data){

        if( window.smartCaptcha != undefined ){
            window.smartCaptcha.reset();
        }

        if( data.status == 'ok' ){

            // $('.registerForm').find("input[type=text], input[type=tel], input[type=email], input[type=password], textarea").html("");
            // $('.registerForm').find("input[type=checkbox]").prop("checked", false);
            // $('.registerForm').find("input[type=radio]").prop("checked", false);

            // $('.registerForm').replaceWith('<p>Регистрация на marko.by успешно завершена!</p><p>Теперь вы можете перейти в <a href="/personal/">Личный кабинет</a></p>');

            var openedNoAuthBookingPopup = $.cookie('BITRIX_SM_openedNoAuthBookingPopup');
            var lastBookingURL = $.cookie('BITRIX_SM_lastBookingURL');
            if(
                openedNoAuthBookingPopup != undefined
                &&
                lastBookingURL != undefined
            ){
                window.location.href = lastBookingURL;
            } else {
                window.location.href = "/personal/";
            }

        } else if( data.status == 'error' ){
            errors = [{ 'link': null, 'text': data.text }];
            show_error( $('.registerForm'), errors );
        }
    }, 'json')
        .fail(function(data, status, xhr){
            var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
        })
        .always(function(data, status, xhr){
            process(false);
        })
}



function registerSendSmsCode(){

    process(true);

    var form_data = $('.registerForm').serialize();

    $.post("/ajax/registerSendConfirmCode.php", { form_data:form_data }, function(data){

        if( window.smartCaptcha != undefined ){
            window.smartCaptcha.reset();
        }

        if( data.status == 'ok' ){

            var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'success', text: 'Код&nbsp;подтверждения&nbsp;отправлен на&nbsp;указанный&nbsp;номер'});

            $('.smc_code_block').show();

            $('.registerForm').find("input[name=sms_code]").val('');
            $('.registerForm').find("input[name=sms_code]").focus();

        } else if( data.status == 'already_registered' ){

            $('#mainPopup #modelReservation').html( data.html );
            $(".phone___mask").mask("+7 (999) 999-99-99");

            if( $('#mainPopup:visible').length == 0 ){
                var $popup = $('#mainPopup');
                $popup.fadeIn(200);
            }

        } else if( data.status == 'error' ){

            var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: data.text});
        }
    }, 'json')
        .fail(function(data, status, xhr){
            var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
        })
        .always(function(data, status, xhr){
            process(false);
        })

}



function passwordRecoveryRequest(){

    process(true);

    var this_form = $('.passwordRecoveryRequestForm');

    var form_data = $(this_form).serialize();

    var errors = [];

    $.post("/ajax/passwordRecoveryRequest.php", { form_data:form_data }, function(data){
        if( data.status == 'ok' ){
            $('.recoveryArea').html( data.html );
        } else if( data.status == 'error' ){
            errors.push({ 'link': null, 'text': data.text });
            show_error( $(this_form), errors );
        }
    }, 'json')
        .fail(function(data, status, xhr){
            var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
        })
        .always(function(data, status, xhr){
            process(false);
        })

}



$(document).ready(function(){


    $(".phone___mask").mask("+7 (999) 999-99-99");



    // Редактирование брони - попап редактирования брони - ЛК магазина
    $(document).on('click', '.lkShopEditBookingSaveButton', function(e){
        $.noty.closeAll();
        var button = $(this);
        if( !is_process(button) ){

            // Форма
            var this_form = $(button).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var new_status = $(this_form).find("select[name=new_status]").val();
            var fio = $(this_form).find("input[name=fio]").val();
            var errors = [];
            // Проверки
            if ( new_status == 'empty' ){
                errors.push({
                    'link': $(this_form).find("select[name=new_status]"),
                    'text': 'Укажите, пожалуйста, новый статус брони!'
                });
            } else if(
                $(this_form).find("input.refuse_reasons:visible").length > 0
                &&
                $(this_form).find("input.refuse_reasons:checked").length == 0
            ){
                errors.push({
                    'link': null,
                    'text': 'Укажите минимум 1 причину отказа покупателя от брони'
                });
            } else if( fio.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=fio]"),
                    'text': 'Введите, пожалуйста, ваше ФИО!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){

                var postParams = {
                    item_id: lkShopEditID,
                    saveStatus: 'Y',
                    form_data: $(button).parents('form').serialize(),
                };
                process(true);
                $('.shopBookingsForm select').prop('disabled', true);
                $.post("/ajax/lkShopOpenEditModal.php", postParams, function(data){
                    if (data.status == 'ok'){
                        shopBookingsLoad();
                        $('#mainPopup #modelReservation').html( data.html );
                        if( $('#mainPopup:visible').length == 0 ){
                            var $popup = $('#mainPopup');
                            $popup.fadeIn(200);
                        }
                    } else if (data.status == 'error'){
                        show_message( data.text );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        show_message( 'Ошибка запроса' );
                    })
                    .always(function(data, status, xhr){
                        process(false);
                        $('.shopBookingsForm select').prop('disabled', false);
                    })

                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });



    // Выбор статуса - попап редактирования брони - ЛК магазина
    $(document).on('change', '.lkShopEditPopupForm select[name=new_status]', function(e){
        var postParams = {
            item_id: lkShopEditID,
            form_data: $(this).parents('form').serialize(),
        };
        process(true);
        $('.shopBookingsForm select').prop('disabled', true);
        $.post("/ajax/lkShopOpenEditModal.php", postParams, function(data){
            if (data.status == 'ok'){
                $('#mainPopup #modelReservation').html( data.html );
                if( $('#mainPopup:visible').length == 0 ){
                    var $popup = $('#mainPopup');
                    $popup.fadeIn(200);
                }
            } else if (data.status == 'error'){
                show_message( data.text );
            }
        }, 'json')
            .fail(function(data, status, xhr){
                show_message( 'Ошибка запроса' );
            })
            .always(function(data, status, xhr){
                process(false);
                $('.shopBookingsForm select').prop('disabled', false);
            })
    })


    // Авторизация в попапе - ЛК магазина
    $(document).on('click', '.shopLkEditPopupAuthButton', function(e){
        e.preventDefault();
        $.noty.closeAll();
        var button = $(this);
        if( !is_process(button) ){
            // Форма
            var this_form = $(button).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var login = $(this_form).find("input[name=login]").val();
            var password = $(this_form).find("input[name=password]").val();
            var errors = [];
            // Проверки
            if ( login.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=login]"),
                    'text': 'Введите, пожалуйста, Ваш логин!'
                });
            } else if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Введите, пожалуйста, Ваш пароль!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                $('.shopBookingsForm select').prop('disabled', true);
                var postParams = {
                    item_id: lkShopEditID,
                    form_data: $(this_form).serialize()
                };
                $.post("/ajax/lkShopEditAuth.php", postParams, function(data){
                    if( data.status == 'ok' ){

                        $('#mainPopup #modelReservation').html( data.html );

                        $('.headerUserBlock').html( $(data.headerUserBlockHtml).html() );

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                    })
                    .always(function(data, status, xhr){
                        process(false);
                        $('.shopBookingsForm select').prop('disabled', false);
                    })
                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });


    // Авторизация в попапе - ЛК мониторинг
    $(document).on('click', '.shopLkMonitoringPopupAuthButton', function(e){
        e.preventDefault();
        $.noty.closeAll();
        var button = $(this);
        if( !is_process(button) ){
            // Форма
            var this_form = $(button).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var login = $(this_form).find("input[name=login]").val();
            var password = $(this_form).find("input[name=password]").val();
            var errors = [];
            // Проверки
            if ( login.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=login]"),
                    'text': 'Введите, пожалуйста, Ваш логин!'
                });
            } else if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Введите, пожалуйста, Ваш пароль!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                $('.shopsMonitoringBookingsForm select').prop('disabled', true);
                var postParams = {
                    item_id: lkShopEditID,
                    form_data: $(this_form).serialize()
                };
                $.post("/ajax/lkBookingMonitoringAuth.php", postParams, function(data){
                    if( data.status == 'ok' ){

                        $('#mainPopup #modelReservation').html( data.html );

                        $('.headerUserBlock').html( $(data.headerUserBlockHtml).html() );

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                .fail(function(data, status, xhr){
                    var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                })
                .always(function(data, status, xhr){
                    process(false);
                    $('.shopBookingsForm select').prop('disabled', false);
                })
            // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });



    // Открытие попапа для обработки брони
    $(document).on('click', '.lkShopEditTr', function(e){
        var button = $(this);
        $.noty.closeAll();
        if(
            !is_process( button )
            &&
            !$(e.target).closest('a').length
        ){
            lkShopEditID = $(button).attr('item_id');
            openBookingEditModal( lkShopEditID );
        }
    })

    // Открытие попапа для просмотра брони (мониторинг)
    $(document).on('click', '.lkMonitoringBookingTr', function(e){
        var button = $(this);
        $.noty.closeAll();
        if(
            !is_process( button )
            &&
            !$(e.target).closest('a').length
        ){
            lkShopEditID = $(button).attr('item_id');
            openBookingMonitoringModal( lkShopEditID );
        }
    })


    // Возврат к попапу обработки
    $(document).on('click', '.backToEditModal', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process( button ) ){
            lkShopEditID = $(button).attr('item_id');
            openBookingEditModal( lkShopEditID );
        }
    })

    // Возврат к попапу мониторинга брони
    $(document).on('click', '.backToMonitoringModal', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process( button ) ){
            lkShopEditID = $(button).attr('item_id');
            openBookingMonitoringModal( lkShopEditID );
        }
    })

    // Открытие попапа истории по брони
    $(document).on('click', '.lkShopOpenBookingHistoryButton', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process( button ) ){
            lkShopEditID = $(this).attr('item_id');
            var postParams = {
                item_id: lkShopEditID
            };
            process(true);
            $('.shopBookingsForm select').prop('disabled', true);
            $.post("/ajax/lkShopBookingHistoryModal.php", postParams, function(data){
                if (data.status == 'ok'){
                    $('#mainPopup #modelReservation').html( data.html );
                    if( $('#mainPopup:visible').length == 0 ){
                        var $popup = $('#mainPopup');
                        $popup.fadeIn(200);
                    }
                } else if (data.status == 'error'){
                    show_message( data.text );
                }
            }, 'json')
                .fail(function(data, status, xhr){
                    show_message( 'Ошибка запроса' );
                })
                .always(function(data, status, xhr){
                    process(false);
                    $('.shopBookingsForm select').prop('disabled', false);
                })
        }
    })

    // Открытие попапа истории по брони
    $(document).on('click', '.lkOpenMonitoringBookingHistoryButton', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process( button ) ){
            lkShopEditID = $(this).attr('item_id');
            var postParams = {
                item_id: lkShopEditID,
                isMonitoring: 'Y',
            };
            process(true);
            $('.shopBookingsForm select').prop('disabled', true);
            $.post("/ajax/lkShopBookingHistoryModal.php", postParams, function(data){
                if (data.status == 'ok'){
                    $('#mainPopup #modelReservation').html( data.html );
                    if( $('#mainPopup:visible').length == 0 ){
                        var $popup = $('#mainPopup');
                        $popup.fadeIn(200);
                    }
                } else if (data.status == 'error'){
                    show_message( data.text );
                }
            }, 'json')
                .fail(function(data, status, xhr){
                    show_message( 'Ошибка запроса' );
                })
                .always(function(data, status, xhr){
                    process(false);
                    $('.shopBookingsForm select').prop('disabled', false);
                })
        }
    })


    // Обновление данных - Список броней - ЛК магазина
    $(document).on('click', '.shopBookingsRenewButton', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process( button ) ){
            shopLKpage = 1;
            shopBookingsLoad();
        }
    })
    // Смена фильтра по статусу - Список броней - ЛК магазина
    $(document).on('change', '.shopBookingsForm select[name=status]', function(e){
        $.noty.closeAll();
        shopLKstatus = $(this).val();
        shopLKpage = 1;
        shopBookingsLoad();
    })
    // Смена сортировки - Список броней - ЛК магазина
    $(document).on('change', '.shopBookingsForm select[name=sort]', function(e){
        $.noty.closeAll();
        shopLKsort = $(this).val();
        shopLKpage = 1;
        shopBookingsLoad();
    })
    // Смена количества на странице - Список броней - ЛК магазина
    $(document).on('change', '.shopBookingsForm select[name=count]', function(e){
        $.noty.closeAll();
        shopLKcount = $(this).val();
        shopLKpage = 1;
        shopBookingsLoad();
    })
    // Смена страницы в пагинации - Список броней - ЛК магазина
    $(document).on('click', '.lkShopPaginationBlock a', function(e){
        e.preventDefault();
        var link = $(this);
        if(
            !is_process(link)
            &&
            !$(link).hasClass('current')
            &&
            $(link)[0].hasAttribute('data-pagenumber')
        ){
            shopLKpage = $(link).data('pagenumber');
            shopBookingsLoad();
        }
    });



    // Обновление данных - Список броней - ЛК мониторинг
    $(document).on('click', '.shopBookingsMonitoringRenewButton', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process( button ) ){
            shopLKpage = 1;
            shopBookingsMonitoringLoad();
        }
    })
    // Смена фильтра по статусу - Список броней - ЛК мониторинг
    $(document).on('change', '.shopsMonitoringBookingsForm select[name=status]', function(e){
        $.noty.closeAll();
        shopLKstatus = $(this).val();
        shopLKpage = 1;
        shopBookingsMonitoringLoad();
    })
    // Смена сортировки - Список броней - ЛК мониторинг
    $(document).on('change', '.shopsMonitoringBookingsForm select[name=sort]', function(e){
        $.noty.closeAll();
        shopLKsort = $(this).val();
        shopLKpage = 1;
        shopBookingsMonitoringLoad();
    })
    // Смена количества на странице - Список броней - ЛК мониторинг
    $(document).on('change', '.shopsMonitoringBookingsForm select[name=count]', function(e){
        $.noty.closeAll();
        shopLKcount = $(this).val();
        shopLKpage = 1;
        shopBookingsMonitoringLoad();
    })
    // Смена страницы в пагинации - Список броней - ЛК мониторинг
    $(document).on('click', '.lkShopsMonitoringPaginationBlock a', function(e){
        e.preventDefault();
        var link = $(this);
        if(
            !is_process(link)
            &&
            !$(link).hasClass('current')
            &&
            $(link)[0].hasAttribute('data-pagenumber')
        ){
            shopLKpage = $(link).data('pagenumber');
            shopBookingsMonitoringLoad();
        }
    });




    // Отмена брони в ЛК покупателя
    $(document).on('click', '.bookingCancelButton', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process(button) ){

            var booking_id = $(button).attr('item_id');
            var number = $(button).attr('number');

            var n = noty({
                text        : 'Отменить бронь № '+number+' ?',
                type        : 'alert',
                dismissQueue: true,
                layout      : 'center',
                theme       : 'defaultTheme',
                buttons     : [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Да',
                        onClick: function ( $noty ){

                            $noty.close();

                            process(true);
                            var postParams = {
                                booking_id: booking_id
                            };
                            process(true);
                            $.post("/ajax/clientCancelBooking.php", postParams, function(data){
                                if (data.status == 'ok'){
                                    window.location.href = "/personal/";
                                } else if (data.status == 'error'){
                                    show_message( data.text );
                                }
                            }, 'json')
                                .fail(function(data, status, xhr){
                                    show_message( 'Ошибка запроса' );
                                })
                                .always(function(data, status, xhr){
                                    process(false);
                                })

                        }
                    }, {
                        addClass: 'btn btn-danger',
                        text: 'Нет',
                        onClick: function ( $noty ){
                            $noty.close();
                        }
                    }
                ]
            });
        }
    });



    // Добавление дисконтной карты в ЛК
    $(document).on('click', '.personalAddLoyaltyCardButton', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process(button) ){
            // Форма
            var this_form = $(button).parents('form');
            // Подготовка
            $(this_form).find("input[type=text]").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var loyalty_card = $(this_form).find("input[name=loyalty_card]").val();
            var errors = [];
            // Проверки
            if ( loyalty_card.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=loyalty_card]"),
                    'text': 'Введите, пожалуйста, номер<br>Вашей дисконтной карты!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){

                process(true);

                var postParams = {
                    form_data: $(this_form).serialize()
                };

                $.post("/ajax/personalAddLoyaltyCard.php", postParams, function(data){
                    if( data.status == 'ok' ){

                        $('.personalLoyaltyCardForm').replaceWith(data.html);

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors, true );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                    })
                    .always(function(data, status, xhr){
                        process(false);
                    })
                // Ошибка
            } else {
                show_error( this_form, errors, true );
            }
        }
    });



    // Удаление дисконтной карты
    $(document).on('click', '.personalDeleteLoyaltyCard', function(e){
        var button = $(this);
        $.noty.closeAll();
        if( !is_process(button) ){

            var n = noty({
                text        : 'Удалить дисконтную карту?',
                type        : 'alert',
                dismissQueue: true,
                layout      : 'center',
                theme       : 'defaultTheme',
                buttons     : [
                    {
                        addClass: 'btn btn-primary', text: 'Да', onClick: function ($noty) {

                            $noty.close();

                            process(true);
                            $.post("/ajax/personalDeleteLoyaltyCard.php", {}, function(data){
                                if( data.status == 'ok' ){

                                    $('.personalLoyaltyCardForm').replaceWith(data.html);

                                    prepare_number_inputs( number_input_class );

                                } else if( data.status == 'error' ){
                                    errors.push({ 'link': null, 'text': data.text });
                                    show_error( this_form, errors );
                                }
                            }, 'json')
                                .fail(function(data, status, xhr){
                                    var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                                })
                                .always(function(data, status, xhr){
                                    process(false);
                                })

                        }
                    }, {
                        addClass: 'btn btn-danger', text: 'Нет', onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]
            });
        }
    })



    // Отправка СМС-кода подтверждения регистрации на телефон
    $(document).on('click', '.registerSendConfirmCode', function(e){
        $.noty.closeAll();
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=tel], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var phone = $(this_form).find("input[name=phone]").val();
            var errors = [];
            // Проверки
            if( phone.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=phone]"),
                    'text': 'Введите, пожалуйста, Ваш номер мобильного!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){

                // Если капча инициализирована
                if( window.smartCaptcha != undefined ){

                    registerSendType = 'sendSmsCode';

                    // Запускаем проверку капчи
                    window.smartCaptcha.execute();

                } else {

                    // иначе сразу просто отправляем запрос
                    registerSendSmsCode();
                }

                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });




    // Авторизация на сайте (клиент)
    $(document).on('click', '.authButtonClient', function(e){
        $.noty.closeAll();
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var login = $(this_form).find("input[name=login]").val();
            var password = $(this_form).find("input[name=password]").val();
            var errors = [];
            // Проверки
            if ( login.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=login]"),
                    'text': 'Введите, пожалуйста, Ваш номер телефона!'
                });
            } else if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Введите, пожалуйста, Ваш пароль!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                var form_data = $(this_form).serialize();
                $.post("/ajax/authClient.php", { form_data:form_data }, function(data){
                    if( data.status == 'ok' ){

                        // var url = document.URL;
                        // var ar = url.split("#");
                        // window.location.href = ar[0];

                        window.location.href = "/personal/";

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                    })
                    .always(function(data, status, xhr){
                        process(false);
                    })
                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });


    // Авторизация на сайте (менеджер)
    $(document).on('click', '.authButtonManager', function(e){
        $.noty.closeAll();
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var login = $(this_form).find("input[name=login]").val();
            var password = $(this_form).find("input[name=password]").val();
            var errors = [];
            // Проверки
            if ( login.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=login]"),
                    'text': 'Введите, пожалуйста, Ваш логин!'
                });
            } else if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Введите, пожалуйста, Ваш пароль!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                var form_data = $(this_form).serialize();
                $.post("/ajax/authManager.php", { form_data:form_data }, function(data){
                    if( data.status == 'ok' ){

                        //var url = document.URL;
                        //var ar = url.split("#");
                        //window.location.href = ar[0];

                        window.location.href = "/personal_shop/";

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                    })
                    .always(function(data, status, xhr){
                        process(false);
                    })
                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });


    // Авторизация на сайте (мониторинг)
    $(document).on('click', '.authButtonShopsMonitoring', function(e){
        $.noty.closeAll();
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var login = $(this_form).find("input[name=login]").val();
            var password = $(this_form).find("input[name=password]").val();
            var errors = [];
            // Проверки
            if ( login.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=login]"),
                    'text': 'Введите, пожалуйста, Ваш логин!'
                });
            } else if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Введите, пожалуйста, Ваш пароль!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                var form_data = $(this_form).serialize();
                $.post("/ajax/authShopsMonitoring.php", { form_data:form_data }, function(data){
                    if( data.status == 'ok' ){

                        //var url = document.URL;
                        //var ar = url.split("#");
                        //window.location.href = ar[0];

                        window.location.href = "/shops_monitoring/";

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                .fail(function(data, status, xhr){
                    var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                })
                .always(function(data, status, xhr){
                    process(false);
                })
            // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });


    // Запрос ссылки на восстановление пароля
    $(document).on('click', '.passwordRecoveryRequestButton', function(e){
        $.noty.closeAll();
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var email = $(this_form).find("input[name=email]").val();
            var errors = [];
            // Проверки
            if( email.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=email]"),
                    'text': 'Введите, пожалуйста, Ваш Email!'
                });
            } else if (email.length > 0 && !(/^.+@.+\..+$/.test(email))){
                errors.push({
                    'link': $(this_form).find("input[name=email]"),
                    'text': 'Email содержит ошибки!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){

                // Если капча инициализирована
                if( window.smartCaptcha != undefined ){

                    // Запускаем проверку капчи
                    window.smartCaptcha.execute();

                } else {

                    // иначе сразу просто отправляем запрос
                    passwordRecoveryRequest();
                }

                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });



    // Установка нового пароля - восстановление
    $(document).on('click', '.passwordRecoverySaveButton', function(e){
        $.noty.closeAll();
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var password = $(this_form).find("input[name=password]").val();
            var password_confirm = $(this_form).find("input[name=password_confirm]").val();
            var errors = [];
            // Проверки
            if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Введите, пожалуйста, новый пароль!'
                });
            } else if( password.length < 6 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Длина пароля - не менее '+minPassLength
                });
            } else if( password_confirm.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password_confirm]"),
                    'text': 'Введите, пожалуйста, пароль повторно!'
                });
            } else if( password != password_confirm ){
                errors.push({
                    'link': $(this_form).find("input[name=password_confirm]"),
                    'text': 'Пароли не совпадают!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                var form_data = $(this_form).serialize();
                $.post("/ajax/passwordRecoverySave.php", { form_data:form_data }, function(data){
                    if( data.status == 'ok' ){
                        history.replaceState({}, null, '/auth/password_recovery/');
                        $('.recoveryArea').html( data.html );
                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                    })
                    .always(function(data, status, xhr){
                        process(false);
                    })
                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });



    // Регистрация
    $(document).on('click', '.registerButton', function(e){
        $.noty.closeAll();
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=tel], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var first_name = $(this_form).find("input[name=first_name]").val();
            var last_name = $(this_form).find("input[name=last_name]").val();
            var phone = $(this_form).find("input[name=phone]").val();
            var email = $(this_form).find("input[name=email]").val();
            var sms_code = $(this_form).find("input[name=sms_code]").val();
            var password = $(this_form).find("input[name=password]").val();
            var password_confirm = $(this_form).find("input[name=password_confirm]").val();
            var yandexToken = $("input[name=smart-token]").val();
            var news_subscr_accept = $(this_form).find("input[name=news_subscr_accept]:checked").val();
            var agreements_accept = $(this_form).find("input[name=agreements_accept]:checked").length>0;
            var errors = [];
            // Проверки
            if ( first_name.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=first_name]"),
                    'text': 'Введите, пожалуйста, Ваше имя!'
                });
            } else if( last_name.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=last_name]"),
                    'text': 'Введите, пожалуйста, Вашу фамилию!'
                });
            } else if( email.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=email]"),
                    'text': 'Введите, пожалуйста, Ваш Email!'
                });
            } else if (email.length > 0 && !(/^.+@.+\..+$/.test(email))){
                errors.push({
                    'link': $(this_form).find("input[name=email]"),
                    'text': 'Email содержит ошибки!'
                });
            } else if( phone.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=phone]"),
                    'text': 'Введите, пожалуйста, Ваш номер мобильного!'
                });
            } else if( sms_code.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=sms_code]"),
                    'text': 'Введите, пожалуйста, код подтверждения из СМС!'
                });
            } else if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Придумайте, пожалуйста, пароль!'
                });
            } else if( password.length < 6 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Длина пароля - не менее '+minPassLength
                });
            } else if( password_confirm.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password_confirm]"),
                    'text': 'Введите, пожалуйста, пароль повторно!'
                });
            } else if( password != password_confirm ){
                errors.push({
                    'link': $(this_form).find("input[name=password_confirm]"),
                    'text': 'Пароли не совпадают!'
                });
            } else if( !agreements_accept ){
                errors.push({
                    'link': null,
                    'text': 'Отметьте, пожалуйста, согласие с политикой обработки персональных данных'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){

                // Если капча инициализирована
                if( window.smartCaptcha != undefined ){

                    registerSendType = 'register';

                    // Запускаем проверку капчи
                    window.smartCaptcha.execute();

                } else {

                    // иначе сразу просто отправляем запрос
                    registerSend();
                }

                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });




    // Сохранение личных данных в ЛК
    $(document).on('click', '.personalDataSaveButton', function(e){
        $.noty.closeAll();
        var button = $(this);
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=tel], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var first_name = $(this_form).find("input[name=first_name]").val();
            var last_name = $(this_form).find("input[name=last_name]").val();
            //var phone = $(this_form).find("input[name=phone]").val();
            var email = $(this_form).find("input[name=email]").val();
            var errors = [];
            // Проверки
            if ( first_name.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=first_name]"),
                    'text': 'Введите, пожалуйста, Ваше имя!'
                });
            } else if( last_name.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=last_name]"),
                    'text': 'Введите, пожалуйста, Вашу фамилию!'
                });
            } else if( email.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=email]"),
                    'text': 'Введите, пожалуйста, Ваш Email!'
                });
            } else if (email.length > 0 && !(/^.+@.+\..+$/.test(email))){
                errors.push({
                    'link': $(this_form).find("input[name=email]"),
                    'text': 'Email содержит ошибки!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                var form_data = $(this_form).serialize();
                $.post("/ajax/editPersonalData.php", { form_data:form_data }, function(data){
                    if( data.status == 'ok' ){

                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'success', text: 'Успешное сохранение...'});

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                    })
                    .always(function(data, status, xhr){
                        process(false);
                    })
                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    })





    // Установка нового пароля
    $(document).on('click', '.newPasswordButton', function(e){
        $.noty.closeAll();
        var button = $(this);
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=tel], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var old_password = $(this_form).find("input[name=old_password]").val();
            var password = $(this_form).find("input[name=password]").val();
            var confirm_password = $(this_form).find("input[name=confirm_password]").val();
            var errors = [];
            // Проверки
            if ( old_password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=old_password]"),
                    'text': 'Введите, пожалуйста, текущий пароль!'
                });
            } else if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Введите, пожалуйста, новый пароль!'
                });
            } else if( password.length < minPassLengthNum ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Длина пароля - не менее '+minPassLength
                });
            } else if( confirm_password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=confirm_password]"),
                    'text': 'Введите, пожалуйста, новый пароль повторно!'
                });
            } else if( password != confirm_password ){
                errors.push({
                    'link': $(this_form).find("input[name=confirm_password]"),
                    'text': 'Пароли не совпадают!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                var form_data = $(this_form).serialize();
                $.post("/ajax/setNewPassword.php", { form_data:form_data }, function(data){
                    if( data.status == 'ok' ){

                        $(this_form).find("input[type=password]").val("");

                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'success', text: 'Успешное сохранение...'});

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                    })
                    .always(function(data, status, xhr){
                        process(false);
                    })
                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    })



    // Авторизация в модальном окне
    $(document).on('click', '.modalAuthButton', function(e){
        e.preventDefault();
        $.noty.closeAll();
        var button = $(this);
        if( !is_process(button) ){
            // Форма
            var this_form = $(button).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var login = $(this_form).find("input[name=login]").val();
            var password = $(this_form).find("input[name=password]").val();
            var errors = [];
            // Проверки
            if ( login.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=login]"),
                    'text': 'Введите, пожалуйста, Ваш номер телефона!'
                });
            } else if( password.length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=password]"),
                    'text': 'Введите, пожалуйста, Ваш пароль!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                var postParams = { form_data: $(this_form).serialize() };
                $.post("/ajax/authClient.php", postParams, function(data){
                    if( data.status == 'ok' ){

                        window.location.href = "/personal/";

                    } else if( data.status == 'error' ){
                        errors.push({ 'link': null, 'text': data.text });
                        show_error( this_form, errors );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Ошибка запроса...'});
                    })
                    .always(function(data, status, xhr){
                        process(false);
                    })
                // Ошибка
            } else {
                show_error( this_form, errors );
            }
        }
    });



})