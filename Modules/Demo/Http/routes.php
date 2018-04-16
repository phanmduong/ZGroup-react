<?php

$routes = function () {
    Route::get('/courses/{saler_id}/{campaign_id}', 'DemoController@courses');
    Route::get('/course/{LinkId?}/{salerId?}/{campaignId?}', 'DemoController@course');

    // Route::get('/blogs', 'TechkidsController@blogs');
    // Route::get('/category/{id}', 'TechkidsController@postByCategory');
    // Route::get('/{slug}', 'TechkidsController@postBySlug');

    // Route::get('/khoa-hoc-lap-trinh/{id}', 'TechkidsController@course');
};

Route::group(['middleware' => 'web', 'domain' => 'demo.test', 'namespace' => 'Modules\Demo\Http\Controllers'], $routes);
