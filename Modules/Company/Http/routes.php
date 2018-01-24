<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'company', 'namespace' => 'Modules\Company\Http\Controllers'], function()
{
    Route::post('/create','CompanyController@createCompany');
    Route::put('/{companyId}','CompanyController@editCompany');
    Route::post('/field/create','CompanyController@createField');
    Route::get('/all','CompanyController@getAllCompany');
    Route::get('/field/all','CompanyController@getAllField');
    Route::get('{companyId}','CompanyController@getDetailCompany');
    Route::get('/payment','CompanyController@getAllPayment');
    Route::post('/payment','CompanyController@createPayment');
    Route::put('/payment/{paymentId}','CompanyController@editPayment');
    Route::get('/payment/{paymentId}','CompanyController@getPayment');
    Route::post('/print-order','CompanyController@createPrintOrder');
    Route::get('/print-order/all','CompanyController@getAllPrintOrder');
});
