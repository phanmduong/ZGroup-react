<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'order', 'namespace' => 'Modules\Order\Http\Controllers'], function () {
    Route::get('/all-orders', 'OrderController@allOrders');
    Route::put('/{order_id}/edit', 'OrderController@editOrder');
    Route::get('/{order_id}/info', 'OrderController@detailedOrder');
    Route::get('/category/all','OrderController@allCategory');
    Route::post('/category/add','OrderController@addCategory');
    Route::put('/category/edit-category','OrderController@editCategory');
    Route::delete('category/{category_id}/delete','OrderController@deleteCategory');
    Route::get('/import-orders', 'OrderController@importOrders');
    Route::get('/detailed-import-order/{importOrderId}', 'OrderController@detailedImportOrder');
});

