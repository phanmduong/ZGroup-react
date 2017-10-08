<?php
Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/course', 'namespace' => 'Modules\Course\Http\Controllers'], function () {
    Route::get('/getcourses','CourseController@getCourse');
    Route::delete('/deletecourse/{course_id}','CourseController@deleteCourse');
});

