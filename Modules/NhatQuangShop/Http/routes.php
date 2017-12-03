<?php

Route::group(['middleware' => 'web', 'domain' => "nhatquangshop.{subfix}", 'namespace' => 'Modules\NhatQuangShop\Http\Controllers'], function () {
    Route::get('/', 'NhatQuangShopController@index');
    Route::get('/contact-us', 'NhatQuangShopController@contact_us');
    Route::get('/about-us', 'NhatQuangShopController@aboutUs');
    Route::post('/contact_information', 'NhatQuangShopController@contact_info');
    Route::get('/book/{good_id}', 'NhatQuangShopController@book');
    Route::get('/add-book/{goodId}', 'NhatQuangShopController@addGoodToCart');
    Route::get('/remove-book/{goodId}', 'NhatQuangShopController@removeBookFromCart');
    Route::get('/load-books-from-session', 'NhatQuangShopController@getGoodsFromSession');
    Route::get('/count-books-from-session', 'NhatQuangShopController@countGoodsFromSession');
    Route::get('/about-us', 'NhatQuangShopController@about_us');
    Route::post('/contact_information', 'NhatQuangShopController@contact_info');
    Route::get('/book/{good_id}', 'NhatQuangShopController@book');
    Route::get('/blog', 'NhatQuangShopController@blog');
    Route::get('/blog/post/{post_id}', 'NhatQuangShopController@post');
    Route::post('/save-order', "NhatQuangShopController@saveOrder");
    Route::get('/test', 'NhatQuangShopController@test');

    Route::get('/load-books-from-session/v2', 'NhatQuangApiController@getGoodsFromSession');
    Route::get('/flush', 'NhatQuangApiController@flush');
    Route::get('/add-book/{goodId}/v2', 'NhatQuangApiController@addGoodToCart');
    Route::get('/remove-book/{goodId}/v2', 'NhatQuangApiController@removeBookFromCart');
    Route::post('/save-order/v2', 'NhatQuangApiController@saveOrder');

});