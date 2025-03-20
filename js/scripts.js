
var maxZoom = 17;
var phone_input_class = 'phone___input';
var number_input_class = 'number___input';
var loyalty_card_input_class = 'loyalty_card___input';



function getPointBodyHtml( arPoint ){
    var bodyHtml = '<div class="ym_balloon_fulladdr">'+arPoint['NAME']+' '+arPoint['PROPERTY_ADDRESS_VALUE'] + '<span>'+arPoint['PROPERTY_CITY_VALUE']+'</span></div>';
    if(
        arPoint['PROPERTY_FULL_NAME_VALUE'] != 'undefined'
        &&
        arPoint['PROPERTY_FULL_NAME_VALUE'] != null
        &&
        arPoint['PROPERTY_FULL_NAME_VALUE'].length > 0
    ){
        bodyHtml += '<div class="ym_balloon_addr">'+arPoint['PROPERTY_FULL_NAME_VALUE']+'</div>';
    }
    if(
        arPoint['PROPERTY_PHONES_VALUE'] != 'undefined'
        &&
        arPoint['PROPERTY_PHONES_VALUE'] != null
        &&
        arPoint['PROPERTY_PHONES_VALUE'].length > 0
    ){
        bodyHtml += '<div class="ym_balloon_phone"><a href="tel:'+arPoint['PROPERTY_PHONES_VALUE']+'">'+arPoint['PROPERTY_PHONES_VALUE']+'</a></div>';
    }
    if(
        arPoint['PROPERTY_WORK_TIME_VALUE'] != 'undefined'
        &&
        arPoint['PROPERTY_WORK_TIME_VALUE'] != null
        &&
        arPoint['PROPERTY_WORK_TIME_VALUE'].length > 0
    ){
        bodyHtml += '<div class="ym_balloon_worktime">'+arPoint['PROPERTY_WORK_TIME_VALUE']+'</div>'
    }
    return bodyHtml;
}


function shopsInitMap(){

    shopsPlacemarks = [];

    shopsMap = new ymaps.Map("shopsMapContainer", {
        center: [ 53.90489237366235, 27.55673674568673 ],
        zoom: 12
    }, {
        maxZoom: maxZoom
    });
    shopsMap.controls.add('zoomControl');
    shopsMap.controls.remove('searchControl');
    shopsMap.behaviors.disable("scrollZoom");
    shopsMap.options.set('maxAnimationZoomDifference', Infinity);

    shopsMapClusterer = new ymaps.Clusterer({
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: true
    });

    shopsMapClusterer.options.set({
        gridSize: 64,
        hasBalloon: false
    });


    shopsMapClusterer.createCluster = function (center, geoObjects) {
        // Создаем метку-кластер с помощью стандартной реализации метода.
        var clusterPlacemark = ymaps.Clusterer.prototype.createCluster.call(this, center, geoObjects);
        var presets = {};
        for (var i = 0, l = geoObjects.length; i < l; i++) {
            var placemarkPreset = geoObjects[i].options.get('colorForCluster');
            presets[placemarkPreset] = presets[placemarkPreset] ? presets[placemarkPreset] + 1 : 1;
        }
        var popularPreset;
        for (var preset in presets) {
            if (!popularPreset || presets[popularPreset] < presets[preset]) {
                popularPreset = preset;
            }
        }
        clusterPlacemark.options.set('preset', popularPreset.replace('Icon', 'ClusterIcons'));
        return clusterPlacemark;
    };


    for( var i = 0, len = shopsArPoints.length; i < len; i++ ){
        var arPoint = shopsArPoints[i];

        var markoIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '$[properties.iconContent]'
        );

        var picture_div = arPoint['PUCTURE_EXISTS']=='Y'?'<div class="ym_balloon_img"><img src="/upload/shops_images/'+arPoint['XML_ID']+'.png" height="200" width="300"></div>':'';

        shopsPlacemarks[ i ] = new ymaps.Placemark(
            [Number(arPoint['PROPERTY_LAT_VALUE']), Number(arPoint['PROPERTY_LNG_VALUE'])],
            {
                balloonContentHeader: picture_div,
                balloonContentBody: getPointBodyHtml( arPoint ),
                balloonContentFooter: '<div class="ym_balloon_route"><a href="https://yandex.by/maps/?rtext=~'+arPoint['PROPERTY_LAT_VALUE']+','+arPoint['PROPERTY_LNG_VALUE']+'&rtt=comparison" target="_blank">Построить маршрут</a></div>',
                clusterCaption: arPoint['PROPERTY_FULL_NAME_VALUE']
            },
            {
                colorForCluster: 'islands#redIcon',
                //preset: 'islands#blueCircleDotIconWithCaption',
                iconColor: '#red',
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/i/map_marker_marko_image.png',
                iconImageSize: [40, 27],
                iconImageOffset: [-13, -27],
                iconContentLayout: markoIconContentLayout,
                balloonMaxWidth: 300,
                balloonMaxHeight: 450
            }
        );
        shopsPlacemarks[ i ].arPoint = arPoint;
    }

    shopsMapClusterer.add(shopsPlacemarks);
    shopsMap.geoObjects.add(shopsMapClusterer);

    shopsMap.setBounds(shopsMapClusterer.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 10
    });
}

