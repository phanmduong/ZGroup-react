<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/base', 'namespace' => 'Modules\Base\Http\Controllers'], function () {
    Route::get('/provinces', 'ManageBaseApiController@provinces');
    Route::get('/province/{provinceId}', 'ManageBaseApiController@basesInProvince');
});
