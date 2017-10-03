<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'file', 'namespace' => 'Modules\File\Http\Controllers'], function () {
    Route::post('/upload', 'FileController@uploadFile');
});
