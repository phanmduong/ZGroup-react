<?php

Route::group(['prefix' => 'staff', 'namespace' => 'Modules\Staff\Http\Controllers'], function () {
    Route::post('/', 'StaffApiController@createStaff');


    Route::get("/{staffId}/chart/card","@countStaffCards");
});
