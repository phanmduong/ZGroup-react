<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 8/31/17
 * Time: 15:29
 */

namespace App\Http\Controllers;


use App\Course;
use App\Gen;
use App\StudyClass;
use Illuminate\Http\Request;

class ManageGenApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_gens()
    {
        $limit = 7;
        $gens = Gen::orderBy('id', 'decs')->paginate($limit);
        $current_gen = Gen::getCurrentGen();
        $data = [
            "gens" => $gens->map(function ($gen) {
                return [
                    'id' => $gen->id,
                    'name' => $gen->name,
                    'description' => $gen->description,
                    'start_time' => format_date_to_mysql($gen->start_time),
                    'end_time' => format_date_to_mysql($gen->end_time),
                    'status' => $gen->status,
                    'teach_status' => $gen->teach_status,
                ];
            }),
            'current_gen' => [
                'id' => $current_gen->id
            ]
        ];
        return $this->respondWithPagination($gens, $data);
    }

    public function get_all_gens()
    {
        $gens = Gen::orderBy('id', 'decs')->get();
        $current_gen = Gen::getCurrentGen();
        $data = [
            "gens" => $gens->map(function ($gen) {
                return [
                    'id' => $gen->id,
                    'name' => $gen->name,
                ];
            }),
            'current_gen' => [
                'id' => $current_gen->id
            ]
        ];
        return $this->respondSuccessWithStatus($data);
    }

    public function add_gen(Request $request)
    {
        $gen = new Gen();
        $gen->name = $request->name;
        $gen->description = $request->description;
        $gen->start_time = date('Y-m-d', strtotime($request->start_time));
        $gen->end_time = date('Y-m-d', strtotime($request->end_time));
        $gen->save();

        $courses = Course::where('type_id', 2)->get();

        $courses->map(function ($course) use ($gen) {
            $class = new StudyClass();
            $class->name = $course->name . ' - ' . $gen->name;
            $class->course_id = $course->id;
            $class->gen_id = $gen->id;
            $class->save();
        });

        return $this->respondSuccessWithStatus([
            'gen' => $gen
        ]);
    }

    public function edit_gen($genId, Request $request)
    {
        $gen = Gen::find($genId);
        $gen->name = $request->name;
        $gen->description = $request->description;
        $gen->start_time = date('Y-m-d', strtotime($request->start_time));
        $gen->end_time = date('Y-m-d', strtotime($request->end_time));
        $gen->save();
        return $this->respondSuccessWithStatus([
            'message' => 'Thành công'
        ]);
    }

    public function delete_gen(Request $request)
    {
        $gen = Gen::where('id', $request->id)->first();
        $gen->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'Xóa thành công'
        ]);
    }

    public function change_status(Request $request)
    {
        $gens = Gen::all();
        $id = $request->id;
        foreach ($gens as $gen) {
            if ($id == $gen->id) {
                $gen->status = 1;
                $gen->save();
            } else {
                $gen->status = 0;
                $gen->save();
            }
        }
        return $this->respondSuccessWithStatus([
            'message' => 'Thay đổi thành công'
        ]);
    }

    public function change_teach_status(Request $request)
    {
        $gens = Gen::all();
        $id = $request->id;
        foreach ($gens as $gen) {
            if ($id == $gen->id) {
                $gen->teach_status = 1;
                $gen->save();
            } else {
                $gen->teach_status = 0;
                $gen->save();
            }
        }
        return $this->respondSuccessWithStatus([
            'message' => 'Thay đổi thành công'
        ]);
    }
}