<?php

Route::group(['middleware' => 'web', 'domain' => 'sociologyhue.edu.{subfix}', 'namespace' => 'Modules\XHH\Http\Controllers'], function () {
    Route::get('/', 'XHHController@index');
    Route::get('/blog', 'XHHController@blog');
    Route::get('/about-us', 'XHHController@aboutUs');
    Route::get('/contact-us', 'XHHController@contactUs');
    Route::get('/all-books', 'XHHController@allBooks');
    Route::get('/blog/post/{post_id}', 'XHHController@post');
    Route::get('/book/{book_id}', 'XHHController@book');
});

$apiRoutes = function () {
    Route::get('/blogs', 'XHHApiController@blogs');
    Route::get('/book/all', 'XHHApiController@allBooks');
    Route::get('/types-book', 'XHHApiController@typesBook');
};

$manageApiRoutes = function () {
    Route::get('/xhh-dashboard', 'XHHManageApiController@dashboard');
};

// new routes
Route::group(['domain' => 'api.sociologyhue.edu.{subfix}', 'namespace' => 'Modules\XHH\Http\Controllers'], $apiRoutes);
Route::group(['domain' => 'sociologyhue.edu.{subfix}', 'prefix' => '/api/v3', 'namespace' => 'Modules\XHH\Http\Controllers'], $apiRoutes);

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\XHH\Http\Controllers'], $manageApiRoutes);
Route::group(['domain' => config('app.domain'), 'prefix' => '/manageapi/v3', 'namespace' => 'Modules\XHH\Http\Controllers'], $manageApiRoutes);
