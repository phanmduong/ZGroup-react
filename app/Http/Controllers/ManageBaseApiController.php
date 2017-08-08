<?php

namespace App\Http\Controllers;

use App\Base;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageBaseApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function bases()
    {
        $bases = Base::orderBy('created_at')->paginate(20);
        $data = [
            "bases" => $bases->map(function ($base) {
                return [
                    'id' => $base->id,
                    'name' => $base->name,
                    'created_at' => format_time_main($base->created_at),
                    'updated_at' => format_time_main($base->updated_at),
                    'center' => $base->center
                ];
            }),

        ];
        return $this->respondWithPagination($bases, $data);
    }

    public function setDefaultBase($domain, $baseId)
    {
        $bases = Base::where("center", 1)->get();
        foreach ($bases as $base) {
            $base->center = 0;
            $base->save();
        }

        $base = Base::find($baseId);
        $base->center = 1;
        $base->save();

        return $this->respondSuccessWithStatus(["message" => "Thay đổi trụ sở thành công"]);
    }
}
