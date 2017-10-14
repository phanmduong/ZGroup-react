<?php

namespace Modules\Graphics\Http\Controllers;

use App\Good;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Good\Entities\GoodProperty;

class GraphicsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */

    public function product($link, $goodId)
    {
        $good = Good::find($goodId);
        $properties = GoodProperty::where('good_id', $goodId)->get();

        $data = [
            "cover" => $good->cover_url,
            "avatar" => $good->avatar_url,
            "type" => $good->type,
        ];
        foreach ($properties as $property) {
            $data[$property->name] => $property->value;
        }
        dd($data);
        return view('graphics::index', [
            'properties' => $data,
        ]);
    }
}
