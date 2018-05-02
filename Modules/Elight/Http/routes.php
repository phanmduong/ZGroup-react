<?php

$webRoutes = function () {
    Route::get('/', 'ElightController@index');
    Route::get('/blog', 'ElightController@blog');
    Route::get('/flush', 'ElightController@flush');
    Route::get('/about-us', 'ElightController@aboutUs');
    Route::get('/contact-us', 'ElightController@contactUs');
    Route::get('/all-books', 'ElightController@allBooks');
    Route::get('/blog/post/{post_id}', 'ElightController@post');

    Route::get('/load-books-from-session', 'ElightController@getGoodsFromSession');
    Route::get('/add-book/{goodId}', 'ElightController@addGoodToCart');
    Route::get('/remove-book/{goodId}', 'ElightController@removeBookFromCart');
    Route::post('/save-order', 'ElightController@saveOrder');
    Route::get('/count-books-from-session', 'ElightController@countGoodsFromSession');
    Route::get('/flush', 'ElightController@flush');
    Route::get('/province', 'ElightController@provinces');
    Route::get('/district/{provinceId}', 'ElightController@districts');

    Route::get('/book/{book_id}/{term_id?}/{lesson_id?}', 'ElightController@book');

    // Sending mail route
    Route::post('/contact_information', 'ElightSendingMailController@contact_info');
    Route::post('/index_information', 'ElightSendingMailController@index_info');
    Route::post('/book_information', 'ElightSendingMailController@book_info');
    Route::post('/aboutus_information', 'ElightSendingMailController@aboutus_info');

    Route::get('/category/search', 'ElightController@searchCategory');
};

$routes = function () {
    Route::get('/lesson-detail/{lesson_id}', 'ElightPublicApiController@lesson');
};


Route::group(['middleware' => 'web', 'domain' => 'elightbook.{subfix}', 'namespace' => 'Modules\Elight\Http\Controllers'], $webRoutes);
Route::group(['middleware' => 'web', 'domain' => 'keetool3.{subfix}', 'namespace' => 'Modules\Elight\Http\Controllers'], $webRoutes);

Route::group(['domain' => 'api.elightbook.{subfix}', 'namespace' => 'Modules\Elight\Http\Controllers'], $routes);
Route::group(['domain' => 'api.keetool3.{subfix}', 'namespace' => 'Modules\Elight\Http\Controllers'], $routes);
