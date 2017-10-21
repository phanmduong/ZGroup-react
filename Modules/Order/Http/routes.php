<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'order', 'namespace' => 'Modules\Order\Http\Controllers'], function () {
    Route::get('/all-orders', 'OrderController@allOrders');
    Route::get('/category/all','OrderController@allCategory');
    Route::post('/category/add','OrderController@addCategory');
    Route::put('/category/edit','OrderController@editCategory');
    Route::delete('category/{category_id}/delete','OrderController@deleteCategory');


});
