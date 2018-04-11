<?php
$manageNotificationRoutes = function () {
    Route::group(['prefix' => 'notification'], function () {
        Route::get('/list', 'NotificationController@notifications');
        Route::get('/seen', 'NotificationController@readNotifications');
        Route::get('/notification-types', 'NotificationManageApiController@allNotificationTypes');
        Route::post('/notification-type', 'NotificationManageApiController@createNotificationType');
        Route::put('/notification-type/{notificationTypeId}', 'NotificationManageApiController@editNotificationType');
        Route::delete('/notification-type/{notificationTypeId}', 'NotificationManageApiController@deleteNotificationType');
        Route::post('/notification-type/send', 'NotificationManageApiController@sendNotification');
        Route::get('/history-send', 'NotificationManageApiController@historySendNotifications');
    });
};

$notificationRoutes = function () {
    Route::group(['prefix' => 'notification'], function () {
        Route::get('/{notificationId}', 'NotificationApiController@getNotification');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Notification\Http\Controllers'], $manageNotificationRoutes);

Route::group(['domain' => 'api.' . config('app.domain'), 'namespace' => 'Modules\Notification\Http\Controllers'], $notificationRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Notification\Http\Controllers'],
    function () use ($manageNotificationRoutes) {
        Route::group(['prefix' => 'v3'], $manageNotificationRoutes);
    }
);

Route::group(['domain' => config('app.domain'), 'prefix' => 'api', 'namespace' => 'Modules\Notification\Http\Controllers'],
    function () use ($notificationRoutes) {
        Route::group(['prefix' => 'v3'], $notificationRoutes);
    }
);
