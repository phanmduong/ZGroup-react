<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'landing-page-build', 'namespace' => 'Modules\LandingPage\Http\Controllers'], function()
{
    Route::get('/export', 'LandingPageController@index');
});
