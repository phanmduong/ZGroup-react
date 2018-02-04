<?php

$publicRoutes = function () {
    Route::get('/', 'UpCoworkingSpaceController@index');
    Route::get('/blog', 'UpCoworkingSpaceController@blog');
    Route::get('/blog/post/{post_id}', 'UpCoworkingSpaceController@post');
    Route::get('/conference-room', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/conference-room/{conferenceRoomId}', 'UpCoworkingSpaceController@conferenceRoom');

    Route::get('/api/province', 'UpCoworkingSpaceApiController@province');
    Route::get('/api/province/{provinceId}/base', 'UpCoworkingSpaceApiController@basesInProvince');
    Route::post('/api/register', 'UpCoworkingSpaceApiController@register');
    Route::get('/api/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
};

Route::group(['middleware' => 'web', 'domain' => "keetool6.xyz", 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => "trongdongpalace.test", 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
