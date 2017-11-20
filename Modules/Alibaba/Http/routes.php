<?php

Route::group(['middleware' => 'web', 'domain' => "alibaba.{subfix}", 'namespace' => 'Modules\Alibaba\Http\Controllers'], function () {
    Route::get('/', 'AlibabaController@index');
    Route::get('/blog', 'AlibabaController@blog');
    Route::get('/about-us', 'AlibabaController@aboutUs');
    Route::get('/courses', 'AlibabaController@courses');
    Route::get('/blog/post/{post_id}', 'AlibabaController@post');
    Route::get('/register/{courseId}/{userId?}/{campaignId?}', 'AlibabaController@register');
    Route::post('/store-register', 'RegisterController@storeRegisterClass');
    Route::get('/register-class/{classId}/{userId?}/{campaignId?}', 'RegisterController@getRegisterClass');
});
