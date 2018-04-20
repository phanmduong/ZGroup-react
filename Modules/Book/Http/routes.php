<?php
$bookRoutes = function () {
    Route::group(['prefix' => 'book'], function () {
        Route::get('/task-list-templates', 'BookController@taskListTemplates');
        Route::get('/task-list-templates/all','BookController@getAllTaskList');
        Route::get('/all-task-list-templates', 'BookController@getAllTaskListTemplates');
        Route::get('/task-list-template/{taskListTemplateId}', 'BookController@getTaskListTemplateSetting');
        Route::get('/{type}/project', 'BookController@bookProject');
        Route::post('/store-task-list-templates', 'BookController@storeTaskList');
        Route::post('/task-list-template/{taskListTemplateId}/tasks', 'BookController@storeTaskListTasks');

        // Barcode api
        Route::get('/barcodes', 'BarcodeController@barcodes');
        Route::get('/barcode/exist', 'BarcodeController@barcodeExist');
        Route::get('/barcode/{barcodeId}', 'BarcodeController@barcode');
        Route::post('/barcode', 'BarcodeController@saveBarcode');
        Route::delete('/barcode/{barcodeId}', 'BarcodeController@deleteBarcode');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Book\Http\Controllers'], $bookRoutes);

//new api routes

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Book\Http\Controllers'],
    function () use ($bookRoutes) {
        Route::group(['prefix' => 'v3'], $bookRoutes);
    }
);
