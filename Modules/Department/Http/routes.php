<?php

$departmentRoutes = function () {
    Route::group(['prefix' => 'department'], function () {
        Route::get('/get-all-departments', 'DepartmentController@getAllDepartment');
        Route::post('/add-department', 'DepartmentController@addDepartment');
        Route::put('/edit-department', 'DepartmentController@editDepartment');
        Route::delete('delete-department/{departmentId}', 'DepartmentController@deleteDepartment');
        Route::post('add-employees/{departmentId}', 'DepartmentController@addEmployees');
        Route::delete('delete-employees/{departmentId}', 'DepartmentController@deleteEmployees');
        Route::get('/summary-employees', 'DepartmentController@summaryEmployee');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Department\Http\Controllers'], $departmentRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Department\Http\Controllers'],
    function () use ($departmentRoutes) {
        Route::group(['prefix' => 'v3'], $departmentRoutes);
    });
