<?php

$routes = function () {
    Route::get('/', 'TechkidsController@index');
    Route::get('/blogs', 'TechkidsController@blogs');
};

Route::group(['middleware' => 'web', 'domain' => 'techkids.test', 'namespace' => 'Modules\Techkids\Http\Controllers'], $routes);

