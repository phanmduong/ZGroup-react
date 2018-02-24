<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'marketing-campaign', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], function () {
    Route::get('/all', 'MarketingCampaignController@getAll');
    Route::get('/summary', 'MarketingCampaignController@summaryMarketingCampaign');
    Route::get('/sumary-register', 'MarketingCampaignController@summaryMarketingRegister');
    Route::post('/store', 'MarketingCampaignController@storeMarketingCampaign');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'sales', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], function () {
    Route::get('/summary', 'MarketingCampaignController@summarySales');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'room-service', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], function () {
    Route::get('/marketing-campaign/summary', 'RoomServiceMarketingCampaignController@summaryMarketingCampaign');
    Route::get('/marketing-campaign/sumary-register', 'RoomServiceMarketingCampaignController@summaryMarketingRegister');
    Route::get('/sales/summary', 'MarketingCampaignController@summarySales');
});
