<?php

$apiRoutes = function () {
    Route::get('/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
    Route::post('/register', 'UpCoworkingSpaceApiController@register');
};

$manageapiRoutes = function () {
    Route::get('/register', 'UpCoworkingSpaceManageApiController@getRegisters');
    Route::get('/user-pack', 'UpCoworkingSpaceManageApiController@getUserPacks');
    Route::get('/user-pack/{userPackId}/subscription', 'UpCoworkingSpaceManageApiController@getSubscriptions');
    Route::post('/user-pack/{userPackId}/subscription', 'UpCoworkingSpaceManageApiController@createSubscriptions');
    Route::get('/subscription-kind', 'UpCoworkingSpaceManageApiController@getSubscriptionKinds');
    Route::post('/subscription-kind', 'UpCoworkingSpaceManageApiController@createSubscriptionKind');
    Route::post('user-pack','UpCoworkingSpaceManageApiController@createUserPack');
    Route::put('user-pack/{userPackId}','UpCoworkingSpaceManageApiController@editUserPack');
};


Route::group(['domain' => "api." . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $apiRoutes);
Route::group(['domain' => "manageapi." . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $manageapiRoutes);
