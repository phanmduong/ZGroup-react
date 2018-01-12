<?php

namespace Modules\Company\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\Http\Controllers\ManageApiController;
use App\Company;

class CompanyController extends ManageApiController
{
    public function createCompany(Request $request){
        if($request->name === null || trim($request->name) =='' ||
            $request->registered_business_address === null || trim($request->registered_business_address) =='' ||
            $request->office_address === null || trim($request->office_address) =='' ||
            $request->phone_company === null || trim($request->phone_company) =='' ||
            $request->tax_code === null || trim($request->tax_code) =='' ||
            $request->info_account === null || trim($request->info_account) =='' ||
            $request->field_id === null ||
            $request->user_contact === null || trim($request->user_contact) =='' ||
            $request->user_contact_phone === null || trim($request->user_contact_phone) =='' ||
            $request->type === null || trim($request->type) ==''
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

        return $this->respondSuccessWithStatus([
            "messange" => "Tạo thành công",
        ]);
    }
}
