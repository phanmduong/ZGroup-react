<?php

$staffRoutes = function () {
    Route::group(['prefix' => 'staff'], function () {
        Route::post('/', 'StaffApiController@createStaff');
        Route::get("/", "StaffApiController@getStaffs");
        Route::post('/{staffId}/{workId}','StaffApiController@changeStatusInWork');
        Route::post('/{staffId}/{workId}/extension','StaffApiController@extensionWork');
        Route::post('{staffId}/{workId}/acceptHire','StaffApiController@hireWork');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Staff\Http\Controllers'], $staffRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Staff\Http\Controllers'],
    function () use($staffRoutes){
        Route::group(['prefix' => 'v3'], $staffRoutes);
    });
