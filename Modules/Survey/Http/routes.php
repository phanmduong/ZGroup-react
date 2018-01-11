<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => '/v2/survey', 'namespace' => 'Modules\Survey\Http\Controllers'], function () {
    Route::get('', 'SurveyController@getSurveys');
    Route::get('{surveyId}', 'SurveyController@getSurvey');
    Route::post('', 'SurveyController@createSurvey');
    Route::put('{surveyId}', 'SurveyController@editSurvey');
    Route::delete('{surveyId}', 'SurveyController@deleteSurvey');
    Route::post('/{surveyId}/question', 'SurveyController@createSurveyQuestion');
});
