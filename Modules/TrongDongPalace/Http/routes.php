<?php

$publicRoutes = function () {
    Route::get('/', 'TrongDongPalaceController@index');
    Route::get('/blog', 'TrongDongPalaceController@blog');
};

Route::group(['middleware' => 'web', 'domain' => "keetool6.xyz", 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => "trongdongpalace.test", 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);
