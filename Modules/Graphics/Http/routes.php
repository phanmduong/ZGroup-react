<?php
$graphicRoute = function () {
    Route::get('/', 'GraphicsController@index');
    Route::get('/contact-us', 'GraphicsController@contact_us');
    Route::post('/contact_information', 'GraphicsController@contact_info');
    Route::get('/about-us', 'GraphicsController@about_us');

    Route::get('/book/{good_id}', 'GraphicsController@book');
    Route::get('/blog', 'GraphicsController@blog');
    Route::get('/blog/post/{post_id}', 'GraphicsController@post');

    Route::get('/api/blogs', 'BlogApiController@getAllBlogs');
    Route::get('/api/completed', 'BlogApiController@onlinePaidOrder');
    Route::get('/api/blog/{id}', 'BlogApiController@getDetailBlog');
    Route::get('/nganluongapi/order/{orderId}/money/{money}/complete', 'GraphicsController@onlinePaidOrder');

    Route::get('/checkout-success', 'GraphicsController@checkoutSuccess');

    Route::get('/checkout', 'GraphicsController@checkout');
    Route::get('/checkout', 'GraphicsController@checkout');
    Route::post('/checkout', 'GraphicsController@createCheckout');

    Route::get('/load-books-from-session', 'GraphicsController@getGoodsFromSession');
    Route::get('/add-book/{goodId}', 'GraphicsController@addGoodToCart');
    Route::get('/remove-book/{goodId}', 'GraphicsController@removeBookFromCart');
    Route::post('/save-order', 'GraphicsController@saveOrder');
    Route::get('/count-books-from-session', 'GraphicsController@countGoodsFromSession');
    Route::get('/flush', 'GraphicsController@flush');
    Route::get('/province', 'GraphicsController@provinces');
    Route::get('/district/{provinceId}', 'GraphicsController@districts');
};

$graphicApiRoute = function () {
    Route::get('/detail-book/{book_id}', 'GraphicsAppController@detailedBook');
    Route::post('/save-order', 'GraphicsAppController@saveOrder');
    Route::get('/books', 'GraphicsAppController@index');
};

Route::group(['middleware' => 'web', 'domain' => 'graphics.vn', 'namespace' => 'Modules\Graphics\Http\Controllers'], $graphicRoute);

Route::group(['middleware' => 'web', 'domain' => 'graphics.test', 'namespace' => 'Modules\Graphics\Http\Controllers'], $graphicRoute);

Route::group(['domain' => config('app.domain'), 'prefix' => '/api/v3', 'namespace' => 'Modules\Graphics\Http\Controllers'], $graphicApiRoute);

Route::group(['middleware' => 'web', 'domain' => 'graphics.vn', 'namespace' => 'Modules\Graphics\Http\Controllers'], function () {
    Route::get('/api/blogs', 'BlogApiController@getAllBlogs');
    Route::get('/api/blog/{id}', 'BlogApiController@getDetailBlog');
});
