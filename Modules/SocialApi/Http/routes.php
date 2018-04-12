<?php

$routes = function () {
    Route::post('/register', 'RegisterController@register');
    Route::post('/login', 'LoginController@login');
    Route::get('/product', 'ProductApiController@products');
    Route::post('/report-by-email', 'ReportController@reportByEmail');
};

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'apiv2', 'namespace' => 'Modules\SocialApi\Http\Controllers'], $routes);
Route::group(['domain' => config('app.domain'), 'prefix' => '/api/v3', 'namespace' => 'Modules\SocialApi\Http\Controllers'], $routes);
