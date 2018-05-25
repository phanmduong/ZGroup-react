<?php
$lessonRoutes = function () {
    Route::group(['prefix' => 'v2/lesson'], function () {
        Route::get('/get-detail-lesson/{lesson_id}', 'LessonController@getdetailLesson');
        Route::post('/create-lesson/{courseId}', 'LessonController@createlesson');
        Route::put('/edit-lesson/{lessonId}', 'LessonController@editLesson');
        Route::delete('/delete-lesson/{lessonId}', 'LessonController@deleteLesson');
        Route::get('/term/{term_id}', 'LessonController@getTerm');
        Route::get('/term/course/{course_id}', 'LessonController@getTermsCourse');
        Route::post('/term/create', 'LessonController@createTerm');
        Route::put('/term/{term_id}/edit', 'LessonController@editTerm');
        Route::delete('/term/{term_id}/delete', 'LessonController@deleteTerm');
        Route::post('/{lessonId}/duplicate', 'LessonController@duplicateLesson');
        Route::post('/term/{termId}/duplicate', 'LessonController@duplicateTerm');
    });
};

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => '/lesson', 'namespace' => 'Modules\Lesson\Http\Controllers'], function () {
    Route::get('{lessonId}/survey', 'LessonSurveyApiController@lessonSurveys');
});

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Lesson\Http\Controllers'], $lessonRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => '/api/v3/lesson', 'namespace' => 'Modules\Lesson\Http\Controllers'], function () {
    Route::get('{lessonId}/survey', 'LessonSurveyApiController@lessonSurveys');

});

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Lesson\Http\Controllers'],
    function () use ($lessonRoutes) {
        Route::group(['prefix' => 'v3'], $lessonRoutes);
    });