function shopsReInitMap(){

    shopsMapClusterer.removeAll();
    shopsMap.geoObjects.removeAll();

    shopsPlacemarks = [];

    for( var i = 0, len = shopsArPoints.length; i < len; i++ ){
        var arPoint = shopsArPoints[i];

        var markoIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '$[properties.iconContent]'
        );

        var picture_div = arPoint['PUCTURE_EXISTS']=='Y'?'<div class="ym_balloon_img"><img src="/upload/shops_images/'+arPoint['XML_ID']+'.png" height="200" width="300"></div>':'';

        shopsPlacemarks[ i ] = new ymaps.Placemark(
            [Number(arPoint['PROPERTY_LAT_VALUE']), Number(arPoint['PROPERTY_LNG_VALUE'])],
            {
                balloonContentHeader: picture_div,
                balloonContentBody: getPointBodyHtml( arPoint ),
                balloonContentFooter: '<div class="ym_balloon_route"><a href="https://yandex.by/maps/?rtext=~'+arPoint['PROPERTY_LAT_VALUE']+','+arPoint['PROPERTY_LNG_VALUE']+'&rtt=comparison" target="_blank">Построить маршрут</a></div>',
                clusterCaption: arPoint['PROPERTY_FULL_NAME_VALUE']
            },
            {
                colorForCluster: 'islands#redIcon',
                //preset: 'islands#blueCircleDotIconWithCaption',
                iconColor: '#red',
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/.default/i/map_marker_marko_image.png',
                iconImageSize: [40, 27],
                iconImageOffset: [-13, -27],
                iconContentLayout: markoIconContentLayout
            }
        );
        shopsPlacemarks[ i ].arPoint = arPoint;
    }

    shopsMapClusterer.add(shopsPlacemarks);
    shopsMap.geoObjects.add(shopsMapClusterer);

    shopsMap.setBounds(shopsMapClusterer.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 10
    });
}


