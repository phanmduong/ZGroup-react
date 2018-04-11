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

//        foreach ($films as $film) {
//            $sessions = $film->film_sessions();
//            $this->data["sessions"] = $sessions;
//            foreach ($sessions as $session) {
//                echo $session->id;
//            }
//
//        }
        $session = FilmSession::find(1);
        $film = $session->film;
        $this->data["film"] = $film;


        return view('filmzgroup::index', $this->data);
    }


}
