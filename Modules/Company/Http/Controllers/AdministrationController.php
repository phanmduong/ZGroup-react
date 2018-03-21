<?php
/**
 * Created by PhpStorm.
 * User: lethergo
 * Date: 18/03/2018
 * Time: 11:16
 */

namespace Modules\Company\Http\Controllers;


use App\Http\Controllers\ManageApiController;
use App\RequestVacation;
use DateTime;
use Illuminate\Http\Request;
use App\Report;
use DB;


class AdministrationController extends ManageApiController
{
    public function getAllRequestVacation(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        if ($limit == -1) {
            $requestVacations = RequestVacation::all();
            return $this->respondSuccessWithStatus([
                "requestVacation" => $requestVacations->map(function ($requestVacation) {
                    return $requestVacation->transform();
                }),
            ]);
        } else {
            $requestVacations = RequestVacation::orderBy('created_at', 'desc')->paginate($limit);

            return $this->respondWithPagination($requestVacations, [
                "requestVacation" => $requestVacations->map(function ($requestVacation) {
                    return $requestVacation->transform();
                }),
            ]);
        }
    }

    public function createRequestVacation(Request $request)
    {
        if (!$request->staff_id) return $this->respondErrorWithStatus("Chưa có mã nhân viên");
        $requestVacation = new RequestVacation;
        $requestVacation->staff_id = $request->staff_id;
        $requestVacation->request_date = $request->request_date;
        $requestVacation->start_time = $request->start_time;
        $requestVacation->end_time = $request->end_time;
        $requestVacation->type = $request->type;
        $requestVacation->reason = $request->reason;

        $request->save();

        $ppp = DateTime::createFromFormat('Y-m-d', $requestVacation->created_at);
        $day = date_format($ppp, 'd');
        $month = date_format($ppp, 'm');
        $year = date_format($ppp, 'y');
        $id = (string)$requestVacation->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $requestVacation->command_code = "NGHIPHEP" . $day . $month . $year . $id;

        $request->save();

        return $this->respondSuccessWithStatus([
            "message" => "Tạo thành công"
        ]);
    }

    public function editRequestVacation($requestId, Request $request)
    {
        $requestVacation = RequestVacation::find($requestId);
        $requestVacation->staff_id = $request->staff_id;
        $requestVacation->request_date = $request->request_date;
        $requestVacation->start_time = $request->start_time;
        $requestVacation->end_time = $request->end_time;
        $requestVacation->type = $request->type;
        $requestVacation->reason = $request->reason;

        $request->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa thành công"
        ]);

    }

    public function changeStatusRequestVacation($requestId, Request $request)
    {
        $requestVacation = RequestVacation::find($requestId);
        $requestVacation->status = $request->status;
        $request->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thay đổi status thành công"
        ]);
    }

    public function createReport(Request $request,$staff_id)
    {
        $report = new Report();
        $report->staff_id = $staff_id;
        $report->report = $request->report;
        $report->save();

        return response()->json([
            'id' => $report->id,
        ]);
    }

    public function editReport(Request $request,$staff_id,$id)
    {
        $report = Report::find($id);
        if($report->report != $request->report){

            if($report->staff_id == $staff_id) {
                $report->report = $request->report;
                $report->save();
            }else{
                return "False";
            }
        }else{
            return "false";
        }
        return "Ok";
    }

    public function showReportStaffId(Request $request, $staff_id)
    {
        $reports = Report::find($staff_id)->get();
        return $reports;
    }

    public function showReports(Request $request)
    {
//        dd(1);
        return Report::all();
    }
}