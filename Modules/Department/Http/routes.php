<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'department', 'namespace' => 'Modules\Department\Http\Controllers'], function()
{
    Route::get('/get-all-departments','DepartmentController@getAllDepartment');
    Route::post('/add-department','DepartmentController@addDepartment');
    Route::put('/edit-department','DepartmentController@editDepartment');
    Route::delete('delete-department','DepartmentController@deleteDepartment');
});
