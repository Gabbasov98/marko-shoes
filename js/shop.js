

var filterInfo = null;
var filterJson = {};
var filterURL = null;
var allProductsCNT, filterAllProductsCNT, filterAllPagesCNT;
var pageURL;
var searchURL;
var searchTitle;
var articlesTitle;
var filterArPriceSlider = {};
var filterNumberSliders = {};
var getProductShopsErrorsCNT = 0;
var searchProductsCNT, searchPagesCNT;
var articlesProductsCNT, articlesPagesCNT;
var bookingProductID, bookingProductSize, bookingShopID, bookingCardNumber;





function getProductShopsShoes (
    product_code,
    product_size,
    filterCity = null,
    filterShopExtIDs = null,
    isFilter = 'N',
    filter_selected_item = null,
    filter_selected_input = null,
    filter_selected_input_name = null,
){
    if( getProductShopsErrorsCNT < 3 ){
        $('.loadingLayer').show();
        var postParams = {
            product_code: product_code,
            product_size: product_size,
        };
        if( filterCity != null ){
            postParams['city'] = filterCity;
        }
        if( filterShopExtIDs != null ){
            postParams['shop_ext_ids'] = filterShopExtIDs;
        }
        postParams['isFilter'] = isFilter;
        process(true);
        $.post("/ajax/getProductShopsShoes.php", postParams, function(data){
            if (data.status == 'ok'){

                if( isFilter == 'N' ){

                    $('.shopsLoadArea').html( data.productShopsListHtml );

                } else if( isFilter == 'Y' ){

                    $('.select .select__item').removeClass('select__item__active');
                    $(filter_selected_item).addClass('select__item__active');
                    $('.select__head').removeClass('open');
                    $(filter_selected_item).parent().fadeOut();
                    $(filter_selected_item).parent().prev().text($(filter_selected_item).attr('item_name')+': '+$(filter_selected_item).text());
                    $(filter_selected_input).val( $(filter_selected_item).text() );

                    var html = $(data.productShopsListHtml);

                    var modsHtml = $(html).find('modsBlock').html();
                    var shopsHtml = $(html).find('shopsBlock').html();

                    $('.shopsModsBlock').replaceWith( modsHtml );
                    $('.shopsListArea').html( shopsHtml );

                    if( filter_selected_input_name == 'shops_size' ){
                        $('.shopsModsLink').each(function(){
                            var href = $(this).attr('href');
                            if( href != undefined ){
                                var matches = href.match(/shops\/([^\/]+)\//);
                                href = '/shops/'+matches[1]+'/'+product_size+'/';
                                $(this).attr('href', href);
                            }
                        });
                        history.replaceState({}, null, '/shops/'+product_code+'/'+product_size+'/');
                    }
                }

            } else if (data.status == 'incorrect_api_result'){
                getProductShopsErrorsCNT++;
                getProductShopsShoes ( product_code, product_size );
            } else if (data.status == 'error'){
                show_message( data.text );
            }
        }, 'json')
            .fail(function(data, status, xhr){
                getProductShopsErrorsCNT++;
                getProductShopsShoes ( product_code, product_size );
            })
            .always(function(data, status, xhr){
                process(false);
                $('.loadingLayer').hide();
            })
    } else {
        $('.shopsProcessBlock').hide();
        $('.shopsErrorBlock p').html('По&nbsp;техническим&nbsp;причинам список&nbsp;магазинов получить не&nbsp;удалось');
        $('.shopsErrorBlock').show();
    }
}

function getProductShopsVitma (
    product_code,
    filterCity = null,
    filterShopExtIDs = null,
    isFilter = 'N',
    filter_selected_item = null,
    filter_selected_input = null,
    filter_selected_input_name = null,
){
    if( getProductShopsErrorsCNT < 3 ){
        $('.loadingLayer').show();
        var postParams = { product_code: product_code };
        if( filterCity != null ){
            postParams['city'] = filterCity;
        }
        if( filterShopExtIDs != null ){
            postParams['shop_ext_ids'] = filterShopExtIDs;
        }
        postParams['isFilter'] = isFilter;
        process(true);
        $.post("/ajax/getProductShopsVitma.php", postParams, function(data){
            if (data.status == 'ok'){

                if( isFilter == 'N' ){

                    $('.shopsLoadArea').html( data.productShopsListHtml );

                } else if( isFilter == 'Y' ){

                    $('.select .select__item').removeClass('select__item__active');
                    $(filter_selected_item).addClass('select__item__active');
                    $('.select__head').removeClass('open');
                    $(filter_selected_item).parent().fadeOut();
                    $(filter_selected_item).parent().prev().text($(filter_selected_item).attr('item_name')+': '+$(filter_selected_item).text());
                    $(filter_selected_input).val( $(filter_selected_item).text() );

                    var html = $(data.productShopsListHtml);

                    var modsHtml = $(html).find('modsBlock').html();
                    var shopsHtml = $(html).find('shopsBlock').html();

                    $('.shopsModsBlock').replaceWith( modsHtml );
                    $('.shopsListArea').html( shopsHtml );

                    if( filter_selected_input_name == 'shops_size' ){
                        $('.shopsModsLink').each(function(){
                            var href = $(this).attr('href');
                            if( href != undefined ){
                                var matches = href.match(/shops\/([^\/]+)\//);
                                href = '/shops/'+matches[1]+'/'+size+'/';
                                $(this).attr('href', href);
                            }
                        });
                        history.replaceState({}, null, '/shops/'+product_code+'/'+size+'/');
                    }
                }

            } else if (data.status == 'incorrect_api_result'){
                getProductShopsErrorsCNT++;
                getProductShopsVitma ( product_code );
            } else if (data.status == 'error'){
                show_message( data.text );
            }
        }, 'json')
            .fail(function(data, status, xhr){
                getProductShopsErrorsCNT++;
                getProductShopsVitma ( product_code );
            })
            .always(function(data, status, xhr){
                process(false);
                $('.loadingLayer').hide();
            })
    } else {
        $('.shopsProcessBlock').hide();
        $('.shopsErrorBlock p').html('По&nbsp;техническим&nbsp;причинам список&nbsp;магазинов получить не&nbsp;удалось');
        $('.shopsErrorBlock').show();
    }
}


// Корректируем списки размеров на карточках в зависимости от выбранного фильтра
function fillProductSizesFromCache( data = null, productSizesFromCache = null ){

    if(
        data != undefined
        &&
        data != null
    ){
        if(
            'productSizesFromCache' in data
            &&
            data.productSizesFromCache != undefined
            &&
            data.productSizesFromCache != null
        ){
            productSizes = data.productSizesFromCache;
            for( productRequestCode in productSizes ){
                var sizes = productSizes[ productRequestCode ];
                var sizesStr = sizes==null?'':sizes.join(', ');
                if( sizesStr.length > 0 ){
                    $('.catalog___item[product_request_code='+productRequestCode+'] sizes___span').html(
                        sizesStr
                    );
                } else {
                    $('.catalog___item[product_request_code='+productRequestCode+'] sizes___span').html(
                        '-'
                        //$('.catalog___item[product_request_code='+productRequestCode+'] div.prod__size').attr('all_sizes')
                    );
                }
            }
        }
    } else if(
        productSizesFromCache != undefined
        &&
        productSizesFromCache != null
    ){
        productSizes = productSizesFromCache;
        for( productRequestCode in productSizes ){
            var sizes = productSizes[ productRequestCode ];
            var sizesStr = sizes==null?'':sizes.join(', ');
            if( sizesStr.length > 0 ){
                $('.catalog___item[product_request_code='+productRequestCode+'] sizes___span').html(
                    sizesStr
                );
            } else {
                $('.catalog___item[product_request_code='+productRequestCode+'] sizes___span').html(
                    '-'
                    //$('.catalog___item[product_request_code='+productRequestCode+'] div.prod__size').attr('all_sizes')
                );
            }
        }
    }
}


function catalogLoad ( params, set_sort = false, scrollToTop = false ){

    isClearFilter = false;

    if( !params ){   var params = {};   }

    params['is_catalog_ajax'] = 'Y';

    var section_id = $('input[name=section_id]').val();
    var action_id = $('input[name=action_id]').val();
    var seo_page_id = $('input[name=seo_page_id]').val();
    if( section_id != undefined ){
        params['section_id'] = section_id;
    } else if( action_id != undefined ){
        params['action_id'] = action_id;
    } else if( seo_page_id != undefined ){
        params['seo_page_id'] = seo_page_id;
    }

    if( filterURL ){
        var url = filterURL;
    } else {
        var url = document.URL;
    }
    params['url'] = rawurldecode(url);

    if( params['count'] == undefined ){
        params['count'] = catalog_list_count;
    }
    if( params['pageNumber'] == undefined ){
        params['pageNumber'] = catalog_page_number;
    }

    var sortCode = $('input.sort___input').val();

    for( key in catalogSortList ){
        var catalogSortItem = catalogSortList[key];
        if( sortCode == catalogSortItem['code'] ){
            catalogSort = catalogSortItem;
        }
    }

    params['sort'] = catalogSort['code'];

    process(true);
    $.post("/ajax/catalogLoad.php", params, function(data){
        if( data.status == 'ok' ){

            var html = data.html;

            // Подгрузка по кнопке
            if( params['is_more_products'] == 'Y' ){

                $('.catalogLoadArea section.products__list').append( html );

                // Корректируем списки размеров на карточках в зависимости от выбранного фильтра
                fillProductSizesFromCache( data );

                if( 'pagination_html' in data ){
                    var pagination_html = data.pagination_html;
                    if( pagination_html.length > 0 ){

                        $('.bottomPagination .paginationBlock').replaceWith( pagination_html );

                        var bottomPagination = $('.bottomPagination .paginationBlock');
                        if( $(bottomPagination).length > 0 ){
                            $('.topPagination .paginationBlock').replaceWith( $(bottomPagination).get(0).outerHTML );
                        } else {
                            $('.topPagination .paginationBlock').hide();
                        }

                    }
                }

                // Остальные случаи
            } else {

                if( html.length > 0 ){

                    $('.catalogLoadArea').html( html );

                    // Корректируем списки размеров на карточках в зависимости от выбранного фильтра
                    fillProductSizesFromCache( data );

                } else {

                    $('.catalogLoadArea').html( '<div class="load-more no___count_block"><p>В данном разделе / по данному фильтру товаров нет</p></div>' );
                }

                if( $('.bottomPagination .paginationBlock').length > 0 ){

                    var bottomPagination = $('.bottomPagination .paginationBlock');
                    $('.topPagination .paginationBlock').replaceWith( $(bottomPagination).get(0).outerHTML );

                } else {

                    $('.topPagination .paginationBlock').hide();
                }

                if( $('.bottomPagination .pagination__perpage').length > 0 ){
                    var bottomPerPage = $('.bottomPagination .pagination__perpage');
                    $('.topPagination .pagination__perpage').replaceWith( $(bottomPerPage).get(0).outerHTML );
                    $('.topPagination .pagination__perpage').show();
                } else {
                    $('.topPagination .pagination__perpage').hide();
                }

            }

            if( params['pageNumber'] >= filterAllPagesCNT  ){
                $('.catalogMoreButton').hide();
            } else {
                $('.catalogMoreButton').show();
            }

            ////////////////////////
            var title = $('input[name=page_title]').val();
            var new_url = rawurldecode( url );
            if( catalog_page_number > 1 ){
                new_url = addToRequestURI( new_url, 'PAGEN_1', catalog_page_number );
                title += ' - страница ' + catalog_page_number;
            } else {
                new_url = removeFromRequestURI( new_url, 'PAGEN_1' );
            }
            history.replaceState({}, null, new_url);
            $('title').html(title);

            new_url = addToRequestURI( new_url, 'count', catalog_list_count );
            history.replaceState({}, null, new_url);

            if( set_sort ){
                new_url = addToRequestURI( new_url, 'sort', catalogSort['code'] );
                history.replaceState({}, null, new_url);
            }

            filterURL = document.URL;

            if( filterIsActive() ){
                $('.filterResetButton').show();
            } else {
                $('.filterResetButton').hide();
            }

            $('.filterShowButton').hide();

            //updateFilter( data );

            ////////////////////////

            if( scrollToTop ){
                var destination = $('div.catalog__main div.sortbar').offset();
                if( $('.nav.shutter--nav-js.sticky').length > 0 ){
                    $('body, html').animate({scrollTop: destination.top - $('.nav.shutter--nav-js').outerHeight(true)}, 800);
                } else {
                    $('body, html').animate({scrollTop: destination.top - $('.header.header').outerHeight(true) - $('.nav.shutter--nav-js').outerHeight(true)}, 800);
                }
            }

            if ( $('.catalog__sidebar').hasClass('sidebar_fixed') ) {
                $('.sidebar-close-js').click();
            }

        } else if (data.status == 'error'){
            show_message(data.text, 'warning')
        }
    }, 'json')
        .fail(function(data, status, xhr){
            show_message('Ошибка запроса', 'warning');
        })
        .always(function(data, status, xhr){
            process(false);
        })
}



function catalogVitmaLoad ( params, set_sort = false, scrollToTop = false ){

    isClearFilter = false;

    if( !params ){   var params = {};   }

    params['is_catalog_ajax'] = 'Y';

    var section_id = $('input[name=section_id]').val();
    var action_id = $('input[name=action_id]').val();
    var seo_page_id = $('input[name=seo_page_id]').val();
    if( section_id != undefined ){
        params['section_id'] = section_id;
    } else if( action_id != undefined ){
        params['action_id'] = action_id;
    } else if( seo_page_id != undefined ){
        params['seo_page_id'] = seo_page_id;
    }

    if( filterURL ){
        var url = filterURL;
    } else {
        var url = document.URL;
    }
    params['url'] = rawurldecode(url);

    if( params['count'] == undefined ){
        params['count'] = catalog_list_count;
    }
    if( params['pageNumber'] == undefined ){
        params['pageNumber'] = catalog_page_number;
    }

    var sortCode = $('input.sort___input').val();

    for( key in catalogSortList ){
        var catalogSortItem = catalogSortList[key];
        if( sortCode == catalogSortItem['code'] ){
            catalogSort = catalogSortItem;
        }
    }

    params['sort'] = catalogSort['code'];

    process(true);
    $.post("/ajax/catalogVitmaLoad.php", params, function(data){
        if( data.status == 'ok' ){

            var html = data.html;

            // Подгрузка по кнопке
            if( params['is_more_products'] == 'Y' ){

                $('.catalogLoadArea section.products__list').append( html );

                if( 'pagination_html' in data ){
                    var pagination_html = data.pagination_html;
                    if( pagination_html.length > 0 ){

                        $('.bottomPagination .paginationBlock').replaceWith( pagination_html );

                        var bottomPagination = $('.bottomPagination .paginationBlock');
                        if( $(bottomPagination).length > 0 ){
                            $('.topPagination .paginationBlock').replaceWith( $(bottomPagination).get(0).outerHTML );
                        } else {
                            $('.topPagination .paginationBlock').hide();
                        }

                    }
                }

                // Остальные случаи
            } else {

                if( html.length > 0 ){

                    $('.catalogLoadArea').html( html );

                } else {

                    $('.catalogLoadArea').html( '<div class="load-more no___count_block"><p>В данном разделе / по данному фильтру товаров нет</p></div>' );
                }

                if( $('.bottomPagination .paginationBlock').length > 0 ){

                    var bottomPagination = $('.bottomPagination .paginationBlock');
                    $('.topPagination .paginationBlock').replaceWith( $(bottomPagination).get(0).outerHTML );

                } else {

                    $('.topPagination .paginationBlock').hide();
                    //$('.topPagination .pagination__perpage').hide();
                }

                if( $('.bottomPagination .pagination__perpage').length > 0 ){
                    var bottomPerPage = $('.bottomPagination .pagination__perpage');
                    $('.topPagination .pagination__perpage').replaceWith( $(bottomPerPage).get(0).outerHTML );
                    $('.topPagination .pagination__perpage').show();
                } else {
                    $('.topPagination .pagination__perpage').hide();
                }

            }

            if( params['pageNumber'] >= filterAllPagesCNT  ){
                $('.catalogMoreButton').hide();
            } else {
                $('.catalogMoreButton').show();
            }

            ////////////////////////
            var title = $('input[name=page_title]').val();
            var new_url = rawurldecode( url );
            if( catalog_page_number > 1 ){
                new_url = addToRequestURI( new_url, 'PAGEN_1', catalog_page_number );
                title += ' - страница ' + catalog_page_number;
            } else {
                new_url = removeFromRequestURI( new_url, 'PAGEN_1' );
            }
            history.replaceState({}, null, new_url);
            $('title').html(title);

            new_url = addToRequestURI( new_url, 'count', catalog_list_count );
            history.replaceState({}, null, new_url);

            if( set_sort ){
                new_url = addToRequestURI( new_url, 'sort', catalogSort['code'] );
                history.replaceState({}, null, new_url);
            }

            filterURL = document.URL;

            if( filterIsActive() ){
                $('.filterResetButton').show();
            } else {
                $('.filterResetButton').hide();
            }

            $('.filterShowButton').hide();

            //updateFilter( data );

            ////////////////////////

            if( scrollToTop ){
                var destination = $('div.catalog__main div.sortbar').offset();
                if( $('.nav.shutter--nav-js.sticky').length > 0 ){
                    $('body, html').animate({scrollTop: destination.top - $('.nav.shutter--nav-js').outerHeight(true)}, 800);
                } else {
                    $('body, html').animate({scrollTop: destination.top - $('.header.header').outerHeight(true) - $('.nav.shutter--nav-js').outerHeight(true)}, 800);
                }
            }

            if ( $('.catalog__sidebar').hasClass('sidebar_fixed') ) {
                $('.sidebar-close-js').click();
            }

        } else if (data.status == 'error'){
            show_message(data.text, 'warning')
        }
    }, 'json')
        .fail(function(data, status, xhr){
            show_message('Ошибка запроса', 'warning');
        })
        .always(function(data, status, xhr){
            process(false);
        })
}



function searchLoad ( params, scrollToTop = false ){

    if( !params ){   var params = {};   }

    params['section_id'] = $('input[name=section_id]').val();

    var url = document.URL;

    if( params['count'] == undefined ){
        params['count'] = search_list_count;
    }
    if( params['pageNumber'] == undefined ){
        params['pageNumber'] = search_page_number;
    }

    process(true);
    $.post("/ajax/searchLoad.php", params, function(data){
        if( data.status == 'ok' ){

            var html = data.html;

            // Подгрузка по кнопке
            if( params['is_more_products'] == 'Y' ){

                $('.searchLoadArea section.products__list').append( html );

                if( 'pagination_html' in data ){
                    var pagination_html = data.pagination_html;
                    if( pagination_html.length > 0 ){

                        $('.bottomPagination .paginationBlock').replaceWith( pagination_html );
                    }
                }

                // Остальные случаи
            } else {

                if( html.length > 0 ){

                    $('.searchLoadArea').html( html );

                } else {

                    $('.searchLoadArea').html( '<div class="load-more no___count_block"><p>Товаров не найдено</p></div>' );
                }
            }

            if( params['pageNumber'] >= searchPagesCNT  ){
                $('.searchMoreButton').hide();
            } else {
                $('.searchMoreButton').show();
            }

            ////////////////////////
            var title = searchTitle;
            var new_url = rawurldecode( url );
            if( search_page_number > 1 ){
                new_url = addToRequestURI( new_url, 'PAGEN_1', search_page_number );
                title += ' - страница ' + search_page_number;
            } else {
                new_url = removeFromRequestURI( new_url, 'PAGEN_1' );
            }
            history.replaceState({}, null, new_url);
            $('title').html(title);

            new_url = addToRequestURI( new_url, 'count', search_list_count );
            history.replaceState({}, null, new_url);

            ////////////////////////

            if( scrollToTop ){
                var destination = $('div.searchLoadArea').offset();
                $('body, html').animate({scrollTop: destination.top}, 800);
            }

        } else if (data.status == 'error'){
            show_message(data.text, 'warning')
        }
    }, 'json')
        .fail(function(data, status, xhr){
            show_message('Ошибка запроса', 'warning');
        })
        .always(function(data, status, xhr){
            process(false);
        })
}


function articlesLoad ( params, scrollToTop = false ){

    if( !params ){   var params = {};   }

    params['section_id'] = $('input[name=section_id]').val();

    var url = document.URL;
    params['url'] = rawurldecode(url);

    if( params['pageNumber'] == undefined ){
        params['pageNumber'] = articles_page_number;
    }

    params['pages_cnt'] = articlesPagesCNT;
    params['products_cnt'] = articlesProductsCNT;

    process(true);
    $.post("/ajax/articlesLoad.php", params, function(data){
        if( data.status == 'ok' ){

            var html = data.html;

            // Подгрузка по кнопке
            if( params['is_more_articles'] == 'Y' ){

                $('.articlesLoadArea .articles_items').append( html );

                if( 'pagination_html' in data ){
                    var pagination_html = data.pagination_html;
                    if( pagination_html.length > 0 ){
                        $('.bottomPagination .paginationBlock').replaceWith( pagination_html );
                    }
                }

                // Остальные случаи
            } else {

                if( html.length > 0 ){

                    $('.articlesLoadArea').replaceWith( html );

                } else {

                    $('.articlesLoadArea').html( '<div class="load-more no___count_block"><p>Статей не найдено</p></div>' );
                }
            }

            if( params['pageNumber'] >= articlesPagesCNT  ){
                $('.articlesMoreButton').hide();
            } else {
                $('.articlesMoreButton').show();
            }

            ////////////////////////
            var title = articlesTitle;
            var new_url = rawurldecode( url );
            if( articles_page_number > 1 ){
                new_url = addToRequestURI( new_url, 'PAGEN_1', articles_page_number );
                title += ' - страница ' + articles_page_number;
            } else {
                new_url = removeFromRequestURI( new_url, 'PAGEN_1' );
            }
            history.replaceState({}, null, new_url);
            $('title').html(title);

            ////////////////////////

            if( scrollToTop ){
                var destination = $('div.articlesLoadArea').offset();
                $('body, html').animate({scrollTop: destination.top}, 800);
            }

        } else if (data.status == 'error'){
            show_message(data.text, 'warning')
        }
    }, 'json')
        .fail(function(data, status, xhr){
            show_message('Ошибка запроса', 'warning');
        })
        .always(function(data, status, xhr){
            process(false);
        })
}



function updateFilter( data ){

    filterInfo = JSON.parse( data.filterJSON );

    // Активация/деактивация чекбоксов
    $('.smartfilter input[type=checkbox]').prop('disabled', false);
    if( filterInfo && 'ITEMS' in filterInfo ){
        for( key in filterInfo.ITEMS ){
            var arItem = filterInfo.ITEMS[key];
            if( arItem.DISPLAY_TYPE == 'A' ){

            } else if( arItem.DISPLAY_TYPE == 'B' ){

            } else {
                if( 'VALUES' in arItem ){
                    for( val in arItem.VALUES ){
                        var ar = arItem.VALUES[val];
                        if( ar.ELEMENT_COUNT > 0 ){} else {
                            if(
                                $('.smartfilter input#'+ar.CONTROL_ID).attr('type') == 'checkbox'
                                &&
                                !$('.smartfilter input#'+ar.CONTROL_ID).prop('checked')
                            ){
                                $('.smartfilter input#'+ar.CONTROL_ID).prop('disabled', true);
                            }
                        }
                    }
                }
            }
        }
    }
}


function filterIsActive(){

    var yes = false;

    if( $('.filterHiddenGroupsBlock input[type=checkbox]:checked').length > 0 ){
        yes = true;
    }

    if( $('.filterCitiesNalInput').length > 0 ){
        if( $('.filterCitiesNalInput')[0].hasAttribute('name') ){
            yes = true;
        }
    }
    if( $('.filterShopsNalCheckbox').length > 0 ){
        yes = true;
    }

    if( $('form.smartfilter .filter___number_checkbox:checked').length > 0 ){
        yes = true;
    }
    if(
        $('.filterPriceSlider').length > 0
        &&
        (
            $('.filterPriceSlider').data('min') != $('.filterPriceFromInput').val()
            ||
            $('.filterPriceSlider').data('max') != $('.filterPriceToInput').val()
        )
    ){    yes = true;    }
    if( $('.filterNumberSlider').length > 0 ){
        $('.filterNumberSlider').each(function(){
            if(
                $(this).data('min') != $(this).parents('section.range-slider').find('.filterNumberFromInput').val()
                ||
                $(this).data('max') != $(this).parents('section.range-slider').find('.filterNumberToInput').val()
            ){    yes = true;    }
        })
    }
    return yes;
}

function filterCitySelected(){
    return ( $('input.filterCitiesNalInput').length > 0 && $('input.filterCitiesNalInput').val()=='Y' );
}
function filterShopsSelected(){
    return ( $('input.filterShopsNalCheckbox').length > 0 && $('input.filterShopsNalCheckbox').val()=='Y' );
}
function filterSizesSelected(){
    return ( $('.isSizesCheckbox:checked').length>0 );
}

function filterGo( needCatalogLoad = false ){

    if( $('.filterPriceSlider').length > 0 ){
        if(
            $('.filterPriceSlider').data('min') == $('.filterPriceFromInput').val()
            &&
            $('.filterPriceSlider').data('max') == $('.filterPriceToInput').val()
        ){
            $('.filterPriceFromInput').attr('name', null);
            $('.filterPriceToInput').attr('name', null);
        }
    }
    if( $('.filterNumberSlider').length > 0 ){
        $('.filterNumberSlider').each(function(){
            if(
                $(this).data('min') == $(this).parents('section.range-slider').find('.filterNumberFromInput').val()
                &&
                $(this).data('max') == $(this).parents('section.range-slider').find('.filterNumberToInput').val()
            ){
                $(this).parents('section.range-slider').find('.filterNumberFromInput').attr('name', null);
                $(this).parents('section.range-slider').find('.filterNumberToInput').attr('name', null);
            }
        })
    }

    /////////////////////////////
    var filter_form = $('form.smartfilter');
    var form_data = $(filter_form).serialize();
    /////////////////////////////

    if(
        filterCitySelected()
        &&
        filterSizesSelected()
    ){
        $('.filter___results p').html('');
    } else {
        $('.filter___results p').html('Найдено: подсчёт...');
    }

    process(true);

    var section_id = $('input[name=section_id]').val();
    var action_id = $('input[name=action_id]').val();
    var seo_page_id = $('input[name=seo_page_id]').val();

    var postURL = curURL+'?'+form_data+'&ajax=y';
    if( section_id != undefined ){
        postURL += '&section_id='+section_id;
    } else if( action_id != undefined ){
        postURL += '&action_id='+action_id;
    } else if( seo_page_id != undefined ){
        postURL += '&seo_page_id='+seo_page_id;
    }

    $.post(postURL, {}, function(data){
        if( data ){

            var new_url = data.FILTER_URL;
            new_url = new_url.replace(new RegExp("/filter/clear/apply/",'g'), "/");
            new_url = new_url.replace(new RegExp("/filter/apply/",'g'), "/");
            new_url = rawurldecode( new_url );

            if( action_id != undefined ){
                if( new_url == '/' ){
                    new_url = pageURL;
                } else {
                    new_url = new_url.replace(new RegExp("/filter/",'g'), pageURL+"filter/");
                }
            } else if( seo_page_id != undefined ){
                if( new_url == '/' ){
                    new_url = pageURL;
                } else {
                    new_url = new_url.replace(new RegExp("/filter/",'g'), pageURL+"filter/");
                }
            }

            filterURL = new_url;

            if(
                filterCitySelected()
                &&
                filterSizesSelected()
            ){
                $('.filter___results p').html('');
            } else if( 'ELEMENT_COUNT' in data ){
                $('.filter___results p ').html('Найдено: '+data.ELEMENT_COUNT+' из '+allProductsCNT);
            } else {
                $('.filter___results p').html('');
            }

            if( !needCatalogLoad ){
                $('.filterShowButton').show();
                $('.filterResetButton').show();
            }

            if( $('.filterPriceSlider').length > 0 ){
                $('.filterPriceFromInput').attr('name', $('.filterPriceFromInput').data('name'));
                $('.filterPriceToInput').attr('name', $('.filterPriceToInput').data('name'));
            }
            if( $('.filterNumberSlider').length > 0 ){
                $('.filterNumberSlider').each(function(){
                    $(this).parents('section.range-slider').find('.filterNumberFromInput').attr('name', $(this).parents('section.range-slider').find('.filterNumberFromInput').data('name'));
                    $(this).parents('section.range-slider').find('.filterNumberToInput').attr('name', $(this).parents('section.range-slider').find('.filterNumberToInput').data('name'));
                })
            }

            if( needCatalogLoad ){

                if( $(filter_form).hasClass('is___catalogVitma') ){
                    catalogVitmaLoad( null, true );
                } else {
                    catalogLoad( null, true );
                }
            }

        }
    }, 'json')
        .fail(function(data, status, xhr){})
        .always(function(data, status, xhr){
            process(false);
        })
}



function getProductInfo( product_id ){
    var postParams = {
        product_id: product_id
    };
    process(true);
    $.post("/ajax/getProductInfo.php", postParams, function(data){
        if (data.status == 'ok'){

            if( 'recommendBlockHtml' in data ){
                $('productRecommendBlock').replaceWith( data.recommendBlockHtml );
                $(".product__carousel").length &&
                $(".product__carousel").owlCarousel({
                    loop: $('.one_recommend_product').length>4,
                    margin: 0,
                    nav: $('.one_recommend_product').length>4,
                    smartSpeed: 700,
                    autoplay: false,
                    navText: [
                        $('.one_recommend_product').length>4?'<i class="fa fa-chevron-left"></i>':'',
                        $('.one_recommend_product').length>4?'<i class="fa fa-chevron-right"></i>':''
                    ],
                    responsive: { 0: { items: 2 }, 768: { items: 3 }, 1024: { items: 4 } },
                })
            }

            if( 'viewedBlockHtml' in data ){
                $('productViewedBlock').replaceWith( data.viewedBlockHtml );
                $(".product__carousel-lastseen").length &&
                $(".product__carousel-lastseen").owlCarousel({
                    loop: $('.one_viewed_product').length>4,
                    margin: 0,
                    nav: $('.one_viewed_product').length>4,
                    smartSpeed: 700,
                    autoplay: false,
                    navText: [
                        $('.one_viewed_product').length>4?'<i class="fa fa-chevron-left"></i>':'',
                        $('.one_viewed_product').length>4?'<i class="fa fa-chevron-right"></i>':''
                    ],
                    responsive: { 0: { items: 2 }, 768: { items: 3 }, 1024: { items: 4 } },
                })
            }

        }
    }, 'json')
        .fail(function(data, status, xhr){
            //show_message( 'Ошибка запроса' );
        })
        .always(function(data, status, xhr){
            process(false);
        })
}


var filterCitySelectInited = false;
var filterShopsSelectInited = false;


function initFilterVirtualSelects(){

    if(
        $('#available_city_sel').length > 0
        &&
        $('#available_shop_sel').length > 0
    ){

        filterCitySelectInited = false;
        filterShopsSelectInited = false;

        VirtualSelect.init({ ele: '#available_city_sel' });
        document.querySelector('#available_city_sel').addEventListener('afterOpen', function(){
            filterCitySelectInited = true;
        });

        // Фильтр по наличию  -  ВЫБОР ГОРОДА
        document.querySelector('#available_city_sel').addEventListener('change', function() {

            if( !isClearFilter ){

                if( filterCitySelectInited ){


                    if( this.value == 'empty' || this.value == '' ){

                        getFilterCitiesShopsBlock();

                    } else {

                        var cityName = $(this).find('div.vscomp-toggle-button div.vscomp-value').html();

                        getFilterCitiesShopsBlock( cityName );

                    }

                } else {

                    if( this.value == '' ){

                        getFilterCitiesShopsBlock();
                    }
                }
            }
        });


        VirtualSelect.init({
            ele: '#available_shop_sel',
            selectAllText: 'Выбрать все',
            allOptionsSelectedText: 'Всего',
            optionsSelectedText: 'выбрано',
            optionSelectedText: 'выбран',
            optionHeight: '30px',
            tooltipFontSize: '11px',
            tooltipMaxWidth: '230px'
        });
        document.querySelector('#available_shop_sel').addEventListener('afterOpen', function(){
            filterShopsSelectInited = true;
        });
        $('.filterNalBlock').show();

        // Фильтр по наличию  -  ВЫБОР МАГАЗИНА
        document.querySelector('#available_shop_sel').addEventListener('change', function() {

            var values = this.value;

            if( !isClearFilter ){

                if( filterShopsSelectInited ){

                    clearInterval(filterInterval);
                    filterInterval = setInterval(function(){
                        clearInterval(filterInterval);

                        $('.filterShopsNalCheckbox').remove();
                        for( key in values ){
                            controlName = values[key];
                            $('div.select_available_shop').prepend('<input class="filterShopsNalCheckbox" type="hidden" name="'+controlName+'" value="Y">');
                        }
                        filterGo();

                    }, 700);

                } else {

                    if( values.length == 0 ){

                        $('.filterShopsNalCheckbox').remove();
                        filterGo();
                    }
                }
            }
        });

    }

}



function getFilterCitiesShopsBlock( cityName = null ){
    var postParams = {isPost:'Y'};
    if( cityName != null ){
        postParams['city'] = cityName;
    }
    process(true);
    $.post("/ajax/filterShopsNalSelectCity.php", postParams, function(data){
        if (data.status == 'ok'){

            $('.filterNalBlock').replaceWith( data.html );
            initFilterVirtualSelects();

            filterGo();

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


// Открытие попапа бронирования (обувь)
function openProductShoesBookingModal( productID, productSize, shopID ){

    var postParams = {
        productID: productID,
        productSize: productSize,
        shopID: shopID,
    };
    process(true);
    $.post("/ajax/getBookingPopupHtml.php", postParams, function(data){
        if (data.status == 'ok'){

            $('#mainPopup #modelReservation').html( data.html );
            $(".phone___mask").mask("+7 (999) 999-99-99");

            $("body").addClass('css-scroll-fixed');
            var $popup = $('#mainPopup');
            $popup.fadeIn(200);

            /// /// ///
            $.cookie('BITRIX_SM_lastBookingPopupParams', productID+'|'+productSize+'|'+shopID, { path: '/' });
            $.cookie('BITRIX_SM_lastBookingURL', document.URL, { path: '/' });

            bookingProductID = productID;
            bookingProductSize = productSize;
            bookingShopID = shopID;

            if( data.openedNoAuthBookingPopup == 'Y' ){
                $.cookie('BITRIX_SM_openedNoAuthBookingPopup', 'Y', { path: '/' });
            } else {
                $.removeCookie('BITRIX_SM_openedNoAuthBookingPopup', { path: '/' });
            }
            /// /// ///

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


// Открытие попапа бронирования (Витма)
function openProductVitmaBookingModal( productID, shopID ){

    var postParams = {
        productID: productID,
        productSize: 'vitma',
        shopID: shopID,
    };
    process(true);
    $.post("/ajax/getBookingPopupHtml.php", postParams, function(data){
        if (data.status == 'ok'){

            $('#mainPopup #modelReservation').html( data.html );
            $(".phone___mask").mask("+7 (999) 999-99-99");

            $("body").addClass('css-scroll-fixed');
            var $popup = $('#mainPopup');
            $popup.fadeIn(200);

            /// /// ///
            $.cookie('BITRIX_SM_lastBookingPopupParams', productID+'|vitma|'+shopID, { path: '/' });
            $.cookie('BITRIX_SM_lastBookingURL', document.URL, { path: '/' });

            bookingProductID = productID;
            bookingProductSize = 'vitma';
            bookingShopID = shopID;

            if( data.openedNoAuthBookingPopup == 'Y' ){
                $.cookie('BITRIX_SM_openedNoAuthBookingPopup', 'Y', { path: '/' });
            } else {
                $.removeCookie('BITRIX_SM_openedNoAuthBookingPopup', { path: '/' });
            }
            /// /// ///

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


function openLastBookingPopup(){
    var openedNoAuthBookingPopup = $.cookie('BITRIX_SM_openedNoAuthBookingPopup');
    var lastBookingPopupParams = $.cookie('BITRIX_SM_lastBookingPopupParams');
    if(
        openedNoAuthBookingPopup != undefined
        &&
        lastBookingPopupParams != undefined
    ){
        lastBookingPopupParams = lastBookingPopupParams.split('|');
        var productID = lastBookingPopupParams[0];
        var productSize = lastBookingPopupParams[1];
        var shopID = lastBookingPopupParams[2];
        if( productSize == 'vitma' ){
            openProductVitmaBookingModal( productID, shopID );
        } else {
            openProductShoesBookingModal( productID, productSize, shopID );
        }
    }
}





$(document).ready(function(){

    initFilterVirtualSelects();








    // Авторизация в бронировании
    $(document).on('click', '.bookingAuthButton', function(e){
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
                var postParams = {
                    productID: bookingProductID,
                    shopID: bookingShopID,
                    form_data: $(this_form).serialize()
                };
                postParams['productSize'] = bookingProductSize;

                $.post("/ajax/bookingAuth.php", postParams, function(data){
                    if( data.status == 'ok' ){

                        $('#mainPopup #modelReservation').html( data.html );
                        $(".phone___mask").mask("+7 (999) 999-99-99");

                        $('.headerUserBlock').html( $(data.headerUserBlockHtml).html() );

                        /// /// ///
                        $.cookie('BITRIX_SM_lastBookingPopupParams', bookingProductID+'|'+bookingProductSize+'|'+bookingShopID, { path: '/' });

                        $.removeCookie('BITRIX_SM_openedNoAuthBookingPopup', { path: '/' });
                        /// /// ///

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



    // Добавление дисконтной карты в бронировании
    $(document).on('click', '.loyaltyCardAddButton', function(e){
        var button = $(this);
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
                    'text': 'Введите, пожалуйста, номер Вашей дисконтной карты!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);

                bookingCardNumber = loyalty_card;

                var postParams = {
                    productID: bookingProductID,
                    productSize: bookingProductSize,
                    shopID: bookingShopID,
                    loyalty_card: bookingCardNumber
                };
                $.post("/ajax/bookingGetPersonalPrice.php", postParams, function(data){
                    if( data.status == 'ok' ){

                        $('#mainPopup #modelReservation').html( data.html );
                        $(".phone___mask").mask("+7 (999) 999-99-99");

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



    // Бронирование товара
    $(document).on('click', '.productBookingButton', function(e){
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
            if ( $('.booking_auth_block:visible').length > 0 ){

                if ( login.length == 0 ){
                    errors.push({
                        'link': $(this_form).find("input[name=login]"),
                        'text': 'Введите, пожалуйста, Ваш логин/телефон!'
                    });
                } else if ( password.length == 0 ){
                    errors.push({
                        'link': $(this_form).find("input[name=password]"),
                        'text': 'Введите, пожалуйста, Ваш пароль!'
                    });
                }
            }

            // Если нет ошибок
            if ( errors.length == 0 ){

                var postParams = {
                    productID: bookingProductID,
                    shopID: bookingShopID,
                    cardNumber: bookingCardNumber,
                    form_data: $(this_form).serialize(),
                    productSize: bookingProductSize,
                    isVitmaProduct: $(button).hasClass('isVitmaProduct')?'Y':'N',
                };

                process(true);

                $.post("/ajax/productBooking.php", postParams, function(data){
                    if (data.status == 'ok'){

                        $('.modalPopup:visible').fadeOut(200, function(){});
                        window.location.href = "/personal/";

                    } else if ( data.status == 'need_auth' ){

                        $('#modelReservation:visible').html( data.html );
                        $(".phone___mask").mask("+7 (999) 999-99-99");
                        $('.headerUserBlock').html( $(data.headerUserBlockHtml).html() );

                        process(false);

                    } else if (data.status == 'error'){

                        show_error( this_form, data.text );
                        process(false);
                    }
                }, 'json')
                    .fail(function(data, status, xhr){
                        show_message( 'Ошибка запроса' );
                        process(false);
                    })
                    .always(function(data, status, xhr){})

            } else {

                show_error( this_form, errors );
            }
        }
    })




    // Открытие попапа бронирования
    $(document).on('click', '.productBookingModalButton', function(e){
        var button = $(this);
        if( !is_process(button) ){

            bookingShopID = $(this).attr('shop_id');

            if( $(button).hasClass('isVitmaProduct') ){

                openProductVitmaBookingModal( bookingProductID, bookingShopID );

            } else {

                openProductShoesBookingModal( bookingProductID, bookingProductSize, bookingShopID );
            }
        }
    })






    // Смена количества товаров на странице
    $(document).on('click', '.perpage___item', function(e){
        var link = $(this);
        if(
            !is_process(link)
            &&
            !$(link).hasClass('active')
        ){
            if( $(link).hasClass('is___search') ){
                search_list_count = $(link).html();
                // Принудительно ведём на 1-ую страницу
                search_page_number = 1;
                searchLoad( null, true );
            } else {
                catalog_list_count = $(link).html();
                // Принудительно ведём на 1-ую страницу
                catalog_page_number = 1;
                if( $(link).hasClass('is___catalogVitma') ){
                    catalogVitmaLoad( null, false, true );
                } else {
                    catalogLoad( null, false, true );
                }
            }
        }
    })



    // Смена страницы в пагинации
    $(document).on('click', '.paginationBlock a', function(e){
        e.preventDefault();
        var link = $(this);
        if(
            !is_process(link)
            &&
            !$(link).parents('div.pagination__item').hasClass('disabled')
            &&
            !$(link).parents('div.pagination__item').hasClass('active')
            &&
            $(link)[0].hasAttribute('data-pagenumber')
        ){
            if( $(link).hasClass('is___articles') ){
                articles_page_number = $(link).data('pagenumber');
                articlesLoad( null, true );
            } else if( $(link).hasClass('is___search') ){
                search_page_number = $(link).data('pagenumber');
                searchLoad( null, true );
            } else {
                catalog_page_number = $(link).data('pagenumber');
                if( $(link).hasClass('is___catalogVitma') ){
                    catalogVitmaLoad( null, false, true );
                } else {
                    catalogLoad( null, false, true );
                }
            }
        }
    });



    // Подгрузка товаров в КАТАЛОГЕ
    $(document).on('click', '.catalogMoreButton', function(e){
        var link = $(this);
        if( !is_process(link) ){
            catalog_page_number += 1;
            var params = {
                is_more_products: 'Y',
                products_cnt: filterAllProductsCNT,
                pages_cnt: filterAllPagesCNT,
            };
            if( $(link).hasClass('is___catalogVitma') ){
                catalogVitmaLoad(params, false, false );
            } else {
                catalogLoad(params, false, false );
            }
        }
    })


    // Подгрузка товаров в ПОИСКЕ
    $(document).on('click', '.searchMoreButton', function(e){
        var link = $(this);
        if( !is_process(link) ){
            search_page_number += 1;
            var params = {
                is_more_products: 'Y',
                products_cnt: searchProductsCNT,
                pages_cnt: searchPagesCNT,
            };
            searchLoad( params, false );
        }
    })

    // Подгрузка СТАТЬИ
    $(document).on('click', '.articlesMoreButton', function(e){
        var link = $(this);
        if( !is_process(link) ){
            articles_page_number += 1;
            var params = {
                is_more_articles: 'Y',
                products_cnt: articlesProductsCNT,
                pages_cnt: articlesPagesCNT,
            };
            articlesLoad( params, false );
        }
    })


    // Смена сортировки
    $(document).on('click', '.catalogSortBlockItem', function(e){

        var item = $(this);
        var input = $(item).parent().prev().prev();
        $(item).parents('ul').find('.select__item').removeClass('select__item__active');
        $(item).addClass('select__item__active');
        $(item).parents('div.select').find('.select__head').removeClass('open');
        $(item).parent().fadeOut();
        $(item).parent().prev().text( $(item).text() );
        $(input).val( $(item).attr('code') );

        var sortCode = $('input.sort___input').val();

        for(key in catalogSortList){
            catalogSortItem = catalogSortList[key];
            if( sortCode == catalogSortItem['code'] ){
                catalogSort = catalogSortItem;
            }
        }
        // Принудительно ведём на 1-ую страницу
        catalog_page_number = 1;

        if( $(item).hasClass('is___catalogVitma') ){
            catalogVitmaLoad( null, true );
        } else {
            catalogLoad( null, true );
        }
    })



    // ФИЛЬТР - чекбокс
    $(document).on('change', '.filter___number_checkbox', function(e){
        var input = $(this);

        /////////////////////////////
        clearInterval(filterInterval);
        filterInterval = setInterval(function(){
            clearInterval(filterInterval);

            filterGo();

        }, 700);
    })



    // ФИЛЬТР - Кнопка "Показать"
    $(document).on('click', '.filterShowButton', function(e){
        var link = $(this);
        if( !is_process( $(link) ) ){
            catalog_page_number = 1;
            if( $('.smartfilter').hasClass('is___catalogVitma') ){
                catalogVitmaLoad( null, true );
            } else {
                catalogLoad( null, true );
            }
        }
    })



    // ФИЛЬТР - Кнопка "Сбросить"
    $(document).on('click', '.filterResetButton', function(e){
        var link = $(this);
        if( !is_process( $(link) ) ){

            filterProcess = false;

            isClearFilter = true;
            catalog_page_number = 1;
            filterURL = pageURL;
            $('.filter___results p ').html('Найдено: подсчёт...');

            // Снимаем все чекбоксы
            $('.smartfilter input[type=checkbox]').prop('checked', false);

            // Диапазон цены - в мин/макс значения
            if( $('input.filterPriceSlider').length > 0 ){
                for (key in filterArPriceSlider) {
                    filterArPriceSlider[key].update({
                        from: $('input.filterPriceSlider').data('min'),
                        to: $('input.filterPriceSlider').data('max')
                    });
                }
            }

            // Числовые свойства - в мин/макс значения
            if( $('input.filterNumberSlider').length > 0 ){
                for( prop_id in filterNumberSliders ){
                    var filterNumberSlider = filterNumberSliders[ prop_id ];
                    for ( k2 in filterNumberSlider ){
                        filterNumberSlider[ k2 ].update({
                            from: $('input.filterNumberSlider_'+prop_id).data('min'),
                            to: $('input.filterNumberSlider_'+prop_id).data('max')
                        });
                    }
                }
            }

            // Наличие в городах
            if( $('#available_city_sel').length > 0 ){
                document.querySelector('#available_city_sel').setValue('empty');
            }

            // Наличие в магазинах
            if( $('#available_shop_sel').length > 0 ){
                document.querySelector('#available_shop_sel').reset();
            }

            $('.filterCitiesNalInput').remove();
            $('.filterShopsNalCheckbox').remove();
            $('.select_available_shop').hide();

            for( key in filterTrees ){
                var filterTree = filterTrees[key];
                $(filterTree).jstree('uncheck_all');
            }

            filterGo( true );
        }
    })





    // Подгрузка отзывов к товару
    $(document).on('click', '.moreProductReviewsButton', function(e){
        if( !is_process(this) ){
            var product_id = $(this).attr('product_id');
            var stop_ids = [];
            $('.productReviewItem').each(function(){
                var item_id = $(this).attr('item_id');
                stop_ids.push(item_id);
            });
            var postParams = { stop_ids: stop_ids, product_id: product_id };
            process(true);
            $.post("/ajax/moreProductReviews.php", postParams, function(data){
                if (data.status == 'ok'){
                    $('.moreProductReviewsBlock').before( data.html );
                    if( $('ost').length > 0 ){
                        $('.moreProductReviewsBlock').show();
                    } else {
                        $('.moreProductReviewsBlock').hide();
                    }
                    $('ost').remove();
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
    })


    // Установка звёздочек голосования в форме
    $(document).on( 'click', '.reviewForm .fa-star', function(){
        if( $(this).hasClass('active') ){
            $('.reviewForm .fa-star').removeClass('active');
            $('.reviewForm input[name=vote]').val(0);
        } else {
            var vote = $(this).data('cnt');
            var cnt = 0;
            $('.reviewForm .fa-star').each(function(){
                cnt++;
                if( cnt <= vote ){    $(this).addClass('active');    }
            });
            $('.reviewForm input[name=vote]').val( vote );
        }
    })


    // Создание нового отзыва к товару
    $(document).on('click', '.addProductReviewButton', function(e){
        $.noty.closeAll();
        if( !is_process(this) ){
            // Форма
            var this_form = $(this).parents('form');
            // Подготовка
            $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").removeClass("is___error");
            $(this_form).find('p.error___p').html('');
            // Задаём переменные
            var pluses = $(this_form).find("textarea[name=pluses]").val();
            var has_minuses_block = $(this_form).find("textarea[name=minuses]").length>0;
            var minuses = $(this_form).find("textarea[name=minuses]").val();
            var comment = $(this_form).find("textarea[name=comment]").val();
            var vote = $('.reviewForm .fa-star.active').length;
            var errors = [];
            // Проверки
            if (
                pluses.length == 0
                &&
                (has_minuses_block && minuses.length == 0)
                &&
                comment.length == 0
            ){
                errors.push({
                    'link': null,
                    'text': 'Укажите, пожалуйста, что либо: достоинства'+(has_minuses_block?', недостатки':'')+' или произвольный комментарий к товару!'
                });
            }
            // Если нет ошибок
            if ( errors.length == 0 ){
                process(true);
                var form_data = $(this_form).serialize();
                $.post("/ajax/addProductReview.php", {form_data:form_data}, function(data){
                    if (data.status == 'ok'){

                        $('.reviewForm .fa-star').removeClass('active');

                        if( 'html' in data ){
                            $('productReviewItems').html( data.html );
                        } else {
                            var n = noty({closeWith: ['button'], timeout: 100000, layout: 'center', type: 'success', text: "Ваш отзыв отправлен!<br>Он появится после модерации"})
                        }

                        $(this_form).find("input[type=text], input[type=email], input[type=password], textarea").val('');
                        $('.review__button').trigger('click');
                        if( 'html' in data ){
                            setTimeout(function(){
                                var destination = $('.productReviewItem').first().offset();
                                $('body, html').animate({scrollTop: destination.top - $("#bx-panel").outerHeight(true)}, 600);
                            }, 401)
                        }
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





    // Выбор размера в карточке товара
    $(document).on('click', '.sizeItem', function(e){
        $.noty.closeAll();
        if( !$(this).hasClass('active') ){
            var size = $(this).attr('size');
            $('.sizeItem').removeClass('active');
            $('.sizeItem[size='+size+']').addClass('active');
        }
    })

    // Переход к магазинам (desktop)
    $(document).on('click', '.toShopsButtonDesktop', function(e){
        $.noty.closeAll();
        // Каталог Витма
        if( $(this).hasClass('is___catalogVitma') ){
            var product_code = $(this).attr('product_code');
            var url = '/shops/'+product_code+'/';
            if( $(this).hasClass('hasFilterShops') ){
                url += '?shops='+$(this).attr('shop_xml_ids')
            }
            window.location.href = url;
            // Каталог обувь
        } else {
            if( $('.sizeItemDesktop.active').length > 0 ){
                var product_size = $('.sizeItem.active').attr('size');
                var product_code = $(this).attr('product_code');
                var url = '/shops/'+product_code+'/'+product_size+'/';
                if( $(this).hasClass('hasFilterShops') ){
                    url += '?shops='+$(this).attr('shop_xml_ids')
                }
                window.location.href = url;
            } else {
                var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Выберите, пожалуйста, размер!'});
            }
        }
    })

    // Переход к магазинам (mob)
    $(document).on('click', '.toShopsButtonMob', function(e){
        $.noty.closeAll();
        // Каталог Витма
        if( $(this).hasClass('is___catalogVitma') ){
            var product_code = $(this).attr('product_code');
            var url = '/shops/'+product_code+'/';
            if( $(this).hasClass('hasFilterShops') ){
                url += '?shops='+$(this).attr('shop_xml_ids')
            }
            window.location.href = url;
            // Каталог обувь
        } else {
            if( $('.sizeItemMob.active').length > 0 ){
                var product_size = $('.sizeItem.active').attr('size');
                var product_code = $(this).attr('product_code');
                var url = '/shops/'+product_code+'/'+product_size+'/';
                if( $(this).hasClass('hasFilterShops') ){
                    url += '?shops='+$(this).attr('shop_xml_ids')
                }
                window.location.href = url;
            } else {
                var n = noty({closeWith: ['hover'], timeout: 5000, layout: 'center', type: 'warning', text: 'Выберите, пожалуйста, размер!'});
            }
        }
    })



    $(document).on('click', '.select .select__head', function(e){
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


    $(document).on('click', '.productShopsResetButton', function(e){
        var url = document.URL;
        var ar = url.split('#')
        url = ar[0];
        var ar = url.split('?')
        url = ar[0];
        window.location.href = url;
    })


    // Фильтрация магазинов
    $(document).on('click', '.shops_filter_select .select__item', function(e){
        if(
            !is_process(this)
            &&
            !$(this).hasClass('select__item__active')
        ){

            var item = $(this);
            var input = $(item).parent().prev().prev();
            var input_name = $(input).attr('name');

            if( $('.shopsLoadArea').hasClass('isVitmaProduct') ){

                var city = $(item).text();

                getProductShopsVitma(
                    product_code,
                    city,
                    null,
                    'Y',
                    item,
                    input,
                    input_name
                );

            } else {

                if( input_name == 'shops_city' ){
                    var city = $(item).text();
                    var size = $('input[name=shops_size]').val();
                } else if( input_name == 'shops_size' ){
                    var city = $('input[name=shops_city]').val();
                    var size = $(item).text();
                }

                bookingProductSize = size;

                getProductShopsShoes (
                    product_code,
                    size,
                    city,
                    null,
                    'Y',
                    item,
                    input,
                    input_name
                );
            }
        }
    });

    $(document).click(function (e) {
        if (
            !$(e.target).closest('.select').length
            &&
            $('.loadingLayer:visible').length == 0
        ){
            $('.select__head').removeClass('open');
            $('.select__list, .select__lit').fadeOut();
        }
    });







})