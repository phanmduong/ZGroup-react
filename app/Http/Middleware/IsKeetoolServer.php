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
        $secret = config("app.keetool_secret");
        if ($secret == '') {
            return $next($request);
        } else {
            $token = md5($secret);
            if ($request->input('token') == $token) {
                return $next($request);
            }
            return [
                'status' => 0,
                "message" => "invalid token"
            ];
        }
    }
}
