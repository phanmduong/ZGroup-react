<?php


$routes = function () {
    Route::group(['prefix' => 'sms'], function () {
        Route::get("/test","ManageSmsApiController@test");
    });
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\Sms\Http\Controllers'], $routes);