<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/base', 'namespace' => 'Modules\Base\Http\Controllers'], function () {
    Route::get('/districts', 'ManageBaseApiController@districts');
    Route::get('/district/{districtId}', 'ManageBaseApiController@basesInDistrict');
});
