<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'shift-registers', 'namespace' => 'Modules\ShiftRegisters\Http\Controllers'], function () {
    Route::get('/current-shifts', 'ManageShiftRegistersApiController@get_current_shifts');
});
