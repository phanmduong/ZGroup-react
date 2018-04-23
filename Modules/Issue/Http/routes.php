<?php



$namespaceRoutes = function () {
    Route::post('/create-issue', 'IssueManageApiController@createIssue');
    Route::get('/get-all-issues', 'IssueManageApiController@getAllIssue');
};

Route::group(
    ['domain' => config('app.domain'), 'prefix' => 'manageapi', 'namespace' => 'Modules\Issue\Http\Controllers'],
    function () use ($namespaceRoutes) {
        Route::group(
            ['prefix' => 'v3'],
            function () use ($namespaceRoutes) {
                Route::group(['prefix' => 'issue'], $namespaceRoutes);
            }
        );
    }
);
