<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'ghtk', 'namespace' => 'Modules\GHTK\Http\Controllers'], function () {
    Route::post('/services/shipment/order', 'GHTKController@addOrder');
    Route::post('/services/shipment/fee', 'GHTKController@shipmentFee');
    Route::get('/services/shipment/v2/{label_id}', 'GHTKController@orderInfo');
    Route::get('/services/shipment/cancel/{label_id}', 'GHTKController@cancelOrder');
    Route::get('/services/label/{label_id}', 'GHTKController@label');
});

