<?php

$routes = function () {
    //Vi
    Route::get('/', 'UpCoworkingSpaceController@index');
    Route::get('/tin-tuc-startup', 'UpCoworkingSpaceController@blog');
    Route::get('/blog/post/{post_id}', 'UpCoworkingSpaceController@post');
    Route::get('/phong-hop', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/phong-hop/{conferenceRoomId}', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/goi-thanh-vien-up-coworking-space/{userId?}/{campaignId?}', 'UpCoworkingSpaceController@memberRegister');
    Route::get('/su-kien', 'UpCoworkingSpaceController@event');
    Route::get('/events/{slug}', 'UpCoworkingSpaceController@eventDetail');
    Route::get('/events/{slug}/sign-up-form', 'UpCoworkingSpaceController@eventSignUpForm');
    Route::get('/su-kien-data','UpCoworkingSpaceController@getEventOfCurrentMonth');
    Route::get('/tam-nhin-su-menh-gia-tri-cot-loi-up-coworking-space', 'UpCoworkingSpaceController@missionAndVision');
    Route::get('/doi-tac-chien-luoc-cua-up','UpCoworkingSpaceController@partner');
    Route::get('/doi-tac-truyen-thong-cua-up','UpCoworkingSpaceController@media');
    Route::get('/nhung-cau-hoi-thuong-gap','UpCoworkingSpaceController@faqs');
    Route::get('/thong-tin-tuyen-dung','UpCoworkingSpaceController@talentAcquisition');
    Route::get('/lien-he-voi-up-co-working-space','UpCoworkingSpaceController@contact_us');
    Route::get('/up-founders','UpCoworkingSpaceController@founders');
    Route::get('/up-s-mentors','UpCoworkingSpaceController@mentors');
    Route::get('/dang-ky-trai-nghiem','UpCoworkingSpaceController@tour');
    Route::get('/{slug}', 'UpCoworkingSpaceController@postBySlug');

    //En
    Route::get('/en/mission-and-vision','UpCoworkingSpaceController@missionAndVision');
    Route::get('/en/media-partner','UpCoworkingSpaceController@media');
    Route::get('/en/faqs','UpCoworkingSpaceController@faqs');
    Route::get('/en/jobs-vacancies','UpCoworkingSpaceController@talentAcquisition');
    Route::get('/en/membership','UpCoworkingSpaceController@memberRegister');
    Route::get('/en/event', 'UpCoworkingSpaceController@event');
    Route::get('/en/meeting-room', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/en/up-founder','UpCoworkingSpaceController@founders');
    Route::get('/en/up-s-mentors','UpCoworkingSpaceController@mentors');
    Route::get('/en/contact-us','UpCoworkingSpaceController@contact_us');
    Route::get('/en/book-a-tour','UpCoworkingSpaceController@tour');
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
