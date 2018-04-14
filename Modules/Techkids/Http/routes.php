<?php

$routes = function () {
    Route::get('/', 'TechkidsController@index');
};

Route::group(['middleware' => 'web', 'domain' => 'keetool3.{subfix}', 'namespace' => 'Modules\Techkids\Http\Controllers'], $routes);

