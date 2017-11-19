<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'order', 'namespace' => 'Modules\Order\Http\Controllers'], function () {
    Route::get('/all-orders', 'OrderController@allOrders');
    Route::put('/{order_id}/edit', 'OrderController@editOrder');
    Route::get('/{order_id}/info', 'OrderController@detailedOrder');
    Route::get('/category/all','OrderController@allCategory');
    Route::post('/category/add','OrderController@addCategory');
    Route::put('/category/edit-category','OrderController@editCategory');
    Route::delete('category/{category_id}/delete','OrderController@deleteCategory');
    Route::get('/import-orders', 'OrderController@allImportOrders');
    Route::get('/detailed-import-order/{importOrderId}', 'OrderController@detailedImportOrder');
    Route::post('/add-import-order', 'OrderController@addImportOrder');
    Route::post('/add-imported-good', 'OrderController@addImportOrder');
    Route::post('/add-import-order-goods', 'OrderController@addImportOrderGoods');
    Route::post('/pay-order/{orderId}', 'OrderController@payOrder');
    Route::post('/add-supplier', 'OrderController@addSupplier');
    Route::get('/all-suppliers', 'OrderController@allSuppliers');
    Route::get('/all-warehouses', 'OrderController@getWarehouses');
    Route::get('/warehouses/all', 'OrderController@allWarehouses');
    Route::post('/warehouse/add', 'OrderController@addWarehouse');
    Route::put('/warehouse/{warehouseId}/edit', 'OrderController@editWarehouse');
    Route::delete('/warehouse/{warehouseId}/delete', 'OrderController@deleteWarehouse');
    Route::get('/bases/all', 'OrderController@allBases');
    Route::get('/all-order-paid-money','OrderController@getOrderPaidMoney');
    Route::get('/warehouse/goods/{warehouseId}', 'OrderController@warehouseGoods');
    Route::post('/check-goods', 'OrderController@checkGoods');
    Route::get('/all-customers','CustomerController@allCustomers');
    Route::get('total-and-debt-money','CustomerController@countMoney');
    Route::post('add-customer','CustomerController@addCustomer');
    Route::put('edit-customer/{customerId}','CustomerController@editCustomer');
});

