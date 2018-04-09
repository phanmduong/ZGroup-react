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
        // dd(Session::all());
        // dd($request->lang);
        if($request->lang) Session::put('lang',$request->lang);
        // dd($request->session());
        if(Session::has('lang')){
            $lang = Session::get('lang');
            // dd($lang);
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
        // dd($lang);
        $request->attributes->add(['lang' => $lang]);
        // dd($request->merge(array("lang" => $lang)));
        if($lang == 'vi'){
            // if($url == "/") return $next($request);
            // dd($url == "/" || substr($url,0,3) != "/en");
            // $request->session()->forget('lang');
            return ($url == "/" || substr($url,0,3) != "/en") ? $next($request) : redirect('/');
        }else{
            // dd($url);
            // dd(substr($url,0,3));
            // $request->session()->forget('lang');
            return ($url == "/en" || substr($url,0,3) == "/en") ? $next($request) : redirect('/en');
            // if($url == "/en/") return $next($request);
        }
        // return $next($request);
        
    }
}
