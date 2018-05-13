<?php

$webRoutes = function () {

    Route::get('/', 'FilmZgroupController@index');
    Route::get('/film', 'FilmZgroupController@films');
    Route::get('/film/{id}','FilmZgroupController@film');
    Route::get('/event','FilmZgroupController@event');
    Route::get('/film-categories/{category}','FilmZgroupController@filmsCategory');
    Route::get('/contact-us','FilmZgroupController@contact');
    Route::get('/blog','FilmZgroupController@blogs');
    Route::get('/blog/{id}','FilmZgroupController@blog');

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

    Route::post('/blog', 'FilmZgroupManageApiController@addBlog');
    Route::put('/blog/{id}', 'FilmZgroupManageApiController@updateBlog');
    Route::delete('/blog/{id}', 'FilmZgroupManageApiController@deleteBlog');

    Route::put('/blog/{id}/change', 'FilmZgroupManageApiController@changeBlogStatus');

};

$apiRoutes = function () {
    Route::get('/films', 'PublicFilmApiController@getFilmsFilter');
    Route::get('/sessions', 'PublicFilmApiController@getSessionsFilter');
    Route::get('/sessions/showing', 'PublicFilmApiController@getSessionsNowShowing');
    Route::get('/blogs', 'PublicFilmApiController@getBlogsFilter');

};


Route::group(['middleware' => 'web', 'domain' => "filmzgroup.test", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $webRoutes);
Route::group(['middleware' => 'web', 'domain' => "keetool3.xyz", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $webRoutes);
Route::group(["prefix" => "/manageapi/v3", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $manageApiRoutes);
Route::group(["prefix" => "/api/v3", 'namespace' => 'Modules\FilmZgroup\Http\Controllers'], $apiRoutes);

