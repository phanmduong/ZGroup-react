<?php

Route::group(['middleware' => 'web', 'prefix' => 'aten', 'namespace' => 'Modules\Aten\Http\Controllers'], function()
{
    Route::get('/', 'AtenController@index');
});
