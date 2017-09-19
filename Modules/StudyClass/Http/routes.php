<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'class', 'namespace' => 'Modules\StudyClass\Http\Controllers'], function () {
    Route::get('/all', 'ManageClassApiController@get_classes');
    Route::get('/duplicate/{class_id}', 'ManageClassApiController@duplicate_class');
    Route::post('/delete', 'ManageClassApiController@delete_class');
    Route::post('/change-status', 'ManageClassApiController@change_status');
    Route::get('/info-create-class', 'ManageClassApiController@info_create_class');
    Route::post('/store-class', 'ManageClassApiController@store_class');
    Route::get('/{class_id}', 'ManageClassApiController@get_data_class');

});
