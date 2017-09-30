<?php

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'apiv2', 'namespace' => 'Modules\SocialApi\Http\Controllers'], function()
{
    Route::post('/user', 'RegisterController@register');
});
