<?php

//Route::group(['middleware' => 'web', 'prefix' => 'task', 'namespace' => 'Modules\Task\Http\Controllers'], function () {
//    Route::get('/', 'TaskController@index');
//});


Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Task\Http\Controllers'], function () {
    // Begin Task api
    Route::get('/project/{projectId}', "TaskController@project");
    Route::post('/project/create', "TaskController@createProject");
    Route::post('/project/status/{projectId}', "TaskController@changeProjectStatus");
    Route::post('/project/delete/{baseId}', "TaskController@deleteProject");
    Route::get('/projects', "TaskController@projects");
    Route::post('/board/create', "TaskController@createBoard");
    Route::get('/boards/{projectId}', "TaskController@getBoards");
    Route::post('/boards/update', "TaskController@updateBoards");
    Route::post('/card/create', "TaskController@createCard");
    Route::post('/cards/update', "TaskController@updateCards");
    Route::post('/card/{cardId}/update', "TaskController@updateCard");
    Route::post('/tasklist/create', "TaskController@createTaskList");
    // End Task api
});