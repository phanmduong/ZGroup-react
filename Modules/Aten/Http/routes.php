<?php

$webRoutes = function () {
    Route::get('/', 'AtenController@index');
    Route::get('/blog', 'AtenController@blog');
    Route::get('/about-us', 'AtenController@aboutUs');
    Route::get('/courses', 'AtenController@courses');
    Route::get('/blog/post/{post_id}', 'AtenController@post');
    Route::get('/classes/{courseId}/{salerId?}/{campaignId?}', 'AtenController@register');
    Route::post('/store-register', 'RegisterController@storeRegisterClass');
    Route::get('/register-class/{classId}/{salerId?}/{campaignId?}', 'RegisterController@getRegisterClass');
    Route::get('/code-form', 'AtenController@codeForm');
    Route::post('/check', 'AtenController@check');
};

// Route::group(['middleware' => 'web', 'domain' => 'keetool8.xyz', 'namespace' => 'Modules\Aten\Http\Controllers'], $webRoutes);
Route::group(['middleware' => 'web', 'domain' => 'aten.test', 'namespace' => 'Modules\Aten\Http\Controllers'], $webRoutes);
