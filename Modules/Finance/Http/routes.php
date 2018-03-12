<?php

Route::group(['prefix' => 'finance', 'namespace' => 'Modules\Finance\Http\Controllers'], function () {
    Route::get('/bank-accounts', 'FinanceManageApiController@getBankAccounts');
    Route::post('/bank-accounts', 'FinanceManageApiController@createBankAccount');
    Route::put('/bank-accounts/{bankAccountId}','FinanceManageApiController@editBankAccount');

    Route::group(['prefix' => 'bank-transfer'], function () {
        Route::get('/', 'FinanceManageApiController@bankTransfers');
        Route::put('/{bankTransferId}', 'FinanceManageApiController@updatebankTransfer');
    });
});
