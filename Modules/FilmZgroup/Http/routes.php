<?php

Route::group(['middleware' => 'web', 'prefix' => 'filmzgroup', 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], function()
{
    Route::get('/', 'FilmZgroupController@index');
});
