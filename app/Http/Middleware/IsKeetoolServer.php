<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class IsKeetoolServer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = md5(config("app.keetool_secret"));
        if ($request->input('token') == $token) {
            return $next($request);
        }
        return [
            'status' => 0,
            "message" => "invalid token"
        ];

    }
}
