<?php

Route::group(['prefix' => 'finance', 'namespace' => 'Modules\Finance\Http\Controllers'], function () {
    Route::group(['prefix' => 'bank-transfer'], function () {
        Route::get('/', 'FinanceManageApiController@bankTransfers');
    });
});
