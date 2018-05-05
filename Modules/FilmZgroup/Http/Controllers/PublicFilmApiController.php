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
        $status = $request->status;
        $filmsR = Film::orderBy('created_at', 'desc')->get();
        foreach ($filmsR as $film) {
            $this->reloadFilmStatus($film);
        }
        $films = Film::orderBy('created_at', 'desc');

        if ($search) {
            $films = $films->where('name', 'LIKE', '%' . trim($search) . '%');
        }
        if ($id) {
            $films = $films->where('id', $id);
        }
        if ($status) {
            $films = $films->where('status', $status);
        }

        if ($limit == -1 or !$limit) {
            $films = $films->get();
            $films = [
                "films" => $films,
            ];

            return $films;
        } else {

            $films = $films->paginate($limit);
            return $this->respondWithPagination($films, ['films' => $films->map(function ($film) {
                return $film;
            })]);
        }
    }


    public function getSessionsFilter(Request $request)
    {
        $search = $request->search;
        $session_id = $request->session_id;
        $room_id = $request->room_id;
        $start_date = $request->start_date;
        $from_date = $request->from_date;
        $to_date = $request->to_date;
        $film_id = $request->film_id;
        $limit = $request->limit;
        $sessions = FilmSession::orderBy('created_at','desc');
        if ($session_id) {
            $sessions = $sessions->where('id', '=', $session_id);
        }
        if ($room_id) {
            $sessions = $sessions->where('room_id', '=', $room_id);
        }
        if ($film_id) {
            $sessions = $sessions->where('film_id', $film_id);
        }
        if ($search) {
            $sessions = $sessions->whereHas('film', function ($query) use ($search) {
                $query->where('name', 'LIKE', '%' . $search . '%');
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
            $sessions = [
                'sessions' => $sessions->map(function ($session) {
                    $session['film'] = $session->film;
                    return $session;
                })
            ];

            return $sessions;
        } else {

            $sessions = $sessions->paginate($limit);
            return $this->respondWithPagination($sessions, ['sessions' => $sessions->map(function ($session) {
                $session['film'] = $session->film;
                return $session;
            })]);
        }
    }

    public function getSessionsNowShowing(Request $request)
    {
        $sessions = FilmSession::where('start_date', '>=', date('Y-m-d') . ' 00:00:00')->orderBy('created_at','desc');
        $search = $request->search;
        $limit = $request->limit;

        if ($search) {
            $sessions = $sessions->whereHas('film', function ($query) use ($search) {
                $query->where('name', 'LIKE', '%' . $search . '%');
            });
        }
        if ($limit == -1 or !$limit) {
            $sessions = $sessions->get();
            $sessions = [
                "sessions" => $sessions->map(function ($session) {
                    $session['film'] = $session->film;
                    return $session;
                })
            ];

            return $sessions;
        } else {

            $sessions = $sessions->paginate($limit);
            return $this->respondWithPagination($sessions, ['sessions' => $sessions->map(function ($session) {
                $session['film'] = $session->film;
                return $session;
            })]);
        }
    }


}