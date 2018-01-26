<?php

$apiRoutes = function () {
    Route::get('/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
    Route::post('/register', 'UpCoworkingSpaceApiController@register');
};

$manageapiRoutes = function () {
    Route::get('/register', 'UpCoworkingSpaceManageApiController@allRegisters');
};


Route::group(['domain' => "api." . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $apiRoutes);
Route::group(['domain' => "manageapi." . config('app.domain'), 'prefix' => 'coworking-space', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $apiRoutes);
