<?php
$classRoutes = function () {
    Route::group(['prefix' => 'class'], function () {
        Route::get('/all', 'ManageClassApiController@get_classes');
        Route::put('/{class_id}/link-drive', 'ManageClassApiController@addLinkDrive');
        Route::get('/duplicate/{class_id}', 'ManageClassApiController@duplicate_class');
        Route::post('/delete', 'ManageClassApiController@delete_class');
        Route::post('/change-status', 'ManageClassApiController@change_status');
        Route::get('/info-create-class', 'ManageClassApiController@info_create_class');
        Route::post('/store-class', 'ManageClassApiController@store_class');
        Route::get('/generate-class-lesson/{class_id}', 'ManageClassApiController@generateClassLesson');
        Route::put('/change-class-lesson', 'ManageClassApiController@change_class_lesson');
        Route::put('/change-teaching-assistant', 'ManageClassApiController@change_teaching_assistant');
        Route::put('/change-teacher', 'ManageClassApiController@change_teacher');
        Route::get('/staffs', 'ManageClassApiController@staffs');
        Route::get('/{class_id}', 'ManageClassApiController@get_data_class');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\StudyClass\Http\Controllers'], $classRoutes);


//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\StudyClass\Http\Controllers'],
    function () use ($classRoutes) {
        Route::group(['prefix' => 'v3'], $classRoutes);
    });