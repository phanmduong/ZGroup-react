<?php

$userManageApiRoutes = function () {
    Route::get('detail-profile', 'UserManageApiController@getDetailProfile');
    Route::get('detail-profile/class-lesson', 'UserManageApiController@teacherClassLessons');
    Route::get('detail-profile/work-shift', 'UserManageApiController@userWorkShifts');
    Route::get('detail-profile/shift', 'UserManageApiController@userShifts');
};


Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\User\Http\Controllers'], $userManageApiRoutes);
