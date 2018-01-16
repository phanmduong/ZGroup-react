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

    public function districts()
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
            })
        ]);
    }

    public function basesInDistrict($districtId)
    {
        $district = District::find($districtId);

        if ($district == null) {
            return $this->respondErrorWithStatus("Quận không tồn tại");
        }

        $bases = $district->bases;
        return $this->respondSuccessWithStatus([
            "bases" => $bases->map(function ($base) {
                return $base->transform();
            })
        ]);
    }

}
