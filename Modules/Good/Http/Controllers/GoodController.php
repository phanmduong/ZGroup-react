<?php

namespace Modules\Good\Http\Controllers;

use App\Good;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;


class GoodController extends ManageApiController
{
    public function getAll(Request $request)
    {
        $q = $request->q;

        $goods = Good::where(function ($query) use ($q) {
            $query->where("name", "like", "%$q%")->orWhere("description", "like", "%$q%");
        })->orderBy("created_at", "desc")->paginate(20);

        return $this->respondWithPagination(
            $goods,
            [
                "goods" => $goods->map(function ($good) {
                    return $good->transform();
                })
            ]
        );
    }
}
