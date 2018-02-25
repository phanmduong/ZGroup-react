<?php

$publicRoutes = function () {
    Route::get('/', 'UpCoworkingSpaceController@index');
    Route::get('/blog', 'UpCoworkingSpaceController@blog');
    Route::get('/blog/post/{post_id}', 'UpCoworkingSpaceController@post');
    Route::get('/conference-room', 'UpCoworkingSpaceController@conferenceRoom');
    Route::get('/conference-room/{conferenceRoomId}', 'UpCoworkingSpaceController@conferenceRoom');

    Route::get('/member-register/{campaignId?}/{userId?}', 'UpCoworkingSpaceController@memberRegister');

    Route::get('/api/province', 'UpCoworkingSpaceApiController@province');
    Route::get('/api/province/{provinceId}/base', 'UpCoworkingSpaceApiController@basesInProvince');
    Route::post('/api/register', 'UpCoworkingSpaceApiController@register');
    Route::get('/api/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
};

$apiRoutes = function () {
    Route::get('/blogs', 'UpCoworkingSpaceController@blogs');
    Route::get('/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
    Route::post('/register/{campaignId?}', 'UpCoworkingSpaceApiController@register');
    Route::get('/history-registers', 'UpCoworkingSpaceApiController@historyRegister');
};

$manageapiRoutes = function () {
    Route::get('/register', 'UpCoworkingSpaceManageApiController@getRegisters');
    Route::get('/user-pack', 'UpCoworkingSpaceManageApiController@getUserPacks');
    Route::get('/user-pack/{userPackId}', 'UpCoworkingSpaceManageApiController@getUserPack');
    Route::get('/user-pack/{userPackId}/subscription', 'UpCoworkingSpaceManageApiController@getSubscriptions');
    Route::post('/user-pack/{userPackId}/subscription', 'UpCoworkingSpaceManageApiController@createSubscriptions');
    Route::put('/user-pack/{userPackId}/subscription/{subcriptionId}', 'UpCoworkingSpaceManageApiController@editSubscriptions');
    Route::get('/subscription-kind', 'UpCoworkingSpaceManageApiController@getSubscriptionKinds');
    Route::post('/subscription-kind', 'UpCoworkingSpaceManageApiController@createSubscriptionKind');
    Route::post('/user-pack', 'UpCoworkingSpaceManageApiController@createUserPack');
    Route::post('/user-pack/{userPackId}/change-status', 'UpCoworkingSpaceManageApiController@changeStatusUserPack');
    Route::put('/user-pack/{userPackId}', 'UpCoworkingSpaceManageApiController@editUserPack');
    Route::post('/save-call', 'UpCoworkingSpaceManageApiController@saveCall');
};

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $apiRoutes);
Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $manageapiRoutes);

Route::group(['domain' => config('app.domain'), 'prefix' => '/api/v3/coworking-space', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $apiRoutes);
Route::group(['domain' => config('app.domain'), 'prefix' => '/api/v3/coworking-space', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $manageapiRoutes);

Route::group(['middleware' => 'web', 'domain' => 'quanca.net', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
Route::group(['middleware' => 'web', 'domain' => 'keetool4.test', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $publicRoutes);
