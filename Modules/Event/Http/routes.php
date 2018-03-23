<?php

$eventRoutes = function() {
    Route::post("/", "ManageEventApiController@saveEvent" );
};

Route::group([ 'namespace' => 'Modules\Event\Http\Controllers'], $eventRoutes);

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3/event', 'namespace' => 'Modules\Event\Http\Controllers'], $eventRoutes);
