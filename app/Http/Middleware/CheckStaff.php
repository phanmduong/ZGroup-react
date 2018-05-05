<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Tab;

class CheckStaff
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->guest()) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                return redirect()->guest('/login');
            }
        } else {
            if (Auth::user()->isStaff() || Auth::user()->isAdmin()) {
                $user = Auth::user();

                if ($user->current_role) {
                    $tabs = $user->current_role->tabs;
                } else {
                    $tabs = collect([]);
                }

                $forbid_urls = [];

                if ($user->role != 2){
                    $forbid_urls[] = 'hr/manage/quan-li-nhan-su';
                };

                $allow_urls = $tabs->pluck('url')->toArray();
                $allTabs_urls = Tab::where('id','!=',1)->where('id','!=',2)->get()->pluck('url')->toArray();
                foreach ($allTabs_urls as $url) {
                    if (!in_array($url,$allow_urls)){
                        $forbid_urls[] = $url;
                    }
                }
                if(in_array($request->path(),$forbid_urls)){
                    return redirect('/');
                }
                return $next($request);

            } else {
                return redirect('/');
            }
        }
    }
}
