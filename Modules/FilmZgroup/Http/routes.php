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
    Route::get('/film/{id}','FilmZgroupManageApiController@getFilmById');
    Route::put('/film/{id}','FilmZgroupManageApiController@updateFilm');
    Route::post('/film/{id}','FilmZgroupManageApiController@deleteFilm');
    Route::post('/film/search_name','FilmZgroupManageApiController@searchFilmByName');
    Route::post('/films/date','FilmZgroupManageApiController@getFilmByDate');
    Route::post('/films/room','FilmZgroupManageApiController@getFilmByRoom');

    Route::get('/films/showing','FilmZgroupManageApiController@getFilmsNowShowing');
    Route::get('/films/comming','FilmZgroupManageApiController@getFilmsCommingSoon');



};

Route::group(['middleware' => 'web', 'domain' => "filmzgroup.test"  , 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $webRoutes);

Route::group([ "prefix" => "/manageapi/v3", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $manageApiRoutes);