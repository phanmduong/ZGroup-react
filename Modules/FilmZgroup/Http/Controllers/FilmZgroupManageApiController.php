<?php

namespace Modules\FilmZgroup\Http\Controllers;

use App\Film;
use App\Film_Blog;
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


    public function addFilm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'avatar_url' => 'required|max:255',
            'director' => 'required|max:255',
            'cast' => 'required|max:255',
            'running_time' => 'required|max:255',
            'country' => 'required|max:255',
            'language' => 'required|max:255',
            'film_genre' => 'required|max:255',
            'summary' => 'required',
            'cover_url' => 'required',
            'images_url' => 'required'
        ]);
        if ($validator->fails()) {
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
        $film->film_status = 0;
        $film->film_rated = $request->film_rated;
        $film->rate = $request->rate;
        $film->cover_url = $request->cover_url;
        $film->images_url = $request->images_url;
        $film->is_favorite = 0;
        $film->save();

        return $this->respondSuccess('add thanh cong');
    }


    public function updateFilm(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'avatar_url' => 'required|max:255',
            'director' => 'required|max:255',
            'cast' => 'required|max:255',
            'running_time' => 'required|max:255',
            'country' => 'required|max:255',
            'language' => 'required|max:255',
            'film_genre' => 'required|max:255',
            'summary' => 'required',
            'cover_url' => 'required',
            'images_url' => 'required'
        ]);
        if ($validator->fails()) {
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
        $film->film_rated = $request->film_rated;
        $film->rate = $request->rate;
        $film->cover_url = $request->cover_url;
        $film->images_url = $request->images_url;
        $film->is_favorite = $request->is_favorite;

        $film->save();

        return $this->respondSuccess('update thanh cong');
    }

    public function deleteFilm(Request $request, $id)
    {
        $film = Film::find($id);
        $film->delete();

        return $this->respondSuccess('xoa thanh cong');
    }

    public function addSession(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'required',
            'start_time' => 'required',
            'film_quality' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondErrorWithStatus('Ban phai nhap du thong tin');
        }

        $session = new FilmSession();
        $session->film_id = $request->film_id;
        $session->room_id = $request->room_id;
        $session->start_date = $request->start_date;
        $session->start_time = $request->start_time;
        $session->film_quality = $request->film_quality;
        $session->save();
//        $film = Film::find($request->film_id);
//        $film->film_status = 1;
//        $film->save();

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
        if ($validator->fails()) {
            return $this->respondErrorWithStatus('Ban phai nhap du thong tin');
        }

        $session->film_id = $request->film_id;
        $session->room_id = $request->room_id;
        $session->start_date = $request->start_date;
        $session->start_time = $request->start_time;
        $session->film_quality = $request->film_quality;
        $session->save();
//        $film = Film::find($request->film_id);
//        $film->film_status = 1;
//        $film->save();

        return $this->respondSuccess('Cap nhat thanh cong');
    }

    public function deleteSession(Request $request, $id)
    {
        $session = FilmSession::find($id);
        $session->delete();

        return $this->respondSuccess('Xoa thanh cong');
    }

    public function changeSeatStatus(Request $request, $session_id)
    {
        $seat = SessionSeat::where([['session_id', '=', $session_id], ['seat_id', '=', $request->seat_id]])->first();
        $seat->seat_status = $request->seat_status;
        $seat->save();

        return $this->respondSuccess('doi trang thai ghe thanh cong');
    }

    public function changeFilmInfo(Request $request, $id)
    {
        $film = Film::find($id);
        if ($request->film_status) {
            $film->film_status = $request->film_status;
        }
        if ($request->is_favorite) {
            $film->is_favorite = $request->is_favorite;
        }

        $film->save();

        return $this->respondSuccess('Doi thong tin thanh cong');
    }

//    public function changeBlogStatus(Request $request, $id)
//    {
//        $blog = Film::find($id);
//        if ($request->status) {
//            $blog->status = $request->status;
//        }
//        $blog->save();
//
//        return $this->respondSuccess('Doi trang thai thanh cong');
//    }
//
//    public function addBlog(Request $request)
//    {
//        $validator = Validator::make($request->all(), [
//            'name' => 'required|max:255',
//            'avatar_url' => 'required|max:255',
//            'content' => 'required',
//            'status' => 'required',
//        ]);
//        if ($validator->fails()) {
//            return $this->respondErrorWithStatus('Ban phai nhap du thong tin');
//        }
//
//        $blog = new Film_Blog();
//        $blog->name = $request->name;
//        $blog->avatar_url = $request->avatar_url;
//        $blog->content = $request->content;
//        $blog->status = $request->status;
//        $blog->save();
//
//        return $this->respondSuccess('add thanh cong');
//    }
//
//    public function updateBlog(Request $request, $id)
//    {
//        $validator = Validator::make($request->all(), [
//            'name' => 'required|max:255',
//            'avatar_url' => 'required|max:255',
//            'content' => 'required',
//            'status' => 'required',
//        ]);
//        if ($validator->fails()) {
//            return $this->respondErrorWithStatus('Ban phai nhap du thong tin');
//        }
//
//        $blog = new Film_Blog();
//        $blog->name = $request->name;
//        $blog->avatar_url = $request->avatar_url;
//        $blog->content = $request->content;
//        $blog->status = $request->status;
//        $blog->save();
//
//        return $this->respondSuccess('update thanh cong');
//    }
//
//    public function deleteBlog(Request $request, $id)
//    {
//        $blog = Film::find($id);
//        $blog->delete();
//
//        return $this->respondSuccess('xoa thanh cong');
//    }


}
