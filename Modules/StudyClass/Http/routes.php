<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'class', 'namespace' => 'Modules\StudyClass\Http\Controllers'], function()
{
    Route::get('/all', 'ManageClassApiController@get_classes');
    Route::get('/duplicate/{class_id}', 'ManageClassApiController@duplicate_class');
    Route::post('/delete', 'ManageClassApiController@delete_class');
    Route::post('/change-status', 'ManageClassApiController@change_status');
});
