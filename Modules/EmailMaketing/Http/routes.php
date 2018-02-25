<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\EmailMaketing\Http\Controllers'], function () {
    Route::post('/email-form/store', 'ManageEmailMaketingController@store_email_form');
    Route::get('/email-form/{email_form_id}/delete', 'ManageEmailMaketingController@delete_email_form');
    Route::get('/email-form/{email_form_id}/get', 'ManageEmailMaketingController@get_email_form');
    Route::post('/email-form/{email_form_id}/send-mail', 'ManageEmailMaketingController@send_email_test');
    Route::put('/email-form/change-hide', 'ManageEmailMaketingController@change_hide_email_form');
    Route::get('/email-forms', 'ManageEmailMaketingController@email_forms');
    Route::get('/email-forms/all', 'ManageEmailMaketingController@all_email_forms');
    Route::post('/email-template/store', 'ManageEmailMaketingController@store_email_template');
    Route::get('/email-templates', 'ManageEmailMaketingController@email_templates');
    Route::get('/email-template/{email_template_id}/delete', 'ManageEmailMaketingController@delete_email_template');
    Route::get('/email-template/{email_template_id}/get', 'ManageEmailMaketingController@get_email_template');
});

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'v3/manageapi/', 'namespace' => 'Modules\EmailMaketing\Http\Controllers'], function () {
    Route::post('/email-form/store', 'ManageEmailMaketingController@store_email_form');
    Route::get('/email-form/{email_form_id}/delete', 'ManageEmailMaketingController@delete_email_form');
    Route::get('/email-form/{email_form_id}/get', 'ManageEmailMaketingController@get_email_form');
    Route::post('/email-form/{email_form_id}/send-mail', 'ManageEmailMaketingController@send_email_test');
    Route::put('/email-form/change-hide', 'ManageEmailMaketingController@change_hide_email_form');
    Route::get('/email-forms', 'ManageEmailMaketingController@email_forms');
    Route::get('/email-forms/all', 'ManageEmailMaketingController@all_email_forms');
    Route::post('/email-template/store', 'ManageEmailMaketingController@store_email_template');
    Route::get('/email-templates', 'ManageEmailMaketingController@email_templates');
    Route::get('/email-template/{email_template_id}/delete', 'ManageEmailMaketingController@delete_email_template');
    Route::get('/email-template/{email_template_id}/get', 'ManageEmailMaketingController@get_email_template');
});
