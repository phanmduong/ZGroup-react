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
        $work->bonus_type = $request->bounus_type;
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
}
