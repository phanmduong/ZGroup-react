<?php

namespace Modules\Staff\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\User;
use Faker\Provider\DateTime;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class StaffChartApiController extends ManageApiController
{
    /**
     * GET /staff
     * @return Response
     */
    public function countStaffCards(Response $request)
    {
        $from = $request->from;
        $to = $request->to;
        dd(from);
        if ($request->to === null) {
            $request->to = date();
        }
        if ($request->from === null){
            $to->modify('-7 days');
            $request->from =  $to;
        }
        return $this->respondSuccessWithStatus([
//            "user" => $user
        ]);
    }

}
