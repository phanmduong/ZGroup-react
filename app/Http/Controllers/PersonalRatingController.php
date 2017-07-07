<?php

namespace App\Http\Controllers;

use App\Gen;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\StudyClass;
use App\User;
use App\Register;

class PersonalRatingController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 26;
    }

    public function index()
    {
        $classes = StudyClass::all();
        $teacher_ids = array();
        $assist_ids = array();
        foreach ($classes as $class) {
            if ($class->teach != null) {
                $teacher_ids[] = $class->teach->id;
            }
            if ($class->assist != null) {
                $assist_ids[] = $class->assist->id;
            }
        }


        $teachers = User::whereIn('id', $teacher_ids)->get();
        foreach ($teachers as &$teacher) {
            $class_ids = array();
            foreach ($teacher->teach as $t) {
                $class_ids[] = $t->id;
            }
            $teacher->rating_number = Register::whereIn('class_id', $class_ids)->where('rating_teacher', '>', -1)->count();
            $teacher->rating_avg = Register::whereIn('class_id', $class_ids)->where('rating_teacher', '>', -1)->avg('rating_teacher');
        }

        $assistants = User::whereIn('id', $assist_ids)->get();
        foreach ($assistants as &$assistant) {
            $class_ids = array();
            foreach ($assistant->assist as $t) {
                $class_ids[] = $t->id;
            }
            $assistant->rating_number = Register::whereIn('class_id', $class_ids)->where('rating_ta', '>', -1)->count();
            $assistant->rating_avg = Register::whereIn('class_id', $class_ids)->where('rating_ta', '>', -1)->avg('rating_ta');
        }

        $this->data['teachers'] = $teachers;
        $this->data['assistants'] = $assistants;
        return view('manage.personal_rating.all', $this->data);
    }

    public function rating_detail(Request $request)
    {
        $id = $request->id;
        $role = $request->r;

        $person = User::find($id);

        $this->data['person'] = $person;
        $this->data['role'] = $role;
        return view('manage.personal_rating.detail', $this->data);
    }

    public function all_rating(Request $request)
    {
        $class_id = $request->id;
        $role = $request->role;

        $class = StudyClass::find($class_id);

        $this->data['class'] = $class;
        $this->data['role'] = $role;
        return view('manage.personal_rating.all_rating', $this->data);
    }

}
