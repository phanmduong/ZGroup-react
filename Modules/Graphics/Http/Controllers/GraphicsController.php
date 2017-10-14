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
    public function aaa()
    {
        return view('graphics::aaa');
    }
    public function product($good_id)
    {
        $good = Good::find($good_id);
        $properties = GoodProperty::where('good_id', $good_id)->get();

        $data = [
            "cover" => $good->cover_url,
            "avatar" => $good->avatar_url,
            "type" => $good->type,
        ];
        foreach ($properties as $property) {
            $data[$property->name] = $property->value;
        }
        return view('graphics::index', [
            'properties' => $data,
        ]);
    }
}
