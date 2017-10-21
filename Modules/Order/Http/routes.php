<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'order', 'namespace' => 'Modules\Order\Http\Controllers'], function () {
    Route::get('/all-orders', 'OrderController@allOrders');

});
