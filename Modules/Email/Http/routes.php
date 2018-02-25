<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'email', 'namespace' => 'Modules\Email\Http\Controllers'], function () {
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

});

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'v3/manageapi/email', 'namespace' => 'Modules\Email\Http\Controllers'], function () {
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
});
