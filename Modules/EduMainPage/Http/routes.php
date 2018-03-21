<?php

Route::group(['middleware' => 'web', 'prefix' => 'edumainpage', 'namespace' => 'Modules\EduMainPage\Http\Controllers'], function()
{
    Route::get('/', 'EduMainPageController@index');
});
