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

$namespaceRoutes = function () {
    Route::get('/receive-transactions', 'ManageMoneyTransferApiController@receive_transactions');
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Finance\Http\Controllers'],
    function () use ($namespaceRoutes) {
        Route::group(['prefix' => 'finance'],
            function () use ($namespaceRoutes) {
                Route::group(['prefix' => 'v3'], $namespaceRoutes);
            });
    });
