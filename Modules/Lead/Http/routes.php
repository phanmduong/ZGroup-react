<?php

Route::group(['middleware' => 'web', 'prefix' => 'lead', 'namespace' => 'Modules\Lead\Http\Controllers'], function () {
    Route::get('/', 'LeadController@index');
});

$routes = function () {
    Route::group(['prefix' => 'lead'], function () {
        Route::post('/create', 'ManageLeadApiController@createLeads');
        Route::get('/all', 'ManageLeadApiController@getLeads');
        Route::put('/edit-info', 'ManageLeadApiController@editInfo');
    });
};


Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Lead\Http\Controllers'],
    function () use ($routes) {
        Route::group(['prefix' => 'v3'], $routes);
    });
