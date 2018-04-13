<?php

$userManageApiRoutes = function () {
    Route::get('detail-profile', 'UserManageApiController@getDetailProfile');
};


Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\User\Http\Controllers'], $userManageApiRoutes);
