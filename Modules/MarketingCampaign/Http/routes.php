<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'marketing-campaign', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], function () {
    Route::get('/all', 'MarketingCampaignController@getAll');
    Route::get('/summary', 'MarketingCampaignController@summaryMarketingCampaign');
    Route::get('/sumary-register','MarketingCampaignController@summaryMarketingRegister');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'sales', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], function () {
    Route::get('/summary', 'MarketingCampaignController@summarySales');
});
