function process(attr){
    if (attr == true){
        $('.to___process').addClass('is___process');
    } else if(attr == false){
        $('.to___process').removeClass('is___process');
    }
}
function is_process(el){
    if (el){
        return $(el).hasClass('is___process');
    } else {
        return false;
    }
}


// Функция проверки полей формы
function checkFields ( this_form, fields ){
    var result = { errors: [], values: {} };
    if( this_form && fields ){
        $(this_form).find("input, textarea").removeClass("is___error");
        $(this_form).find('p.error___p').html('');
        for ( field_name in fields ){
            var field = fields[field_name];
            if( 'tag' in  field ){
                var link = $(this_form).find(field.tag+'[name='+field_name+']');
                var value = $(link).val();
                result.values[field_name] = value;
                var field_title = 'name_ru' in field?field.name_ru:field_name;
                var is_required = 'required' in field && field.required;
                var type = 'type' in field && field.type;
                if( type != undefined && type == 'checkbox' ){
                    if(  is_required  &&  !$(link).prop('checked')  ){
                        if( 'required_error' in field ){
                            var error_text = field.required_error;
                        } else {
                            var error_text = 'Отметьте, пожалуйста, галочку "'+field_title+'"';
                        }
                        result['errors'].push({ text: error_text,  link: link });
                    }
                } else {
                    // Проверка длины
                    if(  is_required  &&  value.length == 0  ){
                        if( 'required_error' in field ){
                            var error_text = field.required_error;
                        } else {
                            var error_text = 'Не указано поле "'+field_title+'"';
                        }
                        result['errors'].push({ text: error_text,  link: link });
                    } else if( value.length > 0 ){
                        // Проверка на длину
                        if(
                            is_required
                            &&
                            'min_length' in field  &&  field.min_length > value.length
                        ){
                            var error_text = 'Мин. длина поля "'+field_title+'" - '+field.min_length+' '+pfCnt(field.min_length, "символ", "символа", "символов");
                            result['errors'].push({ text: error_text,  link: link });
                            // Проверка на телефон
                        } else if(
                            'is_phone' in field  &&  field.is_phone == true
                            &&
                            !(/^ *\+? *?\d+([-\ 0-9]*|(\(\d+\)))*\d+ *$/.test(value))
                        ){
                            var error_text = 'В номере телефона допускаются только цифры, а также символы "+", "-", пробел и круглые скобки!';
                            result['errors'].push({ text: error_text,  link: link });
                            // Проверка на Email
                        } else if(
                            'is_email' in field  &&  field.is_email == true
                            &&
                            !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value))
                        ){
                            var error_text = 'Email содержит ошибки!';
                            result['errors'].push({ text: error_text,  link: link });
                        }
                    }
                }
            }
        }
    }
    return result;
}


// Функция вывода ошибки в форме
function show_error( this_form, errors, show_noty ){
    if( this_form && errors ){
        var value_type = typeof errors;
        if( value_type == 'object' && errors.length > 0 ){
            var final_error_text = [];
            for( key in errors ){
                var error = errors[key];
                var error_text = ('text' in error)?error.text:false;
                final_error_text.push( error_text );
                var link = ('link' in error)?error.link:false;
                if( link && error_text ){
                    var title = error_text.replace(/<[^>]+>/g, '');
                    var field_type = $(link)[0].tagName;
                    var txt = '$(this).removeClass("is___error"); $(this).attr("title", ""); $(this).parents("form").find("p.error___p").html("");';
                    if( show_noty ){   txt += ' $.noty.closeAll();';   }
                    $(link).addClass('is___error').attr( (field_type=='select'?'onchange':'oninput'), txt).attr('title', title);
                }
            }
            final_error_text = final_error_text.join('<br>');
            $(this_form).find(".error___p").html( final_error_text );
            if( show_noty ){    show_message( final_error_text );    }
        } else if( value_type == 'string' && errors.length > 0 ){
            $(this_form).find(".error___p").html( errors );
            if( show_noty ){    show_message( errors );    }
        }
        $(this_form).find('.success___p').html('');
    }
}
function show_success(this_form, message, show_noty){
    if (this_form){
        $(this_form).find("p.error___p").html('');
        $(this_form).find('.success___p').html(message);
    }
    if (show_noty){    show_message( message );    }
}

function show_message( message, type, closeWith ) {
    if( !type ){    type = 'warning';    }
    if( !closeWith ){    closeWith = 'hover';    }
    $.noty.closeAll();
    var n = noty({closeWith: [closeWith], timeout: (closeWith=='button'?1000000:5000), layout: 'center', type: type, text: message});
}


function create_form(form_class, method, action, target_blank){
    var methodAttr = '';
    var actionAttr = '';
    var targetAttr = '';
    if ( method && method.length > 0 ){   methodAttr = ' method="'+method+'"';   }
    if ( action && action.length > 0 ){   actionAttr = ' action="'+action+'"';   }
    if( target_blank ){   targetAttr = ' target="_blank"';   }
    if ( $(form_class).length > 0 ){
        $('.'+form_class).html('');
    } else {
        $('body').append('<form class="'+form_class+'" '+methodAttr+' '+actionAttr+' '+targetAttr+'></form>');
    }
    return $('.'+form_class);
}

