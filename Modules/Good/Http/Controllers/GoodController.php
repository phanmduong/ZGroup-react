<?php

namespace Modules\Good\Http\Controllers;

use App\Good;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Good\Entities\GoodProperty;
use Modules\Good\Entities\GoodPropertyItem;


class GoodController extends ManageApiController
{
    public function getAll(Request $request)
    {
        $keyword = $request->search;

        $goods = Good::where(function ($query) use ($keyword) {
            $query->where("name", "like", "%$keyword%")->orWhere("description", "like", "%$keyword%");
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
            if (!$good->files->contains($file->id)) {
                $good->files()->attach($file->id);
            }
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

    public function createGoodPropertyItem(Request $request)
    {
        $user = $this->user;
        if ($request->id) {
            $good_property_item = GoodPropertyItem::find($request->id);
            $good_property_item->editor_id = $user->id;
        } else {
            $good_property_item = new GoodPropertyItem();
            $good_property_item->creator_id = $user->id;
            $good_property_item->editor_id = $user->id;

        }
        if ($request->name == null)
            return $this->respondErrorWithStatus("Thiếu trường name");
        $good_property_item->name = $request->name;
        $good_property_item->prevalue = $request->prevalue;
        $good_property_item->preunit = $request->preunit;
        $good_property_item->save();
        return $this->respondSuccessWithStatus(["message" => "success"]);
    }

    public function allPropertyItems(Request $request)
    {
        $limit = 20;
        $keyword = $request->search;
        if ($request->type)
            $goodPropertyItems = GoodPropertyItem::where("type", $request->type)
                ->where(function ($query) use ($keyword) {

                    $query->where("name", "like", "%$keyword%")
                        ->orWhere("prevalue", "like", "%$keyword%")
                        ->orWhere("preunit", "like", "%$keyword%");
                })->orderBy("created_at", "desc")->paginate($limit);
        else
            $goodPropertyItems = GoodPropertyItem::where(function ($query) use ($keyword) {
                $query->where("prevalue", "like", "%$keyword%")->orWhere("preunit", "like", "%$keyword%");
            })->orderBy("created_at", "desc")->paginate($limit);
        return $this->respondWithPagination(
            $goodPropertyItems,
            [
                "good_property_items" => $goodPropertyItems->map(function ($goodPropertyItem) {
                    return $goodPropertyItem->transform();
                })
            ]
        );
    }

    public function deletePropertyItem($property_item_id, Request $request)
    {
        $goodPropertyItem = GoodPropertyItem::find($property_item_id);
        $goodPropertyItem->delete();
        return $this->respondSuccessWithStatus([
            'message' => "Xóa thành công"
        ]);
    }
}
