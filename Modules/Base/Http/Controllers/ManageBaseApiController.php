<?php

namespace Modules\Base\Http\Controllers;

use App\Base;
use App\District;
use App\Http\Controllers\ManageApiController;
use App\Province;

class ManageBaseApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function provinces()
    {
        $bases = Base::all();
        $provinceIds = $bases->map(function ($base) {
            return $base->district->province->provinceid;
        })->toArray();
        $provinceIds = collect(array_unique($provinceIds));
        return $this->respondSuccessWithStatus([
            "provinces" => $provinceIds->map(function ($provinceId) {
                $province = Province::find($provinceId);
                return $province->transform();
            })->toArray()
        ]);
    }

    public function basesInProvince($provinceId)
    {
        $districtIds = District::join("province", "province.provinceid", "=", "district.provinceid")
            ->where("province.provinceid", $provinceId)->select("district.*")->pluck("districtid");
        $bases = Base::whereIn("district_id", $districtIds)->get();
        return $this->respondSuccessWithStatus([
            "bases" => $bases->map(function ($base) {
                return $base->transform();
            })
        ]);
    }

}
