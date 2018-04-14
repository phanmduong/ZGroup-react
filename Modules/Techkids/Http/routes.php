<?php

$routes = function () {
    Route::get('/', 'TechkidsController@index');
};

Route::group(['middleware' => 'web', 'domain' => 'techkids.test', 'namespace' => 'Modules\Techkids\Http\Controllers'], $routes);

