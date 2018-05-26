<?php


$routes = function () {
    Route::group(['prefix' => 'sms'], function () {
        Route::get("/campaign-list", "ManageSmsApiController@getCampaignsList");
        Route::post("/campaign-list", "ManageSmsApiController@createCampaign");
        Route::put("/campaign-list/{campaignId}", "ManageSmsApiController@editCampaign");
        Route::put("/campaign-list/{campaignId}/change-status", "ManageSmsApiController@changeCampaignStatus");
        Route::get("/campaign-detail/{campaignId}/template-list", "ManageSmsApiController@getCampaignTemplates");
        Route::get("/campaign-detail/{campaignId}/receiver-list", "ManageSmsApiController@getCampaignReceivers");
        Route::post("/campaign-detail/{campaignId}", "ManageSmsApiController@createTemplate");
        Route::put("/template-list/{templateId}", "ManageSmsApiController@editTemplate");
        Route::get("/template-types", "ManageSmsApiController@getTemplateTypes");
        Route::post("/template-types", "ManageSmsApiController@createTemplateType");
        Route::put("/template-types/{templateTypeId}", "ManageSmsApiController@editTemplateType");
        Route::get("/user-list/{campaignId}", "ManageSmsApiController@getReceiversChoice");
        Route::post("/user-list/{campaignId}", "ManageSmsApiController@addUsersIntoCampaign");
        Route::get("/history/{campaignId}", "ManageSmsApiController@getHistory");
        Route::get("/history/{campaignId}/user", "ManageSmsApiController@getHistoryUser");
        Route::delete("/user-list/{campaignId}", "ManageSmsApiController@removeUserFromCampaign");
    });
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\Sms\Http\Controllers'], $routes);