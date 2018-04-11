<?php
$workRoutes = function () {
    Route::group(['prefix' => 'work'], function (){
        Route::post('/', 'WorkApiController@createWork');
        Route::get('/history-extension','WorkApiController@getAllExtension');
        Route::get('/summary-staffs','WorkApiController@summaryStaff');
        Route::get('/archive','WorkApiController@getAllWorkArchive');
        Route::get('/{workId}','WorkApiController@getDetailWork');
        Route::get('/{workId}/detail','WorkApiController@getMoreDetailWork');
        Route::post('/{workId}/rated','WorkApiController@rateWork');
        Route::get('/','WorkApiController@getAll');
        Route::put('/{workId}','WorkApiController@editWork');
        Route::delete('/{workId}','WorkApiController@deleteWork');
        Route::post('/history-extension/{historyId}/refuse','WorkApiController@deleteHistoryExtension');
        Route::post('/history-extension/{historyId}/accept','WorkApiController@acceptHistoryExtension');
    });
};

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'namespace' => 'Modules\Work\Http\Controllers'], $workRoutes);

//new api routes

Route::group(['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Work\Http\Controllers'],
    function () use($workRoutes) {
        Route::group(['prefix' => 'v3'], $workRoutes);
    });
