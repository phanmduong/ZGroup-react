<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'landing-page', 'namespace' => 'Modules\LandingPage\Http\Controllers'], function()
{
    Route::get('/build', 'LandingPageController@index');
});
