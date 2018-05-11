<?php

$webRoutes = function () {
    Route::get('/', 'FilmZgroupController@index');
    Route::get('/{id}','FilmZgroupController@film');

};
$manageApiRoutes = function () {

    Route::post('/film', 'FilmZgroupManageApiController@addFilm');
    Route::put('/film/{id}', 'FilmZgroupManageApiController@updateFilm');
    Route::delete('/film/{id}', 'FilmZgroupManageApiController@deleteFilm');

    Route::post('/session', 'FilmZgroupManageApiController@addSession');
    Route::put('/session/{id}', 'FilmZgroupManageApiController@updateSession');
    Route::delete('/session/{id}', 'FilmZgroupManageApiController@deleteSession');

    Route::put('/film/{id}/change', 'FilmZgroupManageApiController@changeFilmInfo');
    Route::put('/{session_id}/seat', 'FilmZgroupManageApiController@changeSeatStatus');
};

$apiRoutes = function () {
    Route::get('/films', 'PublicFilmApiController@getFilmsFilter');
    Route::get('/sessions', 'PublicFilmApiController@getSessionsFilter');
    Route::get('/sessions/showing', 'PublicFilmApiController@getSessionsNowShowing');
};


Route::group(['middleware' => 'web', 'domain' => "filmzgroup.test", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $webRoutes);
Route::group(["prefix" => "/manageapi/v3", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $manageApiRoutes);
Route::group(["prefix" => "/api/v3", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $apiRoutes);

