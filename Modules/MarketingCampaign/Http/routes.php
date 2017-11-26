<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'marketing-campaign', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], function () {
    Route::get('/all', 'MarketingCampaignController@getAll');
<<<<<<< HEAD
    Route::get('/summary', 'MarketingCampaignController@summaryMarketingCampaign');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'sales', 'namespace' => 'Modules\MarketingCampaign\Http\Controllers'], function () {
    Route::get('/summary', 'MarketingCampaignController@summarySales');
});
=======
});
>>>>>>> master
