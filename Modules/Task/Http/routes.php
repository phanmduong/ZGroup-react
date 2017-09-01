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
    Route::get('/card/{cardId}/detail', "CardController@card");
    Route::post('/card/{cardId}/update', "TaskController@updateCard");
    Route::put('/card/{cardId}/update-title', "CardController@updateCardTitle");
    Route::put('/card/{cardId}/deadline', "CardController@updateCardDeadline");
    Route::post('/card/{cardId}/user/{userId}', "CardController@assignMember");
    Route::post('/card/{cardId}/file', "FileController@uploadFile");
    Route::delete('/card-file/{fileId}', "FileController@deleteFile");

    Route::post('/tasklist/create', "TaskController@createTaskList");
    Route::delete('/tasklist/{id}/delete', "TaskController@deleteTaskList");
    Route::post('/tasklist/create', "TaskController@createTaskList");
    Route::get('/tasklists/{cardId}', "TaskController@taskLists");

    Route::post('/task/create', "TaskController@createTask");
    Route::delete('/task/{taskId}/delete', "TaskController@deleteTask");
    Route::post('/task/{taskId}/toggle', "TaskController@toggleTask");

    Route::get('/members/{filter?}', "TaskController@loadMembers");

    Route::post('/project/{projectId}/create-label', "CardLabelController@createLabel");
    Route::get('/project/{projectId}/labels', "CardLabelController@loadLabels");
    Route::delete('/cardlabel/{cardLabelId}', "CardLabelController@deleteCardLabel");
    Route::post('/cardlabel/{cardLabelId}/card/{cardId}', "CardLabelController@assignCardLabel");

    Route::get('/user/{userId}/calendar-events', "TaskController@loadCalendarEvents");
    // End Task api
});