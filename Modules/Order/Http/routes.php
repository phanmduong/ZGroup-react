<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'order', 'namespace' => 'Modules\Order\Http\Controllers'], function () {
    Route::get('/all-orders', 'OrderController@allOrders');
    Route::get('/category/all','OrderController@all_Category');
    Route::post('/category/add','OrderController@add_Category');
    Route::put('/category/edit','OrderController@edit_Category');
    Route::delete('category/{category_id}/delete','OrderController@delete_Category');
});
