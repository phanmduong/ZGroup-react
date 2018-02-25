<?php
$ghtkRoutes = function () {
    Route::group(['prefix' => 'ghtk'], function () {
        Route::post('/services/shipment/order', 'GHTKController@addOrder');
        Route::post('/services/shipment/fee', 'GHTKController@shipmentFee');
        Route::get('/services/shipment/v2/{label_id}', 'GHTKController@orderInfo');
        Route::get('/services/shipment/cancel/{label_id}', 'GHTKController@cancelOrder');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\GHTK\Http\Controllers'], $ghtkRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\GHTK\Http\Controllers'],
    function () use ($ghtkRoutes) {
        Route::group(['prefix' => 'v3'], $ghtkRoutes);
    });

