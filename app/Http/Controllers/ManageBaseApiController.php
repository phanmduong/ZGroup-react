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

    public function deleteBase($domain, $baseId)
    {
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->responseNotFound("Cơ sở không tồn tại");
        }
        $base->delete();
        return $this->respondSuccessWithStatus(['message' => "Xoá cơ sở thành công"]);
    }

    public function base($domain, $baseId)
    {
        $base = Base::find($baseId);
        if ($base == null) {
            return $this->responseNotFound("Cơ sở không tồn tại");
        }
        $data = [
            "id" => $baseId,
            "name" => $base->name,
            "address" => $base->address
        ];
        return $this->respondSuccessWithStatus($data);
    }

    public function bases($domain, Request $request)
    {
        $query = $request->q;

        $limit = 20;

        if ($query) {
            $bases = Base::where("name", "like", "%$query%")
                ->orWhere("address", "like", "%$query%")
                ->orderBy('created_at')->paginate($limit);
        } else {
            $bases = Base::orderBy('created_at')->paginate($limit);
        }


        $data = [
            "bases" => $bases->map(function ($base) {
                return [
                    'id' => $base->id,
                    'name' => $base->name,
                    'address' => $base->address,
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

    public function createBase($domain, Request $request)
    {
        if ($request->name == null || $request->address == null) {
            return $this->responseBadRequest("Thiếu params");
        }
        if ($request->id) {
            $base = Base::find($request->id);
            $message = "Sửa cơ sở thành công";
        } else {
            $base = new Base();
            $message = "Tạo cơ sở thành công";
        }

        $base->name = $request->name;
        $base->address = $request->address;
        $base->save();

        return $this->respondSuccessWithStatus(["message" => $message]);
    }
}
