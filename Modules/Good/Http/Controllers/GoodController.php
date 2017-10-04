<?php

namespace Modules\Good\Http\Controllers;

use App\Good;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Good\Entities\GoodProperty;


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

    public function createGood(Request $request)
    {
        $name = $request->name;
        $code = $request->code;
        $description = $request->description;
        $price = $request->price;
        $avatarUrl = $request->avatar_url;
        $coverUrl = $request->cover_url;

        if (is_null("name") && is_null("code")) {
            return $this->respondErrorWithStatus("Sản phẩm cần có: name, code");
        }

        $id = $request->id;
        if ($id) {
            $good = Good::find($id);
        } else {
            $good = new Good();
        }
        $good->name = $name;
        $good->code = $code;
        $good->description = $description;
        $good->price = $price;
        $good->avatar_url = $avatarUrl;
        $good->cover_url = $coverUrl;
        $good->save();

//        $properties = json_decode($request->properties);

        $properties = json_decode($request->properties);

        DB::table('good_properties')->where('good_id', '=', $good->id)->delete();

        foreach ($properties as $p) {
            $property = new GoodProperty();
            $property->name = $p->name;
            $property->value = $p->value;
            $property->creator_id = $this->user->id;
            $property->editor_id = $this->user->id;
            $property->good_id = $good->id;
            $property->save();
        }

        $files = json_decode($request->files_str);

        foreach ($files as $file) {
            $good->files()->attach($file->id);
        }

        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function good($id)
    {
        $good = Good::find($id);
        return $this->respondSuccessWithStatus([
            "good" => $good->transform()
        ]);
    }

}
