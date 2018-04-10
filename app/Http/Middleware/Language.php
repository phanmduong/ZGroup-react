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
        $langs = [
            'en' => [
              "homepage" => "/en",
              "mission-vision" => "/en/mission-and-vision",
              "media-partner" => "/en/media-partner",
              "faqs" => "/en/faqs",
              "jobs" => "/en/jobs-vacancies",
              "membership" => "/en/membership",
              "events" => "/en/event",
              "meeting-room" => "/en/meeting-room",
              "founders" => "/en/up-founders",
              "mentors" => "/en/up-s-mentors",
              "contact" => "/en/contact-us",
              "tour" => "/en/book-a-tour"
            ],
            'vi' => [
              "homepage" => "/",
              "mission-vision" => "/tam-nhin-su-menh-gia-tri-cot-loi-up-coworking-space",
              "strategy-partner" => "/doi-tac-chien-luoc-cua-up",
              "media-partner" => "/doi-tac-truyen-thong-cua-up",
              "faqs" => "/nhung-cau-hoi-thuong-gap",
              "jobs" => "/thong-tin-tuyen-dung",
              "membership" => "/goi-thanh-vien-up-coworking-space",
              "events" => "/su-kien",
              "meeting-room" => "/phong-hop",
              "founders" => "/up-founders",
              "mentors" => "/up-s-mentors",
              "blogs" => "/tin-tuc-startup",
              "contact" => "/lien-he-voi-up-co-working-space",
              "tour" => "/dang-ky-trai-nghiem"
            ]  
        ];
        $segment;

        $url = Request::server('REQUEST_URI');
        if($request->lang){
            if($request->lang) Session::put('lang',$request->lang);
            if(substr($url,0,3) != "/en") $previousLang = "vi";
            else $previousLang = "en";
            $segments = $langs[$previousLang];
            $url = substr($url, 0, strpos($url, "?lang="));
            // dd($segments); 
            // echo $url;  
            foreach($segments as $key => $value){
                // echo $key . "=>";
                // echo $value . "\n";
                if($value == $url){
                    $segment = $key;
                    break;
                }
            }
            $lang = ($request->lang) ? Session::get('lang') : substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        }else if(Session::has('lang')){
            $lang = Session::get('lang');
        }else{
            $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        }
        $request->attributes->add(['lang' => $lang]);
        // echo $previousLang;
        // dd(Session::all());
        // dd($segment);
        // dd($langs[$lang][$segment]);
        // dd(Session::has('lang'));
        // dd($url);
        if(Session::has('lang')){
            if($lang == 'vi'){            
                return ($url == "/" || substr($url,0,3) != "/en") ? $next($request) : redirect($langs[$lang][$segment]);
            }else{
                if($url == '/' || $segment == "") return redirect('/en/');
                // dd(1);
                // dd($next($request));
                return ($url == "/en" || substr($url,0,3) == "/en") ? $next($request) : redirect($langs[$lang][$segment]);
            }
        }else{
            if($lang == 'vi'){            
                return ($url == "/" || substr($url,0,3) != "/en") ? $next($request) : redirect('/');
            }else{
                // dd(1);
                return ($url == "/en" || substr($url,0,3) == "/en") ? $next($request) : redirect('/en/');
            }
        }
    }
}
