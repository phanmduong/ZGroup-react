<?php

namespace Modules\FilmZgroup\Http\Controllers;

use App\Film;
use App\FilmSession;
use App\Http\Controllers\NoAuthApiController;
use Illuminate\Http\Request;
use Carbon\Carbon;


class PublicFilmApiController extends NoAuthApiController
{
    public function searchFilmByName($name)
    {
        $results = Film::where('name', 'LIKE', '%' . $name . '%')->paginate(12);
        $this->data['total_pages'] = ceil($results->total() / $results->perPage());
        $this->data['current_page'] = $results->currentPage();
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

    public function getFilmsNowShowing()
    {
        $sessions = FilmSession::where('start_date', '>=', date('Y-m-d') . ' 00:00:00')->orderBy('created_at')->get();
        $data = [
            "sessions" => $sessions,
        ];

        return $this->respondSuccessWithStatus($data);
    }


    public function getFilmByRoom(Request $request)
    {
        $room_id = $request->room_id;
        $sessions = FilmSession::where('room_id', $room_id)->where('start_date', '>=', date('Y-m-d') . ' 00:00:00')->orderBy('created_at')->get();
        $data = [
            "sessions" => $sessions,
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function getFilmByDate(Request $request)
    {
        $start_date = $request->start_date;
        $sessions = FilmSession::where('start_date', $start_date)->orderBy('created_at')->get();
        $data = [
            "sessions" => $sessions,
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function filterSessionByDateRange(Request $request)
    {
        $sessions = FilmSession::where('start_date', '>=', Carbon::createFromFormat('Y-m-d H:i:s', $request->from_date . ' 00:00:00') )
            ->where('start_date', '<=', Carbon::createFromFormat('Y-m-d H:i:s', $request->to_date . ' 00:00:00') )->get();

        $data = [
            "sessions" => $sessions,
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function getSessionById($id)
    {
        $session = FilmSession::find($id);
        $this->data["session"] = $session;

        return $this->respondSuccessWithStatus($this->data);
    }
}