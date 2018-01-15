<?php

Route::group(['middleware' => 'web', 'domain' => "sociologyhue.edu.{subfix}", 'namespace' => 'Modules\XHH\Http\Controllers'], function () {
    Route::get('/', 'XHHController@index');
    Route::get('/blog', 'XHHController@blog');
    Route::get('/about-us', 'XHHController@aboutUs');
    Route::get('/contact-us', 'XHHController@contactUs');
    Route::get('/all-books', 'XHHController@allBooks');
    Route::get('/blog/post/{post_id}', 'XHHController@post');
    Route::get('/book/{book_id}', 'XHHController@book');
});

Route::group(['domain' => "api.sociologyhue.edu.{subfix}", 'namespace' => 'Modules\XHH\Http\Controllers'], function () {
    Route::get('/blogs', 'XHHApiController@blogs');
    Route::get('/book/all', 'XHHApiController@allBooks');
    Route::get('/types-book', 'XHHApiController@typesBook');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\XHH\Http\Controllers'], function () {
    Route::get('/xhh-dashboard', 'XHHManageApiController@dashboard');
});