<?php

namespace Modules\Company\Http\Controllers;

use App\Field;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Http\Controllers\ManageApiController;
use App\Company;

class CompanyController extends ManageApiController
{
    public function createCompany(Request $request)
    {
        if ($request->name === null || trim($request->name) == '' ||
            $request->registered_business_address === null || trim($request->registered_business_address) == '' ||
            $request->office_address === null || trim($request->office_address) == '' ||
            $request->phone_company === null || trim($request->phone_company) == '' ||
            $request->tax_code === null || trim($request->tax_code) == '' ||
            $request->info_account === null || trim($request->info_account) == '' ||
            $request->field_id === null ||
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
        $company->info_account = $request->info_account;
        $company->field_id = $request->field_id;
        $company->user_contact = $request->user_contact;
        $company->user_contact_phone = $request->user_contact_phone;
        $company->type = $request->type;
        $company->save();
        $field = Field::find($company->field_id);
        $str = convert_vi_to_en_not_url($field->name);
        $str = str_replace(" ", "", str_replace("&*#39;", "", $str));
        $str = strtoupper($str);
        $day = date_format($company->created_at,'d');
        $month = date_format($company->created_at,'m');
        $id = (string)$company->id;
        while (strlen($id) < 4) $id = '0' . $id;
        $company->partner_code =$str.$day.$month.$id;
        $company->save();
        return $this->respondSuccessWithStatus([
            "messange" => "Tạo thành công",
        ]);
    }
    public function createField(Request $request){
        if($request->name === null || trim($request->name) == '') return $this->respondErrorWithStatus("Thiếu tên");
        $field = new Field;
        $field->name = $request->name;
        $field->save();
        return $this->respondSuccessWithStatus([
            "message" => "Tạo thành công",
        ]);
    }
    public function editCompany($companyId,Request $request){
        $company = Company::find($companyId);
        if(!$company) return $this->respondErrorWithStatus("Không tồn tại công ty");
        $company->name = $request->name;
        $company->registered_business_address = $request->registered_business_address;
        $company->office_address = $request->office_address;
        $company->phone_company = $request->phone_company;
        $company->tax_code = $request->tax_code;
        $company->info_account = $request->info_account;
        $company->field_id = $request->field_id;
        $company->user_contact = $request->user_contact;
        $company->user_contact_phone = $request->user_contact_phone;
        $company->type = $request->type;
        $company->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa thành công",
        ]);
    }
    public function getAllField(Request $request){
        $fields = Field::all();
        return $this->respondSuccessWithStatus([
            "fields" => $fields->map(function($field){
                return $field->transform();
            })
        ]);
    }
    public function getAllCompany(Request $request){
        $search = $request->search;
        $type = $request->type;
        $limit = $request->limit ? $request->limit : 20;
        $company = Company::query();
        if($search)
          $company->where('name','like','%' . $search . '%');
        if($type)
            $company->where('type',$type);
        $company = $company->orderBy('created_at','desc')->paginate($limit);
        return $this->respondWithPagination($company,[
            "company" => $company->map(function($data){
                return $data->transform();
            }),
        ]);
    }
    public function getDetailCompany($companyId,Request $request){
        $company = Company::find($companyId);
        if(!$company) return $this->respondErrorWithStatus("Không tồn tại công ty");
        return $this->respondSuccessWithStatus([
            "company" => $company->transform()
        ]);
    }

}
