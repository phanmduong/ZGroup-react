<?php

$routes = function()
{
    // Route::get('/{theme}/courses', 'DemoController@theme1Courses');
    Route::get('/{theme}/courses', 'DemoController@index');

};

Route::group(['domain' => 'demo.test', 'namespace' => 'Modules\Demo\Http\Controllers'], $routes);




