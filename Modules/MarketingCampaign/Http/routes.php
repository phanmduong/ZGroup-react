<?php

$marketingCampaignRoutes = function () {
    Route::group(['prefix' => 'marketing-campaign'], function () {
        Route::get('/user', 'MarketingCampaignController@user');
        Route::get('/all', 'MarketingCampaignController@getAll');
        Route::get('/summary', 'MarketingCampaignController@summaryMarketingCampaign');
        Route::get('/sumary-register', 'MarketingCampaignController@summaryMarketingRegister');
        Route::post('/store', 'MarketingCampaignController@storeMarketingCampaign');
    });
};

$salesRoutes = function () {
    Route::group(['prefix' => 'sales'], function () {
        Route::get('/summary', 'MarketingCampaignController@summarySales');
    });
};

$roomServiceRoutes = function () {
    Route::group(['prefix' => 'room-service'], function () {
        Route::get('/marketing-campaign/summary', 'RoomServiceMarketingCampaignController@summaryMarketingCampaign');
        Route::get('/marketing-campaign/sumary-register', 'RoomServiceMarketingCampaignController@summaryMarketingRegister');
        Route::get('/sales/summary', 'RoomServiceMarketingCampaignController@summarySales');
        Route::get('/room/sales/summary', 'RoomServiceMarketingCampaignController@roomSummarySales');
        Route::get('/room/marketing-campaign/summary', 'RoomServiceMarketingCampaignController@roomMarketingCampaignSummary');        
    });
};
Route::group(['domain' => 'manageapi.' . config('app.domain'),
    'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], $marketingCampaignRoutes);

Route::group(['domain' => 'manageapi.' . config('app.domain'),
    'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], $salesRoutes);

Route::group(['domain' => 'manageapi.' . config('app.domain'),
    'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], $roomServiceRoutes);

// new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'],
    function () use ($marketingCampaignRoutes) {
    });

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'],
    function () use ($marketingCampaignRoutes) {
    });

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'],
    function () use ($marketingCampaignRoutes, $salesRoutes,$roomServiceRoutes) {
        Route::group(['prefix' => 'v3'], $marketingCampaignRoutes);
        Route::group(['prefix' => 'v3'], $salesRoutes);
        Route::group(['prefix' => 'v3'], $roomServiceRoutes);
    });