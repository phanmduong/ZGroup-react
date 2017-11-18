<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'order', 'namespace' => 'Modules\Order\Http\Controllers'], function () {
    Route::get('/all-orders', 'OrderController@allOrders');
    Route::put('/{order_id}/edit', 'OrderController@editOrder');
    Route::get('/{order_id}/info', 'OrderController@detailedOrder');
    Route::post('/pay-order/{orderId}', 'OrderController@payOrder');
    Route::get('/all-order-paid-money', 'OrderController@getOrderPaidMoney');
    Route::post('/check-goods', 'OrderController@checkGoods');

    Route::get('/category/all', 'CategoryApiController@allCategory');
    Route::post('/category/add', 'CategoryApiController@addCategory');
    Route::put('/category/edit-category', 'CategoryApiController@editCategory');
    Route::delete('category/{category_id}/delete', 'CategoryApiController@deleteCategory');

    Route::get('/import-orders', 'ImportApiController@allImportOrders');
    Route::get('/detailed-import-order/{importOrderId}', 'ImportApiController@detailedImportOrder');
    Route::post('/add-import-order-goods', 'ImportApiController@addImportOrderGoods');

    Route::post('/add-supplier', 'WarehouseApiController@addSupplier');
    Route::put('/supplier/{supplier_id}/edit', 'WarehouseApiController@editSupplier');
    Route::delete('/supplier/{supplier_id}/delete', 'WarehouseApiController@deleteSupplier');
    Route::get('/all-suppliers', 'WarehouseApiController@allSuppliers');
    Route::get('/all-warehouses', 'WarehouseApiController@getWarehouses');
    Route::get('/warehouses/all', 'WarehouseApiController@allWarehouses');
    Route::post('/warehouse/add', 'WarehouseApiController@addWarehouse');
    Route::put('/warehouse/{warehouseId}/edit', 'WarehouseApiController@editWarehouse');
    Route::delete('/warehouse/{warehouseId}/delete', 'WarehouseApiController@deleteWarehouse');
    Route::get('/bases/all', 'WarehouseApiController@allBases');
    Route::get('/warehouse/goods/{warehouseId}', 'WarehouseApiController@warehouseGoods');

    Route::get('/all-customers', 'CustomerController@allCustomers');
    Route::get('total-and-debt-money', 'CustomerController@countMoney');
    Route::post('add-customer', 'CustomerController@addCustomer');

    Route::get('/staffs', 'StaffController@getStaffs');
});

