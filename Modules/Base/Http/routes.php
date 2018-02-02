<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/base', 'namespace' => 'Modules\Base\Http\Controllers'], function () {

    Route::get('/', 'ManageBaseApiController@getBases');
    Route::post('/', 'ManageBaseApiController@createBase');
    Route::put('/{baseId}/display', 'ManageBaseApiController@createBase');

    Route::post('/{baseId}/room', 'ManageBaseApiController@createRoom');
    Route::put('/{baseId}/room/{roomId}', 'ManageBaseApiController@editRoom');
    Route::get('/room-type', 'ManageBaseApiController@getRoomTypes');
    Route::put('/room-type/{roomTypeId}', 'ManageBaseApiController@editRoomType');
    Route::post('/room-type', 'ManageBaseApiController@createRoomType');

    Route::get('/{baseId}', 'ManageBaseApiController@getBase');
    Route::put('/{baseId}', 'ManageBaseApiController@editBase');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/province', 'namespace' => 'Modules\Base\Http\Controllers'], function () {
    Route::get('/all', 'ManageBaseApiController@getAllProvinces');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/room', 'namespace' => 'Modules\Base\Http\Controllers'], function () {
    Route::post('/{roomId}/seat', 'ManageBaseApiController@createSeat');
    Route::get('/{roomId}/seats', 'ManageBaseApiController@getSeats');
    Route::post('/{roomId}/seats', 'ManageBaseApiController@createSeats');
    Route::put('/seat/{seatId}', 'ManageBaseApiController@updateSeat');
    Route::put('/{roomId}/seat/{seatId}', 'ManageBaseApiController@editSeat');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/seat', 'namespace' => 'Modules\Base\Http\Controllers'], function () {
    Route::get('available', 'ManageBaseApiController@availableSeats');
});

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => '/v2', 'namespace' => 'Modules\Base\Http\Controllers'], function () {

    Route::get('/base/provinces', 'PublicApiController@provinces');
    Route::get('/base/province/{provinceId}', 'PublicApiController@basesInProvince');
    Route::get('/base/{baseId}/room', 'PublicApiController@baseRooms');
    Route::get('/blogs', 'PublicApiController@getAllBlogs');
    Route::get('/blog/{id}', 'PublicApiController@getDetailBlog');
});