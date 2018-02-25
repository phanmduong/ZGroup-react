<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'rule', 'namespace' => 'Modules\Rule\Http\Controllers'], function () {
    Route::get('/', 'ManageRuleApiController@get_rule');
});

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'v3/manageapi/rule', 'namespace' => 'Modules\Rule\Http\Controllers'], function () {
    Route::get('/', 'ManageRuleApiController@get_rule');
});
