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
    public function index()
    {
        $books = Good::where('type', 'book');
        $book_arr = [];
        foreach ($books as $book) {
            $properties = GoodProperty::where('good_id', $book->id);
            $bookdata = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'type' => $book->type,
                'name' => $book->name
            ];
            foreach ($properties as $property) {
                $bookdata[$property->name] = $property->value;
            }
            $book_arr[]=$bookdata;
        }
        return view('graphics::index', [
            'books' => $book_arr,
        ]);
    }

    public function aboutUs()
    {
        return view('graphics::about_us');
    }

    public function book($good_id)
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
        return view('graphics::book', [
            'properties' => $data,
        ]);
    }
    public function contact_us(){
        return view('graphics::contact_us');
    }
}
