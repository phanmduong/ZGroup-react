<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'checkincheckout', 'namespace' => 'Modules\CheckInCheckOut\Http\Controllers'], function () {
    Route::get('/allow-distance', 'CheckInCheckOutController@getDistance');
    Route::post('/check-in', 'CheckInCheckOutController@checkIn');
    Route::post('/check-out', 'CheckInCheckOutController@checkOut');
    Route::post('/check-device', 'CheckInCheckOutController@checkDevice');
    Route::get('/history', 'CheckInCheckOutController@history');
    Route::get('/statistic', 'CheckInCheckOutController@statisticAttendanceStaffs');
});
