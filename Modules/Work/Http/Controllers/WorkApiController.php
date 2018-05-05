<?php

namespace Modules\Work\Http\Controllers;

use App\HistoryExtensionWork;
use App\Http\Controllers\ManageApiController;
use App\User;
use App\Work;
use App\WorkStaff;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class WorkApiController extends ManageApiController
{
    public function createWork(Request $request)
    {
        if (!$request->name) return $this->respondErrorWithStatus("Thiếu tên");
        if (!$request->status) return $this->respondErrorWithStatus("Thiếu status");
        $work = new Work;
        $work->name = $request->name;
        $work->type = $request->type;
        $work->cost = $request->cost ? $request->cost : 0;
        $work->deadline = $request->deadline;
        $work->bonus_value = $request->bonus_value ? $request->bonus_value : 0;
        $work->payer_id = $request->payer_id;
        $work->currency_id = $request->currency_id;
        $work->status = $request->status;
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
        return $this->respondSuccessWithStatus([
            "work" => $work->transform()
        ]);
    }

    public function editWork($workId, Request $request)
    {
        $work = Work::find($workId);
        if (!$work) return $this->respondErrorWithStatus("Không tồn tại công việc");
        if (!$request->name) return $this->respondErrorWithStatus("Thiếu tên");
        if (!$request->status) return $this->respondErrorWithStatus("Thiếu status");
        $work->name = $request->name;
        $work->type = $request->type;
        $work->cost = $request->cost ? $request->cost : 0;
        $work->deadline = $request->deadline;
        $work->bonus_value = $request->bonus_value ? $request->bonus_value : 0;
        $work->payer_id = $request->payer_id;
        $work->currency_id = $request->currency_id;
        if ($work->status == "done" && $request->status == "doing") {
            $work_staffs = WorkStaff::where('work_id', $workId)->get();
            foreach ($work_staffs as $work_staff) {
                $work_staff->status = "doing";
            }
        }
        $work->status = $request->status;

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
            $query->where('name', 'like', "%$keyword%")->where('status','<>','archive');
        })->orderBy("created_at", "desc")->get();

        return $this->respondSuccessWithStatus([
            "works" => $works->map(function ($work) {
                return $work->transform();
            })
        ]);

    }

    public function getAllWorkArchive(Request $request){
        $limit = $request->limit ? $request->limit : 20;
        $keyword = $request->search;
        $works = Work::where(function ($query) use ($keyword) {
            $query->where('name', 'like', "%$keyword%")->where('status','=','archive');
        })->orderBy("created_at", "desc")->get();

        return $this->respondSuccessWithStatus([
            "works" => $works->map(function ($work) {
                return $work->transform();
            })
        ]);
    }
    public function getAllExtension(Request $request)
    {
        $keyword = $request->search;
        $limit = $request->limit ? $request->limit : 20;
        $logs = HistoryExtensionWork::join('users', 'history_extension_works.staff_id', '=', 'users.id')
            ->join('works', 'history_extension_works.work_id', '=', 'works.id')->select('history_extension_works.*')
            ->where(function ($query) use ($keyword) {
                $query->where('users.name', 'like', '%' . $keyword . '%')->orWhere('works.name', 'like', '%' . $keyword . '%');
            })->orderBy('history_extension_works.created_at', 'desc')->paginate($limit);

        //dd($logs);
        return $this->respondWithPagination($logs, [
            'logs' => $logs->map(function ($log) {
                $staff = User::find($log->staff_id);
                $manager = User::find($log->manager_id);
                $work = Work::find($log->work_id);
                return [
                    "id" => $log->id,
                    "reason" => $log->reason,
                    "penalty" => $log->penalty,
                    "deadline" => $work ? $work->deadline : "",
                    "new_deadline" => $log->new_deadline,
                    "status" => $log->status ? $log->status : "",
                    "staff" => [
                       "id" => $staff ? $staff->id : 0,
                       "name" => $staff ? $staff->name : "",
                    ],
                    "work" => $work ? $work->transform() : [],
                    "manager" => [
                        "id" => $manager ? $manager->id : 0,
                        "name" => $manager ? $manager->name : "",
                    ],
                ];
            })

        ]);
    }

    public function deleteHistoryExtension($historyId, Request $request)
    {
        $history = HistoryExtensionWork::find($historyId);
        if (!$history) return $this->respondErrorWithStatus("Không tồn tại");
        $history->status = $request->status;
        $history->manager_id = $request->manager_id;
        $history->save();
        return $this->respondSuccessWithStatus([
            "message" => "Từ chối thành công"
        ]);
    }

    public function acceptHistoryExtension($historyId, Request $request)
    {
        $history = HistoryExtensionWork::find($historyId);
        if (!$history) return $this->respondErrorWithStatus("Không tồn tại");
        $work = Work::find($history->work_id);
        $work_staffs = WorkStaff::where('work_id', $history->work_id)->get();
        foreach($work_staffs as $work_staff){
            $work_staff->penalty = $history->penalty;
            $work_staff->save();
        }
        $work->reason = $history->reason;
        $work->deadline = $history->new_deadline;
        $work->save();
        $history->status = $request->status;
        $history->manager_id = $request->manager_id;
        $history->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thành công"
        ]);
    }

    public function summaryStaff(Request $request)
    {
        $year = $request->year;
        $pre_datas = User::select(DB::raw('count(id) as count'), DB::raw('MONTH(created_at) month'))->where("role", ">", 0)
            ->where(DB::raw('YEAR(created_at)'), '=', $year)->groupby('month')->get();
        $n = 0;
        $data = [];
        for ($i = 1; $i <= 12; $i++) {
            if ($pre_datas[$n]->month === $i) {
                array_push($data, $pre_datas[$n]);
                if ($n + 1 < count($pre_datas)) $n++;
            } else array_push($data, [
                "count" => 0,
                "month" => $i,
            ]);
        }
        return $this->respondSuccessWithStatus([
            "data" => $data,
        ]);
    }
    public function getMoreDetailWork($workId,Request $request){
        $work = Work::find($workId);
        return $this->respondSuccessWithStatus([
            "work" => $work->DetailTransform()
        ]);
    }
    public function rateWork($workId,Request $request){
        $staffs = json_decode($request->staffs);
        foreach($staffs as $staff){
            $work_staff = WorkStaff::where('work_id',$workId)->where('staff_id',$staff->id)->first();
            $work_staff->money_bonus = $staff->value;
            $work_staff->save();
        }
        return $this->respondSuccessWithStatus([
            "message" => "Đánh giá thành công"
        ]);
    }
}
