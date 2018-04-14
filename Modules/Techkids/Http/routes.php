<?php

Route::group(['middleware' => 'web', 'prefix' => 'techkids', 'namespace' => 'Modules\Techkids\Http\Controllers'], function()
{
    Route::get('/', 'TechkidsController@index');
});
