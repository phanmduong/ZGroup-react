<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/currency', 'namespace' => 'Modules\Currency\Http\Controllers'], function()
{
    Route::get('/','CurrencyController@getAllCurrencies');
    Route::post('/','CurrencyController@createCurrency');
    Route::put('/{currencyId}','CurrencyController@editCurrency');
});
