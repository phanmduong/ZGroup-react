<?php

$checkInCheckOutRoutes = function () {
    Route::group(['prefix' => 'checkincheckout'], function () {
        Route::get('/allow-distance', 'CheckInCheckOutController@getDistance');
        Route::post('/check-in', 'CheckInCheckOutController@checkIn');
        Route::post('/check-out', 'CheckInCheckOutController@checkOut');
        Route::post('/check-device', 'CheckInCheckOutController@checkDevice');
        Route::get('/history', 'CheckInCheckOutController@history');
        Route::get('/statistic', 'CheckInCheckOutController@statisticAttendanceStaffs');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\CheckInCheckOut\Http\Controllers'],
    $checkInCheckOutRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\CheckInCheckOut\Http\Controllers'],
    function () use ($checkInCheckOutRoutes) {
        Route::group(['prefix' => 'v3'], $checkInCheckOutRoutes);
    });