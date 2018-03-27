<?php

$routes = function () {
    Route::group(['prefix' => 'v2/password'], function (){
        route::get('passwords','PasswordController@showAll');
        route::post('store','PasswordController@store');
        route::put('edit/{id}','PasswordController@edit');
        route::delete('delete/{id}','PasswordController@destroy');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Password\Http\Controllers'], $routes);
