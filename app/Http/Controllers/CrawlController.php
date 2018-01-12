<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Jaybizzle\CrawlerDetect\CrawlerDetect;

class CrawlController extends Controller
{
    protected $user;
    protected $data;

    public function __construct()
    {
        $this->data = array();
        $this->data['rating'] = false;
        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
            $this->user->avatar_url = generate_protocol_url($this->user->avatar_url);
        }
    }

    public function isCrawler()
    {
        $CrawlerDetect = new CrawlerDetect;
        return $CrawlerDetect->isCrawler();
    }
}
