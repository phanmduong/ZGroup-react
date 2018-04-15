<?php

Route::group(['middleware' => 'web', 'prefix' => 'demo', 'namespace' => 'Modules\Demo\Http\Controllers'], function()
{
    Route::get('/', 'DemoController@index');
});
