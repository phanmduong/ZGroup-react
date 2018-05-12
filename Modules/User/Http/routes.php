<?php

$userManageApiRoutes = function () {
    Route::get('detail-profile', 'UserManageApiController@getDetailProfile');
    Route::get('detail-profile/class-lesson', 'UserManageApiController@teacherClassLessons');
    Route::get('detail-profile/work-shift', 'UserManageApiController@userWorkShifts');
    Route::get('detail-profile/shift', 'UserManageApiController@userShifts');
};

$userApiRoutes = function() {
    Route::get('user/schedule', 'UserApiController@userSchedule');    
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\User\Http\Controllers'], $userManageApiRoutes);
Route::group(['domain' => config('app.domain'), 'prefix' => 'api/v3', 'namespace' => 'Modules\User\Http\Controllers'], $userApiRoutes);
