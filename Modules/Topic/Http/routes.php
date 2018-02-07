<?php

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'v2/topic', 'namespace' => 'Modules\Topic\Http\Controllers'], function () {
    Route::get('/', 'TopicApiController@getTopics');
    Route::post('/topic', 'TopicApiController@createTopic');
    Route::get('/{topicId}/product', 'TopicApiController@getTopicProducts');
    Route::post('/{topicId}/product', 'TopicApiController@createProduct');
});
