<?php

Route::group(['middleware' => 'web', 'prefix' => 'finance', 'namespace' => 'Modules\Finance\Http\Controllers'], function()
{
    Route::get('/', 'FinanceController@index');
});
