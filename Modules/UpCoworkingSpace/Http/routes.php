<?php

$publicRoutes = function () {
    Route::get('/', 'UpCoworkingSpaceController@index');
    Route::get('/tin-tuc-startup', 'UpCoworkingSpaceController@blog');
    Route::get('/blog/post/{post_id}', 'UpCoworkingSpaceController@post');
    Route::get('/conference-room', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/conference-room/{conferenceRoomId}', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/goi-thanh-vien-up-coworking-space/{userId?}/{campaignId?}', 'UpCoworkingSpaceController@memberRegister');
    Route::get('/su-kien', 'UpCoworkingSpaceController@event');
    Route::get('/events/{slug}', 'UpCoworkingSpaceController@eventDetail');
    Route::get('/events/{slug}/sign-up-form', 'UpCoworkingSpaceController@eventSignUpForm');
    Route::get('/su-kien-data','UpCoworkingSpaceController@getEventOfCurrentMonth');
    Route::get('/{slug}', 'UpCoworkingSpaceController@postBySlug');
};

$publicRoutes = function () {
    Route::get('/api/province', 'BookingController@province');
    Route::get('/api/province/{provinceId}/base', 'BookingController@basesInProvince');
    Route::get('/api/base', 'BookingController@allBases');
    Route::post('/api/register', 'BookingController@register');
    Route::get('/api/user-packs', 'BookingController@allUserPacks');
    Route::get('/api/user-pack/{userPackId}', 'BookingController@userPack');
    Route::get('/api/extract', 'BookingController@extract');
    Route::get('/api/extract-events', 'BookingController@extractEvents');
};

Route::group(['middleware' => 'web', 'domain' => 'keetool7.xyz', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => 'keetool4.test', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);

Route::group(['middleware' => 'web', 'domain' => 'keetool4.test', 'namespace' => 'Modules\Booking\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => 'keetool7.xyz', 'namespace' => 'Modules\Booking\Http\Controllers'], $publicRoutes);
