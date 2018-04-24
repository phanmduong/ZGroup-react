<?php

$routes = function () {
    Route::get('/account', 'FreeTrialController@createAccount');
};
Route::group(['domain' => 'api.keetool.xyz', 'prefix' => 'free-trial', 'namespace' => 'Modules\FreeTrial\Http\Controllers'], $routes);
