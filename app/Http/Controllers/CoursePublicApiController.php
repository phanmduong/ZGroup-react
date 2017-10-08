<?php

namespace App\Http\Controllers;

use App\Base;
use App\Colorme\Transformers\ClassTransformer;
use App\Colorme\Transformers\CommentTransformer;
use App\Colorme\Transformers\CourseTransformer;
use App\Colorme\Transformers\ProductTransformer;
use App\Course;
use App\Product;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class CoursePublicApiController extends ApiController
{
    protected $classTransformer, $courseTransformer;

    public function __construct(ClassTransformer $classTransformer, CourseTransformer $courseTransformer)
    {
        $this->classTransformer = $classTransformer;
        $this->courseTransformer = $courseTransformer;
    }

    public function courses()
    {
        $courses = Course::orderBy('created_at', 'desc')->get();
        $bases = Base::orderBy('name')->get();
        $return_data = [];
        foreach ($courses as $course) {
            $return_data[] = [
                "duration" => $course->duration,
                "id" => $course->id,
                "linkId" => convert_vi_to_en($course->name),
                'name' => "Khoá học " . $course->name,
                "icon_url" => $course->icon_url,
                "description" => $course->description,
                "avatar_url" => $course->image_url,
                "price" => currency_vnd_format($course->price)
            ];
        }
        return $this->respond([
            'courses' => $return_data,
            'bases' => $bases
        ]);
    }

    public function course($linkId, Request $request)
    {
        if ($request->token) {
            $user = JWTAuth::parseToken()->authenticate();
            $this->courseTransformer->setUser($user);
        }
        $courses = Course::all();
        $return_data = new \stdClass();
        foreach ($courses as $course) {
            if ($linkId == convert_vi_to_en($course->name)) {
                $return_data = $this->courseTransformer->transform($course);
            }
        }
        return $this->respond($return_data);
    }

}
