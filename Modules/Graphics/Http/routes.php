<?php

Route::group(['middleware' => 'web', 'namespace' => 'Modules\Graphics\Http\Controllers'], function () {
    Route::group(['domain' => 'graphics.vn'], function () {
        Route::get('/', 'GraphicsController@index');
        Route::get('/contact-us', 'GraphicsController@contact_us');
        Route::get('/about-us', 'GraphicsController@aboutUs');
    });
});


