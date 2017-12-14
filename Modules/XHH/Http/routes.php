<?php

Route::group(['middleware' => 'web', 'domain' => "alibaba.{subfix}", 'namespace' => 'Modules\XHH\Http\Controllers'], function () {
    Route::get('/', 'XHHController@index');
    Route::get('/blog', 'AlibabaController@blog');
    Route::get('/blog/post/{post_id}', 'AlibabaController@post');
});
