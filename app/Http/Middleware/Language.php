<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Request;

class Language
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // dd($request->lang);
        if($request->lang) $request->session()->put('lang',$request->lang);
        
        if($request->session()->has('lang')){
            $lang = $request->session()->get('lang');
            // dd($request->session());
            // dd($request->session());
        }else{
            $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        }
        // dd($lang);
        // dd($request->session());
        $url = Request::server('REQUEST_URI');
        // dd($url);
        // dd($url); 
        if($lang == 'vi'){
            // if($url == "/") return $next($request);
            // dd($url == "/" || substr($url,0,3) != "/en");
            return ($url == "/" || substr($url,0,3) != "/en") ? $next($request) : redirect('/');
        }else{
            // dd($url);
            // dd(substr($url,0,3));
            return ($url == "/en" || substr($url,0,3) == "/en") ? $next($request) : redirect('/en');
            // if($url == "/en/") return $next($request);
            
        }
        // return $next($request);
    }
}
