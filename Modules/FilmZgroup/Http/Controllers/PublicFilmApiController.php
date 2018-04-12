<?php

namespace Modules\FilmZgroup\Http\Controllers;

use App\Film;
use App\FilmSession;
use App\Http\Controllers\NoAuthApiController;
use Illuminate\Http\Request;


class PublicFilmApiController extends NoAuthApiController
{
    public function searchFilmByName(Request $request)
    {
        $results = Film::where('name', 'LIKE', '%' . $request->film_name . '%')->get();
        $data = [
            'results' => $results,
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function getFilmById($id)
    {
        $film = Film::find($id);
        $data = [
            'film' => $film,
        ];
        return $this->respondSuccessWithStatus($data);
    }
    public function getFilmsCommingSoon()
    {
        $sessions = FilmSession::where('start_date', '=', null)->get();
        $data = [
            "sessions" => $sessions,
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function getFilmsNowShowing()
    {
        $sessions = FilmSession::where('start_date', '>=', date('Y-m-d').' 00:00:00')->get();
        $data = [
            "sessions" => $sessions,
        ];

        return $this->respondSuccessWithStatus($data);
    }


    public function getFilmByRoom(Request $request)
    {
        $room_id = $request->room_id;
        $sessions = FilmSession::where('room_id',$room_id)->where('start_date', '>=', date('Y-m-d').' 00:00:00')->get();
        $data = [
            "sessions" => $sessions,
        ];

        return ["status"=>1, $data];
    }

    public function getFilmByDate(Request $request)
    {
        $start_date = $request->start_date;
        $sessions = FilmSession::where('start_date',$start_date)->get();
        $data = [
            "sessions" => $sessions,
        ];

        return ["status"=>1, $data];
    }
}