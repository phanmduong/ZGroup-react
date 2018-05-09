<?php

namespace App\Http\Middleware;

use App\Tab;
use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class PermissionTabReact
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next, $path)
    {
        $tab = Tab::where('url', 'like', '%' . $path . '%')->first();
        $user = Auth::user() && Auth::check() ? User::find(Auth::user()->id) : null;

        if ($user == null && $path != 'login') {
            return redirect('/login');
        }

        if ($tab == null || $user->havePermissionTab($tab) || Auth::user()->isAdmin()) {
            return $next($request);
        } else {
            $tabAccept = $this->get_tabs_first($user);
            if ($tabAccept != null) {
                return redirect($tabAccept->url);
            } else {
                return redirect('/login');
            }
        }
    }

    protected function getTabChild($tab, $tabIds)
    {
        $tabChild = Tab::whereIn('id', $tabIds)->where('parent_id', $tab->id)->orderBy('order')->first();
        if ($tabChild == null) {
            return $tab;
        } else {
            return $this->getTabChild($tabChild, $tabIds);
        }
    }

    protected function get_tabs_first($user)
    {
        $tab = $user->roles->tabs()->distinct()->where('parent_id', 0)->orderBy('order')->first();
        $tabIds = $user->roles->tabs()->distinct()->pluck('tabs.id')->toArray();
        if ($tab == null) {
            return null;
        }
        return $this->getTabChild($tab, $tabIds);
    }
}