// Получение опросов из куки
function getStopQuizzesInCookies(){
    var stop_quizzes = $.cookie('BITRIX_SM_stop_quizzes');;
    if( stop_quizzes != undefined ){
        stop_quizzes = stop_quizzes.split('|');
    } else {
        stop_quizzes = [];
    }
    return stop_quizzes;
}
// Добавление опроса в куку
function addQuizInStopCookies( ext_id, time ){
    var stop_quizzes = getStopQuizzesInCookies();
    if( !in_array( ext_id, stop_quizzes ) ){     stop_quizzes.push( ext_id );     }
    stop_quizzes = stop_quizzes.join('|');
    $.cookie('BITRIX_SM_stop_quizzes', stop_quizzes, { expires: 30, path: '/' });
    $.cookie('BITRIX_SM_last_quiz_stop_time', time, { expires: 30, path: '/' });
}
// Удаление окна опроса
function removeQuizModal(){
    $('#quiz').remove();
    $('body').removeClass('overflowed');
}
// Закрытие окна опроса
function closeQuizModal(){
    var postParams = {};
    process(true);
    $.post("/ajax/quizStopSession.php", postParams, function(data){
        if (data.status == 'ok'){
            var quiz_ext_id = $('#quiz').attr('item_id');
            var cur_time = $('#quiz').attr('time');
            if(  quiz_ext_id != undefined  &&  quiz_ext_id.length > 0  ){
                addQuizInStopCookies( quiz_ext_id, cur_time );
            }
            removeQuizModal();
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
// Открытие окна опроса
function openQuizModal(
    ext_id,
    is_restart = false,
    activate_quiz = null,
    is_auto_start = false,
    check_result = {}
){
    $.noty.closeAll();
    if(
        ext_id != undefined
        &&
        ext_id != null
    ){
        var postParams = {};
        postParams.is_restart = is_restart;
        postParams.ext_id = ext_id;
        postParams.check_result = check_result;
        if( activate_quiz != null ){    postParams.activate_quiz = activate_quiz;    }
        process(true);
        $.post("/ajax/quizOpenModal.php", postParams, function(data){
            if (data.status == 'ok'){

                if( $('#quiz').length > 0 ){
                    $('#quiz').replaceWith( data.html )
                } else {
                    $('body').append( data.html );
                }
                $('body').addClass('overflowed');

            } else if (data.status == 'error'){
                if( !is_auto_start ){
                    show_message( data.text );
                }
            }
        }, 'json')
            .fail(function(data, status, xhr){
                if( !is_auto_start ){
                    show_message( 'Ошибка запроса' );
                }
            })
            .always(function(data, status, xhr){
                process(false);
            })
    }
}
function quizShowError( text ){
    $('#quiz .quizBlock').addClass( 'show_error' );
    //$('#quiz .quizAlert').show();
    $('#quiz .quizAlert').html( text );
}
function quizHideError(){
    $('#quiz .quizBlock').removeClass( 'show_error' );
    //$('#quiz .quizAlert').hide();
    $('#quiz .quizAlert').html('');
}




// Получение закрытых баннеров из куки
function getClosedBannersInCookies(){
    var items = $.cookie('BITRIX_SM_closed_banners');;
    if( items != undefined ){
        items = items.split('|');
    } else {   items = [];   }
    var closed_banners = [];
    for( key in items ){
        var ar = items[key].split(':');
        closed_banners[ ar[0] ] = ar[1];
    }
    return closed_banners;
}
// Запись факта закрытия баннера в куку
function addBannerToClosedCookies( id, time ){
    var closed_banners = getClosedBannersInCookies();
    closed_banners[id] = time;
    var newBanners = [];
    for( id in closed_banners ){
        var time = closed_banners[id];
        newBanners.push(id+':'+time);
    }
    newBanners = newBanners.join('|');
    $.cookie('BITRIX_SM_closed_banners', newBanners, { expires: 365, path: '/' });
    $.cookie('BITRIX_SM_last_banner_close_time', time, { expires: 30, path: '/' });
}
// Получение кликнутых баннеров из куки
function getClickedBannersInCookies(){
    var items = $.cookie('BITRIX_SM_clicked_banners');;
    if( items != undefined ){
        items = items.split('|');
    } else {   items = [];   }
    var clicked_banners = [];
    for( key in items ){
        var ar = items[key].split(':');
        clicked_banners[ ar[0] ] = ar[1];
    }
    return clicked_banners;
}
// Запись факта клика по баннеру в куку
function addBannerToClickedCookies( id, time ){
    var clicked_banners = getClickedBannersInCookies();
    clicked_banners[id] = time;
    var newBanners = [];
    for( id in clicked_banners ){
        var time = clicked_banners[id];
        newBanners.push(id+':'+time);
    }
    newBanners = newBanners.join('|');
    $.cookie('BITRIX_SM_clicked_banners', newBanners, { expires: 365, path: '/' });
    $.cookie('BITRIX_SM_last_banner_click_time', time, { expires: 30, path: '/' });
}
// Удаление окна баннера
function removeBannerModal(){
    $('#banner').remove();
    $('body').removeClass('overflowed');
}
// Открытие окна баннера
function openBannerModal( id ){
    $.noty.closeAll();
    if(
        id != undefined
        &&
        id != null
        &&
        $('#mainPopup:visible').length == 0
        &&
        $('#quiz:visible').length == 0
        &&
        $('#banner:visible').length == 0
    ){
        var postParams = { id: id };
        process(true);
        $.post("/ajax/bannerOpenModal.php", postParams, function(data){
            if (data.status == 'ok'){

                if( $('#banner').length > 0 ){
                    $('#banner').replaceWith( data.html )
                } else {
                    $('body').append( data.html );
                }
                $('#banner').fadeIn();
                $('body').addClass('overflowed');

            } else if (data.status == 'error'){
                if( !is_auto_start ){
                    show_message( data.text );
                }
            }
        }, 'json')
            .fail(function(data, status, xhr){
                if( !is_auto_start ){
                    show_message( 'Ошибка запроса' );
                }
            })
            .always(function(data, status, xhr){
                process(false);
            })
    }
}
// Закрытие окна баннера крестиком
function closeBannerModal(){
    if( $('#banner:visible').length > 0 ){

        var banner_id = $('#banner').attr('banner_id');
        var cur_time = $('#banner').attr('time');
        var postParams = {
            banner_id: banner_id,
            cur_time: cur_time,
        };

        process(true);
        $.post("/ajax/bannerCloseEvent.php", postParams, function(data){
            if (data.status == 'ok'){
                if( banner_id != undefined ){
                    addBannerToClosedCookies( banner_id, cur_time );
                }
                removeBannerModal();
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
}
// Клик по баннеру
function clickBannerModal(){
    if( $('#banner:visible').length > 0 ){

        var url = $('#banner .bannerLink').attr('href');
        var target = $('#banner .bannerLink').attr('target');

        var banner_id = $('#banner').attr('banner_id');
        var cur_time = $('#banner').attr('time');
        var postParams = { banner_id: banner_id, cur_time: cur_time };

        process(true);
        $.post("/ajax/bannerClickEvent.php", postParams, function(data){
            if ( data.status == 'ok' ){

                if(
                    banner_id != undefined
                    &&
                    cur_time != undefined
                ){
                    addBannerToClickedCookies( banner_id, cur_time );
                }
                removeBannerModal();

                if( target == '_blank' ){
                    window.open( url );
                } else {
                    window.location.href = url;
                }

            } else if ( data.status == 'error' ){
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
}





$(document).ready(function(){

    // Закрытие окна баннера
    $(document).on('click', '#banner .banner_close', function(e){
        var button = $(this);
        if( !is_process( button ) ){
            closeBannerModal();
        }
    })
    // Клик по ссылке баннера
    $(document).on('click', '#banner .bannerLink', function(e){
        e.preventDefault();
        var button = $(this);
        if( !is_process( button ) ){
            clickBannerModal();
        }
    })


    // Закрытие окна опроса
    $(document).on('click', '#quiz .quiz_close', function(e){
        closeQuizModal();
    })

    // Старт опроса
    $(document).on('click', '.quizStartButton', function(e){
        var button = $(this);
        if( !is_process(button) ){

            $('#quiz .error___p').html('');

            if( $('#quiz input#agree:checked').length > 0 ){

                $(button).html('Ожидание...');
                var quiz_ext_id = $(button).attr('quiz_ext_id');
                openQuizModal( quiz_ext_id, false, true );

            } else {

                $('#quiz .error___p').html('Отметьте согласие на обработку персональных данных !');
            }
        }
    })

    // Выбор вариантов ответа
    $(document).on('change', '.quizBlock input[type=checkbox], .quizBlock input[type=radio], .quizBlock select', function(e){
        $('.quizNav .qiuzNavWrapper button.next').removeClass('disabled');
    })
    // Ввод текста ответа
    $(document).on('input', '.quizBlock textarea', function(e){
        var text = $(this).val();
        if( text.length > 0 ){
            $('.quizNav .qiuzNavWrapper button.next').removeClass('disabled');
        } else {
            $('.quizNav .qiuzNavWrapper button.next').addClass('disabled');
        }
    })

    // Отправка ответа на вопрос
    $(document).on('click', '.quizSendAnswerButton', function(e){
        var button = $(this);
        if( !is_process(button) ){

            var quiz_ext_id = $(button).attr('quiz_ext_id');
            var question_ext_id = $(button).attr('question_ext_id');

            // Форма
            var this_form = $(button).parents('form');
            // Подготовка
            $(this_form).find("input[type=text]").removeClass("is___error");
            quizHideError();
            var errors = [];
            var values = {
                'answer_ids': [],
                'answer_text': null
            };

            if( $('#quiz').hasClass('isRadio') ){
                if( $(this_form).find('.quizAnswers input[type=radio]:checked').length == 0 ){
                    errors.push({
                        'link': $(this_form).find(".quizAnswers input[type=radio]"),
                        'text': 'Выберите, пожалуйста, один из вариантов ответа!'
                    });
                } else {
                    values['answer_ids'].push( $(this_form).find('.quizAnswers input[type=radio]:checked').val() );
                }
            } else if( $('#quiz').hasClass('isSelect') ){
                if( $(this_form).find('.quizAnswers select').val() == 'empty' ){
                    errors.push({
                        'link': $(this_form).find('.quizAnswers select'),
                        'text': 'Выберите, пожалуйста, один из вариантов ответа!'
                    });
                } else {
                    values['answer_ids'].push( $(this_form).find('.quizAnswers select').val() );
                }
            } else if( $('#quiz').hasClass('isCheckboxes') ){
                if( $(this_form).find('.quizAnswers input[type=checkbox]:checked').length == 0 ){
                    errors.push({
                        'link': $(this_form).find(".quizAnswers input[type=checkbox]"),
                        'text': 'Выберите, пожалуйста, один или несколько вариантов ответа!'
                    });
                } else {
                    $(this_form).find(".quizAnswers input[type=checkbox]:checked").each(function(){
                        values['answer_ids'].push( $(this).val() );
                    })
                }
            } else if( $('#quiz').hasClass('isTextarea') ){
                if( $(this_form).find('.quizAnswers textarea').val().length == 0 ){
                    errors.push({
                        'link': $(this_form).find('.quizAnswers textarea'),
                        'text': 'Введите, пожалуйста, текст вашего ответа!'
                    });
                } else {
                    values['answer_text'] = $(this_form).find('.quizAnswers textarea').val();
                }
            }

            // Если нет ошибок
            if ( errors.length == 0 ){

                process(true);

                var firstButtonText = $(button).html();
                $(button).html('Ожидание...');

                var postParams = {
                    quiz_ext_id: quiz_ext_id,
                    question_ext_id: question_ext_id,
                    values: values,
                };

                $.post("/ajax/quizSendAnswer.php", postParams, function(data){
                    if( data.status == 'ok' ){

                        openQuizModal(
                            quiz_ext_id,
                            false,
                            null,
                            false,
                            {
                                question_explanation:  data.question_explanation,
                                answer_explanation:  data.answer_explanation,
                                is_correct_answer:  data.is_correct_answer,
                                correct_answer:     data.correct_answer,
                            }
                        )

                    } else if( data.status == 'session_not_found' ){
                        closeQuizModal();
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: data.text});
                    } else if( data.status == 'questions_incongruity' ){
                        closeQuizModal();
                        var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: data.text});
                    } else if( data.status == 'error' ){
                        quizShowError( data.text );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        quizShowError( 'Ошибка запроса...' );
                    })
                    .always(function(data, status, xhr){
                        process(false);
                        $(button).html( firstButtonText );
                    })
                // Ошибка
            } else {
                quizShowError( errors[0].text );
            }
        }
    })

    // Переход на след. вопрос опроса
    $(document).on('click', '.quizNextPageButton', function(e){
        var button = $(this);
        if( !is_process(button) ){
            var quiz_ext_id = $(button).attr('quiz_ext_id');
            openQuizModal( quiz_ext_id )
        }
    });

    // Отправка формы подписки в бонусах
    $(document).on('click', '.quizSubscribeButton', function(e){
        var button = $(this);
        if( !is_process(button) ){

            // Форма
            var this_form = $(button).parents('form');
            // Подготовка
            $(this_form).find("input[type=text]").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var name = $(this_form).find("input[name=name]").val();
            var phone = $(this_form).find("input[name=phone]").val();
            var email = $(this_form).find("input[name=email]").val();
            var errors = [];
            // Проверки
            if (name.length == 0){
                errors.push({
                    'link': $(this_form).find('input[name=name]'),
                    'text': 'Введите, пожалуйста, Ваше имя!'
                });
            } else if (email.length == 0){
                errors.push({
                    'link': $(this_form).find('input[name=email]'),
                    'text': 'Введите, пожалуйста, Ваш Email!'
                });
            } else if (email.length > 0 && !(/^.+@.+\..+$/.test(email))){
                errors.push({
                    'link': $(this_form).find('input[name=email]'),
                    'text': 'Email содержит ошибки!'
                });
            } else if (phone.length == 0){
                errors.push({
                    'link': $(this_form).find('input[name=phone]'),
                    'text': 'Введите, пожалуйста, Ваш телефон!'
                });
            } else if (phone.length > 0 && !(/^[0-9()+ -]{1,99}$/.test(phone))){
                errors.push({
                    'link': $(this_form).find('input[name=phone]'),
                    'text': 'В номере телефона допускаются только цифры, а также символы "+", "-", пробел и круглые скобки!'
                });
            } else if ( $(this_form).find("input[name=agree]:checked").length == 0 ){
                errors.push({
                    'link': $(this_form).find('input[name=agree]'),
                    'text': 'Отметьте согласие на обработку персональных данных !'
                });
            }

            if( errors.length == 0 ){

                var postParams = {
                    form_data: $(this_form).serialize(),
                };
                process(true);
                $.post("/ajax/quizSubscribe.php", postParams, function(data){
                    if (data.status == 'ok'){

                        $('.quizContainerForm').remove();
                        $('.quizContainerFinish').show();

                    } else if (data.status == 'error'){
                        errors.push({
                            'link': null,
                            'text': data.text
                        });
                        show_error( this_form, errors );
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        errors.push({
                            'link': null,
                            'text': 'Ошибка запроса'
                        });
                        show_error( this_form, errors );
                    })
                    .always(function(data, status, xhr){
                        process(false);
                    })

            } else {

                show_error( this_form, errors )
            }
        }
    })



    $(document).on('click', '.quizIDontWantSendForm', function(e){
        $('.quizContainerForm').remove();
        $('.quizContainerFinish').show();
    })



    // Закрытие попапа
    $(document).on('click', '.modalPopup span.close', function(e) {
        var button = $(this);
        setTimeout(function(){
            $(button).parents('.modalPopup').fadeOut(200, function(){});
            $("body").removeClass('css-scroll-fixed');
        },100)
    });


    // контроль формата телефона
    prepare_phone_inputs( phone_input_class );
    $(document).on('keyup', '.'+phone_input_class, function(e){
        check_phone_inputs( $(this) );
    })

    // контроль формата числа
    prepare_number_inputs( number_input_class );
    $(document).on('keyup', '.'+number_input_class, function(e){
        check_number_inputs( $(this) );
    })

    // контроль формата дисконтной карты
    prepare_loyalty_card_inputs( loyalty_card_input_class );
    $(document).on('keyup', '.'+loyalty_card_input_class, function(e){
        check_loyalty_card_inputs( $(this) );
    })





    // Смена города в разделе "Где купить"
    $(document).on('click', '.shopsCitySelect ul li', function(e){
        var item = $(this);
        var curCity = $('.shopsCitySelect input[name=city]').val();
        var newCity = $(this).html();
        if( newCity != curCity ){

            var postParams = { city: newCity };
            process(true);
            $.post("/ajax/switchShopsCity.php", postParams, function(data){
                if (data.status == 'ok'){

                    $('#shopsList').replaceWith( data.shops_list_html );

                    shopsReInitMap();

                    $('.shopsCitySelect input[name=city]').val( newCity );
                    $('.shopsCitySelect .select__head').html( newCity );
                    $('.shopsCitySelect ul li').removeClass('select__item__active');
                    $(item).addClass('select__item__active');

                } else if (data.status == 'error'){
                    //show_message( data.text );
                }
            }, 'json')
                .fail(function(data, status, xhr){
                    //show_message( 'Ошибка запроса' );
                })
                .always(function(data, status, xhr){
                    process(false);
                    $('.select__head').removeClass('open');
                    $('.shopsCitySelect ul').hide();
                })

        } else {
            $('.select__head').removeClass('open');
            $('.shopsCitySelect ul').hide();
        }
    })



    // Перелёт на магазин на карте
    $(document).on('click', '.shopItem', function(e){

        $('.shopItem').removeClass('active');
        $(this).addClass('active');

//shopsPlacemarks[1].balloon.open();

        var item_id = $(this).attr('item_id');

        for( var i = 0, len = shopsPlacemarks.length; i < len; i++ ){

            if( shopsPlacemarks[i].arPoint['ID'] == item_id ) {

                var placemark = shopsPlacemarks[i];

                /*
                    var objectState = shopsMapClusterer.getObjectState( placemark );
                    if (objectState.isClustered) {
                        // Если метка находится в кластере, выставим ее в качестве активного объекта.
                        // Тогда она будет "выбрана" в открытом балуне кластера.
                        objectState.cluster.state.set('activeObject', placemark);
                        shopsMapClusterer.balloon.open(objectState.cluster);
                    } else if (objectState.isShown) {
                        // Если метка не попала в кластер и видна на карте, откроем ее балун.
                        placemark.balloon.open();
                    }
                */
                /*
                                    shopsMap.panTo( placemark.geometry.getCoordinates(), { flying:true } ).then(function () {
                                        placemark.balloon.open();
                                    });
                                    */

//shopsMap.setCenter(placemark.geometry.getCoordinates());
//shopsMap.setZoom(15);
//placemark.balloon.open();

                shopsMap.setZoom(17);
                shopsMap.panTo(placemark.geometry.getCoordinates(),{ flying: false, duration: 200, timingFunction: "ease-in-out" })
                    .then(function () {
                        placemark.balloon.open();
                    }, this);

                /*
                shopsMap.panTo(placemark.geometry.getCoordinates(), {flying:true}).then(function () {
                    shopsMap.setZoom(maxZoom, {
                        smooth: true,
                        position: coords,
                        centering: true,
                        duration: duration,
                    }).then(function () {
                        placemark.balloon.open();
                    });
                });
                */
                /*
                                var coords = placemark.geometry.getCoordinates();
                                coords[0] = Number(coords[0]);
                                coords[1] = Number(coords[1]);

                                if( shopsMap.getZoom() == maxZoom ){

                                    shopsMap.panTo( coords, { flying:true } ).then(function () {
                                        placemark.balloon.open();
                                    });

                                } else if( shopsMap.getZoom() < maxZoom ){

                                    var diffZoom = maxZoom - shopsMap.getZoom();
                                    var duration = diffZoom * 150;
                                    if( duration < 400 ){
                                        duration = 400;
                                    }
                                    shopsMap.panTo(coords, {flying:true}).then(function () {
                                        shopsMap.setZoom(maxZoom, {
                                            smooth: true,
                                            position: coords,
                                            centering: true,
                                            duration: duration,
                                        }).then(function () {
                                            placemark.balloon.open();
                                        });
                                    });
                                }
                */

                // shopsMap.setCenter(placemark.geometry.getCoordinates());
                // shopsMap.setZoom(17);



            }
        }

    })



    // Отправка формы
    $(document).on('click', '.footerSubscribeForm .sendButton', function(e){
        var button = $(this);
        if( !is_process(button) ){

            // Форма
            var this_form = $(button).parents('form');
            // Подготовка
            $(this_form).find("input[type=text]").removeClass("is___error");
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
            } else if( $(this_form).find("input[name=footer_subscribe]:checked").length == 0 ){
                errors.push({
                    'link': $(this_form).find("input[name=footer_subscribe]"),
                    'text': 'Отметьте согласие с условиями рассылки новостных материалов!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){

                process(true);
                var form_data = $(this_form).serialize();
                $.post("/ajax/subscribe.php", { form_data:form_data }, function(data){
                    if( data.status == 'ok' ){
                        $(this_form).addClass('form-success');
                        $(this_form).find('.input-holder').addClass('success');
                        $(this_form).find('.subs-success span').html(data.text);
                        $(this_form).find('.subscribe_checkboxes').remove();
                    } else if( data.status == 'error' ){
                        $(this_form).addClass('form-success');
                        $(this_form).addClass('form-unsuccess');
                        $(this_form).find('.input-holder').addClass('success');
                        $(this_form).find('.subs-success span').html(data.text);
                        $(this_form).find('.subscribe_checkboxes').remove();
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








})
