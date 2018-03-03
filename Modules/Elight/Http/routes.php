<?php

Route::group(['middleware' => 'web', 'domain' => 'keetool3.{subfix}', 'namespace' => 'Modules\Elight\Http\Controllers'], function () {
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

    Route::get('/sach/{book_id}/{lesson_id?}', 'ElightController@book');
});

$routes = function () {
    Route::get('/lesson-detail/{lesson_id}', 'ElightPublicApiController@lesson');
};
Route::group(['domain' => 'api.keetool3.{subfix}', 'namespace' => 'Modules\Elight\Http\Controllers'], $routes);
Route::group(['domain' => 'keetool3.{subfix}', 'prefix' => '/api/v3', 'namespace' => 'Modules\Elight\Http\Controllers'], $routes);
