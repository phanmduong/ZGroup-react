<?php

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'apiv2', 'namespace' => 'Modules\SocialApi\Http\Controllers'], function()
{
    Route::post('/register', 'RegisterController@register');
    Route::post('/login', 'LoginController@login');
    Route::get('/product','ProductApiController@products');
});

//Route::group(['domain'=>'api.' . config('api.domain'), 'prefix'=>'apiv2', 'middleware'=>['jwt.auth'], 'namespace'=>'Modules\SocialApi\Http\Controllers'], function()
//{
//    Route::get('/product','ProductApiController@products');
//});