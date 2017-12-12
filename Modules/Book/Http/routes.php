<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'book', 'namespace' => 'Modules\Book\Http\Controllers'], function () {
    Route::get('/task-list-templates', 'BookController@taskListTemplates');
    Route::get('/all-task-list-templates', 'BookController@getAllTaskListTemplates');
    Route::get('/task-list-template/{taskListTemplateId}', 'BookController@getTaskListTemplateSetting');
    Route::get('/{type}/project', 'BookController@bookProject');
    Route::post('/store-task-list-templates', 'BookController@storeTaskList');
    Route::post('/task-list-template/{taskListTemplateId}/tasks', 'BookController@storeTaskListTasks');

    // Barcode api
    Route::get("/barcodes", "BarcodeController@barcodes");
    Route::get("/barcode/exist", "BarcodeController@barcodeExist");
    Route::get("/barcode/{barcodeId}", "BarcodeController@barcode");
    Route::post("/barcode", "BarcodeController@saveBarcode");
    Route::delete("/barcode/{barcodeId}", "BarcodeController@deleteBarcode");

});
