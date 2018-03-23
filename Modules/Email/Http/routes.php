<?php

$emailRoutes = function () {
    Route::group(['prefix' => 'email'], function () {
        Route::get('/subscribers-list', 'ManageEmailApiController@subscribers_list');
        Route::get('/subscribers-list/all', 'ManageEmailApiController@subscribers_list_all');
        Route::get('/subscribers-list/{subscribers_list_id}', 'ManageEmailApiController@subscribers_list_item');
        Route::delete('/subscribers-list/{subscribers_list_id}', 'ManageEmailApiController@delete_subscribers_list');
        Route::post('/subscribers-list/store', 'ManageEmailApiController@store_subscribers_list');
        Route::get('/subscribers', 'ManageEmailApiController@subscribers');
        Route::post('/subscriber/add', 'ManageEmailApiController@add_subscriber');
        Route::post('/subscriber/edit', 'ManageEmailApiController@edit_subscriber');
        Route::post('/subscribers/upload-file', 'ManageEmailApiController@upfile_add_subscribers');
        Route::delete('/subscribers/delete', 'ManageEmailApiController@delete_subscriber');
        Route::post('/campaign/store', 'ManageEmailApiController@store_campaign');
        Route::delete('/campaign/{campaign_id}', 'ManageEmailApiController@delete_campaign');
        Route::get('/campaigns', 'ManageEmailApiController@get_campaigns');
        Route::post('/email-post-facebook', 'ManageEmailApiController@get_gmails_post_facebook');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Email\Http\Controllers'], $emailRoutes);

//new api routes

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Email\Http\Controllers'],
    function () use ($emailRoutes) {
        Route::group(['prefix' => 'v3'], $emailRoutes);
    }
);
