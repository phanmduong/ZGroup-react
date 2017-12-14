<?php

Route::group(['middleware' => 'web', 'domain' => "54.169.191.45", 'namespace' => 'Modules\XHH\Http\Controllers'], function () {
    Route::get('/', 'XHHController@index');
    Route::get('/blog', 'XHHController@blog');
    Route::get('/blog/post/{post_id}', 'XHHController@post');
});
