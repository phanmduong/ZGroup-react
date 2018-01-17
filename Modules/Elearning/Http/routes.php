<?php

Route::group(['middleware' => 'web', 'prefix' => 'elearning', 'namespace' => 'Modules\Elearning\Http\Controllers'], function () {
    Route::post('/{lesson_id}/add-comment', 'ElearningAuthApiController@storeComment');
    Route::post('/{commentId}/like-comment', 'ElearningAuthApiController@changeLikeComment');
    Route::post('/upload-image-comment', 'ElearningAuthApiController@uploadImageComment');
    Route::post('/register-store', 'ElearningApiController@registerStore');
});
