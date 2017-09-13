<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'middleware' => 'web', 'prefix' => 'checkincheckout', 'namespace' => 'Modules\CheckInCheckOut\Http\Controllers'], function () {
    Route::get('/allow-distance', 'CheckInCheckOutController@getDistance');
});
