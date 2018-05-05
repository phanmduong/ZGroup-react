<?php

namespace Modules\FilmZgroup\Http\Controllers;

use App\Film;
use App\FilmSession;
use App\Http\Controllers\NoAuthApiController;
use Illuminate\Http\Request;
use Carbon\Carbon;


class PublicFilmApiController extends NoAuthApiController
{
    public function reloadFilmStatus(Film $film)
    {
        if (count($film->film_sessions) > 0) {
            $sessions = $film->film_sessions()->where('start_date', '>=', date('Y-m-d'))->get();
            if (count($sessions) == 0 && $film->film_status == 1) {
                $film->film_status = 0;
                $film->save();
            } elseif (count($sessions) > 0) {
                $film->film_status = 1;
                $film->save();
            }
        } elseif ($film->film_status == 1) {
            $film->film_status = 0;
            $film->save();
        }
    }

    public function getFilmsFilter(Request $request)
    {
        $limit = $request->limit;
        $search = $request->search;
        $id = $request->id;
        $filmsR = Film::orderBy('created_at','desc')->get();
        foreach ($filmsR as $film) {
            $this->reloadFilmStatus($film);
        }
        $films = Film::orderBy('created_at','desc');

        if ($search) {
            $films = $films->where('name', 'LIKE', '%' . trim($search) . '%');
        }
        if ($id) {
            $films = $films->where('id', $id);
        }


        if ($limit == -1 or !$limit) {
            $films = $films->get();
            $data = [
                "films" => $films,
            ];

            return $this->respondSuccessWithStatus($data);
        } else {

            $films = $films->paginate($limit);
            return $this->respondWithPagination($films, ['films' => $films->map(function ($film) {
                $data['film'] = $film;
                return $data;
            })]);
        }
    }


    public function getSessionsFilter(Request $request)
    {
        $film_name = $request->film_name;
        $session_id = $request->session_id;
        $room_id = $request->room_id;
        $start_date = $request->start_date;
        $from_date = $request->from_date;
        $to_date = $request->to_date;
        $film_id = $request->film_id;
        $limit = $request->limit;
        $sessions = FilmSession::where('start_date', '>=', date('Y-m-d') . ' 00:00:00')->orderBy('created_at');
        if ($session_id) {
            $sessions = $sessions->where('id', '=', $session_id);
        }
        if ($room_id) {
            $sessions = $sessions->where('room_id', '=', $room_id);
        }
        if ($film_id) {
            $sessions = $sessions->where('film_id', $film_id);
        }
        if ($film_name) {
            $sessions = $sessions->whereHas('film',function($query) use ($film_name){
                $query->where('name', 'LIKE', '%' .$film_name. '%');
            });
        }
        if ($start_date) {
            $sessions = $sessions->where('start_date', $start_date);
        }
        if ($from_date) {
            $sessions = $sessions->where('start_date', '>=', Carbon::createFromFormat('Y-m-d H:i:s', $from_date . ' 00:00:00'));
        }
        if ($to_date) {
            $sessions = $sessions->where('start_date', '<=', Carbon::createFromFormat('Y-m-d H:i:s', $to_date . ' 00:00:00'));
        }

        if ($limit == -1 or !$limit) {
            $sessions = $sessions->get();
            $data = [
                "sessions" => $sessions->map(function ($session) {
                    $data['session'] = $session;
                    $session['film'] = $session->film;
                    return $data;
                })
            ];

            return $this->respondSuccessWithStatus($data);
        } else {

            $sessions = $sessions->paginate($limit);
            return $this->respondWithPagination($sessions, ['sessions' => $sessions->map(function ($session) {
                $data['session'] = $session;
                $session['film'] = $session->film;
                return $data;
            })]);
        }
    }

    public function getSessionsNowShowing(Request $request)
    {
        $sessions = FilmSession::where('start_date', '>=', date('Y-m-d') . ' 00:00:00')->orderBy('created_at');
        $limit = $request->limit;

        if ($limit == -1 or !$limit) {
            $sessions = $sessions->get();
            $data = [
                "sessions" => $sessions->map(function ($session) {
                    $data['session'] = $session;
                    $session['film'] = $session->film;
                    return $data;
                })
            ];

            return $this->respondSuccessWithStatus($data);
        } else {

            $sessions = $sessions->paginate($limit);
            return $this->respondWithPagination($sessions, ['sessions' => $sessions->map(function ($session) {
                $data['session'] = $session;
                $session['film'] = $session->film;
                return $data;
            })]);
        }
    }

    public function getFilmComingSoon(Request $request)
    {
        $limit = $request->limit;
        $films = Film::where('film_status', 2);

        if ($limit == -1 or !$limit) {
            $films = $films->get();
            $data = [
                "films" => $films,
            ];

            return $this->respondSuccessWithStatus($data);
        } else {

            $films = $films->paginate($limit);
            return $this->respondWithPagination($films, ['films' => $films->map(function ($film) {
                $data['film'] = $film;
                return $data;
            })]);
        }
    }
}