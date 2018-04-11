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
        $films = Film::orderBy("release_date", "desc")->get();

        $session = FilmSession::find(1);
        $this->data["films"] = $films;


        return view('filmzgroup::index', $this->data);
    }


}
