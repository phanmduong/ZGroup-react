<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class HttpsProtocol
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
//        && !App::environment('local')
//        dd($request->getRequestUri());
        if ($request->secure() && !App::environment('local')) {

//            return redirect('https://www.colorme.vn');

//            return redirect()->secure($request->getRequestUri());
            return redirect($request->getRequestUri());
        }

        return $next($request);
    }
}
