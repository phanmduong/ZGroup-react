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
              'homepage' => '/en',
              'mission-vision' => '/en/mission-and-vision',
              'strategic-partner' => '/en/strategic-partner',
              'media-partner' => '/en/media-partner',
              'faqs' => '/en/faqs',
              'jobs' => '/en/jobs-vacancies',
              'membership' => '/en/membership',
              'events' => '/en/event',
              'meeting-room' => '/en/meeting-room',
              'founders' => '/en/up-founder',
              'mentors' => '/en/up-s-mentors',
              'members' => '/en/up-s-members',
              'blogs' => '/en/vietnamese-startup-news',
              'contact' => '/en/contact-us',
              'tour' => '/en/book-a-tour',
              'private-office' => '/en/private-office',
              'virtual-office' => '/en/virtual-office',
              'accounting' => '/en/accounting',
              'legal-consulting' => '/en/legal-consulting',
              'luong-yen' => '/en/up-luong-yen',
              'bach-khoa' => '/en/up-bach-khoa-ha-noi',
              'kim-ma' => '/en/up-kim-ma',
              'lang-ha' => '/en/up-lang-ha',
              'hcm' => '/en/coworking-space-ho-chi-minh',
              'lab-up' => '/en/creative-lab-up-maker-space'

            ],
            'vi' => [
              'homepage' => '/',
              'mission-vision' => '/tam-nhin-su-menh-gia-tri-cot-loi-up-coworking-space',
              'strategic-partner' => '/doi-tac-chien-luoc-cua-up',
              'media-partner' => '/doi-tac-truyen-thong-cua-up',
              'faqs' => '/nhung-cau-hoi-thuong-gap',
              'jobs' => '/thong-tin-tuyen-dung',
              'membership' => '/goi-thanh-vien-up-coworking-space',
              'events' => '/su-kien',
              'meeting-room' => '/phong-hop',
              'founders' => '/up-founders',
              'mentors' => '/up-s-mentors',
              'members' => '/up-s-members',
              'blogs' => '/tin-tuc-startup',
              'contact' => '/lien-he-voi-up-co-working-space',
              'tour' => '/dang-ky-trai-nghiem',
              'private-office' => '/thue-phong-lam-viec',
              'virtual-office' => '/van-phong-ao',
              'accounting' => '/accounting',
              'legal-consulting' => '/tu-van-doanh-nghiep',
              'luong-yen' => '/up-luong-yen',
              'bach-khoa' => '/up-bach-khoa-ha-noi',
              'kim-ma' => '/up-kim-ma',
              'lang-ha' => '/up-lang-ha',
              'hcm' => '/coworking-space-ho-chi-minh',
              'lab-up' => '/creative-lab-up-maker-space'
            ]
        ];

        $segment;
        // $request->session()->flush();
        // dd(Session::all());
        $url = Request::server('REQUEST_URI');
        if ($request->lang) {
            // if(Session::has('lang')) $previousLang = Session::get('lang');
            // Session::put('lang', $request->lang);

            // if(explode('/',substr($url, 0, strpos($url, '?lang=')))[1] == $request->lang){
            //     // dd(1);
            //     $previousLang = 'en';
            // }else if (explode('/',substr($url, 0, strpos($url, '?lang=')))[1] != 'en') {
            //     $previousLang = 'vi';
            // } else {
            //     $previousLang = 'en';
            // }

            // dd($previousLang);

            if(Session::has('lang')) $previousLang = Session::get('lang');
            else if(explode('/',substr($url, 0, strpos($url, '?lang=')))[1] != "en"){
                $previousLang = "vi";
            }else{
                $previousLang = explode('/',substr($url, 0, strpos($url, '?lang=')))[1];
            }
            Session::put('lang', $request->lang);

            $segments = $langs[$previousLang];

            $url = substr($url, 0, strpos($url, '?lang='));

            foreach ($segments as $key => $value) {
                if ($value == $url) {
                    $segment = $key;
                    break;
                }
            }

            $lang = ($request->lang) ? Session::get('lang') : substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

            if (!array_key_exists($segment, $langs[$lang])) {
                $segment = '';
            }
        } elseif (Session::has('lang')) {
            $lang = Session::get('lang');
        } else {
            $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        }
        $request->attributes->add(['lang' => $lang]); //inject variable $lang to controller

        if (Session::has('lang')) {
            if ($lang == 'vi') {
                return ($url == '/' || explode('/',$url)[1] != 'en') ? $next($request) : redirect($langs[$lang][$segment]);
            } else {
                if (isset($segment)) {
                    if($segment == ''){
                        return redirect('/en/');
                    }
                }
                if ($url == '/') {
                    return redirect('/en/');
                }
                return ($url == '/en' || explode('/',$url)[1] == 'en') ? $next($request) : redirect($langs[$lang][$segment]);
            }
        } else {
            if ($lang == 'vi') {
                return ($url == '/' || explode('/',$url)[1] != 'en') ? $next($request) : redirect('/');
            } else {
                return ($url == '/en' || explode('/',$url)[1] == 'en') ? $next($request) : redirect('/en/');
            }
        }
    }
}
