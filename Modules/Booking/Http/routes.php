<?php

$apiRoutes = function () {
    Route::get('/blogs', 'UpCoworkingSpaceApiController@blogs');
    Route::get('/api/province', 'UpCoworkingSpaceApiController@province');
    Route::get('/api/province/{provinceId}/base', 'UpCoworkingSpaceApiController@basesInProvince');
    Route::post('/api/register', 'UpCoworkingSpaceApiController@register');
    Route::get('/api/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
    Route::get('/api/user-pack/{userPackId}', 'UpCoworkingSpaceApiController@userPack');
    Route::get('/api/extract', 'UpCoworkingSpaceApiController@extract');
    Route::get('/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
    Route::post('/register/{campaignId?}', 'UpCoworkingSpaceApiController@appRegister');
    Route::get('/history-registers', 'UpCoworkingSpaceApiController@historyRegister');
};

$manageapiRoutes = function () {
    Route::get('/register', 'ManageBookingController@getRegisters');
    Route::get('/room-booking', 'ManageBookingController@getRoomBookings');
    Route::get('/user-pack', 'ManageBookingController@getUserPacks');
    Route::get('/user-pack/{userPackId}', 'ManageBookingController@getUserPack');
    Route::get('/user-pack/{userPackId}/subscription', 'ManageBookingController@getSubscriptions');
    Route::post('/user-pack/{userPackId}/subscription', 'ManageBookingController@createSubscriptions');
    Route::put('/user-pack/{userPackId}/subscription/{subcriptionId}', 'ManageBookingController@editSubscriptions');
    Route::get('/subscription-kind', 'ManageBookingController@getSubscriptionKinds');
    Route::post('/subscription-kind', 'ManageBookingController@createSubscriptionKind');
    Route::post('/user-pack', 'ManageBookingController@createUserPack');
    Route::post('/user-pack/{userPackId}/change-status', 'ManageBookingController@changeStatusUserPack');
    Route::put('/user-pack/{userPackId}', 'ManageBookingController@editUserPack');
    Route::post('/save-call', 'ManageBookingController@saveCall');
    Route::get('/saler', 'ManageBookingController@getAllSalers');
    Route::post('/booking', 'ManageBookingController@booking');
};

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\Booking\Http\Controllers'], $apiRoutes);
Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\Booking\Http\Controllers'], $manageapiRoutes);

Route::group(['domain' => config('app.domain'), 'prefix' => '/api/v3/coworking-space', 'namespace' => 'Modules\Booking\Http\Controllers'], $apiRoutes);
Route::group(['domain' => config('app.domain'), 'prefix' => '/api/v3/coworking-space', 'namespace' => 'Modules\Booking\Http\Controllers'], $manageapiRoutes);
