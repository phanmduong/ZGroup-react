<?php
$manageCourseRoutes = function () {
    Route::group(['prefix' => 'course'], function () {
        Route::post('/{courseId}/pixel', 'PixelApiController@createPixel');
        Route::put('/pixel/{pixelId}', 'PixelApiController@editPixel');
        Route::delete('/pixel/{pixelId}', 'PixelApiController@deletePixel');

        Route::get('/type', 'CourseTypeApiController@getTypes');
        Route::post('/type', 'CourseTypeApiController@addType');
        Route::put('/type/{typeId}', 'CourseTypeApiController@editType');
        Route::delete('/type/{typeId}', 'CourseTypeApiController@deleteType');

        Route::get('/category', 'CourseCategoryApiController@getCategories');
        Route::post('/category', 'CourseCategoryApiController@createCategory');
        Route::put('/category/{categoryId}', 'CourseCategoryApiController@editCategory');
        Route::delete('/category/{categoryId}', 'CourseCategoryApiController@deleteCategory');
    });
};

$v2ManageCourseRoutes = function () {
    Route::group(['prefix' => 'v2/course'], function () {
        Route::get('/get-all', 'CourseController@getAllCourses');
        Route::get('/all', 'CourseController@getAll');
        Route::delete('/delete/{course_id}', 'CourseController@deleteCourse');
        Route::get('/get-detailed/{course_id}', 'CourseController@getCourse');
        Route::post('/create-edit', 'CourseController@createOrEdit');
        Route::get('/get-detailed-link/{link_id}', 'CourseController@detailedLink');
        Route::post('/create-link', 'CourseController@createLink');
        Route::put('/edit-link/{linkId}', 'CourseController@editLink');
        Route::delete('/delete-link/{link_id}', 'CourseController@deleteLink');
        Route::post('/lesson/add/{courseId}', 'CourseController@addLesson');
        Route::put('/lesson/edit/{lessonId}', 'CourseController@editLesson');
        Route::put('/lesson/edit-term/{lessonId}', 'CourseController@editTermLesson');
        Route::get('/get-attendance-lesson/{classId}/{classLessonId}', 'CourseController@getAttendance');
        Route::post('/change-attendances', 'CourseController@changeAttendance');
        Route::put('/{course_id}/change-status', 'CourseController@changeStatusCourse');
        Route::put('/{course_id}/change-order', 'CourseController@changeOrderCourse');
        Route::post('/{courseId}/duplicate', 'CourseController@duplicateCourse');
        Route::get('/{courseId}/class', 'ClassApiController@getClasses');
    });
    Route::group(['prefix' => 'v2/register'], function () {
        Route::post('/', 'CourseController@register');
    });
    Route::group(['prefix' => 'v2/class'], function () {

        Route::get('/', 'CourseController@classes');
    });
};

$v2CourseRoutes = function () {
    Route::group(['prefix' => 'v2/course'], function () {
        Route::get('/get-all', 'CoursePublicApiController@getAllCourses');
        Route::get('/get-all/app', 'CoursePublicApiController@getAllCoursesApp');
        Route::get('/get-detailed/{course_id}', 'CoursePublicApiController@getCourse');
        Route::get('/{courseId}/class', 'CoursePublicApiController@getClasses');
    });
};

$apiv2CourseRoutes = function () {
    Route::group(['prefix' => 'apiv2'], function () {
        Route::get('/gens/{genId}/classes', 'ClassApiController@genClasses');
        Route::get('/class/{classId}/attendance/lessons', 'ClassApiController@classLessons');
        Route::get('/gens/teachers', 'ClassApiController@getAllTeacher');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Course\Http\Controllers'], $manageCourseRoutes);

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Course\Http\Controllers'], $v2ManageCourseRoutes);

Route::group(['domain' => 'api.' . config('app.domain'), 'namespace' => 'Modules\Course\Http\Controllers'], $v2CourseRoutes);

Route::group(['domain' => 'api.' . config('app.domain'), 'namespace' => 'Modules\Course\Http\Controllers'], $apiv2CourseRoutes);

//new api routes

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Course\Http\Controllers'],
    function () use ($manageCourseRoutes) {
        Route::group(['prefix' => 'v3'], $manageCourseRoutes);
    }
);

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Course\Http\Controllers'],
    function () use ($v2ManageCourseRoutes) {
        Route::group(['prefix' => 'v3'], $v2ManageCourseRoutes);
    }
);

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'api', 'namespace' => 'Modules\Course\Http\Controllers'],
    function () use ($v2CourseRoutes) {
        Route::group(['prefix' => 'v3'], $v2CourseRoutes);
    }
);

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'api', 'namespace' => 'Modules\Course\Http\Controllers'],
    function () use ($apiv2CourseRoutes) {
        Route::group(['prefix' => 'v3'], $apiv2CourseRoutes);
    }
);