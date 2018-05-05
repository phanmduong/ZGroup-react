<?php
$surveyRoutes = function () {
    Route::group(['prefix' => 'v2/survey'], function () {
        Route::get('', 'SurveyController@getSurveys');

        Route::get('/history', 'SurveyController@getSurveyHistory');
        Route::get('/{surveyId}', 'SurveyController@getSurvey');
        Route::get('/{surveyId}/result', 'SurveyController@surveyResult');
        Route::get('/{surveyId}/user-summary', 'SurveyController@summarySurvey');

        Route::post('', 'SurveyController@createSurvey');
        Route::post('/{surveyId}', 'SurveyController@editSurvey');

        Route::post('/{surveyId}/user-lesson', 'SurveyController@createUserLessonSurvey');
        Route::put('/user-lesson-survey/{userLessonSurveyId}', 'SurveyController@endUserLessonSurvey');
        Route::post('/question/{questionId}/user-lesson/{userLessonSurveyId}/answer', 'SurveyController@saveUserLessonSurveyQuestion');

        Route::put('/questions', 'SurveyController@updateQuestionOrder');
        Route::put('/{surveyId}', 'SurveyController@editSurvey');

        Route::delete('/{surveyId}', 'SurveyController@deleteSurvey');
        Route::post('/{surveyId}/question', 'SurveyController@updateQuestion');
        Route::post('/{surveyId}/lesson/{lessonId}', 'SurveyController@addSurveyLesson');
        Route::delete('/{surveyId}/lesson/{lessonId}', 'SurveyController@removeSurveyLesson');
        Route::get('/{surveyId}/lesson', 'SurveyController@getSurveyLessons');
        Route::put('/{surveyId}/question/{questionId}', 'SurveyController@updateQuestion');
        Route::post('/{surveyId}/question/{questionId}', 'SurveyController@duplicateQuestion');
        Route::delete('/question/{questionId}', 'SurveyController@deleteQuestion');
        Route::delete('/question/{questionId}', 'SurveyController@deleteQuestion');
    });
};

$appSurveyRoutes = function () {
    Route::group(['v2/app/survey'], function () {
        Route::get('', 'AppSurveyController@getSurveys');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Survey\Http\Controllers'], $surveyRoutes);

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Survey\Http\Controllers'], $appSurveyRoutes);

//new api routes

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Survey\Http\Controllers'],
    function () use ($surveyRoutes, $appSurveyRoutes) {
        Route::group(['prefix' => 'v3'], $surveyRoutes);
        Route::group(['prefix' => 'v3'], $appSurveyRoutes);
    }
);
$publicSurveyRoutes = function () {
    Route::get('/survey/{surveyId}/render', 'RenderSurveyController@render');
    Route::post('/survey/{surveyId}/store', 'RenderSurveyController@submitForm');
    Route::get('/survey/submitted', 'RenderSurveyController@surveySubmitted');
};

Route::group(
    [
        'middleware' => 'web',
        'domain' => config('app.domain'),
        'namespace' => 'Modules\Survey\Http\Controllers',
    ],
    $publicSurveyRoutes
);
