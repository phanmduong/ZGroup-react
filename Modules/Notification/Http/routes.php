<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'),  'prefix' => 'notification', 'namespace' => 'Modules\Notification\Http\Controllers'], function () {
    Route::get('/list', 'NotificationController@notifications');
});
