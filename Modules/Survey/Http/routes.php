<?php

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => '/survey', 'namespace' => 'Modules\Survey\Http\Controllers'], function () {
    Route::get('', 'SurveyController@getSurveys');
    Route::get('{surveyId}', 'SurveyController@getSurvey');
    Route::post('', 'SurveyController@createSurvey');
    Route::put('{surveyId}', 'SurveyController@editSurvey');
    Route::delete('{surveyId}', 'SurveyController@deleteSurvey');
});