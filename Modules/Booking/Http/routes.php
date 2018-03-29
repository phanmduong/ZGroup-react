<?php

$apiRoutes = function () {
    Route::get('/user/register', 'BookingApiController@userRegister');
};

$publicRoutes = function () {
    Route::get('/blogs', 'BookingController@blogs');
    Route::get('/user-packs', 'BookingController@allUserPacks');
    Route::post('/register/{campaignId?}', 'BookingController@appRegister');
    Route::post('/booking/{campaignId?}', 'BookingController@appBooking');
    Route::get('/history-registers', 'BookingController@historyRegister');
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
    Route::put('/register/{registerId}/assign-subscription', 'ManageBookingController@assignSubscription');
};

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\Booking\Http\Controllers'], $publicRoutes);
Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\Booking\Http\Controllers'], $manageapiRoutes);

Route::group(
    ['domain' => config('app.domain'), 'prefix' => '/api/v3/coworking-space', 'namespace' => 'Modules\Booking\Http\Controllers'],
    function () use ($publicRoutes, $apiRoutes) {
        Route::group([], $publicRoutes);
        Route::group([], $apiRoutes);
    }
);

Route::group(['domain' => config('app.domain'), 'prefix' => '/manageapi/v3/coworking-space', 'namespace' => 'Modules\Booking\Http\Controllers'], $apiRoutes);