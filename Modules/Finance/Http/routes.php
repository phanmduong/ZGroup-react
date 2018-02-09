<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'order', 'namespace' => 'Modules\Finance\Http\Controllers'], function () {
    Route::get('/bank-accounts', 'FinanceManageApiController@bankTransfers');

    Route::group(['prefix' => 'bank-transfer'], function () {
        Route::get('/bank-accounts', 'FinanceManageApiController@getBankAccounts');
        Route::post('/bank-accounts','FinanceManageApiController@createBankAccount');
        Route::put('/bank-accounts/{bank_account_id}','FinanceManageApiController@editBankAccount');
        Route::put('/bank-accounts/{bank_account_id}','FinanceManageApiController@hideBankAccount');
    });
});
