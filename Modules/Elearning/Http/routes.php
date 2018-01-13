<?php

Route::group(['middleware' => 'web', 'prefix' => 'elearning', 'namespace' => 'Modules\Elearning\Http\Controllers'], function () {
    Route::post('/{lesson_id}/add-comment', 'ElearningApiController@storeComment');
    Route::post('/{commentId}/like-comment', 'ElearningApiController@changeLikeComment');
    Route::post('/upload-image-comment', 'ElearningApiController@uploadImageComment');
    Route::post('/register-store', 'ElearningApiController@registerStore');
});
