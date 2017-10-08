<?php

Route::group(['middleware' => 'web', 'prefix' => 'course', 'namespace' => 'Modules\Course\Http\Controllers'], function()
{
    Route::get('/', 'CourseController@index');
});
