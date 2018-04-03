<?php

$routes = function () {
    //Vi
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
    Route::get('/tam-nhin-su-menh-gia-tri-cot-loi-up-coworking-space','UpCoworkingSpaceController@missionAndVision');
    Route::get('/doi-tac-chien-luoc-cua-up','UpCoworkingSpaceController@partner');

    //En
    Route::get('/blog/post/{post_id}', 'UpCoworkingSpaceController@post');
    Route::get('/en/meeting-room', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/en/meeting-room/{conferenceRoomId}', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/en/membership/{userId?}/{campaignId?}', 'UpCoworkingSpaceController@memberRegister');
    Route::get('/en/event', 'UpCoworkingSpaceController@event');
    Route::get('/en/event/{slug}', 'UpCoworkingSpaceController@eventDetail');
    Route::get('/en/event/{slug}/sign-up-form', 'UpCoworkingSpaceController@eventSignUpForm');
    Route::get('/en/mission-and-vision','UpCoworkingSpaceController@missionAndVision');
    Route::get('/en/media-partner','UpCoworkingSpaceController@partner');
};

$publicRoutes = function () {
    Route::get('/api/province', 'UpCoworkingSpaceApiController@province');
    Route::get('/api/province/{provinceId}/base', 'UpCoworkingSpaceApiController@basesInProvince');
    Route::get('/api/base', 'UpCoworkingSpaceApiController@allBases');
    Route::post('/api/register', 'UpCoworkingSpaceApiController@register');
    Route::get('/api/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
    Route::get('/api/user-pack/{userPackId}', 'UpCoworkingSpaceApiController@userPack');
    Route::get('/api/extract', 'UpCoworkingSpaceApiController@extract');
    Route::get('/api/extract-events', 'UpCoworkingSpaceApiController@extractEvents');
};

Route::group(['middleware' => 'web', 'domain' => 'keetool7.xyz', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $routes);
Route::group(['middleware' => 'web', 'domain' => 'keetool4.test', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $routes);

Route::group(['middleware' => 'web', 'domain' => 'keetool4.test', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => 'keetool7.xyz', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
