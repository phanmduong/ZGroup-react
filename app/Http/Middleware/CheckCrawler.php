<?php

namespace App\Http\Middleware;

use Closure;
use Jaybizzle\CrawlerDetect\CrawlerDetect;

class CheckCrawler
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
        $url = $request->url_string;
        re_scrape($url);


        $CrawlerDetect = new CrawlerDetect;
        if ($CrawlerDetect->isCrawler()) {
            return ;
        } else {
            return $next($request);
        }
    }
}
