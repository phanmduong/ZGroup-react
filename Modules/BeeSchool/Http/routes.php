<?php

Route::group(['middleware' => 'web', 'domain' => 'beeschool.test', 'namespace' => 'Modules\BeeSchool\Http\Controllers'], function()
{
    Route::get('/', 'BeeSchoolController@index');
});
