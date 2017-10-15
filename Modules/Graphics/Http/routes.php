<?php

Route::group(['middleware' => 'web', 'prefix' => 'graphics', 'namespace' => 'Modules\Graphics\Http\Controllers'], function()
{
    Route::get('/contact-us','GraphicsController@contact_us');
    Route::get('/index', 'GraphicsController@index');
    Route::get('/about-us', 'GraphicsController@aboutUs');
    //Route::get('/product/{good_id}', 'GraphicsController@product');
});
