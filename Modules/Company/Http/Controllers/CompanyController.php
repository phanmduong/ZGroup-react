<?php

namespace Modules\Company\Http\Controllers;

use App\ExportOrder;
use App\Field;
use App\ItemOrder;
use App\Payment;
use App\PrintOrder;
use DateTime;
use Google\Auth\Cache\Item;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Http\Controllers\ManageApiController;
use App\Company;
use Illuminate\Support\Facades\DB;
use Modules\Good\Entities\GoodPropertyItem;

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
        $name = $request->name;
        $partner_code = $request->partner_code;
        $address = $request->address;
        $phone = $request->phone;
        $type = $request->type;
        $limit = $request->limit ? $request->limit : 20;
        if ($limit != -1) {
            $company = Company::query();
            if ($name)
                $company->where('name', 'like', '%' . $name . '%');
            if ($partner_code)
                $company->where('partner_code', 'like', '%' . $partner_code . '%');
            if ($address)
                $company->where('office_address', 'like', '%' . $address . '%');
            if ($phone)
                $company->where('phone_company', 'like', '%' . $phone . '%');
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
        $receiver_id = $request->receiver_id;
        $payer_id = $request->payer_id;

        if ($receiver_id) {
            $payments = $payments->where('receiver_id',$receiver_id);
        }
        if ($payer_id) {
            $payments = $payments->where('payer_id',$payer_id);
        }
        $payments = $payments->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($payments, [
            "payment" => $payments->map(function ($payment) {
                return $payment->transform();
            }),

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

        if ($request->status != null)
            $printorders = $printorders->where('status', $request->status);

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
        $printOrder->status = $request->status;
        $printOrder->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thay đổi thành công"
        ]);
    }

    public function changeStatusExportOrder($exportOrderId, Request $request)
    {
        $exportorder = ExportOrder::find($exportOrderId);
        if (!$exportorder) return $this->respondErrorWithStatus("Không tồn tại");
        $exportorder->status = $request->status;
        $exportorder->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thay đổi thành công"
        ]);
    }

    public function getAllCodePrintOrder()
    {
        $printorders = PrintOrder::query();
        $printorders = $printorders->orderBy('created_at', 'desc')->get();
        return $this->respondSuccessWithStatus([
            "codes" => $printorders->map(function ($printorder) {
                return [
                    "id" => $printorder->id,
                    "code" => $printorder->command_code,
                ];
            })
        ]);
    }

    public function getAllProperties()
    {
        $props = GoodPropertyItem::where('type','print_order')->get();
        return $this->respondSuccessWithStatus([
            "props" => $props->map(function($prop){
                  return[
                      "id" => $prop->id,
                      "name" => $prop->name,
                      "value" => $prop->prevalue,
                  ];
            })
        ]);
    }
    public function editProperty($propId,Request $request){
        $prop = GoodPropertyItem::find($propId);
        if($request->value === null)
            return $this->respondErrorWithStatus("Thiếu trường");
        $prop->prevalue = $request->value;

        $prop->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thay đổi thành công"
        ]);
    }
    public function createProperty(Request $request){
        $prop = new GoodPropertyItem();
        $prop->name = $request->name;
        $prop->prevalue = $request->value;
        $prop->type = "print_order";
        $prop->save();
        return $this->respondSuccessWithStatus([
            "message" => "Thêm thành công"
        ]);
    }
    public function createOrder(Request $request){
        //đơn hàng từ nhà phân phối đặt
        if($request->company_id == null) return $this->respondErrorWithStatus("Thiếu nhà phân phối");
        $order = new ItemOrder;
        $order->company_id = $request->company_id;
        $order->type = "be-ordered";
        $order->save();
        $ppp = $order->created_at;
        $day = date_format($ppp, 'd');
        $month = date_format($ppp, 'm');
        $year = date_format($ppp, 'y');
        $id = (string)$order->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $order->command_code = "DATHANG" . $day .$month .$year . $id;
        $order->save();
        $goods = json_decode($request->goods);
        foreach ($goods as $good){
            $exportOrder = new ExportOrder;
            $exportOrder->warehouse_id = 0;
            $exportOrder->company_id = $order->company_id;
            $exportOrder->price = $good->price;
            $exportOrder->quantity = $good->quantity;
            $exportOrder->good_id = $good->id;
            $exportOrder->total_price = $exportOrder->quantity * $exportOrder->price;
            $exportOrder->item_order_id = $order->id;
            $exportOrder->save();
        }
        return $this->respondSuccessWithStatus([
            "message" => "Tạo đơn hàng thành công"
        ]);
    }

    public function eidtOrder($orderId,Request $request){
        //đơn hàng từ nhà phân phối đặt
        $order = ItemOrder::find($orderId);
        if($request->company_id == null) return $this->respondErrorWithStatus("Thiếu nhà phân phối");
        $order->company_id = $request->company_id;
        $goods = $order->exportOrder;
        foreach($goods as $good){
            $good->delete();
        }
        $goods = json_decode($request->goods);
        foreach ($goods as $good){
            $exportOrder = new ExportOrder;
            $exportOrder->warehouse_id = 0;
            $exportOrder->company_id = $order->company_id;
            $exportOrder->price = $good->price;
            $exportOrder->quantity = $good->quantity;
            $exportOrder->good_id = $good->id;
            $exportOrder->total_price = $exportOrder->quantity * $exportOrder->price;
            $exportOrder->item_order_id = $order->id;
            $exportOrder->save();
        }
        return $this->respondSuccessWithStatus([
            "message" => "Sửa đơn hàng thành công"
        ]);


    }

    public function getAllOrder(Request $request){
        //đơn hàng từ nhà phân phối đặt
        $limit = $request->limit ? $request->limit : 20;
        if($request->limit == -1){
            $orders = ItemOrder::where('type','order')->get();
            return $this->respondSuccessWithStatus([
                "orders" => $orders->map(function($order){
                       return $order->transform();
                })
            ]);
        } else{
            $orders = ItemOrder::where('type','order')->orderBy('created_at','desc')->paginate($limit);
            return $this->respondWithPagination($orders,[
                "orders" => $orders->map(function($order){
                    return $order->transform();
                })
            ]);

        }
    }

    public function getOrder($orderId,Request $request){
        //đơn hàng từ nhà phân phối đặt
        $order = ItemOrder::find($orderId);
        return $this->respondSuccessWithStatus([
            "order" => $order->transform()
        ]);
    }

}
