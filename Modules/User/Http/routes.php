<?php

$userManageApiRoutes = function () {
    Route::get('detail-profile', 'UserManageApiController@getDetailProfile');
    Route::get('detail-profile/class-lessons', 'UserManageApiController@teacherClassLessons');
};


Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\User\Http\Controllers'], $userManageApiRoutes);
