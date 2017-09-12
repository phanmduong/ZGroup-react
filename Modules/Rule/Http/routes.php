<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'rule', 'namespace' => 'Modules\Rule\Http\Controllers'], function () {
    Route::get('/', 'ManageRuleApiController@get_rule');
});
