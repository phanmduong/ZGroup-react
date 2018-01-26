<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'),  'prefix' => 'notification', 'namespace' => 'Modules\Notification\Http\Controllers'], function () {
    Route::get('/list', 'NotificationController@notifications');
    Route::get('/seen', 'NotificationController@readNotifications');
    Route::get('/notification-types', 'NotificationController@allNotificationTypes');
    Route::post('/notification-type', 'NotificationController@createNotificationType');
    Route::put('/notification-type/{notificationTypeId}', 'NotificationController@editNotificationType');
    Route::delete('/notification-type/{notificationTypeId}', 'NotificationController@deleteNotificationType');
});


