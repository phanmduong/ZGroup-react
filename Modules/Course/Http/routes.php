<?php
Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'course', 'namespace' => 'Modules\Course\Http\Controllers'], function () {
    Route::post('/{courseId}/pixel', 'PixelApiController@createPixel');
    Route::put('/pixel/{pixelId}', 'PixelApiController@editPixel');
    Route::delete('/pixel/{pixelId}', 'PixelApiController@deletePixel');

    Route::get('/type', 'CourseTypeApiController@getTypes');
    Route::post('/type','CourseTypeApiController@addType');
    Route::put('/type/{typeId}','CourseTypeApiController@editType');
    Route::delete('/type/{typeId}','CourseTypeApiController@deleteType');

    Route::get('/category', 'CourseCategoryApiController@getCategories');
    Route::post('/category', 'CourseCategoryApiController@createCategory');
    Route::put('/category/{categoryId}', 'CourseCategoryApiController@editCategory');
    Route::delete('/category/{categoryId}', 'CourseCategoryApiController@deleteCategory');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/course', 'namespace' => 'Modules\Course\Http\Controllers'], function () {
    Route::get('/get-all','CourseController@getAllCourses');
    Route::get('/all','CourseController@getAll');
    Route::delete('/delete/{course_id}','CourseController@deleteCourse');
    Route::get('/get-detailed/{course_id}', 'CourseController@getCourse');
    Route::post('/create-edit', 'CourseController@createOrEdit');
    Route::get('/get-detailed-link/{link_id}', 'CourseController@detailedLink');
    Route::post('/create-link', 'CourseController@createLink');
    Route::put('/edit-link/{linkId}', 'CourseController@editLink');
    Route::delete('/delete-link/{link_id}', 'CourseController@deleteLink');
    Route::post('/lesson/add/{courseId}', 'CourseController@addLesson');
    Route::put('/lesson/edit/{lessonId}', 'CourseController@editLesson');
    Route::get('/get-attendance-lesson/{classId}/{lessonId}','CourseController@getAttendance');
    Route::post('/change-attendances','CourseController@changeAttendance');
    Route::put('/{course_id}/change-status','CourseController@changeStatusCourse');
    Route::post('/{courseId}/duplicate','CourseController@duplicateCourse');
});

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => '/v2/course', 'namespace' => 'Modules\Course\Http\Controllers'], function () {
    Route::get('/get-all','CoursePublicApiController@getAllCourses');
    Route::get('/get-detailed/{course_id}', 'CoursePublicApiController@getCourse');
});


Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'apiv2', 'namespace' => 'Modules\Course\Http\Controllers'], function () {
    Route::get('/gens/{genId}/classes', 'ClassApiController@genClasses');
    Route::get('/class/{classId}/attendance/lessons', 'ClassApiController@classLessons');
    Route::get('/gens/teachers','ClassApiController@getAllTeacher');
});
