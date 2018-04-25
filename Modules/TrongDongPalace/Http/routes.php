<?php

$publicRoutes = function () {
    Route::get('/', 'TrongDongPalaceController@index');
    Route::get('/blog', 'TrongDongPalaceController@blog');
    Route::get('/blog/post/{postId}', 'TrongDongPalaceController@post');
    Route::get('/test', 'TrongDongPalaceController@test');
    Route::get('/contact-us', 'TrongDongPalaceController@contactUs');
    Route::get('/booking/{salerId?}/{campaignId?}', 'TrongDongPalaceController@booking');
    Route::get('/room/{roomId}/{salerId?}/{campaignId?}', 'TrongDongPalaceController@room');
    Route::post('/api/contact', 'TrongDongPalaceController@contactInfo');
    Route::post('/api/booking', 'TrongDongPalaceController@bookingApi');
};

$namespaceRoutes = function () {
    Route::get('/dashboard', 'TrongDongPalaceManageApiController@dashboard');
};

Route::group(['middleware' => 'web', 'domain' => 'keetool6.xyz', 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => 'trongdongpalace.test', 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'], $publicRoutes);

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\TrongDongPalace\Http\Controllers'],
    function () use ($namespaceRoutes) {
        Route::group(
            ['prefix' => 'v3'],
            function () use ($namespaceRoutes) {
                Route::group(['prefix' => 'trongdong'], $namespaceRoutes);
            }
        );
    }
);