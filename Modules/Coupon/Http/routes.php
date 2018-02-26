<?php
$couponRoutes = function () {
    Route::group(['prefix' => 'coupon'], function () {
        Route::post('/create', 'CouponController@createCoupon');
        Route::delete('/{couponId}/delete', 'CouponController@deleteCoupon');
        Route::get('/all', 'CouponController@allCoupons');
        Route::put('/{couponId}/edit', 'CouponController@editCoupon');
        Route::get('/{couponId}/detailed', 'CouponController@detailedCoupon');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Coupon\Http\Controllers'], $couponRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Coupon\Http\Controllers'],
    function () use ($couponRoutes) {
        Route::group(['prefix' => 'v3'], $couponRoutes);
    });
