<?php

Route::group(['middleware' => 'web', 'prefix' => 'graphics', 'namespace' => 'Modules\Graphics\Http\Controllers'], function()
{
    Route::get('/', 'GraphicsController@index');
    Route::get('/product/{good_id}', 'GraphicsController@product');
});
