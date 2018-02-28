<?php
Route::group(['domain' => 'manage.' . config('app.domain'), 'prefix' => 'build-landing-page', 'namespace' => 'Modules\LandingPage\Http\Controllers'], function () {
    Route::get('/{landingpageId?}', 'LandingPageController@index');
});

$buildLandingPageRoutes = function () {
    Route::group(['prefix' => 'build-landing-page'], function () {
        Route::post('/export', 'LandingPageApiController@export');
        Route::post('/save', 'LandingPageApiController@save');
        Route::get('/all', 'LandingPageApiController@getAll');
        Route::delete('/{landingPageId}/delete', 'LandingPageApiController@deleteLandingPage');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\LandingPage\Http\Controllers'], $buildLandingPageRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\LandingPage\Http\Controllers'],
    function () use ($buildLandingPageRoutes) {
        Route::group(['prefix' => 'v3'], $buildLandingPageRoutes);
    });

