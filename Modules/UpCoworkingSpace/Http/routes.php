<?php
$routes = function () {
    Route::get('/', 'GraphicsController@index');

};

$apiRoutes = function () {
    Route::get('/user-packs', 'UpCoworkingSpaceApiController@allUserPacks');
};


Route::group(['domain' => "api." . config('app.domain'), 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], $apiRoutes);

//Route::group(['middleware' => 'web', 'domain' => config('app.domain'), 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], function () {
//    Route::get('/api/blogs', 'BlogApiController@getAllBlogs');
//    Route::get('/api/blog/{id}', 'BlogApiController@getDetailBlog');
//});
//Route::group(['middleware' => 'web', 'prefix' => 'upcoworkingspace', 'namespace' => 'Modules\UpCoworkingSpace\Http\Controllers'], function()
//{
//    Route::get('/', 'UpCoworkingSpaceController@index');
//});
