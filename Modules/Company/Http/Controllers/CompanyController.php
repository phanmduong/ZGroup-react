<?php

namespace Modules\Company\Http\Controllers;

use App\ExportOrder;
use App\Field;
use App\Payment;
use App\PrintOrder;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Http\Controllers\ManageApiController;
use App\Company;
use Illuminate\Support\Facades\DB;

class CompanyController extends ManageApiController
{
    public function createCompany(Request $request)
    {
        if ($request->name === null || trim($request->name) == '' ||
            $request->registered_business_address === null || trim($request->registered_business_address) == '' ||
            $request->office_address === null || trim($request->office_address) == '' ||
            $request->phone_company === null || trim($request->phone_company) == '' ||
            $request->tax_code === null || trim($request->tax_code) == '' ||
            $request->account_number === null || trim($request->account_number) == '' ||
            $request->account_name === null || trim($request->account_name) == '' ||
            $request->bank_name === null || trim($request->bank_name) == '' ||
            $request->field_id === null || trim($request->field_id) == '' ||
            $request->bank_branch === null || trim($request->bank_branch) == '' ||
            $request->user_contact === null || trim($request->user_contact) == '' ||
            $request->user_contact_phone === null || trim($request->user_contact_phone) == '' ||
            $request->type === null || trim($request->type) == ''
        ) return $this->respondErrorWithStatus("Thiếu trường");
        $company = new Company;
        $company->name = $request->name;
        $company->registered_business_address = $request->registered_business_address;
        $company->office_address = $request->office_address;
        $company->phone_company = $request->phone_company;
        $company->tax_code = $request->tax_code;
        $company->account_number = $request->account_number;
        $company->account_name = $request->account_name;
        $company->bank_name = $request->bank_name;
        $company->bank_branch = $request->bank_branch;
        $company->field_id = $request->field_id;
        $company->user_contact = $request->user_contact;
        $company->user_contact_phone = $request->user_contact_phone;
        $company->type = $request->type;
        $company->discount_comic = $request->discount_comic;
        $company->discount_text = $request->discount_text;
        $company->user_contact1 = $request->user_contact1;
        $company->user_contact_phone1 = $request->user_contact_phone1;
        $company->user_contact2 = $request->user_contact2;
        $company->user_contact_phone2 = $request->user_contact_phone2;
        $company->save();
        $field = Field::find($company->field_id);
        $str = convert_vi_to_en_not_url($field->name);
        $str = str_replace(" ", "", str_replace("&*#39;", "", $str));
        $str = strtoupper($str);
        $day = date_format($company->created_at, 'd');
        $month = date_format($company->created_at, 'm');
        $id = (string)$company->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $company->partner_code = $str . $day . $month . $id;
        $company->save();
        return $this->respondSuccessWithStatus([
            "messange" => "Tạo thành công",
        ]);
    }

    public function createField(Request $request)
    {
        if ($request->name === null || trim($request->name) == '') return $this->respondErrorWithStatus("Thiếu tên");
        $field = new Field;
        $field->name = $request->name;
        $field->save();
        return $this->respondSuccessWithStatus([
            "message" => "Tạo thành công",
        ]);
    }

