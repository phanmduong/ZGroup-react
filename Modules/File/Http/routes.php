<?php
$fileRoutes = function () {
    Route::group(['prefix' => 'file'], function () {
        Route::post('/upload', 'FileController@uploadFile');
        Route::post('/upload-image', 'FileController@uploadImage');
        Route::post('/url', 'FileController@addUrl');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\File\Http\Controllers'], $fileRoutes);

//new api routes

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\File\Http\Controllers'],
   function () use ($fileRoutes) {
       Route::group(['prefix' => 'v3'], $fileRoutes);
   }
);
