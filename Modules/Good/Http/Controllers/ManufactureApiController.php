<?php

namespace Modules\Good\Http\Controllers;

use App\Good;
use App\HistoryGood;
use App\Http\Controllers\ManageApiController;
use App\ImportedGoods;
use App\Manufacture;
use App\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManufactureApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allManufactures(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $manufactures = Manufacture::query();
        $search = $request->search;

        $manufactures = $manufactures->where('name', 'like', '%' . $search . '%');
        if($limit == -1)
        {
            $manufactures = $manufactures->orderBy("created_at", "desc")->get();
            return $this->respondSuccessWithStatus([
                'manufactures' => $manufactures->map(function ($manufacture) {
                    return [
                        'id' => $manufacture->id,
                        'name' => $manufacture->name,
                    ];
                })
            ]);
        }
        $manufactures = $manufactures->orderBy("created_at", "desc")->paginate($limit);
        return $this->respondWithPagination(
            $manufactures,
            [
                'manufactures' => $manufactures->map(function ($manufacture) {
                    return [
                        'id' => $manufacture->id,
                        'name' => $manufacture->name,
                    ];
                })
            ]);
    }

    public function createManufacture(Request $request)
    {
        if ($request->name == null && trim($request->name) == '')
            return $this->respondErrorWithStatus([
                'message' => 'Thiếu tên nhà sản xuất'
            ]);
        $old = Manufacture::where('name', $request->name)->first();
        if ($old)
            return $this->respondErrorWithStatus([
                'message' => 'Đã tồn tại nhà sản xuất tên: ' . $request->name,
            ]);
        $manufacture = new Manufacture;
        $manufacture->name = $request->name;
        $manufacture->save();
        return $this->respondSuccessWithStatus([
            'id' => $manufacture->id,
            'name' => $manufacture->name
        ]);
    }

    public function deleteManufacture($manufactureId, Request $request)
    {
        $manufacture = Manufacture::find($manufactureId);
        if ($manufacture == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại nhà sản xuất'
            ]);
        $manufacture->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }
}