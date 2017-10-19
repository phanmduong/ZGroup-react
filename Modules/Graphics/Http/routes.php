<?php

Route::group(['middleware' => 'web', 'prefix' => 'graphics', 'namespace' => 'Modules\Graphics\Http\Controllers'], function()
{
    Route::get('/product/{link}/{goodId}', 'GraphicsController@product');
});
