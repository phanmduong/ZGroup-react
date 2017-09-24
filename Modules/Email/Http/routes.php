<?php

Route::group(['domain' => 'manageapi.' . config('app.domain'), 'prefix' => 'email', 'namespace' => 'Modules\Email\Http\Controllers'], function () {
    Route::get('/subscribers-list', 'ManageEmailApiController@subscribers_list');
});
