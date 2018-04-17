<?php

$languageRoutes = function () {
    Route::group(['prefix' => 'language'], function () {
        Route::get('/all','LanguageController@getAllLanguage');
        Route::post('/','LanguageController@createLanguage');
        Route::put('/{languageId}','LanguageController@editLanguage');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Language\Http\Controllers'], $languageRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Language\Http\Controllers'],
    function () use ($languageRoutes) {
        Route::group(['prefix' => 'v3'], $languageRoutes);
    });