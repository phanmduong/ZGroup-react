<?php

Route::group(['middleware' => 'web', 'prefix' => 'graphics', 'namespace' => 'Modules\Graphics\Http\Controllers'], function()
{
    Route::get('/', 'GraphicsController@aaa');
    Route::get('/about-us', function () {
        return view('graphics::about_us');
    });
    Route::get('/product/{good_id}', 'GraphicsController@product');
});
