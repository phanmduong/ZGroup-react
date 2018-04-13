<?php

namespace Modules\FilmZgroup\Http\Controllers;

use App\Film;
use App\FilmSession;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class FilmZgroupController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */

    public function index()
    {
        $sessions = FilmSession::where('start_date', '>=', date('Y-m-d').' 00:00:00')->get();
        $this->data = [
            "sessions" => $sessions,
        ];


        return view('filmzgroup::index', $this->data);
    }


}
