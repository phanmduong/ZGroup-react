<?php

namespace Modules\Work\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Work;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class WorkApiController extends ManageApiController
{
    public function createWork(Request $request)
    {
        if (!$request->name) return $this->respondErrorWithStatus("Thiếu tên");
        $work = new Work;
        $work->name = $request->name;
        $work->type = $request->type;
        $work->cost = $request->cost ? $request->cost : 0;
        $work->deadline = $request->deadline;
        $work->bonus_value = $request->bonus_value ? $request->bonus_value : 0;
        $work->bonus_type = $request->bonus_type;
        $staffs = json_decode($request->staffs);
        $work->save();
        if (count($staffs) > 0) {
            foreach ($staffs as $staff) {
                $work->staffs()->attach($staff->id);
            }
        }
        return $this->respondSuccessWithStatus([
            "message" => "Tạo thành công"
        ]);


    }

    public function deleteWork($workId, Request $request)
    {
        $work = Work::find($workId);
        if (!$work) return $this->respondErrorWithStatus("Không tồn tại công việc");
        $work->delete();
        return $this->respondSuccessWithStatus([
            "message" => "Xóa thành công"
        ]);
    }

    public function getDetailWork($workId, Request $request)
    {
        $work = Work::find($workId);
        if (!$work) return $this->respondErrorWithStatus("Không tồn tại công việc");
        $staffs = $work->staffs;
        return $this->respondSuccessWithStatus([
            "work" => [
                "id" => $work->id,
                "name" => $work->name,
                "type" =>$work->type,
                "cost" =>$work->cost,
                "deadline" =>$work->deadline,
                "bonus_value" =>$work->bonus_value,
                "bonus_type" => $work->bonus_type
            ],
            "staffs" => $staffs->map(function ($staff) {
                return [
                    "id" => $staff->id,
                    "name" => $staff->name,
                    "avatar_url" => $staff->avatar_url ? $staff->avatar_url : "http://api.colorme.vn/img/user.png",
                ];
            })
        ]);
    }

    public function editWork($workId, Request $request)
    {
        $work = Work::find($workId);
        if (!$work) return $this->respondErrorWithStatus("Không tồn tại công việc");
        if (!$request->name) return $this->respondErrorWithStatus("Thiếu tên");
        $work->name = $request->name;
        $work->type = $request->type;
        $work->cost = $request->cost ? $request->cost : 0;
        $work->deadline = $request->deadline;
        $work->bonus_value = $request->bonus_value ? $request->bonus_value : 0;
        $work->bonus_type = $request->bonus_type;
        $staffs = json_decode($request->staffs);
        $work->save();
        if (count($staffs) > 0) {
            $work->staffs()->detach();
            foreach ($staffs as $staff) {
                $work->staffs()->attach($staff->id);
            }
        }
        return $this->respondSuccessWithStatus([
            "message" => "Sửa thành công"
        ]);
    }

    public function getAll(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $keyword = $request->search;
        $works = Work::where(function ($query) use ($keyword) {
            $query->where('name', 'like', "%$keyword%");
        })->orderBy("created_at", "desc")->paginate($limit);

        return $this->respondWithPagination($works, [
            "works" => $works->map(function ($work) {
                $staffs = $work->staffs;
                return [
                    "work" => [
                        "id" => $work->id,
                        "name" => $work->name,
                        "type" =>$work->type,
                        "cost" =>$work->cost,
                        "deadline" =>$work->deadline,
                        "bonus_value" =>$work->bonus_value,
                        "bonus_type" => $work->bonus_type
                    ],
                    "staffs" => $staffs->map(function ($staff) {
                        return [
                            "id" => $staff->id,
                            "name" => $staff->name,
                            "avatar_url" => $staff->avatar_url ? $staff->avatar_url : "http://api.colorme.vn/img/user.png",
                        ];
                    })
                ];
            })
        ]);

    }
}
