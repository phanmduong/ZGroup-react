<?php

$webRoutes = function()
{
    Route::get('/', 'FilmZgroupController@index');
};

Route::group(['middleware' => 'web', 'domain' => "filmgroup.test", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $webRoutes);