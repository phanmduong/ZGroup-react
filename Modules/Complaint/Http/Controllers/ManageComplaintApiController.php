<?php

namespace Modules\Complaint\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;


class ManageComplaintApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createComplaint(Request $request){
        $id = $request->id;
        if (!$id) {
            return $this->respondErrorWithStatus("Ban truyen len thieu id");
        }
        return $this->respondSuccessV2([
            "id" => $id
        ]);
    }

}
