<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \App\Http\Middleware\HttpsProtocol::class,
    ];


    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
//            \App\Http\Middleware\VerifyCsrfToken::class,
//            \App\Http\Middleware\HttpsProtocol::class
        ],
        'api' => [
            'throttle:60,1',
        ],
        'manageapi' => [
            'throttle:60,1',
        ],
        'up' => [
            \App\Http\Middleware\Language::class
        ]
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'acl' => \App\Http\Middleware\CheckPermission::class,
        'is_staff' => \App\Http\Middleware\CheckStaff::class,
        'is_admin' => \App\Http\Middleware\CheckAdmin::class,
        'jwt.auth' => 'Tymon\JWTAuth\Middleware\GetUserFromToken',
        'jwt.refresh' => 'Tymon\JWTAuth\Middleware\RefreshToken',
        'from_topcv' => \App\Http\Middleware\checkTopCVToken::class,
        'is_keetool_server' => \App\Http\Middleware\IsKeetoolServer::class,
        'permission_tab' => \App\Http\Middleware\PermissionTab::class,
        'permission_tab_react' => \App\Http\Middleware\PermissionTabReact::class
    ];
}