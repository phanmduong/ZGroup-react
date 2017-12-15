<?php

Route::group(['middleware' => 'web', 'domain' => "quanca.net", 'namespace' => 'Modules\XHH\Http\Controllers'], function () {
    Route::get('/', 'XHHController@index');
    Route::get('/blog', 'XHHController@blog');
    Route::get('/about-us', 'XHHController@aboutUs');
    Route::get('/contact-us', 'XHHController@contactUs');
    Route::get('/all-books', 'XHHController@allBooks');
    Route::get('/blog/post/{post_id}', 'XHHController@post');
    Route::get('/book/{book_id}', 'XHHController@book');
});
