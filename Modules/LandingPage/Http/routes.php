<?php

Route::group(['domain' => config('app.domain'), 'prefix' => 'landing-page-build', 'namespace' => 'Modules\LandingPage\Http\Controllers'], function()
{
    Route::post('/export', 'LandingPageController@index');
});
