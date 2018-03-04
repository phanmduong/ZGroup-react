<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'class', 'namespace' => 'Modules\StudyClass\Http\Controllers'], function () {
    Route::get('/all', 'ManageClassApiController@get_classes');
    Route::get('/teachers/{class_id}', 'ManageClassApiController@getClassTeachings');
    Route::get('/teachers-lesson/{class_lesson_id}', 'ManageClassApiController@getTeachersLesson');
    Route::get('/teaching-assistants-lesson/{class_lesson_id}', 'ManageClassApiController@getTeachingAssisLesson');
    Route::post('/change-teaching-lesson', 'ManageClassApiController@changeTeachingLesson');
    Route::put('/{class_id}/link-drive', 'ManageClassApiController@addLinkDrive');
    Route::get('/duplicate/{class_id}', 'ManageClassApiController@duplicate_class');
    Route::post('/delete', 'ManageClassApiController@delete_class');
    Route::post('/change-status', 'ManageClassApiController@change_status');
    Route::get('/info-create-class', 'ManageClassApiController@info_create_class');
    Route::post('/store-class', 'ManageClassApiController@store_class');
    Route::put('/change-class-lesson', 'ManageClassApiController@change_class_lesson');
    Route::put('/change-teaching-assistant', 'ManageClassApiController@change_teaching_assistant');
    Route::put('/change-teacher', 'ManageClassApiController@change_teacher');
    Route::get('/staffs', 'ManageClassApiController@staffs');
    Route::get('/{class_id}', 'ManageClassApiController@get_data_class');

});
