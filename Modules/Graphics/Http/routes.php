<?php

Route::group(['middleware' => 'web','domain' => config('app.domain_commerce'), 'namespace' => 'Modules\Graphics\Http\Controllers'], function () {
    Route::get('/', 'GraphicsController@index');
    Route::get('/contact-us', 'GraphicsController@contact_us');
    Route::get('/about-us', 'GraphicsController@about_us');
    Route::post('/contact_information','GraphicsController@contact_info');
    Route::get('/book/{good_id}', 'GraphicsController@book');
    Route::get('/blog','GraphicsController@blog');
    Route::get('/post/{blog_id}','GraphicsController@post');
});


