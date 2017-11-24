<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'coupon', 'namespace' => 'Modules\Coupon\Http\Controllers'], function()
{
    Route::get('/', 'CouponController@index');
});
