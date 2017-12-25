<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'work-shift', 'namespace' => 'Modules\WorkShift\Http\Controllers'], function()
{
    Route::get('/work-shift-session/all', 'WorkShiftController@allWorkSession');
    Route::post('/work-shift-session/create', 'WorkShiftController@createWorkSession');
    Route::put('/work-shift-session/:shiftSessionId/edit', 'WorkShiftController@editWorkSession');

});
