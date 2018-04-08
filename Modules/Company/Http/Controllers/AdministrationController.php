<?php
/**
 * Created by PhpStorm.
 * User: lethergo
 * Date: 18/03/2018
 * Time: 11:16
 */

namespace Modules\Company\Http\Controllers;


use App\AdvancePayment;
use App\Http\Controllers\ManageApiController;
use App\RequestVacation;
use App\User;
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

        $requestVacation->save();

        $ppp = $requestVacation->created_at;
        $day = date_format($ppp, 'd');
        $month = date_format($ppp, 'm');
        $year = date_format($ppp, 'y');
        $id = (string)$requestVacation->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $requestVacation->command_code = "NGHIPHEP" . $day . $month . $year . $id;

        $requestVacation->save();

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

    public function getAllAdvancePayment(Request $request){
        $limit = $request->limit ? $request->limit : 20;
        if($limit == -1){
            $datas  = AdvancePayment::all();
            return $this->respondSuccessWithStatus([
                "data" => $datas->map(function($data){
                    return $data->transform();
                })
            ]);
        } else {
            if($this->user->role == 2) {
                $datas = AdvancePayment::orderBy('created_at', 'desc')->paginate($limit);
                return $this->respondWithPagination($datas, [
                    "data" => $datas->map(function ($data) {
                        return $data->transform();
                    })
                ]);
            } else {
                $datas = AdvancePayment::where("staff_id",$this->user->id)->orderBy('created_at', 'desc')->paginate($limit);
                return $this->respondWithPagination($datas, [
                    "data" => $datas->map(function ($data) {
                        return $data->transform();
                    })
                ]);
            }
        }

    }
    public function changeStatusAdvancePayment($advancePaymentId,Request $request){
        $data = AdvancePayment::find($advancePaymentId);
        $data->status = $request->status;
        $data->money_received = $request->money_received;
        $data->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thay đổi trạng thái thành công"
        ]);
    }

    public function createAdvancePayment(Request $request){
        $data = new AdvancePayment;
        $data->staff_id = $request->staff_id;
        $data->reason = $request->reason;
        $data->money_payment = $request->money_payment;
        $data->type = $request->type;
        $data->save();
        $ppp = DateTime::createFromFormat('Y-m-d', $data->created_at);
        $day = date_format($ppp, 'd');
        $month = date_format($ppp, 'm');
        $year = date_format($ppp, 'y');
        $id = (string)$data->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $data->command_code = "TAMUNG" . $day . $month . $year . $id;

        $request->save();
        return $this->respondSuccessWithStatus([
            "message" => "Tạo đơn thành công"
        ]);


    }

    public function editAdvancePayment($advancePaymentId,Request $request){
        $data = AdvancePayment::find($advancePaymentId);
        $data->staff_id = $request->staff_id;
        $data->reason = $request->reason;
        $data->money_payment = $request->money_payment;
        $data->money_received = $request->money_received;
        $data->type = $request->type;
        $data->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa đơn thành công"
        ]);
    }

    public function PaymentAdvance($advancePaymentId,Request $request){
        $data = AdvancePayment::find($advancePaymentId);
        $data->money_used = $request->money_used;
        $data->date_complete = $request->date_complete;
        $data->save();
        return $this->respondSuccessWithStatus([
            "message" => "Hoàn ứng thành công"
        ]);
    }


    public function createReport($staff_id,Request $request)
    {
        if(User::where('id',$staff_id)->count() > 0){
            $report = new Report();
            $report->staff_id = $staff_id;
            $report->title = $request->title;
            $report->report = $request->report;
            $report->save();

            return $this->respondSuccessWithStatus([
                "message"=>"Tạo báo cáo thành công"
            ]);
        }else{
            return $this->respondErrorWithStatus([
                "message" => "Không tồn tại user"
            ]);
        }

    }

    public function editReport(Request $request,$staff_id,$id)
    {
        $report = Report::find($id);
        if($report->report != $request->report){
            if($report->staff_id == $staff_id) {
                $report->report = $request->report;
                $report->title = $request->title;
                $report->save();
            }else{
                return $this->respondErrorWithStatus("Sửa báo cáo không thành công");
            }
        }else{
            return $this->respondErrorWithStatus("Sửa báo cáo không thành công");
        }
        
        return $this->respondSuccessWithStatus([
           "message"=>"Sửa báo cáo thành công"
        ]);
    }

    public function showReportId(Request $request, $id)
    {
        $report = Report::where('id',$id)->get();
//        dd($report);
        return $this->respondSuccessWithStatus([
            "report" => $report->map(function($report){
                return $report->transform();
            })
        ]);
    }

    public function showReports(Request $request)
    {
        $limit = $request->limit ? $request->limit :20;
        if($this->user->role == 2) {
            $reports = Report::orderBy('created_at', 'desc')->paginate($limit);
            return $this->respondWithPagination($reports, [
                "reports" => $reports->map(function ($report) {
                    return $report->transform();
                })
            ]);
        } else {
            $reports = Report::where('staff_id',$this->user->id)->orderBy('created_at', 'desc')->paginate($limit);
            return $this->respondWithPagination($reports, [
                "reports" => $reports->map(function ($report) {
                    return $report->transform();
                })
            ]);
        }
    }

    public function deleteReport(Request $request, $id)
    {
        Report::where('id',$id)->delete();
        return $this->respondSuccessWithStatus([
            "message" => "Xóa thành công"
        ]);
    }

    public function changeStatus(Request $request, $id)
    {
        $report = Report::find($id);
        if($report->status === 1){
            $report->status = 0;
            $report->save();
        }else if($report->status === 0){
            $report->status = 1;
            $report->save();
        }else{
            return $this->respondErrorWithStatus([
                "message" => "Thay đổi trạng thái không thành công"
            ]);
        }

        return $this->respondSuccessWithStatus([
            "message" => "Thay đổi trạng thái thành công"
        ]);

    }
}