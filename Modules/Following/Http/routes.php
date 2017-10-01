<?php

Route::group(['middleware' => 'web', 'prefix' => 'following', 'namespace' => 'Modules\Following\Http\Controllers'], function()
{
    Route::get('/', 'FollowingController@index');
});
