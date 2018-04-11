<?php

$routes = function () {
    // project api
    Route::get('/project/{projectId}', 'TaskController@getProject');
    Route::put('/project/{projectId}/member/{memberId}/role/{role}', 'CardController@changeRoleProjectMember');
    Route::post('/project/create', 'TaskController@createProject');
    Route::post('/project/status/{projectId}', 'TaskController@changeProjectStatus');
    Route::post('/project/delete/{baseId}', 'TaskController@deleteProject');
    Route::get('/projects', 'TaskController@projects');
    Route::get('/projects/archive', 'TaskController@archiveProjects');
    Route::put('/project/{projectId}/toggle-archive', 'TaskController@toggleProject');
    Route::post('/project/{projectId}/user/{userId}', 'CardController@assignProjectMember');
    Route::put('/project/{projectId}/setting', 'TaskController@changeProjectSetting');
    Route::put('/project/{projectId}/start-board/{boardId}', 'TaskController@putStartBoard');
    Route::post('/project/{projectId}/create-label', 'CardLabelController@createLabel');
    Route::get('/project/{projectId}/labels', 'CardLabelController@loadLabels');
    Route::get('/project/{projectId}/archive-cards', 'CardController@archiveCards');
    Route::put('/project/{projectId}/personal-setting', 'TaskController@changeProjectPersonalSetting');
    Route::get('/project/{projectId}/personal-setting', 'TaskController@loadProjectPersonalSetting');

    // board api
    Route::post('/boards/update', 'BoardController@updateBoards');
    Route::post('/board/create', 'BoardController@createBoard');
    Route::get('/boards/{projectId}', 'BoardController@getBoards');
    Route::put('/board/{boardId}/archive', 'BoardController@archiveBoard');
    Route::put('/board/{boardId}/unarchive', 'BoardController@unarchiveBoard');
    Route::get('/boards/{projectId}/archive', 'BoardController@getArchiveBoards');

    // card api
    Route::get('/card/chart', 'CardController@countStaffCards');
    Route::get('/card', 'CardController@getCardsFiltered');
    Route::put('/card/{cardId}/toggle-archive', 'TaskController@archiveCard');
    Route::put('/card/{cardId}/point/{point}', 'CardController@setPointCard');
    Route::post('/card/create', 'TaskController@createCard');
    Route::delete('/card/{cardId}/delete', 'TaskController@deleteCard');
    Route::post('/cards/update', 'TaskController@updateCards');
    Route::get('/card/{cardId}/detail', 'CardController@card');
    Route::post('/card/{cardId}/update', 'TaskController@updateCard');
    Route::put('/card/{cardId}/update-title', 'CardController@updateCardTitle');
    Route::put('/card/{cardId}/deadline', 'CardController@updateCardDeadline');
    Route::post('/card/{cardId}/user/{userId}', 'CardController@assignMember');
    Route::post('/card/{cardId}/file', 'FileController@uploadFile');
    Route::post('/card/{cardId}/url', 'FileController@addUrl');
    Route::delete('/card-file/{fileId}', 'FileController@deleteFile');
    Route::delete('/card-comment/{id}', 'TaskController@deleteCardComment');
    Route::post('/card/{cardId}/comment', 'CardController@commentCard');
    Route::post('/card/{cardId}/properties-filled', 'CardController@getGoodPropertiesFilled');

    // tasklist api
    Route::post('/tasklist/create', 'TaskController@createTaskList');
    Route::post('/tasklist-template/create', 'TaskController@createTaskListFromTemplate');
    Route::delete('/tasklist/{id}/delete', 'TaskController@deleteTaskList');
    Route::get('/tasklist/{id}', 'TaskController@getTaskList');
    Route::post('/tasklist/create', 'TaskController@createTaskList');
    Route::get('/tasklists/{cardId}', 'TaskController@taskLists');
    Route::put('/tasklist/update-tasks-order', 'TaskController@putUpdateTaskOrder');
    Route::put('/tasklist/{id}/autoassign-board', 'TaskController@autoAssignBoardToTask');
    Route::put('/tasklist/{id}/first-task-property', 'TaskController@taskListFirstProperty');
    Route::put('/tasklist-template/{type}', 'TaskController@tasklistTemplate');
    Route::get('/tasklist-templates/{projectId}', 'TaskController@loadAllTaskListTemplates');
    Route::get('/tasklist-templates/{taskListId}/items', 'TaskController@getTasklistPropertyItems');

    // task api
    Route::post('/task/create', 'TaskController@createTask');
    Route::delete('/task/{taskId}/delete', 'TaskController@deleteTask');
    Route::post('/task/{taskId}/toggle', 'TaskController@toggleTask');
    Route::put('/task/{taskId}/members', 'TaskController@addMemberToTask');
    Route::put('/task/{taskId}/deadline', 'TaskController@saveTaskDeadline');
    Route::put('/task/{taskId}/span', 'TaskController@saveTaskSpan');
    Route::put('/task/{taskId}/title', 'TaskController@editTaskName');
    Route::get('/task/{taskId}/available-members', 'TaskController@taskAvailableMembers');

    Route::get('/members/{filter?}', 'TaskController@loadMembers');
    Route::get('/project-members/{filter?}', 'TaskController@loadProjectMembers');

    Route::delete('/cardlabel/{cardLabelId}', 'CardLabelController@deleteCardLabel');
    Route::post('/cardlabel/{cardLabelId}/card/{cardId}', 'CardLabelController@assignCardLabel');

    Route::get('/user/{userId}/calendar-events', 'TaskController@loadCalendarEvents');

    // End Task api
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Task\Http\Controllers'], $routes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Task\Http\Controllers'], function () use ($routes) {
    Route::group(['prefix' => 'v3'], $routes);
});
