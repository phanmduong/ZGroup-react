<?php
$productCategoryRoutes = function() {
    Route::group(['prefix' => 'v2'], function(){
        Route::get('product-category', 'ProductCategoryController@getProductCategories');
    });
};