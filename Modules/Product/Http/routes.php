<?php

$productCategoryRoutes = function () {
    Route::group(['prefix' => 'v2'], function () {
        Route::get('/product-category', 'ProductCategoryController@allProductCategories');
        Route::post('/product-category', 'ProductCategoryController@createProductCategory');
        Route::put('/product-category/{productCategoryId}', 'ProductCategoryController@editProductCategory');
        Route::delete('/product-category/{productCategoryId}', 'ProductCategoryController@deleteProductCategory');
    });
};

$productPublicApiRoutes = function () {
    Route::group(['prefix' => 'v2'], function () {
        Route::get('/blog', 'ProductPublicApiController@blogs');
        Route::get('/blog/{slug}', 'ProductPublicApiController@allBlogs');
    });
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\Product\Http\Controllers'], $productCategoryRoutes);
Route::group(['domain' => config('app.domain'), 'prefix' => 'api/v3', 'namespace' => 'Modules\Product\Http\Controllers'], $productPublicApiRoutes);
