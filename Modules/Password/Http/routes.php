<?php

Route::group(['middleware' => 'web', 'prefix' => 'password', 'namespace' => 'Modules\Password\Http\Controllers'], function()
{
    Route::get('/', 'PasswordController@index');
});

$routes = function () {
    Route::group(['prefix' => 'v2/password'], function (){
        route::post('store/{code}','PasswordController@store');
        route::put('edit/{code}/{id}','PasswordController@edit');
        route::get('all/{code}','PasswordController@show');
        route::delete('delete/{id}','PasswordController@destroy');
        route::get('passwords','PasswordController@showAll');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Password\Http\Controllers'], $routes);
