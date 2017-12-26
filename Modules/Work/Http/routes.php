<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'work', 'namespace' => 'Modules\Work\Http\Controllers'], function()
{
    Route::post('/', 'WorkApiController@createWork');
});
