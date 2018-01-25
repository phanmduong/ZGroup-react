<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/survey', 'namespace' => 'Modules\Survey\Http\Controllers'], function () {


    Route::get('', 'SurveyController@getSurveys');

    Route::get('/history', 'SurveyController@getSurveyHistory');
    Route::get('/{surveyId}/result', 'SurveyController@surveyResult');

    Route::post('', 'SurveyController@createSurvey');
    Route::post('/{surveyId}', 'SurveyController@editSurvey');

    Route::post('/{surveyId}/user-lesson', 'SurveyController@createUserLessonSurvey');
    Route::put('/user-lesson-survey/{userLessonSurveyId}', 'SurveyController@endUserLessonSurvey');
    Route::post('/question/{questionId}/user-lesson/{userLessonSurveyId}/answer', 'SurveyController@saveUserLessonSurveyQuestion');

    Route::put('/questions', 'SurveyController@updateQuestionOrder');
    Route::put('{surveyId}', 'SurveyController@editSurvey');

    Route::delete('{surveyId}', 'SurveyController@deleteSurvey');
    Route::post('/{surveyId}/question', 'SurveyController@updateQuestion');
    Route::post('/{surveyId}/lesson/{lessonId}', 'SurveyController@addSurveyLesson');
    Route::delete('/{surveyId}/lesson/{lessonId}', 'SurveyController@removeSurveyLesson');
    Route::get('/{surveyId}/lesson', 'SurveyController@getSurveyLessons');
    Route::put('/{surveyId}/question/{questionId}', 'SurveyController@updateQuestion');
    Route::post('/{surveyId}/question/{questionId}', 'SurveyController@duplicateQuestion');
    Route::delete('/question/{questionId}', 'SurveyController@deleteQuestion');
    Route::delete('/question/{questionId}', 'SurveyController@deleteQuestion');

});
