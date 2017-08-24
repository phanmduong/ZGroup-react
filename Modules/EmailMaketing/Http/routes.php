<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\EmailMaketing\Http\Controllers'], function()
{
    Route::post('/email-form/store', 'ManageEmailMaketingController@store_email_form');
    Route::get('/email-forms', 'ManageEmailMaketingController@email_forms');
    Route::post('/email-template/store', 'ManageEmailMaketingController@store_email_template');
    Route::get('/email-templates', 'ManageEmailMaketingController@email_templates');
});
