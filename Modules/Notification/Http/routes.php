<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'notification', 'namespace' => 'Modules\Notification\Http\Controllers'], function () {
    Route::get('/list', 'NotificationController@notifications');
    Route::get('/seen', 'NotificationController@readNotifications');
    Route::get('/notification-types', 'NotificationManageApiController@allNotificationTypes');
    Route::post('/notification-type', 'NotificationManageApiController@createNotificationType');
    Route::put('/notification-type/{notificationTypeId}', 'NotificationManageApiController@editNotificationType');
    Route::delete('/notification-type/{notificationTypeId}', 'NotificationManageApiController@deleteNotificationType');
    Route::get('/notification-type/send', 'NotificationManageApiController@sendNotification');
});


