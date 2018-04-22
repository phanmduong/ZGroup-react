<?php

namespace Modules\FilmZgroup\Http\Controllers;

use App\Film;
use App\FilmSession;
use App\Http\Controllers\ManageApiController;
use App\SessionSeat;
use DateInterval;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class FilmZgroupManageApiController extends ManageApiController
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllFilms()
    {
        $films = Film::orderBy("release_date", "desc")->get();
        $this->data["films"] = $films;

        return $this->respondSuccessWithStatus($this->data);
    }

    public function addFilm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'avatar_url' => 'required|max:255',
            'director' => 'required|max:255',
            'cast' => 'required|max:255',
            'running_time' => 'required|max:255',
            'release_date' => 'required|max:255',
            'country' => 'required|max:255',
            'language' => 'required|max:255',
            'film_genre' => 'required|max:255',
            'summary' => 'required',
        ]);
        if($validator->fails()) {
            return $this->respondErrorWithStatus('Ban phai nhap du thong tin');
        }

        $film = new Film();
        $film->name = $request->name;
        $film->avatar_url = $request->avatar_url;
        $film->trailer_url = $request->trailer_url;
        $film->director = $request->director;
        $film->cast = $request->cast;
        $film->running_time = $request->running_time;
        $film->release_date = $request->release_date;
        $film->country = $request->country;
        $film->language = $request->language;
        $film->film_genre = $request->film_genre;
        $film->summary = $request->summary;
        $film->film_status = $request->film_status;
        $film->save();

        return $this->respondSuccess('add thanh cong');
    }


    public function updateFilm(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',

        ]);
        if($validator->fails()) {
            return $this->respondErrorWithStatus('Ban phai nhap du thong tin');
        }

        $film = Film::find($id);
        $film->name = $request->name;
        $film->avatar_url = $request->avatar_url;
        $film->trailer_url = $request->trailer_url;
        $film->director = $request->director;
        $film->cast = $request->cast;
        $film->running_time = $request->running_time;
        $film->release_date = $request->release_date;
        $film->country = $request->country;
        $film->language = $request->language;
        $film->film_genre = $request->film_genre;
        $film->summary = $request->summary;
        $film->film_status = $request->film_status;
        $film->save();

        return $this->respondSuccess('add thanh cong');
    }

    public function deleteFilm(Request $request, $id)
    {
        $film = Film::find($id);
        $film->delete();

        return $this->respondSuccess('xoa thanh cong');
    }

    public function changeSeatStatus(Request $request, $session_id)
    {
        $seat = SessionSeat::where([['session_id','=',$session_id],['seat_id','=',$request->seat_id]])->first();
        $seat->seat_status = $request->seat_status;
        $seat->save();

        return $this->respondSuccess('doi trang thai ghe thanh cong');
    }

    public function addSession(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'required',
            'start_time' => 'required',
            'film_quality' => 'required',
        ]);
        if($validator->fails()) {
            return $this->respondErrorWithStatus('Ban phai nhap du thong tin');
        }

       $session = new FilmSession();
       $session->film_id = $request->film_id;
       $session->room_id = $request->room_id;
       $session->start_date = $request->start_date;
       $session->start_time = $request->start_time;
       $session->film_quality= $request->film_quality;
       $session -> save();

        return $this->respondSuccess('Tao suat chieu thanh cong');
    }

    public function updateSession(Request $request, $id)
    {
        $session = FilmSession::find($id);
        $validator = Validator::make($request->all(), [
            'start_date' => 'required',
            'start_time' => 'required',
            'film_quality' => 'required',
        ]);
        if($validator->fails()) {
            return $this->respondErrorWithStatus('Ban phai nhap du thong tin');
        }

        $session->film_id = $request->film_id;
        $session->room_id = $request->room_id;
        $session->start_date = $request->start_date;
        $session->start_time = $request->start_time;
        $session->film_quality= $request->film_quality;
        $session->save();

        return $this->respondSuccess('Cap nhat thanh cong');
    }

    public function deleteSession(Request $request, $id)
    {
        $session = FilmSession::find($id);
        $session->delete();

        return $this->respondSuccess('Xoa thanh cong');
    }

    public function getAllSessions()
    {
        $sessions = FilmSession::orderBy('start_date', 'desc')->get();
        $this->data["sessions"] = $sessions;

        return $this->respondSuccessWithStatus($this->data);
    }

}
