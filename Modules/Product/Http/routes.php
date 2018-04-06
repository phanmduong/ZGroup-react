<?php

Route::group(['middleware' => 'web', 'prefix' => 'product', 'namespace' => 'Modules\Product\Http\Controllers'], function()
{
    Route::get('/', 'ProductController@index');
});

$productCategoryRoutes = function() {
    Route::group(['prefix' => 'v2'], function() {
        Route::get('/product-category', 'ProductCategoryController@allProductCategories');
        Route::post('/product-category', 'ProductCategoryController@createProductCategory');
        Route::put('/product-category/{editProductCategory}', 'ProductCategoryController@editProductCategory');
        Route::delete('/product-category/{editProductCategory}', 'ProductCategoryController@deleteProductCategory');
    });
};