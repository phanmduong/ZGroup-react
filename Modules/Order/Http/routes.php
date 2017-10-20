<?php

Route::group(['middleware' => 'web', 'prefix' => 'order', 'namespace' => 'Modules\Order\Http\Controllers'], function()
{
    Route::get('/', 'OrderController@index');
});
