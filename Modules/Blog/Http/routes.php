<?php

$blogRoutes = function()
{
    Route::post('/', 'BlogController@index');
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3/post', 'namespace' => 'Modules\Blog\Http\Controllers'], $blogRoutes);

