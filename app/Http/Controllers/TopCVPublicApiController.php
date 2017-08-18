<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\GroupTransformer;
use App\Colorme\Transformers\TopicTransformer;
use App\CV;
use App\Group;
use App\Test;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Tymon\JWTAuth\Facades\JWTAuth;

class TopCVPublicApiController extends ApiController
{

    protected $topcv_key;

    public function __construct()
    {
//        parent::__construct();
        $this->middleware("from_topcv");
    }

    public function cvs( Request $request)
    {
        $user_id = $request->id;
        $user = User::find($user_id);

        foreach ($user->cvs()->where('type', 'topcv')->get() as $cv) {
            $cv->delete();
        }

        $test = new Test();
        $test->content = $request->cvs;
        $test->save();

        $cvs = json_decode($request->cvs);

        if ($user) {
            foreach ($cvs as $cv) {
                $newCv = new CV();
                $newCv->cv_name = $cv->cv_title;
                $newCv->thumb_url = $cv->thumb_url;
                $newCv->cv_id = $cv->cv_id;
                $newCv->user_id = $user_id;
                $newCv->url = $cv->view_url;
                $newCv->type = "topcv";
                $newCv->save();
            }
            return $this->responseSuccessTopCV();
        } else {
            return $this->responseErrorTopCV("user not found");
        }
    }

    protected function responseErrorTopCV($message)
    {
        return $this->respond([
            "status" => 0,
            "message" => $message
        ]);
    }

    protected function responseSuccessTopCV($data = null)
    {
        $return = [
            "status" => 1
        ];
        if ($data) {
            $return["data"] = $data;
        }
        return $this->respond($return);
    }

    public function user( Request $request)
    {
        $user_id = $request->id;
        $user = User::find($user_id);
        if ($user) {
            if ($user->is_request_cv) {
                return $this->responseSuccessTopCV([
                    "id" => $user_id,
                    "email" => $user->email,
                    "phone" => $user->phone,
                    "fullname" => $user->name,
                    "portfolio_url" => "http://colorme.vn/profile/" . $user->username,
                    'gender' => $user->gender,
                    "dob" => format_time_to_mysql(strtotime($user->dob))
                ]);
            } else {
                return $this->responseErrorTopCV("This user does not request CV");
            }
        } else {
            return $this->responseErrorTopCV("User not found");
        }
    }
}

