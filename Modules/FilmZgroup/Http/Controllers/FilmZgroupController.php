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
        $todaySessions = FilmSession::where('start_date', '=', date('Y-m-d'))->get();
        $films = Film::orderBy('created_at','desc')->get();
        $this->data = [
            "films" => $films,
            "todaySessions" => $todaySessions

        ];

        return view('filmzgroup::index', $this->data);
    }


}
