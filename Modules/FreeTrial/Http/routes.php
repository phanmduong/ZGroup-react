<?php

$routes = function () {
    Route::post('/account', 'FreeTrialController@createAccount');
};
Route::group(['domain' => 'manage.keetool.xyz', 'prefix' => 'free-trial', 'namespace' => 'Modules\FreeTrial\Http\Controllers'], $routes);
