<?php

$routes = function () {
    Route::get('/', 'TechkidsController@index');
    Route::get('/khoa-hoc-lap-trinh/{id}', 'TechkidsController@course');
};

Route::group(['middleware' => 'web', 'domain' => 'techkids.test', 'namespace' => 'Modules\Techkids\Http\Controllers'], $routes);
Route::group(['middleware' => 'web', 'domain' => 'keetool1.xyz', 'namespace' => 'Modules\Techkids\Http\Controllers'], $routes);
