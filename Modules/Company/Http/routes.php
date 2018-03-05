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
        Route::post('/import-order/print-order/{importOrderId}', 'CompanyController@createOrEditImportPrintOrder');
        Route::get('/history-debt/{company_id}','CompanyController@getHistoryDebt');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Company\Http\Controllers'], $companyRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Company\Http\Controllers'],
    function () use ($companyRoutes) {
        Route::group(['prefix' => 'v3'], $companyRoutes);
    });
