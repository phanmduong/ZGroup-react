<?php

$routes = function () {
    //En
    Route::get('/en', 'UpCoworkingSpaceController@index');
    Route::get('/en/vietnamese-startup-news', 'UpCoworkingSpaceController@blog');
    Route::get('/en/mission-and-vision', 'UpCoworkingSpaceController@missionAndVision');
    Route::get('/en/media-partner', 'UpCoworkingSpaceController@media');
    Route::get('/en/faqs', 'UpCoworkingSpaceController@faqs');
    Route::get('/en/jobs-vacancies', 'UpCoworkingSpaceController@talentAcquisition');
    Route::get('/en/membership', 'UpCoworkingSpaceController@memberRegister');
    Route::get('/en/event', 'UpCoworkingSpaceController@event');
    Route::get('/en/meeting-room', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/en/up-founder', 'UpCoworkingSpaceController@founders');
    Route::get('/en/up-s-mentors', 'UpCoworkingSpaceController@mentors');
    Route::get('/en/contact-us', 'UpCoworkingSpaceController@contact_us');
    Route::get('/en/book-a-tour', 'UpCoworkingSpaceController@tour');
    Route::get('/en/strategic-partner', 'UpCoworkingSpaceController@partner');
    Route::get('/en/private-office','UpCoworkingSpaceController@private_room');
    Route::get('/en/virtual-office','UpCoworkingSpaceController@virtual_office');
    Route::get('/en/accounting','UpCoworkingSpaceController@accounting');
    Route::get('/en/legal-consulting','UpCoworkingSpaceController@legal_consulting');
    Route::get('/en/up-luong-yen','UpCoworkingSpaceController@luong_yen');
    Route::get('/en/up-bach-khoa-ha-noi','UpCoworkingSpaceController@bach_khoa');
    Route::get('/en/up-kim-ma','UpCoworkingSpaceController@kim_ma');
    Route::get('/en/up-lang-ha','UpCoworkingSpaceController@lang_ha');
    Route::get('/en/coworking-space-ho-chi-minh','UpCoworkingSpaceController@hcm');
    Route::get('/en/creative-lab-up-maker-space','UpCoworkingSpaceController@up_lab');
    Route::get('/en/up-s-members','UpCoworkingSpaceController@members');

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
    Route::get('/su-kien-data', 'UpCoworkingSpaceController@getEventOfCurrentMonth');
    Route::get('/tam-nhin-su-menh-gia-tri-cot-loi-up-coworking-space', 'UpCoworkingSpaceController@missionAndVision');
    Route::get('/doi-tac-chien-luoc-cua-up', 'UpCoworkingSpaceController@partner');
    Route::get('/doi-tac-truyen-thong-cua-up', 'UpCoworkingSpaceController@media');
    Route::get('/nhung-cau-hoi-thuong-gap', 'UpCoworkingSpaceController@faqs');
    Route::get('/thong-tin-tuyen-dung', 'UpCoworkingSpaceController@talentAcquisition');
    Route::get('/lien-he-voi-up-co-working-space', 'UpCoworkingSpaceController@contact_us');
    Route::get('/up-founders', 'UpCoworkingSpaceController@founders');
    Route::get('/up-s-mentors', 'UpCoworkingSpaceController@mentors');
    Route::get('/dang-ky-trai-nghiem', 'UpCoworkingSpaceController@tour');
    Route::get('/thue-phong-lam-viec','UpCoworkingSpaceController@private_room');
    Route::get('/van-phong-ao','UpCoworkingSpaceController@virtual_office');
    Route::get('/accounting','UpCoworkingSpaceController@accounting');
    Route::get('/tu-van-doanh-nghiep','UpCoworkingSpaceController@legal_consulting');
    Route::get('/up-luong-yen','UpCoworkingSpaceController@luong_yen');
    Route::get('/up-bach-khoa-ha-noi','UpCoworkingSpaceController@bach_khoa');
    Route::get('/up-kim-ma','UpCoworkingSpaceController@kim_ma');
    Route::get('/up-lang-ha','UpCoworkingSpaceController@lang_ha');
    Route::get('/coworking-space-ho-chi-minh','UpCoworkingSpaceController@hcm');
    Route::get('/creative-lab-up-maker-space','UpCoworkingSpaceController@up_lab');
    Route::get('/up-s-members','UpCoworkingSpaceController@members');

    Route::get('/{slug}', 'UpCoworkingSpaceController@postBySlug');
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

Route::group(['middleware' => ['web', 'up'], 'domain' => 'keetool7.xyz', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $routes);
Route::group(['middleware' => ['web', 'up'], 'domain' => 'keetool7.test', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $routes);

Route::group(['middleware' => 'web', 'domain' => 'keetool7.test', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => 'keetool7.xyz', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
