<?php


$routes = function () {
    Route::group(['prefix' => 'sms'], function () {
        Route::get("/campaign-list", "ManageSmsApiController@getCampaignsList");
        Route::post("/campaign-list", "ManageSmsApiController@createCampaign");
        Route::put("/campaign-list/{campaignId}", "ManageSmsApiController@editCampaign");
        Route::get("/campaign-detail/{campaignId}", "ManageSmsApiController@getCampaignDetail");
        Route::post("/campaign-detail/{campaignId}", "ManageSmsApiController@createTemplate");
        Route::put("/template-list/{templateId}", "ManageSmsApiController@editTemplate");
        Route::get("/template-types", "ManageSmsApiController@getTemplateTypes");
    });
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\Sms\Http\Controllers'], $routes);