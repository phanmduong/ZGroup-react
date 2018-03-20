<?php

Route::group(['middleware' => 'web', 'prefix' => 'password', 'namespace' => 'Modules\Password\Http\Controllers'], function()
{
    Route::get('/', 'PasswordController@index');
});

$routes = function () {
    Route::group(['prefix' => 'v2/password'], function (){
        route::post('store','PasswordController@store');
        route::post('edit/{id}','PasswordController@edit');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Password\Http\Controllers'], $routes);