    public function editCompany($companyId, Request $request)
    {
        $company = Company::find($companyId);
        if (!$company) return $this->respondErrorWithStatus("Không tồn tại công ty");
        $company->name = $request->name;
        $company->registered_business_address = $request->registered_business_address;
        $company->office_address = $request->office_address;
        $company->phone_company = $request->phone_company;
        $company->tax_code = $request->tax_code;
        $company->account_number = $request->account_number;
        $company->account_name = $request->account_name;
        $company->bank_name = $request->bank_name;
        $company->bank_branch = $request->bank_branch;
        $company->field_id = $request->field_id;
        $company->user_contact = $request->user_contact;
        $company->user_contact_phone = $request->user_contact_phone;
        $company->type = $request->type;
        $company->discount_comic = $request->discount_comic;
        $company->discount_text = $request->discount_text;
        $company->user_contact1 = $request->user_contact1;
        $company->user_contact_phone1 = $request->user_contact_phone1;
        $company->user_contact2 = $request->user_contact2;
        $company->user_contact_phone2 = $request->user_contact_phone2;
        $company->save();
        $field = Field::find($company->field_id);
        $str = convert_vi_to_en_not_url($field->name);
        $str = str_replace(" ", "", str_replace("&*#39;", "", $str));
        $str = strtoupper($str);
        $day = date_format($company->created_at, 'd');
        $month = date_format($company->created_at, 'm');
        $id = (string)$company->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $company->partner_code = $str . $day . $month . $id;
        $company->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa thành công",
        ]);
    }

    public function getAllField(Request $request)
    {
        $fields = Field::all();
        return $this->respondSuccessWithStatus([
            "fields" => $fields->map(function ($field) {
                return $field->transform();
            })
        ]);
    }

    public function getAllCompany(Request $request)
    {
        $search = $request->search;
        $type = $request->type;
        $limit = $request->limit ? $request->limit : 20;
        if ($limit != -1) {
            $company = Company::query();
            if ($search)
                $company->where('name', 'like', '%' . $search . '%');
            if ($type)
                $company->where('type', $type);
            $company = $company->orderBy('created_at', 'desc')->paginate($limit);
            return $this->respondWithPagination($company, [
                "company" => $company->map(function ($data) {
                    return $data->transform();
                }),
            ]);
        } else {
            $company = Company::all();
            return $this->respondSuccessWithStatus([
                "company" => $company->map(function ($pp) {
                    return $pp->transform();
                })
            ]);
        }
    }

    public function getCompanyProvide()
    {
        $companies = Company::where('type', '<>', 'share')->get();
        return $this->respondSuccessWithStatus([
            "companies" => $companies->map(function ($company) {
                return $company->transform();
            })
        ]);
    }

    public function getCompanyShare()
    {
        $companies = Company::where('type', '<>', 'provided')->get();
        return $this->respondSuccessWithStatus([
            "companies" => $companies->map(function ($company) {
                return $company->transform();
            })
        ]);
    }

    public function getDetailCompany($companyId, Request $request)
    {
        $company = Company::find($companyId);
        if (!$company) return $this->respondErrorWithStatus("Không tồn tại công ty");
        return $this->respondSuccessWithStatus([
            "company" => $company->transform()
        ]);
    }

    public function createPayment(Request $request)
    {
        if ($request->payer_id === null || $request->receiver_id === null ||
            $request->money_value === null || trim($request->money_value) == '' ||
            $request->bill_image_url === null || trim($request->bill_image_url) == '')
            return $this->respondErrorWithStatus("Thiếu trường");
        $payment = new Payment;
        $payment->bill_image_url = $request->bill_image_url;
        $payment->description = $request->description;
        $payment->money_value = $request->money_value;
        $payment->payer_id = $request->payer_id;
        $payment->receiver_id = $request->receiver_id;
        $payment->type = "done";
        $payment->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thành công"
        ]);
    }

    public function editPayment($paymentId, Request $request)
    {
        $payment = Payment::find($paymentId);
        if (!$payment) return $this->respondErrorWithStatus("Không tồn tại");
        if ($request->payer_id === null || !$request->receiver_id === null ||
            $request->money_value === null || trim($request->money_value) == '' ||
            $request->bill_image_url === null || trim($request->bill_image_url) == '')
            return $this->respondErrorWithStatus("Thiếu trường");
        $payment->bill_image_url = $request->bill_image_url;
        $payment->description = $request->description;
        $payment->money_value = $request->money_value;
        $payment->payer_id = $request->payer_id;
        $payment->receiver_id = $request->receiver_id;
        $payment->save();

        return $this->respondSuccessWithStatus([
            "message" => "Thành công"
        ]);
    }

    public function getAllPayment(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $payments = Payment::query();
        $company_id = $request->company_id;
        $start_time = $request->start_time;
        $end_time = $request->end_time;
        $type = $request->type;
        if ($company_id) {
            $payments = $payments->where(function ($query) use ($company_id) {
                $query->where('payer_id', $company_id)->orWhere('receiver_id', $company_id);
            });
        }

        if ($start_time) {
            $end_time = date("Y-m-d", strtotime("+1 day", strtotime($end_time)));
            $payments = $payments->whereBetween('created_at', array($start_time, $end_time));
        }
        if($type) {
            $payments = $payments->where('type',$type);
        }
        $pre_payments = $payments->get();
        $summary_money = $pre_payments->reduce(function ($total, $payment) {
            if ($payment->payer_id == 1 || $payment->receiver_id == 1) {
                if ($payment->type != "done") return $total - $payment->money_value;
                else return $total + $payment->money_value;
            }
        }, 0);
        $payments = $payments->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($payments, [
            "payment" => $payments->map(function ($payment) {
                return $payment->transform();
            }),
            "summary_money" => $summary_money,
        ]);
    }

    public function getPayment($paymentId)
    {
        $payment = Payment::find($paymentId);
        if (!$payment) return $this->respondErrorWithStatus("Không tồn tại");
        return $this->respondSuccessWithStatus([
            'payment' => $payment->transform(),
        ]);
    }


    public function createPrintOrder(Request $request)
    {
        if ($request->staff_id === null ||
            $request->company_id === null ||
            $request->good_id === null)
            return $this->respondErrorWithStatus("Thiếu trường");
        $printorder = new PrintOrder();
        $printorder->staff_id = $request->staff_id;
        $printorder->company_id = $request->company_id;
        $printorder->good_id = $request->good_id;
        $printorder->quantity = $request->quantity;
        $printorder->core1 = $request->core1;
        $printorder->core2 = $request->core2;
        $printorder->cover1 = $request->cover1;
        $printorder->cover2 = $request->cover2;
        $printorder->spare_part1 = $request->spare_part1;
        $printorder->spare_part2 = $request->spare_part2;
        $printorder->packing1 = $request->packing1;
        $printorder->packing2 = $request->packing2;
        $printorder->other = $request->other;
        $printorder->price = $request->price;
        $printorder->note = $request->note;
        $printorder->order_date = $request->order_date;
        $printorder->receive_date = $request->receive_date;
        $printorder->save();

        $name = $printorder->company->name;
        $str = convert_vi_to_en_not_url($name);
        $str = str_replace(" ", "", str_replace("&*#39;", "", $str));
        $str = strtoupper($str);
        $ppp = DateTime::createFromFormat('Y-m-d', $printorder->order_date);
        $day = date_format($ppp, 'd');
        $month = date_format($ppp, 'm');
        $year = date_format($ppp, 'y');
        $id = (string)$printorder->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $printorder->command_code = "DATIN" . $id . $str . $day . $month . $year;
        $printorder->save();

        return $this->respondSuccessWithStatus([
            "message" => "Thành công"
        ]);
    }

    public function editPrintOrder($printOrderId, Request $request)
    {
        $printorder = PrintOrder::find($printOrderId);
        if (!$printorder) return $this->respondErrorWithStatus("Không tồn tại");
        if ($request->staff_id === null ||
            $request->company_id === null ||
            $request->good_id === null)
            return $this->respondErrorWithStatus("Thiếu trường");
        $printorder->staff_id = $request->staff_id;
        $printorder->company_id = $request->company_id;
        $printorder->good_id = $request->good_id;
        $printorder->quantity = $request->quantity;
        $printorder->core1 = $request->core1;
        $printorder->core2 = $request->core2;
        $printorder->cover1 = $request->cover1;
        $printorder->cover2 = $request->cover2;
        $printorder->spare_part1 = $request->spare_part1;
        $printorder->spare_part2 = $request->spare_part2;
        $printorder->packing1 = $request->packing1;
        $printorder->packing2 = $request->packing2;
        $printorder->other = $request->other;
        $printorder->price = $request->price;
        $printorder->note = $request->note;
        $printorder->order_date = $request->order_date;
        $printorder->receive_date = $request->receive_date;
        $printorder->save();

        $name = $printorder->company->name;
        $str = convert_vi_to_en_not_url($name);
        $str = str_replace(" ", "", str_replace("&*#39;", "", $str));
        $str = strtoupper($str);
        $ppp = DateTime::createFromFormat('Y-m-d', $printorder->order_date);
        $day = date_format($ppp, 'd');
        $month = date_format($ppp, 'm');
        $year = date_format($ppp, 'y');
        $id = (string)$printorder->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $printorder->command_code = "DATIN" . $id . $str . $day . $month . $year;
        $printorder->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa thành công"
        ]);
    }

    public function getAllPrintOrder(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $search = $request->search;
        $printorders = PrintOrder::query();
        if ($search)
            $printorders = $printorders->where('command_code', 'like', '%' . $search . '%');
        if ($request->company_id)
            $printorders = $printorders->where('company_id', $request->company_id);

        if ($request->good_id)
            $printorders = $printorders->where('good_id', $request->good_id);
        $printorders = $printorders->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($printorders, [
            "printorders" => $printorders->map(function ($printorder) {
                return $printorder->transform();
            })
        ]);

    }

    public function getPrintOrder($printOrderId, Request $request)
    {
        $printorder = PrintOrder::find($printOrderId);
        if (!$printorder) return $this->respondErrorWithStatus("Không tồn tại");
        return $this->respondSuccessWithStatus([
            "printOrder" => $printorder->transform()
        ]);
    }

    public function createExportOrder(Request $request)
    {
        if ($request->good_id === null ||
            $request->company_id === null ||
            $request->warehouse_id === null ||
            $request->price === null || trim($request->price) === "" ||
            $request->quantity === null || trim($request->quantity) === ""
        ) return $this->respondErrorWithStatus("Thiếu trường");
        $exportOrder = new ExportOrder;
        $exportOrder->good_id = $request->good_id;
        $exportOrder->company_id = $request->company_id;
        $exportOrder->warehouse_id = $request->warehouse_id;
        $exportOrder->price = $request->price;
        $exportOrder->quantity = $request->quantity;
        $exportOrder->total_price = $request->total_price;
        $exportOrder->save();
        return $this->respondSuccessWithStatus([
            "message" => "Tạo thành công"
        ]);
    }

    public function editExportOrder($exportOrderId, Request $request)
    {
        $exportOrder = ExportOrder::find($exportOrderId);
        if (!$exportOrder) return $this->respondErrorWithStatus("Không tồn tại");
        if ($request->good_id === null ||
            $request->company_id === null ||
            $request->warehouse_id === null ||
            $request->price === null || trim($request->price) === "" ||
            $request->quantity === null || trim($request->quantity) === ""
        ) return $this->respondErrorWithStatus("Thiếu trường");
        $exportOrder->good_id = $request->good_id;
        $exportOrder->company_id = $request->company_id;
        $exportOrder->warehouse_id = $request->warehouse_id;
        $exportOrder->price = $request->price;
        $exportOrder->quantity = $request->quantity;
        $exportOrder->total_price = $request->total_price;
        $exportOrder->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa thành công"
        ]);
    }

    public function getAllExportOrder(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $exportorders = ExportOrder::query();

        $exportorders = $exportorders->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($exportorders, [
            "exportorders" => $exportorders->map(function ($exportorder) {
                return $exportorder->transform();
            })
        ]);
    }

    public function getExportOrder($exportOrderId, Request $request)
    {
        $exportorder = ExportOrder::find($exportOrderId);
        if (!$exportorder) return $this->respondErrorWithStatus("Không tồn tại");
        return $this->respondSuccessWithStatus([
            "exportOrder" => $exportorder->transform()
        ]);
    }

    public function changeStatusPrintOrder($printOrderId, Request $request)
    {
        $printOrder = PrintOrder::find($printOrderId);
        if (!$printOrder) return $this->respondErrorWithStatus("Không tồn tại");
        $printOrder->status = 1;
        $printOrder->save();
        $payment = new Payment;
        $payment->type = "debt_print";
        $payment->payer_id = 1;
        $payment->receiver_id = $printOrder->company_id;
        $payment->money_value = $printOrder->quantity * $printOrder->price * 1.1;
        $payment->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thay đổi thành công"
        ]);
    }

    public function changeStatusExportOrder($exportOrderId, Request $request)
    {
        $exportorder = ExportOrder::find($exportOrderId);
        if (!$exportorder) return $this->respondErrorWithStatus("Không tồn tại");
        $exportorder->status = 1;
        $exportorder->save();
        $payment = new Payment;
        $payment->type = "debt_export";
        $payment->payer_id = 1;
        $payment->receiver_id = $exportorder->company_id;
        $payment->money_value = $exportorder->total_price;
        $payment->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thay đổi thành công"
        ]);
    }
}
