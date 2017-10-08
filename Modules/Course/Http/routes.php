<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'course', 'namespace' => 'Modules\Course\Http\Controllers'], function () {
    Route::get('/get-detailed/{cours_id}', 'CourseController@getCourse');
    Route::post('/create-edit', 'CourseController@createOrEditCourse');
});

