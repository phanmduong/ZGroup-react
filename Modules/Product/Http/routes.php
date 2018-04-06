<?php

$productCategoryRoutes = function () {
    Route::group(['prefix' => 'v2'], function () {
        Route::get('/product-category', 'ProductCategoryController@allProductCategories');
        Route::post('/product-category', 'ProductCategoryController@createProductCategory');
        Route::put('/product-category/{editProductCategory}', 'ProductCategoryController@editProductCategory');
        Route::delete('/product-category/{editProductCategory}', 'ProductCategoryController@deleteProductCategory');
    });
};

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi/v3', 'namespace' => 'Modules\Product\Http\Controllers'], $productCategoryRoutes);