function get_pureURL(URL){
    if ( !URL ){   URL = document.URL;   }
    var arURI = URL.split("?");
    var pureURI = arURI[0];
    return pureURI;
}


function addToRequestURI(URL, pm, val){
    var arURI = URL.split("?");
    var pureURI = arURI[0];
    if (URL.indexOf("?") != -1){
        var arRequests = arURI[1].split("&");
        var arNewRequests = [];
        var cnt = -1;
        $.each(arRequests, function(key, request){
            arTMP = request.split("=");
            if (arTMP[0] != pm && request.length > 0){  cnt++;
                arNewRequests[cnt] = request;
            }
        })
        cnt++;
        arNewRequests[cnt] = pm+"="+val;
        return pureURI+"?"+arNewRequests.join("&");
    } else {
        return pureURI+"?"+pm+"="+val;
    }
}


function removeFromRequestURI( URL, key ){
    var arURI = URL.split("?");
    var pureURI = arURI[0];
    if (URL.indexOf("?") != -1){

        var arRequests = arURI[1].split("&");

        var arNewRequests = [];
        var cnt = -1;
        for( k in arRequests){
            var request = arRequests[k];
            arTMP = request.split("=");
            if ( arTMP[0] != key ){  cnt++;
                arNewRequests[cnt] = request;
            }
        }
        var newURL = pureURI+"?"+arNewRequests.join("&");
        if( arNewRequests.length == 0 ){
            newURL = newURL.replace("?", "");
        }
        return newURL;
    } else {
        return pureURI;
    }
}


function GET(){
    var URL = document.URL;
    var pureURL = get_pureURL();
    var GET_string = URL.replace(pureURL, '');
    var GET_string = GET_string.replace('?', '');
    var get = {};
    if( GET_string.length > 0 ){
        var params = GET_string.split('&');
        $.each(params, function(k, param){
            var ar = param.split('=');
            var key = ar[0];
            var value = ar[1];
            get[key] = value;
        })
    }
    var arCnt = Object.keys( get ).length;
    return arCnt>0?get:false;
}


function rawurldecode( str ) {
    var histogram = {};
    var ret = str.toString();
    var replacer = function(search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };
    histogram["'"]   = '%27';
    histogram['(']   = '%28';
    histogram[')']   = '%29';
    histogram['*']   = '%2A';
    histogram['~']   = '%7E';
    histogram['!']   = '%21';
    for (replace in histogram) {
        search = histogram[replace];
        ret = replacer(search, replace, ret)
    }
    ret = decodeURIComponent(ret);
    return ret;
}



// Функция number_format для форматирования чисел
// Формат: number_format(1234.56, 2, ',', ' ');
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
        .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}



function pfCnt(n, form1, form2, form5){ // pfCnt(productCount, "товар", "товара", "товаров")
    var n = n % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) return form5;
    if (n1 > 1 && n1 < 5) return form2;
    if (n1 == 1) return form1;
    return form5;
}



function checkPhone( value ){
    var type = typeof value;
    var reg = /[^\d+() -]/g;
    if( type == 'string' ){
        return n = string.replace( reg , '' );
    } else if( type == 'object' ){
        var val = $(value).val();
        value.val( val.replace( reg , '' ) );
    }
}



function minus_zero(this_input, not_empty_value) {
    var input_value = $(this_input).val();
    input_value = input_value.toString().replace(/[^\d;]/g, '');
    $(this_input).val(input_value);
    var dlina = input_value.length;
    if (dlina > 0){
        stop = false;
        for (var n = 1; n <= dlina; n++) {
            if (stop == false){
                if (input_value.substring((n-1),n) == 0){
                    var new_str = input_value.substring(n,dlina);
                    if (not_empty_value){
                        $(this_input).val( (new_str.length == 0)?1:new_str );
                    } else {
                        $(this_input).val( (new_str.length == 0)?'':new_str );
                    }
                } else {
                    stop = true;
                }
            }
        }
    } else if (not_empty_value){
        $(this_input).val(1);
    }
}





