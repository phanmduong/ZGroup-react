<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/lesson', 'namespace' => 'Modules\Lesson\Http\Controllers'], function () {
    Route::get('/get-detail-lesson/{lesson_id}','LessonController@getdetailLesson');
    Route::post('/create-lesson','LessonController@createlesson');
    Route::put('/edit-lesson/{lesson_id}','LessonController@editLesson');
    Route::delete('/delete-lesson/{lesson_id}','LessonController@deleteLesson');
});
