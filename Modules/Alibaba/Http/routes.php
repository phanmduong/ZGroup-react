<?php

Route::group(['middleware' => 'web', 'domain' => "alibabaenglish.edu.{subfix}", 'namespace' => 'Modules\Alibaba\Http\Controllers'], function () {
    Route::get('/', 'AlibabaController@index');
    Route::get('/blog', 'AlibabaController@blog');
    Route::get('/about-us', 'AlibabaController@aboutUs');
    Route::get('/courses', 'AlibabaController@courses');
    Route::get('/blog/post/{post_id}', 'AlibabaController@post');
    Route::get('/classes/{courseId}/{salerId?}/{campaignId?}', 'AlibabaController@register');
    Route::post('/store-register', 'RegisterController@storeRegisterClass');
    Route::get('/register-class/{classId}/{salerId?}/{campaignId?}', 'RegisterController@getRegisterClass');
    Route::get('/code-form', 'AlibabaController@codeForm');
    Route::post('/check', 'AlibabaController@check');
});

Route::group(['domain' => "manageapi." . config('app.domain'), 'namespace' => 'Modules\Alibaba\Http\Controllers'], function () {
    Route::get('/alibaba/register-list', 'AlibabaManageApiController@registerList');
    Route::post('/alibaba-change-call-status-student', 'AlibabaManageApiController@change_call_status');
    Route::put('/alibaba/register/{registerId}', 'AlibabaManageApiController@editRegister');
    Route::get('/alibaba/class/all', 'AlibabaManageApiController@get_classes');
    Route::post('/alibaba/class/delete', 'AlibabaManageApiController@delete_class');
});
