<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'rule', 'namespace' => 'Modules\Rule\Http\Controllers'], function () {
    Route::get('/', 'ManageRuleApiController@get_rule');
});

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3/rule', 'namespace' => 'Modules\Rule\Http\Controllers'], function () {
    Route::get('/', 'ManageRuleApiController@get_rule');
});
