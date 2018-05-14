<?php

$publicRoutes = function () {
    Route::get('/', 'TrongDongPalaceController@index');
    Route::get('/blogs1', 'TrongDongPalaceController@blogs');
    Route::get('/album', 'TrongDongPalaceController@album');
    Route::get('/blog/post/{postId}', 'TrongDongPalaceController@post');
    Route::get('/test', 'TrongDongPalaceController@test');
    Route::get('/contact-us', 'TrongDongPalaceController@contactUs');
    Route::get('/booking/{salerId?}/{campaignId?}', 'TrongDongPalaceController@booking');
    Route::get('/room/{roomId}/{salerId?}/{campaignId?}', 'TrongDongPalaceController@room');
    Route::get('/register/{roomId}/{salerId?}/{campaignId?}', 'TrongDongPalaceController@register');
    Route::post('/api/contact', 'TrongDongPalaceController@contactInfo');
    Route::post('/api/booking', 'TrongDongPalaceController@bookingApi');
};

$manageApiRoutes = function () {
    Route::get('/dashboard', 'TrongDongPalaceManageApiController@dashboard');
    Route::get('/room/all', 'TrongDongPalaceManageApiController@rooms');
    Route::get('/room-type/all', 'TrongDongPalaceManageApiController@roomTypes');
    Route::put('/register-room/change-time', 'TrongDongPalaceManageApiController@changeTime');
    Route::put('/register-room/change-status', 'TrongDongPalaceManageApiController@changeStatus');
    Route::put('/register-room/create', 'TrongDongPalaceManageApiController@createRegisterRoom');
    Route::put('/register-room/edit', 'TrongDongPalaceManageApiController@editRegisterRoom');
};

Route::group(['middleware' => 'web', 'domain' => 'keetool6.xyz', 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => 'trongdongpalace.test', 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => 'zgroup.dev', 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'],
    function () use ($manageApiRoutes) {
        Route::group(
            ['prefix' => 'v3'],
            function () use ($manageApiRoutes) {
                Route::group(['prefix' => 'trongdong'], $manageApiRoutes);
            }
        );
    }
);