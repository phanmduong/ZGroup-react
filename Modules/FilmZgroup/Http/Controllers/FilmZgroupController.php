<?php

namespace Modules\FilmZgroup\Http\Controllers;

use App\Film;
use App\FilmSession;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;

class FilmZgroupController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */

    public function index()
    {
        $today = Carbon::today();
        $day = Carbon::today();
        $todaySessions = FilmSession::where('start_date', '=', date('Y-m-d'))->get();
        $after1DaySessions = FilmSession::where('start_date','=', Carbon::createFromFormat('Y-m-d H:i:s', $today->addDays(1)->toDateString() . ' 00:00:00'))->get();
        $after2DaySessions = FilmSession::where('start_date','=', Carbon::createFromFormat('Y-m-d H:i:s', $today->addDays(1)->toDateString() . ' 00:00:00'))->get();
        $after3DaySessions = FilmSession::where('start_date','=', Carbon::createFromFormat('Y-m-d H:i:s', $today->addDays(1)->toDateString() . ' 00:00:00'))->get();
        $after4DaySessions = FilmSession::where('start_date','=', Carbon::createFromFormat('Y-m-d H:i:s', $today->addDays(1)->toDateString() . ' 00:00:00'))->get();
        $after5DaySessions = FilmSession::where('start_date','=', Carbon::createFromFormat('Y-m-d H:i:s', $today->addDays(1)->toDateString() . ' 00:00:00'))->get();
        $after6DaySessions = FilmSession::where('start_date','=', Carbon::createFromFormat('Y-m-d H:i:s', $today->addDays(1)->toDateString() . ' 00:00:00'))->get();

        $filmsComing = Film::where('film_status',2)->orderBy('release_date')->get();

        $sessionsShowing = FilmSession::where('start_date','>=',date('Y-m-d'))->orderBy('start_date','desc')->get();
//        dd($filmsComing);
        $this->data = [
            'filmsComing' => $filmsComing,
            'sessionsShowing' => $sessionsShowing,
            "todaySessions" => $todaySessions,
            'day' => $day,
            'after1DaySessions' => $after1DaySessions,
            'after2DaySessions' => $after2DaySessions,
            'after3DaySessions' => $after3DaySessions,
            'after4DaySessions' => $after4DaySessions,
            'after5DaySessions' => $after5DaySessions,
            'after6DaySessions' => $after6DaySessions,

        ];

        return view('filmzgroup::index', $this->data);
    }

    public function film($id)
    {
        $film = Film::find($id);

        $this->data = [
            'film' => $film
        ];
        return view('filmzgroup::film', $this->data);
    }


}
