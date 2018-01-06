<?php

Route::group(['middleware' => 'web', 'prefix' => 'elearning', 'namespace' => 'Modules\Elearning\Http\Controllers'], function () {
    Route::post('/{lesson_id}/add-comment', 'ElearningController@storeComment');
});
