<?php

//Route::group(['middleware' => 'web', 'domain' => config("app.domain_commerce"), 'namespace' => 'Modules\Graphics\Http\Controllers'], function () {
Route::group(['middleware' => 'web', 'domain' => "graphics.{subfix}", 'namespace' => 'Modules\Graphics\Http\Controllers'], function () {
    Route::get('/', 'GraphicsController@index');
    Route::get('/contact-us', 'GraphicsController@contact_us');
    Route::get('/about-us', 'GraphicsController@aboutUs');
    Route::post('/contact_information', 'GraphicsController@contact_info');
    Route::get('/book/{good_id}', 'GraphicsController@book');
    Route::get('/add-book/{goodId}', 'GraphicsController@addGoodToCart');
    Route::get('/remove-book/{goodId}', 'GraphicsController@removeBookFromCart');
    Route::get('/load-books-from-session', 'GraphicsController@getGoodsFromSession');
    Route::get('/count-books-from-session', 'GraphicsController@countGoodsFromSession');
    Route::get('/about-us', 'GraphicsController@about_us');
    Route::post('/contact_information', 'GraphicsController@contact_info');
    Route::get('/book/{good_id}', 'GraphicsController@book');
    Route::get('/blog', 'GraphicsController@blog');
    Route::get('/blog/post/{post_id}', 'GraphicsController@post');
    Route::post('/save-order', "GraphicsController@saveOrder");
    Route::get('/api/blogs', 'BlogApiController@getAllBlogs');
    Route::get('/api/blog/{id}', 'BlogApiController@getDetailBlog');

});

Route::group(['domain' => 'api.' . config('app.domain'),'prefix' => 'apiv3', 'namespace' => 'Modules\Graphics\Http\Controllers'], function () {
   Route::get('/books','GraphicsAppController@index');
   Route::get('/detail-book/{book_id}','GraphicsAppController@detailedBook');
   Route::post('/save-order','GraphicsAppController@saveOrder');
});

