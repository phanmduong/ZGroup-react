<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'marketing-campaign', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], function()
{
    Route::get('/all', 'MarketingCampaignController@getAll');
});