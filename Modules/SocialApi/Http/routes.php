<?php

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'apiv2', 'namespace' => 'Modules\SocialApi\Http\Controllers'], function()
{
    Route::post('/register', 'RegisterController@register');
    Route::post('/login', 'LoginController@login');
});
