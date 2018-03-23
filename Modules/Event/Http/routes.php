<?php

Route::group(['middleware' => 'web', 'prefix' => 'event', 'namespace' => 'Modules\Event\Http\Controllers'], function()
{
    Route::get('/', 'EventController@index');
});
