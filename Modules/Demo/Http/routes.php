<?php

$routes = function () {
    Route::get('/courses/{saler_id?}/{campaign_id?}', 'DemoController@courses');
    Route::get('/course/{LinkId?}/{salerId?}/{campaignId?}', 'DemoController@course');
    Route::get('register/{class_id?}/{user_id?}/{campaign_id?}', 'DemoController@register');
    // Route::get('/blogs', 'TechkidsController@blogs');
    // Route::get('/category/{id}', 'TechkidsController@postByCategory');
    // Route::get('/{slug}', 'TechkidsController@postBySlug');

    // Route::get('/khoa-hoc-lap-trinh/{id}', 'TechkidsController@course');

    Route::group(['prefix' => 'api/v3'], function(){
        Route::get('register', 'DemoApiController@register');
    });
};

Route::group(['middleware' => 'web', 'domain' => 'demo.test', 'namespace' => 'Modules\Demo\Http\Controllers'], $routes);
