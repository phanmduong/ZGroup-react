<?php

$blogRoutes = function()
{
    Route::post('/', 'BlogManageApiController@createPost');
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3/post', 'namespace' => 'Modules\Blog\Http\Controllers'], $blogRoutes);

