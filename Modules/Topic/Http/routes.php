<?php

$routes = function () {
    Route::get('/', 'TopicPublicApiController@getTopics');
    Route::get('/{topicId}', 'TopicPublicApiController@getTopic');
    Route::post('/', 'TopicApiController@createTopic');
    Route::post('/{topicId}/product', 'TopicApiController@createProduct');
};

Route::group(['domain' => 'api.' . config('app.domain'), 'prefix' => 'v2/topic', 'namespace' => 'Modules\Topic\Http\Controllers'], $routes);

Route::group(['domain' => config('app.domain'), 'prefix' => '/api/v3/topic', 'namespace' => 'Modules\Topic\Http\Controllers'], $routes);
