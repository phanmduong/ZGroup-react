<?php
/**
 * Created by PhpStorm.
 * User: tt
 * Date: 10/11/2017
 * Time: 15:18
 */

namespace Modules\Graphics\Http\Controllers;


use App\Good;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NoAuthApiController;

use Illuminate\Http\Request;
use Modules\Good\Entities\GoodProperty;

class GraphicsAppController extends NoAuthApiController
{
    public function __construct()
    {
    }

    public function index(){
        $books = Good::where('type', 'book')->get();
        $book_arr = [];
        foreach ($books as $book) {
            $properties = GoodProperty::where('good_id', $book->id)->get();
            $bookdata = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'name' => $book->name,
                'price' => $book->price
            ];
            foreach ($properties as $property) {
               if($property->name=="short_description") $bookdata[$property->name] = $property->value;
            }
            $book_arr[] = $bookdata;
        }

        return $this->respondSuccessWithStatus([
           "books" => $book_arr
        ]);
    }

    public function detailedBook($book_id,Request $request){

        $book = Good::find($book_id);
        if($book ==null || $book->type != "book")
            return $this->respondErrorWithStatus("Không tồn tại sách");
        $book_data = [];
         $properties = GoodProperty::where('good_id', $book->id)->get();
            $bookdata = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'name' => $book->name,
                'price' => $book->price
            ];
            foreach ($properties as $property) {
                $bookdata[$property->name] = $property->value;
            }
            $book_data[] = $bookdata;


        return $this->respondSuccessWithStatus([
            "book" => $book_data
        ]);


    }

}