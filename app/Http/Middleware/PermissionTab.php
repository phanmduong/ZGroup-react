<?php

namespace App\Http\Middleware;

use App\Tab;
use Closure;
use Illuminate\Support\Facades\Auth;

class PermissionTab
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next, $tabId)
    {
        $tab = Tab::find($tabId);
        if (Auth::user()->havePermissionTab($tab) || Auth::user()->isAdmin()) {
            return $next($request);
        } else {
//            return redirect('/access_forbidden');
            return [
                "status" => 0,
                "message" => "Bạn không có quyền truy cập"
            ];
        }
    }
}
