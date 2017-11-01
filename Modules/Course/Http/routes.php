<?php


Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/course', 'namespace' => 'Modules\Course\Http\Controllers'], function () {
    Route::get('/get-all','CourseController@getAllCourses');
    Route::delete('/delete/{course_id}','CourseController@deleteCourse');
    Route::get('/get-detailed/{cours_id}', 'CourseController@getCourse');
    Route::post('/create-edit', 'CourseController@createOrEdit');
    Route::get('/get-detailed-link/{link_id}', 'CourseController@detailedLink');
    Route::post('/create-link', 'CourseController@createLink');
    Route::delete('/delete-link/{link_id}', 'CourseController@deleteLink');
});

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'apiv2', 'namespace' => 'Modules\Course\Http\Controllers'], function () {
    Route::get('/gens/{genId}/classes', 'ClassApiController@genClasses');
    Route::get('/class/{classId}/attendance/lessons', 'ClassApiController@');
});
