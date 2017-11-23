<?php

Route::group(['middleware' => 'web', 'domain' => "alibaba.{subfix}", 'namespace' => 'Modules\Alibaba\Http\Controllers'], function () {
    Route::get('/', 'AlibabaController@index');
    Route::get('/blog', 'AlibabaController@blog');
    Route::get('/about-us', 'AlibabaController@aboutUs');
    Route::get('/courses', 'AlibabaController@courses');
    Route::get('/blog/post/{post_id}', 'AlibabaController@post');
    Route::get('/register/{courseId}/{salerId?}/{campaignId?}', 'AlibabaController@register');
    Route::post('/store-register', 'RegisterController@storeRegisterClass');
    Route::get('/register-class/{classId}/{salerId?}/{campaignId?}', 'RegisterController@getRegisterClass');
    Route::get('/code-form', 'AlibabaController@codeForm');
    Route::post('/check', 'AlibabaController@check');
});