var Base64 = {
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    //метод для кодировки в base64 на javascript
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if( isNaN(chr2) ) {
                enc3 = enc4 = 64;
            }else if( isNaN(chr3) ){
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    //метод для раскодировки из base64
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if( enc3 != 64 ){
                output = output + String.fromCharCode(chr2);
            }
            if( enc4 != 64 ) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    // метод для кодировки в utf8
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if( c < 128 ){
                utftext += String.fromCharCode(c);
            }else if( (c > 127) && (c < 2048) ){
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;

    },
    //метод для раскодировки из urf8
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while( i < utftext.length ){
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }else if( (c > 191) && (c < 224) ) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}





function in_array(value, array)
{
    for(var i = 0; i < array.length; i++)
    {
        if(array[i] == value) return true;
    }
    return false;
}





function is_wrong_phone( phone ){
    return (
        // дублирование +
        (/\++.*\++/.test(phone))
        ||
        // плюс посреди номера
        (/^[^+ ]+\+$/.test(phone))
        ||
        // ) в начале номера
        (/^ *[()]$/.test(phone))
        ||
        // недопустимые символы
        (/[^0-9+() -]/.test(phone))
    );
}
function prepare_phone_inputs( input_class ){
    if( input_class ){
        $( '.' + input_class ).each(function(){
            var value = $(this).val();
            $(this).attr('prev_value', value);
        })
    }
}
function check_phone_inputs( input ){
    if( input ){
        var value = $(input).val();
        var new_value = value.replace(new RegExp(",",'g'), ".");
        if( new_value != value ){
            value = new_value;
            if( !is_wrong_phone( value ) ){
                $(input).val( value );
                $(input).attr( 'prev_value', value );
            }
        }
        var prev_value = $(input).attr('prev_value');
        if( value.length > 0 ){
            if( is_wrong_phone( value ) ){
                if( value.startsWith(prev_value) ){
                    $(input).val( prev_value );
                } else {    $(input).val('');    }
            } else {    $(input).attr( 'prev_value', value );    }
        } else {    $(input).attr( 'prev_value', value );    }
    }
}




function is_wrong_number( number ){
    return (
        (/^0[0-9]+$/.test(number))
        ||
        (/,+/.test(number))
        ||
        (/^[^0-9]/.test(number))
        ||
        (/[^0-9.]/.test(number))
        ||
        (/\..*\./.test(number))
    );
}
function prepare_number_inputs( input_class ){
    if( input_class ){
        $( '.' + input_class ).each(function(){
            var value = $(this).val();
            $(this).attr('prev_value', value);
        })
    }
}
function check_number_inputs( input ){
    if( input ){
        var value = $(input).val();
        var new_value = value.replace(new RegExp(",",'g'), ".");
        if( new_value != value ){
            value = new_value;
            if( !is_wrong_number( value ) ){
                $(input).val( value );
                $(input).attr( 'prev_value', value );
            }
        }
        var prev_value = $(input).attr('prev_value');
        if( value.length > 0 ){
            if( is_wrong_number( value ) ){
                if( value.startsWith(prev_value) ){
                    $(input).val( prev_value );
                } else {
                    $(input).val('');
                }
            } else {    $(input).attr( 'prev_value', value );    }
        } else {    $(input).attr( 'prev_value', value );    }
    }
}




function is_wrong_loyalty_card( number ){
    return (
        (/^0[0-9]+$/.test(number))
        ||
        (/,+/.test(number))
        ||
        (/^[^0-9]/.test(number))
        ||
        (/[^0-9.]/.test(number))
        ||
        (/\..*\./.test(number))
        ||
        number.length > 13
    );
}
function prepare_loyalty_card_inputs( input_class ){
    if( input_class ){
        $( '.' + input_class ).each(function(){
            var value = $(this).val();
            $(this).attr('prev_value', value);
        })
    }
}
function check_loyalty_card_inputs( input ){
    if( input ){
        var value = $(input).val();
        var new_value = value.replace(new RegExp(",",'g'), ".");
        if( new_value != value ){
            value = new_value;
            if( !is_wrong_loyalty_card( value ) ){
                $(input).val( value );
                $(input).attr( 'prev_value', value );
            }
        }
        var prev_value = $(input).attr('prev_value');
        if( value.length > 0 ){
            if( is_wrong_loyalty_card( value ) ){
                if( value.startsWith(prev_value) ){
                    $(input).val( prev_value );
                } else {
                    $(input).val('');
                }
            } else {    $(input).attr( 'prev_value', value );    }
        } else {    $(input).attr( 'prev_value', value );    }
    }
}





function hiddenRegisterSmartCaptchaInit(){

    if ( !window.smartCaptcha ){   return;   }

    const container = document.getElementById('register-captcha-container');

    const widgetId = window.smartCaptcha.render( container, {
        sitekey: captchaPubKey,
        invisible: true,
        shieldPosition: 'bottom-right',
        hideShield: true,
        hl: 'ru',
        callback: hiddenRegisterSmartCaptchaCallback,
    });

}

function hiddenRegisterSmartCaptchaCallback( token ){
    if ( token ){
        if( registerSendType != null ){
            if( registerSendType == 'sendSmsCode' ){
                registerSendSmsCode();
            } else if( registerSendType == 'register' ){
                registerSend();
            }
            registerSendType = null;
        }
    } else {
        $('.registerForm').replaceWith('<p>Проверка пользователя не пройдена</p>');
    }
}




function hiddenPassRecoveryCaptchaInit(){

    if ( !window.smartCaptcha ){   return;   }

    const container = document.getElementById('pass-recovery-captcha-container');

    const widgetId = window.smartCaptcha.render( container, {
        sitekey: captchaPubKey,
        invisible: true,
        shieldPosition: 'bottom-right',
        hideShield: true,
        hl: 'ru',
        callback: hiddenPassRecoveryCaptchaCallback,
    });

}

function hiddenPassRecoveryCaptchaCallback( token ){
    if ( token ){
        passwordRecoveryRequest();
    } else {
        $('.recoveryArea').html( '<p class="reservInfoMsg orange_bg">Ошибка проверки пользователя</p>' );
    }
}


