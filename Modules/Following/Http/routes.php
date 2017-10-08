<?php


Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'apiv2', 'namespace' => 'Modules\Following\Http\Controllers'], function () {
    Route::post('/follow/{user_id}', 'FollowingController@followUnfollow');
    Route::get('/followers/{user_id}','FollowingController@followers');
    Route::get('/followings/{user_id}', 'FollowingController@followings');
    Route::get('/followings-products/{user_id}', 'FollowingController@followingsProducts');
});