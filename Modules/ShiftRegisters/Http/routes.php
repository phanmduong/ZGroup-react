<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'shift-registers', 'namespace' => 'Modules\ShiftRegisters\Http\Controllers'], function () {
    Route::get('/current-shifts', 'ManageShiftRegistersApiController@get_current_shifts');
    Route::post('register-shift/{shiftId}', 'ManageShiftRegistersApiController@register_shift');
    Route::post('remove-shift-regis/{shiftId}', 'ManageShiftRegistersApiController@remove_shift_regis');
    Route::get('history_shift_register', 'ManageShiftRegistersApiController@get_history_shift_register');
});
