<?php

$shiftRegistersRoutes = function () {
    Route::group(['prefix' => 'shift-registers'], function () {
        Route::get('/current-shifts', 'ManageShiftsApiController@get_current_shifts');
        Route::post('register-shift/{shiftId}', 'ManageShiftsApiController@register_shift');
        Route::post('remove-shift-regis/{shiftId}', 'ManageShiftsApiController@remove_shift_regis');
        Route::get('/history-shift-register', 'ManageShiftsApiController@get_history_shift_register');
        Route::get('/shift-sessions', 'ManageShiftsApiController@get_shift_session_all');
        Route::post('store-shift-session', 'ManageShiftsApiController@store_shift_session');
        Route::delete('/shift-session/{shift_session_id}/delete', 'ManageShiftsApiController@delete_shift_session');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\ShiftRegisters\Http\Controllers'], $shiftRegistersRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\ShiftRegisters\Http\Controllers'],
    function () use ($shiftRegistersRoutes) {
        Route::group(['prefix' => 'v3'], $shiftRegistersRoutes);
    });
