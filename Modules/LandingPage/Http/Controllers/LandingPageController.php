<?php

namespace Modules\LandingPage\Http\Controllers;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ManageApiController;
use App\LandingPage;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use ZipArchive;
use DOMDocument;
use DOMXPath;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

class LandingPageController extends Controller
{
    public function index($landingpageId = null)
    {
        $landingpage = LandingPage::find($landingpageId);
        return view('landingpage::index', [
            'landingpage' => $landingpage
        ]);
    }
}
