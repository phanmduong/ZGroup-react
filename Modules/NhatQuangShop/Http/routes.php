<?php
$nhatquangShopRoute = function () {
    //views
    Route::get('/', 'NhatQuangShopController@index');
    Route::get('/contact-us', 'NhatQuangShopController@contact_us');
    Route::get('/about-us', 'NhatQuangShopController@aboutUs');
    Route::post('/contact_information', 'NhatQuangShopController@contact_info');
    Route::get('/book/{good_id}', 'NhatQuangShopController@book');
    Route::get('/add-book/{goodId}', 'NhatQuangShopController@addGoodToCart');
    Route::get('/remove-book/{goodId}', 'NhatQuangShopController@removeBookFromCart');
    Route::get('/load-books-from-session', 'NhatQuangShopController@getGoodsFromSession');
    Route::get('/count-books-from-session', 'NhatQuangShopController@countGoodsFromSession');
    Route::get('/about-us', 'NhatQuangShopController@about_us');
    Route::post('/contact_information', 'NhatQuangShopController@contact_info');
    Route::get('/book/{good_id}', 'NhatQuangShopController@book');
    Route::get('/blog', 'NhatQuangShopController@blog');
    Route::get('/blog/post/{post_id}', 'NhatQuangShopController@post');
    Route::post('/save-order', "NhatQuangShopController@saveOrder");
    Route::get('/product/new', "NhatQuangShopController@productNew");
    Route::get('/product/feature', "NhatQuangShopController@productFeature");
    Route::get('/su-kien', 'NhatQuangShopController@event');
    Route::get('/events/{slug}',['as' => 'detail', 'uses' => 'NhatQuangShopController@eventDetail']);
    Route::get('events/{slug}/sign-up-form',['as' => 'event-form', 'uses' => 'NhatQuangShopController@eventSignUpForm']);

    Route::get('/product/detail/{good_id}', "NhatQuangShopController@productDetail");
    Route::get('/category/{categoryid}', "NhatQuangShopController@goodsByCategory");
    Route::post('/search', "NhatQuangShopController@searchGood");
    Route::get('/category/test/s', "NhatQuangShopController@categoryTest");


    Route::get('/test', 'NhatQuangShopController@test');
   
    //modals
    Route::get('/load-books-from-session/v2', 'NhatQuangApiController@getGoodsFromSession');
    Route::get('/count-books-from-session/v2', 'NhatQuangApiController@countGoodsFromSession');
    Route::get('/coupon-programs', 'NhatQuangApiController@getCouponPrograms');
    Route::get('/coupon-codes', 'NhatQuangApiController@getCouponCodes');
    Route::get('/flush', 'NhatQuangApiController@flush');
    Route::get('/add-book/{goodId}/v2', 'NhatQuangApiController@addGoodToCart');
    Route::get('/remove-book/{goodId}/v2', 'NhatQuangApiController@removeBookFromCart');
    Route::get('/add-coupon/{couponName}/v2', 'NhatQuangApiController@addCouponCode');
    Route::get('/remove-coupon/{couponId}/v2', 'NhatQuangApiController@removeCoupon');
    Route::post('/save-order/v2', 'NhatQuangApiController@saveOrder');
    Route::get('/province', 'NhatQuangApiController@provinces');
    Route::get('/district/{provinceId}', 'NhatQuangApiController@districts');
    Route::get('/ward/{districtId}', 'NhatQuangApiController@wards');
    Route::get("/logout", "NhatQuangShopController@logout");
    Route::get('/currency', 'NhatQuangApiController@getCurrencies');
    

    Route::get("/manage/orders", "NhatQuangShopManageController@userOrder");
    Route::get("/manage/orders/{order_id}", "NhatQuangShopManageController@infoOrder");
    Route::post("/manage/orders", "NhatQuangShopManageController@filterOrders");
    
    Route::post('/manage/save-delivery-order', "NhatQuangShopManageController@saveDeliveryOrder");
    //login
    Route::get("/api/google/tokensignin", "NhatQuangAuthApiController@googleTokenSignin");
    Route::get("/api/facebook/tokensignin", "NhatQuangAuthApiController@facebookTokenSignin");
    Route::post("/api/login", "NhatQuangAuthApiController@login");
    Route::put("/api/user", "NhatQuangShopManageApiController@updateUserInfo");

    //e-banking
    Route::get('/manage/delivery_orders', 'NhatQuangShopManageController@userDeliveryOrders');
    Route::post('/manage/delivery_orders', 'NhatQuangShopManageController@filterDeliveryOrders');
    Route::get("/manage/account", "NhatQuangShopManageController@account_information");
    Route::get("/manage/account_change", "NhatQuangShopManageController@get_account_change_information");
    Route::post("/manage/account_change", "NhatQuangShopManageController@account_change_information");
    Route::get("/manage/password_change", "NhatQuangShopManageController@get_password_change");
    Route::post("/manage/password_change", "NhatQuangShopManageController@password_change");
    Route::post("/manage/transfermoney", "NhatQuangTransferController@createTransfer");
    Route::get("/manage/transfermoney", "NhatQuangTransferController@transferMoneys");
    Route::put("/manage/delivery_orders/{order_id}", "NhatQuangShopManageController@editDeliveryOrder");
};


Route::group(['middleware' => 'web', 'domain' => "keetool5.xyz", 'namespace' => 'Modules\NhatQuangShop\Http\Controllers'], $nhatquangShopRoute);
Route::group(['middleware' => 'web', 'domain' => "nhatquangshop.test", 'namespace' => 'Modules\NhatQuangShop\Http\Controllers'], $nhatquangShopRoute);
