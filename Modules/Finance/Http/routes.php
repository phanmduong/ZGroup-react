<?php
Route::group(['prefix' => 'finance', 'namespace' => 'Modules\Finance\Http\Controllers'], function () {
    Route::get('/bank-accounts', 'FinanceManageApiController@getBankAccounts');
    Route::post('/bank-accounts', 'FinanceManageApiController@createBankAccount');
    Route::put('/bank-accounts/{bankAccountId}', 'FinanceManageApiController@editBankAccount');
    Route::group(['prefix' => 'bank-transfer'], function () {
        Route::get('/', 'FinanceManageApiController@bankTransfers');
        Route::put('/{bankTransferId}', 'FinanceManageApiController@updatebankTransfer');
    });
});
$namespaceRoutes = function () {
    Route::get('/transactions', 'ManageMoneyTransferApiController@transactions');
    Route::post('/create-transaction', 'ManageMoneyTransferApiController@create_transaction');
    Route::post('/confirm-transaction', 'ManageMoneyTransferApiController@confirm_transaction');
    Route::get('/staffs-keep-money', 'FinanceManageApiController@getStaffsKeepMoney');
    Route::get('/history-transaction/{staff_id}', 'FinanceManageApiController@historyTransactionStaff');
    Route::get('/history-transactions', 'FinanceManageApiController@historyTransactions');
    Route::get('/history-spend-money-staff', 'FinanceManageApiController@historySpendMoneyStaff');
    Route::get('/history-spend-money', 'FinanceManageApiController@historySpendMoney');
    Route::get('/category-transactions', 'FinanceManageApiController@getCategoryTransactions');
    Route::post('/create-spend-money', 'FinanceManageApiController@createSpendMoney');
    Route::get('/summary', 'FinanceManageApiController@summaryFinance');
};
Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Finance\Http\Controllers'],
    function () use ($namespaceRoutes) {
        Route::group(
            ['prefix' => 'v3'],
            function () use ($namespaceRoutes) {
                Route::group(['prefix' => 'finance'], $namespaceRoutes);
            }
        );
    }
);