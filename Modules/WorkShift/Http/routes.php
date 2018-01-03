<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'work-shift', 'namespace' => 'Modules\WorkShift\Http\Controllers'], function () {
    Route::get('/create', 'ManageWorkShiftApiController@createWorkShift');
    Route::get('/current-shifts', 'ManageWorkShiftApiController@getCurrentShifts');
    Route::get('/history-shift-registers', 'ManageWorkShiftApiController@get_history_shift_register');
    Route::get('/detail-shifts/{userId}', 'ManageWorkShiftApiController@detailCheckinCheckOutUser');
    Route::put('/register-shift/{workShiftId}', 'ManageWorkShiftApiController@registerShift');
    Route::put('/remove-register-shift/{workShiftId}', 'ManageWorkShiftApiController@removeRegisterShift');
    Route::get('/work-shift-session/all', 'ManageWorkShiftApiController@allWorkSession');
    Route::post('/work-shift-session/create', 'ManageWorkShiftApiController@createWorkSession');
    Route::put('/work-shift-session/{shiftSessionId}/edit', 'ManageWorkShiftApiController@editWorkSession');
    Route::delete('/work-shift-session/{shiftSessionId}/delete', 'ManageWorkShiftApiController@deleteWorkSession');


});
