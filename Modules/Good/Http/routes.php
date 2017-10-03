<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'good', 'namespace' => 'Modules\Good\Http\Controllers'], function () {
    Route::get('/all', 'GoodController@getAll');
    Route::post("/create","GoodController@createGood");
    Route::get("/{id}","GoodController@good");
    Route::post('/good/{goodId}/file', "GoodController@uploadFile");
});
