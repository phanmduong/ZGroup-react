<?php

namespace Modules\Demo\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Gen;
use App\CourseCategory;
use App\User;
use App\Base;
use App\Course;
use App\StudyClass;
use Modules\Base\Http\Controllers\PublicApiController;

class DemoController extends PublicApiController
{
    public function courses($saler_id = null, $campaign_id = null)
    {
        $current_gen = Gen::getCurrentGen();
        $categories = CourseCategory::all();
        $categories = $categories->filter(function($category){
            $courses = $category->courses;
            $courses_count = $courses->reduce(function($count, $course){
                return $count + $course->status; 
            }, 0);
            return $courses_count > 0;
        });
        
        $this->data['saler_id'] = $saler_id;
        $this->data['campaign_id'] = $campaign_id;
        $this->data['gen_cover'] = $current_gen->cover_url;
        $this->data['saler'] = User::find($saler_id);
        $this->data['categories'] = $categories;
        return view('demo::courses', $this->data);
    }

    public function course($course_id, $saler_id = null, $campaign_id = null)
    {
        $course = Course::find($course_id);
        if ($course == null) {
            $courses = Course::all();
            foreach ($courses as $key) {
                if (convert_vi_to_en($key->name) === $course_id) {
                    $course = $key;
                }
            }
        }
        $course_id = $course->id;
        $current_gen = Gen::getCurrentGen();
        $this->data['current_gen_id'] = $current_gen->id;
        $this->data['gen_cover'] = $current_gen->cover_url;
        $this->data['course'] = $course;
        $this->data['course_id'] = $course_id;
        $this->data['bases'] = Base::orderBy('created_at', 'asc')->get()->filter(function ($base) use ($course_id, $current_gen) {
            return $base->classes()->where('course_id', $course_id)->where('gen_id', $current_gen->id)->count() > 0;
        });
        $this->data['saler_id'] = $saler_id;
        $this->data['campaign_id'] = $campaign_id;
        $this->data['pixels'] = $course->coursePixels;
        $this->data['saler'] = User::find($saler_id);
        return view('demo::course', $this->data);
    }

    public function register($class_id = null, $saler_id = null, $campaign_id = null)
    {
        $this->data['saler_id'] = $saler_id;
        $this->data['campaign_id'] = $campaign_id;
        $class = StudyClass::find($class_id);
        $course = Course::find($class->course_id);

        $this->data['class'] = $class;
        $this->data['course'] = $course;

        return view('demo::register', $this->data);
    }

    
}
