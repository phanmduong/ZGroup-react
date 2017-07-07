<?php

namespace App\Http\Middleware;

use Closure;

class checkTopCVToken
{

    protected $topcv_key;

    public function __construct()
    {
        $this->topcv_key = config("app.topcv_key");
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = trim($request->token);
        $user_id = $request->id;

        $check_token = md5($this->topcv_key . $user_id) . "";


        if (strcmp($token, $check_token) == 0) {
            return $next($request);
        } else {
            return $this->respond([
                "status" => 0,
                "message" => "Wrong Token"
            ]);
        }

    }

    protected function respond($data, $headers = [])
    {
        return response()->json($data, 200, $headers);
    }
}
