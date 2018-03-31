<?php
$orderRoutes = function () {
    Route::group(['prefix' => 'order'], function () {
        Route::get('/all-orders', 'OrderController@allOrders');
        Route::get('/statistic', 'OrderController@statisticalOrder');
        Route::post('/store-order', 'OrderController@storeOrder');
        Route::put('/{order_id}', 'OrderController@editOrder');
        Route::get('/{order_id}/info', 'OrderController@detailedOrder');
        Route::put('/{orderId}/status', 'OrderController@changeOrderStatus');
        Route::post('/pay-order/{orderId}', 'OrderController@payOrder');
        Route::get('/all-order-paid-money', 'OrderController@getOrderPaidMoney');
        Route::post('/check-goods', 'OrderController@checkGoods');
        Route::post('/{orderId}/return/{warehouseId}', 'OrderController@returnOrder');
        Route::put('/{orderId}/note', 'OrderController@editNote');

        Route::get('/delivery', 'DeliveryOrderApiController@getDeliveryOrders');
        Route::get('/delivery-info', 'DeliveryOrderApiController@infoDeliveryOrders');
        Route::get('/delivery/inventories', 'DeliveryOrderApiController@deliveryInventories');
        Route::get('/delivery/inventories-info', 'DeliveryOrderApiController@deliveryInventoriesInfo');
        Route::post('/delivery/send-price', 'DeliveryOrderApiController@sendPrice');
        Route::post('/delivery/change-status', 'DeliveryOrderApiController@changeOrdersStatus');
        Route::post('/delivery', 'DeliveryOrderApiController@createDeliveryOrder');
        Route::put('/delivery/{orderId}', 'DeliveryOrderApiController@editDeliveryOrder');
        Route::delete('/delivery/{deliveryOrderId}', 'DeliveryOrderApiController@deleteDeliveryOrder');
        Route::put('/delivery/{deliveryOrderId}/change-note', 'DeliveryOrderApiController@changeNote');
        Route::put('/delivery/{deliveryOrderId}/change-status', 'DeliveryOrderApiController@changeStatus');
        Route::get('/delivery/{deliveryOrderId}', 'DeliveryOrderApiController@getDetailedDeliveryOrder');
        Route::post('/delivery/{deliveryOrderId}/import', 'DeliveryOrderApiController@importDeliveryOrder');
        Route::post('/delivery/{deliveryOrderId}/pay', 'DeliveryOrderApiController@payDeliveryOrder');

        Route::get('/all-customers', 'CustomerController@allCustomers');
        Route::get('/customer', 'CustomerController@getCustomers');
        Route::post('/customer/{customerId}/top-up', 'CustomerController@topUpUserWallet');
        Route::get('/total-and-debt-money', 'CustomerController@countMoney');
        Route::post('/add-customer', 'CustomerController@addCustomer');
        Route::put('/edit-customer/{customerId}', 'CustomerController@editCustomer');
        Route::get('/info-customer/{customerId}', 'CustomerController@getInfoCustomer');

        Route::post('/customer-group/add', 'CustomerGroupApiController@createGroup');
        Route::put('/customer-group/{groupId}', 'CustomerGroupApiController@changeGroup');
        Route::get('/customer-groups', 'CustomerGroupApiController@getAllGroup');
        Route::delete('/customer-group/{groupId}', 'CustomerGroupApiController@deleteGroup');
        Route::get('customer-group/{groupId}/customers', 'CustomerGroupApiController@getCustomerOfGroup');
        Route::get('customer-group/{groupId}/coupons', 'CustomerGroupApiController@getCouponsOfGroup');

        Route::get('/category/all', 'CategoryApiController@allCategory');
        Route::post('/category/add', 'CategoryApiController@addCategory');
        Route::put('/category/edit-category', 'CategoryApiController@editCategory');
        Route::delete('category/{category_id}/delete', 'CategoryApiController@deleteCategory');

        Route::get('/import-orders', 'ImportApiController@allImportOrders');
        Route::get('/detailed-import-order/{importOrderId}', 'ImportApiController@detailedImportOrder');
        Route::post('/add-import-order-goods', 'ImportApiController@addImportOrderGoods');
        Route::delete('/import-order/delete/{importOrderId}', 'ImportApiController@deleteImportOrder');
        Route::post('/import-order/edit/{importOrderId}', 'ImportApiController@editImportOrder');
        Route::post('/pay-import-order/{orderId}', 'ImportApiController@payImportOrder');

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

        Route::get('/staffs', 'StaffController@getStaffs');
        Route::get('/salers', 'StaffController@allSalers');

        Route::get('/test', 'OrderController@test');
    });
};

$customerRoutes = function() {
    Route::group(['prefix' => 'v2'], function() {
        Route::get('customer', 'CustomerApiController@customers');
        Route::get('customer/{customerId}', 'CustomerApiController@customer');
    });
};

$transferMoneyRoutes = function () {
    Route::group(['prefix' => 'v2/transfer-money'], function () {
        Route::get('/', 'TransferMoneyApiController@getTransfers');
        Route::put('/{transferId}', 'TransferMoneyApiController@editTransfer');
        Route::put('/{transferId}/status', 'TransferMoneyApiController@changeTransferStatus');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Order\Http\Controllers'], $customerRoutes);

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Order\Http\Controllers'], $orderRoutes);

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Order\Http\Controllers'], $transferMoneyRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Order\Http\Controllers'],
    function () use ($orderRoutes, $customerRoutes) {
        Route::group(['prefix' => 'v3'], $orderRoutes);
        Route::group(['prefix' => 'v3'], $customerRoutes);
    });

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Order\Http\Controllers'],
    function () use ($transferMoneyRoutes) {
        Route::group(['prefix' => 'v3'], $transferMoneyRoutes);
    });


