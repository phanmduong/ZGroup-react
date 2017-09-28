<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'book', 'namespace' => 'Modules\Book\Http\Controllers'], function () {
    Route::get('/task-list-templates', 'BookController@taskListTemplates');
    Route::get('/all-task-list-templates', 'BookController@getAllTaskListTemplates');
    Route::get('/book-project', 'BookController@bookProject');
    Route::get('/fashion-project', 'BookController@getFashionProject');
    Route::post('/store-task-list-templates', 'BookController@storeTaskList');
});
