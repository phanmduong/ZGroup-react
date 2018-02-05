<?php

$publicRoutes = function () {
    Route::get('/', 'TrongDongPalaceController@index');
    Route::get('/blog', 'TrongDongPalaceController@blog');
    Route::get('/blog/post/{postId}', 'TrongDongPalaceController@post');
    Route::get('/test', 'TrongDongPalaceController@test');
};

Route::group(['middleware' => 'web', 'domain' => config('app.domain'), 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => "trongdongpalace.test", 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);
