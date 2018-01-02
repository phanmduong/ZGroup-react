<?php

Route::group(['domain' => 'manage.' . config('app.domain'), 'prefix' => 'build-landing-page', 'namespace' => 'Modules\LandingPage\Http\Controllers'], function () {
    Route::get('/{landingpageId?}', 'LandingPageController@index');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'build-landing-page', 'namespace' => 'Modules\LandingPage\Http\Controllers'], function () {
    Route::post('/export', 'LandingPageApiController@export');
    Route::post('/save', 'LandingPageApiController@save');
    Route::get('/all', 'LandingPageApiController@getAll');
});

