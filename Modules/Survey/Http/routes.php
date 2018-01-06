<?php

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => '/survey', 'namespace' => 'Modules\Survey\Http\Controllers'], function () {
    Route::get('{surveyId}', 'SurveyController@getSurvey');
});