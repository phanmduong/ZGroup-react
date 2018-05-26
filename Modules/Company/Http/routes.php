<?php

$companyRoutes = function () {
    Route::group(['prefix' => 'company'], function () {
        Route::post('/create', 'CompanyController@createCompany');
        Route::put('/{companyId}', 'CompanyController@editCompany');
        Route::post('/field/create', 'CompanyController@createField');
        Route::get('/all', 'CompanyController@getAllCompany');
        Route::get('/provided', 'CompanyController@getCompanyProvide');
        Route::get('/share', 'CompanyController@getCompanyShare');
        Route::get('/field/all', 'CompanyController@getAllField');
        Route::get('/{companyId}', 'CompanyController@getDetailCompany');
        Route::post('/discount/{companyId}','CompanyController@createDiscount');
        Route::get('/discount/{companyId}','CompanyController@getDiscountsCompany');
        Route::put('/discount/{discoutnId}','CompanyController@editDiscountCompany;');


        Route::get('/payment/all', 'CompanyController@getAllPayment');
        Route::post('/payment/create', 'CompanyController@createPayment');
        Route::put('/payment/edit/{paymentId}', 'CompanyController@editPayment');
        Route::get('/payment/{paymentId}', 'CompanyController@getPayment');
        Route::post('payment/{paymentId}/change-status', 'CompanyController@changeStatusPayment');

        Route::post('/print-order', 'CompanyController@createPrintOrder');
        Route::get('/print-order/all', 'CompanyController@getAllPrintOrder');
        Route::get('/print-order/all-command-code', 'CompanyController@getAllCodePrintOrder');
        Route::get('/print-order/properties', 'CompanyController@getAllProperties');
        Route::post('/print-order/property/create', 'CompanyController@createProperty');
        Route::put('/print-order/property/{propId}', 'CompanyController@editProperty');
        Route::get('/print-order/{printOrderId}', 'CompanyController@getPrintOrder');
        Route::put('/print-order/{printOrderId}', 'CompanyController@editPrintOrder');
        Route::post('/print-order/{printOrderId}/change-status', 'CompanyController@changeStatusPrintOrder');

        Route::post('/item-order/{itemOrderId}/change-status', 'CompanyController@changeStatusItemOrder');

        Route::get('/export-order/all', 'CompanyController@getAllExportOrder');
        Route::get('/export-order/no-paging', 'CompanyController@getAllExportOrderNoPaging');
        Route::get('/export-order/{exportOrderId}', 'CompanyController@getExportOrder');
        Route::post('/export-order/{exportOrderId}', 'CompanyController@createOrEditExportOrder');

        Route::get('/be-ordered/all', 'CompanyController@getAllOrdered');
        Route::get('/be-ordered/{orderId}', 'CompanyController@getOrdered');
        Route::post('/be-ordered/create', 'CompanyController@createOrdered');
        Route::put('/be-ordered/{orderId}', 'CompanyController@editOrdered');

        Route::get('/order/all', 'CompanyController@getAllOrder');
        Route::get('/order/{orderId}', 'CompanyController@getOrder');
        Route::post('/order/create', 'CompanyController@createOrder');
        Route::put('/order/{orderId}', 'CompanyController@editOrder');

        Route::get('/import-order/all', 'CompanyController@getAllImportOrder');
        Route::get('/import-order/{importOrderId}', 'CompanyController@getImportOrder');
        Route::post('/import-order/item-order/{importOrderId}', 'CompanyController@createOrEditImportOrder');

        Route::get('/history-debt/all','CompanyController@getAllHistoryDebt');
        Route::get('/history-debt/{company_id}','CompanyController@getHistoryDebt');

        Route::get('/administration/request-vacation/all','AdministrationController@getAllRequestVacation');
        Route::get('/administration/request-vacation/{requestId}','AdministrationController@getRequestVacation');
        Route::post('/administration/request-vacation/create','AdministrationController@createRequestVacation');
        Route::put('/administration/request-vacation/{requestId}','AdministrationController@editRequestVacation');
        Route::post('/administration/request-vacation/{requestId}/change-status','AdministrationController@changeStatusRequestVacation');
        
        


        Route::get('/administration/advance-payment/all','AdministrationController@getAllAdvancePayment');
        Route::get('/administration/advance-payment/{advancePaymentId}','AdministrationController@getAdvancePayment');
        Route::post('/administration/advance-payment/create','AdministrationController@createAdvancePayment');
        Route::put('/administration/advance-payment/{advancePaymentId}','AdministrationController@editAdvancePayment');
        Route::post('/administration/advance-payment/{advancePaymentId}/change-status','AdministrationController@changeStatusAdvancePayment');
        Route::post('/administration/advance-payment/{advancePaymentId}/payment','AdministrationController@PaymentAdvance');

        //Report model
        Route::get('/reports/all','AdministrationController@showReports');
        Route::get('/report/{id}','AdministrationController@showReportId');
        Route::post('/report/{staff_id}/create','AdministrationController@createReport');
        Route::put('/report/{staff_id}/edit/{id}','AdministrationController@editReport');
        Route::delete('/report/{id}','AdministrationController@deleteReport');
        Route::put('/report/{id}','AdministrationController@changeStatus');

        Route::get('/history-good/{goodId}','WarehouseController@getHistoryGood');
        Route::get('/summary-good/all','WarehouseController@summaryGood');

        //Contract
        Route::get('/contract/all','AdministrationController@getAllContract');
        Route::get('/contract/{contract_id}','AdministrationController@getContractDetail');
        Route::post('/contract/create','AdministrationController@createContract');
        Route::put('/contract/edit/{contract_id}','AdministrationController@editContract');
        Route::post('/contract/change-status/{contract_id}','AdministrationController@changeStatusContract');
        
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Company\Http\Controllers'], $companyRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Company\Http\Controllers'],
    function () use ($companyRoutes) {
        Route::group(['prefix' => 'v3'], $companyRoutes);
    });
