<?php

$webRoutes = function () {
    Route::get('/', 'ElightManageController@index');
    Route::get('/blog', 'ElightManageController@blog');
    Route::get('/about-us', 'ElightManageController@aboutUs');
    Route::get('/courses', 'ElightManageController@courses');
    Route::get('/blog/post/{post_id}', 'ElightManageController@post');
    Route::get('/classes/{courseId}/{salerId?}/{campaignId?}', 'ElightManageController@register');
    Route::post('/store-register', 'RegisterController@storeRegisterClass');
    Route::get('/register-class/{classId}/{salerId?}/{campaignId?}', 'RegisterController@getRegisterClass');
    Route::get('/code-form', 'ElightManageController@codeForm');
    Route::post('/check', 'ElightManageController@check');
};

Route::group(['middleware' => 'web', 'domain' => 'keetool8.xyz',  'namespace' => 'Modules\ElightManage\Http\Controllers'], $webRoutes);
Route::group(['middleware' => 'web', 'domain' => 'elight.test', 'namespace' => 'Modules\ElightManage\Http\Controllers'], $webRoutes);
