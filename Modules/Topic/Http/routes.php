<?php

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'v2/topic', 'namespace' => 'Modules\Topic\Http\Controllers'], function () {
    Route::get('/', 'TopicPublicApiController@getTopics');
    Route::get('/{topicId}', 'TopicPublicApiController@getTopic');
    Route::post('/', 'TopicApiController@createTopic');
    Route::post('/{topicId}/product', 'TopicApiController@createProduct');
});
