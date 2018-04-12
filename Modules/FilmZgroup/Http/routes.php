<?php

$webRoutes = function()
{
    Route::get('/', 'FilmZgroupController@index');

};
$manageApiRoutes = function()
{
    #films
    Route::get('/films','FilmZgroupManageApiController@getAllFilms');
    Route::post('/film','FilmZgroupManageApiController@addFilm');
    Route::post('/film/update/{id}','FilmZgroupManageApiController@updateFilm');
    Route::post('/film/{id}','FilmZgroupManageApiController@deleteFilm');

    Route::post('/{session_id}/seat','FilmZgroupManageApiController@changeSeatStatus');
};

$apiRoutes = function()
{
        Route::post('/film/search-name','PublicFilmApiController@searchFilmByName');
        Route::post('/films/date','PublicFilmApiController@getFilmByDate');
        Route::post('/films/room','PublicFilmApiController@getFilmByRoom');
        Route::get('/films/showing','PublicFilmApiController@getFilmsNowShowing');
        Route::get('/films/comming','PublicFilmApiController@getFilmsCommingSoon');
        Route::get('/film/{id}','PublicFilmApiController@getFilmById');
};


Route::group(['middleware' => 'web', 'domain' => "filmzgroup.test"  , 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $webRoutes);
Route::group([ "prefix" => "/manageapi/v3", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $manageApiRoutes);
Route::group([ "prefix" => "/api/v3", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $apiRoutes);

