<?php
$currencyRoutes = function () {
    Route::group(['prefix' => 'v2/currency'], function () {
        Route::get('/', 'CurrencyController@getAllCurrencies');
        Route::post('/', 'CurrencyController@createCurrency');
        Route::put('/{currencyId}', 'CurrencyController@editCurrency');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Currency\Http\Controllers'], $currencyRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Currency\Http\Controllers'],
    function () use ($currencyRoutes) {
        Route::group(['prefix' => 'v3'], $currencyRoutes);
    });
