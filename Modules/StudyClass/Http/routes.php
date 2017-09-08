<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'class', 'namespace' => 'Modules\StudyClass\Http\Controllers'], function()
{
    Route::get('/all', 'ManageClassApiController@get_classes');
});
