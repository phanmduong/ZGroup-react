<?php
Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/lesson', 'namespace' => 'Modules\Lesson\Http\Controllers'], function () {

});
Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/lesson', 'namespace' => 'Modules\Lesson\Http\Controllers'], function () {
    Route::get('/get-detail-lesson/{lesson_id}','LessonController@getdetailLesson');
    Route::post('/create-lesson/{courseId}','LessonController@createlesson');
    Route::put('/edit-lesson/{lessonId}','LessonController@editLesson');
    Route::delete('/delete-lesson/{lessonId}','LessonController@deleteLesson');
    Route::get('/term/{term_id}', 'LessonController@getTerm');
    Route::get('/term/course/{course_id}', 'LessonController@getTermsCourse');
    Route::post('/term/create', 'LessonController@createTerm');
    Route::put('/term/{term_id}/edit', 'LessonController@editTerm');
    Route::delete('/term/{term_id}/delete', 'LessonController@deleteTerm');
});
