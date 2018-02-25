<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/manufacture', 'namespace' => 'Modules\Good\Http\Controllers'], function () {
    Route::get('/', 'ManufactureApiController@allManufactures');
    Route::post('/', 'ManufactureApiController@createManufacture');
    Route::delete('/{manufactureId}', 'ManufactureApiController@deleteManufacture');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'good', 'namespace' => 'Modules\Good\Http\Controllers'], function () {
    Route::get('/status/count', 'InventoryApiController@statusCount');
    Route::get('/inventories/all', 'InventoryApiController@allInventories');
    Route::get('/inventories-info', 'InventoryApiController@inventoriesInfo');
    Route::get('/history/{goodId}', 'InventoryApiController@historyGoods');
    Route::get('/warehouses/{goodId}', 'InventoryApiController@goodInWarehouses');

    Route::get('/all-property-items', 'GoodPropertyApiController@allPropertyItems');
    Route::delete('/delete-property-item/{property_item_id}', 'GoodPropertyApiController@deletePropertyItem');
    Route::post('/create-property-item', 'GoodPropertyApiController@createGoodPropertyItem');
    Route::post('/add-property-item-task/{task_id}', 'GoodPropertyApiController@addPropertyItemsTask');
    Route::get('/property-item/{property_item_id}', 'GoodPropertyApiController@getGoodPropertyItem');
    Route::get('/get-property/{good_id}', 'GoodPropertyApiController@propertiesOfGood');
    Route::post('/{id}/save-good-properties', 'GoodPropertyApiController@saveGoodProperties');
    Route::get('/{goodId}/task/{taskId}/good-properties', 'GoodPropertyApiController@loadGoodTaskProperties');

    Route::get('/all', 'GoodController@getAllGoods');
    Route::get('/import', 'GoodController@getAllGoodsForImport');
    Route::get('/get-by-status', 'GoodController@goodsByStatus');
    Route::get('/all/no-paging', 'GoodController@getGoodsWithoutPagination');
    Route::get('/task-setting/{taskId}', 'GoodController@getPropertyItems');
    Route::post('/create', 'GoodController@createGoodBeta');
    Route::post('/create-good', 'GoodController@createGood');
    Route::delete('/{goodId}/delete', 'GoodController@deleteGood');
    Route::put('/{goodId}/update-price', 'GoodController@updatePrice');
    Route::put('/edit/{goodId}', 'GoodController@editGoodBeta');
    Route::put('/{goodId}/edit', 'GoodController@editGood');
    Route::post('/{goodId}/create-child-good', 'GoodController@createChildGood');
    Route::get('/information', 'GoodController@goodInformation');
    Route::get('/{goodId}', 'GoodController@good');
});

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'v3/manageapi/v2/manufacture', 'namespace' => 'Modules\Good\Http\Controllers'], function () {
    Route::get('/', 'ManufactureApiController@allManufactures');
    Route::post('/', 'ManufactureApiController@createManufacture');
    Route::delete('/{manufactureId}', 'ManufactureApiController@deleteManufacture');
});

//Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Good\Http\Controllers'], function () {
//    Route::get('/status/count', 'InventoryApiController@statusCount');
//    Route::get('/inventories/all', 'InventoryApiController@allInventories');
//    Route::get('/inventories-info', 'InventoryApiController@inventoriesInfo');
//    Route::get('/history/{goodId}', 'InventoryApiController@historyGoods');
//    Route::get('/warehouses/{goodId}', 'InventoryApiController@goodInWarehouses');
//
//    Route::get('/all-property-items', 'GoodPropertyApiController@allPropertyItems');
//    Route::delete('/delete-property-item/{property_item_id}', 'GoodPropertyApiController@deletePropertyItem');
//    Route::post('/create-property-item', 'GoodPropertyApiController@createGoodPropertyItem');
//    Route::post('/add-property-item-task/{task_id}', 'GoodPropertyApiController@addPropertyItemsTask');
//    Route::get('/property-item/{property_item_id}', 'GoodPropertyApiController@getGoodPropertyItem');
//    Route::get('/get-property/{good_id}', 'GoodPropertyApiController@propertiesOfGood');
//    Route::post('/{id}/save-good-properties', 'GoodPropertyApiController@saveGoodProperties');
//    Route::get('/{goodId}/task/{taskId}/good-properties', 'GoodPropertyApiController@loadGoodTaskProperties');
//
//    Route::get('/all', 'GoodController@getAllGoods');
//    Route::get('/import', 'GoodController@getAllGoodsForImport');
//    Route::get('/get-by-status', 'GoodController@goodsByStatus');
//    Route::get('/all/no-paging', 'GoodController@getGoodsWithoutPagination');
//    Route::get('/task-setting/{taskId}', 'GoodController@getPropertyItems');
//    Route::post('/create', 'GoodController@createGoodBeta');
//    Route::post('/create-good', 'GoodController@createGood');
//    Route::delete('/{goodId}/delete', 'GoodController@deleteGood');
//    Route::put('/{goodId}/update-price', 'GoodController@updatePrice');
//    Route::put('/edit/{goodId}', 'GoodController@editGoodBeta');
//    Route::put('/{goodId}/edit', 'GoodController@editGood');
//    Route::post('/{goodId}/create-child-good', 'GoodController@createChildGood');
//    Route::get('/information', 'GoodController@goodInformation');
//    Route::get('/{goodId}', 'GoodController@good');
//});

