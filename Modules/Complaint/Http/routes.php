<?php

$routes = function () {
    Route::group(['prefix' => 'complaint'], function () {
        Route::post('/create-complaint', 'ManageComplaintApiController@createComplaint');
    });
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\Complaint\Http\Controllers'], $routes);